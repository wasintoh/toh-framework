---
command: /toh:dev
aliases: ["/toh:d"]
description: >
  เพิ่ม logic, state management, TypeScript types, form validation,
  และ CRUD operations ให้กับ UI ที่มีอยู่แล้ว
trigger: /toh:dev หรือ /toh:d ตามด้วย description
---

# /toh:dev - Add Logic & State

## Signature Command ⚙️

```
/toh:dev [description]
/toh:d [description]
```

## What Happens

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md
   ├── .toh/memory/summary.md
   └── .toh/memory/decisions.md
   (ถ้าไม่มี → สร้างใหม่)

1. READ Skills
   └── ~/.claude/skills/dev-engineer/SKILL.md

2. ANALYZE Request
   ├── Need types? → Create in types/
   ├── Need state? → Create Zustand store in stores/
   ├── Need forms? → Add React Hook Form + Zod
   └── Need CRUD? → Create in lib/api/

3. IMPLEMENT
   ├── TypeScript types (strict, no any)
   ├── Zustand store with actions
   ├── Zod validation schemas
   ├── Mock CRUD operations
   └── Custom hooks if needed

4. CONNECT to UI
   └── Wire up components to stores/forms

5. 🚨 SAVE MEMORY (MANDATORY!)
   ├── อัพเดท active.md
   ├── เพิ่ม decisions.md (ถ้ามี technical decisions)
   └── อัพเดท summary.md (ถ้า feature เสร็จ)
```

## Example Prompts

```bash
# Add state management
/toh:dev เพิ่ม state สำหรับจัดการ cart

# Add form logic
/toh:d form validation สำหรับ product form

# Add CRUD
/toh:dev CRUD operations สำหรับ orders

# Add specific function
/toh:d function คำนวณราคารวมพร้อมส่วนลด

# Add custom hook
/toh:dev hook สำหรับ debounced search
```

## Output Format

```markdown
## ✅ Logic พร้อมแล้วค่ะ!

### สร้าง:
- `types/cart.ts` - TypeScript types
- `stores/cart-store.ts` - Zustand store
- `lib/validations/cart.ts` - Zod schemas

### เชื่อมกับ UI:
- `components/features/cart-drawer.tsx` - ใช้ store แล้ว

### ทดสอบ:
- เพิ่มสินค้าลงตะกร้าได้
- อัพเดทจำนวนได้
- ลบสินค้าได้

### Memory:
✅ บันทึก memory แล้วค่ะ

### ถัดไป:
- `/toh:connect` เชื่อม database จริง
```

## Standard Stack

| Need | Solution |
|------|----------|
| State | Zustand |
| Forms | React Hook Form |
| Validation | Zod |
| Types | TypeScript (strict) |
| API | Mock functions (ready for Supabase) |

## Rules

1. **ALWAYS** create TypeScript types first
2. **ALWAYS** use Zustand for state (not Redux, not Context)
3. **ALWAYS** validate with Zod
4. **ALWAYS** mock API calls (with realistic delay)
5. **NEVER** use `any` type
6. **NEVER** ask "ใช้ state management อะไรดี?"
