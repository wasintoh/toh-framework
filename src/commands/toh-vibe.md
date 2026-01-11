---
command: /toh-vibe
aliases: ["/toh-v"]
description: Create new project with UI + Logic + Mock Data in one command
trigger: /toh-vibe or /toh-v followed by app description
---

# /toh-vibe - Create New Project ✨

## 🎯 Philosophy

**"First Impression ต้อง WOW! - ชนะ Lovable ตั้งแต่แรก"**

เมื่อ user เห็น output ครั้งแรก ต้อง:
- ✅ สวย professional ไม่ดู "AI-looking" (Anti AI-pattern!)
- ✅ หลายหน้า (4-6 หน้า minimum) พร้อมใช้งานจริง
- ✅ Mock data realistic (ไม่ใช่ Lorem ipsum!)
- ✅ Design เหมาะกับประเภทธุรกิจ (ไม่ใช่ template เดียว)
- ✅ User รู้ทุกอย่างที่ต้องรู้ (Response Excellence!)

## Signature Command

```
/toh-vibe [app description]
/toh-v [app description]
```

## 🤖 Sub-Agent Orchestration (v4.1)

> **Vibe Mode** is an orchestration pattern that coordinates multiple sub-agents

### Sub-Agents Used

| Phase | Agent | File | Task |
|-------|-------|------|------|
| 1 | 🧠 Plan | `plan-orchestrator.md` | Analyze & plan |
| 2 | 🎨 UI | `ui-builder.md` | Create 5-7 pages |
| 3 | ⚙️ Dev | `dev-builder.md` | Add logic & state |
| 4 | ✨ Design | `design-reviewer.md` | Polish & animate |
| 5 | 🧪 Test | `test-runner.md` | Verify build |

### Skills Required

```yaml
skills:
  - design-mastery       # 🎨 Smart design ตาม business type
  - premium-experience   # 🌟 Multi-page, animations, WOW factor
  - business-context     # 💼 เข้าใจธุรกิจ
  - smart-suggestions    # 💡 แนะนำขั้นตอน
  - prompt-optimizer     # 🎯 สำหรับ AI SaaS projects
```

---

## 🔄 Workflow (Sub-Agent Orchestration)

### Phase 0: Memory Check (7 Files)

```text
0. 🚨 READ MEMORY (MANDATORY - ALL 7 FILES!)
   ├── .toh/memory/active.md      (current task)
   ├── .toh/memory/summary.md     (project overview)
   ├── .toh/memory/decisions.md   (past decisions)
   ├── .toh/memory/changelog.md   (session changes)
   ├── .toh/memory/agents-log.md  (agent activity)
   ├── .toh/memory/architecture.md (project structure)
   └── .toh/memory/components.md  (existing components)
```

### Phase 1: Plan (plan-orchestrator.md)

```
📋 DELEGATE TO: plan-orchestrator.md

Task: Analyze business requirements
├── Identify business type (E-commerce? SaaS? Restaurant?)
├── Define target audience (B2B? B2C? Gen Z?)
├── Select Design Pattern (see design-mastery skill)
├── Plan pages & features
└── Create execution roadmap

Output: Execution plan with page list & design decisions
```

### Phase 2: Build UI (ui-builder.md)

```
🎨 DELEGATE TO: ui-builder.md

Task: Create complete UI
├── Setup Next.js 14 project
├── Install shadcn/ui components
├── Create 5-7 pages (Dashboard, List, Detail, Form, Settings)
├── Apply business-appropriate design pattern
├── Add realistic Thai mock data
└── Ensure mobile-first responsive

Output: Working UI at localhost:3000
```

### Phase 3: Add Logic (dev-builder.md)

```
⚙️ DELEGATE TO: dev-builder.md

Task: Add application logic
├── Create TypeScript types (types/*.ts)
├── Setup Zustand stores (stores/*.ts)
├── Add form validation (Zod schemas)
├── Implement mock CRUD operations
└── Create utility functions

Output: Fully functional app with state management
```

### Phase 4: Polish Design (design-reviewer.md)

```
✨ DELEGATE TO: design-reviewer.md

Task: Polish to professional quality
├── Remove AI red flags (generic gradients, etc.)
├── Ensure color harmony
├── Add micro-animations
├── Check typography hierarchy
└── Verify spacing consistency

Output: Professional-looking app (no "AI-generated" feel)
```

### Phase 5: Verify (test-runner.md)

```
🧪 DELEGATE TO: test-runner.md

Task: Verify everything works
├── npm run build (MUST PASS!)
├── Fix any TypeScript errors
├── Check all pages load correctly
└── Verify CRUD operations work

Output: Build passes with zero errors
```

### Phase 6: Report & Save Memory (7 Files)

```text
📝 ORCHESTRATOR TASK (Not delegated)

├── Update memory files (all 7):
│   ├── active.md       - Current state & next steps
│   ├── summary.md      - Project overview
│   ├── decisions.md    - Design decisions made
│   ├── changelog.md    - What was created this session
│   ├── agents-log.md   - Agent activity log
│   ├── architecture.md - Project structure
│   └── components.md   - Components created
│
└── Report using Response Excellence format
```

