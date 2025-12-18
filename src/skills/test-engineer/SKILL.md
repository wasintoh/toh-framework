# Test Engineer Skill

## Overview

Skill for automated testing with Playwright, including auto-fix loop capability.

## Core Philosophy

> **"Test until it passes, not just test and report"**

1. **Auto-Generate Tests** - Generate test cases from UI automatically
2. **Auto-Fix Loop** - If fails, fix and re-test until passing
3. **Human-Readable Reports** - Easy to understand reports
4. **Language-Adaptive** - Error messages adapt to project language setting

## Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright | E2E Testing |
| @playwright/test | Test Runner |
| playwright-report | HTML Reports |

## Setup

### 1. Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

### 2. Config File

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
```

### 3. Test Directory Structure

```
tests/
├── auth/
│   ├── login.spec.ts
│   └── register.spec.ts
├── dashboard/
│   └── dashboard.spec.ts
├── products/
│   ├── list.spec.ts
│   └── detail.spec.ts
├── checkout/
│   └── flow.spec.ts
└── fixtures/
    └── test-data.ts
```

## Test Generation Patterns

### Pattern 1: Page Render Test

Every page must have a test to verify correct rendering:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Products Page', () => {
  test('should render correctly', async ({ page }) => {
    await page.goto('/products')
    
    // Check title
    await expect(page).toHaveTitle(/Products/)
    
    // Check main heading
    await expect(
      page.getByRole('heading', { name: 'All Products' })
    ).toBeVisible()
    
    // Check key elements exist
    await expect(page.getByTestId('product-grid')).toBeVisible()
    await expect(page.getByRole('searchbox')).toBeVisible()
  })
})
```

### Pattern 2: Form Validation Test

Every form must have validation tests:

```typescript
test.describe('Register Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
  })

  test('should show validation errors for empty fields', async ({ page }) => {
    // Click submit without filling
    await page.getByRole('button', { name: 'Register' }).click()
    
    // Check error messages
    await expect(page.getByText('Name is required')).toBeVisible()
    await expect(page.getByText('Email is required')).toBeVisible()
    await expect(page.getByText('Password is required')).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid-email')
    await page.getByRole('button', { name: 'Register' }).click()
    
    await expect(page.getByText('Invalid email format')).toBeVisible()
  })

  test('should validate password strength', async ({ page }) => {
    await page.getByLabel('Password').fill('123')
    await page.getByRole('button', { name: 'Register' }).click()
    
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible()
  })
})
```

### Pattern 3: User Flow Test

Test complete user journey:

```typescript
test.describe('Checkout Flow', () => {
  test('should complete purchase successfully', async ({ page }) => {
    // Step 1: Browse products
    await page.goto('/products')
    await expect(page.getByTestId('product-card')).toHaveCount.greaterThan(0)
    
    // Step 2: Add to cart
    await page.getByTestId('product-card').first().click()
    await page.getByRole('button', { name: 'Add to Cart' }).click()
    await expect(page.getByTestId('cart-count')).toHaveText('1')
    
    // Step 3: Go to cart
    await page.getByTestId('cart-icon').click()
    await expect(page).toHaveURL('/cart')
    await expect(page.getByTestId('cart-item')).toHaveCount(1)
    
    // Step 4: Checkout
    await page.getByRole('button', { name: 'Checkout' }).click()
    await expect(page).toHaveURL('/checkout')
    
    // Step 5: Fill shipping info
    await page.getByLabel('Full Name').fill('John Smith')
    await page.getByLabel('Address').fill('123 Main Street')
    await page.getByLabel('Phone').fill('555-123-4567')
    
    // Step 6: Confirm order
    await page.getByRole('button', { name: 'Confirm Order' }).click()
    
    // Step 7: Success
    await expect(page).toHaveURL(/\/order\//)
    await expect(page.getByText('Order Successful')).toBeVisible()
  })
})
```

### Pattern 4: Responsive Test

Test on multiple viewports:

```typescript
test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ]

  for (const viewport of viewports) {
    test(`should display correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ 
        width: viewport.width, 
        height: viewport.height 
      })
      
      await page.goto('/products')
      
      // Check layout adapts
      if (viewport.name === 'mobile') {
        await expect(page.getByTestId('mobile-menu')).toBeVisible()
        await expect(page.getByTestId('desktop-nav')).not.toBeVisible()
      } else {
        await expect(page.getByTestId('desktop-nav')).toBeVisible()
      }
      
      // Screenshot for visual comparison
      await page.screenshot({ 
        path: `screenshots/products-${viewport.name}.png`,
        fullPage: true 
      })
    })
  }
})
```


## Auto-Fix Loop Strategy

### Loop Flow

```
┌─────────────────────────────────────────────────────┐
│  Run Tests                                          │
└─────────────────────────────────────────────────────┘
                        │
            ┌───────────┴───────────┐
            │                       │
            ▼                       ▼
      ┌──────────┐           ┌──────────┐
      │  PASS ✅ │           │  FAIL ❌ │
      └──────────┘           └──────────┘
            │                       │
            ▼                       ▼
      ┌──────────┐           ┌──────────────────┐
      │  Done!   │           │  Analyze Error   │
      └──────────┘           └──────────────────┘
                                    │
                                    ▼
                            ┌──────────────────┐
                            │  Call /toh-fix   │
                            └──────────────────┘
                                    │
                                    ▼
                            ┌──────────────────┐
                            │  Re-run Tests    │
                            │  (max 3 loops)   │
                            └──────────────────┘
                                    │
                                    ▼
                            ┌──────────────────┐
                            │  Still failing?  │
                            └──────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
              ┌──────────┐                   ┌──────────────┐
              │  PASS ✅ │                   │  Report to   │
              └──────────┘                   │  Human 🧑‍💻    │
                                             └──────────────┘
