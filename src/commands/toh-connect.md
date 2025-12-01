---
command: /toh:connect
aliases: ["/toh:c"]
description: >
  เชื่อมต่อ app กับ Supabase backend
  สร้าง schema, RLS policies, และ replace mock API
trigger: /toh:connect หรือ /toh:c
---

# /toh:connect - Connect Backend

## Signature Command 🔌

```
/toh:connect [service]
/toh:c [service]
```

## What Happens

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md
   ├── .toh/memory/summary.md
   └── .toh/memory/decisions.md
   (ถ้าไม่มี → สร้างใหม่)

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
   ├── อัพเดท active.md
   ├── เพิ่ม decisions.md (backend decisions)
   └── อัพเดท summary.md
```

## Example Prompts

```bash
# Basic connection
/toh:connect supabase

# Specific tables
/toh:c เชื่อม products และ orders

# With auth
/toh:connect supabase พร้อม auth

# With storage
/toh:c เพิ่ม image upload ไป Supabase Storage
```

## Output Format

```markdown
## ✅ เชื่อม Supabase เรียบร้อยค่ะ!

### สร้างไฟล์:
- `lib/supabase.ts` - Client configuration
- `lib/api/products.ts` - Updated with real queries
- `supabase/schema.sql` - Copy ไป SQL Editor

### ขั้นตอนถัดไป:

1. **สร้าง Supabase Project**
   - ไปที่ https://supabase.com/dashboard
   - Create new project

2. **รัน Schema**
   - ไป SQL Editor
   - Paste เนื้อหาจาก `supabase/schema.sql`
   - Run

3. **เพิ่ม Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

4. **ทดสอบ**
   - Refresh app
   - CRUD ควรทำงานกับ database จริงแล้ว
```

## Supported Services

| Service | Command |
|---------|---------|
| Supabase (default) | `/toh:c` or `/toh:c supabase` |
| Supabase Auth | `/toh:c auth` |
| Supabase Storage | `/toh:c storage` |
| Supabase Realtime | `/toh:c realtime` |

## Rules

1. **ALWAYS** preserve existing function signatures
2. **ALWAYS** include RLS policies
3. **ALWAYS** generate SQL file (don't auto-execute)
4. **NEVER** hardcode credentials
5. **NEVER** disable RLS
