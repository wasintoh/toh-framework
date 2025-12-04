# /toh - Smart Single Command v3.0

> **Version:** 3.0.0  
> **Command:** `/toh [anything]`  
> **Status:** ✅ Production Ready
> **Philosophy:** One command to rule them all!

---

## 🎯 Concept

**Type anything → AI understands → Premium result delivered**

```
/toh สร้างแอพร้านกาแฟ
/toh make login page prettier  
/toh scroll bug on settings
/toh connect Supabase for users
/toh build SaaS for project management
```

**Zero learning curve** - Just describe what you want in any language.

---

## 🧠 Core Orchestrator v3.0

```
┌─────────────────────────────────────────────────────────────────┐
│                    /toh [user request]                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📋 STEP 0: MEMORY (ALWAYS FIRST!)                              │
│  ├── Read .toh/memory/active.md                                 │
│  ├── Read .toh/memory/summary.md                                │
│  ├── Read .toh/memory/decisions.md                              │
│  └── Build context from past sessions                           │
│                                                                 │
│  🧠 STEP 1: INTENT ANALYSIS                                     │
│  ├── NLP Classification (what does user want?)                  │
│  ├── Scope Detection (single task vs project)                   │
│  ├── Complexity Score (1-10)                                    │
│  └── Confidence Level (HIGH/MEDIUM/LOW)                         │
│                                                                 │
│  🎨 STEP 2: DESIGN PROFILE (For UI/Project tasks)               │
│  ├── Extract business keywords                                  │
│  ├── Match to Business Profile (13 types)                       │
│  ├── Load design tokens (colors, fonts, patterns)               │
│  └── Store in decisions.md                                      │
│                                                                 │
│  🎯 STEP 3: ROUTE DECISION                                      │
│  ├── HIGH (80%+) → Direct execute with agent                    │
│  ├── MEDIUM (50-80%) → Plan Agent analyzes first                │
│  └── LOW (<50%) → Smart clarification                           │
│                                                                 │
│  🌟 STEP 4: PREMIUM EXECUTION                                   │
│  ├── Load skills: premium-experience, design-mastery            │
│  ├── Generate 5+ pages (for new projects)                       │
│  ├── Apply animations (PageTransition, Stagger)                 │
│  ├── Create loading/empty states                                │
│  └── Verify: Zero TypeScript errors                             │
│                                                                 │
│  📝 STEP 5: RESPONSE (3-Section Format)                         │
│  ├── ✅ What I Did                                              │
│  ├── 🎁 What You Get                                            │
│  └── 👉 What You Need To Do                                     │
│                                                                 │
│  💾 STEP 6: SAVE MEMORY (NEVER SKIP!)                           │
│  └── Update active.md, decisions.md, summary.md                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Intent Classification Matrix

### Pattern Recognition

| User Says (TH/EN) | Intent | Agent(s) | Skills | Confidence |
|-------------------|--------|----------|--------|------------|
| "สร้างแอพ/ระบบ/เว็บ", "build app/system" | New Project | Vibe → UI → Dev → Design | vibe-orchestrator, premium-experience, design-mastery | HIGH |
| "สร้างหน้า", "add page/UI" | Create Page | UI Builder | ui-first-builder, premium-experience | HIGH |
| "ทำให้สวย", "make prettier/polish" | Improve Design | Design Reviewer | design-mastery, design-excellence | HIGH |
| "เพิ่ม logic", "add state/function" | Add Logic | Dev Builder | dev-engineer | HIGH |
| "เชื่อม/connect", "Supabase/database" | Connect Backend | Backend Connector | backend-engineer | HIGH |
| "bug/error/พัง", "not working" | Fix Bug | Test Runner (fix mode) | debug-protocol | HIGH |
| "ทดสอบ", "test/check" | Testing | Test Runner | test-engineer | HIGH |
| "deploy/ship" | Deploy | Ship Agent | (deployment skill) | HIGH |
| "LINE/LIFF" | LINE Platform | Platform Adapter | platform-specialist | HIGH |
| "mobile/Expo" | Mobile | Platform Adapter | platform-specialist | HIGH |
| "prompt/AI/chatbot" | AI Work | Dev Builder | prompt-optimizer | HIGH |
| "plan/วิเคราะห์/PRD" | Planning | Plan Orchestrator | plan-orchestrator | HIGH |
| "ทำต่อ/continue" | Resume | (from memory) | (last used) | MEDIUM |
| Complex multi-feature | Big Project | Plan → Multi-agent | all relevant | MEDIUM |
| Vague/unclear | Unknown | Ask | - | LOW |

### Complexity Scoring

| Score | Type | Example | Action |
|-------|------|---------|--------|
| 1-3 | Simple | "add button", "fix typo" | Direct execute |
| 4-6 | Medium | "add login page", "connect auth" | Execute with verification |
| 7-8 | Complex | "build dashboard with charts" | Plan first, then execute |
| 9-10 | Major | "build e-commerce", "create SaaS" | Full planning, phased execution |

---

## 🌟 Premium Execution Mode

### For New Projects (Complexity 7+)

When user says "สร้างแอพ/build app/new project":

```
┌─────────────────────────────────────────────────────────────────┐
│ PREMIUM PROJECT GENERATION                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ 1. DESIGN PROFILE DETECTION                                     │
│    ├── Extract: "ร้านกาแฟ" → Keywords: ["ร้าน", "กาแฟ"]         │
│    ├── Match: food-restaurant profile                           │
│    └── Load: Red primary, Playfair font, warm aesthetic         │
│                                                                 │
│ 2. MULTI-PAGE GENERATION (5+ pages minimum)                     │
│    ├── "/" - Landing/Home page                                  │
│    ├── "/[main-feature]" - Core feature                         │
│    ├── "/dashboard" - User dashboard                            │
│    ├── "/settings" - Settings page                              │
│    └── "/auth/login" - Authentication                           │
│                                                                 │
│ 3. PREMIUM COMPONENTS                                           │
│    ├── components/motion/* (PageTransition, Stagger, etc.)      │
│    ├── components/feedback/* (Loading, Skeleton, Empty)         │
│    ├── components/interactive/* (AnimatedCard, AnimatedButton)  │
│    └── components/layout/* (Navbar, Sidebar, Footer)            │
│                                                                 │
│ 4. ANIMATION SYSTEM                                             │
│    ├── Page transitions (fade + y:20)                           │
│    ├── List stagger (100ms delay each)                          │
│    ├── Card hover (y:-4, shadow increase)                       │
│    ├── Button press (scale:0.98)                                │
│    └── Stat count-up (on scroll into view)                      │
│                                                                 │
│ 5. QUALITY VERIFICATION                                         │
│    ├── `npm run build` → 0 errors                               │
│    ├── Design profile alignment verified                        │
│    ├── Anti-AI checklist passed                                 │
│    └── Responsive on all devices                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### For Simple Tasks (Complexity 1-6)

```
┌─────────────────────────────────────────────────────────────────┐
│ QUICK EXECUTION                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ 1. Identify single agent needed                                 │
│ 2. Load minimal skills                                          │
│ 3. Execute task                                                 │
│ 4. Add animation if UI-related                                  │
│ 5. Verify no errors                                             │
│ 6. Respond with 3-section format                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗣️ Natural Language Understanding

### Language Detection

```
AUTO-DETECT:
- Thai: "สร้างหน้าแดชบอร์ดแสดงยอดขาย"
- English: "Create sales dashboard page"
- Mixed: "สร้าง dashboard ของ sales"

RESPONSE:
- Match user's language for communication
- Code/comments always in English
- UI text matches user's language
```

### Context Inference from Memory

```
User: "/toh ทำต่อ"

Memory Check:
- active.md: "Working on login page"
- Last action: "Created LoginForm.tsx"
- Next step: "Add validation"

Response: Resume adding validation to login page
```

### Implicit Reference Resolution

```
User: "/toh ทำให้สวยขึ้น"

Context Check:
- Last created: "/src/app/settings/page.tsx"
- Design profile: saas-dashboard

Action: Apply design-mastery to settings page
```

---

## 🎯 Smart Clarification (LOW Confidence Only)

### When to Ask

| Situation | Action |
|-----------|--------|
| "help me" (no context) | Ask what they need |
| "fix it" (no recent error) | Ask what's broken |
| Conflicting instructions | Ask for priority |
| Missing critical info | Ask specific question |

### Clarification Format

```markdown
## ❓ Quick Question

I need a bit more info to help you best:

**What are you trying to do?**
1. 🎨 Design - Make it look better
2. ⚡ Feature - Add new functionality
3. 🐛 Bug - Fix something broken
4. 🚀 New - Create something new

Just type the number or describe in your own words!
```

### DON'T Ask When

- Can infer from memory
- Has reasonable default
- Request is actionable
- Minor ambiguity (just pick best option)

---

## 📝 Response Format (MANDATORY!)

**Every response MUST have 3 sections:**

```markdown
## ✅ สิ่งที่หนูทำให้แล้ว

**Files created:**
- `/src/app/page.tsx` - Landing page with hero section
- `/src/app/dashboard/page.tsx` - Dashboard with stats
- `/src/app/menu/page.tsx` - Menu listing page
- `/src/components/motion/*.tsx` - Animation components (5 files)
- `/src/components/layout/*.tsx` - Layout components (3 files)

**Tech stack:**
- Next.js 14 + Tailwind + shadcn/ui
- Framer Motion for animations
- Zustand for state

---

## 🎁 สิ่งที่พี่โตได้รับ

- ✅ 5 หน้าพร้อมใช้งาน (Home, Dashboard, Menu, Settings, Login)
- ✅ Animation ครบทุกที่ (page transitions, hover effects, stagger)
- ✅ Loading states ทุกหน้า
- ✅ Empty states ออกแบบแล้ว
- ✅ Responsive ทุก device
- ✅ Design แบบร้านกาแฟ (warm colors, inviting feel)

**Preview:** http://localhost:3000

---

## 👉 สิ่งที่พี่โตต้องทำ

### ตอนนี้:
ไม่ต้องทำอะไรค่ะ! Hot reload ทำงานอยู่แล้ว เปิด http://localhost:3000 ได้เลย

### ถ้าต้องการต่อ:
- "เพิ่มระบบสั่งอาหาร" - หนูจะเพิ่ม cart และ checkout
- "เชื่อม Supabase" - หนูจะ setup database

---

### 💾 Memory Updated
- ✅ active.md: Updated current task
- ✅ decisions.md: Added design profile choice
- ✅ summary.md: Added project overview
```

---

## 🎨 Design Profile Auto-Detection

### Keywords to Profile Mapping

| Keywords | Profile | Primary Color | Feel |
|----------|---------|---------------|------|
| ร้านอาหาร, กาแฟ, food, cafe | food-restaurant | Red #DC2626 | Warm, Appetizing |
| ขาย, shop, ecommerce | ecommerce | Emerald #10B981 | Trust, Clean |
| dashboard, analytics, SaaS | saas-dashboard | Blue #3B82F6 | Professional |
| AI, chatbot, GPT | ai-chatbot | Slate #1E293B | Tech, Modern |
| finance, bank, money | finance | Navy #1E3A5F | Trust, Secure |
| health, medical, clinic | healthcare | Teal #0D9488 | Calm, Trust |
| game, esports | gaming | Violet #7C3AED | Exciting, Dark |
| course, learn, education | education | Indigo #4F46E5 | Friendly, Clear |
| travel, hotel, booking | travel | Cyan #0891B2 | Adventure |
| property, real estate | real-estate | Navy #1E3A5F | Premium |
| social, community | social-media | Blue #3B82F6 | Connected |

### Profile Application

```
1. Detect keywords from request
2. Match to profile registry
3. Load design tokens
4. Apply to:
   - tailwind.config.js (colors)
   - globals.css (fonts)
   - All components (consistent styling)
5. Store in decisions.md
```

---

## 🖥️ IDE-Aware Execution

### Claude Code (Full Power)

```
Capabilities:
- Parallel sub-agent execution
- Direct file system access
- Real-time preview
- Full premium experience

Execution:
- UI + Dev + Design agents run simultaneously
- Faster completion
- Optimal for complex projects
```

### Other IDEs (Cursor, Gemini CLI, Codex)

```
Capabilities:
- Sequential execution
- File-by-file generation

Execution:
- Agents run one at a time
- More predictable output
- Safer for simpler tasks
```

---

## 🔄 Memory Protocol

### Before ANY Work

```
MUST READ (parallel):
├── .toh/memory/active.md    (~500 tokens)
├── .toh/memory/summary.md   (~1,000 tokens)
└── .toh/memory/decisions.md (~500 tokens)

DO NOT read archive/ unless specifically needed
```

### After Work Complete

```
MUST UPDATE:
├── active.md → Current task status, next steps
├── decisions.md → Any decisions made (design profile, tech choices)
└── summary.md → If feature/project complete

CONFIRM: "✅ Memory saved"

⚠️ NEVER finish without saving memory!
```

---

## 📌 Examples

### Example 1: New Coffee Shop App (Complexity 9)

```
User: /toh สร้างแอพสั่งกาแฟออนไลน์

Analysis:
- Intent: New Project
- Keywords: ["สั่ง", "กาแฟ"]
- Profile: food-restaurant
- Complexity: 9 (major project)
- Confidence: HIGH

Execution:
1. ✅ Apply food-restaurant design profile
2. ✅ Generate 5+ pages
3. ✅ Create motion components
4. ✅ Add loading/empty states
5. ✅ Verify build passes

Response: [Full 3-section format with all pages listed]
```

### Example 2: Simple Bug Fix (Complexity 2)

```
User: /toh scroll overflow ที่หน้า settings

Analysis:
- Intent: Fix bug
- Complexity: 2 (simple)
- Confidence: HIGH

Execution:
1. ✅ Check settings page
2. ✅ Fix overflow issue
3. ✅ Verify no errors

Response: [Quick 3-section format]
```

### Example 3: Continue from Memory

```
User: /toh ทำต่อ

Memory Check:
- active.md: "Creating dashboard, stats done, charts pending"

Execution:
1. ✅ Resume chart creation
2. ✅ Add to existing dashboard
3. ✅ Update memory

Response: "Continuing with charts..."
```

---

## 🔗 Legacy Commands (Power Users)

These still work for users who prefer direct control:

| Command | Direct Action |
|---------|---------------|
| `/toh:vibe` | New project with Vibe Agent |
| `/toh:ui` | UI creation only |
| `/toh:dev` | Logic only |
| `/toh:design` | Design polish only |
| `/toh:test` | Testing only |
| `/toh:fix` | Bug fixing only |
| `/toh:connect` | Backend connection |
| `/toh:plan` | Detailed planning |
| `/toh:help` | Show all commands |

**Note:** `/toh [anything]` is the recommended approach for most users.

---

## ⚠️ Critical Rules

1. **Memory First** - Always check memory before any action
2. **Premium by Default** - New projects get 5+ pages, animations, everything
3. **Design Profile** - Always detect and apply appropriate design
4. **Zero Errors** - `npm run build` must pass before delivery
5. **3-Section Response** - Every response uses the format
6. **Save Memory** - Never finish without updating memory
7. **User Language** - Communicate in user's language, code in English

---

*Version 3.0.0 - Production Ready - Premium Experience Integrated*
