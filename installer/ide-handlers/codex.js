/**
 * Codex IDE Handler (CLI + desktop app)
 * Creates AGENTS.md (project memory, auto-loaded by Codex) and, since v2.2,
 * one native Codex agent per Toh agent in .codex/agents/*.toml.
 * The 14 /toh-* command skills and 23 framework skills reach Codex through
 * the shared .agents/skills/ writer in shared.js — this file never writes there.
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { transformCommand, renderCapabilitiesSection, seedFileIfAbsent } from './shared.js';
import { probeCodexCapabilitiesCached } from './capability-probe.js';
import crypto from 'crypto';
import { parse as parseToml } from 'smol-toml';

// Hard budget for the TOH marker block inside AGENTS.md. Codex silently
// truncates project docs at 32 KiB COMBINED (project_doc_max_bytes default),
// including any pre-existing user content above our marker — so our block must
// stay well under that. Exceeding this is a build bug, never a warning.
const MAX_TOH_BLOCK_BYTES = 24 * 1024;

// AGENTS.md is a shared open surface: Codex reads it as project memory, and so
// does ZCode (Z.ai) — same filename, same location, same marker block. Only
// three sentences differ per runtime, so both handlers build from one generator.
// Keys must match the canonical IDE keys in shared.js CAPABILITY_PROFILES.
const AGENTS_MD_RUNTIMES = {
  codex: {
    memoryEN: 'This file serves as project memory for Codex (CLI and desktop app). It contains the Toh Framework configuration and agent definitions.',
    memoryTH: 'This file is project memory for Codex (CLI and desktop app) containing Toh Framework configuration and agent definitions',
    runtimeName: 'Codex',
    commandHint: ' The 14 `/toh-*` workflows are also installed as Codex skills in `.agents/skills/` — invoke one explicitly with `$toh-<cmd>` (e.g. `$toh-vibe`) or browse them with `/skills`; typing `/toh-vibe ...` as plain text works too. The 8 Toh agents are installed as native Codex agents in `.codex/agents/*.toml` (full specs stay in `.toh/agents/`); when you delegate to one, hand it a self-contained brief — custom agents cannot receive a full-history fork.'
  },
  zcode: {
    memoryEN: 'This file serves as project memory for ZCode (Z.ai). It contains the Toh Framework configuration and agent definitions.',
    memoryTH: 'This file is project memory for ZCode (Z.ai) containing Toh Framework configuration and agent definitions',
    runtimeName: 'ZCode',
    commandHint: ' The 14 `/toh-*` commands are installed natively in `.agents/commands/` — invoke them directly; the same prompts are also discoverable as skills in `.agents/skills/`.'
  }
};

/**
 * The 'Runtime Identity' paragraph shared by the EN and TH generators.
 *
 * AGENTS.md is ONE file with TWO readers (Codex and ZCode) — it must never
 * claim a capability only one reader has. `probedSubagents` is therefore true
 * ONLY when codex is the sole writer of AGENTS.md for this run (no ZCode
 * selected now or declared earlier) AND the install-time capability probe
 * verified codex subagents as stable+enabled. In every other case the
 * conservative sentence below is byte-identical to pre-probe releases.
 */
function runtimeIdentityLine(rt, probedSubagents = false) {
  const capabilityClause = probedSubagents
    ? 'Native subagents: available per probed codex features — delegate for independent tasks; otherwise run the TOH LOOP sequentially'
    : 'Multi-agent features (subagents/teams) are unavailable here — execute the TOH LOOP sequentially';
  return `Runtime Identity: you are running in ${rt.runtimeName}. ${capabilityClause} in this session: implement -> run the story's checkpoint -> quote the actual output -> fix if red (max 5 tries, 3 consecutive failures = mark [!] BLOCKED and move on) -> tick the checkbox -> next story WITHOUT asking. Interrupted runs resume at the first unchecked box in .toh/plan.md — unless its header carries a terminal status (Status: done/draft/blocked/paused): a terminal plan is reported, never auto-resumed. Close every stage with the engineer-harness announce contract (Status/Result/Evidence/exactly 3 next actions).${rt.commandHint}`;
}

// Read version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'));
const VERSION = pkg.version;

// ---------------------------------------------------------------------------
// Native Codex agents (v2.2 — contributed by @pcbimon in PR #3, reshaped in
// review). Codex discovers project-scoped custom agents in .codex/agents/*.toml
// (developers.openai.com/codex/subagents); each Toh agent in .toh/agents/<name>.md
// becomes one TOML file. Two deliberate choices:
//   1. NO `model` key. An agent file without `model` inherits the parent
//      session's model (per the subagents doc), so the user's one config choice
//      governs every agent and a future model rename never strands an install.
//      Only `model_reasoning_effort` is set, from the agent's declared intent.
//   2. Ownership by hash. .codex/toh-framework.json records the sha256 of every
//      agent file we wrote. A file whose hash no longer matches was edited (or
//      created) by the user and is never overwritten or removed.
// ---------------------------------------------------------------------------
export const CODEX_AGENTS_DIR = path.join('.codex', 'agents');
export const CODEX_MANIFEST_PATH = path.join('.codex', 'toh-framework.json');
const MANIFEST_GENERATOR = 'toh-framework';
const AGENT_NAME_RE = /^[a-z0-9-]{1,64}$/;
const MODEL_INTENTS = new Set(['lightweight', 'implementation', 'planning', 'review']);
// Same rule cursor.js uses for `readonly`: an allowlist with no write tool is
// read-only by design (root-cause-debugger: Read/Grep/Glob/Bash).
const READ_ONLY_TOOLS = new Set(['Read', 'Grep', 'Glob', 'Bash']);

/** Toh model intent → Codex reasoning effort. The model itself is inherited. */
export const CODEX_REASONING_EFFORT = Object.freeze({
  lightweight: 'low',
  implementation: 'medium',
  planning: 'high',
  review: 'high'
});

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function agentRelPath(name) {
  // Manifest keys are POSIX so the file is portable across platforms.
  return `.codex/agents/${name}.toml`;
}

function normalizeModelIntent(value) {
  const intent = String(value || '').trim().toLowerCase().replaceAll('_', '-');
  const aliases = {
    exploration: 'lightweight',
    explore: 'lightweight',
    scaffold: 'lightweight',
    deep: 'planning',
    'deep-reasoning': 'planning',
    security: 'review'
  };
  return aliases[intent] || intent;
}

/**
 * `modelIntent` frontmatter wins; otherwise derive from the Claude tier so
 * agents that predate the key still get sensible reasoning effort.
 */
