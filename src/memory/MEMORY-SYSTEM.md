# 🧠 Toh Framework - Smart Memory System

> Automatic Memory System that ensures AI never forgets work, even when changing Chat, IDE, or Model.

---

## 🎯 Why Memory System?

### Problems Solved
- ❌ Token limit reached → Context lost
- ❌ Change Chat → Have to explain everything again
- ❌ Switch IDE (Claude → Cursor) → Forget everything
- ❌ Switch Model → Context lost

### Solution
- ✅ Auto-save after every task completion
- ✅ Auto-load at every session start
- ✅ User doesn't have to do anything
- ✅ Works across all IDEs, all Models

---

## 📁 Memory Structure

```
.toh/
└── memory/
    ├── active.md          # 🔥 Current task (~500 tokens)
    ├── summary.md         # 📋 Project summary (~1,000 tokens)
    ├── decisions.md       # 🧠 Key decisions (~500 tokens)
    └── archive/           # 📦 Historical data (load on-demand)
        ├── 2024-11-27.md
        └── ...
```

### Total Context Load: ~2,000 tokens (only!)

---

## 📄 Memory Files

### 1. `active.md` - Current Task

```markdown
# 🔥 Active Task

## Current Focus
[What is being worked on right now]

## In Progress
- [ ] Task 1
- [ ] Task 2

## Just Completed
- [x] Recently completed task

## Next Steps
- What needs to be done next

## Blockers / Issues
- Problems encountered (if any)

---
*Last updated: [timestamp]*
```

### 2. `summary.md` - Project Summary

```markdown
# 📋 Project Summary

## Project Overview
- Name: [Project name]
- Type: [Type e.g. SaaS, E-commerce]
- Tech Stack: Next.js 14, Tailwind, shadcn/ui, Zustand, Supabase

## Completed Features
- ✅ Feature 1 - [Short description]
- ✅ Feature 2 - [Short description]

## Current State
[Current project status]

## Key Files
- `src/app/page.tsx` - Main page
- `src/stores/` - State management
- `src/components/` - UI Components

## Important Notes
- [Important things to remember]

---
*Last updated: [timestamp]*
```

### 3. `decisions.md` - Key Decisions

```markdown
# 🧠 Key Decisions

## Architecture Decisions
| Date | Decision | Reason |
|------|----------|--------|
| [date] | Use Toh Framework | AI-Orchestration Driven Development |

## Design Decisions
| Date | Decision | Reason |
|------|----------|--------|

## Technical Decisions
| Date | Decision | Reason |
|------|----------|--------|

---
*Last updated: [timestamp]*
```

---

## 🔄 Memory Protocol

### BEFORE Starting Any Work

```
STEP 1: Check .toh/memory/ folder
        ├── Folder doesn't exist? → Create it!
        └── Folder exists? → Continue to Step 2

STEP 2: Load these 3 files (MANDATORY)
        ├── .toh/memory/active.md
        ├── .toh/memory/summary.md
        └── .toh/memory/decisions.md

STEP 3: Check if files have real data
        ├── Files empty/default? → ANALYZE PROJECT FIRST!
        │   ├── Scan app/, components/, types/, stores/
        │   ├── Update summary.md with what exists
        │   └── Update active.md with current state
        └── Files have data? → Continue working

STEP 4: Acknowledge context loaded
        (Brief confirmation to user)
```

### AFTER Completing Any Work

```
STEP 1: Update active.md (ALWAYS!)
        ├── Current Focus → What was just done
        ├── In Progress → Mark completed items
        ├── Just Completed → Add what you finished
        └── Next Steps → What should be done next

STEP 2: Update decisions.md (if decisions were made)
        └── Add row: | Date | Decision | Reason |

STEP 3: Update summary.md (if feature completed)
        └── Add to Completed Features list

STEP 4: Confirm to user
        └── "Memory saved ✅"
```

---

## ⚠️ Critical Rules

1. **NEVER start work without loading memory first!**
2. **NEVER finish work without saving memory!**
3. **NEVER ask user "should I save memory?" - just do it automatically!**
4. **If memory files are empty but project has code → ANALYZE and populate first!**
5. **Memory files must ALWAYS be in English for consistency!**

---

## 🔧 Memory Commands

| Command | Action |
|---------|--------|
| `/toh-memory` | Show current memory status |
| `/toh-memory save` | Force save all memory files |
| `/toh-memory load` | Force reload all memory files |
| `/toh-memory clear` | Archive and reset memory |

---

## 💡 Best Practices

### For AI Agents
- Load memory at the START of every conversation
- Save memory at the END of every task
- Keep active.md focused (only current task)
- Archive old tasks when switching to new ones

### For Users
- Trust the system - it works automatically
- Check `.toh/memory/` if something seems wrong
- Use `/toh-memory` to see current state

---

## 📊 Token Budget

| File | Max Tokens | Purpose |
|------|------------|---------|
| active.md | ~500 | Current task details |
| summary.md | ~1,000 | Project overview |
| decisions.md | ~500 | Key decisions log |
| **Total** | **~2,000** | Fits easily in context |

---

## 🔗 Cross-IDE Compatibility

Memory system works identically across:
- ✅ Claude Code
- ✅ Cursor
- ✅ Gemini CLI / Google Antigravity
- ✅ Codex CLI

Same files, same format, same behavior!
