# 📊 Progress Tracking Skill

> **Purpose:** Visual progress tracking for users
> **Version:** 1.0.0
> **Author:** Toh Framework Team

## Overview

This skill enables AI to track and display project progress visually, so users always know where they are in the development journey.

## Core Principle

```
User can always see:
- What's done ✅
- What's in progress ⏳
- What's remaining ⬚
- Estimated completion
```

**TRANSPARENCY WITHOUT OVERWHELM**

---

## Progress Visualization Formats

### Simple Progress Bar

```markdown
🔄 **กำลังสร้าง:** ระบบร้านกาแฟ

[████████░░░░░░░░] 50%

✅ UI เสร็จแล้ว (4/4 หน้า)
⏳ Logic กำลังทำ (2/5 features)
⬚ Database ยังไม่เริ่ม
```

### Detailed Phase View

```markdown
📊 **Progress: ระบบร้านกาแฟ**

| Phase | Status | Progress |
|-------|--------|----------|
| 🎨 UI | ✅ Done | 100% |
| ⚙️ Logic | ⏳ In Progress | 60% |
| 🔌 Database | ⬚ Not Started | 0% |
| 🧪 Testing | ⬚ Not Started | 0% |
| 🚀 Deploy | ⬚ Not Started | 0% |

**Overall:** 40% complete
**Est. remaining:** ~2 hours
```

### Feature Checklist View

```markdown
📋 **Features Progress**

**POS System:**
- [x] หน้า POS
- [x] รายการสินค้า
- [x] ตะกร้า
- [ ] ชำระเงิน
- [ ] พิมพ์ใบเสร็จ

**Inventory:**
- [x] หน้ารายการสินค้า
- [ ] เพิ่ม/แก้ไขสินค้า
- [ ] ตัดสต็อกอัตโนมัติ

**Reports:**
- [ ] ยอดขายรายวัน
- [ ] สินค้าขายดี
```

---

## Progress Tracking Structure

### In Memory (`.toh/memory/progress.md`)

```markdown
# 📊 Project Progress

## Overview
- Project: ร้านกาแฟ
- Type: F&B
- Started: 2024-12-03
- Last Updated: 2024-12-03 14:30

## Phases

### Phase 1: UI Creation
- Status: ✅ Complete
- Started: 2024-12-03 10:00
- Completed: 2024-12-03 12:00
- Items:
  - [x] Dashboard page
  - [x] POS page
  - [x] Menu management
  - [x] Orders page

### Phase 2: Logic Implementation
- Status: ⏳ In Progress
- Started: 2024-12-03 12:30
- Items:
  - [x] Product store
  - [x] Cart logic
  - [ ] Order processing
  - [ ] Payment integration
  - [ ] Receipt generation

### Phase 3: Database Connection
- Status: ⬚ Not Started
- Items:
  - [ ] Supabase setup
  - [ ] Tables creation
  - [ ] RLS policies
  - [ ] API integration

### Phase 4: Testing
- Status: ⬚ Not Started
- Items:
  - [ ] Unit tests
  - [ ] E2E tests
  - [ ] Manual testing

### Phase 5: Deployment
- Status: ⬚ Not Started
- Items:
  - [ ] Vercel setup
  - [ ] Environment config
  - [ ] Domain setup

## Statistics
- Total Items: 20
- Completed: 8
- In Progress: 2
- Remaining: 10
- Completion: 40%
```

---

## Auto-Progress Detection

AI automatically detects progress by:

### File-Based Detection

| Detection | Progress |
|-----------|----------|
| `app/*/page.tsx` exists | UI page done |
| Store files with logic | Logic started |
| Supabase client configured | Database started |
| Test files exist | Testing started |
| `vercel.json` or deploy config | Deploy started |

### Code-Based Detection

| Detection | Progress |
|-----------|----------|
| Components with mock data | UI done, needs real data |
| API routes calling Supabase | Database connected |
| Form validation with Zod | Logic implemented |
| Playwright test files | Testing implemented |

---

## Progress Update Protocol

### After Each Task

```javascript
// Pseudo-code for AI behavior
afterTaskComplete(task) {
  1. Identify which phase/feature
  2. Mark item as complete
  3. Update phase progress %
  4. Update overall progress %
  5. Save to progress.md
  6. Show progress to user
}
```

