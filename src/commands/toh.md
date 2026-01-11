# /toh - Smart Orchestrator v4.1

> **Version:** 4.1.0
> **Command:** `/toh [anything]`
> **Philosophy:** Intelligent Multi-Agent Orchestration with Full Visibility

---

## 🎯 Core Concept

**Type anything → AI plans intelligently → Multi-Agent execution → Premium result**

```
/toh สร้างแอพร้านกาแฟ
/toh เพิ่มหน้า dashboard พร้อม chart และเชื่อม database
/toh ทำให้หน้า settings สวยขึ้นและแก้ bug scroll
```

**Key Difference from v3.0:** 
- ✅ **Native Sub-Agent Delegation** - ใช้ Claude Code Task tool
- ✅ แสดง Agent ที่กำลังทำงานชัดเจน
- ✅ วางแผน Multi-Agent workflow อัจฉริยะ
- ✅ เห็น Orchestration flow ทุกครั้ง

---

## 🤖 Claude Code Sub-Agents (v4.0)

> **NEW:** ใช้ Claude Code native sub-agent format!
> Orchestrator สามารถ delegate งานไปยัง sub-agents ที่เชี่ยวชาญเฉพาะด้าน

### Available Sub-Agents

| ID | Agent | File | Specialty |
|----|-------|------|-----------|
| `ui` | 🎨 UI Builder | `ui-builder.md` | Pages, Components, Layouts |
| `dev` | ⚙️ Dev Builder | `dev-builder.md` | Logic, State, API Integration |
| `connect` | 🔌 Backend Connector | `backend-connector.md` | Supabase, Auth, Database |
| `design` | ✨ Design Reviewer | `design-reviewer.md` | Polish, Animation, UX |
| `test` | 🧪 Test Runner | `test-runner.md` | Testing, Auto-fix Loop |
| `plan` | 🧠 Plan Orchestrator | `plan-orchestrator.md` | Analysis, Planning, Coordination |
| `platform` | 📱 Platform Adapter | `platform-adapter.md` | LINE, Mobile, Desktop |

### Sub-Agent Delegation Protocol

```
When delegating to a sub-agent:

1. Read the agent definition from .claude/agents/[agent].md
2. Prepare task context:
   - Task description
   - Related files to read
   - Dependencies and constraints
3. Delegate using Claude's Task tool
4. Agent executes autonomously
5. Receive results and verify quality
6. Continue workflow or handoff to next agent
```

### Example Delegation

```markdown
## Delegating to UI Builder

Task: Create Dashboard Page
Context:
- Read existing components/ui/
- Use Design Profile: saas-dashboard
- Include StatsCard, SalesChart components

Agent: ui-builder.md
Expected Output: /app/dashboard/page.tsx

[Agent executes autonomously...]

Result: ✅ Dashboard page created
Files: /app/dashboard/page.tsx, /components/StatsCard.tsx
```

---

## 🧠 AODD Orchestration Engine v4.0

```
┌─────────────────────────────────────────────────────────────────┐
│                    /toh [user request]                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📋 PHASE 1: MEMORY & CONTEXT (7 Files)                         │
│  ├── Read .toh/memory/active.md (current task)                  │
│  ├── Read .toh/memory/summary.md (project overview)             │
│  ├── Read .toh/memory/decisions.md (past decisions)             │
│  ├── Read .toh/memory/changelog.md (session changes)            │
│  ├── Read .toh/memory/agents-log.md (agent activity)            │
│  ├── Read .toh/memory/architecture.md (project structure)       │
│  ├── Read .toh/memory/components.md (existing components)       │
│  └── Build full project context                                 │
│                                                                 │
│  🧠 PHASE 2: INTELLIGENT ANALYSIS                               │
│  ├── Decompose request into atomic tasks                        │
│  ├── Identify required capabilities per task                    │
│  ├── Map capabilities to Agent(s)                               │
│  └── Determine execution strategy (parallel/sequential/hybrid)  │
│                                                                 │
│  📊 PHASE 3: WORKFLOW PLANNING (MUST SHOW TO USER!)             │
│  ├── Create Task Breakdown with Agent assignments               │
│  ├── Define execution order & dependencies                      │
│  ├── Identify parallel opportunities                            │
│  └── Plan handoff points between agents                         │
│                                                                 │
│  🚀 PHASE 4: MULTI-AGENT EXECUTION                              │
│  ├── Execute tasks with status updates                          │
│  ├── Coordinate agent handoffs                                  │
│  ├── Verify each agent's output                                 │
│  └── Quality gate before next agent                             │
│                                                                 │
│  ✅ PHASE 5: DELIVERY & MEMORY                                  │
│  ├── Final verification (build, lint, test)                     │
│  ├── Comprehensive response with agent summary                  │
│  └── Update memory with full context                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Agent Selection Reasoning (MUST SHOW!)

Before executing, display analysis and agent selection reasoning:

```markdown
## 🔍 Analysis

