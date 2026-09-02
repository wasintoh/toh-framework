/**
 * Codex integration tests (node:test) — native agents in .codex/agents/*.toml.
 *
 * Every check below is an observable outcome of a real `install()` run into a
 * temp directory, never a re-statement of the generator's own constants.
 *
 * Covers:
 *   - fresh install layout (.toh/, shared .agents/skills/, .codex/agents/, AGENTS.md)
 *   - agent TOML shape: no `model` key (inherits the session), reasoning effort
 *     from modelIntent, read-only sandbox for read-only agents
 *   - single writer for .agents/skills/ — same wrappers whatever the IDE order
 *   - a user's existing .codex/config.toml is never modified
 *   - ownership by hash: edited or user-created agent files are never touched
 *   - AGENTS.md: user content preserved, reinstall idempotent, block under budget
 *   - `uninstall --ide codex` (native agents only) and the full uninstall
 *   - the codex capability profile stays the conservative, probe-upgraded floor
 *
 * Run: npm test
 */

// Silence ora spinners: ora's stream writes corrupt node:test's child-process
// IPC channel on Node 24. Read at call time, so import hoisting is harmless.
process.env.TOH_QUIET = '1';

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { parse as parseToml } from 'smol-toml';

import { install } from '../installer/install.js';
import { uninstall } from '../installer/uninstall.js';
import {
  CODEX_AGENTS_DIR,
  CODEX_MANIFEST_PATH,
  CODEX_REASONING_EFFORT,
  installCodexAgents,
  readAgentCatalog,
  resolveCodexModelIntent,
  translateAgentToCodex,
  uninstallCodex,
  writeAgentsMd
} from '../installer/ide-handlers/codex.js';
import { CAPABILITY_PROFILES } from '../installer/ide-handlers/shared.js';

const __filename = fileURLToPath(import.meta.url);
const REPO_ROOT = path.join(path.dirname(__filename), '..');
const SRC_DIR = path.join(REPO_ROOT, 'src');

const EXPECTED_COMMANDS = [
  'toh', 'toh-connect', 'toh-design', 'toh-dev', 'toh-fix', 'toh-help', 'toh-line',
  'toh-mobile', 'toh-plan', 'toh-protect', 'toh-ship', 'toh-test', 'toh-ui', 'toh-vibe'
];

const EXPECTED_AGENTS = [
  'backend-connector', 'design-reviewer', 'dev-builder', 'plan-orchestrator',
  'platform-adapter', 'root-cause-debugger', 'test-runner', 'ui-builder'
];

// ---------------------------------------------------------------- helpers

async function makeTmpProject() {
  return fs.mkdtemp(path.join(os.tmpdir(), 'toh-codex-test-'));
}

/** install() with quick: true is fully non-interactive, even on reinstall. */
async function quickInstall(targetDir, ide = 'codex') {
  await install({ target: targetDir, ide, quick: true });
}

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

/** Map of relative path -> content for every file under root. */
async function snapshotTree(root) {
  const out = new Map();
  const walk = async (dir) => {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(p);
      else out.set(path.relative(root, p), await fs.readFile(p, 'utf8'));
    }
  };
  if (await fs.pathExists(root)) await walk(root);
  return out;
}

function frontmatterOf(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  assert.ok(m, 'file must start with a YAML frontmatter block');
  return { fm: yaml.load(m[1]) || {}, body: m[2] };
}

async function readAgentToml(dir, name) {
  const raw = await fs.readFile(path.join(dir, CODEX_AGENTS_DIR, `${name}.toml`), 'utf8');
  return { raw, parsed: parseToml(raw) };
}

// ---------------------------------------------------------------- tests

