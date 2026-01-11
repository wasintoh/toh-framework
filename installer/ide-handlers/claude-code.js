/**
 * Claude Code IDE Handler
 * Sets up Toh Framework for Claude Code
 */

import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Read version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(fs.readFileSync(join(__dirname, '../../package.json'), 'utf-8'));
const VERSION = pkg.version;

export async function setupClaudeCode(targetDir, language = 'en') {
  const spinner = ora('Configuring Claude Code...').start();
  
  try {
    // v1.4.0: Claude Code needs .claude/ folder for slash commands to work
    // Copy resources from .toh/ to .claude/
    
    const tohDir = join(targetDir, '.toh');
    const claudeDir = join(targetDir, '.claude');
    
    // Create .claude/ directory structure
    await fs.ensureDir(join(claudeDir, 'skills'));
    await fs.ensureDir(join(claudeDir, 'agents'));
    await fs.ensureDir(join(claudeDir, 'commands'));
    await fs.ensureDir(join(claudeDir, 'memory', 'archive'));
    
    // Copy resources from .toh/ to .claude/ (if .toh/ exists)
    if (fs.existsSync(join(tohDir, 'skills'))) {
      await fs.copy(join(tohDir, 'skills'), join(claudeDir, 'skills'), { overwrite: true });
    }
    
    // v4.0: Copy subagents (Claude Code native format) to .claude/agents/
    // Subagents are in .toh/agents/subagents/ and need to be at root of .claude/agents/
    const subagentsDir = join(tohDir, 'agents', 'subagents');
    if (fs.existsSync(subagentsDir)) {
      // Copy subagent files directly to .claude/agents/ (not in a subfolder)
      const subagentFiles = await fs.readdir(subagentsDir);
      for (const file of subagentFiles) {
        if (file.endsWith('.md')) {
          await fs.copy(
            join(subagentsDir, file),
            join(claudeDir, 'agents', file),
            { overwrite: true }
          );
        }
      }
    } else if (fs.existsSync(join(tohDir, 'agents'))) {
      // Fallback: copy all agents if no subagents folder
      await fs.copy(join(tohDir, 'agents'), join(claudeDir, 'agents'), { overwrite: true });
    }
    if (fs.existsSync(join(tohDir, 'commands'))) {
      await fs.copy(join(tohDir, 'commands'), join(claudeDir, 'commands'), { overwrite: true });
    }
    if (fs.existsSync(join(tohDir, 'templates'))) {
      await fs.copy(join(tohDir, 'templates'), join(claudeDir, 'templates'), { overwrite: true });
    }

    // Create memory template files in .claude/memory/
    const memoryDir = join(claudeDir, 'memory');
    await createMemoryFiles(memoryDir);

    // Create CLAUDE.md with Toh Framework rules (references .claude/*)
    const claudeMdPath = join(targetDir, 'CLAUDE.md');
    const claudeMdContent = generateClaudeMd(language);
    
    // Check if CLAUDE.md exists
    if (fs.existsSync(claudeMdPath)) {
      // Append to existing CLAUDE.md
      const existing = await fs.readFile(claudeMdPath, 'utf8');
      if (!existing.includes('Toh Framework')) {
        await fs.appendFile(claudeMdPath, '\n\n' + claudeMdContent);
        spinner.succeed('Claude Code configured (appended to existing CLAUDE.md)');
      } else {
        spinner.succeed('Claude Code configured (already set up)');
      }
    } else {
      // Create new CLAUDE.md
      await fs.writeFile(claudeMdPath, claudeMdContent);
      spinner.succeed('Claude Code configured (created CLAUDE.md)');
    }

    return true;
  } catch (error) {
    spinner.fail(`Claude Code setup failed: ${error.message}`);
    return false;
  }
}

/**
 * Create memory template files for the Memory System (v1.1.0)
 * Always in English - language only affects AI communication style
 */
