/**
 * Claude Code IDE Handler
 * Sets up Toh Framework for Claude Code
 */

import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import { join } from 'path';

export async function setupClaudeCode(targetDir, language = 'en') {
  const spinner = ora('Configuring Claude Code...').start();
  
  try {
    // Create .claude directory structure
    const claudeDir = join(targetDir, '.claude');
    await fs.ensureDir(join(claudeDir, 'skills'));
    await fs.ensureDir(join(claudeDir, 'agents'));
    await fs.ensureDir(join(claudeDir, 'commands'));

    // Create .toh/memory directory structure (v1.1.0 - Memory System)
    const tohDir = join(targetDir, '.toh');
    const memoryDir = join(tohDir, 'memory');
    const archiveDir = join(memoryDir, 'archive');
    await fs.ensureDir(archiveDir);

    // Create memory template files (always English)
    await createMemoryFiles(memoryDir);

    // Create CLAUDE.md with Toh Framework rules
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
- Using Toh Framework v1.2.x
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

  // Write files
  await fs.writeFile(join(memoryDir, 'active.md'), activeContent);
  await fs.writeFile(join(memoryDir, 'summary.md'), summaryContent);
  await fs.writeFile(join(memoryDir, 'decisions.md'), decisionsContent);
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
- **ALWAYS respond in Thai (ภาษาไทย)**
- Be friendly and use polite particles (ครับ/ค่ะ)
- You can use Thai expressions naturally

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
- **ALWAYS respond in English**
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
| \`/toh:help\` | \`/toh:h\`, \`toh help\`, \`toh h\` | Show all commands |
| \`/toh:plan\` | \`/toh:p\`, \`toh plan\`, \`toh p\` | **THE BRAIN** - Analyze, plan, orchestrate |
| \`/toh:vibe\` | \`/toh:v\`, \`toh vibe\`, \`toh v\` | Create new project |
| \`/toh:ui\` | \`/toh:u\`, \`toh ui\`, \`toh u\` | Create UI components |
| \`/toh:dev\` | \`/toh:d\`, \`toh dev\`, \`toh d\` | Add logic & state |
| \`/toh:design\` | \`/toh:ds\`, \`toh design\`, \`toh ds\` | Improve design |
| \`/toh:test\` | \`/toh:t\`, \`toh test\`, \`toh t\` | Auto test & fix |
| \`/toh:connect\` | \`/toh:c\`, \`toh connect\`, \`toh c\` | Connect Supabase |
| \`/toh:line\` | \`/toh:l\`, \`toh line\`, \`toh l\` | LINE Mini App |
| \`/toh:mobile\` | \`/toh:m\`, \`toh mobile\`, \`toh m\` | Expo / React Native |
| \`/toh:fix\` | \`/toh:f\`, \`toh fix\`, \`toh f\` | Fix bugs |
| \`/toh:ship\` | \`/toh:s\`, \`toh ship\`, \`toh s\` | Deploy to production |

### ⚡ Execution Rules:

1. **Instant Recognition** - When you see \`/toh:\` or \`toh \` prefix, this is a COMMAND
2. **Check for Description** - Does the command have a description after it?
   - ✅ **Has description** → Execute immediately (e.g., \`/toh:v restaurant management\`)
   - ❓ **No description** → Ask user first: "I'm the [Agent Name] agent. What would you like me to help you with?"
3. **No Confirmation for Described Commands** - If description exists, execute without asking
4. **Read Command File First** - Load \`.claude/commands/toh-[command].md\` for full instructions
5. **Follow Memory Protocol** - Always read/write memory before/after execution

### Command Without Description Behavior:

When user types ONLY the command (no description), respond with a friendly prompt:

| Command Only | Response |
|-------------|----------|
| \`/toh:vibe\` | "I'm the **Vibe Agent** 🎨 - I create new projects with UI + Logic + Mock Data. What system would you like me to build?" |
| \`/toh:ui\` | "I'm the **UI Agent** 🖼️ - I create pages, components, and layouts. What UI would you like me to create?" |
| \`/toh:dev\` | "I'm the **Dev Agent** ⚙️ - I add logic, state management, and forms. What functionality should I implement?" |
| \`/toh:design\` | "I'm the **Design Agent** ✨ - I improve visual design to look professional. What should I polish?" |
| \`/toh:test\` | "I'm the **Test Agent** 🧪 - I run tests and auto-fix issues. What should I test?" |
| \`/toh:connect\` | "I'm the **Connect Agent** 🔌 - I integrate with Supabase backend. What should I connect?" |
| \`/toh:plan\` | "I'm the **Plan Agent** 🧠 - I analyze requirements and orchestrate all agents. What project should I plan?" |
| \`/toh:fix\` | "I'm the **Fix Agent** 🔧 - I debug and fix issues. What problem should I solve?" |
| \`/toh:line\` | "I'm the **LINE Agent** 💚 - I integrate LINE Mini App features. What LINE feature do you need?" |
| \`/toh:mobile\` | "I'm the **Mobile Agent** 📱 - I create Expo/React Native apps. What mobile feature should I build?" |
| \`/toh:ship\` | "I'm the **Ship Agent** 🚀 - I deploy to production. Where should I deploy?" |
| \`/toh:help\` | (Always show help immediately - no description needed) |

### Examples:

\`\`\`
User: /toh:v restaurant management
→ Execute /toh:vibe command with "restaurant management" as description

User: toh ui dashboard
→ Execute /toh:ui command to create dashboard UI

User: /toh:p create an e-commerce platform
→ Execute /toh:plan command to analyze and plan the project
\`\`\`

## 🚨 MANDATORY: Memory Protocol

> **CRITICAL:** You MUST follow this protocol EVERY time. No exceptions!

### BEFORE Starting ANY Work:

\`\`\`
STEP 1: Check .toh/memory/ folder
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
        ├── .toh/memory/active.md     (~500 tokens)
        ├── .toh/memory/summary.md    (~1,000 tokens)
        └── .toh/memory/decisions.md  (~500 tokens)
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
.toh/
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

## Skills & Agents

Skills and Agents are located in:
- \`.claude/skills/\` - Technical skills for each domain
- \`.claude/agents/\` - Specialized AI agents
- \`.claude/commands/\` - Command definitions

**⚠️ REMEMBER:** 
- Read relevant skill BEFORE starting any work
- Follow Memory Protocol EVERY time
- If memory is empty but project has code → Analyze and populate first!
`;
}

export default setupClaudeCode;
