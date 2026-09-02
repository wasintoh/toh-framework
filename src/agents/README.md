# /toh- Agents v5.0 — Single Source of Truth

Expert agents that power the `/toh-` command suite. Each agent is **self-sufficient**, **self-correcting**, and **expert-level**.

## 🏗️ One Source, Transformed Per IDE (v5.0)

As of v2.0.0 there is **ONE** set of agent files — `src/agents/*.md` — written in
Claude Code native format with a **superset frontmatter**. The old dual set
(`src/agents/*.md` + `src/agents/subagents/*.md`, ~95% duplicate) has been collapsed:
`subagents/` is gone. Edit one file → every IDE gets the change after install.

```
src/agents/*.md              ← single source (superset frontmatter + canonical body)
        │
   installer transforms at install time (installer/ide-handlers/):
        ├── Claude Code  → copy as-is → .claude/agents/*.md
        │                  (uses native name / description / tools / model)
        ├── Cursor       → native subagents → .cursor/agents/*.md
        ├── Antigravity  → .agents/agents/*.md (subagent: true)
        ├── Codex        → compact roster in AGENTS.md + native agents in .codex/agents/*.toml
        ├── ZCode        → compact roster in AGENTS.md, bodies read from .toh/
        └── Gemini (legacy) → convert frontmatter to the Gemini format
```

### Superset Frontmatter

Every agent declares the same keys, in this order. The installer keeps what each
IDE understands and drops the rest — no per-IDE source files needed.

```yaml
name: ui-builder
description: |
  Expert UI builder that creates production-ready UIs immediately.
  Delegate when: creating pages, components, layouts, forms...   # tuned for Task auto-match
tools:            # Claude Code: native tool allowlist
  - Read
  - Write
  - Edit
  - Bash
model: sonnet     # Claude Code: model tier per agent
modelIntent: implementation # Codex: lightweight | implementation | planning | review -> reasoning effort (model is inherited)
skills:           # Toh skill bindings (all IDEs)
  - ui-first-builder
  - design-craft
  - premium-experience
  - engineer-harness
triggers:         # routing hints (commands + intents)
  - /toh-ui command
  - /toh-vibe command (UI portion)
```

- **description** — a "Delegate when: …" block scalar, tuned so Claude Code's Task tool auto-matches the right agent.
- **tools** — a *narrow* allowlist per agent (not a uniform list). E.g. `root-cause-debugger` is `Read, Grep, Glob, Bash` only — read-only by design.
- **model** — per-agent tier: heavy thinkers on `opus`, builders on `sonnet`, mechanical work on `haiku` (faster + cheaper).
- **skills** — reflects the v2 skill merge: `engineer-harness` is the consolidated harness skill that absorbed the two older reporting / next-step skills.
- **triggers** — command + intent hints, retained from the original set.

---

## Agent Overview

| Agent | Model | Tools | Expertise | Triggered By |
|-------|-------|-------|-----------|--------------|
| **plan-orchestrator** | `opus` | Read, Write, Edit, Bash, WebFetch | Analysis / Planning / Multi-agent coordination | `/toh-plan`, `/toh-ship` |
| **design-reviewer** | `opus` | Read, Write, Edit, Bash | Design polish / Anti-AI red flags | `/toh-design` |
| **ui-builder** | `sonnet` | Read, Write, Edit, Bash | UI / Components / Mock data | `/toh-vibe`, `/toh-ui` |
| **dev-builder** | `sonnet` | Read, Write, Edit, Bash, WebFetch | Logic / State / TypeScript / API docs | `/toh-dev` |
| **backend-connector** | `sonnet` | Read, Write, Edit, Bash | Supabase / Auth / RLS | `/toh-connect` |
| **platform-adapter** | `sonnet` | Read, Write, Edit, Bash | LINE / PWA / Capacitor / Tauri | `/toh-line`, `/toh-mobile` |
| **root-cause-debugger** | `sonnet` | Read, Grep, Glob, Bash *(read-only)* | Root-cause investigation (proves, never guesses) | `/toh-fix` (investigate) |
| **test-runner** | `haiku` | Read, Write, Edit, Bash | Testing / Auto-fix loop | `/toh-test`, `/toh-fix` |

**8 agents, one source set.** Model tiers keep heavy reasoning on `opus`, the build
fleet on `sonnet`, and mechanical test work on `haiku`.

## 📦 Installation Paths

The same source produces IDE-appropriate output at install time:

| IDE | Agent Location | How the source is used |
|-----|----------------|------------------------|
| Claude Code | `.claude/agents/*.md` | Copied as-is (native `name`/`description`/`tools`/`model`) |
| Cursor (2.4+) | `.cursor/agents/*.md` | Native subagents (`readonly` derived from the tools allowlist) |
| Antigravity (+ CLI) | `.agents/agents/*.md` | Frontmatter converted, `subagent: true` |
| Codex (CLI + desktop app) | `AGENTS.md` roster + `.codex/agents/*.toml` | Compact roster table + one native agent per Toh agent (no `model` key; effort from `modelIntent`) |
| ZCode | `AGENTS.md` roster + `.toh/agents/*.md` | Compact roster table; bodies read at runtime |
| Gemini CLI (legacy) | `.toh/agents/*.md` | Frontmatter converted per IDE |

