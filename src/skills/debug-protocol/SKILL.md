# 🔧 Debug Protocol Skill

> **Purpose:** Systematic debugging - ไม่ guess ไปเรื่อยๆ แต่ debug อย่างมีระบบ
> **Version:** 1.0.0
> **Created:** 2025-12-03

---

## 🚨 Core Problem This Skill Solves

```
❌ BAD: AI guess & retry loop
Analyzing layout height issues...
Analyzing layout height and spacing issues...
Analyzing bottom spacing issues...
Analyzing container and content height behavior...
(วน 20 รอบ ไม่เจอ root cause)

✅ GOOD: Systematic Debug Protocol
1. Reproduce → 2. Isolate → 3. Identify → 4. Fix → 5. Verify
(จบใน 3-5 attempts)
```

---

## 🎯 The 3-5-Rewrite Rule

```
┌─────────────────────────────────────────────────────────────┐
│  ATTEMPT 1-3: Normal Debug                                  │
│  - Try different approaches                                 │
│  - Track what was tried                                     │
├─────────────────────────────────────────────────────────────┤
│  ATTEMPT 4-5: Escalate                                      │
│  - Binary search (remove half the code)                     │
│  - Minimal reproduction                                     │
├─────────────────────────────────────────────────────────────┤
│  AFTER 5 ATTEMPTS: Recommend Rewrite                        │
│  - "ลองแก้มา 5 รอบแล้วครับ แนะนำให้ลบแล้วเขียนใหม่"          │
│  - Clean slate approach                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Debug Tracking (MANDATORY)

Every debug attempt MUST be tracked:

```markdown
## 🐛 Debug Log

**Problem:** [อธิบายปัญหา]
**File(s):** [ไฟล์ที่เกี่ยวข้อง]

### Attempt 1
- **Hypothesis:** [คิดว่าปัญหาคืออะไร]
- **Action:** [ทำอะไร]
- **Result:** ❌ ไม่สำเร็จ / ✅ สำเร็จ
- **Learning:** [เรียนรู้อะไร]

### Attempt 2
...
```

**Save to:** `.toh/memory/debug-log.md` (สร้างใหม่ถ้าไม่มี)

---

## 🔍 Debug Protocol - Step by Step

### Step 1: REPRODUCE (ทำซ้ำปัญหา)

```markdown
ก่อนแก้ ต้องเห็นปัญหาก่อน:

1. ถาม User:
   - "ปัญหาเกิดตรงไหนครับ? (URL หรือ หน้าอะไร)"
   - "ทำอะไรแล้วเกิดปัญหา?"

2. ถ้ามี dev server:
   - เปิด http://localhost:3000/[path]
   - ดูว่าเห็นปัญหาจริงไหม

3. ถ้าไม่มี dev server:
   - "ช่วยเปิด dev server ก่อนได้ไหมครับ: npm run dev"
```

### Step 2: ISOLATE (แยกส่วนที่มีปัญหา)

```markdown
หาว่าปัญหาอยู่ตรงไหน:

CSS/Layout Issues:
├── Check parent container (overflow, height)
├── Check immediate children (flex, grid, position)
├── Check global styles (body, html, main)
└── Use DevTools: "ลอง inspect element ดูได้ไหมครับ?"

JavaScript Issues:
├── Check console errors first
├── Add console.log at key points
├── Check network tab for API errors
└── Check state management (Zustand store)

Build/Compile Issues:
├── Read the FULL error message
├── Check the exact file:line mentioned
├── Clear cache: rm -rf .next && npm run dev
└── Check dependencies: npm ls [package]
```

### Step 3: IDENTIFY (ระบุ Root Cause)

```markdown
ก่อนแก้ ต้องบอกได้ว่า:

"ปัญหาคือ [X] เพราะ [Y]"