### Progress Update Response

```markdown
✅ **[Task Name]** เสร็จแล้ว!

📊 Progress Update:
[████████████░░░░] 75% (+15%)

✅ เสร็จแล้ว: UI, Logic, Database
⏳ กำลังทำ: Testing (50%)
⬚ เหลือ: Deploy

💡 แนะนำถัดไป: เสร็จสิ้น Testing แล้ว Deploy ได้เลย
```

---

## Progress Queries

User can ask:

| Query | Response |
|-------|----------|
| "ทำถึงไหนแล้ว" | Show progress overview |
| "เหลืออีกเท่าไหร่" | Show remaining items |
| "สรุป progress" | Detailed progress view |
| "อะไรเสร็จแล้วบ้าง" | List completed items |
| "ต้องทำอะไรอีก" | List remaining items |

---

## Business-Specific Progress Templates

### F&B Business

```markdown
📊 **ระบบร้านกาแฟ - Progress**

**Core Features:**
- [x] 💰 POS ขายสินค้า
- [x] 📋 จัดการเมนู
- [ ] 📦 สต็อกสินค้า
- [ ] 📊 รายงานยอดขาย

**Backend:**
- [ ] 🔌 Supabase
- [ ] 🔐 Authentication

**Deploy:**
- [ ] 🚀 Vercel

[██████░░░░░░░░░░] 40%
```

### E-commerce Business

```markdown
📊 **ร้านค้าออนไลน์ - Progress**

**Storefront:**
- [x] 🏠 Homepage
- [x] 📦 Product listing
- [x] 🔍 Product detail
- [ ] 🛒 Shopping cart
- [ ] 💳 Checkout

**Admin:**
- [ ] 📊 Dashboard
- [ ] 📦 Product management
- [ ] 📋 Order management

**Integration:**
- [ ] 💰 Payment
- [ ] 📧 Email

[████░░░░░░░░░░░░] 25%
```

---

## Milestone Celebrations

When reaching milestones:

### Phase Complete

```markdown
🎉 **Phase Complete!**

✅ UI Phase เสร็จสมบูรณ์แล้ว!

สร้างไปแล้ว:
- 5 pages
- 12 components
- Responsive ทุก breakpoint

📊 Overall: [████████░░░░░░░░] 50%

💡 ถัดไป: เริ่ม Logic Phase
ทำเลยไหมครับ?
```

### Project Complete

```markdown
🎊 **ยินดีด้วย! โปรเจคเสร็จสมบูรณ์!**

📋 **สรุปโปรเจค: ระบบร้านกาแฟ**

✅ Features ทั้งหมด:
- POS System
- Menu Management
- Inventory
- Reports
- Authentication

📊 Statistics:
- เวลาที่ใช้: 4 ชั่วโมง
- ไฟล์ที่สร้าง: 45 files
- Components: 20
- API Routes: 8

🌐 **Live URL:** https://coffee-shop.vercel.app

🎉 มีอะไรให้ช่วยต่อไหมครับ?
```

---

## Progress Persistence

### Save Location

```
.toh/
├── memory/
│   ├── active.md
│   ├── summary.md
│   ├── decisions.md
│   └── progress.md     ← NEW: Progress tracking
```

### Cross-IDE Sync

Progress is saved in `.toh/memory/progress.md`, so it syncs across:
- Claude Code
- Cursor
- Gemini CLI
- Codex CLI

---

## Integration with Other Skills

| Skill | Integration |
|-------|-------------|
| Business Context | Template-specific progress items |
| Smart Suggestions | Suggest based on what's incomplete |
| Session Recovery | Show progress on session start |
| Error Handling | Track fixes in progress |

---

## Best Practices

### DO:
- ✅ Update progress after every task
- ✅ Show visual progress (bars, checkmarks)
- ✅ Celebrate milestones
- ✅ Be accurate about completion %

### DON'T:
- ❌ Overwhelm with too much detail
- ❌ Show false progress
- ❌ Forget to update on completion
- ❌ Hide progress from user

---

*Last Updated: 2024-12-03*