test('fresh Codex install creates .toh/, shared .agents/skills/, .codex/agents/ and AGENTS.md', async () => {
  const dir = await makeTmpProject();
  try {
    await quickInstall(dir);

    assert.ok(await fs.pathExists(path.join(dir, '.toh', 'plan.md')));
    assert.ok(await fs.pathExists(path.join(dir, '.toh', 'memory', 'active.md')));

    // The shared writer owns .agents/skills/: 23 framework skills + 14 command skills.
    const skillDirs = (await fs.readdir(path.join(dir, '.agents', 'skills'))).sort();
    assert.equal(skillDirs.length, 37);
    for (const cmd of EXPECTED_COMMANDS) assert.ok(skillDirs.includes(cmd), `missing ${cmd}`);

    // One native Codex agent per Toh agent, plus the ownership manifest.
    const tomls = (await fs.readdir(path.join(dir, CODEX_AGENTS_DIR))).sort();
    assert.deepEqual(tomls, EXPECTED_AGENTS.map((n) => `${n}.toml`));
    const manifest = await fs.readJson(path.join(dir, CODEX_MANIFEST_PATH));
    assert.equal(manifest.generator, 'toh-framework');
    assert.equal(Object.keys(manifest.agents).length, EXPECTED_AGENTS.length);

    const agentsMd = await fs.readFile(path.join(dir, 'AGENTS.md'), 'utf8');
    assert.match(agentsMd, /<!-- TOH-FRAMEWORK-START -->/);
    assert.match(agentsMd, /\.codex\/agents\/\*\.toml/);
    assert.match(agentsMd, /\$toh-<cmd>/);

    // project-doc quota is written only because no config.toml existed.
    const config = await fs.readFile(path.join(dir, '.codex', 'config.toml'), 'utf8');
    assert.equal(parseToml(config).project_doc_max_bytes, 131072);
    assert.doesNotMatch(config, /\[features\]/);
  } finally {
    await fs.remove(dir);
  }
});

test('agent TOML: valid, no model key, effort from intent, sandbox from tool allowlist', async () => {
  const dir = await makeTmpProject();
  try {
    await quickInstall(dir);
    const agents = await readAgentCatalog(dir);
    assert.equal(agents.length, EXPECTED_AGENTS.length);

    for (const agent of agents) {
      const { raw, parsed } = await readAgentToml(dir, agent.name);
      assert.equal(parsed.name, agent.name);
      assert.ok(parsed.description.length > 0);
      assert.ok(parsed.developer_instructions.length > 100, `${agent.name}: instructions look empty`);
      // The model is inherited from the parent session — never pinned here.
      assert.equal(Object.hasOwn(parsed, 'model'), false, `${agent.name}: must not pin a model`);
      assert.doesNotMatch(raw, /^model\s*=/m);
      assert.equal(parsed.model_reasoning_effort, CODEX_REASONING_EFFORT[agent.modelIntent]);
      assert.ok(['read-only', 'workspace-write'].includes(parsed.sandbox_mode));
    }

    // Read-only allowlist (Read/Grep/Glob/Bash) -> read-only sandbox; builders write.
    assert.equal((await readAgentToml(dir, 'root-cause-debugger')).parsed.sandbox_mode, 'read-only');
    assert.equal((await readAgentToml(dir, 'ui-builder')).parsed.sandbox_mode, 'workspace-write');

    // Intents declared in src/agents/*.md land where expected.
    assert.equal((await readAgentToml(dir, 'plan-orchestrator')).parsed.model_reasoning_effort, 'high');
    assert.equal((await readAgentToml(dir, 'test-runner')).parsed.model_reasoning_effort, 'low');
    assert.equal((await readAgentToml(dir, 'dev-builder')).parsed.model_reasoning_effort, 'medium');
  } finally {
    await fs.remove(dir);
  }
});

test('modelIntent resolution: explicit key wins, Claude tier is the fallback', () => {
  assert.equal(resolveCodexModelIntent({ modelIntent: 'review', model: 'haiku' }), 'review');
  assert.equal(resolveCodexModelIntent({ modelIntent: 'deep_reasoning' }), 'planning');
  assert.equal(resolveCodexModelIntent({ modelIntent: 'scaffold' }), 'lightweight');
  assert.equal(resolveCodexModelIntent({ model: 'haiku' }), 'lightweight');
  assert.equal(resolveCodexModelIntent({ model: 'opus' }), 'planning');
  assert.equal(resolveCodexModelIntent({ model: 'sonnet' }), 'implementation');
  assert.equal(resolveCodexModelIntent({}), 'implementation');
  assert.equal(resolveCodexModelIntent({ modelIntent: 'nonsense', model: 'opus' }), 'planning');
});

