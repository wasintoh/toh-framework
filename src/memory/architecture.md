# 🏗️ Project Architecture

> Semantic overview of project structure for AI context loading
> **Update:** After any structural changes (new pages, routes, modules, services)

---

## 📁 Entry Points

| Type | Path | Purpose |
|------|------|---------|
| Main | `app/page.tsx` | Landing/Home page |
| Layout | `app/layout.tsx` | Root layout with providers |
| API | `app/api/` | API routes (if any) |

---

## 🗂️ Core Modules

### `/app` - Pages & Routes

| Route | File | Description | Key Functions |
|-------|------|-------------|---------------|
| `/` | `app/page.tsx` | Landing page | - |
| `/dashboard` | `app/dashboard/page.tsx` | Main dashboard | - |

### `/components` - UI Components

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `ui/` | shadcn/ui components | button, card, input, etc. |
| `layout/` | Layout components | Navbar, Sidebar, Footer |
| `features/` | Feature-specific | Per feature components |

### `/lib` - Utilities & Services

| Folder | Purpose | Key Functions |
|--------|---------|---------------|
| `lib/utils.ts` | Utility functions | cn(), formatDate() |
| `lib/api/` | API client functions | fetchData(), mutateData() |
| `lib/mock-data.ts` | Mock data | Sample data for development |

### `/stores` - State Management

| Store | Purpose | Key Actions |
|-------|---------|-------------|
| (none yet) | - | - |

### `/hooks` - Custom Hooks

| Hook | Purpose |
|------|---------|
| (none yet) | - |

---

## 🔄 Data Flow Pattern

```
User Action
    │
    ▼
┌─────────────┐
│  Component  │  ← UI Layer (React Components)
└─────────────┘
    │
    ▼
┌─────────────┐
│   Zustand   │  ← State Management
│    Store    │
└─────────────┘
    │
    ▼
┌─────────────┐
│   API/Lib   │  ← Data Layer (Mock or Real)
│  Functions  │
└─────────────┘
    │
    ▼
┌─────────────┐
│  Database   │  ← Supabase (when connected)
└─────────────┘
```

---

## 🔌 External Services

| Service | Purpose | Config Location |
|---------|---------|-----------------|
| Supabase | Backend (Auth, DB, Storage) | `lib/supabase/` |
| Stripe | Payments (if any) | `lib/stripe/` |
| LINE | LINE Integration (if any) | `lib/line/` |

---

## 🎨 Design System

| Aspect | Implementation |
|--------|----------------|
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Theme | CSS variables in `globals.css` |
| Fonts | Next.js Font (Inter default) |

---

## 📝 Notes

- [Add important architectural notes here]

---

*Last updated: [YYYY-MM-DD]*