**Request:** "{user_request}"

### 🧠 Capability Detection

| Detected Need | Capability | Best Agent | Confidence |
|---------------|------------|------------|------------|
| Create pages | UI Creation | 🎨 ui | 95% |
| Add charts | Data Visualization | 🎨 ui + ⚙️ dev | 90% |
| Connect database | Backend Integration | 🔌 connect | 95% |
| Polish look | Design Enhancement | ✨ design | 85% |

### 🎯 Agent Selection

| Agent | Why Selected | Tasks Assigned |
|-------|--------------|----------------|
| 🎨 UI Builder | Need new pages + components | Dashboard, Charts |
| ⚙️ Dev Builder | Need data logic + state | Chart data, hooks |
| 🔌 Backend | Database connection needed | Supabase setup |
| ✨ Design | Polish requested implicitly | Animations, UX |
| 🧪 Test | Always required | Build verification |

### 📋 Execution Strategy

**Pattern:** Full Stack (Hybrid)
**Reasoning:** UI + Dev can run parallel (no dependency), then Backend, Design, Test sequentially

```text
┌─────────────────────────────────────────┐
│ [Phase 1] 🎨 UI + ⚙️ Dev    ← PARALLEL  │
│ [Phase 2] 🔌 Backend        ← SEQUENTIAL│
│ [Phase 3] ✨ Design         ← SEQUENTIAL│
│ [Phase 4] 🧪 Test           ← FINAL     │
└─────────────────────────────────────────┘
```

**Proceeding with this plan...**
```

---

## 🤖 Agent Roster

> **Location:** `.claude/agents/` (Claude Code native format)

| Agent ID | File | Specialty | Delegates To |
|----------|------|-----------|--------------|
| `plan` | `plan-orchestrator.md` | Analyze, plan, divide tasks | All Agents |
| `ui` | `ui-builder.md` | Create UI, Pages, Components | dev, design |
| `dev` | `dev-builder.md` | Logic, State, API calls | ui, connect |
| `design` | `design-reviewer.md` | Visual polish, UX, Animation | ui |
| `test` | `test-runner.md` | Testing, bug finding, auto-fix | All Agents |
| `connect` | `backend-connector.md` | Supabase, Auth, Database | dev |
| `platform` | `platform-adapter.md` | LINE, Mobile, Desktop | ui, dev |

---

## 📊 Intelligent Task Decomposition

### Step 1: Break Down Request

```
User: "/toh เพิ่มหน้า dashboard แสดงยอดขาย พร้อม chart และเชื่อม Supabase"