test('translateAgentToCodex escapes arbitrary bodies into valid TOML', () => {
  const toml = translateAgentToCodex({
    name: 'edge-case',
    description: 'Quotes "here", backslash \\ and a tab\t.',
    body: 'Line one\n\nLine "two" with `code` and \\ backslashes\n# not a toml comment',
    tools: ['Read', 'Write'],
    skills: ['design-craft'],
    triggers: ['ui', 'design'],
    modelIntent: 'implementation',
    maxTurns: 12
  });
  const parsed = parseToml(toml);
  assert.equal(parsed.name, 'edge-case');
  assert.equal(parsed.sandbox_mode, 'workspace-write');
  assert.match(parsed.developer_instructions, /Line "two" with `code`/);
  assert.match(parsed.developer_instructions, /Source turn budget hint: 12\./);
  assert.match(parsed.developer_instructions, /\.toh\/skills\/design-craft\/SKILL\.md/);
});

test('single writer: .agents/skills wrappers are identical regardless of IDE order', async () => {
  const a = await makeTmpProject();
  const b = await makeTmpProject();
  try {
    await quickInstall(a, 'codex,cursor');   // Codex first
    await quickInstall(b, 'cursor');         // Cursor first…
    await quickInstall(b, 'codex');          // …Codex added later

    const skillsA = await snapshotTree(path.join(a, '.agents', 'skills'));
    const skillsB = await snapshotTree(path.join(b, '.agents', 'skills'));
    assert.equal(skillsA.size, 37);
    assert.deepEqual([...skillsA.keys()].sort(), [...skillsB.keys()].sort());
    for (const [rel, content] of skillsA) {
      assert.equal(skillsB.get(rel), content, `${rel} differs by install order`);
    }

    // Wrappers are the shared, runtime-neutral ones — nothing Codex-specific
    // leaks into what Cursor / Antigravity / ZCode read.
    const vibe = skillsA.get(path.join('toh-vibe', 'SKILL.md'));
    assert.doesNotMatch(vibe, /\.codex\/agents/);
    assert.doesNotMatch(vibe, /Codex has no Toh Stop hook/);
    const { fm } = frontmatterOf(vibe);
    assert.equal(fm.name, 'toh-vibe');
    assert.ok(fm.description);

    // Codex got all 8 native agents in both orders.
    for (const dir of [a, b]) {
      const tomls = await fs.readdir(path.join(dir, CODEX_AGENTS_DIR));
      assert.equal(tomls.length, EXPECTED_AGENTS.length, `${dir}: expected 8 native agents`);
    }
  } finally {
    await fs.remove(a);
    await fs.remove(b);
  }
});

test('an existing user .codex/config.toml is never modified', async () => {
  const dir = await makeTmpProject();
  try {
    const configPath = path.join(dir, '.codex', 'config.toml');
    const userConfig = 'model = "gpt-5.6-sol"\napproval_policy = "on-request"\n\n[mcp_servers.github]\ncommand = "gh-mcp"\n';
    await fs.outputFile(configPath, userConfig);
    const before = sha256(await fs.readFile(configPath));

    await quickInstall(dir);
    await quickInstall(dir); // and again, on reinstall

    assert.equal(sha256(await fs.readFile(configPath)), before, 'user config.toml was rewritten');
    assert.equal(await fs.readFile(configPath, 'utf8'), userConfig);
  } finally {
    await fs.remove(dir);
  }
});

