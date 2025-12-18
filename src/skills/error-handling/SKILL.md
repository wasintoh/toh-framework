# 🔧 Error Handling Skill

> **Purpose:** Auto-fix errors silently, translate when necessary
> **Version:** 1.0.0
> **Author:** Toh Framework Team

## Overview

This skill enables AI to handle errors intelligently - fixing them silently when possible, and translating them to human-friendly language when user needs to know.

## Core Principle

```
Error occurs
    ↓
Can AI fix it automatically?
    ├── YES → Fix silently, continue working
    └── NO → Translate to friendly language, explain what user needs to do
```

**USER SHOULD NEVER SEE RAW ERROR MESSAGES**

---

## Error Handling Strategy

### Level 1: Silent Auto-Fix (User sees nothing)

These errors should be fixed WITHOUT telling user:

| Error Type | Auto-Fix Strategy |
|------------|-------------------|
| Missing import | Add the import |
| Undefined variable | Check context, add definition |
| Type mismatch | Fix the type |
| Missing dependency | Install it |
| Syntax error | Fix syntax |
| Missing file | Create it |
| Linting errors | Auto-format |

**User Experience:**
```
User: "สร้างหน้า dashboard"
AI: (encounters import error, fixes it silently)
AI: "✅ สร้างหน้า dashboard เสร็จแล้วครับ!"
(User never knows there was an error)
```

### Level 2: Silent Fix with Brief Mention

Fix automatically but mention briefly:

| Error Type | Action |
|------------|--------|
| Deprecated API | Fix + mention "อัพเดทเป็น API ใหม่ให้แล้ว" |
| Security vulnerability | Fix + mention "ปรับให้ปลอดภัยขึ้น" |
| Performance issue | Fix + mention "optimize ให้แล้ว" |

**User Experience:**
```
AI: "✅ สร้างหน้า dashboard เสร็จแล้วครับ!
    💡 ปรับ API เป็นเวอร์ชันใหม่ให้แล้ว (เร็วขึ้น 2x)"
```

### Level 3: Friendly Translation (User needs to act)

When AI can't fix automatically:

| Situation | Friendly Message |
|-----------|------------------|
| Missing API key | "ต้องใส่ API key ก่อนนะครับ ไปเอาได้ที่ [link]" |
| Network error | "อินเทอร์เน็ตมีปัญหา ลองใหม่อีกครั้งนะครับ" |
| Permission denied | "ไม่มีสิทธิ์เข้าถึง ลองเช็ค permission ดูครับ" |
| Database connection | "เชื่อมต่อ database ไม่ได้ เช็ค .env ดูครับ" |

---

## Common Error Patterns & Auto-Fix

### TypeScript Errors

```typescript
// Error: Cannot find module '@/components/ui/button'
// Auto-Fix: Check if file exists, create if missing, or fix import path

// Error: Type 'string' is not assignable to type 'number'
// Auto-Fix: Convert type or fix the assignment

// Error: Property 'xxx' does not exist on type 'yyy'
// Auto-Fix: Add property to type definition or fix typo

// Error: 'xxx' is declared but its value is never read
// Auto-Fix: Remove unused variable or use it
```

### React Errors

```typescript
// Error: React Hook "useState" cannot be called at the top level
// Auto-Fix: Move inside component

// Error: Each child in a list should have a unique "key" prop
// Auto-Fix: Add key prop

// Error: Cannot update a component while rendering
// Auto-Fix: Move state update to useEffect

// Error: Rendered more hooks than during the previous render
// Auto-Fix: Fix conditional hook usage
```

### Next.js Errors

```typescript
// Error: 'use client' must be the first line
// Auto-Fix: Move directive to top

// Error: Metadata export is only supported in Server Components
// Auto-Fix: Remove 'use client' or move metadata

// Error: Dynamic server usage
// Auto-Fix: Add appropriate export const
```

### Supabase Errors

```typescript
// Error: Invalid API key
// Friendly: "API key ไม่ถูกต้อง ลองเช็ค SUPABASE_ANON_KEY ใน .env ครับ"

// Error: JWT expired
// Auto-Fix: Refresh token automatically

// Error: Row Level Security violation
// Friendly: "ไม่มีสิทธิ์เข้าถึงข้อมูลนี้ อาจต้องเช็ค RLS policy ครับ"
```

---

## Auto-Fix Loop

When error occurs during task:

```
1. Detect error
2. Identify error type
3. Attempt auto-fix
4. Run/build again
5. New error? → Go to step 1 (max 5 attempts)
6. Still failing? → Translate and tell user
```

**Implementation:**

