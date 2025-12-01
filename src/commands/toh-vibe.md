---
command: /toh:vibe
aliases: ["/toh:v"]
description: >
  สร้าง project ใหม่แบบ Lovable-style ได้ working UI ทันที prompt แรก
  ไม่ถามคำถาม ตัดสินใจทุกอย่างให้ user
trigger: /toh:vibe หรือ /toh:v ตามด้วย description ของ app
---

# /toh:vibe - Create New Project

## Signature Command 🎯

```
/toh:vibe [app description]
/toh:v [app description]
```

## What Happens

เมื่อ user พิมพ์ `/toh:vibe expense tracker`:

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md (ถ้ามี)
   ├── .toh/memory/summary.md (ถ้ามี)
   └── .toh/memory/decisions.md (ถ้ามี)
   (ถ้าไม่มี → จะสร้างใหม่หลังจบ)

1. READ Skills (parallel)
   ├── ~/.claude/skills/vibe-orchestrator/SKILL.md
   ├── ~/.claude/skills/ui-first-builder/SKILL.md
   ├── ~/.claude/skills/dev-engineer/SKILL.md
   └── ~/.claude/skills/design-excellence/SKILL.md

2. DECIDE Platform (no asking)
   └── Default: Next.js 14 Web App

3. CREATE Project
   ├── npx create-next-app@latest [name] --typescript --tailwind --eslint --app
   ├── cd [name]
   └── npx shadcn@latest init -d

4. GENERATE UI (immediate)
   ├── Pages (app/page.tsx, app/[feature]/page.tsx)
   ├── Components (components/features/*, components/ui/*)
   ├── Mock Data (lib/mock-data.ts)
   └── Types (types/index.ts)

5. ADD Logic
   ├── Zustand stores (stores/*.ts)
   ├── Form validation (lib/validations/*.ts)
   └── CRUD operations (lib/api/*.ts)

6. START Dev Server
   └── npm run dev

7. 🚨 SAVE MEMORY (MANDATORY!)
   ├── สร้าง .toh/memory/ folder
   ├── สร้าง active.md, summary.md, decisions.md
   └── บันทึก project info + features ที่สร้าง

8. REPORT to User
   └── "เปิด http://localhost:3000 ดูได้เลยค่ะพี่โต!"
```

## Decision Matrix

| User Says | Platform | Tech Stack |
|-----------|----------|------------|
| (default) | Web | Next.js + shadcn |
| "LINE", "LIFF" | LINE Mini App | Next.js + LIFF SDK |
| "mobile", "app" | Expo | React Native + NativeWind |
| "desktop", "mac" | Tauri | Next.js + Rust |

## Example Prompts

```bash
# Basic app
/toh:vibe todo app

# With description
/toh:vibe ระบบจองคิวร้านกาแฟ มีหน้าเลือกเมนู จองคิว และดูสถานะ

# Specific platform
/toh:vibe LINE Mini App สำหรับสั่งอาหาร

# With features
/toh:v expense tracker มี dashboard, เพิ่มรายการ, รายงานรายเดือน
```

## Output Format

```markdown
## ✅ สร้างเรียบร้อยแล้วค่ะพี่โต!

**🚀 เปิด http://localhost:3000 ดูได้เลยค่ะ!**

### สิ่งที่สร้างให้:
- 📄 หน้า Dashboard พร้อม stats
- 📄 หน้า [Feature] พร้อม CRUD
- 🧩 Components ที่จำเป็นทั้งหมด
- 📊 Mock data ภาษาไทย

### Tech Stack:
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Zustand + React Hook Form + Zod

### ขั้นตอนถัดไป:
- `/toh:ui` เพิ่ม/แก้ไขหน้าจอ
- `/toh:connect` เชื่อม Supabase
- `/toh:line` ทำเป็น LINE Mini App
```

## Rules

1. **NEVER** ask "ต้องการ feature อะไรบ้าง?"
2. **NEVER** ask "ใช้ framework ไหนดี?"
3. **NEVER** show architecture diagram first
4. **ALWAYS** create working UI immediately
5. **ALWAYS** use Thai mock data
6. **ALWAYS** run dev server and show URL