test('ownership by hash: edited and user-created agent files are never touched', async () => {
  const dir = await makeTmpProject();
  try {
    await quickInstall(dir);

    // User edits one generated agent and adds their own.
    const edited = path.join(dir, CODEX_AGENTS_DIR, 'ui-builder.toml');
    const editedContent = (await fs.readFile(edited, 'utf8')) + '\n# my tweak\n';
    await fs.writeFile(edited, editedContent);
    const own = path.join(dir, CODEX_AGENTS_DIR, 'my-reviewer.toml');
    const ownContent = 'name = "my-reviewer"\ndescription = "mine"\ndeveloper_instructions = "keep"\n';
    await fs.writeFile(own, ownContent);

    const result = await installCodexAgents(dir);
    assert.deepEqual(result.kept, ['ui-builder']);
    assert.equal(result.installed.length, EXPECTED_AGENTS.length - 1);
    assert.equal(await fs.readFile(edited, 'utf8'), editedContent, 'edited agent was overwritten');
    assert.equal(await fs.readFile(own, 'utf8'), ownContent, 'user agent was touched');

    // The manifest still remembers the original hash for the edited file, so a
    // later uninstall knows it is no longer ours.
    const manifest = await fs.readJson(path.join(dir, CODEX_MANIFEST_PATH));
    assert.ok(manifest.agents['.codex/agents/ui-builder.toml']);
    assert.equal(manifest.agents['.codex/agents/my-reviewer.toml'], undefined);
  } finally {
    await fs.remove(dir);
  }
});

test('stale agent files we wrote are removed on reinstall only when untouched', async () => {
  const dir = await makeTmpProject();
  try {
    await quickInstall(dir);
    const manifestPath = path.join(dir, CODEX_MANIFEST_PATH);
    const manifest = await fs.readJson(manifestPath);

    // Simulate an agent that existed in an older release: write it and record it.
    const staleOurs = 'name = "old-agent"\ndescription = "gone upstream"\ndeveloper_instructions = "x"\n';
    await fs.writeFile(path.join(dir, CODEX_AGENTS_DIR, 'old-agent.toml'), staleOurs);
    manifest.agents['.codex/agents/old-agent.toml'] = { sha256: sha256(staleOurs), source: '.toh/agents/old-agent.md' };
    const staleEdited = 'name = "old-edited"\ndescription = "edited"\ndeveloper_instructions = "y"\n';
    await fs.writeFile(path.join(dir, CODEX_AGENTS_DIR, 'old-edited.toml'), staleEdited + '# changed\n');
    manifest.agents['.codex/agents/old-edited.toml'] = { sha256: sha256(staleEdited), source: '.toh/agents/old-edited.md' };
    await fs.writeJson(manifestPath, manifest, { spaces: 2 });

    await installCodexAgents(dir);
    assert.equal(await fs.pathExists(path.join(dir, CODEX_AGENTS_DIR, 'old-agent.toml')), false, 'untouched stale file should go');
    assert.equal(await fs.pathExists(path.join(dir, CODEX_AGENTS_DIR, 'old-edited.toml')), true, 'edited stale file must stay');
  } finally {
    await fs.remove(dir);
  }
});

test('AGENTS.md: user content preserved, reinstall idempotent, block under budget', async () => {
  const dir = await makeTmpProject();
  try {
    const userText = '# My project\n\nKeep this paragraph.\n';
    await fs.writeFile(path.join(dir, 'AGENTS.md'), userText);

    await quickInstall(dir);
    const first = await fs.readFile(path.join(dir, 'AGENTS.md'), 'utf8');
    assert.ok(first.startsWith(userText), 'user text must stay at the top');

    await quickInstall(dir);
    const second = await fs.readFile(path.join(dir, 'AGENTS.md'), 'utf8');
    assert.equal(second, first, 'reinstall must be byte-identical');
    assert.equal(second.split('<!-- TOH-FRAMEWORK-START -->').length - 1, 1);
    assert.equal(second.split('<!-- TOH-FRAMEWORK-END -->').length - 1, 1);

    // The generator reports the block size; Codex truncates at 32 KiB combined,
    // so the block must stay under the 24 KiB hard budget.
    const bytes = await writeAgentsMd(dir, SRC_DIR, 'en', 'codex');
    assert.ok(bytes > 4000 && bytes < 24 * 1024, `block is ${bytes} bytes`);

    // Native agent tree is identical across reinstalls too.
    const tree1 = await snapshotTree(path.join(dir, CODEX_AGENTS_DIR));
    await quickInstall(dir);
    const tree2 = await snapshotTree(path.join(dir, CODEX_AGENTS_DIR));
    assert.deepEqual([...tree1.entries()], [...tree2.entries()]);
  } finally {
    await fs.remove(dir);
  }
});