ตัวอย่าง:
- "ปัญหาคือ scroll เกิน เพราะ container ใช้ h-screen แต่ child มี padding"
- "ปัญหาคือ API error เพราะ CORS ไม่ได้ setup"
- "ปัญหาคือ render ซ้ำ เพราะ useEffect dependency ผิด"

❌ ห้ามแก้ถ้ายังบอกไม่ได้ว่า root cause คืออะไร
```

### Step 4: FIX (แก้ไข)

```markdown
แก้ทีละจุด:

1. แก้ไข 1 อย่างต่อ 1 attempt
2. อธิบายว่าแก้อะไร ทำไม
3. บันทึก attempt ลง debug-log.md

ตัวอย่าง:
"แก้ไข app/layout.tsx:
- เปลี่ยน h-screen → min-h-screen
- เพิ่ม overflow-hidden ที่ main
เพราะ h-screen + padding ทำให้เกิน viewport"
```

### Step 5: VERIFY (ตรวจสอบ)

```markdown
หลังแก้ ต้องยืนยัน:

1. Hot Reload:
   - รอ 3 วินาที
   - Refresh browser (Cmd+R)

2. ถ้าไม่เห็นผล:
   - Clear .next: rm -rf .next
   - Restart server: npm run dev
   - Hard refresh: Cmd+Shift+R

3. ยืนยันกับ User:
   - "ลองดูหน้า [URL] ยังมีปัญหาอยู่ไหมครับ?"

4. ถ้ายังมีปัญหา → กลับไป Step 2 (Attempt +1)
```

---

## 🎨 Common CSS/Layout Debug Patterns

### Problem: Scroll เกิน / White space ด้านล่าง

```markdown
## Debug Checklist

1. Check viewport height:
   □ html, body { height: 100%; overflow: hidden; }
   □ ไม่ใช้ h-screen กับ padding พร้อมกัน

2. Check flex containers:
   □ Parent มี min-h-0 ไหม (flex item height issue)
   □ Child มี flex-shrink-0 ที่ไม่ควรมีไหม

3. Check position:
   □ มี position: fixed/absolute ที่ทำให้เนื้อหาหลุดไหม
   □ มี negative margin ไหม

4. Check main layout:
   □ app/layout.tsx → body, main container
   □ components/layout/ → header, sidebar heights

## Quick Fixes to Try

// Option 1: Contain everything
<body className="h-screen overflow-hidden">
  <main className="h-full overflow-auto">

// Option 2: Min-height approach  
<body className="min-h-screen flex flex-col">
  <main className="flex-1">

// Option 3: Fixed header/footer
<div className="h-screen flex flex-col">
  <header className="h-16 flex-shrink-0">
  <main className="flex-1 overflow-auto">
  <footer className="h-12 flex-shrink-0">
```

---

## ⚙️ Common JavaScript Debug Patterns

### Problem: Function ไม่ทำงาน

```markdown
## Debug Steps

1. Check if function is called:
   console.log('Function called with:', args)

2. Check if state updates:
   console.log('State before:', state)
   // ... action
   console.log('State after:', state)

3. Check async/await:
   - มี await ครบไหม
   - มี try/catch ไหม
   - Promise reject แล้วไม่ได้ handle ไหม

4. Check event handlers:
   - onClick vs onClick={() => fn()}
   - Event bubbling/propagation
```

---

## 🔄 Multi-AI Handoff Protocol

เมื่อสลับ AI ใน IDE เดียวกัน (Claude → Codex → Gemini → Cursor):

### AI ใหม่ต้องทำ:

```markdown
1. อ่าน .toh/memory/debug-log.md (ถ้ามี)
   - ดูว่าลองอะไรไปแล้วบ้าง
   - ไม่ทำซ้ำสิ่งที่ไม่สำเร็จ

2. ถาม User:
   - "เห็นว่าลองแก้ [ปัญหา] มา [N] รอบแล้ว"
   - "ลองวิธี [X, Y, Z] ไปแล้ว ยังไม่สำเร็จ"
   - "จะลองวิธีใหม่คือ [A] ได้ไหมครับ?"

