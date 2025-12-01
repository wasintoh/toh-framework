---
command: /toh:ui
aliases: ["/toh:u"]
description: >
  สร้างหรือแก้ไข UI components, pages, หรือ layouts
  ทำให้เห็นผลทันที ไม่ต้องรอ logic
trigger: /toh:ui หรือ /toh:u ตามด้วย description
---

# /toh:ui - Create/Edit UI

## Signature Command 🎨

```
/toh:ui [description]
/toh:u [description]
```

## What Happens

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md
   ├── .toh/memory/summary.md
   └── .toh/memory/decisions.md
   (ถ้าไม่มี → สร้างใหม่)

1. READ Skills
   ├── ~/.claude/skills/ui-first-builder/SKILL.md
   └── ~/.claude/skills/design-excellence/SKILL.md

2. ANALYZE Request
   ├── New page? → Create in app/[name]/page.tsx
   ├── New component? → Create in components/features/
   ├── Edit existing? → Modify in place
   └── Layout change? → Update layout.tsx

3. GENERATE UI
   ├── Use shadcn/ui components
   ├── Add realistic mock data
   ├── Include hover/loading states
   └── Make it responsive

4. VERIFY
   └── Dev server shows changes (HMR)

5. 🚨 SAVE MEMORY (MANDATORY!)
   ├── อัพเดท active.md
   ├── เพิ่ม decisions.md (ถ้ามี)
   └── อัพเดท summary.md (ถ้า feature เสร็จ)
```

## Example Prompts

```bash
# New page
/toh:ui หน้า settings พร้อม form แก้ไขโปรไฟล์

# New component
/toh:u product card component แสดงรูป ชื่อ ราคา ปุ่มเพิ่มลงตะกร้า

# Edit existing
/toh:ui เพิ่ม sidebar ในหน้า dashboard

# Layout change
/toh:u เปลี่ยน layout เป็น 2 columns บน desktop

# Complex UI
/toh:ui modal สำหรับ edit product พร้อม image upload
```

## Output Format

```markdown
## ✅ UI พร้อมแล้วค่ะ!

### สร้าง/แก้ไข:
- `app/settings/page.tsx` - หน้า Settings
- `components/features/profile-form.tsx` - Form component

### Preview:
ดูได้ที่ http://localhost:3000/settings

### Memory:
✅ บันทึก memory แล้วค่ะ

### ถัดไป:
- `/toh:dev` เพิ่ม logic ให้ form ทำงานได้
```

## Rules

1. **ALWAYS** use shadcn/ui components
2. **ALWAYS** add mock data (ภาษาไทย)
3. **ALWAYS** make responsive (mobile-first)
4. **NEVER** ask "ต้องการ style แบบไหน?"
5. **NEVER** create empty placeholder UI
