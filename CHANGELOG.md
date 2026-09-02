# Changelog

All notable changes to Toh Framework will be documented in this file.

## [Unreleased]

#### Added

- **Native Codex agents** — every Toh agent in `.toh/agents/` is now also installed as a project-scoped Codex custom agent in `.codex/agents/<name>.toml` (`name`, `description`, `model_reasoning_effort`, `sandbox_mode`, `developer_instructions`), so Codex can delegate to `ui-builder`, `plan-orchestrator` and friends natively. The files deliberately carry **no `model` key**: they inherit the parent session's model, so one config choice governs every agent and a future model rename never strands an install. Reasoning effort comes from a new `modelIntent` frontmatter key (`lightweight | implementation | planning | review`, falling back to the Claude tier), and agents whose tool allowlist has no write tool get Codex's `read-only` sandbox. Ownership is tracked by sha256 in `.codex/toh-framework.json`: a file you edited or created is never overwritten or removed. AGENTS.md now points Codex at `$toh-<cmd>` skill invocation and the native agents. Contributed by @pcbimon in [PR #3](https://github.com/wasintoh/toh-framework/pull/3); reshaped in review so `.agents/skills/` keeps a single writer (shared.js), an existing `.codex/config.toml` is still never modified, and the codex capability profile stays the probed v2.1.1 floor.
- **`toh uninstall --ide codex`** — removes just the native agent files this installer wrote (hash-verified, backed up first) and their manifest; AGENTS.md, `.codex/config.toml` and `.toh/` stay. The full uninstall also knows the new paths.
- **Test suite** — `npm test` runs `tests/codex.test.js` (node:test, in-band): install layout, TOML shape, single-writer invariant across IDE order, config.toml untouched, ownership by hash, AGENTS.md idempotency and budget, both uninstall paths. First automated tests in the repo; CI now runs them.

## [2.1.1] - 2026-08-26

### 🩹 Patch: Updates That Respect Your Work

v2.1.1 is a repair release — อัปเดตได้โดยไม่ทับงานเดิม. Every fix answers the same complaint, reported in GitHub issue #2 by @tumansdev: re-running the installer on a project that was already mid-work behaved as if the project were brand new. Updates now preserve live state, stop hooks now respect a plan you deliberately parked, and Codex capability claims are probed at install time instead of assumed.

#### Fixed

- **Memory survives an update** — re-running the installer over an existing project no longer resets `.toh/memory/`. All 7 memory files are now seeded only if absent, the same contract `.toh/plan.md` and `.toh/progress.md` have had since v2.0.0 — an update never clobbers what the loop has learned. Applied at every one of the 6 inline template code sites (`install.js` + 5 IDE handlers; zcode deliberately has none).
- **Stop hooks respect a parked plan** — a plan whose header says `Status: blocked` or `Status: paused` is now terminal for the Claude Code prompt Stop hook, exactly like `Status: done`/`Status: draft`: the loop no longer refuses to end a session over work the user deliberately put down. The deterministic Antigravity command-script hook gains the same exemptions plus `Status: done` (which its grep previously never checked). Existing installs are **upgraded in place**: the installer recognises its own `<TFW-STOP-HOOK>` entry and rewrites just that entry to the new text instead of treating "marker present" as "nothing to do" — user hook entries are still never removed or reordered.
- **Codex capabilities probed, not assumed** — the Codex handler now runs a runtime capability probe and falls back conservatively when the probe cannot confirm a feature, instead of hardcoding what the currently-installed Codex is presumed to support. An unverifiable capability is declared absent — the generated text never promises what the runtime was not proven to do.
- **Version-drift sweep completed** — re-audited every user-visible and generated surface (`src/`, `installer/`, `README.md`, `docs/README-TH.md`, plus a real install of all 5 IDE targets) for stale `Next.js 14` / `React 18` / `Tailwind 3` stack mentions left after 0795eec. Result: zero remaining — generated output states only Next.js 16 / React 19 / Tailwind 4, matching the `src/templates/nextjs-pro/package.json` pins. Historical CHANGELOG entries and archived planning docs keep their original wording on purpose.

Fixes [GitHub issue #2](https://github.com/wasintoh/toh-framework/issues/2) — thank you @tumansdev for the detailed report.

#### Technical

- Counts (from disk): **8 agents / 23 skills / 14 commands** — unchanged from 2.1.0; `toh-help.md`, README stats and both parallel command surfaces (14 Gemini CLI TOML, 14 Antigravity workflows) untouched.
- Synced IDE surfaces touched by this patch:
  - **All IDE installs** — `.toh/memory/` (7 files) now seed-if-absent at all 6 inline template sites: `installer/install.js` plus the claude-code, cursor, antigravity-cli, codex and gemini-cli handlers (zcode has no 7th copy by design).
  - **Claude Code** — `<TFW-STOP-HOOK>` prompt hook in `.claude/settings.json`: new blocked/paused terminal semantics + in-place upgrade of our own entry on reinstall.
  - **Antigravity (agy CLI + IDE)** — `<TFW-STOP-HOOK>` command-script hook in `.agents/hooks.json`: same terminal semantics (done/blocked/paused alongside draft) + in-place upgrade.
  - **Codex** — capability probe with conservative fallback feeding the generated `AGENTS.md` claims and `.toh/capabilities.json`. Probe format verified live against codex-cli 0.149.1 and 0.145.0: the real interface is the plain-text `codex features list` table (no `--json` flag exists), and the real feature names are `multi_agent`, `hooks`, `goals` — `parallel` has no codex equivalent and stays declared false.
- No source counts, templates, commands, agents or skills changed — README.md and docs/README-TH.md are untouched (the drift sweep found nothing left in either).
- package.json: version **2.1.0 → 2.1.1**.

---

## [2.1.0] - 2026-08-16

### 🔌 Compatibility Release: Every Living IDE, Verified For Real

v2.1 is a compatibility release — ตรวจจริง ซ่อมจริง ทุก IDE ที่ยังมีชีวิต. Every supported tool was measured against its current version and repaired where reality had moved: Codex was silently truncating our instructions (now slimmed and hard-guarded), Antigravity and the Antigravity CLI (agy) became a first-class target, Cursor 2.4's native subagents are used instead of denied, every non-Claude runtime — including newcomer ZCode (Z.ai) — discovers one shared open-standard `.agents/skills/` surface, and Claude Code subagents preload their skills natively.

#### Changed

- **Codex un-truncated** — Codex now reads the whole Toh Framework instead of silently dropping 6 of 8 agents. The generated `AGENTS.md` block shrank from ~117 KB to 12,958 bytes (EN; TH 12,647) — safely under Codex's 32 KiB combined project-doc budget — by replacing embedded agent bodies with a compact roster table plus runtime reads from `.toh/agents/` and `.toh/commands/`. A hard assertion now fails the install if the block ever exceeds 24 KiB, and a project-scoped `.codex/config.toml` raises `project_doc_max_bytes` to 131,072 (written only when no user `config.toml` exists).
- **Antigravity and the Antigravity CLI (`agy`) are a first-class target** — a new handler emits the workspace `.agents/` surface: an Always-On rule, 14 workflows (plus a legacy `.agent/workflows/` mirror), 8 file-based subagents, skills, and a deterministic Stop hook. Legacy `.gemini/` output survives for Enterprise/GCP users behind the new `--legacy-gemini` flag (removed from the interactive menu); its 14 TOML commands and settings.json are unchanged from v2.0.0, GEMINI.md differs only in its version line, and the verbatim-copied `.gemini/skills/` pick up this release's new skill frontmatter.
- **Cursor 2.4 gets a real agent team** — instead of being told "multi-agent features are unavailable here", Cursor now installs all 8 Toh agents as native `.cursor/agents/*.md` subagents (root-cause-debugger derives `readonly: true` from its read-only tools allowlist), the capability profile declares `subagents: native`, and the rule prose describes native delegation with the sequential TOH LOOP as the documented fallback.
- **`.cursorrules` no longer written by default** — the file has vanished from official Cursor docs and duplicated the alwaysApply `.mdc`; users on very old Cursor versions can keep it via the new `--legacy-cursorrules` flag.
- **Claude Code subagents preload their skills natively** — skill loading no longer depends on prose the subagent can skip: the installer passes the native `skills` frontmatter key through, filtered to skills that actually exist in `.claude/skills/` (excluding any marked `disable-model-invocation: true`).
- **`/toh-protect` shortcut is now `/toh-pt`** — resolves the long-standing alias collision: `/toh-p` belongs solely to `/toh-plan`. `/toh-security` and `/toh-audit` still work.
- **`npm run list` reads the live catalog** — the stale hardcoded tables are gone; it now parses `src/` frontmatter at runtime and prints the real 14 commands / 8 agents / 23 skills.
- **Claude Code Stop hook: deliberately unchanged** — the flagship "refuses to quit until DONE" prompt hook ships byte-identical to v2.0.0 (owner decision); the new deterministic command-script Stop hook is Antigravity-only.

#### Added

- **`toh uninstall` — the missing counterpart to `toh install`** — until now a user who installed Toh Framework had no supported way to remove it. `npx toh-framework uninstall` prints a plain-language preview of every file it would remove, keep, or edit, then asks once before touching anything. Safety outranks completeness throughout: files it cannot prove it installed are left in place and named on screen; co-owned files (`CLAUDE.md`, `AGENTS.md`, `.claude/settings.json`, `.agents/hooks.json`, `.codex/config.toml`, `.cursorrules`) are edited surgically — only our marker-delimited block or our `<TFW-STOP-HOOK>` entry comes out, and an unparseable or unrecognisable file is skipped with a warning instead of rewritten; symlinked paths are never followed; directories are removed only once they are empty. `.toh/plan.md`, `.toh/progress.md` and both memory folders are the project's live work, so they are kept by default and deleted only after a separate opt-in (the second question, or `--all`) — with a copy saved to `.toh-uninstall-backup/` first. When there is no install record to check against, files matched by name alone are copied to that same backup folder before removal. Flags: `--dry-run`, `-y/--yes`, `--all`, `--verbose`, `-t/--target`. Also available as `npm run uninstall:local`.
- **Install inventory (`manifestSchema` 2)** — `.toh/manifest.json` now records the path, sha256 and pre-install state of every file the installer wrote, plus the directories it created. That record is what lets uninstall tell "our file, untouched" from "our file, edited by you" (kept, never deleted) and from "your file" (never claimed). Reinstalls carry the original pre-existence facts forward, and a file rewritten with identical bytes is still recorded as ours, so an upgrade never produces an under-reporting record.
- **The project `CLAUDE.md` block is delimited** — the Toh Framework section is now written between `<!-- TOH-FRAMEWORK-START -->` / `<!-- TOH-FRAMEWORK-END -->` markers (the same pair Codex already used in `AGENTS.md`), so it can be lifted out of a file you also write in without touching a byte of your own text. Projects installed before v2.1 have no markers; uninstall recognises our generated text there instead, and backs the file up before editing it.
- **ZCode (Z.ai) is a supported target** — ZCode reads the same open surfaces this release already writes, so support needed no bespoke file format: `AGENTS.md` as project memory (the identical file Codex reads), `.agents/skills/` for all 37 skills, and the new `.agents/commands/` for 14 real `/toh-*` slash commands — a native command surface Codex itself does not offer. This was verified by running ZCode CLI 0.16.3 against an installed project, not inferred from documentation: `zcode skills list --json` reports 37 entries at `scope: project`, `source: agents`, and `zcode commands list --json` reports all 14 commands from `<project>/.agents/commands`, both with an empty `diagnostics` array. Selecting ZCode alongside Codex writes `AGENTS.md` exactly once, in the conservative Codex variant that stays truthful for both runtimes.
- **Shared `.agents/commands/` — real slash commands beyond Claude Code** — the same 14 command prompts that ship as skills are now also written as project slash commands, generated from the one TOML source. Runtimes that ignore the directory are unaffected; they still reach every prompt through `.agents/skills/toh-*`.
- **Shared `.agents/skills/` open standard — one write, four tools** — Codex, Cursor 2.4, Antigravity, and ZCode all natively discover Agent Skills from `<project>/.agents/skills/`, so the installer now generates 37 skills there: 23 thin wrappers over the framework skills plus 14 `/toh-*` command skills (`disable-model-invocation: true`, so they surface as explicit `/` commands). Wrapper descriptions are capped at 300 chars so the whole name+description listing (7,383 chars) fits Codex's shared 8,000-char budget; full skill text still lives in `.toh/skills/`, which every wrapper reads at runtime.
- **Real slash aliases on Claude Code** — typing `/toh-v` or `/toh-p` no longer risks "Unknown command": the installer generates 15 thin alias command files (`toh-v`, `toh-p`, `toh-pt`, `toh-security`, `toh-audit`, …) that forward `$ARGUMENTS` to the real commands.
- **Frontmatter for all 23 skills** — the 13 previously bare SKILL.md files gained spec-compliant YAML frontmatter (keyword-rich third-person descriptions; internal skills marked `user-invocable: false`), so auto-invocation now triggers off real descriptions instead of decorated titles. Skill bodies are byte-identical.
- **Deterministic Antigravity Stop hook** — `.agents/hooks.json` blocks ending a session while `.toh/plan.md` still has unchecked tasks, via a plain `grep` command script (exit 2 + reason). Strictly additive and idempotent (`<TFW-STOP-HOOK>` marker); never removes or reorders user hook entries.
- **New install flags** — `--legacy-gemini` (Enterprise Gemini CLI `.gemini/` output) and `--legacy-cursorrules` (root `.cursorrules`).
- **Install only what you use** — the IDE picker now starts with Claude Code alone selected instead of three tools pre-ticked, and `--ide` defaults to `claude` to match. Picking your own tools takes one keystroke; cleaning up surfaces you never wanted took a support ticket. The picker also dropped its emoji so the five entries read as one plain list.

#### Fixed

- **Codex footer URLs** — both EN and TH `AGENTS.md` footers pointed at the dead `github.com/ArtificialWeb`; now `github.com/wasintoh/toh-framework`.
- **ui-builder dead skill paths** — the agent body referenced `src/skills/...` paths that don't exist in end-user projects; now the IDE-neutral `.toh/skills/...`.
- **TH/EN drift in the Cursor rule** — the Thai `/toh-vibe` Command→Skills row was missing `ui-first-builder`; now byte-equal to the EN row.
- **Stale docs and counts** — `src/commands/README.md` now counts all 14 commands (the `/toh-protect` row was missing); `toh-help.md` names the current IDE set; web bundles (`npm run bundle`) drop the v1.0.0-era `*star` commands for `/toh-*` names, and a failed bundle run now exits non-zero. Every generated per-IDE context file and memory seed now states Next.js 16, matching `src/templates`.
- **Dead code removed** — `bin/toh-npx-wrapper.js` (never referenced anywhere) deleted from the package.
- **Renamed-tool wording** — orchestration-protocol now says "the Agent tool (Task)", matching Claude Code ≥ 2.1.178.

#### Technical

- Counts (from disk): **8 agents / 23 skills / 14 commands** — unchanged from 2.0.0. The parallel command surfaces stay in sync at 14 Gemini CLI TOML files (legacy) and 14 Antigravity workflow files.
- Synced IDE surfaces at 2.1.0, verified from a real install:
  - **Claude Code** — `.claude/commands/` (14 commands + 15 generated aliases), `.claude/agents/` (8), `.claude/skills/` (23), Stop hook in `.claude/settings.json` (byte-identical to 2.0.0), `.claude/loop.md`, project `CLAUDE.md` (now wrapped in `<!-- TOH-FRAMEWORK-START/END -->` markers).
  - **Cursor** — `.cursor/rules/toh-framework.mdc` + `toh-agents.mdc`, new `.cursor/agents/` (8 native subagents); root `.cursorrules` only with `--legacy-cursorrules`.
  - **Antigravity (agy CLI + IDE)** — `.agents/rules/toh-framework.md` (EN 6,034 chars / TH 5,780; ≤ 12,000 hard assert), `.agents/skills/` (37), `.agents/workflows/` (14) + legacy mirror `.agent/workflows/` (14), `.agents/agents/` (8, `subagent: true`), `.agents/hooks.json`.
  - **Codex** — root `AGENTS.md` TOH block 12,958 B EN / 12,647 B TH (24,576 B hard assert) + `.codex/config.toml` (`project_doc_max_bytes = 131072`, never overwrites an existing file); also reads the shared `.agents/skills/`.
  - **Gemini CLI (legacy, `--legacy-gemini`)** — `.gemini/` (GEMINI.md, 14 TOML commands, skills, settings.json); the TOML commands and settings.json are byte-identical to 2.0.0 (verified by diffing real installs), GEMINI.md differs only in its embedded version line, and the copied skills differ in 14 SKILL.md files (the new v2.1 frontmatter, plus this release's small orchestration-protocol wording updates).
- `.toh/capabilities.json` profiles updated: cursor `subagents: "native"`; antigravity `subagents: "file-based"`, `hooks: true`, `workflows: true`. Union semantics are additive — projects installed under v2.0 with gemini keep both `gemini-cli` and `antigravity` declared.
- Removed `bin/toh-npx-wrapper.js`; `installer/list.js` rewritten to live-read `src/`. Package tarball: 142 files, ~1.1 MB unpacked (`npm pack --dry-run`).
- New `installer/uninstall.js`, lazy-loaded by `bin/toh-cli.js` like every other command; `installer/install.js` gained a before/after content snapshot of its own surfaces (`.toh`, `.claude`, `.cursor`, `.agents`, `.agent`, `.codex`, `.gemini`, `CLAUDE.md`, `AGENTS.md`, `.cursorrules`) to build the schema-2 inventory. The snapshot never follows symlinks and never walks the project tree. `generateClaudeMd` / `generateClaudeMdBlock` are now exported from `installer/ide-handlers/claude-code.js` so the uninstaller can recognise our own generated text in pre-2.1 projects. New npm script `uninstall:local`.
- package.json: version **2.0.0 → 2.1.0**; description and keywords now name Claude Code, Cursor, Antigravity (+ Antigravity CLI), Codex (CLI + desktop app), and ZCode — the dead `gemini` keyword dropped; `codex`, `openai-codex`, `antigravity-cli`, `agy`, `agent-skills`, `zcode`, `z-ai` added.

---

## [2.0.0] - 2026-07-14

### 🚀 v2.0.0 Final: Single-Source Agents, Merged Harness & Tiered Memory

The v2.0.0 final release closes the whole v2 upgrade. Phase 4 consolidates the framework to one source of truth: agents live in a single set that the installer transforms into each IDE format, the response skills collapse into one harness, and memory loading gets dramatically lighter.

#### R2 — Plan↔Vibe link, TOH LOOP autonomy, Design Identity (2026-07-16)

- **`/toh-plan` v3** — the plan is now a file: writes `.toh/plan.md` (Goal / Stack / Pages / Done When / phased tasks with Checkpoints) and gates on ONE approval — after "Go" the whole plan is built autonomously with no per-phase prompts.
- **`/toh-vibe` v5.1** — plan pre-flight (resumes any unfinished `.toh/plan.md` at the first unchecked task, in any session or IDE), materializes its own mini-plan before building, and adds the design identity step (root `DESIGN.md` before any UI).
- **NEW `orchestration-protocol` skill** — single source of truth for the 2-step runtime survey, the execution ladder (teams → subagents → sequential), the `.toh/plan.md` schema + `.toh/progress.md` ledger, and THE TOH LOOP (pick → implement → QC gate with quoted output → tick → next task without asking). Skill count **22 → 23**.
- **`engineer-harness` 1.1** — Section C is now the canonical announce contract: Status / Result / Evidence + exactly 3 stage-aware, runnable next actions derived from plan state.
- **`design-craft` rewritten** as a constraint+process skill, plus new **`AVOID-LIST.md`** (versioned anti-slop negative constraints) and **`DESIGN-TEMPLATE.md`**; every project with UI gets a per-project root **`DESIGN.md`** generated by design-reviewer (Mode A, two-pass) before UI work — never pre-created as a placeholder.
- **Templates de-slopped** — landing/auth/dashboard templates stripped of AI-tell patterns (gradient hero blobs, identical icon-card rows, eyebrow pills, glassmorphism defaults).
- **Installer** — per-IDE command transform via `<!-- tfw:claude -->` / `<!-- tfw:fallback -->` marker blocks (Claude Code keeps enforcement extras, other IDEs get the pure prose loop), writes `.toh/capabilities.json`, and ships a Claude Code Stop hook + `.claude/loop.md` heartbeat that enforce the loop until plan.md is done.
- **Agent frontmatter** — installer now passes through `isolation` / `maxTurns` / `memory` fields (e.g. builders get worktree isolation, test-runner gets a turn bound).

#### Changed

- **Agents consolidated to a single source** - deleted the duplicate `src/agents/subagents/` set. Agents now live in one place and the installer transforms that single source into each IDE's format (Claude Code, Cursor, Gemini CLI, Antigravity) instead of maintaining parallel copies.
- **Per-agent model tiers** - each agent now declares its own model tier: **opus** for the heavy reasoners (`plan-orchestrator`, `design-reviewer`), **haiku** for the fast/cheap path (`test-runner`), and the balanced default elsewhere.
- **Memory switched to tiered loading** - Tier 1 (`active.md` + `summary.md`) is always loaded at ~800 tokens, replacing the old unconditional ~3000-token 7-file read. Deeper tiers load on demand only when the task needs them.

#### Added

- **`engineer-harness` skill** - merges `response-format` + `smart-suggestions` into a single skill, and adds **Tool Selection Rules** (when to reach for which tool) plus a **Non-dev Communication Mode** for speaking plainly to non-technical users.
- **Installer agent transform** - one agent source is now rewritten into per-IDE frontmatter/format at install time, including the per-agent model tier.

#### Technical

- Skill count reduced **23 → 22** (`response-format` + `smart-suggestions` merged into `engineer-harness`, net -1) across README.md, docs/README-TH.md, and `src/commands/toh-help.md`.
- Repointed all `response-format` path references to `engineer-harness` across the Antigravity workflows (`toh.md`, `toh-ui.md`, `toh-dev.md`) and Gemini CLI commands (`toh.toml`, `ui.toml`, `dev.toml`).
- Added **`js-yaml` `^4.1.0`** dependency - used by the installer to parse/rewrite agent frontmatter during the single-source transform.
- Agent count (**8**) and command count (**14**) unchanged.
- Version bumped from **2.0.0-beta.3** to **2.0.0**.

---

## [2.0.0-beta.3] - 2026-07-14

### 📱 Platform Commands: LINE MINI App & PWA-first Mobile

Reframed the two platform commands around current, doc-driven stacks - convert-to-LINE-MINI-App and PWA-first mobile with Capacitor - and stripped the frozen SDK snippets in favor of pulling the current APIs from official docs.

#### Changed

- **`/toh-line` reframed to convert-to-LINE-MINI-App** - now a doc-driven conversion flow. Frames the channel as the newer **LINE MINI App** channel type (replacing the old LINE Login channel + separately-registered LIFF app; Thailand can create it since Mar 2026) while still using the **LIFF SDK (`@line/liff`)**. No frozen SDK version or pasted snippets - the current API is pulled from developers.line.biz.
- **`/toh-mobile` switched from Expo to PWA-first + Capacitor** - default track is now an installable, offline-capable PWA that reuses the existing web app, then wraps it with **Capacitor** for native iOS/Android builds. Expo / React Native is demoted to a legacy note (only for an explicit fully-native rewrite).
- **`platform-specialist` skill overhauled** to doc-pull checklists - removed the frozen LIFF / Expo / Tauri-v1 code and demoted Expo to a legacy note.
- **`platform-adapter` agents updated** to the new platforms (LINE MINI App, PWA / Capacitor).

#### Added

- **Doc-driven rule** on both platform commands - pull the current SDK/API from official docs (developers.line.biz, capacitorjs.com) instead of freezing a version.
- **PWA-first mobile track** - web app manifest + service worker path before any native wrapper.

#### Technical Details

- Propagated the new platform wording across the **Antigravity workflows** (`toh-line.md`, `toh-mobile.md`, `toh-help.md`), **Gemini CLI commands** (`line.toml`, `mobile.toml`, `help.toml`), routing skills (`vibe-orchestrator`, `smart-routing`), docs/help tables (README.md, docs/README-TH.md, `src/commands/toh-help.md`, `src/commands/README.md`, `USAGE-GUIDE.md`), and the installer handlers (`list.js`, `claude-code.js`, `cursor.js`, `codex.js`, `gemini-cli.js`).
- Command / skill / agent counts unchanged (**14 / 23 / 8**) - this phase reframes existing commands, it adds none.
- Version bumped to **2.0.0-beta.3**.

---

## [2.0.0-beta.2] - 2026-07-14

### 🎨 Modern Stack & Principle-Based Design

Refreshed the default template stack to the current generation and collapsed two overlapping design skills into a single principle-based one.

#### Changed

- **Template stack upgraded** to **Next.js 16 / React 19 / Tailwind 4** - `globals.css` migrated to the Tailwind 4 `@theme` directive and `forwardRef` removed (React 19 passes `ref` as a regular prop).
- **`design-mastery` + `design-excellence` merged** into a single principle-based **`design-craft`** skill - dropped the hardcoded per-business color registry in favor of deriving design personality from business context.

#### Added

- **`design-craft` skill** - one principle-based design skill covering design system, anti-patterns, and business-appropriate fit.
- **Anti-AI checklist** in `design-reviewer` to catch generic "AI generated" tells.
- **`dev-engineer` rule** to check the latest stable version (`npm view`) before pinning dependencies instead of hardcoding versions.

#### Technical Details

- Skill count updated **24 → 23** (two design skills merged into one) across README.md, docs/README-TH.md, and `src/commands/toh-help.md`.
- All `design-mastery` / `design-excellence` references repointed to **`design-craft`** across agents, commands, skills, Antigravity workflows, Gemini CLI commands, and the installer handlers.
- Stale `Next.js 14` stack mentions updated to `Next.js 16`.
- Version bumped to **2.0.0-beta.2**.

---

## [2.0.0-beta.1] - 2026-07-14

### 🎯 Intent-Based Orchestration & Evidence-First Debugging

A ground-up rewrite of the flagship commands around real intent and real proof - cutting the status theater and treating debugging as an investigation.

#### Changed

- **`/toh` rewritten intent-based** - now runs on a single **Intent → Route → Verify → Report** axis. Understands what the user actually wants, acts immediately on small work (≤3 tasks, no plan shown), shows a short plan only for bigger work, delegates independent pieces by agent description, verifies with a real build, and reports in human language. No mapping tables, no confidence %, no status theater.
- **`/toh-vibe` rewritten intent-based** - same Intent → Route → Verify → Report axis scoped to greenfield. "Type Once, Have it all!" - one line in, a multi-page running app out. Design personality is delegated to the design agent from business context; no hardcoded palettes or purple-blue gradient.
- **`/toh-fix` rebuilt evidence-first** - replaced the old "Common Fixes" cookbook with **Common Root Causes**. New protocol **REPRODUCE → EVIDENCE → DIAGNOSE → FIX → PROVE**: no code change until the root cause is proven, differential diagnosis over easy guesses, and proof by re-running the failing path before reporting.
- **`debug-protocol` skill synced** - targeted logging at the point of failure, `git bisect` for regressions, and differential diagnosis.

#### Added

- **`root-cause-debugger` agent (8th agent)** - an investigate-only specialist (Read/Grep/Glob/Bash, no writes) that finds and *proves* a bug's root cause before any code is touched, then reports where to fix it. `/toh` and `/toh-fix` delegate to it when a cause is unknown or a fix keeps failing.
- **Antigravity `/toh` workflow** - Antigravity now has a native `/toh` orchestrator workflow (it previously only had the sub-commands).

#### Technical Details

- Agent count updated **7 → 8** across README.md, docs/README-TH.md, `src/commands/toh-help.md`, and `src/agents/README.md`.
- Synced the rewritten intent/evidence-first content into the **Antigravity workflows** (`toh.md`, `toh-fix.md`, `toh-vibe.md`) and the **Gemini CLI commands** (`fix.toml`, `vibe.toml`).
- Version bumped to **2.0.0-beta.1**.

---

## [1.8.1] - 2026-01-11

### 🌐 Google Antigravity Workflows Support

Full support for Google Antigravity IDE slash commands.

#### Added

- **13 Workflow Files** in `src/antigravity-workflows/`:
  - `toh-help.md`, `toh-vibe.md`, `toh-plan.md`
  - `toh-ui.md`, `toh-dev.md`, `toh-design.md`
  - `toh-test.md`, `toh-connect.md`, `toh-fix.md`
  - `toh-ship.md`, `toh-line.md`, `toh-mobile.md`, `toh-protect.md`

- **Automatic Installation** - Workflows copied to `.agent/workflows/` on install

#### Changed

- `gemini-cli.js` - Now creates both `.gemini/commands/` (TOML) and `.agent/workflows/` (Markdown)
- `install.js` - Updated messages to show both Gemini CLI and Antigravity commands
- Install now shows separate sections for Gemini CLI (Terminal) and Google Antigravity (IDE)

#### Technical Details

| Platform | Config Location | Format | Command Syntax |
|----------|-----------------|--------|----------------|
| Gemini CLI | `.gemini/commands/` | TOML | `/toh:vibe` |
| Antigravity | `.agent/workflows/` | Markdown + YAML | `/toh-vibe` |

---

## [1.8.0] - 2026-01-11

### 🧠 Enhanced Memory & Agent Orchestration

#### Added - 7-File Memory System

Upgraded from 5 files to 7 files for comprehensive project tracking:

| File | Purpose | Token Budget |
|------|---------|--------------|
| `active.md` | Current task | ~500 |
| `summary.md` | Project overview | ~1,000 |
| `decisions.md` | Key decisions | ~500 |
| `changelog.md` | Session changes (NEW!) | ~300 |
| `agents-log.md` | Agent activity (NEW!) | ~300 |
| `architecture.md` | Project structure | ~500 |
| `components.md` | Component registry | ~500 |

**Benefits:**
- Session changes tracked in `changelog.md`
- Agent activity logged in `agents-log.md`
- Better debugging and continuity across sessions

#### Added - Agent Announcement Protocol

All 7 agents now announce themselves when starting/completing work:

```
[🎨 UI Builder] Starting: Create Dashboard Page
[🎨 UI Builder] ✅ Complete: Dashboard with 3 components
```

#### Added - Ultrathink Principles

All agents enhanced with Ultrathink principles:
1. **Question Assumptions** - Is this the right approach?
2. **Obsess Over Details** - Read code thoroughly before changes
3. **Iterate Relentlessly** - Build, verify, fix, improve
4. **Simplify Ruthlessly** - Minimum changes for maximum impact

#### Added - Parallel Execution Awareness

Agents now declare compatibility for parallel execution:

```markdown
This agent CAN run in parallel with:
- 🎨 UI Builder
- ⚙️ Dev Builder

This agent MUST wait for:
- 📋 Plan Orchestrator
```

#### Added - Agent Selection Reasoning Display (toh.md)

Before executing, `/toh` now shows:
- **Capability Detection** - What skills are needed
- **Agent Selection** - Which agents were chosen and why
- **Execution Strategy** - Parallel vs sequential decisions

#### Added - Execution Plan Display (toh-vibe.md)

Before starting work, `/toh-vibe` now displays:
- **Agent Workflow** - Visual phase diagram
- **Pages to Create** - Table with routes and components
- **Progress Updates** - Real-time agent status during execution

#### Added - Enhanced Planning Output (toh-plan.md)

`/toh-plan` now shows structured output:
- **Phase Breakdown** - Table with agents, types, dependencies
- **Agent Assignments** - Tasks and expected outputs per agent
- **Execution Flow** - Visual parallel/sequential diagram

#### Changed - All Agent Files (14 files)

Both root and subagent versions updated to v2.1:
- `ui-builder.md` - Added announcements, ultrathink, 7-file memory
- `dev-builder.md` - Added announcements, ultrathink, 7-file memory
- `design-reviewer.md` - Added announcements, ultrathink, 7-file memory
- `backend-connector.md` - Added announcements, ultrathink, 7-file memory
- `test-runner.md` - Added announcements, ultrathink, 7-file memory
- `platform-adapter.md` - Added announcements, ultrathink, 7-file memory
- `plan-orchestrator.md` - Added announcements, ultrathink, 7-file memory

#### Changed - Command Files (3 files)

- `toh.md` v4.1 - Agent selection reasoning, 7-file memory
- `toh-vibe.md` v4.1 - Execution plan display, progress updates
- `toh-plan.md` v2.1 - Enhanced planning output format

#### Changed - Installer Updates

- `install.js` - Now creates all 7 memory files on install
- All IDE handlers sync 7-file memory system

#### Changed - Language Normalization

- All agent definitions now 100% English
- All command definitions now 100% English
- User-facing examples remain Thai for target audience

#### Stats Update

- **Memory Files:** 5 → 7 (added changelog.md, agents-log.md)
- **Agent Version:** v2.0 → v2.1
- **Command Version:** v4.0 → v4.1

---

## [1.7.1] - 2026-01-11

### 🚀 Gemini CLI Native Commands Support

#### Added - Native Slash Commands for Gemini CLI

Gemini CLI / Google Antigravity now supports **native slash commands** instead of file mentions!

**Before (v1.7.0):**
```
@.toh/commands/toh-vibe.md restaurant management
```

**After (v1.7.1):**
```
/toh:vibe restaurant management
```

#### Added - 14 TOML Command Files

Native Gemini CLI commands in proper TOML format:

| Command | Description |
|---------|-------------|
| `/toh` | Show all commands |
| `/toh:help` | Show all commands with examples |
| `/toh:vibe` | Create new project with UI + Logic + Mock Data |
| `/toh:plan` | Analyze and plan project |
| `/toh:ui` | Create UI components and pages |
| `/toh:dev` | Add logic, state, and functionality |
| `/toh:design` | Improve design to professional level |
| `/toh:test` | Run tests and auto-fix issues |
| `/toh:connect` | Connect to Supabase backend |
| `/toh:fix` | Debug and fix issues |
| `/toh:ship` | Deploy to production |
| `/toh:line` | LINE Mini App integration |
| `/toh:mobile` | Expo / React Native app |
| `/toh:protect` | Security audit |

**Files Location:** `src/gemini-commands/`

#### Added - Skills Auto-Discovery

Skills are now copied to `.gemini/skills/` for automatic discovery by Gemini CLI:
- No more relying on `contextFiles` in settings.json
- Skills auto-loaded when referenced in commands
- Uses `@{.gemini/skills/...}` syntax in TOML prompts

#### Changed - gemini-cli.js Handler

Major update to installer handler:
- **Copy TOML commands** to `.gemini/commands/`
- **Copy skills** to `.gemini/skills/`
- **Simplified GEMINI.md** (commands are now native)
- **Simplified settings.json** (skills auto-discovered)

#### Changed - Command Naming Convention

| Claude Code | Gemini CLI | Note |
|-------------|------------|------|
| `/toh-vibe` | `/toh:vibe` | Gemini uses colon for namespaced commands |
| `/toh-plan` | `/toh:plan` | Each IDE has its own format |
| `/toh-ui` | `/toh:ui` | No cross-IDE conflict |

#### No Impact on Other IDEs

Each IDE maintains its own isolated configuration:
- **Claude Code:** `.claude/commands/*.md` → `/toh-vibe` (unchanged)
- **Gemini CLI:** `.gemini/commands/*.toml` → `/toh:vibe` (new!)
- **Cursor:** `.cursor/rules/*.mdc` → `@toh` (unchanged)
- **Codex:** `AGENTS.md` (unchanged)

#### Stats Update

- **TOML Commands:** 0 → 14 (NEW!)
- **Gemini Skills Location:** `.toh/` → `.gemini/skills/`
- **Native Command Support:** Gemini CLI now has proper slash commands

---

## [1.7.0] - 2025-12-26

### 🏗️ Code Architecture Tracking & 🔐 Security Engineer System

#### Added - Code Architecture Tracking (Phase 1)

Two new memory files for instant codebase understanding:

- **`architecture.md`** - Project structure overview
  - Entry Points (pages, routes, API)
  - Core Modules organization
  - Data Flow patterns
  - External Services integration

- **`components.md`** - Component registry
  - Pages inventory
  - Components with props summary
  - Custom hooks registry
  - Zustand stores tracking
  - Utility functions

**Benefits:**
- AI no longer needs to scan codebase every session
- Token budget: ~3,000 tokens (was ~2,000)
- Memory now has 5 files instead of 3

#### Added - Security Engineer System (Phase 2)

New security-first approach for AI-generated code:

- **`security-engineer/SKILL.md`** - Security skill with:
  - Level 1: Quick checks (secrets, dangerous code, auth)
  - Level 2: Full audit (injection, auth flaws, AI risks, config)

- **`/toh-protect`** command - Full security audit
  - Aliases: `/toh-p`, `/toh-security`, `/toh-audit`
  - Scans for vulnerabilities before deployment
  - Generates detailed report with fixes
  - Supports auto-fix for common issues

- **`/toh-dev`** & **`/toh-test`** - Quick security checks
  - Pre-coding security scan
  - Post-implementation verification
  - Blocks on critical issues

#### Changed - Memory System v2.0

- **5 memory files** instead of 3 (added architecture.md, components.md)
- **Token budget** increased to ~3,000 tokens
- **All 14 agents** updated with new Memory Protocol
- **All 4 IDE handlers** create all 5 memory files on install

#### Updated - Commands

- `/toh-dev` - Added pre and post security checks
- `/toh-test` - Added quick security check before testing
- Memory read/save now includes architecture.md and components.md

#### Stats Update

- **Commands:** 14 → 15 (added `/toh-protect`)
- **Skills:** 23 → 24 (added `security-engineer`)
- **Memory Files:** 3 → 5 (added architecture, components)

---

## [1.6.1] - 2025-12-18

### 📝 Documentation & Command Description Update

#### Changed - README Complete Rewrite
- **README.md** - Complete rewrite for v1.6.0 features (English)
- **docs/README-TH.md** - Complete rewrite for v1.6.0 features (Thai)
- Focused on Sub-Agents, Multi-Agent Orchestration, and Vibe Mode
- Cleaner structure with better examples

#### Fixed - Command Descriptions
- All commands now have **single-line descriptions** in YAML frontmatter
- Claude Code can now display descriptions in slash command picker
- Standardized format across all 14 command files

#### Changed - toh-help.md
- Converted to **English only** for consistency
- Updated to v1.6.0 feature set
- Added Sub-Agents table

---

## [1.6.0] - 2025-12-18

### 🤖 Claude Code Sub-Agents & Multi-Agent Orchestration

#### Added - Claude Code Native Sub-Agents

- **7 Sub-Agents** in Claude Code native format (YAML frontmatter with `tools`, `model`)
- **Dual Architecture** - Original format for Cursor/Gemini, Subagent format for Claude Code
- **Sub-Agent Files:**
  - `ui-builder.md` - Create pages, components, layouts
  - `dev-builder.md` - Add logic, state, API integration
  - `backend-connector.md` - Supabase, Auth, Database
  - `design-reviewer.md` - Polish design, eliminate AI red flags
  - `test-runner.md` - Auto test & fix loop
  - `plan-orchestrator.md` - Analyze, plan, coordinate
  - `platform-adapter.md` - LINE, Mobile, Desktop adaptation

#### Added - `/toh` v4.0 Multi-Agent Orchestration

- **Workflow Planning** - Shows agent assignments before execution
- **Parallel Execution** - Run independent agents simultaneously
- **Quality Gates** - Verify between agent handoffs
- **Full Visibility** - User sees which agent does what

#### Added - Vibe Mode Orchestration

- **Vibe Mode** is now an orchestration pattern (not an agent)
- Coordinates 5 sub-agents: plan → ui → dev → design → test
- CLAUDE.md is the Core Orchestrator
- `/toh-vibe` triggers full project creation workflow

#### Changed - Installer Updates

- Claude Code: copies `subagents/` to `.claude/agents/` (native format)
- Other IDEs: copies `agents/` to `.toh/agents/` (original format)
- CLAUDE.md template includes Vibe Mode workflow documentation

#### Updated - Documentation

- `src/agents/README.md` - Dual Architecture explanation
- `src/commands/toh.md` - v4.0 Multi-Agent spec
- `src/commands/toh-vibe.md` - Sub-Agent Orchestration workflow

---

## [1.5.2] - 2025-12-10

### Fixed

- Install finish message now shows "What's New:" instead of "New in v1.5.0:" to avoid version confusion
- Version display consistency across all files

---

## [1.5.1] - 2025-12-05

### Fixed

- Install finish message now respects language selection (EN/TH)
- AI now responds in the same language the user types (not forced EN or TH)

### Documentation

- Updated README-TH.md with v1.5.0 features and Supported IDEs table
- Added "Update to Latest Version" section in both README.md and README-TH.md

---

## [1.5.0] - 2025-12-05

### 🌌 Google Antigravity - Full Support!

#### Added - Full Google Antigravity/Gemini Support

- **Context Files Auto-Loading** - Skills and agents loaded via `settings.json`
- **GEMINI.md Configuration** - Complete rules and command recognition
- **Skills Loading Checkpoint** - AI must report loaded skills
- **Memory Protocol Enforcement** - Mandatory load/save

#### Changed - Dual Folder Architecture

| IDE | Folder | Reason |
|-----|--------|--------|
| Claude Code | `.claude/` | Required for slash commands to work |
| Cursor | `.toh/` | Uses @ file references |
| Gemini/Antigravity | `.toh/` | Uses contextFiles in settings.json |
| Codex | `.toh/` | Uses path references |

- Claude Code now uses `.claude/` folder (copies from `.toh/` on install)
- All other IDEs use `.toh/` as central resources
- Resources are synced on every `toh install`

#### Added - Memory Protocol Enforcement

```
BEFORE Work:
1. Read .claude/memory/ (or .toh/memory/)
2. Load active.md, summary.md, decisions.md
3. Report "Memory loaded!"

AFTER Work:
1. Update memory files
2. Confirm "Memory saved ✅"
```

- **Mandatory** - AI cannot skip memory operations
- **English Only** - Memory files always in English for consistency
- **Cross-IDE** - Same memory format works across all IDEs

#### Added - Skills Loading Checkpoint

AI must now report skills at the START of every response:

```markdown
📚 **Skills Loaded:**
- skill-name-1 ✅ (what was learned)
- skill-name-2 ✅ (what was learned)

🤖 **Agent:** agent-name

💾 **Memory:** Loaded ✅
```

This ensures AI actually reads skills before working.

#### Changed - Memory Templates to English

- `active.md` - Now English only
- `summary.md` - Now English only  
- `decisions.md` - Now English only
- `MEMORY-SYSTEM.md` - Full English documentation

#### Fixed

- Claude Code slash commands not showing (required `.claude/` folder)
- Memory not being created/saved by AI
- Skills not being read before execution

---

## [1.4.0] - 2025-12-04

### ✨ Smart Single Command & Premium Experience

#### Added - `/toh` Smart Command v3.0 (MAJOR!)

```
/toh [พิมพ์อะไรก็ได้]
```

- **Natural Language Routing** - AI วิเคราะห์ request → เลือก Agent ที่เหมาะสม
- **No Memorization Required** - ไม่ต้องจำ commands อีกต่อไป
- **Intelligent Routing** - Fix bugs → Fix Agent, Design → Design Agent, etc.
- **Complexity Detection** - Auto-route complex tasks to Plan Agent
- **Premium by Default** - New projects get 5+ pages with animations

#### Added - Premium Experience Skill (NEW!)

- **Multi-Page Generation** - 5+ pages per project (Home, Dashboard, Feature, Settings, Auth)
- **Animation System** - PageTransition, StaggerContainer, FadeIn, CountUp
- **Component Templates** - 15 ready-to-use premium components
- **Zero TypeScript Errors** - Build verification before delivery
- **WOW Factor** - Instant professional-looking results

#### Added - Design Mastery Extended

- **13 Business Profiles** - SaaS, E-commerce, Food, Healthcare, Finance, Education, Travel, Real-estate, Gaming, Social-media, AI-Chatbot, Creative, Enterprise
- **Auto Profile Detection** - AI detects business type from request keywords
- **Design Tokens** - Colors, typography, patterns per profile
- **Trend Registry** - 2024-2025 design trends with suitability matrix

#### Added - 4 New Skills

| Skill | Description |
|-------|-------------|
| **premium-experience** | Multi-page apps with animations and WOW factor |
| **prompt-optimizer** | สำหรับ AI SaaS - สร้าง system prompts ที่ดี |
| **design-mastery** | Smart design ตาม business type (13 profiles) |
| **response-format** | Response Excellence - ตอบครบ ไม่ต้องถามซ้ำ |

#### Added - Component Templates (15 files)

```
src/templates/components/
├── motion/        (4 files) - PageTransition, StaggerContainer, FadeIn, CountUp
├── feedback/      (3 files) - LoadingSpinner, Skeleton, EmptyState
├── interactive/   (2 files) - AnimatedCard, AnimatedButton
└── layout/        (3 files) - Navbar, Sidebar, Footer

src/templates/pages/
├── landing-page.tsx
├── dashboard-page.tsx
└── auth-pages.tsx
```

#### Added - Response Excellence Format

ทุก response จะมี 3 ส่วน:
1. **✅ สิ่งที่ทำให้** - ไฟล์ที่สร้าง/แก้ไข
2. **🎁 สิ่งที่คุณได้** - Features, URLs, benefits
3. **👉 สิ่งที่คุณต้องทำ** - ขั้นตอนถัดไป (ชัดเจน!)

#### Updated - Agents Enhanced

- **ui-builder.md** - Premium Mode with multi-page generation
- **design-reviewer.md** - Premium quality verification checklist
- **vibe-orchestrator** - Premium Experience integration

#### Stats Update

- **Commands:** 13 → 14 (added `/toh` v3.0)
- **Skills:** 18 → 23 (+5 new skills)
- **Design Profiles:** 8 → 13 (+5 profiles)
- **Component Templates:** 0 → 15 (NEW!)
- **Page Templates:** 0 → 3 (NEW!)

---

## [1.3.0] - 2025-12-03

### 🧠 AI Intelligence Upgrade

#### Added - 8 New Skills

| Skill | Description |
|-------|-------------|
| **business-context** | AI understands business types, auto-includes standard features |
| **smart-suggestions** | AI suggests 2-3 next steps after every task |
| **error-handling** | Auto-fix errors silently, user never sees raw errors |
| **progress-tracking** | Visual progress bars and checklists |
| **session-recovery** | Continue where you left off, even across IDEs |
| **preview-mode** | See changes before applying |
| **version-control** | Easy undo/rollback without knowing git |
| **integrations** | One-click setup for Stripe, PromptPay, Email, Analytics |
| **debug-protocol** | Systematic debugging with 3-5-Rewrite Rule |

#### Updated - All Agents Enhanced

- **plan-orchestrator.md** - Full skills integration, business context awareness
- **ui-builder.md** - Preview mode, progress tracking, error handling
- **dev-builder.md** - Error handling, smart suggestions
- **test-runner.md** - Auto-fix loop, progress tracking
- **backend-connector.md** - Integrations skill, version control
- **design-reviewer.md** - Preview mode, smart suggestions

#### Updated - Command Recognition

- Added "Command Without Description" behavior for all IDE handlers
- AI now asks "What would you like me to help with?" instead of executing blindly
- Applied to Claude Code, Gemini CLI, Cursor, Codex CLI

#### Stats Update

- **Skills:** 14 → 17 (+7 new skills but some combined)
- **Total files:** 45+ markdown files

---

## [1.2.2] - 2025-12-02

### 📚 Documentation Update

#### Updated
- **`/toh-help` command** - Now shows v1.2.2 with all latest features
- **Added `/toh-plan`** to help command (was missing!)
- **Framework Stats** - Updated to 8 agents, 13 commands, 14 skills
- **Memory System section** - Added to help output
- **What's New section** - Added to help output
- **README.md** - Version updated to v1.2.2
- **README-TH.md** - Version updated to v1.2.2
- **All docs synced** - npm, git, and docs now all match

---

## [1.2.0] - 2025-12-01

### 🧠 Memory Enforcement Update

#### Added

**Selective Read Protocol (Token-Optimized)**
- Smart memory loading: ~2,000 tokens per session
- Always read 3 core files (active, summary, decisions)
- Archive folder only loaded on-demand
- Prevents context overload while maintaining full project awareness

**Mandatory Memory Save**
- All commands now enforce memory save before completion
- Confirmation required: "✅ บันทึก memory แล้วครับ"
- No command can finish without saving memory

#### Changed

**All Commands Updated**
- Added STEP 0: READ MEMORY (MANDATORY!) 
- Added final STEP: SAVE MEMORY (MANDATORY!)
- Commands affected: toh-ui, toh-dev, toh-connect, toh-design, toh-vibe, toh-plan, toh-fix, toh-test, toh-ship, toh-line, toh-mobile

**All Agents Updated**
- Added "🚨 Selective Read Protocol" section
- Added mandatory save with confirmation
- Agents affected: ui-builder, dev-builder, backend-connector, design-reviewer, test-runner, platform-adapter, plan-orchestrator

**Core Memory Files**
- Updated MEMORY-INSTRUCTIONS.md with 4 Critical Rules
- Updated memory-system/SKILL.md with token budget table
- Updated vibe-orchestrator/SKILL.md with memory as STEP 0 and STEP 3

---

## [1.1.0] - 2025-11-30

### 🧠 The Brain Update

#### Added

**Plan Orchestrator (`/toh-plan`)**
- New command that acts as "The Brain" of the framework
- Analyzes complex requests and creates execution plans
- Delegates work to specialized agents (ui, dev, design, test, etc.)
- Shows plan before execution, waits for user approval

**Auto Memory System**
- Automatic context persistence across sessions
- Zero-config - works out of the box
- IDE-agnostic and model-agnostic
- Files stored in `.toh/memory/`:
  - `active.md` - Current task (~500 tokens)
  - `summary.md` - Project summary (~1,000 tokens)
  - `decisions.md` - Key decisions (~500 tokens)
  - `archive/` - Historical data (on-demand)

**Enhanced Dev Agent**
- API Doc Reader superpower - reads docs from URLs
- Better integration with external APIs

#### Changed
- All agents now have Memory Integration
- Installer creates memory folder automatically
- Updated all IDE handlers with v1.1.0 features

---

## [1.0.0] - 2025-11-29

### 🎉 Initial Release

#### Features
- **Core Orchestrator** - AI-Orchestration Driven Development (AODD)
- **7 Specialized Agents** - ui-builder, dev-builder, design-reviewer, test-runner, backend-connector, platform-adapter
- **12 Commands** - /toh-vibe, /toh-ui, /toh-dev, /toh-design, /toh-test, /toh-connect, /toh-line, /toh-mobile, /toh-fix, /toh-ship, /toh-help
- **Multi-IDE Support** - Claude Code, Cursor, Gemini CLI, Codex CLI
- **Bilingual** - English and Thai support

#### Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Zustand for state management
- React Hook Form + Zod
- Supabase backend
- TypeScript (strict)

---

## Roadmap

### v1.3.0 (Planned)
- Template system for common project types
- Enhanced test automation
- Performance improvements

### v2.0.0 (Future)
- Visual workflow builder
- Team collaboration features
- Custom agent builder