---

## 📋 Execution Plan Display (MUST SHOW BEFORE WORK!)

Before starting any work, display the execution plan:

```markdown
## 📋 Execution Plan: [App Name]

**Business Type:** [E-commerce / SaaS / Restaurant / etc.]
**Design Pattern:** [Pattern A/B/C/D/E]

### 🔄 Agent Workflow

┌─────────────────────────────────────────────────────────────┐
│ [Phase 1] 🧠 Plan Orchestrator         ← ANALYZE           │
│ [Phase 2] 🎨 UI Builder                ← BUILD PAGES       │
│ [Phase 3] ⚙️ Dev Builder               ← ADD LOGIC         │
│ [Phase 4] ✨ Design Reviewer           ← POLISH            │
│ [Phase 5] 🧪 Test Runner               ← VERIFY            │
└─────────────────────────────────────────────────────────────┘

### 📄 Pages to Create

| # | Page | Route | Components |
|---|------|-------|------------|
| 1 | Dashboard | `/` | StatsCard, Chart |
| 2 | [Feature] List | `/[feature]` | Table, Filter |
| 3 | [Feature] Detail | `/[feature]/[id]` | Card, Actions |
| 4 | Create [Feature] | `/[feature]/new` | Form |
| 5 | Settings | `/settings` | Tabs, Form |
| 6 | Profile | `/profile` | Avatar, Form |

### ⏳ Estimated: 6 pages, 5 agents, ~5 minutes

**Starting execution...**
```

### During Execution (Status Updates)

Show agent progress during work:

```markdown
## 🤖 Agent Progress

| Phase | Agent | Task | Status |
|-------|-------|------|--------|
| 1 | 🧠 Plan | Business analysis | ✅ Done |
| 2 | 🎨 UI | Creating 6 pages | 🔄 Working (3/6)... |
| 3 | ⚙️ Dev | Add logic & state | ⏳ Pending |
| 4 | ✨ Design | Polish & animate | ⏳ Pending |
| 5 | 🧪 Test | Verify build | ⏳ Pending |

[🎨 UI Builder] Creating Settings page... ✅ Done
[🎨 UI Builder] Creating Profile page... 🔄 Working
```

---

## 🎨 Design Patterns by Business Type

### Pattern A: Modern SaaS (Dashboard apps)
```yaml
use_for:
  - Expense tracker
  - Project management
  - Analytics tools
  - Admin panels

design:
  colors:
    primary: "#6366F1"  # Indigo
    accent: "#8B5CF6"   # Purple
    background: "#F8FAFC"
    text: "#0F172A"
  
  layout:
    - Sidebar navigation (collapsible)
    - Top header with search
    - Card-based content
    - Data tables with actions
  
  components:
    - Stats cards with icons
    - Charts (line, bar, pie)
    - Tables with sorting
    - Modal forms
  
  animation: Moderate (hover, transitions)
```

### Pattern B: E-commerce (Shop apps)
```yaml
use_for:
  - Online stores
  - Product catalogs
  - Marketplace

design:
  colors:
    primary: "#2563EB"  # Trust blue
    accent: "#F59E0B"   # Action orange
    success: "#10B981"  # Buy green
    background: "#FAFAFA"
  
  layout:
    - Top navigation with cart
    - Category sidebar/tabs
    - Product grid (responsive)
    - Filter panel
  
  components:
    - Product cards (image, price, rating)
    - Cart icon with badge
    - Trust badges
    - Review stars
  
  animation: Purposeful (cart, add button)
```

### Pattern C: AI Chatbot / AI Tools
```yaml
use_for:
  - Chatbots
  - AI assistants
  - Chat apps
  - AI SaaS

design:
  colors:
    primary: "#14B8A6"  # Teal (friendly)
    accent: "#F472B6"   # Pink
    background: "#F0FDFA"
    text: "#134E4A"
  
  ⚠️ NOT: Purple-blue gradient! (ทุก AI ใช้!)
  
  layout:
    - Chat-centric (wide chat area)
    - History sidebar
    - Settings accessible
  
  components:
    - Chat bubbles (user vs bot)
    - Typing indicator
    - Copy button
    - Code blocks (if needed)
    - Quick actions
  
  animation: Smooth (typing, fade in)
```

### Pattern D: Food & Restaurant
```yaml
use_for:
  - Restaurant apps
  - Food delivery
  - Menu systems
  - F&B

design:
  colors:
    primary: "#DC2626"  # Appetizing red
    accent: "#F59E0B"   # Warm orange
    background: "#FEF2F2"
    text: "#1F2937"
  
  layout:
    - Hero with food imagery
    - Menu categories
    - Item cards with images
    - Cart sidebar
  
  components:
    - Menu item cards (large images!)
    - Category pills
    - Price display
    - Quantity selectors
  
  animation: Appetizing (subtle zoom on hover)
```

