---
command: /toh-ship
aliases: ["/toh-s"]
description: Deploy app to production (Vercel, Netlify, and more)
trigger: /toh-ship or /toh-s
---

# /toh-ship - Deploy to Production

## Signature Command 🚀

```
/toh-ship [platform]
/toh-s [platform]
```

## What Happens

```
0. 🚨 READ MEMORY (MANDATORY - ALL 7 FILES!)
   ├── .toh/memory/active.md      (current task)
   ├── .toh/memory/summary.md     (project overview)
   ├── .toh/memory/decisions.md   (past decisions)
   ├── .toh/memory/changelog.md   (session changes)
   ├── .toh/memory/agents-log.md  (agent activity)
   ├── .toh/memory/architecture.md (project structure)
   └── .toh/memory/components.md  (existing components)

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
   ├── Update active.md (deployed URL)
   ├── Update changelog.md (deployment)
   ├── Update agents-log.md (agent activity)
   ├── Update decisions.md (deployment config)
   └── Update summary.md (production URL)
```

## Example Prompts

```bash
# Default (Vercel)
/toh-ship

# Specific platform
/toh-s vercel
/toh-ship netlify

# With checks
/toh-s deploy with full checks first
```

## Output Format

```markdown
## 🚀 Deployed successfully!

### Pre-flight:
- ✅ Build passed
- ✅ No TypeScript errors
- ✅ Environment variables ready

### Deployed to:
**https://your-app.vercel.app**

### Environment Variables to set in Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_LIFF_ID=xxx (if using LINE)
```

### Next Steps:

1. **Set Environment Variables**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add the variables above

2. **Custom Domain (optional)**
   - Go to Settings → Domains
   - Add your domain

3. **Test**
   - Open production URL
   - Test main features
   - Check mobile view
```

## Supported Platforms

| Platform | Command | Best For |
|----------|---------|----------|
| Vercel (default) | `/toh-s` | Next.js apps |
| Netlify | `/toh-s netlify` | Static sites |
| Railway | `/toh-s railway` | Full-stack apps |
| Cloudflare Pages | `/toh-s cloudflare` | Edge deployment |

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