Decomposition:
┌─────────────────────────────────────────────────────────────────┐
│ Task Breakdown                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Task 1: Create Dashboard Page UI                                │
│   → Capability: UI creation, Layout, Components                 │
│   → Agent: ui                                                   │
│                                                                 │
│ Task 2: Add Sales Chart Component                               │
│   → Capability: Data visualization, Chart library               │
│   → Agent: ui + dev (parallel)                                  │
│                                                                 │
│ Task 3: Connect to Supabase                                     │
│   → Capability: Database, API, Data fetching                    │
│   → Agent: connect                                              │
│   → Dependency: Task 1, 2                                       │
│                                                                 │
│ Task 4: Polish Design & Add Animations                          │
│   → Capability: Design system, Motion                           │
│   → Agent: design                                               │
│   → Dependency: Task 1, 2, 3                                    │
│                                                                 │
│ Task 5: Verify & Test                                           │
│   → Capability: Build verification, Error checking              │
│   → Agent: test                                                 │
│   → Dependency: All tasks                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Plan Execution Strategy

```
Execution Plan:
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Phase A (Parallel):                                            │
│  ┌─────────┐  ┌─────────┐                                       │
│  │   ui    │  │   dev   │  ← ทำพร้อมกัน                         │
│  │ (Task 1)│  │ (Task 2)│                                       │
│  └────┬────┘  └────┬────┘                                       │
│       │            │                                            │
│       └─────┬──────┘                                            │
│             ▼                                                   │
│  Phase B (Sequential):                                          │
│       ┌─────────┐                                               │
│       │ connect │  ← รอ Phase A เสร็จ                           │
│       │ (Task 3)│                                               │
│       └────┬────┘                                               │
│            ▼                                                    │
│  Phase C (Sequential):                                          │
│       ┌─────────┐                                               │
│       │ design  │  ← รอ Phase B เสร็จ                           │
│       │ (Task 4)│                                               │
│       └────┬────┘                                               │
│            ▼                                                    │
│  Phase D (Final):                                               │
│       ┌─────────┐                                               │
│       │  test   │  ← ตรวจสอบทุกอย่าง                            │
│       │ (Task 5)│                                               │
│       └─────────┘                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 MANDATORY: Workflow Display (MUST SHOW!)

**ทุกครั้งที่รับ `/toh` ต้องแสดง Workflow Plan ก่อนทำงาน:**

```markdown
## 🎯 Workflow Plan

**Request:** เพิ่มหน้า dashboard แสดงยอดขาย พร้อม chart และเชื่อม Supabase

### 📋 Task Breakdown

| # | Task | Agent | Status |
|---|------|-------|--------|
| 1 | Create Dashboard Page | 🎨 ui | ⏳ Pending |
| 2 | Add Sales Chart | 🎨 ui + ⚙️ dev | ⏳ Pending |
| 3 | Connect Supabase | 🔌 connect | ⏳ Pending |
| 4 | Polish Design | ✨ design | ⏳ Pending |
| 5 | Verify & Test | 🧪 test | ⏳ Pending |

### 🔄 Execution Flow

```
[ui + dev] ──parallel──▶ [connect] ──▶ [design] ──▶ [test]
   Task 1,2                Task 3       Task 4      Task 5
```

### ⏱️ Estimated: 5 tasks, ~3-5 minutes

---

**เริ่มทำงานเลยค่ะ!**
```

---

## 🚀 Agent Execution with Status Updates

**ระหว่างทำงาน ต้องแสดง Agent Status:**

```markdown
---
## 🤖 Agent Status

### Phase A: Parallel Execution
| Agent | Task | Status | Output |
|-------|------|--------|--------|
| 🎨 **ui** | Dashboard Page | ✅ Done | `/app/dashboard/page.tsx` |
| ⚙️ **dev** | Chart Logic | ✅ Done | `/components/SalesChart.tsx` |

**Handoff:** ui + dev → connect
**Quality Check:** ✅ No TypeScript errors

---

### Phase B: Backend Connection
| Agent | Task | Status | Output |
|-------|------|--------|--------|
| 🔌 **connect** | Supabase Setup | 🔄 Working... | - |
```

---

## 🔄 Agent Handoff Protocol

**เมื่อ Agent ส่งมอบงานต่อ:**

```markdown
---
## 🔄 Handoff: ui → design

**From:** 🎨 UI Builder
**To:** ✨ Design Reviewer

