---
command: /toh-line
aliases: ["/toh-l"]
description: Convert web app to LINE Mini App or create new LIFF integration
trigger: /toh-line or /toh-l
---

# /toh-line - LINE Mini App

## Signature Command 💚

```
/toh-line [feature]
/toh-l [feature]
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
   ├── Update active.md (current state)
   ├── Update changelog.md (LINE setup)
   ├── Update agents-log.md (agent activity)
   ├── Update decisions.md (LINE config)
   └── Update architecture.md (LIFF integration)
```

## Example Prompts

```bash
# Convert existing app
/toh-line convert to LINE Mini App

# With specific features
/toh-l add LINE login and share feature

# New LINE app
/toh-line create queue booking system for LINE OA

# Share functionality
/toh-l add share to LINE button
```

## Output Format

```markdown
## ✅ LINE Mini App ready!

### Created/Modified:
- `lib/liff.ts` - LIFF utilities
- `providers/liff-provider.tsx` - Context provider
- `app/layout.tsx` - Added LiffProvider

### Features ready:
- 🔐 LINE Login (getProfile)
- 💬 Send Message
- 🔗 Share to friends
- ❌ Close LIFF window

### Setup Steps:

1. **Create LINE Login Channel**
   - Go to LINE Developers Console
   - Create LINE Login channel

2. **Create LIFF App**
   - Go to LINE Login channel
   - Add LIFF app
   - Endpoint URL: `https://your-domain.com`

3. **Add Environment Variable**
   ```env
   NEXT_PUBLIC_LIFF_ID=1234567890-abcdefgh
   ```

4. **Test**
   - Deploy to Vercel first
   - Open via LINE app (not browser)

### Notes:
- LIFF must be opened via LINE app only
- Can test on localhost but some features won't work
```

## LINE-Specific Components

```tsx
// LINE Button (green style)
<LineButton onClick={login}>Login with LINE</LineButton>

// LINE Profile Card
<LineProfileCard profile={profile} />

// Share Button
<ShareButton message="Try this app!" />
```

## Rules

1. **ALWAYS** add LiffProvider to root layout
2. **ALWAYS** handle non-LIFF environment gracefully
3. **ALWAYS** use LINE green (#06C755) for branding
4. **NEVER** assume LIFF features work in browser
5. **NEVER** call LIFF APIs before initialization
