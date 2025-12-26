# 🧠 Memory System Skill

> Toh Framework Auto Memory - Zero Config, Seamless Context
> **CRITICAL:** Every Agent MUST use this Memory System!

---

## Overview

Automatic memory system that enables AI to maintain context throughout, requiring zero user effort. Includes **Architecture Tracking** for understanding project structure without scanning codebase every time.

### Key Principles
- ✅ **Zero Config** - No setup required
- ✅ **Auto Save** - Automatically saves after every task completion
- ✅ **Auto Load** - Automatically loads at session start
- ✅ **Low Token** - Uses only ~3,000 tokens
- ✅ **Selective Read** - Reads only essential files
- ✅ **IDE Agnostic** - Works with any IDE
- ✅ **Model Agnostic** - Portable across AI models
- ✅ **Architecture Aware** - Understands project structure instantly

---

## ⚠️ ENFORCEMENT RULES

```
┌─────────────────────────────────────────────────────────────────┐
│  🚨 RULE 1: MUST READ before working                            │
│     - Never start work without reading Memory + Architecture    │
│     - Read 5 main files (selective read)                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  🚨 RULE 2: MUST SAVE after completing work                     │
│     - Never finish without saving                               │
│     - Don't ask User → Do it automatically                      │
│     - Update architecture/components if structure changed!      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  🚨 RULE 3: Token Budget = ~3,000 tokens                        │
│     - active.md (~500) + summary.md (~1,000) + decisions (~500) │
│     - architecture.md (~500) + components.md (~500)             │
│     - archive/ = on-demand only                                 │
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
    ├── architecture.md      # 🏗️ Project structure (~500 tokens) - Always load
    ├── components.md        # 📦 Component registry (~500 tokens) - Always load
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

STEP 2: Selective Read (parallel - 5 files)
        ├── Read active.md       → Current task
        ├── Read summary.md      → Project overview
        ├── Read decisions.md    → Past decisions
        ├── Read architecture.md → Project structure
        └── Read components.md   → Component registry

        ⚠️ DO NOT read archive/ at this step!

STEP 3: Build Context
        ├── What is this project?
        ├── What are we working on?
        ├── What's been completed?
        ├── What's the project structure?  ← NEW
        ├── What components exist?          ← NEW
        └── What's next?

STEP 4: Acknowledge (brief message to User)
        "Memory + Architecture loaded! 📚
         Working on [X]. Structure: [pages/components count].
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

STEP 4: Update architecture.md (if structure changed)
        ├── New page/route added → Update Entry Points
        ├── New module/folder created → Update Core Modules
        ├── New service integrated → Update External Services
        └── Data flow changed → Update Data Flow Pattern

STEP 5: Update components.md (if components changed)
        ├── New page created → Add to Pages table
        ├── New component created → Add to Components table
        ├── New hook created → Add to Hooks table
        ├── New store created → Add to Stores table
        ├── New utility created → Add to Utils table
        └── Update Component Statistics count

STEP 6: Auto-Archive (if active.md > 50 lines)
        ├── Move to archive/YYYY-MM-DD.md
        └── Clear active.md

STEP 7: Confirm
        └── "✅ Memory + Architecture saved"
```

### When to Update architecture.md?

```
✅ Update when:
   - Created new page/route (app/**/page.tsx)
   - Created new folder/module
   - Changed data flow pattern
   - Added external service (Stripe, LINE, etc.)
   - Changed design system

❌ Don't update when:
   - Small code changes within existing files
   - Bug fixes
   - Styling changes
```

### When to Update components.md?

```text
✅ Update when:
   - Created new component (components/**)
   - Created new hook (hooks/**)
   - Created new store (stores/**)
   - Created new utility function (lib/**)
   - Created new type/interface (types/**)
   - Component props changed significantly

❌ Don't update when:
   - Small changes within component
   - Styling only changes
   - Bug fixes in existing code
```

---

## 📊 Token Budget

| File | Max Lines | Est. Tokens | Load When |
|------|-----------|-------------|-----------|
| active.md | 30 | ~500 | **Always** |
| summary.md | 60 | ~1,000 | **Always** |
| decisions.md | 30 | ~500 | **Always** |
| architecture.md | 40 | ~500 | **Always** |
| components.md | 50 | ~500 | **Always** |
| archive/ | Unlimited | varies | **On-demand** |
| **Total** | 210 | **~3,000** | - |

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

