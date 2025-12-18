# 💡 Smart Suggestions Skill

> **Purpose:** AI proactively suggests next steps after completing tasks
> **Version:** 1.0.0
> **Author:** Toh Framework Team

## Overview

This skill enables AI to provide intelligent, context-aware suggestions after completing each task. Users never have to think "what's next?" - AI guides them through the entire development journey.

## Core Principle

```
AI completes a task
    ↓
Analyze current project state
    ↓
Suggest 2-3 logical next steps
    ↓
User picks one (or asks for something else)
```

**PROACTIVE, NOT REACTIVE** - AI anticipates needs before user asks.

---

## Suggestion Framework

### After Task Completion Template

```markdown
✅ **[Task Name]** เสร็จแล้วครับ!

[Brief summary of what was done]

💡 **แนะนำขั้นตอนถัดไป:**
1. [Most logical next step] ← แนะนำ
2. [Alternative option]
3. [Another option]

พิมพ์ตัวเลข หรือบอกว่าอยากทำอะไรต่อครับ
```

---

## Suggestion Rules by Phase

### Phase 1: Project Creation (`/toh-vibe`)

**After creating new project:**

```markdown
✅ **สร้างโปรเจค [Name]** เสร็จแล้วครับ!

📁 สร้างไฟล์ไปแล้ว:
- app/page.tsx (Homepage)
- app/[pages]/page.tsx (Feature pages)
- components/ (UI components)
- lib/mock-data.ts (Mock data)

💡 **แนะนำขั้นตอนถัดไป:**
1. `/toh-design` ปรับ UI ให้สวยขึ้น ← แนะนำ
2. `/toh-dev` เพิ่ม logic ให้ทำงานได้จริง
3. `/toh-connect` เชื่อม Supabase database

พิมพ์ตัวเลข หรือบอกว่าอยากทำอะไรต่อครับ
```

### Phase 2: UI Creation (`/toh-ui`)

**After creating UI components:**

```markdown
✅ **สร้าง [Component/Page Name]** เสร็จแล้วครับ!

📁 สร้าง/แก้ไขไฟล์:
- [file list]

💡 **แนะนำขั้นตอนถัดไป:**
1. `/toh-dev` เพิ่ม logic ให้ [component] ทำงานได้ ← แนะนำ
2. `/toh-ui` สร้างหน้า [related page] ต่อ
3. `/toh-design` ปรับ design ให้ดูดีขึ้น

พิมพ์ตัวเลข หรือบอกว่าอยากทำอะไรต่อครับ
```

### Phase 3: Logic Implementation (`/toh-dev`)

**After adding logic:**

```markdown
✅ **เพิ่ม logic [Feature]** เสร็จแล้วครับ!

⚙️ สิ่งที่เพิ่ม:
- [what was implemented]

💡 **แนะนำขั้นตอนถัดไป:**
1. `/toh-test` ทดสอบว่าทำงานถูกต้อง ← แนะนำ
2. `/toh-connect` เชื่อมกับ database จริง
3. `/toh-dev` เพิ่ม feature [next feature]

พิมพ์ตัวเลข หรือบอกว่าอยากทำอะไรต่อครับ
```

### Phase 4: Design Polish (`/toh-design`)

**After design improvements:**

```markdown
✅ **ปรับ design** เสร็จแล้วครับ!

✨ สิ่งที่ปรับ:
- [design changes]

💡 **แนะนำขั้นตอนถัดไป:**
1. `/toh-test` ทดสอบ responsive ทุก breakpoint ← แนะนำ
2. `/toh-ui` สร้างหน้าถัดไป
3. `/toh-connect` เชื่อม database

พิมพ์ตัวเลข หรือบอกว่าอยากทำอะไรต่อครับ
```

### Phase 5: Testing (`/toh-test`)

**After running tests:**

```markdown
✅ **ทดสอบเสร็จแล้วครับ!**

🧪 ผลการทดสอบ:
- ✅ [passed tests]
- (หรือ) 🔧 พบ error และแก้ไขแล้ว [count] จุด

💡 **แนะนำขั้นตอนถัดไป:**
1. `/toh-connect` เชื่อม Supabase ← แนะนำ (ถ้ายังไม่ได้เชื่อม)
2. `/toh-ship` deploy ขึ้น production
3. `/toh-ui` เพิ่ม feature ใหม่

พิมพ์ตัวเลข หรือบอกว่าอยากทำอะไรต่อครับ
```