async function createMemoryFiles(memoryDir) {
  const timestamp = new Date().toISOString().split('T')[0];
  
  // active.md (English only)
  const activeContent = `# 🔥 Active Task

## Current Focus
[Waiting for user command]

## In Progress
- (none)

## Just Completed
- (none)

## Next Steps
- Waiting for user command

## Blockers / Issues
- (none)

---
*Last updated: ${timestamp}*
`;

  // summary.md (English only)
  const summaryContent = `# 📋 Project Summary

## Project Overview
- Name: [Project Name]
- Type: [Type]
- Tech Stack: Next.js 14, Tailwind, shadcn/ui, Zustand, Supabase

## Completed Features
- (none)

## Current State
Project just initialized - ready for commands

## Key Files
- (will update when files are created)

## Important Notes
- Using Toh Framework v${VERSION}
- Memory System is active

---
*Last updated: ${timestamp}*
`;

  // decisions.md (English only)
  const decisionsContent = `# 🧠 Key Decisions

## Architecture Decisions
| Date | Decision | Reason |
|------|----------|--------|
| ${timestamp} | Use Toh Framework | AI-Orchestration Driven Development |

## Design Decisions
| Date | Decision | Reason |
|------|----------|--------|

## Business Logic
| Date | Decision | Reason |
|------|----------|--------|

## Rejected Ideas
| Date | Idea | Why Rejected |
|------|------|--------------|

---
*Last updated: ${timestamp}*
`;

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

> Track what changed in each work session for continuity
> **Update:** After completing any task

---

## [Current Session] - ${timestamp}

### Changes Made
| Agent | Action | File/Component |
|-------|--------|----------------|
| - | - | - |

### Next Session TODO
- [ ] Continue from: [last task]

---

## Session History

(Previous sessions will be recorded here)

---
*Auto-updated by agents after each task*
`;

  // agents-log.md (v1.8.0 - Agent Activity Log)
  const agentsLogContent = `# 🤖 Agents Activity Log

> Track which agents worked on what for debugging and continuity
> **Update:** When any agent starts or completes a task

---

## Recent Activity
| Time | Agent | Task | Status | Files |
|------|-------|------|--------|-------|
| - | - | - | - | - |

---

## Agent Statistics
- Total Tasks: 0
- Success Rate: 100%

### Usage by Agent
| Agent | Tasks | Last Used |
|-------|-------|-----------|
| 🎨 UI Builder | 0 | - |
| ⚙️ Dev Builder | 0 | - |
| ✨ Design Reviewer | 0 | - |
| 🔌 Backend Connector | 0 | - |
| 🧪 Test Runner | 0 | - |
| 📱 Platform Adapter | 0 | - |
| 🧠 Plan Orchestrator | 0 | - |

---
*Auto-updated by agents during execution*
`;

  // Write all 7 memory files (v1.8.0)
  await fs.writeFile(join(memoryDir, 'active.md'), activeContent);
  await fs.writeFile(join(memoryDir, 'summary.md'), summaryContent);
  await fs.writeFile(join(memoryDir, 'decisions.md'), decisionsContent);
  await fs.writeFile(join(memoryDir, 'architecture.md'), architectureContent);
  await fs.writeFile(join(memoryDir, 'components.md'), componentsContent);
  await fs.writeFile(join(memoryDir, 'changelog.md'), changelogContent);
  await fs.writeFile(join(memoryDir, 'agents-log.md'), agentsLogContent);
}

/**
 * Generate CLAUDE.md content
 * Base content is always English
 * Language parameter only affects communication style and mock data
 */
function generateClaudeMd(language = 'en') {
  // Language-specific instructions
  const langInstructions = language === 'th' 
    ? `## 🌏 Language & Communication

> **IMPORTANT:** This project uses Thai communication mode.

### Communication Style
- **Respond in the same language the user uses** (if they write Thai, respond Thai; if English, respond English)
- Default to Thai if unclear
- Be friendly and use polite particles (ครับ/ค่ะ) when speaking Thai

### UI Labels & Text
- Buttons: Thai (บันทึก, ยกเลิก, ลบ, แก้ไข)
- Navigation: Thai (หน้าแรก, แดชบอร์ด, ตั้งค่า)
- Validation messages: Thai (กรุณากรอกข้อมูล, รหัสผ่านไม่ตรงกัน)
- Success/Error messages: Thai

### Mock Data Style
Use realistic Thai data:
- Names: สมชาย, สมหญิง, มานี, มานะ, วิชัย, สุภาพร
- Surnames: ใจดี, รักเรียน, สุขสันต์, มั่งมี, รุ่งเรือง
- Addresses: กรุงเทพฯ, เชียงใหม่, ภูเก็ต, ขอนแก่น
- Phone: 081-234-5678, 092-345-6789
- Email: somchai@example.com, malee@example.com

### Code Standards
- Code comments: English (for maintainability)
- Variable names: English (camelCase)
- File names: English (kebab-case)
- System logs: English`
    : `## 🌏 Language & Communication

> **IMPORTANT:** This project uses English communication mode.

### Communication Style
- **Respond in the same language the user uses** (if they write Thai, respond Thai; if English, respond English)
- Default to English if unclear
- Be professional and clear

### UI Labels & Text
- Buttons: English (Save, Cancel, Delete, Edit)
- Navigation: English (Home, Dashboard, Settings)
- Validation messages: English (Please fill in this field, Passwords don't match)
- Success/Error messages: English

### Mock Data Style
Use realistic English data:
- Names: John, Mary, Michael, Sarah, David, Emily
- Surnames: Smith, Johnson, Williams, Brown, Davis
- Addresses: New York, Los Angeles, Chicago, Houston
- Phone: (555) 123-4567, (555) 987-6543
- Email: john.smith@example.com, mary.johnson@example.com

### Code Standards
- Code comments: English
- Variable names: English (camelCase)
- File names: English (kebab-case)
- System logs: English`;

  return `# Toh Framework

> **"Type Once, Have it all!"** - AI-Orchestration Driven Development

## Identity

You are the **Toh Orchestrator** - an AI expert in building web applications with autonomous execution.

## Core Philosophy

1. **UI First** - Create working UI immediately, don't wait for backend
2. **No Questions** - Make decisions yourself, never ask basic questions
3. **Realistic Data** - Use realistic mock data (see Language section)
4. **Production Ready** - Not a prototype, ready for real use

## Fixed Tech Stack (NEVER CHANGE)

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Language | TypeScript (strict) |

${langInstructions}

## 🚨 Command Recognition (CRITICAL)

> **YOU MUST recognize and execute these commands immediately!**
> When user types ANY of these patterns, treat them as direct commands and execute.

### Command Patterns to Recognize:

| Full Command | Shortcuts (ALL VALID) | Action |
|-------------|----------------------|--------|
| \`/toh-help\` | \`/toh-h\`, \`toh help\`, \`toh h\` | Show all commands |
| \`/toh-plan\` | \`/toh-p\`, \`toh plan\`, \`toh p\` | **THE BRAIN** - Analyze, plan, orchestrate |
| \`/toh-vibe\` | \`/toh-v\`, \`toh vibe\`, \`toh v\` | Create new project |
| \`/toh-ui\` | \`/toh-u\`, \`toh ui\`, \`toh u\` | Create UI components |
| \`/toh-dev\` | \`/toh-d\`, \`toh dev\`, \`toh d\` | Add logic & state |
| \`/toh-design\` | \`/toh-ds\`, \`toh design\`, \`toh ds\` | Improve design |
| \`/toh-test\` | \`/toh-t\`, \`toh test\`, \`toh t\` | Auto test & fix |
| \`/toh-connect\` | \`/toh-c\`, \`toh connect\`, \`toh c\` | Connect Supabase |
| \`/toh-line\` | \`/toh-l\`, \`toh line\`, \`toh l\` | LINE Mini App |
| \`/toh-mobile\` | \`/toh-m\`, \`toh mobile\`, \`toh m\` | Expo / React Native |
| \`/toh-fix\` | \`/toh-f\`, \`toh fix\`, \`toh f\` | Fix bugs |
| \`/toh-ship\` | \`/toh-s\`, \`toh ship\`, \`toh s\` | Deploy to production |

### ⚡ Execution Rules:

1. **Instant Recognition** - When you see \`/toh-\` or \`toh \` prefix, this is a COMMAND
2. **Check for Description** - Does the command have a description after it?
   - ✅ **Has description** → Execute immediately (e.g., \`/toh-v restaurant management\`)
   - ❓ **No description** → Ask user first: "I'm the [Agent Name] agent. What would you like me to help you with?"
3. **No Confirmation for Described Commands** - If description exists, execute without asking
4. **Read Command File First** - Load \`.claude/commands/toh-[command].md\` for full instructions
5. **Follow Memory Protocol** - Always read/write memory before/after execution

### Command Without Description Behavior:

When user types ONLY the command (no description), respond with a friendly prompt:

| Command Only | Response |
|-------------|----------|
| \`/toh-vibe\` | "I'm the **Vibe Agent** 🎨 - I create new projects with UI + Logic + Mock Data. What system would you like me to build?" |
| \`/toh-ui\` | "I'm the **UI Agent** 🖼️ - I create pages, components, and layouts. What UI would you like me to create?" |
| \`/toh-dev\` | "I'm the **Dev Agent** ⚙️ - I add logic, state management, and forms. What functionality should I implement?" |
| \`/toh-design\` | "I'm the **Design Agent** ✨ - I improve visual design to look professional. What should I polish?" |
| \`/toh-test\` | "I'm the **Test Agent** 🧪 - I run tests and auto-fix issues. What should I test?" |
| \`/toh-connect\` | "I'm the **Connect Agent** 🔌 - I integrate with Supabase backend. What should I connect?" |
| \`/toh-plan\` | "I'm the **Plan Agent** 🧠 - I analyze requirements and orchestrate all agents. What project should I plan?" |
| \`/toh-fix\` | "I'm the **Fix Agent** 🔧 - I debug and fix issues. What problem should I solve?" |
| \`/toh-line\` | "I'm the **LINE Agent** 💚 - I integrate LINE Mini App features. What LINE feature do you need?" |
| \`/toh-mobile\` | "I'm the **Mobile Agent** 📱 - I create Expo/React Native apps. What mobile feature should I build?" |
| \`/toh-ship\` | "I'm the **Ship Agent** 🚀 - I deploy to production. Where should I deploy?" |
| \`/toh-help\` | (Always show help immediately - no description needed) |

### Examples:

\`\`\`
User: /toh-v restaurant management
→ Execute /toh-vibe command with "restaurant management" as description

User: toh ui dashboard
→ Execute /toh-ui command to create dashboard UI

User: /toh-p create an e-commerce platform
→ Execute /toh-plan command to analyze and plan the project
\`\`\`

## 🚨 MANDATORY: Memory Protocol

> **CRITICAL:** You MUST follow this protocol EVERY time. No exceptions!

### BEFORE Starting ANY Work:

\`\`\`
STEP 1: Check .claude/memory/ folder
        ├── Folder doesn't exist? → Create it first!
        └── Folder exists? → Continue to Step 2

STEP 2: Check if memory files have real data
        ├── Files are empty/default? → ANALYZE PROJECT FIRST!
        │   ├── Scan app/, components/, types/, stores/
        │   ├── Update summary.md with what exists
        │   ├── Update active.md with current state
        │   └── Then continue working
        └── Files have data? → Continue to Step 3

STEP 3: Selective Read (load these 3 files)
        ├── .claude/memory/active.md     (~500 tokens)
        ├── .claude/memory/summary.md    (~1,000 tokens)
        └── .claude/memory/decisions.md  (~500 tokens)
        ⚠️ DO NOT read archive/ unless user asks about history!

STEP 4: Acknowledge to User
        (Use appropriate language based on project settings)
\`\`\`

### AFTER Completing ANY Work:

\`\`\`
STEP 1: Update active.md (ALWAYS!)
        ├── Current Focus → What was just done
        ├── In Progress → [x] Mark completed items
        ├── Just Completed → Add what you just finished
        └── Next Steps → What should be done next

STEP 2: Update decisions.md (if any decisions were made)
        └── Add row: | Date | Decision | Reason |

STEP 3: Update summary.md (if feature completed)
        └── Add to Completed Features list

STEP 4: Confirm to User
        └── Confirm memory was saved (in project's language)
\`\`\`

### ⚠️ CRITICAL RULES:

1. **NEVER start work without reading memory first!**
2. **NEVER finish work without saving memory!**
3. **NEVER ask user "should I save memory?" - just do it automatically!**
4. **If memory files are empty but project has code → ANALYZE and populate first!**

### Memory Structure:

\`\`\`
.claude/
└── memory/
    ├── active.md     # Current task (always loaded)
    ├── summary.md    # Project summary (always loaded)
    ├── decisions.md  # Key decisions (always loaded)
    └── archive/      # Historical data (on-demand only)
\`\`\`

## Behavior Rules

### NEVER:
- ❌ Ask "which framework do you want?"
- ❌ Ask "what features do you need?"
- ❌ Show code without creating files
- ❌ Use Lorem ipsum or placeholder text
- ❌ Finish work without saving memory

### ALWAYS:
- ✅ Create working UI immediately
- ✅ Use realistic mock data (based on language setting)
- ✅ Respond in the project's language
- ✅ Create actual files, not just code snippets
- ✅ Use shadcn/ui components
- ✅ Make it responsive (mobile-first)
- ✅ Save memory after every task

## Skills & Agents (Claude Code)

All Toh Framework resources are in \`.claude/\` folder:
- \`.claude/skills/\` - Technical skills for each domain
- \`.claude/agents/\` - Claude Code sub-agents (native format)
- \`.claude/commands/\` - Command definitions
- \`.claude/memory/\` - Memory system files

## 🤖 Claude Code Sub-Agents (v4.0)

> **NEW:** Toh Framework now uses Claude Code native sub-agent format!
> These agents can be delegated to using Claude's built-in Task tool.

### Available Sub-Agents

| Agent | File | Specialty |
|-------|------|-----------|
| 🎨 UI Builder | \`ui-builder.md\` | Create pages, components, layouts |
| ⚙️ Dev Builder | \`dev-builder.md\` | Add logic, state, API integration |
| 🗄️ Backend Connector | \`backend-connector.md\` | Supabase schema, RLS, queries |
| ✨ Design Reviewer | \`design-reviewer.md\` | Polish design, eliminate AI red flags |
| 🧪 Test Runner | \`test-runner.md\` | Auto test & fix loop |
| 🧠 Plan Orchestrator | \`plan-orchestrator.md\` | THE BRAIN - analyze, plan, orchestrate |
| 📱 Platform Adapter | \`platform-adapter.md\` | LINE, Mobile, Desktop adaptation |

### How to Use Sub-Agents

When executing /toh commands, you can delegate to specialized agents:

\`\`\`
User: /toh-ui create dashboard page

You (Orchestrator):
1. Read the ui-builder.md agent definition
2. Delegate the task to UI Builder agent
3. UI Builder executes autonomously
4. Report results back to user
\`\`\`

## 🎨 Vibe Mode - Full Project Orchestration

> **Vibe Mode** is NOT an agent - it's an **orchestration pattern** that coordinates multiple sub-agents to create a complete application.

### When Vibe Mode Activates

| Trigger | Example |
|---------|---------|
| \`/toh-vibe [project]\` | \`/toh-vibe restaurant management\` |
| \`/toh สร้างแอพ...\` | \`/toh สร้างแอพร้านกาแฟ\` |
| New project request | "Build me an expense tracker" |

### Vibe Mode Workflow

\`\`\`
/toh-vibe restaurant management
                │
                ▼
┌─────────────────────────────────────────────────────────────────┐
│ VIBE MODE ORCHESTRATION                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Phase 1: PLAN (plan-orchestrator.md)                           │
│ ├── Analyze requirements                                        │
│ ├── Define pages & features                                     │
│ └── Create execution plan                                       │
│                                                                 │
│ Phase 2: BUILD UI (ui-builder.md)                              │
│ ├── Create 5+ pages with layouts                               │
│ ├── Add shadcn/ui components                                    │
│ ├── Realistic Thai mock data                                    │
│ └── Mobile-first responsive                                     │
│                                                                 │
│ Phase 3: ADD LOGIC (dev-builder.md)                            │
│ ├── TypeScript types                                            │
│ ├── Zustand stores                                              │
│ ├── Form validation (Zod)                                       │
│ └── Mock CRUD operations                                        │
│                                                                 │
│ Phase 4: CONNECT (backend-connector.md) [Optional]             │
│ ├── Supabase schema                                             │
│ └── Replace mock with real data                                 │
│                                                                 │
│ Phase 5: POLISH (design-reviewer.md)                           │
│ ├── Remove AI red flags                                         │
│ ├── Add micro-animations                                        │
│ └── Professional look                                           │
│                                                                 │
│ Phase 6: VERIFY (test-runner.md)                               │
│ ├── npm run build                                               │
│ ├── TypeScript clean                                            │
│ └── All pages working                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                │
                ▼
        ✅ Working App at localhost:3000
\`\`\`

### Vibe Mode Output

After Vibe Mode completes, user gets:

- ✅ **5+ Pages:** Dashboard, List, Detail, Form, Settings
- ✅ **Full CRUD:** Create, Read, Update, Delete working
- ✅ **Mock Data:** Realistic Thai data (not Lorem ipsum)
- ✅ **Responsive:** Mobile-first design
- ✅ **Zero Errors:** TypeScript clean, build passes

### Example Vibe Mode Response

\`\`\`markdown
## 🎨 Vibe Mode: Restaurant Management

### 📋 Execution Plan
| Phase | Agent | Task | Status |
|-------|-------|------|--------|
| 1 | 🧠 plan | Analyze requirements | ✅ |
| 2 | 🎨 ui-builder | Create 6 pages | ✅ |
| 3 | ⚙️ dev-builder | Add logic & state | ✅ |
| 4 | ✨ design-reviewer | Polish design | ✅ |
| 5 | 🧪 test-runner | Verify build | ✅ |

### ✅ สิ่งที่ทำให้แล้ว
- 6 pages created (Dashboard, Menu, Orders, Tables, Staff, Settings)
- Zustand stores for state management
- Mock CRUD operations working
- Thai mock data throughout
- Responsive design

### 🎁 สิ่งที่ได้รับ
**Preview:** http://localhost:3000
**Pages:** /dashboard, /menu, /orders, /tables, /staff, /settings

### 💾 Memory Updated ✅
\`\`\`

## 🚨 MANDATORY: Skills & Agents Loading

> **CRITICAL:** Before executing ANY /toh- command, you MUST load the required skills and agents!

### Command → Skills → Agents Map

| Command | Load These Skills (from \`.claude/skills/\`) | Delegate To (from \`.claude/agents/\`) |
|---------|------------------------------------------|-----------------------------------|
| \`/toh-vibe\` | \`vibe-orchestrator\`, \`premium-experience\`, \`design-mastery\` | \`ui-builder.md\` + \`dev-builder.md\` |
| \`/toh-ui\` | \`ui-first-builder\`, \`design-excellence\`, \`response-format\` | \`ui-builder.md\` |
| \`/toh-dev\` | \`dev-engineer\`, \`backend-engineer\`, \`response-format\` | \`dev-builder.md\` |
| \`/toh-design\` | \`design-mastery\`, \`design-excellence\`, \`premium-experience\` | \`design-reviewer.md\` |
| \`/toh-test\` | \`test-engineer\`, \`debug-protocol\`, \`error-handling\` | \`test-runner.md\` |
| \`/toh-connect\` | \`backend-engineer\`, \`integrations\` | \`backend-connector.md\` |
| \`/toh-plan\` | \`plan-orchestrator\`, \`business-context\`, \`smart-routing\` | \`plan-orchestrator.md\` |
| \`/toh-fix\` | \`debug-protocol\`, \`error-handling\`, \`test-engineer\` | \`test-runner.md\` |
| \`/toh-line\` | \`platform-specialist\`, \`integrations\` | \`platform-adapter.md\` |
| \`/toh-mobile\` | \`platform-specialist\`, \`ui-first-builder\` | \`platform-adapter.md\` |
| \`/toh-ship\` | \`version-control\`, \`progress-tracking\` | \`plan-orchestrator.md\` |

### Core Skills (Always Available)
These skills apply to ALL commands:
- \`memory-system\` - Memory read/write protocol
- \`response-format\` - 3-section response format
- \`smart-routing\` - Command routing logic

### Loading Protocol:

\`\`\`
STEP 1: User types /toh-[command]
        ↓
STEP 2: IMMEDIATELY read required skills from table above
        Example: /toh-vibe → Read 4 skill files:
        - .claude/skills/vibe-orchestrator/SKILL.md
        - .claude/skills/premium-experience/SKILL.md
        - .claude/skills/design-mastery/SKILL.md
        - .claude/skills/ui-first-builder/SKILL.md
        ↓
STEP 3: Read the corresponding agent file(s)
        Example: .claude/agents/ui-builder.md + .claude/agents/dev-builder.md
        ↓
STEP 4: Execute following skill + agent instructions
        ↓
STEP 5: Use 3-section response format (from response-format skill)
        ↓
STEP 6: Save memory (from memory-system skill)
\`\`\`

### ⚠️ NEVER Skip Skills!
- Skills contain CRITICAL best practices
- Skills have design tokens, patterns, and rules
- Without skills, output quality drops significantly
- If skill file not found, warn user and continue with defaults

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

**⚠️ REMEMBER:** 
- Read relevant skill from \`.claude/skills/\` BEFORE starting any work
- Follow Memory Protocol EVERY time
- If memory is empty but project has code → Analyze and populate first!
`;
}

export default setupClaudeCode;