```
.claude/agents/                  ← Claude Code (native, from src/agents/ directly)
├── plan-orchestrator.md
├── design-reviewer.md
├── ui-builder.md
├── dev-builder.md
├── backend-connector.md
├── platform-adapter.md
├── root-cause-debugger.md
└── test-runner.md
```

There is no `subagents/` folder anymore — the installer is the transform layer.

---

## Agent Philosophy

ทุก agent ออกแบบตามหลัก:

### 1. Self-Sufficient (พึ่งตนเองได้)
```
ไม่ต้องพึ่ง agent อื่น · ไม่ต้องรอ input เพิ่ม · ไม่ถามคำถามที่ไม่จำเป็น
```

### 2. Self-Correcting (แก้ไขตัวเองได้)
```
ตรวจสอบงานตัวเองก่อนส่งมอบ · พบปัญหา → แก้ไขทันที · ไม่รอให้ user บอก
```

### 3. Expert-Level (ระดับผู้เชี่ยวชาญ)
```
ตัดสินใจถูกต้อง · ใช้ best practices · ไม่มี amateur mistakes
```

---

## 🧠 Memory: Tiered Loading (v2)

Agents no longer read all 7 memory files by reflex. They load only what the task
needs, and a delegated agent uses the context the orchestrator passes instead of
re-reading:

```
Tier 1 (ALWAYS)          active.md + summary.md              (~800 tokens)
Tier 2 (per task type)   architecture.md + components.md     → build / code work
                         changelog.md                         → debug work
Tier 3 (when referenced) decisions.md + agents-log.md
```

All 7 files are kept (agents-log stays separate). Writes: always update `active.md`;
update `summary.md` when the project shape changes; update the rest per relevance.

---

## Claude 4.x Techniques Used

Every agent applies these prompt patterns (see the `prompt-optimizer` skill):

```xml
<default_to_action>Implement immediately rather than asking questions.</default_to_action>
<use_parallel_tool_calls>Read multiple files in parallel for efficiency.</use_parallel_tool_calls>
<investigate_before_answering>Never speculate — read actual code before changing it.</investigate_before_answering>
```

---

## Workflow Diagram

```
USER: /toh-vibe expense tracker
           │
           ▼
   📋 plan-orchestrator (opus) — plans + spawns agents, UI First
           │
           ├────────────────┬────────────────┐
           ▼                ▼                ▼
    🎨 ui-builder     ⚙️ dev-builder    ✨ design-reviewer
      (sonnet)          (sonnet)          (opus)
           │                │                │
           └────────────────┴────────────────┘
                            │
                            ▼
                🧪 test-runner (haiku) → auto-fix loop
                            │
                            ▼
                 ✅ Working App at localhost:3000
```

---

## Agent Details

### 📋 plan-orchestrator — THE BRAIN
Analyzes requests, builds phased plans, spawns agents (UI First), tracks progress,
recovers sessions. Passes the relevant memory context to each sub-agent it delegates.

### 🎨 ui-builder
Builds production-ready UI immediately from a description — multi-page, animated,
zero-error. Reads (or authors) the root DESIGN.md design identity before building.

### ⚙️ dev-builder
Adds logic, state (Zustand), forms (React Hook Form + Zod), and API integrations.
**Superpower:** give it an API doc URL + credentials → complete integration (WebFetch).

### ✨ design-reviewer
Eliminates "AI-generated" tells and enforces premium quality (build + animation +
multi-page verification). Runs on `opus` for sharper design judgment.

### 🔌 backend-connector
Connects the UI to Supabase securely — schema from types, RLS on every table, auth,
real-time. Never ships an insecure policy.

### 📱 platform-adapter
Converts the web app to LINE MINI App (LIFF), PWA, and Capacitor (Expo/Tauri legacy).
Doc-driven: pulls current official docs before writing platform code.

### 🔍 root-cause-debugger *(read-only)*
Investigates and **proves** a bug's root cause before any code changes. Tools are
`Read, Grep, Glob, Bash` only — it reports where to fix, it does not edit.

### 🧪 test-runner
Generates tests from the UI, runs Playwright, and auto-fixes until green (max 5
attempts) — the user only sees the final success report. Mechanical work → `haiku`.

---

## Usage

Agents are invoked via `/toh-` commands or by the orchestrator:

```bash
/toh-ui       → ui-builder
/toh-dev      → dev-builder
/toh-design   → design-reviewer
/toh-connect  → backend-connector
/toh-line     → platform-adapter (LINE)
/toh-mobile   → platform-adapter (PWA → Capacitor)
/toh-test     → test-runner
/toh-fix      → root-cause-debugger (investigate) → dev-builder (fix)
/toh-plan     → plan-orchestrator

/toh-vibe     → plan-orchestrator orchestrates ui-builder + dev-builder + design-reviewer
```
