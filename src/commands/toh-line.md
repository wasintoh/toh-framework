---
command: /toh:line
aliases: ["/toh:l"]
description: >
  แปลง web app เป็น LINE Mini App
  หรือสร้าง LINE Mini App ใหม่พร้อม LIFF integration
trigger: /toh:line หรือ /toh:l
---

# /toh:line - LINE Mini App

## Signature Command 💚

```
/toh:line [feature]
/toh:l [feature]
```

## What Happens

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md
   ├── .toh/memory/summary.md
   └── .toh/memory/decisions.md
   (ดู context โปรเจคปัจจุบัน)

1. READ Skills
   └── ~/.claude/skills/platform-specialist/SKILL.md (LINE section)

2. SETUP LIFF
   ├── npm install @line/liff
   ├── Create lib/liff.ts
   ├── Create providers/liff-provider.tsx
   └── Add LIFF initialization

3. ADD LINE Features
   ├── LIFF Login
   ├── Get Profile
   ├── Send Message
   ├── Share Target Picker
   └── Close Window

4. STYLE for LINE
   ├── LINE green (#06C755) as accent
   ├── Full-width buttons
   └── Mobile-optimized layout

5. CONNECT Auth (optional)
   └── LIFF → Supabase custom auth

6. 🚨 SAVE MEMORY (MANDATORY!)
   ├── อัพเดท active.md
   ├── เพิ่ม decisions.md (LINE config)
   └── อัพเดท summary.md (LINE integration)
```

## Example Prompts

```bash
# Convert existing app
/toh:line แปลงเป็น LINE Mini App

# With specific features
/toh:l เพิ่ม LINE login และ share feature

# New LINE app
/toh:line สร้างระบบจองคิวสำหรับ LINE OA

# Share functionality
/toh:l เพิ่มปุ่ม share ไป LINE
```

## Output Format

```markdown
## ✅ LINE Mini App พร้อมแล้วค่ะ!

### สร้าง/แก้ไข:
- `lib/liff.ts` - LIFF utilities
- `providers/liff-provider.tsx` - Context provider
- `app/layout.tsx` - เพิ่ม LiffProvider

### Features พร้อมใช้:
- 🔐 LINE Login (getProfile)
- 💬 Send Message
- 🔗 Share to friends
- ❌ Close LIFF window

### ขั้นตอน Setup:

1. **สร้าง LINE Login Channel**
   - ไป LINE Developers Console
   - Create LINE Login channel

2. **สร้าง LIFF App**
   - ไปที่ LINE Login channel
   - Add LIFF app
   - Endpoint URL: `https://your-domain.com`

3. **เพิ่ม Environment Variable**
   ```env
   NEXT_PUBLIC_LIFF_ID=1234567890-abcdefgh
   ```

4. **ทดสอบ**
   - Deploy ไป Vercel ก่อน
   - เปิดผ่าน LINE app (ไม่ใช่ browser)

### หมายเหตุ:
- LIFF ต้องเปิดผ่าน LINE app เท่านั้น
- ทดสอบบน localhost ได้แต่ features บางอย่างจะไม่ทำงาน
```

## LINE-Specific Components

```tsx
// LINE Button (green style)
<LineButton onClick={login}>เข้าสู่ระบบด้วย LINE</LineButton>

// LINE Profile Card
<LineProfileCard profile={profile} />

// Share Button
<ShareButton message="ลองใช้ app นี้สิ!" />
```

## Rules

1. **ALWAYS** add LiffProvider to root layout
2. **ALWAYS** handle non-LIFF environment gracefully
3. **ALWAYS** use LINE green (#06C755) for branding
4. **NEVER** assume LIFF features work in browser
5. **NEVER** call LIFF APIs before initialization
