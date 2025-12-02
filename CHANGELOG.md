# Changelog

All notable changes to Toh Framework will be documented in this file.

## [1.2.1] - 2025-12-02

### 📚 Documentation Update

#### Updated
- **`/toh:help` command** - Now shows v1.2.1 with all latest features
- **Added `/toh:plan`** to help command (was missing!)
- **Framework Stats** - Updated to 8 agents, 13 commands, 14 skills
- **Memory System section** - Added to help output
- **What's New section** - Added to help output
- **README.md** - Version updated to v1.2.1
- **README-TH.md** - Version updated to v1.2.1

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

**Plan Orchestrator (`/toh:plan`)**
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
- **12 Commands** - /toh:vibe, /toh:ui, /toh:dev, /toh:design, /toh:test, /toh:connect, /toh:line, /toh:mobile, /toh:fix, /toh:ship, /toh:help
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