**Deliverables:**
- `/app/dashboard/page.tsx` - Dashboard layout complete
- `/components/SalesChart.tsx` - Chart component ready
- `/components/StatsCard.tsx` - Stats cards created

**Notes for Design Agent:**
- ใช้ Design Profile: saas-dashboard (Blue theme)
- ต้องการ animation บน StatsCard
- Chart ควรมี hover effect

**Design Agent รับงานแล้ว ✅**
---
```

---

## 📊 Multi-Agent Patterns

### Pattern 1: Simple Task (Single Agent)
```
User: "/toh แก้ bug ปุ่มไม่ทำงาน"

Workflow:
[fix] ──▶ [test]
  │         │
  └─ แก้ bug ─▶ ตรวจสอบ
```

### Pattern 2: UI + Logic (Parallel)
```
User: "/toh เพิ่มหน้า settings"

Workflow:
[ui] ──parallel──▶ [design] ──▶ [test]
[dev] ─────────────┘
```

### Pattern 3: Full Stack (Sequential + Parallel)
```
User: "/toh สร้างระบบ login ด้วย Supabase"

Workflow:
[plan] ──▶ [ui + dev] ──▶ [connect] ──▶ [design] ──▶ [test]
   │          │              │            │           │
วางแผน    UI+Logic      เชื่อม Auth    ปรับ Design   ทดสอบ
```

### Pattern 4: New Project (Full Orchestration)
```
User: "/toh สร้างแอพร้านกาแฟ"

Workflow:
[plan] ──▶ [ui] ──▶ [dev] ──▶ [connect] ──▶ [design] ──▶ [test]
   │         │        │           │            │           │
วิเคราะห์  5+ pages  Logic     Database    Animation   Build OK
```

---

## 📝 Response Format v4.0 (MANDATORY!)

**ทุก response ต้องมี Agent Summary:**

```markdown
## 🤖 Agent Execution Summary

| Phase | Agent(s) | Task | Status | Time |
|-------|----------|------|--------|------|
| A | 🎨 ui + ⚙️ dev | Dashboard + Chart | ✅ Done | 45s |
| B | 🔌 connect | Supabase Setup | ✅ Done | 30s |
| C | ✨ design | Polish & Animation | ✅ Done | 25s |
| D | 🧪 test | Build Verification | ✅ Pass | 10s |

**Total Agents Used:** 5
**Execution Mode:** Hybrid (Parallel + Sequential)
**Handoffs:** 3 (ui→design, dev→connect, design→test)

---

## ✅ สิ่งที่ทำให้แล้ว

**Files Created by Each Agent:**

🎨 **UI Builder:**
- `/app/dashboard/page.tsx`
- `/components/StatsCard.tsx`

⚙️ **Dev Builder:**
- `/components/SalesChart.tsx`
- `/lib/hooks/useSalesData.ts`

🔌 **Connect Agent:**
- `/lib/supabase/client.ts`
- `/lib/supabase/queries.ts`

✨ **Design Agent:**
- Updated animations in all components
- Applied saas-dashboard color scheme

🧪 **Test Agent:**
- `npm run build` ✅ Pass
- No TypeScript errors

---

## 🎁 สิ่งที่ได้รับ

- ✅ Dashboard page พร้อมใช้งาน
- ✅ Sales chart แสดงข้อมูลจริงจาก Supabase
- ✅ Animation ครบทุก component
- ✅ Responsive design
- ✅ Zero build errors

**Preview:** http://localhost:3000/dashboard

---

## 👉 Next Steps

ไม่ต้องทำอะไรค่ะ! ระบบพร้อมใช้งานแล้ว

**ถ้าต้องการต่อ:**
- `/toh เพิ่ม filter ช่วงวันที่` → ui + dev
- `/toh export เป็น PDF` → dev + design

---

