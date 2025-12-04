# Premium Templates for Toh Framework

Ready-to-use page and component templates with:
- ✨ Smooth animations (Framer Motion)
- 🎨 Premium design
- 📱 Fully responsive
- 🔒 TypeScript strict mode
- ♿ Accessible

## Directory Structure

```
templates/
├── components/
│   ├── motion/        # Animation components
│   │   ├── PageTransition.tsx
│   │   ├── StaggerContainer.tsx
│   │   ├── FadeIn.tsx
│   │   └── CountUp.tsx
│   │
│   ├── feedback/      # Loading, empty, error states
│   │   ├── LoadingSpinner.tsx
│   │   ├── Skeleton.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── interactive/   # Animated cards & buttons
│   │   ├── AnimatedCard.tsx
│   │   └── AnimatedButton.tsx
│   │
│   └── layout/        # Navigation & structure
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
└── pages/
    ├── landing-page.tsx    # Full marketing landing page
    ├── dashboard-page.tsx  # Dashboard with stats & charts
    └── auth-pages.tsx      # Login & Register pages
```

## Usage

### Copy Components to Your Project

```bash
# Copy motion components
cp -r templates/components/motion/* your-project/components/motion/

# Copy feedback components  
cp -r templates/components/feedback/* your-project/components/feedback/

# Copy page template
cp templates/pages/landing-page.tsx your-project/app/page.tsx
```

### Dependencies Required

```bash
# Install framer-motion
npm install framer-motion

# Install lucide-react icons
npm install lucide-react

# Install class-variance-authority (for buttons)
npm install class-variance-authority
```

### shadcn/ui Components Needed

```bash
npx shadcn@latest add button input label
```

## Component Examples

### PageTransition
```tsx
import { PageTransition } from "@/components/motion";

export default function MyPage() {
  return (
    <PageTransition>
      <h1>My Page</h1>
    </PageTransition>
  );
}
```

### Stagger Animation
```tsx
import { StaggerContainer, StaggerItem } from "@/components/motion";

<StaggerContainer>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.title}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Animated Card
```tsx
import { AnimatedCard, StatCard } from "@/components/interactive";

<AnimatedCard hoverEffect="lift">
  <h3>Card Title</h3>
  <p>Card content</p>
</AnimatedCard>

<StatCard 
  title="Total Revenue"
  value="$45,231"
  trend={{ value: 20.1, isPositive: true }}
/>
```

### CountUp Animation
```tsx
import { CountUp } from "@/components/motion";

<CountUp end={1000} prefix="$" suffix="+" duration={2} />
```

### Loading States
```tsx
import { SkeletonDashboard, PageLoading } from "@/components/feedback";

// While loading
if (isLoading) return <SkeletonDashboard />;

// Full page loading
if (!data) return <PageLoading label="Loading data..." />;
```

### Empty States
```tsx
import { NoDataEmpty, SearchEmpty } from "@/components/feedback";

if (items.length === 0) {
  return (
    <NoDataEmpty
      title="No items yet"
      description="Create your first item to get started"
      actionLabel="Create New"
      onAction={() => router.push("/new")}
    />
  );
}
```

## Best Practices

1. **Always use PageTransition** for page-level components
2. **Use StaggerContainer** for lists and grids
3. **Add loading.tsx** for every route
4. **Design empty states** for all lists
5. **Keep animations subtle** (y: 20 max, scale: 1.02 max)
6. **Test on mobile** first

---

*Part of Toh Framework - Premium Experience v1.0*
