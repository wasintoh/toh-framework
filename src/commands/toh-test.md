---
command: /toh-test
aliases: ["/toh-t"]
description: Auto test with Playwright and fix until all tests pass
---

# /toh-test - Auto Test & Fix

## Purpose

Automated system testing, and if errors are found, will call `/toh-fix` to fix and re-test until passing.

## Workflow

```
User: /toh-test test login page

┌─────────────────────────────────────────────────────┐
│  🧪 Test Runner                                     │
├─────────────────────────────────────────────────────┤
│  0. 🚨 READ MEMORY (MANDATORY - ALL 7 FILES!)       │
│     ├── .toh/memory/active.md      (current task)   │
│     ├── .toh/memory/summary.md     (project)        │
│     ├── .toh/memory/decisions.md   (decisions)      │
│     ├── .toh/memory/changelog.md   (changes)        │
│     ├── .toh/memory/agents-log.md  (agents)         │
│     ├── .toh/memory/architecture.md (structure)     │
│     └── .toh/memory/components.md  (components)     │
│                                                     │
│  1. 🔐 QUICK SECURITY CHECK                         │
│     ├── Scan for hardcoded secrets                  │
│     ├── Check dangerous patterns                    │
│     └── If CRITICAL → BLOCK testing                 │
│                                                     │
│  2. Setup Playwright (if not exists)                │
│  3. Generate test cases from existing UI            │
│  4. Run tests                                       │
│  5. If PASS → Report results ✅                     │
│  6. If FAIL → Analyze error                         │
│     └── Call /toh-fix to fix                        │
│     └── Run tests again                             │
│     └── Loop until passing (max 3 rounds)           │
│                                                     │
│  7. 🚨 SAVE MEMORY (MANDATORY!)                     │
│     ├── Update active.md (test results)             │
│     ├── Update changelog.md (test session)          │
│     ├── Update agents-log.md (agent activity)       │
│     ├── Update architecture.md (if changed)         │
│     ├── Update components.md (if new)               │
│     └── Update decisions.md (if fixes made)         │
│                                                     │
│  8. Summary of test results                         │
└─────────────────────────────────────────────────────┘
```

## Usage Examples

```bash
# Test entire system
/toh-test

# Test specific pages
/toh-test login and register pages

# Test flow
/toh-test order purchase flow

# Test responsive
/toh-test responsive all pages
```

## Behavior

### 1. Setup Playwright

If Playwright not in project:

```bash
npm install -D @playwright/test
npx playwright install
```

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### 2. Generate Test Cases

Analyze existing UI and generate test cases:

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
  })

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('invalid@test.com')
    await page.getByLabel('Password').fill('wrongpassword')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('Invalid email or password')).toBeVisible()
  })

  test('should login successfully', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL('/dashboard')
  })
})
```

### 3. Run Tests

```bash
npx playwright test
```

### 4. Auto-Fix Loop

If test fails:

1. **Analyze error message**
2. **Call `/toh-fix`** with error context
3. **Run test again**
4. **Loop until passing** (max 3 rounds)

```
❌ Test Failed: login.spec.ts
   Error: locator.click: Error: strict mode violation
   
🔧 Calling /toh-fix...
   → Fixed button selector
   
🔄 Running test again...

✅ Test Passed!
```

### 5. Report Results

```
╔════════════════════════════════════════════════════════════╗
║  🧪 Test Results                                           ║
╠════════════════════════════════════════════════════════════╣
║  Total:   15 tests                                         ║
║  Passed:  15 ✅                                             ║
║  Failed:  0                                                ║
║  Fixed:   3 (auto-fixed and passed)                        ║
║  Time:    45s                                              ║
╠════════════════════════════════════════════════════════════╣
║  📊 Coverage:                                              ║
║  • Login page: 100%                                        ║
║  • Dashboard: 100%                                         ║
║  • Products: 100%                                          ║
╚════════════════════════════════════════════════════════════╝
```

## Test Types

| Type | Description | Command |
|------|-------------|---------|
| **Unit** | Component tests | `/toh-test components` |
| **Integration** | Page tests | `/toh-test pages` |
| **E2E** | User flow tests | `/toh-test order flow` |
| **Visual** | Screenshot comparison | `/toh-test visual` |
| **Responsive** | Mobile/tablet/desktop | `/toh-test responsive` |

## Integration with Other Commands

```bash
# Create UI then test immediately
/toh-ui checkout page
/toh-test checkout page

# Design then visual test
/toh-design adjust colors and spacing
/toh-test visual

# Full flow
/toh-vibe meeting room booking system
/toh-test all pages
/toh-ship
```

## Agent Reference

Read more skills at: `.claude/skills/test-engineer/SKILL.md`
