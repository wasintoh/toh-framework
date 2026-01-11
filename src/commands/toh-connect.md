---
command: /toh-connect
aliases: ["/toh-c"]
description: Connect app to Supabase backend with schema and RLS policies
trigger: /toh-connect or /toh-c
---

# /toh-connect - Connect Backend

## Signature Command 🔌

```
/toh-connect [service]
/toh-c [service]
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
   └── ~/.claude/skills/backend-engineer/SKILL.md

2. SETUP Supabase
   ├── npm install @supabase/supabase-js
   ├── Create lib/supabase.ts
   └── Add env variables template

3. GENERATE Schema
   ├── Analyze existing TypeScript types
   ├── Create SQL for tables
   ├── Create RLS policies
   └── Create triggers (updated_at, etc.)

4. MIGRATE API
   ├── Replace mock functions with Supabase queries
   ├── Keep same function signatures
   └── Add error handling

5. OUTPUT
   ├── SQL file for Supabase dashboard
   ├── Updated API functions
   └── .env.example with required vars

6. 🚨 SAVE MEMORY (MANDATORY!)
   ├── Update active.md (current state)
   ├── Update changelog.md (backend changes)
   ├── Update agents-log.md (agent activity)
   ├── Update decisions.md (backend decisions)
   └── Update architecture.md (new services)
```

## Example Prompts

```bash
# Basic connection
/toh-connect supabase

# Specific tables
/toh-c connect products and orders

# With auth
/toh-connect supabase with auth

# With storage
/toh-c add image upload to Supabase Storage
```

## Output Format

```markdown
## ✅ Supabase connected successfully!

### Files created:
- `lib/supabase.ts` - Client configuration
- `lib/api/products.ts` - Updated with real queries
- `supabase/schema.sql` - Copy to SQL Editor

### Next steps:

1. **Create Supabase Project**
   - Go to https://supabase.com/dashboard
   - Create new project

2. **Run Schema**
   - Go to SQL Editor
   - Paste content from `supabase/schema.sql`
   - Run

3. **Add Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

4. **Test**
   - Refresh app
   - CRUD should work with real database now
```

## Supported Services

| Service | Command |
|---------|---------|
| Supabase (default) | `/toh-c` or `/toh-c supabase` |
| Supabase Auth | `/toh-c auth` |
| Supabase Storage | `/toh-c storage` |
| Supabase Realtime | `/toh-c realtime` |

## Rules

1. **ALWAYS** preserve existing function signatures
2. **ALWAYS** include RLS policies
3. **ALWAYS** generate SQL file (don't auto-execute)
4. **NEVER** hardcode credentials
5. **NEVER** disable RLS
