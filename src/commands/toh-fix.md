---
command: /toh:fix
aliases: ["/toh:f"]
description: >
  แก้ bug, error, หรือปัญหาใน code อัตโนมัติ
  วิเคราะห์ error message และแก้ไขให้ทันที
trigger: /toh:fix หรือ /toh:f ตามด้วย error หรือปัญหา
---

# /toh:fix - Auto Fix Bugs

## Signature Command 🔧

```
/toh:fix [error or problem]
/toh:f [error or problem]
```

## What Happens

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md
   ├── .toh/memory/summary.md
   └── .toh/memory/decisions.md
   (ดู context ว่าเคยแก้ปัญหานี้ไหม)

1. ANALYZE Error
   ├── Parse error message
   ├── Identify file and line
   ├── Understand root cause
   └── Check related files

2. FIX
   ├── Apply minimal fix
   ├── Preserve existing functionality
   └── Add error handling if needed

3. VERIFY
   ├── Type check passes
   ├── Build succeeds
   └── Feature still works

4. 🚨 SAVE MEMORY (MANDATORY!)
   ├── อัพเดท active.md (บันทึก bug ที่แก้)
   ├── เพิ่ม decisions.md (ถ้าเป็น fix สำคัญ)
   └── อัพเดท summary.md (ถ้า fix major issue)

5. REPORT
   └── Explain what was wrong and how it's fixed
```

## Example Prompts

```bash
# With error message
/toh:fix TypeError: Cannot read property 'map' of undefined

# With screenshot/description
/toh:f หน้า dashboard พังไม่โหลด

# Vague problem
/toh:fix form submit แล้วไม่มีอะไรเกิดขึ้น

# Build error
/toh:f npm run build error

# Type error
/toh:fix TypeScript error ใน product-form.tsx
```

## Output Format

```markdown
## ✅ แก้ไขเรียบร้อยค่ะ!

### ปัญหา:
`Cannot read property 'map' of undefined` ที่ `ProductList.tsx:15`

### สาเหตุ:
`products` เป็น `undefined` ก่อนที่ data จะโหลดเสร็จ

### แก้ไข:
```tsx
// Before
{products.map(p => ...)}

// After  
{products?.map(p => ...) ?? <EmptyState />}
```

### ไฟล์ที่แก้:
- `components/features/product-list.tsx`

### ทดสอบ:
- Refresh หน้า - ควรโหลดได้แล้ว
- Loading state แสดงก่อน data พร้อม
```

## Common Fixes

| Error Type | Typical Fix |
|------------|-------------|
| `Cannot read property X of undefined` | Add optional chaining `?.` |
| `Type X is not assignable to Y` | Fix type or add assertion |
| `Module not found` | Check import path, install package |
| `Hydration error` | Add `use client` or fix server/client mismatch |
| `Build error` | Usually type errors, fix one by one |

## Rules

1. **ALWAYS** explain what was wrong
2. **ALWAYS** show before/after code
3. **ALWAYS** verify fix works
4. **NEVER** change unrelated code
5. **NEVER** suppress errors without fixing root cause
