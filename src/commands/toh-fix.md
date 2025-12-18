---
command: /toh-fix
aliases: ["/toh-f"]
description: Fix bugs systematically with Debug Protocol - no guess & retry
trigger: /toh-fix or /toh-f followed by error or problem
skills:
  - debug-protocol
  - error-handling
  - response-excellence    # 📝 ตอบครบ 3 ส่วน (MANDATORY!)
---

# /toh-fix - Systematic Bug Fixing

## Signature Command 🔧

```
/toh-fix [error or problem]
/toh-f [error or problem]
```

## 🚨 The 3-5-Rewrite Rule (CRITICAL!)

```
┌─────────────────────────────────────────────────────────────┐
│  ATTEMPT 1-3: Normal Debug                                  │
│  - Try different approaches systematically                  │
│  - Track every attempt in debug-log.md                      │
├─────────────────────────────────────────────────────────────┤
│  ATTEMPT 4-5: Escalate                                      │
│  - Binary search (remove half the code)                     │
│  - Create minimal reproduction                              │
├─────────────────────────────────────────────────────────────┤
│  AFTER 5 ATTEMPTS: Recommend Rewrite                        │
│  - "ลองแก้มา 5 รอบแล้วครับ แนะนำให้ลบแล้วเขียนใหม่"          │
│  - Clean slate = no legacy issues                           │
└─────────────────────────────────────────────────────────────┘

❌ ห้ามวน guess & retry ไปเรื่อยๆ!
```

## What Happens

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md
   ├── .toh/memory/summary.md
   ├── .toh/memory/decisions.md
   └── .toh/memory/debug-log.md (ถ้ามี - ดูว่าลองอะไรไปแล้ว)

1. REPRODUCE (ทำซ้ำปัญหา)
   ├── ถาม URL / หน้าที่เกิดปัญหา
   ├── ดูว่าเห็นปัญหาจริงไหม
   └── ถ้าไม่เห็น → ถาม User เพิ่ม

2. ISOLATE (แยกส่วนที่มีปัญหา)
   ├── หาว่าปัญหาอยู่ไฟล์ไหน
   ├── หาว่าอยู่ function/component ไหน
   └── Narrow down ให้เล็กที่สุด

3. IDENTIFY (ระบุ Root Cause)
   ├── ต้องบอกได้ว่า "ปัญหาคือ X เพราะ Y"
   └── ❌ ห้ามแก้ถ้ายังบอกไม่ได้!

4. FIX (แก้ไข - 1 อย่างต่อ 1 attempt)
   ├── แก้ทีละจุด ไม่แก้หลายอย่างพร้อมกัน
   ├── บันทึกลง debug-log.md
   └── อธิบายว่าแก้อะไร ทำไม

5. VERIFY (ตรวจสอบ)
   ├── รอ hot reload 3 วินาที
   ├── ถ้าไม่เห็นผล → restart server
   ├── ถาม User ว่ายังมีปัญหาไหม
   └── ถ้ายังมี → กลับไป Step 2 (Attempt +1)

6. 🚨 SAVE MEMORY (MANDATORY!)
   ├── Update active.md
   ├── Update debug-log.md (ผลการแก้)
   └── Update decisions.md (ถ้าเป็น important fix)
```

## Example Prompts

```bash
# With error message
/toh-fix TypeError: Cannot read property 'map' of undefined

# With screenshot/description
/toh-f dashboard page broken, not loading

# Vague problem
/toh-fix form submit does nothing

# Build error
/toh-f npm run build error

# Type error
/toh-fix TypeScript error in product-form.tsx
```

## Output Format

```markdown
## ✅ Fixed!

### Problem:
`Cannot read property 'map' of undefined` at `ProductList.tsx:15`

### Cause:
`products` was `undefined` before data finished loading

### Fix:
```tsx
// Before
{products.map(p => ...)}

// After  
{products?.map(p => ...) ?? <EmptyState />}
```

### Files modified:
- `components/features/product-list.tsx`

### Test:
- Refresh page - should load now
- Loading state shows before data ready
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

1. **ALWAYS** explain root cause before fixing
2. **ALWAYS** track attempts in debug-log.md
3. **ALWAYS** verify fix works before reporting
4. **ALWAYS** follow 3-5-Rewrite Rule
5. **NEVER** guess & retry in loops
6. **NEVER** change unrelated code
7. **NEVER** suppress errors without fixing root cause

## Multi-AI Handoff

เมื่อ User สลับ AI ใน IDE:

```markdown
1. อ่าน .toh/memory/debug-log.md ก่อน!

2. บอก User:
   "เห็นว่าลองแก้ [ปัญหา] มา [N] รอบแล้ว
    ลองวิธี [X, Y, Z] ไปแล้ว ยังไม่สำเร็จ
    จะลองวิธีใหม่คือ [A] ได้ไหมครับ?"

3. ถ้า attempts >= 5:
   "ลองมา 5 รอบแล้วครับ แนะนำให้ลบแล้วเขียนใหม่"
```

## Debug Log Template

สร้าง `.toh/memory/debug-log.md`:

```markdown
# 🐛 Debug Log

## Current Issue
**Problem:** scroll เกินหน้าจอ
**Page:** /settings/chatbot
**Status:** 🔴 In Progress

## Attempts

### Attempt 1 - Claude Code
- **Hypothesis:** h-screen + padding ทำให้เกิน
- **Action:** เปลี่ยนเป็น min-h-screen
- **Result:** ❌ ยังมีปัญหา
- **Learning:** ไม่ใช่แค่ height ของ container

### Attempt 2 - Cursor
- **Hypothesis:** flex container ไม่มี overflow
- **Action:** เพิ่ม overflow-hidden
- **Result:** ❌ ยังมีปัญหา
...
```
