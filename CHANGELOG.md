# Changelog

All notable changes to Toh Framework will be documented in this file.

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