## 💾 Memory Updated ✅
```

---

## 🎯 Capability-to-Agent Mapping

### UI Capabilities
| Capability | Primary Agent | Support Agent |
|------------|--------------|---------------|
| Create pages | ui | - |
| Create components | ui | dev |
| Create layouts | ui | design |
| Responsive design | ui | design |
| Form UI | ui | dev |

### Logic Capabilities
| Capability | Primary Agent | Support Agent |
|------------|--------------|---------------|
| State management | dev | - |
| API calls | dev | connect |
| Form validation | dev | - |
| Business logic | dev | - |
| Data transformation | dev | - |

### Backend Capabilities
| Capability | Primary Agent | Support Agent |
|------------|--------------|---------------|
| Database setup | connect | - |
| Authentication | connect | dev |
| API routes | connect | dev |
| RLS policies | connect | - |
| Storage | connect | - |

### Quality Capabilities
| Capability | Primary Agent | Support Agent |
|------------|--------------|---------------|
| Design polish | design | ui |
| Animation | design | ui |
| Bug fixing | fix | test |
| Testing | test | - |
| Build verification | test | - |

---

## 🔄 Claude Code Native Delegation

> **v4.0:** ใช้ Claude Code Task tool สำหรับ delegate งานไป sub-agents

### How Delegation Works

```
┌─────────────────────────────────────────────────────────────────┐
│ ORCHESTRATOR (Main Claude)                                      │
│                                                                 │
│  1. Receive /toh request                                        │
│  2. Analyze and plan workflow                                   │
│  3. For each task:                                              │
│     ┌─────────────────────────────────────────────────────────┐ │
│     │ DELEGATE to Sub-Agent:                                  │ │
│     │                                                         │ │
│     │ Read: .claude/agents/ui-builder.md                      │ │
│     │ Task: "Create Dashboard Page with StatsCard"            │ │
│     │ Context: existing files, design profile, constraints    │ │
│     │                                                         │ │
│     │ [Sub-Agent executes autonomously]                       │ │
│     │                                                         │ │
│     │ Result: files created, status report                    │ │
│     └─────────────────────────────────────────────────────────┘ │
│  4. Verify quality gate                                         │
│  5. Continue to next agent or handoff                          │
│  6. Final verification with test agent                         │
└─────────────────────────────────────────────────────────────────┘
```

### Delegation Template

When delegating to a sub-agent, provide:

```markdown
## 🤖 Delegating to [Agent Name]

**Agent File:** .claude/agents/[agent].md
**Task:** [Clear description of what to do]

**Context:**
- Files to read: [list of existing files]
- Dependencies: [what this task depends on]
- Constraints: [tech stack, design profile, etc.]

**Expected Output:**
- [list of files to create/modify]
- [expected behavior]

**Notes:**
- [any special instructions for this agent]
```

### Parallel Delegation

When tasks can run in parallel:

```markdown
## 🔀 Parallel Execution

**Running simultaneously:**
| Agent | Task | Status |
|-------|------|--------|
| 🎨 ui-builder | Dashboard Page | 🔄 Working |
| ⚙️ dev-builder | Chart Logic | 🔄 Working |

**Will merge results when both complete**
```

### Quality Gate Between Delegations

```markdown
## ✅ Quality Gate: ui → design

**Checking before handoff:**
- [ ] TypeScript errors: None ✅
- [ ] Build status: Pass ✅
- [ ] Files created: 3 ✅

**Ready to delegate to design-reviewer.md**
```

---

## 🧠 Intelligence Rules

### Rule 1: Always Show Workflow
```
❌ BAD: ทำงานเลยโดยไม่บอก
✅ GOOD: แสดง Workflow Plan → Agent Status → Results
```

### Rule 2: Parallel When Possible
```
❌ BAD: ui → dev → design (sequential ทั้งหมด)
✅ GOOD: [ui + dev] → design (parallel เมื่อไม่มี dependency)
```

### Rule 3: Quality Gate Between Phases
```
❌ BAD: ส่งต่อโดยไม่ตรวจ
✅ GOOD: ตรวจ TypeScript errors ก่อนส่งต่อ Agent ถัดไป
```

### Rule 4: Clear Handoff Communication
```
❌ BAD: เปลี่ยน Agent โดยไม่บอก
✅ GOOD: แสดง Handoff พร้อม deliverables และ notes
```

### Rule 5: End with Test Agent
```
❌ BAD: ส่งมอบงานโดยไม่ test
✅ GOOD: test agent ตรวจสอบ build ก่อนส่งมอบเสมอ
```

---

## 📌 Examples

### Example 1: Simple Fix
```
User: /toh แก้ปุ่ม submit ไม่ทำงาน