### Phase 6: Backend Connection (`/toh-connect`)

**After connecting backend:**

```markdown
✅ **เชื่อม Supabase** เสร็จแล้วครับ!

🔌 สิ่งที่เชื่อม:
- [tables, auth, RLS]

💡 **แนะนำขั้นตอนถัดไป:**
1. `/toh-test` ทดสอบกับข้อมูลจริง ← แนะนำ
2. `/toh-ship` deploy ขึ้น production
3. เพิ่ม integration อื่นๆ (payment, email)

พิมพ์ตัวเลข หรือบอกว่าอยากทำอะไรต่อครับ
```

### Phase 7: Deployment (`/toh-ship`)

**After deployment:**

```markdown
🚀 **Deploy สำเร็จ!**

🌐 URLs:
- Production: [url]
- Admin: [url]/admin

💡 **แนะนำขั้นตอนถัดไป:**
1. ทดสอบบน production จริง
2. ตั้งค่า custom domain
3. เพิ่ม analytics (Google Analytics, Plausible)
4. เพิ่ม feature ใหม่

ยินดีด้วยครับ! 🎉 มีอะไรให้ช่วยต่อไหมครับ?
```

---

## Context-Aware Suggestions

### Based on Business Type

AI should tailor suggestions based on detected business type:

| Business Type | Priority Suggestions |
|--------------|---------------------|
| F&B | "เพิ่มระบบ payment", "ทำ receipt/bill" |
| E-commerce | "เชื่อม Stripe", "ทำ email confirmation" |
| Booking | "เพิ่ม calendar sync", "ทำ reminder notification" |
| SaaS | "เพิ่ม user roles", "ทำ billing/subscription" |

### Based on Missing Features

AI should detect what's missing:

```
Project has: UI ✅, Mock Data ✅
Project missing: Real Database ❌, Auth ❌

Suggestion: "แนะนำให้เชื่อม Supabase เพื่อใช้ข้อมูลจริงครับ"
```

### Based on Project Maturity

| Stage | Focus |
|-------|-------|
| Early (UI only) | More UI, Design polish |
| Mid (UI + Logic) | Testing, Backend connection |
| Late (Full stack) | Deployment, Polish, New features |

---

## Quick Response Handling

When user responds with number:

| User Input | Action |
|------------|--------|
| `1` | Execute first suggestion |
| `2` | Execute second suggestion |
| `3` | Execute third suggestion |
| `ต่อเลย` / `continue` | Execute first (recommended) suggestion |
| `อื่นๆ` / Other text | Treat as new request |

---

## Integration with Memory

After giving suggestions, update `.toh/memory/active.md`:

```markdown
## Next Steps (AI Suggested)
- [ ] [Suggestion 1] ← Recommended
- [ ] [Suggestion 2]
- [ ] [Suggestion 3]

## User's Choice
[Will be updated when user responds]
```

---

## Anti-Patterns (Don't Do)

❌ **Don't overwhelm with too many options**
```
Bad: "คุณสามารถทำได้ 10 อย่าง: 1. ... 2. ... 3. ..."
Good: "แนะนำ 3 ขั้นตอนถัดไป: 1. ... 2. ... 3. ..."
```

❌ **Don't suggest irrelevant things**
```
Bad: (After creating UI) "ลอง deploy ไหมครับ?"
Good: (After creating UI) "เพิ่ม logic ให้ทำงานได้ไหมครับ?"
```

❌ **Don't repeat same suggestions**
```
Bad: Keep suggesting "/toh-design" after user already polished design
Good: Track what's done and suggest new things
```

---

## Example Flow

```
User: /toh-vibe ร้านกาแฟ

AI: ✅ สร้างระบบร้านกาแฟเสร็จแล้วครับ!
    [shows what was created]
    
    💡 แนะนำขั้นตอนถัดไป:
    1. /toh-design ปรับ UI ให้สวยขึ้น ← แนะนำ
    2. /toh-dev เพิ่ม logic POS
    3. /toh-connect เชื่อม Supabase

User: 1

AI: (executes /toh-design)
    ✅ ปรับ design เสร็จแล้วครับ!
    [shows changes]
    
    💡 แนะนำขั้นตอนถัดไป:
    1. /toh-dev เพิ่ม logic POS ← แนะนำ
    2. /toh-test ทดสอบ responsive
    3. /toh-ui เพิ่มหน้า inventory

User: 1

AI: (continues the flow...)
```

---

*Last Updated: 2024-12-03*
