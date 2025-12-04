---
command: /toh:vibe
aliases: ["/toh:v"]
description: >
  Create new project Lovable-style, get working UI immediately from first prompt.
  No questions asked, makes all decisions for user. Design ที่สวยและเหมาะกับธุรกิจตั้งแต่แรก!
trigger: /toh:vibe or /toh:v followed by app description
---

# /toh:vibe - Create New Project ✨

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
/toh:vibe [app description]
/toh:v [app description]
```

## Skills Required

```yaml
skills:
  - design-mastery       # 🎨 Smart design ตาม business type (NEW!)
  - response-excellence  # 📝 ตอบครบ ไม่ต้องถามซ้ำ (NEW!)
  - business-context     # 💼 เข้าใจธุรกิจ
  - smart-suggestions    # 💡 แนะนำขั้นตอน
  - prompt-optimizer     # 🎯 สำหรับ AI SaaS projects
```

---

## 🔄 Workflow

### Phase 0: Memory & Business Analysis

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md (if exists)
   ├── .toh/memory/summary.md (if exists)
   └── .toh/memory/decisions.md (if exists)

1. 🧠 ANALYZE BUSINESS TYPE (CRITICAL!)
   ├── What type? E-commerce? SaaS? Chatbot? Restaurant?
   ├── Target Audience? B2B? B2C? Gen Z? Professionals?
   └── Select Design Pattern → (see design-mastery skill)
   
   ⚠️ ห้ามข้ามขั้นตอนนี้! Design ต้องเหมาะกับธุรกิจ
```

### Phase 1: Project Setup

```
2. DECIDE Platform (no asking)
   └── Default: Next.js 14 Web App

3. CREATE Project
   ├── npx create-next-app@latest [name] --typescript --tailwind --eslint --app
   ├── cd [name]
   └── npx shadcn@latest init -d
```

### Phase 2: Design Setup (Anti AI-Looking!)

```
4. 🎨 APPLY DESIGN PATTERN (CRITICAL!)
   
   ❌ ห้ามใช้ (AI Default Patterns):
   - Gradient ม่วง-ฟ้า (ทุก AI ใช้!)
   - Rounded-full ทุก element
   - Shadow-md เหมือนกันทุกที่
   - Layout เหมือนกันทุกหน้า
   - Hero: text left, image right (cliché!)
   
   ✅ ให้ทำ:
   - เลือก color palette ตาม business type
   - ใช้ border-radius ตาม context
   - Shadow มี variety (sm/md/lg)
   - Layout มี variety แต่ละ section
   - Animation เหมาะกับ business
```

### Phase 3: Generate UI (MORE IS BETTER!)

```
5. GENERATE UI - Create 5-7 pages!
   
   📄 Core Pages (MANDATORY - ทุก project ต้องมี):
   ├── / (Dashboard/Home) - Overview with stats
   ├── /[main-feature] - Primary feature list
   ├── /[main-feature]/new - Create form
   ├── /[main-feature]/[id] - Detail/Edit view
   └── /settings - Settings page
   
   📄 Additional Pages (based on app type):
   ├── /analytics - Charts & insights
   ├── /profile - User profile
   └── /[secondary-feature] - Secondary feature
   
   🧩 Components (MANDATORY):
   ├── Layout (sidebar + header + mobile nav)
   ├── Data tables (with sort/filter)
   ├── Forms (with validation + loading states)
   ├── Cards & Stats (with icons)
   ├── Empty states (not just blank!)
   └── Loading states (skeletons)
   
   📊 Mock Data (REALISTIC!):
   ├── ชื่อจริง (ไทยถ้าเป็น Thai app, อังกฤษถ้าเป็น international)
   ├── ตัวเลขที่ make sense (ไม่ใช่ 123, 456)
   ├── วันที่จริง (relative dates)
   └── 10-20 items per collection (ไม่ใช่แค่ 2-3)
```

### Phase 4: Add Logic

```
6. ADD Logic (Production-Ready!)
   ├── Zustand stores (stores/*.ts)
   │   └── Proper typing, actions, selectors
   ├── Form validation (lib/validations/*.ts)
   │   └── Zod schemas with error messages
   ├── CRUD operations (lib/api/*.ts)
   │   └── Mock API that looks real
   └── Utility functions (lib/utils/*.ts)
       └── formatDate, formatCurrency, etc.

7. START Dev Server
   └── npm run dev → VERIFY it runs!
```

### Phase 5: Report & Save Memory

```
8. 🚨 SAVE MEMORY (MANDATORY!)
   ├── Create .toh/memory/ folder
   ├── active.md - Current state
   ├── summary.md - Project overview
   └── decisions.md - Design decisions made

9. 📝 REPORT (Response Excellence!)
   └── ใช้ format ด้านล่าง ห้ามข้าม!
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

## ❌ Rules (ห้ามทำเด็ดขาด!)

1. **NEVER** ask "what features do you want?" - ตัดสินใจเอง!
2. **NEVER** ask "which framework?" - ใช้ Next.js 14!
3. **NEVER** create only 1-2 pages - ต้อง 5-7 หน้า!
4. **NEVER** use generic purple-blue gradient - Anti AI-looking!
5. **NEVER** use Lorem ipsum - ใช้ mock data จริง!
6. **NEVER** skip business analysis - วิเคราะห์ก่อนทำ!
7. **NEVER** forget to tell user what to do next - Response Excellence!

## ✅ Rules (ต้องทำเสมอ!)

1. **ALWAYS** analyze business type first
2. **ALWAYS** select appropriate design pattern
3. **ALWAYS** create 5-7 pages minimum
4. **ALWAYS** use realistic mock data
5. **ALWAYS** apply Anti AI-Looking rules
6. **ALWAYS** run dev server and verify
7. **ALWAYS** use Response Excellence format
8. **ALWAYS** tell user exactly what they got and what to do

---

## 🎯 Success Criteria

- [ ] User เห็น working app ใน 1 คำสั่ง
- [ ] มี 5-7 หน้าพร้อมใช้
- [ ] Design สวย ไม่ดู "AI-looking"
- [ ] Design เหมาะกับประเภทธุรกิจ (ไม่ใช่ template เดียว)
- [ ] Mock data realistic (ไม่ใช่ Lorem ipsum)
- [ ] User รู้ว่าได้อะไร ต้องทำอะไร ไม่ต้องถามซ้ำ
- [ ] ดีกว่า Lovable ตั้งแต่แรก! 🎉
