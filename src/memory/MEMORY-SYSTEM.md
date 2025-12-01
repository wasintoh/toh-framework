# 🧠 Toh Framework - Smart Memory System

> ระบบ Memory อัตโนมัติที่ทำให้ AI ไม่ลืมงาน แม้เปลี่ยน Chat, IDE, หรือ Model

---

## 🎯 Why Memory System?

### ปัญหาที่แก้
- ❌ Token เต็ม → Context หาย
- ❌ เปลี่ยน Chat → ต้องอธิบายใหม่
- ❌ ย้าย IDE (Claude → Cursor) → ลืมทุกอย่าง
- ❌ ย้าย Model → Context หาย

### Solution
- ✅ Auto-save ทุกครั้งที่ทำงานเสร็จ
- ✅ Auto-load ทุกครั้งที่เริ่ม session
- ✅ User ไม่ต้องทำอะไรเลย
- ✅ ใช้ได้ทุก IDE, ทุก Model

---

## 📁 Memory Structure

```
.toh/
└── memory/
    ├── active.md          # 🔥 งานปัจจุบัน (~500 tokens)
    ├── summary.md         # 📋 สรุปโปรเจค (~1,000 tokens)
    ├── decisions.md       # 🧠 การตัดสินใจสำคัญ (~500 tokens)
    └── archive/           # 📦 ประวัติเก่า (โหลดเมื่อต้องการ)
        ├── 2024-11-27.md
        └── ...
```

### Total Context Load: ~2,000 tokens (เท่านั้น!)

---

## 📄 Memory Files

### 1. `active.md` - งานปัจจุบัน

```markdown
# 🔥 Active Task

## Current Focus
[สิ่งที่กำลังทำอยู่ตอนนี้]

## In Progress
- [ ] Task 1
- [ ] Task 2

## Just Completed
- [x] Task ที่เพิ่งทำเสร็จ

## Next Steps
- สิ่งที่ต้องทำต่อ

## Blockers / Issues
- ปัญหาที่ติดอยู่ (ถ้ามี)

---
*Last updated: [timestamp]*
```

### 2. `summary.md` - สรุปโปรเจค

```markdown
# 📋 Project Summary

## Project Overview
- Name: [ชื่อโปรเจค]
- Type: [ประเภท เช่น SaaS, E-commerce]
- Tech Stack: Next.js 14, Tailwind, shadcn/ui, Zustand, Supabase

## Completed Features
- ✅ Feature 1 - [คำอธิบายสั้น]
- ✅ Feature 2 - [คำอธิบายสั้น]

## Current State
[สถานะปัจจุบันของโปรเจค]

## Key Files
- `src/app/page.tsx` - หน้าหลัก
- `src/stores/` - State management
- `src/components/` - UI Components

## Important Notes
- [สิ่งสำคัญที่ต้องจำ]

---
*Last updated: [timestamp]*
```

### 3. `decisions.md` - การตัดสินใจสำคัญ

```markdown
# 🧠 Key Decisions

## Architecture Decisions
| Date | Decision | Reason |
|------|----------|--------|
| 2024-11-27 | ใช้ Zustand แทน Redux | เรียบง่าย เหมาะกับ Solo Dev |
| 2024-11-27 | ใช้ shadcn/ui | Customizable, ไม่ bloat |

## Design Decisions
| Date | Decision | Reason |
|------|----------|--------|
| 2024-11-27 | สี Primary: Blue | ตาม brand guideline |

## Business Logic
| Date | Decision | Reason |
|------|----------|--------|
| 2024-11-27 | Free tier 100 items | เพื่อดึงดูด users |

## Rejected Ideas
| Date | Idea | Why Rejected |
|------|------|--------------|
| 2024-11-27 | ใช้ Redux | ซับซ้อนเกินไป |

---
*Last updated: [timestamp]*
```

### 4. `archive/YYYY-MM-DD.md` - ประวัติรายวัน

```markdown
# 📦 Archive: 2024-11-27

## Sessions
### Session 1 (09:00)
- สร้างหน้า Login
- เชื่อม Supabase Auth

### Session 2 (14:00)
- แก้ bug validation
- เพิ่ม loading state

## Completed Tasks
- [x] Login page
- [x] Auth integration
- [x] Form validation

## Notes
- พบ bug ใน Safari ต้องแก้ภายหลัง
```