## 🎯 Workflow Plan
| # | Task | Agent | Status |
|---|------|-------|--------|
| 1 | Fix button handler | 🔧 fix | ⏳ |
| 2 | Verify fix | 🧪 test | ⏳ |

Flow: [fix] ──▶ [test]

---
(execute and show status updates)
---

## 🤖 Agent Execution Summary
| Agent | Task | Status |
|-------|------|--------|
| 🔧 fix | Button handler | ✅ Done |
| 🧪 test | Build check | ✅ Pass |
```

### Example 2: Complex Feature
```
User: /toh สร้างระบบ authentication ด้วย Supabase พร้อมหน้า login/register

## 🎯 Workflow Plan
| # | Task | Agent | Status |
|---|------|-------|--------|
| 1 | Create Login Page | 🎨 ui | ⏳ |
| 2 | Create Register Page | 🎨 ui | ⏳ |
| 3 | Add Form Validation | ⚙️ dev | ⏳ |
| 4 | Setup Supabase Auth | 🔌 connect | ⏳ |
| 5 | Polish Design | ✨ design | ⏳ |
| 6 | Test Auth Flow | 🧪 test | ⏳ |

Flow: [ui] ──▶ [dev] ──▶ [connect] ──▶ [design] ──▶ [test]

---
(execute with status updates and handoffs)
```

### Example 3: Full Project
```
User: /toh สร้างแอพจัดการ inventory สำหรับร้านค้า

## 🎯 Workflow Plan
| # | Task | Agent | Status |
|---|------|-------|--------|
| 1 | Analyze & Plan | 📋 plan | ⏳ |
| 2 | Create 5+ Pages | 🎨 ui | ⏳ |
| 3 | Add Business Logic | ⚙️ dev | ⏳ |
| 4 | Setup Database | 🔌 connect | ⏳ |
| 5 | Apply Design System | ✨ design | ⏳ |
| 6 | Final Verification | 🧪 test | ⏳ |

Flow: [plan] ──▶ [ui + dev] ──▶ [connect] ──▶ [design] ──▶ [test]

**Design Profile:** ecommerce (Emerald theme)
**Estimated Pages:** Dashboard, Products, Inventory, Orders, Settings, Login
```

---

## ⚠️ Critical Rules

1. **ALWAYS show Workflow Plan** - User must see which Agent does what
2. **ALWAYS show Agent Status** - Show who is doing what during execution
3. **ALWAYS show Handoffs** - Clearly announce when switching Agents
4. **ALWAYS end with test** - Every workflow ends with test agent
5. **Parallel when possible** - Run agents in parallel if no dependencies
6. **Quality gate** - Verify before handoff every time
7. **Memory protocol** - Read all 7 files before work, update relevant files after

---

## 📁 Memory Protocol (7 Files - MANDATORY)

### BEFORE Work

Read ALL 7 memory files:

```text
.toh/memory/
├── active.md      (current task)
├── summary.md     (project overview)
├── decisions.md   (past decisions)
├── changelog.md   (session changes)
├── agents-log.md  (agent activity)
├── architecture.md (project structure)
└── components.md  (existing components)
```

### AFTER Work

Update relevant files based on changes:

- Code changes → architecture.md + components.md
- Decisions made → decisions.md
- Task completion → active.md + changelog.md + agents-log.md

---

*Version 4.1.0 - Intelligent Multi-Agent Orchestration with Full Visibility*
