# 🧠 Memory System Skill

> Toh Framework Auto Memory - Zero Config, Seamless Context
> **CRITICAL:** Every Agent MUST use this Memory System!

---

## Overview

Automatic memory system that enables AI to maintain context throughout, requiring zero user effort.

### Key Principles
- ✅ **Zero Config** - No setup required
- ✅ **Auto Save** - Automatically saves after every task completion
- ✅ **Auto Load** - Automatically loads at session start
- ✅ **Low Token** - Uses only ~2,000 tokens
- ✅ **Selective Read** - Reads only essential files
- ✅ **IDE Agnostic** - Works with any IDE
- ✅ **Model Agnostic** - Portable across AI models

---

## ⚠️ ENFORCEMENT RULES

```
┌─────────────────────────────────────────────────────────────────┐
│  🚨 RULE 1: MUST READ before working                            │
│     - Never start work without reading Memory                   │
│     - Read only 3 main files (selective read)                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  🚨 RULE 2: MUST SAVE after completing work                     │
│     - Never finish without saving                               │
│     - Don't ask User → Do it automatically                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  🚨 RULE 3: Token Budget = ~2,000 tokens                        │
│     - active.md (~500) + summary.md (~1,000) + decisions (~500) │
│     - archive/ = on-demand only                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
.toh/
├── config.json              # Toh configuration
└── memory/
    ├── active.md            # 🔥 Current task (~500 tokens) - Always load
    ├── summary.md           # 📋 Project summary (~1,000 tokens) - Always load
    ├── decisions.md         # 🧠 Key decisions (~500 tokens) - Always load
    └── archive/             # 📦 Historical data - Load only when needed
        ├── 2024-11-27.md
        └── ...
```

---

## 🔄 Selective Read Protocol

### At Session Start (MANDATORY)

```
STEP 1: Check Memory
        ├── .toh/memory/ exists? → Continue reading
        └── Doesn't exist? → Create new

STEP 2: Selective Read (parallel)
        ├── Read active.md
        ├── Read summary.md
        └── Read decisions.md
        
        ⚠️ DO NOT read archive/ at this step!

STEP 3: Build Context
        ├── What is this project?
        ├── What are we working on?
        ├── What's been completed?
        └── What's next?

STEP 4: Acknowledge (brief message to User)
        "Memory loaded! Working on [X].
         Just completed [Y]. Ready to continue!"
```

### When to Read archive/?

```
✅ Read when:
   - User asks about past work
   - Need additional context
   - Debugging previously solved issues
   - User runs /toh-memory history

❌ Don't read when:
   - Normal work
   - Creating new features
   - Have sufficient context from 3 main files
```

---

## 💾 Auto-Save Protocol

### After Completing Work (MANDATORY)

```
STEP 1: Update active.md (always!)
        ├── Current Focus → Task just worked on
        ├── In Progress → What's done/pending
        └── Next Steps → What should be done next

STEP 2: Add to decisions.md (if decisions made)
        └── | Date | Decision | Reason |

STEP 3: Update summary.md (if feature complete)
        └── Completed Features: + [new feature]

STEP 4: Auto-Archive (if active.md > 50 lines)
        ├── Move to archive/YYYY-MM-DD.md
        └── Clear active.md

STEP 5: Confirm
        └── "✅ Memory saved"
```

---

## 📊 Token Budget

| File | Max Lines | Est. Tokens | Load When |
|------|-----------|-------------|-----------|
| active.md | 30 | ~500 | **Always** |
| summary.md | 60 | ~1,000 | **Always** |
| decisions.md | 30 | ~500 | **Always** |
| archive/ | Unlimited | varies | **On-demand** |
| **Total** | 120 | **~2,000** | - |

---

## 📝 File Templates

### active.md
```markdown
# 🔥 Active Task

## Current Focus
[Awaiting user instructions]

## In Progress
- (None yet)

## Next Steps
- Awaiting user instructions

---
*Last updated: YYYY-MM-DD*
```

### summary.md
```markdown
# 📋 Project Summary

## Project Overview
- Name: [Project Name]
- Tech Stack: Next.js 14, Tailwind, shadcn/ui, Zustand, Supabase

## Completed Features
- (None yet)

## Important Notes
- Using Toh Framework v1.2.x

---
*Last updated: YYYY-MM-DD*
```

### decisions.md
```markdown
# 🧠 Key Decisions

## Architecture Decisions
| Date | Decision | Reason |
|------|----------|--------|
| YYYY-MM-DD | Use Toh Framework | AI-Orchestration Driven Development |

---
*Last updated: YYYY-MM-DD*
```

---

## 🔗 Agent Integration

### Every Agent MUST:

```typescript
// Pseudo-code for all Agents

async function executeTask(userRequest) {
  // 1. 🚨 MANDATORY: Read Memory First
  const memory = await selectiveReadMemory()
  // Read only: active.md, summary.md, decisions.md
  
  // 2. Build Context
  const context = buildContext(memory)
  
  // 3. Do Work
  const result = await doWork(userRequest, context)
  
  // 4. 🚨 MANDATORY: Save Memory
  await saveMemory({
    active: updateActiveTask(result),
    decisions: extractDecisions(result),
    summary: updateSummaryIfFeatureComplete(result)
  })
  
  // 5. Report with Memory Status
  return report(result, "✅ Memory saved")
}
```

---

## ⚠️ Anti-Patterns

| ❌ Don't | ✅ Do This |
|----------|-----------|
| Read archive/ every time | Read only 3 main files |
| Forget to save memory | Save after every task |
| Ask User whether to save | Do it automatically |
| Write verbose content | Write concise 1-2 lines |
| Store sensitive data | Store only project context |

---

## 📌 Quick Reference

### Selective Read (Start)
```
Read in parallel:
- .toh/memory/active.md
- .toh/memory/summary.md
- .toh/memory/decisions.md
```

### Auto-Save (End)
```
Update:
1. active.md ← Always
2. decisions.md ← If any
3. summary.md ← If feature complete
```

### Acknowledge Format
```
"Memory loaded! 📚
Working on [project].
Just completed [last task].
Next up: [next step]"
```

### Save Confirm Format
```
"✅ Memory saved"
```