### Pattern E: Corporate / Enterprise
```yaml
use_for:
  - CRM
  - B2B tools
  - Enterprise software
  - Financial apps

design:
  colors:
    primary: "#1E40AF"  # Deep blue (trust)
    accent: "#0369A1"   # Secondary blue
    background: "#F8FAFC"
    text: "#1E293B"
  
  layout:
    - Professional sidebar
    - Dense information display
    - Multi-level navigation
    - Data-heavy tables
  
  components:
    - Data grids
    - Filters & search
    - Bulk actions
    - Status badges
  
  animation: Minimal (functional only)
```

---

## 📝 Output Format (MANDATORY - Response Excellence!)

```markdown
## ✅ สร้าง [App Name] เสร็จแล้วค่ะ!

### 🎯 สิ่งที่ทำ
- สร้าง Next.js 14 project: `[project-name]`
- วิเคราะห์ Business Type: **[Type]** → Design Pattern: **[Pattern Name]**
- สร้าง **6 หน้า** พร้อมใช้งาน
- เพิ่ม **15 mock data items** ที่ realistic
- ตั้งค่า Tailwind + shadcn/ui + Zustand

### 🎁 สิ่งที่คุณได้
- 🌐 **เว็บไซต์พร้อมใช้:** http://localhost:3000
- 📊 Dashboard พร้อม stats และ charts
- 📝 ฟอร์ม CRUD พร้อม validation
- 📱 Responsive ทุกขนาดหน้าจอ
- 🎨 Design แบบ **[Pattern Name]** (เหมาะกับ [Business Type])

### 👉 สิ่งที่คุณต้องทำ
- [ ] เปิด http://localhost:3000 ดูผลลัพธ์
- [ ] ลองคลิกดูทุกหน้า ทดสอบ flow

⚠️ **Dev server รันอยู่แล้ว** ไม่ต้อง npm run dev อีก

---

### 📄 หน้าที่สร้าง (6 หน้า)

| หน้า | URL | Description |
|------|-----|-------------|
| Dashboard | `/` | Overview พร้อม stats |
| [Feature] List | `/[feature]` | รายการทั้งหมด + filter |
| Create [Feature] | `/[feature]/new` | ฟอร์มสร้างใหม่ |
| [Feature] Detail | `/[feature]/[id]` | ดูรายละเอียด + แก้ไข |
| Settings | `/settings` | ตั้งค่าระบบ |
| Profile | `/profile` | โปรไฟล์ผู้ใช้ |

### 🎨 Design Decisions

| Element | Choice | Why |
|---------|--------|-----|
| Color Palette | [Colors] | เหมาะกับ [Business Type] |
| Layout | [Sidebar/Top Nav] | [Reason] |
| Animation | [Level] | [Reason] |

### 💡 ขั้นตอนถัดไป (เลือกทำได้เลย)
1. `/toh เพิ่มหน้า [feature]` - เพิ่มหน้าใหม่
2. `/toh เชื่อม Supabase` - เชื่อม database จริง
3. `/toh ปรับ design [ต้องการอะไร]` - ปรับ design

---
📁 **Project Location:** `[full path]`
```

---

## ❌ Rules (NEVER DO!)

1. **NEVER** ask "what features do you want?" - Decide yourself!
2. **NEVER** ask "which framework?" - Use Next.js 14!
3. **NEVER** create only 1-2 pages - Must have 5-7 pages!
4. **NEVER** use generic purple-blue gradient - Anti AI-looking!
5. **NEVER** use Lorem ipsum - Use realistic mock data!
6. **NEVER** skip business analysis - Analyze before building!
7. **NEVER** forget to tell user what to do next - Response Excellence!
8. **NEVER** deliver with build errors - `npm run build` must pass first!
9. **NEVER** tell user to fix errors themselves - Fix everything before delivery!

## ✅ Rules (ALWAYS DO!)

1. **ALWAYS** analyze business type first
2. **ALWAYS** select appropriate design pattern
3. **ALWAYS** create 5-7 pages minimum
4. **ALWAYS** use realistic mock data
5. **ALWAYS** apply Anti AI-Looking rules
6. **ALWAYS** run `npm run build` and fix ALL errors before deliver
7. **ALWAYS** run dev server and verify
8. **ALWAYS** use Response Excellence format
9. **ALWAYS** tell user exactly what they got and what to do

---

## 🎯 Success Criteria

- [ ] User เห็น working app ใน 1 คำสั่ง
- [ ] มี 5-7 หน้าพร้อมใช้
- [ ] Design สวย ไม่ดู "AI-looking"
- [ ] Design เหมาะกับประเภทธุรกิจ (ไม่ใช่ template เดียว)
- [ ] Mock data realistic (ไม่ใช่ Lorem ipsum)
- [ ] **`npm run build` ผ่าน 100% ไม่มี error** 🚨
- [ ] User รู้ว่าได้อะไร ต้องทำอะไร ไม่ต้องถามซ้ำ
- [ ] ดีกว่า Lovable ตั้งแต่แรก! 🎉
