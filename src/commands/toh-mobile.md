---
command: /toh-mobile
aliases: ["/toh-m"]
description: Create mobile app with Expo, NativeWind (Tailwind) and Zustand
trigger: /toh-mobile or /toh-m
---

# /toh-mobile - Expo Mobile App

## Signature Command 📱

```
/toh-mobile [description]
/toh-m [description]
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
   └── ~/.claude/skills/platform-specialist/SKILL.md (Expo section)

2. CREATE Project
   ├── npx create-expo-app [name] --template tabs
   └── cd [name]

3. SETUP Stack
   ├── npx expo install nativewind
   ├── npm install zustand
   ├── npm install @supabase/supabase-js
   └── Configure babel + tailwind

4. GENERATE Screens
   ├── app/(tabs)/ - Tab screens
   ├── app/[feature]/ - Feature screens
   └── components/ - RN components

5. RUN
   └── npx expo start

6. 🚨 SAVE MEMORY (MANDATORY!)
   ├── Update active.md (current state)
   ├── Update changelog.md (mobile setup)
   ├── Update agents-log.md (agent activity)
   ├── Update architecture.md (Expo structure)
   └── Update components.md (mobile screens)
```

## Example Prompts

```bash
# New mobile app
/toh-mobile expense tracker app

# Specific features
/toh-m expense tracking app with tabs: Home, Add Entry, Reports

# Convert from web concept
/toh-mobile convert concept from web app to mobile
```

## Output Format

```markdown
## ✅ Mobile App ready!

### Created:
- Expo project with tabs template
- NativeWind configured
- Zustand store ready

### Screens:
- `app/(tabs)/index.tsx` - Home
- `app/(tabs)/add.tsx` - Add Entry
- `app/(tabs)/reports.tsx` - Reports

### Run:
```bash
cd [project-name]
npx expo start
```

### Test:
- iOS: Press `i` (requires Xcode)
- Android: Press `a` (requires Android Studio)
- Expo Go: Scan QR code

### Next:
- `/toh-ui` add screens
- `/toh-connect` connect Supabase
```

## Mobile Stack

| Web (Next.js) | Mobile (Expo) |
|---------------|---------------|
| shadcn/ui Button | Custom Pressable |
| shadcn/ui Card | Custom View |
| shadcn/ui Input | TextInput |
| Tailwind | NativeWind |
| Next Router | Expo Router |

## Rules

1. **ALWAYS** use Expo Router for navigation
2. **ALWAYS** use NativeWind for styling
3. **ALWAYS** consider touch targets (min 44px)
4. **NEVER** use web-specific components
5. **NEVER** assume hover states work