test('uninstall --ide codex removes only our native agent files; shared surfaces stay', async () => {
  const dir = await makeTmpProject();
  try {
    await quickInstall(dir);
    const edited = path.join(dir, CODEX_AGENTS_DIR, 'ui-builder.toml');
    await fs.appendFile(edited, '\n# my tweak\n');
    const agentsMdBefore = await fs.readFile(path.join(dir, 'AGENTS.md'), 'utf8');
    const configBefore = await fs.readFile(path.join(dir, '.codex', 'config.toml'), 'utf8');

    const preview = await uninstallCodex(dir, { dryRun: true });
    assert.equal(preview.removedAgents.length, EXPECTED_AGENTS.length - 1);
    assert.deepEqual(preview.keptAgents, ['ui-builder']);
    assert.ok(await fs.pathExists(path.join(dir, CODEX_AGENTS_DIR, 'dev-builder.toml')), 'dry-run must not delete');

    const code = await uninstall({ target: dir, ide: 'codex', yes: true });
    assert.equal(code, 0);
    assert.equal(await fs.pathExists(path.join(dir, CODEX_AGENTS_DIR, 'dev-builder.toml')), false);
    assert.equal(await fs.pathExists(edited), true, 'edited agent must survive');
    assert.equal(await fs.pathExists(path.join(dir, CODEX_MANIFEST_PATH)), false);
    assert.equal(await fs.readFile(path.join(dir, 'AGENTS.md'), 'utf8'), agentsMdBefore);
    assert.equal(await fs.readFile(path.join(dir, '.codex', 'config.toml'), 'utf8'), configBefore);
    assert.ok(await fs.pathExists(path.join(dir, '.toh', 'plan.md')));

    // A backup copy of what was removed exists.
    const backups = await fs.readdir(path.join(dir, '.toh-uninstall-backup'));
    assert.ok(backups.some((n) => n.startsWith('codex-agents-')));
  } finally {
    await fs.remove(dir);
  }
});

test('full uninstall removes .codex/agents/ and the manifest, keeps the plan', async () => {
  const dir = await makeTmpProject();
  try {
    await quickInstall(dir);
    const code = await uninstall({ target: dir, yes: true });
    assert.equal(code, 0);
    assert.equal(await fs.pathExists(path.join(dir, CODEX_AGENTS_DIR)), false);
    assert.equal(await fs.pathExists(path.join(dir, CODEX_MANIFEST_PATH)), false);
    assert.equal(await fs.pathExists(path.join(dir, 'AGENTS.md')), false, 'TOH-only AGENTS.md should go');
    assert.ok(await fs.pathExists(path.join(dir, '.toh', 'plan.md')), 'the plan is the user\'s work');
  } finally {
    await fs.remove(dir);
  }
});

test('codex capability profile stays the conservative floor (probe may upgrade it)', () => {
  const codex = CAPABILITY_PROFILES.codex;
  assert.equal(codex.subagents, 'none');
  assert.equal(codex.parallel, false);
  assert.equal(codex.modelRouting, false);
});

test('Claude Code agents keep native fields and drop the Codex-only modelIntent', async () => {
  const dir = await makeTmpProject();
  try {
    await quickInstall(dir, 'claude');
    const raw = await fs.readFile(path.join(dir, '.claude', 'agents', 'ui-builder.md'), 'utf8');
    const { fm } = frontmatterOf(raw);
    assert.equal(fm.name, 'ui-builder');
    assert.equal(fm.model, 'sonnet');
    assert.equal(fm.modelIntent, undefined);
    assert.equal(await fs.pathExists(path.join(dir, CODEX_AGENTS_DIR)), false, 'claude-only install writes no Codex agents');
  } finally {
    await fs.remove(dir);
  }
});

test('readAgentCatalog returns [] for a project without .toh/agents', async () => {
  const dir = await makeTmpProject();
  try {
    assert.deepEqual(await readAgentCatalog(dir), []);
  } finally {
    await fs.remove(dir);
  }
});