---

## 🔄 Auto-Save Flow

```
┌─────────────────────────────────────────────────────────┐
│  Agent ทำงานเสร็จ (เช่น /toh:ui สร้าง component เสร็จ)   │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  🔄 AUTO-SAVE TRIGGER                                   │
│                                                         │
│  1. อัพเดท active.md                                    │
│     - เพิ่มใน "Just Completed"                          │
│     - อัพเดท "Current Focus"                            │
│     - อัพเดท "Next Steps"                               │
│                                                         │
│  2. เพิ่มใน decisions.md (ถ้ามีการตัดสินใจใหม่)           │
│                                                         │
│  3. ถ้า active.md ยาวเกิน 50 lines:                      │
│     - สรุปลง summary.md                                 │
│     - ย้ายของเก่าไป archive/                             │
│                                                         │
│  4. อัพเดท timestamp                                    │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  ✅ Memory บันทึกแล้ว - User ไม่ต้องทำอะไร               │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Auto-Load Flow

```
┌─────────────────────────────────────────────────────────┐
│  User เริ่ม Session ใหม่                                 │
│  (เปิด Chat ใหม่ / เปลี่ยน IDE / เปลี่ยน Model)          │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  🔄 AUTO-LOAD (เมื่อ User พิมพ์คำสั่ง /toh:*)            │
│                                                         │
│  1. ตรวจสอบว่ามี .toh/memory/ หรือไม่                    │
│                                                         │
│  2. ถ้ามี → โหลด:                                        │
│     - active.md (งานปัจจุบัน)                            │
│     - summary.md (สรุปโปรเจค)                            │
│     - decisions.md (การตัดสินใจ)                         │
│                                                         │
│  3. AI เข้าใจ context ทันที (~2,000 tokens)              │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  AI: "สวัสดีค่ะ! หนูจำได้ว่าเรากำลังทำ [active task]      │
│       โปรเจคนี้เป็น [summary] จะทำต่อไหมคะ?"              │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Memory Instructions for AI

### เมื่อเริ่ม Session (Auto-Load)

```
1. ตรวจสอบ .toh/memory/ folder
2. ถ้ามี → อ่านไฟล์ทั้ง 3 (active, summary, decisions)
3. ทำความเข้าใจ context
4. พร้อมทำงานต่อ
```

### เมื่อทำงานเสร็จ (Auto-Save)

```
1. สรุปสิ่งที่ทำไป
2. อัพเดท active.md:
   - ย้ายจาก "In Progress" → "Just Completed"
   - อัพเดท "Next Steps"
3. ถ้ามีการตัดสินใจสำคัญ → เพิ่มใน decisions.md
4. ถ้า active.md ยาวเกิน → archive
5. อัพเดท timestamp
```

### เมื่อต้องการข้อมูลเก่า

```
1. ดูใน archive/ folder
2. โหลดเฉพาะวันที่เกี่ยวข้อง
3. ไม่ต้องโหลดทั้งหมด
```

---

## 🎯 Key Principles

1. **User ไม่ต้องทำอะไร** - ทุกอย่างอัตโนมัติ
2. **Context น้อย** - โหลดแค่ ~2,000 tokens
3. **IDE-agnostic** - ใช้ได้ทุก IDE
4. **Model-agnostic** - ย้าย model ได้
5. **Human-readable** - ไฟล์เป็น Markdown อ่านได้

---

## 🔧 Technical Notes

### Memory File Format: Markdown
- อ่านง่ายทั้ง AI และ Human
- Edit ด้วยมือได้ถ้าต้องการ
- Version control ได้ (git)

### Token Budget
| File | Max Lines | ~Tokens |
|------|-----------|---------|
| active.md | 30 | 500 |
| summary.md | 60 | 1,000 |
| decisions.md | 30 | 500 |
| **Total** | 120 | **2,000** |

### Archive Strategy
- เก็บ 7 วันล่าสุด
- เก่ากว่า 7 วัน → auto-delete (optional)
- หรือเก็บไว้ตลอด (default)
