# 📦 Component Registry

> Quick reference for all project components, hooks, and utilities
> **Update:** After creating/modifying any component, hook, or utility

---

## 📄 Pages

| Route | File | Description | Key Dependencies |
|-------|------|-------------|------------------|
| `/` | `app/page.tsx` | Landing page | - |

---

## 🧩 Components

### Layout Components

| Component | Location | Key Props | Used By |
|-----------|----------|-----------|---------|
| Navbar | `components/layout/navbar.tsx` | - | Layout |
| Sidebar | `components/layout/sidebar.tsx` | `collapsed?: boolean` | Dashboard |
| Footer | `components/layout/footer.tsx` | - | Layout |

### UI Components (shadcn/ui)

| Component | Location | Variants |
|-----------|----------|----------|
| Button | `components/ui/button.tsx` | default, destructive, outline, secondary, ghost, link |
| Card | `components/ui/card.tsx` | - |
| Input | `components/ui/input.tsx` | - |

### Feature Components

| Component | Location | Key Props | Used By |
|-----------|----------|-----------|---------|
| (none yet) | - | - | - |

### Motion Components

| Component | Location | Purpose |
|-----------|----------|---------|
| PageTransition | `components/motion/page-transition.tsx` | Page enter/exit animations |
| StaggerContainer | `components/motion/stagger-container.tsx` | Staggered list animations |
| FadeIn | `components/motion/fade-in.tsx` | Fade in animation wrapper |

### Feedback Components

| Component | Location | Purpose |
|-----------|----------|---------|
| LoadingSpinner | `components/feedback/loading-spinner.tsx` | Loading indicator |
| Skeleton | `components/feedback/skeleton.tsx` | Content placeholder |
| EmptyState | `components/feedback/empty-state.tsx` | No data state |

---

## 🪝 Custom Hooks

| Hook | Location | Purpose | Returns |
|------|----------|---------|---------|
| (none yet) | - | - | - |

---

## 🏪 Zustand Stores

| Store | Location | State Shape | Key Actions |
|-------|----------|-------------|-------------|
| (none yet) | - | - | - |

---

## 🛠️ Utility Functions

| Function | Location | Purpose | Params |
|----------|----------|---------|--------|
| cn | `lib/utils.ts` | Merge Tailwind classes | `...inputs: ClassValue[]` |
| formatDate | `lib/utils.ts` | Format date string | `date: Date, format?: string` |
| formatCurrency | `lib/utils.ts` | Format currency | `amount: number, currency?: string` |

---

## 📋 Types & Interfaces

| Type | Location | Description |
|------|----------|-------------|
| (none yet) | - | - |

---

## 🔌 API Functions

| Function | Location | Purpose | Endpoint |
|----------|----------|---------|----------|
| (none yet) | - | - | - |

---

## 📊 Component Statistics

| Category | Count |
|----------|-------|
| Pages | 0 |
| Layout Components | 0 |
| Feature Components | 0 |
| Custom Hooks | 0 |
| Stores | 0 |
| Utility Functions | 0 |

---

*Last updated: [YYYY-MM-DD]*
