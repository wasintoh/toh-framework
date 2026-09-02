# CLAUDE.md — Toh Framework (repo development guide)

Guide for a Claude Code agent developing the framework itself. Repo-only: not in the package.json
`files` whitelist, so it never ships to npm. (claude-code.js generates a separate, unrelated CLAUDE.md inside end-user projects.)

## What this is

Toh Framework ("Type Once, Have it all") is the npm package `toh-framework` (v2.1.0, MIT, ESM,
Node >= 18, no build step) that installs an AI-orchestration development system into 6 IDEs:
Claude Code, Cursor (2.4+), Antigravity (agy CLI + IDE), Codex (CLI + desktop app), ZCode (Z.ai), and —
Enterprise-only, behind `--legacy-gemini` — Gemini CLI (consumer service shut down 2026-06-18).

North Star: a non-technical person types one sentence, approves once ("Go"), and THE TOH LOOP
builds, tests, and fixes a real, beautiful app until verified DONE. Quality is measured at the END
USER's experience; any added question or step is a regression — /toh-vibe asks zero questions, /toh-plan asks exactly one.

## Everyday commands

All npm scripts wrap `node bin/toh-cli.js <cmd>`, which lazy-loads `installer/*.js`:

- `npm run install:local` — interactive installer; `-- --quick` (plus `-t <dir>`) for non-interactive
  runs (dir must pre-exist; reinstalls still prompt). Flags: `--legacy-gemini`, `--legacy-cursorrules`.
- `npm run uninstall:local` — the counterpart; `-- -t <dir> --dry-run` to preview, `--yes` for
  scripts, `--all` to also delete .toh/plan.md + .toh/progress.md + both memory folders. Defaults to
  cwd, so ALWAYS pass `-t` when testing.
- `npm run list` — print the catalog, live-read from src/ frontmatter (throws on bad YAML)
- `npm run status` — inspect install state (~/.claude, ./.toh, manifest.json)
- `npm run bundle` — web prompt bundles into ./dist/web-bundles
- `npm pack --dry-run` — check exactly what ships before any packaging change

## Verification protocol

`npm test` runs tests/codex.test.js (node:test, in-band via tests/run.js; TOH_QUIET=1 silences ora) —
it covers the Codex surfaces only. Everything else is still verified by running for real:

1. Run what you touched — install into a scratch dir, `npm run list`/`status`, `npm pack --dry-run`.
   Inspect the generated output (.toh/, .claude/, .cursor/rules/ + .cursor/agents/, AGENTS.md +
   .codex/config.toml, .agents/skills + .agents/commands + legacy .agent/workflows/ mirror;
   .gemini/ only under --legacy-gemini) — never assume a transform worked.
   For ZCode, ask the runtime instead of reading files: `zcode skills list --cwd <dir> --json`
   must report 37 entries at scope "project" and `zcode commands list --cwd <dir> --json` all 14,
   both with an empty diagnostics array. The CLI ships inside the app
   (/Applications/ZCode.app/Contents/Resources/glm/zcode.cjs) and is usually not on PATH.
2. Coffee-Shop-Owner Test for any user-facing change: could a coffee-shop owner use this without
   tech vocabulary, never face an unanswerable question, know what to do when it breaks — and does the output look professionally made?

## Single source, transformed per IDE

`src/` is the ONLY source of truth; installed copies (.toh/, .claude/, .cursor/, AGENTS.md,
.agents/, .agent/, GEMINI.md) are generated output — editing them is always wrong. Edit `src/`, re-run the installer.

`installer/install.js` first copies shared resources into the target's `.toh/` (skills, agents,
commands, templates, 7 memory files, plan.md, progress.md, manifest.json, capabilities.json),
then 6 handlers in `installer/ide-handlers/` cover the IDEs. When cursor/codex/antigravity/zcode is
selected, shared.js writeAgentsSkills() also writes `.agents/skills/` — 37 wrappers (23 skills,
descriptions terse-capped at 300 chars for Codex's 8,000-char listing budget, + 14 toh-* command
skills converted from the TOML; throws on unparseable sources):