```

### Error Analysis Matrix

| Error Pattern | Root Cause | Auto-Fix Strategy |
|---------------|------------|-------------------|
| `strict mode violation` | Multiple elements match selector | Use more specific selector |
| `Timeout waiting for selector` | Element doesn't appear | Add wait or check condition |
| `expect.toBeVisible failed` | Element hidden/not rendered | Check state/condition |
| `Navigation timeout` | Page loads slowly | Increase timeout or optimize |
| `net::ERR_CONNECTION_REFUSED` | Server not started | Check webServer config |
| `Element is not clickable` | Element is overlaid | Scroll into view or wait |

### Fix Context Template

When calling `/toh-fix`, send this context:

```markdown
## Test Failure Report

**File:** tests/login.spec.ts
**Test:** should login successfully
**Line:** 25

### Error Message
```
Error: locator.click: Error: strict mode violation: 
getByRole('button', { name: 'Login' }) resolved to 2 elements
```

### Code Context
```typescript
// Line 23-27
await page.getByLabel('Password').fill('password123')
await page.getByRole('button', { name: 'Login' }).click() // ← Error here
await expect(page).toHaveURL('/dashboard')
```

### Screenshot
![failure](test-results/login-failure.png)

### Suggested Fixes
1. Use `getByRole('button', { name: 'Login', exact: true })`
2. Use `getByTestId('login-submit-button')`
3. Use `.first()` or `.nth(0)`
```

## Report Format

### Console Output (Short & Concise)

```
🧪 Running tests...

  ✓ auth/login.spec.ts (3 tests) - 2.1s
  ✓ auth/register.spec.ts (4 tests) - 3.2s
  ✗ products/list.spec.ts (5 tests) - 4.5s
    └── ❌ should filter by category (attempt 1/3)
        🔧 Auto-fixing...
    └── ✓ Fixed! Re-running...
    └── ✓ should filter by category (passed)
  ✓ checkout/flow.spec.ts (2 tests) - 5.1s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All tests passed!
   Total: 14 | Passed: 14 | Fixed: 1
   Duration: 15.2s
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Full Report (HTML)

Generate HTML report at:
- `playwright-report/index.html`

View with:
```bash
npx playwright show-report
```

## Best Practices

### 1. Use data-testid

Add `data-testid` to important elements:

```tsx
// ✅ Good
<button data-testid="submit-order">Order Now</button>

// ❌ Bad - text might change
<button>Order Now</button>
```

### 2. Wait for Network Idle

For pages that load data:

```typescript
await page.goto('/products', { waitUntil: 'networkidle' })
```

### 3. Use Locator Assertions

```typescript
// ✅ Good - Auto-retry
await expect(page.getByText('Success')).toBeVisible()

// ❌ Bad - No retry
const text = await page.textContent('.message')
expect(text).toBe('Success')
```

### 4. Group Related Tests

```typescript
test.describe('Product Management', () => {
  test.describe('Create', () => {
    test('should create new product', ...)
    test('should validate required fields', ...)
  })
  
  test.describe('Edit', () => {
    test('should edit existing product', ...)
  })
  
  test.describe('Delete', () => {
    test('should delete product', ...)
    test('should confirm before delete', ...)
  })
})
```

### 5. Use Fixtures for Test Data

```typescript
// tests/fixtures/test-data.ts
export const testUser = {
  email: 'test@example.com',
  password: 'TestPassword123!',
  name: 'Test User',
}

export const testProduct = {
  name: 'Drip Coffee',
  price: 4.50,
  category: 'Beverages',
}
```

## Integration Commands

```bash
# Run all tests
/toh-test

# Run specific file
/toh-test auth/login

# Run with UI mode (debug)
/toh-test --debug

# Update snapshots
/toh-test --update-snapshots

# Run on CI
/toh-test --ci
```

## MCP Integration

Use Playwright MCP for:
- Browser automation
- Screenshot capture
- Network interception
- Console log capture

```typescript
// Example: Using Playwright MCP
const browser = await playwright.chromium.launch()
const page = await browser.newPage()

// MCP handles the rest...
```