```markdown
## Internal Process (User doesn't see this)

🔄 Attempt 1: TypeError - fixed import
🔄 Attempt 2: Missing type - added interface
🔄 Attempt 3: Build success!

## User Sees

"✅ เสร็จแล้วครับ!"
```

---

## Error Translation Dictionary

### Build Errors

| Raw Error | Friendly Translation |
|-----------|---------------------|
| `Module not found` | (Silent fix - install/create) |
| `Unexpected token` | (Silent fix - fix syntax) |
| `ENOENT: no such file` | (Silent fix - create file) |
| `Port already in use` | "Port ถูกใช้อยู่ ลองปิดโปรแกรมอื่นหรือเปลี่ยน port ครับ" |
| `Out of memory` | "Memory ไม่พอ ลองปิดโปรแกรมอื่นครับ" |

### Runtime Errors

| Raw Error | Friendly Translation |
|-----------|---------------------|
| `undefined is not a function` | (Silent fix - check the call) |
| `Cannot read properties of undefined` | (Silent fix - add null check) |
| `Maximum call stack exceeded` | (Silent fix - fix recursion) |
| `Network request failed` | "เชื่อมต่อไม่ได้ ลองเช็คอินเทอร์เน็ตครับ" |
| `CORS error` | (Silent fix - add API route proxy) |

### Database Errors

| Raw Error | Friendly Translation |
|-----------|---------------------|
| `Connection refused` | "เชื่อมต่อ database ไม่ได้ ลองเช็ค connection string ครับ" |
| `Duplicate key` | (Silent fix - handle upsert) |
| `Foreign key constraint` | (Silent fix - adjust order of operations) |
| `Permission denied` | "ไม่มีสิทธิ์ ลองเช็ค RLS policy ครับ" |

---

## User-Facing Error Format

When error MUST be shown to user:

```markdown
⚠️ **ต้องการความช่วยเหลือ**

[Friendly explanation in 1-2 sentences]

**สิ่งที่ต้องทำ:**
1. [Step 1]
2. [Step 2]

**ตัวอย่าง:**
[Show example if helpful]

พอทำเสร็จแล้วบอกนะครับ จะทำต่อให้ครับ 👍
```

---

## Example: Complete Error Handling Flow

```
User: /toh-dev ทำให้ปุ่ม save ทำงาน

AI: (Internal - user doesn't see)
    → Writing save function
    → Error: Cannot find 'useProductStore'
    → Auto-fix: Import useProductStore
    → Error: Type mismatch in Product
    → Auto-fix: Update type definition
    → Error: Missing 'id' field
    → Auto-fix: Add id generation
    → Build success!

AI: (User sees)
    "✅ ทำให้ปุ่ม save ทำงานได้แล้วครับ!
    
    ⚙️ สิ่งที่เพิ่ม:
    - บันทึกข้อมูลลง store
    - แสดง toast เมื่อบันทึกสำเร็จ
    - Validation ก่อนบันทึก
    
    💡 แนะนำขั้นตอนถัดไป:
    1. /toh-connect เชื่อม database จริง
    2. /toh-test ทดสอบการทำงาน
    3. /toh-ui เพิ่มฟอร์มแก้ไข"
```

---

## Integration with Test Agent

When `/toh-test` runs:

```
Test fails
    ↓
Analyze failure reason
    ↓
Auto-fix silently
    ↓
Re-run test
    ↓
Repeat until pass (max 5 attempts)
    ↓
Report: "✅ ทดสอบผ่านหมดแล้วครับ!"
```

User should NOT see individual test failures during auto-fix loop.

---

## Configuration (Future)

Allow users to configure error verbosity in `.toh/config.json`:

```json
{
  "errorHandling": {
    "verbosity": "minimal",  // "minimal" | "normal" | "verbose"
    "autoFixAttempts": 5,
    "showFixedErrors": false
  }
}
```

---

## Anti-Patterns (Don't Do)

❌ **Don't show raw stack traces**
```
Bad: "Error: Cannot read properties of undefined (reading 'map')
     at Array.map (<anonymous>)
     at ProductList (/app/components/ProductList.tsx:15:23)"

Good: (Fix silently) or "ข้อมูลยังไม่พร้อม ผมแก้ให้รอข้อมูลก่อนแล้วครับ"
```

❌ **Don't blame the user**
```
Bad: "คุณลืมใส่ API key"
Good: "ต้องใส่ API key ก่อนนะครับ ไปเอาได้ที่..."
```

❌ **Don't give up too easily**
```
Bad: (1 error) "มี error ครับ แก้ไม่ได้"
Good: (Try 5 times, fix silently, succeed)
```

---

*Last Updated: 2024-12-03*
