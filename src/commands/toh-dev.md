---
command: /toh-dev
aliases: ["/toh-d"]
description: Add logic, state management, TypeScript types, and CRUD operations
trigger: /toh-dev or /toh-d followed by description
---

# /toh-dev - Add Logic & State

## Signature Command ⚙️

```
/toh-dev [description]
/toh-d [description]
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
   ├── ~/.toh/skills/dev-engineer/SKILL.md
   └── ~/.toh/skills/security-engineer/SKILL.md

2. 🔐 QUICK SECURITY CHECK (before coding)
   ├── Scan for hardcoded secrets
   ├── Check for dangerous patterns
   └── If CRITICAL found → WARN before proceeding

3. ANALYZE Request
   ├── Need types? → Create in types/
   ├── Need state? → Create Zustand store in stores/
   ├── Need forms? → Add React Hook Form + Zod
   └── Need CRUD? → Create in lib/api/

4. IMPLEMENT
   ├── TypeScript types (strict, no any)
   ├── Zustand store with actions
   ├── Zod validation schemas
   ├── Mock CRUD operations
   └── Custom hooks if needed

5. CONNECT to UI
   └── Wire up components to stores/forms

6. 🔐 POST-IMPLEMENTATION SECURITY CHECK
   ├── Verify no secrets in code
   ├── Check SQL queries are parameterized
   ├── Ensure proper input validation
   └── If issues found → Fix before completing

7. 🚨 SAVE MEMORY (MANDATORY!)
   ├── Update active.md (current state)
   ├── Update changelog.md (dev changes)
   ├── Update agents-log.md (agent activity)
   ├── Update architecture.md (if structure changed)
   ├── Update components.md (if new components/hooks)
   └── Update decisions.md (if technical decisions made)
```

## Example Prompts

```bash
# Add state management
/toh-dev add state for cart management

# Add form logic
/toh-d form validation for product form

# Add CRUD
/toh-dev CRUD operations for orders

# Add specific function
/toh-d function to calculate total with discount

# Add custom hook
/toh-dev hook for debounced search
```

## Output Format

```markdown
## ✅ Logic ready!

### Created:
- `types/cart.ts` - TypeScript types
- `stores/cart-store.ts` - Zustand store
- `lib/validations/cart.ts` - Zod schemas

### Connected to UI:
- `components/features/cart-drawer.tsx` - Now using store

### Test:
- Can add products to cart
- Can update quantities
- Can remove products

### Memory:
✅ Memory saved

### Next:
- `/toh-connect` to connect real database
```

## Standard Stack

| Need | Solution |
|------|----------|
| State | Zustand |
| Forms | React Hook Form |
| Validation | Zod |
| Types | TypeScript (strict) |
| API | Mock functions (ready for Supabase) |

## Rules

1. **ALWAYS** create TypeScript types first
2. **ALWAYS** use Zustand for state (not Redux, not Context)
3. **ALWAYS** validate with Zod
4. **ALWAYS** mock API calls (with realistic delay)
5. **NEVER** use `any` type
6. **NEVER** ask "which state management should I use?"
