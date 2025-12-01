---
command: /toh:ship
aliases: ["/toh:s"]
description: >
  Deploy app ไป production
  รองรับ Vercel, Netlify, และอื่นๆ
trigger: /toh:ship หรือ /toh:s
---

# /toh:ship - Deploy to Production

## Signature Command 🚀

```
/toh:ship [platform]
/toh:s [platform]
```

## What Happens

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md
   ├── .toh/memory/summary.md
   └── .toh/memory/decisions.md
   (ดู project info + env vars ที่ต้องใช้)

1. PRE-FLIGHT Checks
   ├── npm run build (must pass)
   ├── npm run lint (should pass)
   ├── Check environment variables
   └── Verify .gitignore

2. PREPARE
   ├── Update next.config.js if needed
   ├── Create/update vercel.json
   └── Check for hardcoded localhost URLs

3. DEPLOY
   ├── Vercel: npx vercel --prod
   ├── Netlify: netlify deploy --prod
   └── Others: provide instructions

4. POST-DEPLOY
   ├── Verify live site works
   ├── Check environment variables are set
   └── Test critical flows

5. 🚨 SAVE MEMORY (MANDATORY!)
   ├── อัพเดท active.md (deployed URL)
   ├── เพิ่ม decisions.md (deployment config)
   └── อัพเดท summary.md (production URL)
```

## Example Prompts

```bash
# Default (Vercel)
/toh:ship

# Specific platform
/toh:s vercel
/toh:ship netlify

# With checks
/toh:s deploy พร้อม check ทุกอย่างก่อน
```

## Output Format

```markdown
## 🚀 Deploy เรียบร้อยค่ะ!

### Pre-flight:
- ✅ Build passed
- ✅ No TypeScript errors
- ✅ Environment variables ready

### Deployed to:
**https://your-app.vercel.app**

### Environment Variables ที่ต้องตั้งใน Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_LIFF_ID=xxx (ถ้าใช้ LINE)
```

### ขั้นตอนถัดไป:

1. **ตั้ง Environment Variables**
   - ไป Vercel Dashboard → Settings → Environment Variables
   - เพิ่ม variables ด้านบน

2. **Custom Domain (optional)**
   - ไป Settings → Domains
   - เพิ่ม domain ของคุณ

3. **ทดสอบ**
   - เปิด production URL
   - ทดสอบ features หลัก
   - ตรวจสอบ mobile view
```

## Supported Platforms

| Platform | Command | Best For |
|----------|---------|----------|
| Vercel (default) | `/toh:s` | Next.js apps |
| Netlify | `/toh:s netlify` | Static sites |
| Railway | `/toh:s railway` | Full-stack apps |
| Cloudflare Pages | `/toh:s cloudflare` | Edge deployment |

## Pre-Deploy Checklist

- [ ] `npm run build` passes
- [ ] No console.log in production code  
- [ ] Environment variables documented
- [ ] No hardcoded localhost URLs
- [ ] .gitignore includes .env.local
- [ ] Supabase RLS policies enabled

## Rules

1. **ALWAYS** run build before deploy
2. **ALWAYS** check for environment variables
3. **ALWAYS** verify site works after deploy
4. **NEVER** deploy with build errors
5. **NEVER** commit .env files
