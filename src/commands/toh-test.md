---
name: toh-test
description: >
  ทดสอบระบบอัตโนมัติด้วย Playwright
  และ auto-fix จนผ่าน
shortcuts:
  - /toh:test
  - /toh:t
---

# /toh:test - Auto Test & Fix

## Purpose

ทดสอบระบบอัตโนมัติ และถ้าเจอ error จะเรียก `/toh:fix` มาแก้ไขแล้ว test ใหม่จนผ่าน

## Workflow

```
User: /toh:test ทดสอบหน้า login

┌─────────────────────────────────────────────────────┐
│  🧪 Test Runner                                     │
├─────────────────────────────────────────────────────┤
│  0. 🚨 READ MEMORY (MANDATORY!)                     │
│     ├── .toh/memory/active.md                       │
│     ├── .toh/memory/summary.md                      │
│     └── .toh/memory/decisions.md                    │
│                                                     │
│  1. Setup Playwright (ถ้ายังไม่มี)                   │
│  2. สร้าง test cases จาก UI ที่มี                    │
│  3. Run tests                                       │
│  4. ถ้า PASS → รายงานผล ✅                          │
│  5. ถ้า FAIL → วิเคราะห์ error                       │
│     └── เรียก /toh:fix แก้ไข                        │
│     └── Run tests ใหม่                              │
│     └── Loop จนผ่าน (max 3 รอบ)                     │
│                                                     │
│  6. 🚨 SAVE MEMORY (MANDATORY!)                     │
│     ├── อัพเดท active.md (test results)             │
│     ├── เพิ่ม decisions.md (ถ้ามี fixes)            │
│     └── อัพเดท summary.md                           │
│                                                     │
│  7. สรุปผลการทดสอบ                                  │
└─────────────────────────────────────────────────────┘
```

## Usage Examples

```bash
# ทดสอบทั้งระบบ
/toh:test

# ทดสอบเฉพาะหน้า
/toh:test หน้า login และ register

# ทดสอบ flow
/toh:test flow การสั่งซื้อสินค้า

# ทดสอบ responsive
/toh:test responsive ทุกหน้า
```

## Behavior

### 1. Setup Playwright

ถ้ายังไม่มี Playwright ในโปรเจค:

```bash
npm install -D @playwright/test
npx playwright install
```

สร้าง `playwright.config.ts`:

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

วิเคราะห์ UI ที่มีแล้วสร้าง test cases:

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'เข้าสู่ระบบ' })).toBeVisible()
    await expect(page.getByLabel('อีเมล')).toBeVisible()
    await expect(page.getByLabel('รหัสผ่าน')).toBeVisible()
  })

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('อีเมล').fill('invalid@test.com')
    await page.getByLabel('รหัสผ่าน').fill('wrongpassword')
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await expect(page.getByText('อีเมลหรือรหัสผ่านไม่ถูกต้อง')).toBeVisible()
  })

  test('should login successfully', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('อีเมล').fill('test@example.com')
    await page.getByLabel('รหัสผ่าน').fill('password123')
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await expect(page).toHaveURL('/dashboard')
  })
})
```

### 3. Run Tests

```bash
npx playwright test
```

### 4. Auto-Fix Loop

ถ้า test fail:

1. **วิเคราะห์ error message**
2. **เรียก `/toh:fix`** พร้อม context ของ error
3. **Run test ใหม่**
4. **Loop จนผ่าน** (max 3 รอบ)

```
❌ Test Failed: login.spec.ts
   Error: locator.click: Error: strict mode violation
   
🔧 เรียก /toh:fix...
   → แก้ไข button selector
   
🔄 Run test ใหม่...

✅ Test Passed!
```

### 5. รายงานผล

```
╔════════════════════════════════════════════════════════════╗
║  🧪 Test Results                                           ║
╠════════════════════════════════════════════════════════════╣
║  Total:   15 tests                                         ║
║  Passed:  15 ✅                                             ║
║  Failed:  0                                                ║
║  Fixed:   3 (auto-fixed และ passed)                       ║
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
| **Unit** | Component tests | `/toh:test components` |
| **Integration** | Page tests | `/toh:test pages` |
| **E2E** | User flow tests | `/toh:test flow สั่งซื้อ` |
| **Visual** | Screenshot comparison | `/toh:test visual` |
| **Responsive** | Mobile/tablet/desktop | `/toh:test responsive` |

## Integration with Other Commands

```bash
# สร้าง UI แล้ว test เลย
/toh:ui หน้า checkout
/toh:test หน้า checkout

# Design แล้ว test visual
/toh:design ปรับสีและ spacing
/toh:test visual

# Full flow
/toh:vibe ระบบจองห้องประชุม
/toh:test ทุกหน้า
/toh:ship
```

## Agent Reference

อ่าน skill เพิ่มเติมที่: `.claude/skills/test-engineer/SKILL.md`