### architecture.md
```markdown
# 🏗️ Project Architecture

## 📁 Entry Points
| Type | Path | Purpose |
|------|------|---------|
| Main | `app/page.tsx` | Landing/Home page |
| Layout | `app/layout.tsx` | Root layout |

## 🗂️ Core Modules
### `/app` - Pages & Routes
| Route | File | Description | Key Functions |
|-------|------|-------------|---------------|
| `/` | `app/page.tsx` | Landing page | - |

### `/components` - UI Components
| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `ui/` | shadcn/ui | button, card, input |

### `/lib` - Utilities
| File | Purpose | Key Functions |
|------|---------|---------------|
| `utils.ts` | Utilities | cn(), formatDate() |

## 🔄 Data Flow Pattern
User → Component → Zustand → API → Database

## 🔌 External Services
| Service | Purpose | Config |
|---------|---------|--------|
| Supabase | Backend | `lib/supabase/` |

---
*Last updated: YYYY-MM-DD*
```

### components.md
```markdown
# 📦 Component Registry

## 📄 Pages
| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Landing page |

## 🧩 Components
| Component | Location | Key Props | Used By |
|-----------|----------|-----------|---------|
| Button | `ui/button.tsx` | variant, size | Many |

## 🪝 Custom Hooks
| Hook | Location | Purpose |
|------|----------|---------|
| (none) | - | - |

## 🏪 Zustand Stores
| Store | Location | Key Actions |
|-------|----------|-------------|
| (none) | - | - |

## 🛠️ Utilities
| Function | Location | Purpose |
|----------|----------|---------|
| cn | `lib/utils.ts` | Class merge |

## 📊 Statistics
| Category | Count |
|----------|-------|
| Pages | 0 |
| Components | 0 |
| Hooks | 0 |

---
*Last updated: YYYY-MM-DD*
```

---

## 🔗 Agent Integration

### Every Agent MUST:

```typescript
// Pseudo-code for all Agents

async function executeTask(userRequest) {
  // 1. 🚨 MANDATORY: Read Memory + Architecture First
  const memory = await selectiveReadMemory()
  // Read: active.md, summary.md, decisions.md, architecture.md, components.md

  // 2. Build Context
  const context = buildContext(memory)
  // Now AI knows: project structure, existing components, past decisions

  // 3. Do Work
  const result = await doWork(userRequest, context)

  // 4. 🚨 MANDATORY: Save Memory + Update Architecture
  await saveMemory({
    active: updateActiveTask(result),
    decisions: extractDecisions(result),
    summary: updateSummaryIfFeatureComplete(result),
    architecture: updateIfStructureChanged(result),    // NEW
    components: updateIfComponentsChanged(result)      // NEW
  })

  // 5. Report with Memory Status
  return report(result, "✅ Memory + Architecture saved")
}
```

---

## ⚠️ Anti-Patterns

| ❌ Don't | ✅ Do This |
|----------|-----------|
| Read archive/ every time | Read only 5 main files |
| Forget to save memory | Save after every task |
| Ask User whether to save | Do it automatically |
| Write verbose content | Write concise 1-2 lines |
| Store sensitive data | Store only project context |
| Skip architecture update | Update when structure changes |
| Forget component registry | Add new components to registry |
| Scan codebase every time | Use architecture.md + components.md |

---

## 📌 Quick Reference

### Selective Read (Start)

```text
Read in parallel (5 files):
- .toh/memory/active.md        → Current task
- .toh/memory/summary.md       → Project overview
- .toh/memory/decisions.md     → Past decisions
- .toh/memory/architecture.md  → Project structure
- .toh/memory/components.md    → Component registry
```

### Auto-Save (End)

```text
Update:
1. active.md       ← Always
2. decisions.md    ← If decisions made
3. summary.md      ← If feature complete
4. architecture.md ← If structure changed
5. components.md   ← If components changed
```

### Acknowledge Format

```text
"Memory + Architecture loaded! 📚
Working on [project]. [X pages, Y components].
Just completed [last task].
Next up: [next step]"
```

### Save Confirm Format

```text
"✅ Memory + Architecture saved"
```