3. ถ้า attempts >= 5:
   - "ลองมาหลายรอบแล้ว แนะนำให้ลบแล้วเขียนใหม่ครับ"
   - "จะได้ clean slate ไม่มี legacy issues"
```

### ก่อนส่งต่อ AI อื่น:

```markdown
1. อัพเดท debug-log.md:
   - สิ่งที่ลองแล้ว
   - สิ่งที่เรียนรู้
   - สิ่งที่ยังไม่ได้ลอง

2. บอก User:
   - "ลองมา [N] รอบแล้ว ยังแก้ไม่ได้"
   - "ถ้าจะลอง AI อื่น ให้เปิด debug-log.md ให้ดูด้วยนะครับ"
```

---

## 🚫 Anti-Patterns (สิ่งที่ห้ามทำ)

```markdown
❌ Guess & Retry Loop
Analyzing layout issues...
Analyzing layout issues...
Analyzing layout issues...
(วนไปเรื่อยๆ ไม่มี systematic approach)

❌ ไม่ track attempts
แก้ไปเรื่อยๆ ไม่รู้ว่าลองอะไรไปแล้วบ้าง

❌ ไม่ verify หลังแก้
แก้แล้วบอก "เสร็จแล้ว" โดยไม่ดูว่าจริงไหม

❌ แก้หลายอย่างพร้อมกัน
แก้ 5 จุดใน 1 attempt ไม่รู้ว่าจุดไหนที่แก้ได้

❌ ไม่บอก root cause
แก้ได้แต่ไม่รู้ว่าทำไมถึงได้
```

---

## ✅ Best Practices

```markdown
✅ Track ทุก attempt
บันทึกว่าลองอะไร ผลเป็นยังไง

✅ แก้ทีละอย่าง
1 attempt = 1 change = 1 verification

✅ บอก root cause
"ปัญหาคือ X เพราะ Y แก้โดย Z"

✅ Verify ทุกครั้ง
ดูว่าแก้ได้จริงก่อนบอก User

✅ รู้เมื่อไหร่ควรหยุด
5 attempts แล้วยังไม่ได้ → แนะนำ rewrite
```

---

## 📝 Debug Log Template

สร้างไฟล์ `.toh/memory/debug-log.md`:

```markdown
# 🐛 Debug Log

## Current Issue
**Problem:** [อธิบายปัญหา]
**Page/Component:** [URL หรือ file path]
**Started:** [วันที่]
**Status:** 🔴 In Progress / 🟢 Resolved

---

## Attempts

### Attempt 1 - [AI Name] - [Time]
- **Hypothesis:** 
- **Action:** 
- **Files Changed:** 
- **Result:** ❌/✅
- **Learning:** 

### Attempt 2 - [AI Name] - [Time]
...

---

## Resolution
**Root Cause:** [อธิบาย]
**Solution:** [วิธีแก้]
**Resolved By:** [AI Name]
**Time to Resolve:** [ระยะเวลา]
```

---

## 🔗 Integration with Other Skills

| Skill | Integration |
|-------|-------------|
| `error-handling` | Debug สำหรับ errors ที่ auto-fix ไม่ได้ |
| `session-recovery` | อ่าน debug-log.md เมื่อเริ่ม session |
| `progress-tracking` | แสดง debug attempts ใน progress |

---

## 💡 When to Use This Skill

```markdown
TRIGGERS:
- User บอก "แก้ไม่ได้"
- Error เดิมเกิดซ้ำหลังแก้
- ลอง auto-fix แล้วไม่สำเร็จ
- User ถาม "ทำไมถึงเป็นแบบนี้"
- Bug ที่ไม่ชัดเจนว่าเกิดจากอะไร

NOT TRIGGERS:
- Simple typo fix
- Clear error message with obvious fix
- Feature request (ไม่ใช่ bug)
```
