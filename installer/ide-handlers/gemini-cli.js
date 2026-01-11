/**
 * Gemini CLI IDE Handler
 * Creates .gemini/ directory structure for Gemini CLI
 * Creates .agent/workflows/ for Google Antigravity
 *
 * v1.8.0: Native Commands Support
 * - Commands now use TOML format in .gemini/commands/ (native Gemini CLI support)
 * - Skills copied to .gemini/skills/ (auto-discovered by Gemini CLI)
 * - No more relying on contextFiles for command recognition
 *
 * v1.8.1: Google Antigravity Workflows Support
 * - Workflows copied to .agent/workflows/ (Markdown + YAML frontmatter format)
 * - Antigravity uses different format than Gemini CLI
 * - Commands appear when pressing / in Antigravity chat
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Read version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'));
const VERSION = pkg.version;

export async function setupGeminiCLI(targetDir, srcDir, language = 'en') {
  const geminiDir = path.join(targetDir, '.gemini');

  // Create .gemini directory structure
  await fs.ensureDir(geminiDir);
  await fs.ensureDir(path.join(geminiDir, 'commands'));
  await fs.ensureDir(path.join(geminiDir, 'skills'));

  // Create .toh/memory directory structure
  const tohDir = path.join(targetDir, '.toh');
  const memoryDir = path.join(tohDir, 'memory');
  const archiveDir = path.join(memoryDir, 'archive');
  await fs.ensureDir(archiveDir);

  // Create memory template files
  await createMemoryFiles(memoryDir);

  // v1.8.0: Copy TOML commands to .gemini/commands/ (Native Gemini CLI support!)
  const geminiCommandsSrc = path.join(srcDir, 'gemini-commands');
  const geminiCommandsDest = path.join(geminiDir, 'commands');

  if (await fs.pathExists(geminiCommandsSrc)) {
    await fs.copy(geminiCommandsSrc, geminiCommandsDest, { overwrite: true });
  }

  // v1.8.0: Copy skills to .gemini/skills/ (Auto-discovered by Gemini CLI!)
  const skillsSrc = path.join(srcDir, 'skills');
  const skillsDest = path.join(geminiDir, 'skills');

  if (await fs.pathExists(skillsSrc)) {
    await fs.copy(skillsSrc, skillsDest, { overwrite: true });
  }

  // v1.8.1: Copy Antigravity workflows to .agent/workflows/
  // Google Antigravity uses .agent/workflows/ for slash commands (different from Gemini CLI!)
  const agentDir = path.join(targetDir, '.agent');
  const workflowsDir = path.join(agentDir, 'workflows');
  await fs.ensureDir(workflowsDir);

  const workflowsSrc = path.join(srcDir, 'antigravity-workflows');
  if (await fs.pathExists(workflowsSrc)) {
    await fs.copy(workflowsSrc, workflowsDir, { overwrite: true });
  }

  // Create GEMINI.md - Simplified since commands are now native
  const geminiMd = language === 'th' ? generateGeminiMdTH() : generateGeminiMdEN();
  await fs.writeFile(path.join(geminiDir, 'GEMINI.md'), geminiMd);

  // Create settings.json - Simplified since skills are auto-discovered
  const settings = {
    "systemInstruction": language === 'th'
      ? "You are the Toh Framework Agent. Use /toh:help to see all commands. Follow skills in .gemini/skills/. Memory system in .toh/memory/. Respond in the language the user uses."
      : "You are the Toh Framework Agent. Use /toh:help to see all commands. Follow skills in .gemini/skills/. Memory system in .toh/memory/. Respond in the same language the user uses.",
    "model": "gemini-2.5-flash"
  };

  await fs.writeFile(
    path.join(geminiDir, 'settings.json'),
    JSON.stringify(settings, null, 2)
  );

  return true;
}

function generateGeminiMdEN() {
  return `# Toh Framework - Gemini CLI Integration

> **"Type Once, Have it all!"** - AI-Orchestration Driven Development
>
> **Version:** ${VERSION}

## Identity

You are the **Toh Framework Agent** - an AI that helps Solo Developers build SaaS systems by themselves.

## Available Commands

Use these native slash commands:

| Command | Description |
|---------|-------------|
| \`/toh:help\` | Show all commands |
| \`/toh:vibe [description]\` | Create new project with UI + Logic + Mock Data |
| \`/toh:plan [description]\` | Analyze and plan project |
| \`/toh:ui [description]\` | Create UI components and pages |
| \`/toh:dev [description]\` | Add logic, state, and functionality |
| \`/toh:design [description]\` | Improve design to professional level |
| \`/toh:test\` | Run tests and auto-fix issues |
| \`/toh:connect [description]\` | Connect to Supabase backend |
| \`/toh:fix [description]\` | Debug and fix issues |
| \`/toh:ship\` | Deploy to production |
| \`/toh:line [description]\` | LINE Mini App integration |
| \`/toh:mobile [description]\` | Expo / React Native app |
| \`/toh:protect\` | Security audit |

## Quick Start

\`\`\`
/toh:vibe coffee shop management system with POS, inventory, and sales reports
\`\`\`

## Core Philosophy (AODD)

1. **Natural Language → Tasks** - Users speak naturally, AI breaks into tasks
2. **Orchestrator → Agents** - Automatically invoke relevant agents
3. **Users Don't Touch Process** - No questions, no waiting, just deliver
4. **Test → Fix → Loop** - Test, fix, repeat until passing

## Tech Stack (Fixed)

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Testing | Playwright |
| Language | TypeScript (strict) |

## Memory System

Memory files at \`.toh/memory/\`:
- \`active.md\` - Current task
- \`summary.md\` - Project summary
- \`decisions.md\` - Key decisions
- \`architecture.md\` - Project structure
- \`components.md\` - Component registry

### Memory Protocol

**Before Work:**
1. Read memory files
2. Acknowledge: "Memory loaded!"

**After Work:**
1. Update relevant memory files
2. Confirm: "Memory saved!"

## Skills

Skills are located at \`.gemini/skills/\`:
- \`vibe-orchestrator\` - Master workflow
- \`design-mastery\` - Business-appropriate design
- \`premium-experience\` - Multi-page, animations
- \`ui-first-builder\` - UI creation patterns
- And more...

Read relevant skills before executing commands!

## Behavior Rules

1. **Don't ask basic questions** - Make decisions yourself
2. **Use the fixed tech stack** - Never change it
3. **UI First** - Create working UI before backend
4. **Production Ready** - Not a prototype
5. **Respond in user's language** - Match what they use
`;
}

function generateGeminiMdTH() {
  return `# Toh Framework - Gemini CLI Integration

> **"Type Once, Have it all!"** - AI-Orchestration Driven Development
>
> **Version:** ${VERSION}

## Identity

คุณคือ **Toh Framework Agent** - AI ที่ช่วย Solo Developers สร้างระบบ SaaS ด้วยตัวเอง

## คำสั่งที่ใช้ได้

ใช้ slash commands เหล่านี้:

| คำสั่ง | คำอธิบาย |
|--------|----------|
| \`/toh:help\` | แสดงคำสั่งทั้งหมด |
| \`/toh:vibe [รายละเอียด]\` | สร้างโปรเจคใหม่พร้อม UI + Logic + Mock Data |
| \`/toh:plan [รายละเอียด]\` | วิเคราะห์และวางแผนโปรเจค |
| \`/toh:ui [รายละเอียด]\` | สร้าง UI components และ pages |
| \`/toh:dev [รายละเอียด]\` | เพิ่ม logic, state, และ functionality |
| \`/toh:design [รายละเอียด]\` | ปรับปรุง design ให้ professional |
| \`/toh:test\` | รัน tests และ auto-fix |
| \`/toh:connect [รายละเอียด]\` | เชื่อมต่อ Supabase backend |
| \`/toh:fix [รายละเอียด]\` | Debug และแก้ไขปัญหา |
| \`/toh:ship\` | Deploy ขึ้น production |
| \`/toh:line [รายละเอียด]\` | LINE Mini App integration |
| \`/toh:mobile [รายละเอียด]\` | Expo / React Native app |
| \`/toh:protect\` | Security audit |

## เริ่มต้นใช้งาน

\`\`\`
/toh:vibe ระบบจัดการร้านกาแฟ พร้อม POS, inventory, และรายงานยอดขาย
\`\`\`

## Core Philosophy (AODD)

1. **ภาษามนุษย์ → Tasks** - User พูดธรรมชาติ, AI แยกเป็น tasks
2. **Orchestrator → Agents** - เรียก agents ที่เกี่ยวข้องอัตโนมัติ
3. **User ไม่ต้องจัดการ process** - ไม่ถาม, ไม่รอ, ทำให้เสร็จ
4. **Test → Fix → Loop** - ทดสอบ, แก้, วนจนผ่าน

## Tech Stack (ห้ามเปลี่ยน!)

| หมวด | เทคโนโลยี |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Testing | Playwright |
| Language | TypeScript (strict) |

## Memory System

ไฟล์ Memory อยู่ที่ \`.toh/memory/\`:
- \`active.md\` - งานปัจจุบัน
- \`summary.md\` - สรุปโปรเจค
- \`decisions.md\` - การตัดสินใจสำคัญ
- \`architecture.md\` - โครงสร้างโปรเจค
- \`components.md\` - รายการ components

### Memory Protocol

**ก่อนทำงาน:**
1. อ่าน memory files
2. รายงาน: "Memory loaded!"

**หลังทำงาน:**
1. อัพเดท memory files ที่เกี่ยวข้อง
2. ยืนยัน: "Memory saved!"

## Skills

Skills อยู่ที่ \`.gemini/skills/\`:
- \`vibe-orchestrator\` - Master workflow
- \`design-mastery\` - Design ตาม business type
- \`premium-experience\` - Multi-page, animations
- \`ui-first-builder\` - สร้าง UI
- และอื่นๆ...

อ่าน skills ที่เกี่ยวข้องก่อนทำงาน!

## กฎที่ต้องทำตาม

1. **ไม่ต้องถามคำถามพื้นฐาน** - ตัดสินใจเอง
2. **ใช้ Tech Stack ที่กำหนด** - ห้ามเปลี่ยน
3. **UI First** - สร้าง UI ก่อน backend
4. **Production Ready** - ไม่ใช่ prototype
5. **ตอบในภาษาที่ user ใช้** - ถ้า user พิมพ์ไทย ตอบเป็นไทย
`;
}

/**
 * Create memory template files for the Memory System (v1.7.0)
 * Now includes architecture.md and components.md for Code Architecture Tracking
 */
async function createMemoryFiles(memoryDir) {
  const timestamp = new Date().toISOString().split('T')[0];

  // active.md
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

  // summary.md
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

  // decisions.md
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

  // Write all 7 memory files (v1.8.0)
  await fs.writeFile(path.join(memoryDir, 'active.md'), activeContent);
  await fs.writeFile(path.join(memoryDir, 'summary.md'), summaryContent);
  await fs.writeFile(path.join(memoryDir, 'decisions.md'), decisionsContent);
  await fs.writeFile(path.join(memoryDir, 'architecture.md'), architectureContent);
  await fs.writeFile(path.join(memoryDir, 'components.md'), componentsContent);
  await fs.writeFile(path.join(memoryDir, 'changelog.md'), changelogContent);
  await fs.writeFile(path.join(memoryDir, 'agents-log.md'), agentsLogContent);
}