- claude-code.js → .claude/ + project CLAUDE.md + Stop hook + .claude/loop.md; agent frontmatter
  filtered to native keys (name/description/tools/model + autonomy pass-throughs; model defaults to
  sonnet; triggers dropped; `skills` passes through filtered by isPreloadableSkill — must exist in
  .claude/skills/, not disable-model-invocation); real alias command files generated from each
  command's aliases list. NEVER inject a default tools list — absence = unrestricted.
- cursor.js → .cursor/rules/*.mdc + native subagents .cursor/agents/*.md (keeps
  name/description/model; derives readonly:true when a present tools allowlist has no write
  tools — today only root-cause-debugger); root .cursorrules ONLY with --legacy-cursorrules.
- antigravity-cli.js → workspace .agents/: rules/toh-framework.md (Always-On, <=12,000 chars
  asserted), workflows/ (+ legacy .agent/workflows/ mirror), agents/*.md file-based subagents
  (subagent: true), deterministic Stop hook in .agents/hooks.json. Never writes .gemini/.
- codex.js → one root AGENTS.md between TOH-FRAMEWORK-START/END markers — compact agent roster +
  indexed command table; bodies read at runtime from .toh/. Hard-asserts the block <=24 KiB (Codex
  silently truncates at 32 KiB) and emits .codex/config.toml raising project_doc_max_bytes, never overwriting an existing one.
  v2.2: also writes one native Codex agent per Toh agent to .codex/agents/<name>.toml — NO `model`
  key (inherits the session), `model_reasoning_effort` from the agent's `modelIntent` frontmatter,
  `sandbox_mode = "read-only"` when the tool allowlist has no write tool. Ownership by sha256 in
  .codex/toh-framework.json: an edited or user-created file is never overwritten or removed.
  It never writes .agents/skills/ — shared.js is the single writer for that directory.
- zcode.js → thin by design. ZCode reads the same open surfaces, so it writes NO `.zcode/`: it
  reuses codex.js's exported writeAgentsMd() for AGENTS.md (ide 'zcode' swaps three sentences) and
  shared.js writeAgentsCommands() for `.agents/commands/` — 14 native `/toh-*` slash commands, the
  one surface Codex lacks. When codex is ALSO selected install.js passes `{ writeAgentsMd: false }`:
  AGENTS.md is one physical file, and codex.js's conservative variant stays true for both. Skips the
  memory templates on purpose (install.js already seeds them) — do not add a 7th inline copy.
- gemini-cli.js → LEGACY (.gemini/: TOML commands, skills, GEMINI.md, settings.json), only via
  --legacy-gemini; off the menu; no longer implies Antigravity. `--ide gemini` without the flag
  warns and substitutes antigravity.

Per-IDE command divergence lives in ONE markdown source via `<!-- tfw:claude -->` (kept only for
Claude Code) / `<!-- tfw:fallback -->` (kept for everyone else) blocks, resolved by shared.js
transformCommand(). install.js normalizes .toh/commands to the universal variant AFTER the IDE loop — that is why claude-code.js transforms from package src/commands, not .toh/commands.

## Repo map

- `src/agents/` — exactly 8 agent .md files + README.md, no subdirectories (src/agents/subagents/
  was deleted in v2.0.0, commit c33dcf3 — never reference it). Superset frontmatter: name,
  "Delegate when:" description, narrow per-agent tools allowlist, model, skills, triggers,
  optional memory/isolation/maxTurns; keep filename == frontmatter name. Model tiers are cost
  routing: opus = plan-orchestrator (THE BRAIN) + design-reviewer; sonnet = ui-builder, dev-builder,
  backend-connector, platform-adapter, root-cause-debugger (read-only — proves root cause, never edits); haiku = test-runner (Playwright auto-fix, maxTurns 30).
- `src/skills/` — 23 skills, one dir each with SKILL.md; since v2.1 all carry YAML frontmatter
  (internal skills use `user-invocable: false`, deliberately NOT disable-model-invocation, which
  would break the preload filter). Load-bearing pair: orchestration-protocol (HOW work executes) +
  engineer-harness (how stages END). Command brains: vibe-orchestrator, plan-orchestrator, smart-routing; design-craft owns UI identity.
- `src/commands/` — 14 slash commands (toh.md + 13 toh-*.md) + README.md; frontmatter binds 13
  to skills (toh-help.md alone has no skills key); Thai-voiced bodies are intentional.
  Shortcut map: /toh-p = toh-plan, /toh-pt = toh-protect (also /toh-security, /toh-audit).
- `src/gemini-commands/` (14 TOML) and `src/antigravity-workflows/` (14 md) — parallel command
  surfaces that must stay in sync with src/commands/. The TOML doubles as legacy Gemini output AND the conversion source for the 14 .agents/skills command skills — keep editing all three.
- `src/templates/` — structural-only starters (components/, pages/, nextjs-pro/): Next.js 16 /
  React 19 / Tailwind 4, pinned in nextjs-pro/package.json. Visual character always comes from each project's DESIGN.md.
- `src/memory/` — spec/docs ONLY; the installer never copies it. Memory templates are
  generated inline in 6 code sites (install.js + 5 of the 6 IDE handlers; zcode.js deliberately
  does not duplicate them).
- `bin/` — toh-cli.js is the only entry (toh-npx-wrapper.js was deleted in v2.1).
- `docs/` — README-TH.md (Thai mirror of README.md), V2-UPGRADE-PLAN.md, assets/.

## Core mechanics — never break these

- TOH LOOP: src/skills/orchestration-protocol/SKILL.md is its single source (survey,
  teams/subagents/sequential ladder, model routing, plan schema, the loop itself). Its
  hard-limits table is "load-bearing — never soften".
- Plan-as-file: .toh/plan.md (checkbox backlog, <=150 lines) + .toh/progress.md ARE the
  state; checkbox-resume is Auto-Resume across sessions and IDEs.
- QC gate: the orchestrator re-runs checkpoints ITSELF and quotes real output;
  `<promise>COMPLETE</promise>` only after quoted passing "Done When" runs.
- Design Identity: design-reviewer generates project-root DESIGN.md (two-pass, from
  design-craft/DESIGN-TEMPLATE.md) as task T000 before any UI code; the versioned
  AVOID-LIST.md ships inside src/skills/design-craft/, never per-project.
- Stop hooks: mergeSettingsStopHook in claude-code.js appends an idempotent (`<TFW-STOP-HOOK>`
  marker) prompt hook to .claude/settings.json; both hooks exempt a terminal-status plan
  (Status: done/draft/blocked/paused), and since v2.1.1 a reinstall upgrades OUR entry in place —
  but ONLY when its text exactly equals a historical shipped version (the
  TFW_STOP_HOOK_PROMPT_HISTORY / TFW_STOP_HOOK_COMMAND_HISTORY allowlists; append the outgoing
  string whenever the shipped text changes). A marker-carrying entry with ANY other text is
  user-owned and stays byte-identical. antigravity-cli.js writes a deterministic command-script
  Stop hook (grep for unchecked plan.md tasks, exit 2) into .agents/hooks.json, same marker
  idempotence and same exact-match upgrade rule. The other IDEs run the same loop as prose — keep it self-sufficient without hooks.
- Reinstall safety: .toh/plan.md / .toh/progress.md AND the 7 .toh/memory files are seeded only if
  absent, at all 6 inline template sites (live loop state/memory — never clobber; the explicit,
  user-confirmed Fresh Install path is the one exception: it also cleans .claude/memory); never
  remove/reorder/rewrite user hook entries; never overwrite a user .claude/loop.md,
  .codex/config.toml, .gemini/settings.json, or a non-generated .gemini/GEMINI.md.
- Uninstall safety (installer/uninstall.js): ownership must be PROVED before deleting — manifestSchema 2
  (path + sha256 + pre-install state of every file the install wrote; install.js snapshots its own
  surfaces before/after and uses mtime, not just bytes, since reinstalls rewrite identical content),
  then our markers, then known names — and a name-only match is copied to .toh-uninstall-backup/
  before removal. Co-owned files are edited surgically or skipped with a warning, never rewritten;
  a hash mismatch means the user edited it, so it is KEPT. Every generated block needs delimiters
  for this to work: CLAUDE.md and AGENTS.md both use `<!-- TOH-FRAMEWORK-START/END -->`. Directories
  go only when empty; the user's plan/ledger/memory need a separate explicit opt-in.

## Change checklist (6-IDE parity)

- Command change → src/commands/*.md (keep both tfw marker branches in sync) +
  src/gemini-commands/*.toml + src/antigravity-workflows/*.md + stats in toh-help.md and both READMEs (list.js, .agents/skills and .agents/commands regenerate from source — no manual sync).
- Agent change → src/agents/*.md + its README.md table + hardcoded agent tables in
  cursor.js; never widen a tools allowlist (per-agent security boundary).
- Memory format change → 6 inline code sites plus src/memory/ docs.

## Release process

1. Bump semver in package.json (pre-releases: X.Y.Z-beta.N).
2. Add a newest-first CHANGELOG.md entry `## [X.Y.Z] - YYYY-MM-DD` with Changed/Added/Technical
   subsections; Technical records agent/skill/command counts and every synced IDE surface.
3. Sync user-facing text in README.md AND docs/README-TH.md.
4. `npm pack --dry-run`: the files whitelist stays [bin, installer, src, docs, !docs/assets, dist]
   (+ auto package.json, README.md, LICENSE) — 325.5 kB / 142 files at v2.1.0. Keep the !docs/assets negation
   (and matching .npmignore line): dropping it triples the tarball. CHANGELOG.md does not ship.
5. Tag lowercase vX.Y.Z on the release commit and push the tag — release.yml smoke-tests, publishes
   to npm with provenance (NPM_TOKEN secret), and creates the GitHub Release from that CHANGELOG section. Never publish unverified by hand.

## Gotchas

- Local-only dirs may exist in a working copy (.claude/, claude-project/, TFW-CustomEdition/,
  .cursor/, .playwright-mcp/ — all gitignored); shipped files must NEVER reference any of them.
- Counts are live now: list.js reads src/ frontmatter at runtime and prints 14 / 8 / 23 (matches
  toh-help.md); a bad YAML edit in src/ makes it throw with the file path — intentional.
- Codex budgets are enforced: install hard-fails above the 24 KiB AGENTS.md block; long skill
  descriptions belong in src/skills frontmatter (wrappers cap at 300 chars; full text ships in .toh/skills/).
- Known drift, do not propagate: bin/toh-cli.js has no --lang flag, so Thai IDE output is
  unreachable via the CLI.
- Antigravity live-verify is pending: if a real agy run shows .agents/workflows is never loaded,
  drop that surface and flip the capability profile — the 14 commands already ship as skills.
- AGENTS.md has TWO readers (Codex and ZCode) but is ONE file — never let both handlers write it in
  the same run, and never widen the shared block's claims to a capability only one of them has.
  ZCode's profile is the only one with `commands: true`; renderCapabilitiesSection emits that line
  only when the flag is set, which is what keeps every other IDE's generated text byte-identical.
- ZCode's `.zcode/commands/` is a real native path we deliberately do NOT write — it would duplicate
  `.agents/commands/` on disk for zero gain. Its subagents/hooks stay `false` in the profile until
  someone verifies live that ZCode loads OUR files; an unverified YES makes the model promise
  delegation it cannot perform.
- src/agents/README.md oversimplifies two transforms — installer/ide-handlers/ is authoritative.
- Internal skill version strings are independent of the package version — don't "fix" them.
  dist/ is gitignored and absent but whitelisted — a stray local build would silently ship.