export function resolveCodexModelIntent(frontmatter = {}) {
  const explicit = normalizeModelIntent(frontmatter.modelIntent || frontmatter.model_intent);
  if (MODEL_INTENTS.has(explicit)) return explicit;
  const tier = String(frontmatter.model || '').trim().toLowerCase();
  if (tier === 'haiku') return 'lightweight';
  if (tier === 'opus') return 'planning';
  return 'implementation';
}

function parseAgentFile(raw, label) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`[toh-framework] ${label} must start with YAML frontmatter.`);
  try {
    return { frontmatter: yaml.load(match[1]) || {}, body: match[2] };
  } catch (error) {
    throw new Error(`[toh-framework] Invalid YAML frontmatter in ${label}: ${error.message}`);
  }
}

/** Read the installed Toh agents from .toh/agents/ (the runtime source of truth). */
export async function readAgentCatalog(targetDir) {
  const agentsDir = path.join(targetDir, '.toh', 'agents');
  if (!(await fs.pathExists(agentsDir))) return [];
  const files = (await fs.readdir(agentsDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md')
    .map((entry) => entry.name)
    .sort();
  const agents = [];
  for (const file of files) {
    const sourcePath = path.join(agentsDir, file);
    const { frontmatter, body } = parseAgentFile(await fs.readFile(sourcePath, 'utf-8'), sourcePath);
    const name = String(frontmatter.name || file.replace(/\.md$/, '')).trim();
    if (!AGENT_NAME_RE.test(name)) continue;
    agents.push({
      name,
      description: String(frontmatter.description || `${name} (Toh Framework agent)`).replace(/\s+/g, ' ').trim().slice(0, 1024),
      body,
      tools: Array.isArray(frontmatter.tools) ? frontmatter.tools.map(String) : [],
      skills: Array.isArray(frontmatter.skills) ? frontmatter.skills.map(String) : [],
      triggers: Array.isArray(frontmatter.triggers) ? frontmatter.triggers.map(String) : [],
      modelIntent: resolveCodexModelIntent(frontmatter),
      maxTurns: frontmatter.maxTurns
    });
  }
  return agents;
}

function isReadOnlyAgent(agent) {
  return agent.tools.length > 0 && agent.tools.every((tool) => READ_ONLY_TOOLS.has(tool));
}

/** One Toh agent → one Codex agent TOML document (validated before it is returned). */
export function translateAgentToCodex(agent) {
  const effort = CODEX_REASONING_EFFORT[agent.modelIntent] || CODEX_REASONING_EFFORT.implementation;
  const skillRefs = agent.skills.length
    ? `\nAssociated Toh skills (read before acting):\n${agent.skills.map((skill) => `- .toh/skills/${skill}/SKILL.md`).join('\n')}`
    : '';
  const toolBoundary = agent.tools.length
    ? `\nSource tool boundary: ${agent.tools.join(', ')}. Do not widen it.`
    : '';
  const triggerHints = agent.triggers.length ? `\nRouting hints: ${agent.triggers.join('; ')}` : '';
  const turnHint = agent.maxTurns === undefined ? '' : `\nSource turn budget hint: ${agent.maxTurns}.`;
  const instructions = `${agent.body.trim()}

## Codex runtime contract
- Own only the task and files assigned by the parent.
- Return Status, Result, Evidence, Files, and Blockers.
- Run the supplied checkpoint; the parent re-runs it before changing .toh/plan.md.
- Keep dependent work sequential and return to the parent when complete.${skillRefs}${toolBoundary}${triggerHints}${turnHint}`;

  const content = [
    `# Generated by Toh Framework v${VERSION} from .toh/agents/${agent.name}.md`,
    `# Toh model intent: ${agent.modelIntent}. No \`model\` key on purpose: the agent`,
    `# inherits the parent session's model, so your one config choice governs it.`,
    `name = ${JSON.stringify(agent.name)}`,
    `description = ${JSON.stringify(agent.description)}`,
    `model_reasoning_effort = ${JSON.stringify(effort)}`,
    `sandbox_mode = ${JSON.stringify(isReadOnlyAgent(agent) ? 'read-only' : 'workspace-write')}`,
    `developer_instructions = ${JSON.stringify(instructions.trim())}`,
    ''
  ].join('\n');
  try {
    parseToml(content);
  } catch (error) {
    throw new Error(`[toh-framework] Generated Codex agent TOML for ${agent.name} is invalid: ${error.message}`);
  }
  return content;
}

async function readCodexManifest(targetDir) {
  const manifestPath = path.join(targetDir, CODEX_MANIFEST_PATH);
  const empty = { generator: MANIFEST_GENERATOR, version: VERSION, agents: {} };
  if (!(await fs.pathExists(manifestPath))) return empty;
  try {
    const manifest = await fs.readJson(manifestPath);
    if (manifest.generator !== MANIFEST_GENERATOR || typeof manifest.agents !== 'object' || manifest.agents === null) {
      return empty;
    }
    return { ...empty, ...manifest };
  } catch {
    return empty;
  }
}

async function writeCodexManifest(targetDir, manifest) {
  const manifestPath = path.join(targetDir, CODEX_MANIFEST_PATH);
  await fs.ensureDir(path.dirname(manifestPath));
  await fs.writeJson(manifestPath, manifest, { spaces: 2 });
}

async function fileMatchesHash(filePath, expectedHash) {
  if (!expectedHash || !(await fs.pathExists(filePath))) return false;
  try {
    return sha256(await fs.readFile(filePath)) === expectedHash;
  } catch {
    return false;
  }
}

/**
 * Write .codex/agents/<name>.toml for every agent in .toh/agents/.
 * Ownership-safe: a file we did not write (or that the user edited since) is
 * kept as-is and reported; stale files we wrote for agents that no longer
 * exist are removed only when still byte-identical to what we wrote.
 */
export async function installCodexAgents(targetDir) {
  const agents = await readAgentCatalog(targetDir);
  if (agents.length === 0) return { installed: [], kept: [], total: 0 };

  const previous = await readCodexManifest(targetDir);
  const previousAgents = previous.agents || {};
  const nextAgents = {};
  const wanted = new Set(agents.map((agent) => agentRelPath(agent.name)));
  await fs.ensureDir(path.join(targetDir, CODEX_AGENTS_DIR));

  for (const [rel, record] of Object.entries(previousAgents)) {
    if (wanted.has(rel) || !rel.startsWith('.codex/agents/')) continue;
    const filePath = path.join(targetDir, rel);
    if (await fileMatchesHash(filePath, record.sha256)) await fs.remove(filePath);
  }

  const installed = [];
  const kept = [];
  for (const agent of agents) {
    const rel = agentRelPath(agent.name);
    const filePath = path.join(targetDir, rel);
    const content = translateAgentToCodex(agent);
    const record = previousAgents[rel];
    const exists = await fs.pathExists(filePath);
    if (exists && !(await fileMatchesHash(filePath, record?.sha256))) {
      // Not ours, or edited since we wrote it — the user's file wins.
      if (record) nextAgents[rel] = record;
      kept.push(agent.name);
      continue;
    }
    await fs.writeFile(filePath, content);
    nextAgents[rel] = { sha256: sha256(content), source: `.toh/agents/${agent.name}.md`, modelIntent: agent.modelIntent };
    installed.push(agent.name);
  }
  await writeCodexManifest(targetDir, { ...previous, version: VERSION, agents: nextAgents });
  return { installed, kept, total: agents.length };
}

/**
 * `toh uninstall --ide codex`: remove ONLY the native agent files this
 * installer wrote (hash-verified) plus the manifest. AGENTS.md and
 * .codex/config.toml are shared surfaces (ZCode reads AGENTS.md too) and are
 * handled by the full uninstall planner in installer/uninstall.js.
 */
export async function uninstallCodex(targetDir, options = {}) {
  const { dryRun = false, backup = true } = options;
  const manifest = await readCodexManifest(targetDir);
  const removed = [];
  const kept = [];
  for (const [rel, record] of Object.entries(manifest.agents || {})) {
    if (!rel.startsWith('.codex/agents/') || !rel.endsWith('.toml')) continue;
    const filePath = path.join(targetDir, rel);
    if (!(await fs.pathExists(filePath))) continue;
    if (await fileMatchesHash(filePath, record.sha256)) removed.push({ rel, filePath });
    else kept.push(rel);
  }
  const result = {
    removedAgents: removed.map((item) => path.basename(item.rel, '.toml')).sort(),
    keptAgents: kept.map((rel) => path.basename(rel, '.toml')).sort(),
    dryRun,
    backupPath: null
  };
  if (dryRun) return result;

  if (backup && removed.length > 0) {
    const backupDir = path.join(targetDir, '.toh-uninstall-backup', `codex-agents-${Date.now()}`);
    for (const item of removed) {
      const destination = path.join(backupDir, item.rel);
      await fs.ensureDir(path.dirname(destination));
      await fs.copy(item.filePath, destination);
    }
    result.backupPath = backupDir;
  }
  for (const item of removed) await fs.remove(item.filePath);
  const agentsDir = path.join(targetDir, CODEX_AGENTS_DIR);
  if (await fs.pathExists(agentsDir) && (await fs.readdir(agentsDir)).length === 0) await fs.remove(agentsDir);
  const manifestPath = path.join(targetDir, CODEX_MANIFEST_PATH);
  if (await fs.pathExists(manifestPath)) await fs.remove(manifestPath);
  return result;
}

/**
 * Create memory template files for the Memory System (v1.7.0)
 * Now includes architecture.md and components.md for Code Architecture Tracking
 */
async function createMemoryFiles(memoryDir, language = 'en') {
  const timestamp = new Date().toISOString().split('T')[0];

  const activeContent = language === 'th'
    ? `# 🔥 Active Task\n\n## Current Focus\n[รอคำสั่งจากผู้ใช้]\n\n## In Progress\n- (ยังไม่มี)\n\n## Next Steps\n- รอคำสั่งจากผู้ใช้\n\n---\n*Last updated: ${timestamp}*\n`
    : `# 🔥 Active Task\n\n## Current Focus\n[Waiting for user command]\n\n## In Progress\n- (none)\n\n## Next Steps\n- Waiting for user command\n\n---\n*Last updated: ${timestamp}*\n`;

  const summaryContent = language === 'th'
    ? `# 📋 Project Summary\n\n## Project Overview\n- Name: [ชื่อโปรเจค]\n- Tech Stack: Next.js 16, Tailwind, shadcn/ui, Zustand, Supabase\n\n## Completed Features\n- (ยังไม่มี)\n\n## Important Notes\n- ใช้ Toh Framework v${VERSION}\n\n---\n*Last updated: ${timestamp}*\n`
    : `# 📋 Project Summary\n\n## Project Overview\n- Name: [Project Name]\n- Tech Stack: Next.js 16, Tailwind, shadcn/ui, Zustand, Supabase\n\n## Completed Features\n- (none)\n\n## Important Notes\n- Using Toh Framework v${VERSION}\n\n---\n*Last updated: ${timestamp}*\n`;

  const decisionsContent = language === 'th'
    ? `# 🧠 Key Decisions\n\n## Architecture Decisions\n| Date | Decision | Reason |\n|------|----------|--------|\n| ${timestamp} | ใช้ Toh Framework | AI-Orchestration Driven Development |\n\n---\n*Last updated: ${timestamp}*\n`
    : `# 🧠 Key Decisions\n\n## Architecture Decisions\n| Date | Decision | Reason |\n|------|----------|--------|\n| ${timestamp} | Use Toh Framework | AI-Orchestration Driven Development |\n\n---\n*Last updated: ${timestamp}*\n`;

  // architecture.md (v1.7.0 - Code Architecture Tracking)
  const architectureContent = `# 🏗️ Project Architecture

> Semantic overview of project structure for AI context loading
> **Update:** After any structural changes (new pages, routes, modules, services)

---

## 📁 Entry Points

| Type | Path | Purpose |
|------|------|---------|
| Main | \`app/page.tsx\` | Landing/Home page |
| Layout | \`app/layout.tsx\` | Root layout with providers |
| API | \`app/api/\` | API routes (if any) |

---

## 🗂️ Core Modules

### \`/app\` - Pages & Routes

| Route | File | Description | Key Functions |
|-------|------|-------------|---------------|
| \`/\` | \`app/page.tsx\` | Landing page | - |

### \`/components\` - UI Components

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| \`ui/\` | shadcn/ui components | button, card, input, etc. |
| \`layout/\` | Layout components | Navbar, Sidebar, Footer |
| \`features/\` | Feature-specific | Per feature components |

### \`/lib\` - Utilities & Services

| File | Purpose | Key Functions |
|------|---------|---------------|
| \`lib/utils.ts\` | Utility functions | cn(), formatDate() |

---

## 🔄 Data Flow Pattern

User Action → Component → Zustand Store → API/Lib → Database (Supabase)

---

## 🔌 External Services

| Service | Purpose | Config Location |
|---------|---------|-----------------|
| Supabase | Backend (Auth, DB) | \`lib/supabase/\` |

---

## 📝 Notes

- Using Toh Framework v${VERSION}
- Architecture tracking enabled

---
*Last updated: ${timestamp}*
`;

  // components.md (v1.7.0 - Component Registry)
  const componentsContent = `# 📦 Component Registry

> Quick reference for all project components, hooks, and utilities
> **Update:** After creating/modifying any component, hook, or utility

---

## 📄 Pages

| Route | File | Description | Key Dependencies |
|-------|------|-------------|------------------|
| \`/\` | \`app/page.tsx\` | Landing page | - |

---

## 🧩 Components

### Layout Components

| Component | Location | Key Props | Used By |
|-----------|----------|-----------|---------|
| (none yet) | - | - | - |

### Feature Components

| Component | Location | Key Props | Used By |
|-----------|----------|-----------|---------|
| (none yet) | - | - | - |

---

## 🪝 Custom Hooks

| Hook | Location | Purpose | Returns |
|------|----------|---------|---------|
| (none yet) | - | - | - |

---

## 🏪 Zustand Stores

| Store | Location | State Shape | Key Actions |
|-------|----------|-------------|-------------|
| (none yet) | - | - | - |

---

## 🛠️ Utility Functions

| Function | Location | Purpose | Params |
|----------|----------|---------|--------|
| cn | \`lib/utils.ts\` | Merge Tailwind classes | \`...inputs\` |

---

## 📊 Component Statistics

| Category | Count |
|----------|-------|
| Pages | 1 |
| Components | 0 |
| Hooks | 0 |
| Stores | 0 |

---
*Last updated: ${timestamp}*
`;

  // changelog.md (v1.8.0 - Session Changelog)
  const changelogContent = `# 📝 Session Changelog

## [Current Session] - ${timestamp}

### Changes Made
| Agent | Action | File/Component |
|-------|--------|----------------|
| - | - | - |

### Next Session TODO
- [ ] Continue from: [last task]

---
*Auto-updated by agents after each task*
`;

  // agents-log.md (v1.8.0 - Agent Activity Log)
  const agentsLogContent = `# 🤖 Agents Activity Log

## Recent Activity
| Time | Agent | Task | Status | Files |
|------|-------|------|--------|-------|
| - | - | - | - | - |

## Agent Statistics
- Total Tasks: 0
- Success Rate: 100%

---
*Auto-updated by agents during execution*
`;

  // Seed the 7 memory files - ONLY where absent (issue #2: a reinstall
  // must never clobber live memory; even an empty file is the user's).
  await seedFileIfAbsent(path.join(memoryDir, 'active.md'), activeContent);
  await seedFileIfAbsent(path.join(memoryDir, 'summary.md'), summaryContent);
  await seedFileIfAbsent(path.join(memoryDir, 'decisions.md'), decisionsContent);
  await seedFileIfAbsent(path.join(memoryDir, 'architecture.md'), architectureContent);
  await seedFileIfAbsent(path.join(memoryDir, 'components.md'), componentsContent);
  await seedFileIfAbsent(path.join(memoryDir, 'changelog.md'), changelogContent);
  await seedFileIfAbsent(path.join(memoryDir, 'agents-log.md'), agentsLogContent);
}

/**
 * Build and write the root AGENTS.md marker block.
 *
 * Shared surface: Codex reads AGENTS.md as project memory, and so does ZCode
 * (Z.ai) — same filename, same marker block, three runtime sentences apart.
 * Exported so zcode.js reuses this instead of forking a second generator.
 *
 * Content outside <!-- TOH-FRAMEWORK-START/END --> is always preserved.
 * Returns the byte size of the generated block.
 */
export async function writeAgentsMd(targetDir, srcDir, language = 'en', ide = 'codex', options = {}) {
  // v2.1.x (issue #2 problem 2): the Runtime Identity sentence may claim
  // probed native subagents ONLY when the caller says codex is the SOLE
  // reader/writer of AGENTS.md (options.allowProbedSubagents — install.js
  // sets it to false whenever ZCode is selected now or was declared earlier)
  // AND the live probe of the installed codex CLI verified the feature.
  // Probe failure, ZCode co-install, or zcode-only installs all keep the
  // conservative sentence byte-identical.
  let probedSubagents = false;
  if (ide === 'codex' && options.allowProbedSubagents === true) {
    const probe = await probeCodexCapabilitiesCached();
    probedSubagents = probe.ok === true && probe.overrides?.subagents === 'native';
  }
  // Read all agents — v2.1 (W1): embed a compact roster table ONLY.
  // Full agent bodies used to be inlined here, which pushed AGENTS.md to
  // ~117 KB while Codex silently truncates project docs at 32 KiB combined —
  // 6/8 agents and everything after them were dropped without warning.
  // Full specs live in .toh/agents/ and are read at runtime instead (the same
  // .toh/ runtime-read pattern cursor.js uses).
  const srcAgentsDir = path.join(srcDir, 'agents');
  let agentRoster = '';

  if (await fs.pathExists(srcAgentsDir)) {
    const agentFiles = (await fs.readdir(srcAgentsDir)).sort();
    const rows = [];
    for (const file of agentFiles) {
      if (file.endsWith('.md') && file !== 'README.md') {
        const raw = await fs.readFile(path.join(srcAgentsDir, file), 'utf-8');
        const agentName = file.replace('.md', '');
        const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (!fmMatch) {
          throw new Error(`[toh-framework] src/agents/${file} has no YAML frontmatter — cannot build the Codex agent roster.`);
        }
        // Agents carry superset frontmatter (name/description/tools/model/
        // skills/triggers/...). The roster needs name, model and description
        // only; a parse failure here is a packaging bug — let it throw.
        const fm = yaml.load(fmMatch[1]) || {};
        const desc = String(fm.description || '').replace(/\s+/g, ' ').trim();
        // Role = first sentence of the description ('.md' never terminates —
        // boundary is a period followed by whitespace/end).
        const roleMatch = desc.match(/^(.*?)\.(?:\s|$)/);
        const role = roleMatch ? roleMatch[1].trim() : desc;
        // 'Delegate when' sentence (colon optional — root-cause-debugger
        // phrases it without one), same boundary rule.
        const delegateMatch = desc.match(/Delegate when:?\s*([\s\S]*?)(?:\.(?:\s|$)|$)/);
        const delegateWhen = delegateMatch ? delegateMatch[1].trim() : '(see agent file)';
        rows.push(`| \`${fm.name || agentName}\` | ${fm.model || 'sonnet'} | ${role} | ${delegateWhen} |`);
      }
    }
    agentRoster = [
      '| Agent | Model | Role | Delegate when |',
      '|-------|-------|------|---------------|',
      ...rows
    ].join('\n');
  }

  // v2.0: run the assembled markdown through the shared marker transform so any
  // <!-- tfw:claude --> blocks in embedded command/agent markdown are removed and
  // <!-- tfw:fallback --> blocks are unwrapped for Codex (idempotent, additive).
  const agentsMd = transformCommand(
    language === 'th'
      ? generateAgentsMdTH(agentRoster, ide, probedSubagents)
      : generateAgentsMdEN(agentRoster, ide, probedSubagents),
    ide
  );

  // W1 hard size assertion: never ship a block Codex would silently truncate.
  const tohBlockBytes = Buffer.byteLength(agentsMd, 'utf-8');
  if (tohBlockBytes > MAX_TOH_BLOCK_BYTES) {
    const err = new Error(
      `[toh-framework] Generated AGENTS.md TOH block is ${tohBlockBytes} bytes — over the ` +
      `${MAX_TOH_BLOCK_BYTES}-byte hard budget (Codex truncates project docs at 32 KiB combined ` +
      `with any user content). Refusing to install a silently-truncated AGENTS.md; slim the ` +
      `generator in installer/ide-handlers/codex.js.`
    );
    // Hard size budget: over-budget output would be silently truncated by
    // Codex. install.js aborts the whole install (non-zero exit) on fatal errors.
    err.fatal = true;
    throw err;
  }

  // Check if AGENTS.md exists
  const agentsPath = path.join(targetDir, 'AGENTS.md');
  
  if (await fs.pathExists(agentsPath)) {
    // Read existing content
    let existing = await fs.readFile(agentsPath, 'utf-8');
    
    // Replace TOH section if exists, otherwise append
    if (existing.includes('<!-- TOH-FRAMEWORK-START -->')) {
      existing = existing.replace(
        /<!-- TOH-FRAMEWORK-START -->[\s\S]*<!-- TOH-FRAMEWORK-END -->/,
        agentsMd.trim()
      );
      await fs.writeFile(agentsPath, existing);
    } else {
      await fs.appendFile(agentsPath, '\n\n' + agentsMd);
    }
  } else {
    await fs.writeFile(agentsPath, agentsMd);
  }

  return tohBlockBytes;
}

export async function setupCodex(targetDir, srcDir, language = 'en', options = {}) {
  // Create .toh/memory directory structure (v1.1.0 - Memory System)
  const memoryDir = path.join(targetDir, '.toh', 'memory');
  await fs.ensureDir(path.join(memoryDir, 'archive'));
  await createMemoryFiles(memoryDir, language);

  await writeAgentsMd(targetDir, srcDir, language, 'codex', options);

  // W1 belt-and-braces: project-scoped .codex/config.toml raising Codex's
  // project-doc budget (officially supported key, per config-reference), so
  // even a large pre-existing user AGENTS.md above our marker cannot push the
  // combined file past the read cutoff. NEVER overwrite a user's config.toml.
  const codexConfigPath = path.join(targetDir, '.codex', 'config.toml');
  if (!(await fs.pathExists(codexConfigPath))) {
    await fs.ensureDir(path.dirname(codexConfigPath));
    await fs.writeFile(
      codexConfigPath,
      `# Generated by Toh Framework v${VERSION}\n` +
      `# Raises Codex's per-project doc read budget (default 32768 bytes) so the\n` +
      `# full AGENTS.md — including the Toh Framework block — is always loaded.\n` +
      `# Safe to edit; the installer never overwrites an existing config.toml.\n` +
      `project_doc_max_bytes = 131072\n`
    );
  }

  // v2.2: native Codex agents, one TOML per Toh agent (ownership-safe).
  const agents = await installCodexAgents(targetDir);
  const keptNote = agents.kept.length ? `, ${agents.kept.length} kept as edited` : '';
  return `AGENTS.md + .codex/agents/ (${agents.installed.length}/${agents.total} agents${keptNote})`;
}

function generateAgentsMdEN(agentRoster, ide = 'codex', probedSubagents = false) {
  const rt = AGENTS_MD_RUNTIMES[ide] || AGENTS_MD_RUNTIMES.codex;
  return `<!-- TOH-FRAMEWORK-START -->
# 🎯 Toh Framework

> **"Type Once, Have it all!"** - AI-Orchestration Driven Development

## Project Memory

${rt.memoryEN}

This file is a compact index. Full specs live on disk and MUST be read at runtime:
- Commands → \`.toh/commands/toh-<cmd>.md\`
- Agents → \`.toh/agents/<name>.md\`
- Skills → \`.toh/skills/<skill-name>/SKILL.md\`

## Identity

You are the **Toh Framework Agent** - an AI that helps Solo Developers build SaaS systems by themselves.

${renderCapabilitiesSection(ide)}

${runtimeIdentityLine(rt, probedSubagents)}

## Core Philosophy (AODD - AI-Orchestration Driven Development)

1. **Natural Language → Tasks** - Users give commands in plain language, you break them into tasks
2. **Orchestrator → Agents** - Automatically invoke relevant agents to complete work
3. **Users Don't Touch the Process** - No questions, no waiting, just deliver results
4. **Test → Fix → Loop** - Test, fix issues, repeat until passing

## Tech Stack (Fixed - NEVER CHANGE)

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Testing | Playwright |
| Language | TypeScript (strict) |

## Language Rules

- **Response Language:** Respond in the same language the user uses (if unclear, default to English)
- **UI Labels/Buttons:** English (Save, Cancel, Dashboard)
- **Mock Data:** English names, addresses, phone numbers
- **Code Comments:** English
- **Validation Messages:** English

If user writes in Thai, respond in Thai.

## 🚨 Command Recognition (CRITICAL)

> **YOU MUST recognize and execute these commands immediately!**
> When user types ANY of these patterns, treat them as direct commands.
> The table below is an INDEX only — when a command is invoked, read
> \`.toh/commands/toh-<cmd>.md\` (e.g. \`.toh/commands/toh-vibe.md\`) and follow it.
> That file is the command's full behavior spec.

| Command | Shortcuts (ALL VALID) | Purpose |
|---------|----------------------|---------|
| \`/toh-help\` | \`/toh-h\`, \`toh help\`, \`toh h\` | Show all commands |
| \`/toh-plan\` | \`/toh-p\`, \`toh plan\`, \`toh p\` | **THE BRAIN** — writes .toh/plan.md, one approval, then builds autonomously |
| \`/toh-vibe\` | \`/toh-v\`, \`toh vibe\`, \`toh v\` | Create new project with UI + Logic + Mock Data |
| \`/toh-ui\` | \`/toh-u\`, \`toh ui\`, \`toh u\` | Create UI - Pages, Components, Layouts |
| \`/toh-dev\` | \`/toh-d\`, \`toh dev\`, \`toh d\` | Add Logic - TypeScript, Zustand, Forms |
| \`/toh-design\` | \`/toh-ds\`, \`toh design\`, \`toh ds\` | Improve Design - Make it look professional |
| \`/toh-test\` | \`/toh-t\`, \`toh test\`, \`toh t\` | Test system - Auto test & fix until passing |
| \`/toh-connect\` | \`/toh-c\`, \`toh connect\`, \`toh c\` | Connect Backend - Supabase, Auth, RLS |
| \`/toh-line\` | \`/toh-l\`, \`toh line\`, \`toh l\` | LINE MINI App - convert (LIFF SDK) |
| \`/toh-mobile\` | \`/toh-m\`, \`toh mobile\`, \`toh m\` | Mobile App - PWA / Capacitor |
| \`/toh-fix\` | \`/toh-f\`, \`toh fix\`, \`toh f\` | Fix bugs - Debug and fix issues |
| \`/toh-ship\` | \`/toh-s\`, \`toh ship\`, \`toh s\` | Deploy - Vercel, Production ready |
| \`/toh-protect\` | \`/toh-pt\`, \`toh protect\`, \`toh pt\` | Security audit - Full security check |

### ⚡ Execution Rules:

1. **Instant Recognition** - When you see \`/toh-\` or \`toh \` prefix, this is a COMMAND
2. **Read the command file first** - \`.toh/commands/toh-<cmd>.md\` is the full spec; never execute from this index alone
3. **Check for Description** - Does the command have a description after it?
   - ✅ **Has description** → Execute immediately, no confirmation
   - ❓ **No description** → Introduce yourself as that command's agent and ask what to do (e.g. "I'm the **Vibe Agent** 🎨. What system would you like me to build?"). Exception: \`/toh-help\` always runs immediately
4. **Follow Memory Protocol** - Read/write \`.toh/memory/\` before/after

## Memory System (Auto, 7 files — Tiered Loading)

Toh Framework has automatic memory at \`.toh/memory/\`. Read only what the task needs:
- **Tier 1 (ALWAYS read, ~800 tokens):** \`active.md\` (current task) + \`summary.md\` (project overview)
- **Tier 2 (per task type):** \`architecture.md\` + \`components.md\` for build/code work; \`changelog.md\` for debug work
- **Tier 3 (only when referenced):** \`decisions.md\` (past decisions) + \`agents-log.md\` (agent activity)
- \`archive/\` - Historical data (on-demand only)

## 🚨 MANDATORY: Memory Protocol (Tiered Loading)

> **CRITICAL:** You MUST follow this protocol EVERY time! Never read all 7 files by reflex.

### BEFORE Starting ANY Work:
1. Check \`.toh/memory/\` folder exists
2. Read Tier 1: \`.toh/memory/active.md\` + \`.toh/memory/summary.md\`
3. Read Tier 2 for this task type (build/code → \`architecture.md\` + \`components.md\`; debug → \`changelog.md\`)
4. Read Tier 3 (\`decisions.md\`, \`agents-log.md\`) ONLY when referenced
5. If files empty but project has code → ANALYZE and populate first!
6. Acknowledge: "Memory loaded! [Brief context]"

### AFTER Completing ANY Work (write per relevance):
1. Update \`.toh/memory/active.md\` - ALWAYS (what was done, next steps)
2. Update \`.toh/memory/summary.md\` - when the project shape changes (feature done / new structure)
3. Update \`.toh/memory/architecture.md\` / \`components.md\` - when modules/stores/hooks/utils change
4. Update \`.toh/memory/changelog.md\` + \`agents-log.md\` - record the change and which agent did it
5. Update \`.toh/memory/decisions.md\` - if a real decision was made
6. Confirm: "Memory saved ✅"

### ⚠️ CRITICAL RULES:
- NEVER start work without reading Tier 1 (active.md + summary.md)!
- NEVER finish work without updating active.md!
- Read Tier 2 / Tier 3 only when the task type or a reference calls for it!
- Memory files must ALWAYS be in English!

## Behavior Rules

1. **Don't ask basic questions** - Make decisions yourself
2. **Use the fixed tech stack** - Never change it
3. **Respond in English** - All communication in English
4. **English Mock Data** - Use English names, addresses, phone numbers
5. **UI First** - Create working UI before backend
6. **Production Ready** - Not a prototype

## Mock Data Examples

Use realistic English data:
- Names: John, Mary, Michael, Sarah
- Last names: Smith, Johnson, Williams
- Cities: New York, Los Angeles, Chicago
- Phone: (555) 123-4567
- Email: john.smith@example.com

## Agents (roster — full specs in \`.toh/agents/\`)

${agentRoster}

This table is a summary ONLY. Before acting as (or delegating to) any agent,
read \`.toh/agents/<name>.md\` — the agent's workflow, rules, tool limits, and
quality bar live in that file, not here.

## 🚨 MANDATORY: Skills & Agents Loading

> **CRITICAL:** Before executing ANY /toh- command, you MUST load the required skills!

### Command → Skills Map

| Command | Load These Skills (from \`.toh/skills/\`) |
|---------|------------------------------------------|
| \`/toh\` | \`smart-routing\`, \`orchestration-protocol\`, \`engineer-harness\` |
| \`/toh-vibe\` | \`vibe-orchestrator\`, \`orchestration-protocol\`, \`premium-experience\`, \`design-craft\`, \`ui-first-builder\`, \`engineer-harness\` |
| \`/toh-ui\` | \`ui-first-builder\`, \`design-craft\`, \`engineer-harness\` |
| \`/toh-dev\` | \`dev-engineer\`, \`backend-engineer\`, \`engineer-harness\` |
| \`/toh-design\` | \`design-craft\`, \`premium-experience\` |
| \`/toh-test\` | \`test-engineer\`, \`debug-protocol\`, \`error-handling\` |
| \`/toh-connect\` | \`backend-engineer\`, \`integrations\` |
| \`/toh-plan\` | \`plan-orchestrator\`, \`orchestration-protocol\`, \`business-context\`, \`smart-routing\`, \`engineer-harness\` |
| \`/toh-fix\` | \`debug-protocol\`, \`error-handling\`, \`test-engineer\` |
| \`/toh-line\` | \`platform-specialist\`, \`integrations\` |
| \`/toh-mobile\` | \`platform-specialist\`, \`ui-first-builder\` |
| \`/toh-ship\` | \`version-control\`, \`progress-tracking\` |
| \`/toh-protect\` | \`engineer-harness\` |
| \`/toh-help\` | (none — self-contained; run \`.toh/commands/toh-help.md\` directly) |

### Core Skills (Always Available)
- \`memory-system\` - Memory read/write protocol
- \`engineer-harness\` - Smart tool selection + human-friendly reporting + next steps
- \`smart-routing\` - Command routing logic

### Loading Protocol:
1. User types /toh-[command]
2. Read required skill files from \`.toh/skills/[skill-name]/SKILL.md\`
3. Execute following skill instructions
4. Save memory after completion

### ⚠️ NEVER Skip Skills!
Skills contain CRITICAL best practices, design tokens, and rules.

## 🔒 Skills Loading Checkpoint (REQUIRED)

> **ENFORCEMENT:** You MUST report skills loaded at the START of your response!

### Required Response Start:

\`\`\`markdown
📚 **Skills Loaded:**
- skill-name-1 ✅ (brief what you learned)
- skill-name-2 ✅ (brief what you learned)

🤖 **Agent:** agent-name

💾 **Memory:** Loaded ✅

---

[Then continue with your work...]
\`\`\`

### Why This Matters:
- If you don't report skills → You didn't read them
- If you skip skills → Output quality drops significantly
- Skills have design tokens, patterns, and critical rules
- This checkpoint proves you followed the protocol

## Skills Reference

All skills are in \`.toh/skills/\` (Central Resources):
- \`vibe-orchestrator\` - Core methodology
- \`ui-first-builder\` - UI patterns
- \`dev-engineer\` - TypeScript, State, Forms
- \`design-craft\` - Design system, anti-patterns & business-appropriate fit
- \`premium-experience\` - Premium multi-page apps
- \`test-engineer\` - Testing with Playwright
- \`backend-engineer\` - Supabase integration
- \`platform-specialist\` - LINE, Mobile, Desktop
- \`memory-system\` - Memory protocol
- \`engineer-harness\` - Smart tool selection, reporting & next steps
- \`debug-protocol\` - Debugging guide
- \`error-handling\` - Error handling patterns

## Getting Started

Start with:
\`\`\`
/toh-vibe [describe what system you want]
\`\`\`

The AI will:
1. Analyze your requirements
2. Break down into tasks
3. Create UI with English mock data
4. Add logic and state management
5. Polish the design
6. Deliver production-ready code

---

**GitHub:** https://github.com/wasintoh/toh-framework
**Author:** Wasin Treesinthuros (Innovation Vantage)

<!-- TOH-FRAMEWORK-END -->
`;
}

function generateAgentsMdTH(agentRoster, ide = 'codex', probedSubagents = false) {
  const rt = AGENTS_MD_RUNTIMES[ide] || AGENTS_MD_RUNTIMES.codex;
  return `<!-- TOH-FRAMEWORK-START -->
# 🎯 Toh Framework

> **"Type Once, Have it all!"** - AI-Orchestration Driven Development
> **"Command once, done without questions"**

## Project Memory

${rt.memoryTH}

This file is a compact index. Full specs live on disk and MUST be read at runtime:
- Commands → \`.toh/commands/toh-<cmd>.md\`
- Agents → \`.toh/agents/<name>.md\`
- Skills → \`.toh/skills/<skill-name>/SKILL.md\`

## Identity

You are **Toh Framework Agent** - AI that helps Solo Developers build SaaS by themselves

${renderCapabilitiesSection(ide)}

${runtimeIdentityLine(rt, probedSubagents)}

## Core Philosophy (AODD - AI-Orchestration Driven Development)

1. **Human Language → Tasks** - User commands naturally, you break into tasks
2. **Orchestrator → Agents** - Call relevant agents to work automatically
3. **User doesn't handle process** - No questions, no waiting, just complete it
4. **Test → Fix → Loop** - Test, fix, until pass

## Tech Stack (Do not change!)

| Category | Technology |
|------|----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Testing | Playwright |
| Language | TypeScript (strict) |

## Language Rules

- **Response Language:** Match user's language (if unsure, use Thai)
- **UI Labels/Buttons:** Thai (Save, Cancel, Dashboard)
- **Mock Data:** Thai names, addresses, phone numbers
- **Code Comments:** Thai allowed
- **Validation Messages:** Thai

If user types in English, respond in English

## 🚨 Command Handling (Very Important!)

> **You must remember and execute these commands immediately!**
> When user types any pattern below, treat it as a direct command
> The table below is an INDEX only — when a command is invoked, read
> \`.toh/commands/toh-<cmd>.md\` (e.g. \`.toh/commands/toh-vibe.md\`) and follow it.
> That file is the command's full behavior spec.

| Command | Shortcuts (ALL VALID) | Purpose |
|---------|----------------------|---------|
| \`/toh-help\` | \`/toh-h\`, \`toh help\`, \`toh h\` | Show all commands |
| \`/toh-plan\` | \`/toh-p\`, \`toh plan\`, \`toh p\` | 🧠 **THE BRAIN** — writes .toh/plan.md, one approval, then builds autonomously |
| \`/toh-vibe\` | \`/toh-v\`, \`toh vibe\`, \`toh v\` | Create new project - UI + Logic + Mock Data |
| \`/toh-ui\` | \`/toh-u\`, \`toh ui\`, \`toh u\` | Create UI - Pages, Components, Layouts |
| \`/toh-dev\` | \`/toh-d\`, \`toh dev\`, \`toh d\` | Add Logic - TypeScript, Zustand, Forms |
| \`/toh-design\` | \`/toh-ds\`, \`toh design\`, \`toh ds\` | Polish Design - Make it beautiful, not AI-looking |
| \`/toh-test\` | \`/toh-t\`, \`toh test\`, \`toh t\` | Test system - Auto test & fix until pass |
| \`/toh-connect\` | \`/toh-c\`, \`toh connect\`, \`toh c\` | Connect Backend - Supabase, Auth, RLS |
| \`/toh-line\` | \`/toh-l\`, \`toh line\`, \`toh l\` | LINE MINI App - convert (LIFF SDK) |
| \`/toh-mobile\` | \`/toh-m\`, \`toh mobile\`, \`toh m\` | Mobile App - PWA / Capacitor |
| \`/toh-fix\` | \`/toh-f\`, \`toh fix\`, \`toh f\` | Fix Bug - Debug and fix issues |
| \`/toh-ship\` | \`/toh-s\`, \`toh ship\`, \`toh s\` | Deploy - Vercel, Production ready |
| \`/toh-protect\` | \`/toh-pt\`, \`toh protect\`, \`toh pt\` | 🔐 Security Audit - Full security check |

### ⚡ Execution Rules:

1. **Remember Immediately** - See \`/toh-\` or \`toh \` = command!
2. **Read the command file first** - \`.toh/commands/toh-<cmd>.md\` is the full spec; never execute from this index alone
3. **Check Description** - Does command have description after?
   - ✅ **Has description** → Execute immediately, no confirmation
   - ❓ **No description** → Introduce yourself as that command's agent and ask first (e.g. "I'm **Vibe Agent** 🎨, what system would you like me to create?"). Exception: \`/toh-help\` always runs immediately
4. **Follow Memory Protocol** - Read/write \`.toh/memory/\`

## Memory System (Automatic, 7 files — Tiered Loading)

Toh Framework has Memory system at \`.toh/memory/\`. Read only what the task needs:
- **Tier 1 (ALWAYS read, ~800 tokens):** \`active.md\` (current task) + \`summary.md\` (project overview)
- **Tier 2 (per task type):** \`architecture.md\` + \`components.md\` for build/code work; \`changelog.md\` for debug work
- **Tier 3 (only when referenced):** \`decisions.md\` (past decisions) + \`agents-log.md\` (agent activity)
- \`archive/\` - Historical data (load when needed)

## 🚨 Required: Memory Protocol (Tiered Loading)

> **Important:** Must follow this every time! Never read all 7 files by reflex.

### Before Starting Work:
1. Check if \`.toh/memory/\` folder exists
2. Read Tier 1: \`.toh/memory/active.md\` + \`.toh/memory/summary.md\`
3. Read Tier 2 for this task type (build/code → \`architecture.md\` + \`components.md\`; debug → \`changelog.md\`)
4. Read Tier 3 (\`decisions.md\`, \`agents-log.md\`) ONLY when referenced
5. If files empty but code exists → Analyze project first!
6. Tell User: "Memory loaded! [brief summary]"

### After Completing Work (write per relevance):
1. Update \`.toh/memory/active.md\` - ALWAYS (What was done, next steps)
2. Update \`.toh/memory/summary.md\` - when the project shape changes (feature done / new structure)
3. Update \`.toh/memory/architecture.md\` / \`components.md\` - when modules/stores/hooks/utils change
4. Update \`.toh/memory/changelog.md\` + \`agents-log.md\` - record the change and which agent did it
5. Update \`.toh/memory/decisions.md\` - if a real decision was made
6. Tell User: "Memory saved ✅"

### ⚠️ Important Rules:
- Never start work without reading Tier 1 (active.md + summary.md)!
- Never finish work without updating active.md!
- Read Tier 2 / Tier 3 only when the task type or a reference calls for it!
- Memory files must always be in English!

## Rules to Follow

1. **No Basic Questions** - Decide yourself
2. **Use Fixed Tech Stack** - Don't change
3. **Respond in Thai** - All communication in Thai
4. **Thai Mock Data** - Use Thai names, addresses, phone numbers
5. **UI First** - Build UI first to visualize
6. **Production Ready** - Not a prototype

## Mock Data Examples

Use realistic Thai data:
- First names: Somchai, Somying, Manee, Mana
- Last names: Jaidee, Rakrian, Suksun
- Addresses: Bangkok, Chiang Mai, Phuket
- Phone: 081-234-5678
- Email: somchai@example.com

## Agents (roster — full specs in \`.toh/agents/\`)

${agentRoster}

This table is a summary ONLY. Before acting as (or delegating to) any agent,
read \`.toh/agents/<name>.md\` — the agent's workflow, rules, tool limits, and
quality bar live in that file, not here.

## 🚨 Required: Load Skills & Agents

> **Important:** Before executing any /toh- command, must load related skills!

### Command → Skills Map

| Command | Load These Skills (from \`.toh/skills/\`) |
|--------|-------------------------------------------|
| \`/toh\` | \`smart-routing\`, \`orchestration-protocol\`, \`engineer-harness\` |
| \`/toh-vibe\` | \`vibe-orchestrator\`, \`orchestration-protocol\`, \`premium-experience\`, \`design-craft\`, \`ui-first-builder\`, \`engineer-harness\` |
| \`/toh-ui\` | \`ui-first-builder\`, \`design-craft\`, \`engineer-harness\` |
| \`/toh-dev\` | \`dev-engineer\`, \`backend-engineer\`, \`engineer-harness\` |
| \`/toh-design\` | \`design-craft\`, \`premium-experience\` |
| \`/toh-test\` | \`test-engineer\`, \`debug-protocol\`, \`error-handling\` |
| \`/toh-connect\` | \`backend-engineer\`, \`integrations\` |
| \`/toh-plan\` | \`plan-orchestrator\`, \`orchestration-protocol\`, \`business-context\`, \`smart-routing\`, \`engineer-harness\` |
| \`/toh-fix\` | \`debug-protocol\`, \`error-handling\`, \`test-engineer\` |
| \`/toh-line\` | \`platform-specialist\`, \`integrations\` |
| \`/toh-mobile\` | \`platform-specialist\`, \`ui-first-builder\` |
| \`/toh-ship\` | \`version-control\`, \`progress-tracking\` |
| \`/toh-protect\` | \`engineer-harness\` |
| \`/toh-help\` | (none — self-contained; run \`.toh/commands/toh-help.md\` directly) |

### Core Skills (Always Available)
- \`memory-system\` - Memory system
- \`engineer-harness\` - Smart tool selection + human-friendly reporting + next steps
- \`smart-routing\` - Command routing

### Loading Steps:
1. User types /toh-[command]
2. Read skill files from \`.toh/skills/[skill-name]/SKILL.md\`
3. Execute according to skill instructions
4. Save memory after completion

### ⚠️ Never Skip Skills!
Skills contain best practices, design tokens, and important rules

## 🔒 Skills Loading Checkpoint (Required)

> **Required:** Must report loaded skills at the beginning of response!

### Response Start Format:

\`\`\`markdown
📚 **Skills Loaded:**
- skill-name-1 ✅ (brief summary of what was loaded)
- skill-name-2 ✅ (brief summary of what was loaded)

🤖 **Agent:** agent name

💾 **Memory:** loaded ✅

---

[then continue with work...]
\`\`\`

### Why This Is Required:
- If skills not reported → means not read
- If skills skipped → work quality will decrease significantly
- Skills contain design tokens, patterns, and important rules
- This checkpoint proves protocol compliance

## Skills Reference

All skills are located at \`.toh/skills/\` (Central Resources):
- \`vibe-orchestrator\` - Core methodology
- \`ui-first-builder\` - UI patterns
- \`dev-engineer\` - TypeScript, State, Forms
- \`design-craft\` - Design system, anti-patterns & business-appropriate fit
- \`premium-experience\` - Premium multi-page apps
- \`test-engineer\` - Testing with Playwright
- \`backend-engineer\` - Supabase integration
- \`platform-specialist\` - LINE, Mobile, Desktop
- \`memory-system\` - Memory protocol
- \`engineer-harness\` - Smart tool selection, reporting & next steps

## Getting Started

Start with:
\`\`\`
/toh-vibe [describe the system you want]
\`\`\`

AI will:
1. Analyze requirements
2. Break down tasks
3. Create UI with Thai mock data
4. Add logic and state management
5. Polish design to look beautiful
6. Deliver production-ready code

---

**GitHub:** https://github.com/wasintoh/toh-framework
**Author:** Wasin Treesinthuros (Innovation Vantage)

<!-- TOH-FRAMEWORK-END -->
`;
}
