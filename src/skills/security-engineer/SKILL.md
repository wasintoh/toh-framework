# Security Engineer Skill

## Overview

Security-first approach for AI-generated code auditing. Provides both quick checks (during dev/test) and comprehensive audits (full protection).

## Core Philosophy

> **"Trust, but verify - especially AI-generated code"**

1. **Proactive Detection** - Catch issues before they become vulnerabilities
2. **Layer Defense** - Quick checks + Full audits = Maximum coverage
3. **Zero False Sense** - Don't trust code just because it "looks safe"
4. **Human-Readable Reports** - Clear findings with actionable fixes

---

## Security Check Levels

```text
+-------------------------------------------------------------+
|  LEVEL 1: Quick Check (during /toh-dev, /toh-test)          |
|  - Hardcoded secrets                                        |
|  - Dangerous imports/code execution                         |
|  - Basic auth issues                                        |
|  - Obvious injection vectors                                |
|  Duration: < 5 seconds                                      |
+-------------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------------+
|  LEVEL 2: Full Audit (/toh-protect)                         |
|  - All Level 1 checks                                       |
|  - Injection attacks (SQL, XSS, Command)                    |
|  - Auth/Authorization flaws                                 |
|  - AI-Generated Code risks                                  |
|  - Configuration security                                   |
|  - Dependency vulnerabilities                               |
|  Duration: 30-60 seconds                                    |
+-------------------------------------------------------------+
```

---

## Level 1: Quick Check Patterns

### 1.1 Hardcoded Secrets Detection

**Detection Patterns:**

```text
SECRET_PATTERNS:
  # API Keys
  - Pattern for api_key, apikey with 20+ char values
  - Pattern for sk-live, pk-live, sk-test prefixes

  # AWS
  - Pattern: AKIA followed by 16 alphanumeric chars
  - Pattern for aws_secret values

  # Database URLs
  - Connection strings with embedded credentials

  # Private Keys
  - PEM format key headers

  # JWT Secrets
  - jwt_secret, secret_key patterns

  # Generic passwords
  - password/passwd/pwd assignments
```

**Files to check:**
- `**/*.ts`, `**/*.tsx`, `**/*.js`, `**/*.jsx`
- `**/*.env*` (.env, .env.local, .env.production)
- `**/config/**`, `**/*.json`

**Files to IGNORE:**
- `**/node_modules/**`, `**/.git/**`
- `**/dist/**`, `**/build/**`
- `**/*.test.*`, `**/*.spec.*`

### 1.2 Dangerous Code Patterns Detection

**CRITICAL - Block immediately:**

```text
CRITICAL_PATTERNS:
  # Dynamic code execution
  - String-based code evaluation functions
  - Timer functions with string arguments

  # Dangerous Node.js modules
  - Shell command execution
  - Process spawning with shell mode

  # SQL without parameterization
  - Template literals in SQL statements
  - String concatenation in queries

  # Dangerous HTML rendering
  - React's unsafe HTML rendering attribute
  - Direct HTML content assignment to DOM
```

**WARNING - Review required:**

```text
WARNING_PATTERNS:
  # Disabled security
  - ESLint security rule disabling
  - TypeScript strict mode bypasses
  - CORS with wildcard origin

  # Unsafe data handling
  - JSON parsing without validation
  - Deserialization of untrusted data

  # Weak cryptography
  - Deprecated hash algorithms (MD5, SHA1)
  - Non-cryptographic random for security
```

### 1.3 Basic Auth Issues

```text
AUTH_PATTERNS:
  # Hardcoded credentials
  - Default admin/root credentials

  # Disabled auth
  - Authentication bypass flags
  - Skip auth configurations

  # Weak session
  - Short session secrets
  - Insecure cookie settings

  # JWT issues
  - None algorithm acceptance
  - Signature verification disabled
```

### Quick Check Output Format

```text
+------------------------------------------------------------+
|  QUICK SECURITY CHECK                                      |
+------------------------------------------------------------+

Scanning: src/**/*.{ts,tsx,js,jsx}

CRITICAL (2 issues - must fix!)
-----------------------------------
1. Hardcoded API Key
   File: src/lib/api.ts:15
   Code: const API_KEY = "sk-live-abc123..."
   Fix:  Use environment variable: process.env.API_KEY

2. SQL Injection Risk
   File: src/api/users.ts:42
   Code: SELECT with template literal interpolation
   Fix:  Use parameterized query: WHERE id = $1

WARNING (1 issue - review recommended)
-----------------------------------
1. Disabled ESLint Security
   File: src/utils/parse.ts:8
   Why:  Security rules should not be disabled

====================================
Summary: 2 critical, 1 warning
Status: BLOCKED - Fix critical issues
====================================
```

---

## Level 2: Full Audit Patterns

### 2.1 Injection Attack Detection

#### SQL Injection

**Vulnerable patterns:**
- String concatenation in queries
- Dynamic table/column names via interpolation
- Raw queries without ORM parameterization

**Safe patterns:**
- Positional placeholders ($1, $2 for PostgreSQL)
- Question mark placeholders (MySQL/SQLite)
- Named parameters (various ORMs)

#### XSS (Cross-Site Scripting)

**Vulnerable patterns:**
- Unsafe HTML rendering in React components
- Direct DOM HTML content manipulation
- User input in dynamically created HTML
- Unvalidated URL assignments

**Safe patterns:**
- HTML sanitization with DOMPurify
- Text content assignment (no HTML parsing)
- Proper output encoding

#### Command Injection

**Vulnerable patterns:**
- Shell execution with user input
- Unsanitized process arguments
- Path traversal sequences

### 2.2 Authentication/Authorization Flaws

```text
AUTH_FLAWS:
  # Missing auth checks
  - API routes without middleware
  - Unprotected admin endpoints

  # Insecure session
  - Missing secure flag on cookies
  - Missing httpOnly flag
  - Improper sameSite configuration

  # JWT vulnerabilities
  - Algorithm confusion attacks
  - Excessive token lifetime

  # CORS misconfig
  - Wildcard origin with credentials
  - Overly permissive origins

  # Missing rate limiting
  - Auth endpoints without throttling
```

### 2.3 AI-Generated Code Risks

```text
AI_CODE_RISKS:
  # Common AI mistakes
  - Unimplemented TODO comments
  - Placeholder implementations
  - Debug logging left in code
  - Empty error handlers
  - Silently ignored exceptions

  # Over-trusting patterns
  - Unvalidated request data usage
  - Direct database queries with user input
  - Type assertion abuse
  - TypeScript safety bypasses

  # Hallucinated APIs
  - Non-existent library methods
  - Invented function calls
```

### 2.4 Configuration Security

**Environment files:**
- No secrets in committed files
- Suspicious encoded strings
- Non-placeholder passwords

**Package.json:**
- Outdated dependencies
- Known vulnerabilities
- Excessive permissions

**Framework config:**
- Overly permissive image domains
- Unsafe header configurations
- Risky experimental features

**Security Headers:**
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

### 2.5 Dependency Vulnerabilities

```bash
# Commands to run
npm audit --json
npx audit-ci --moderate
```

---

## Full Audit Report Format

```text
+------------------------------------------------------------+
|  FULL SECURITY AUDIT                                       |
|  Project: [project-name]                                   |
|  Date: YYYY-MM-DD HH:mm                                    |
+------------------------------------------------------------+

EXECUTIVE SUMMARY
====================================
Risk Level: HIGH / MEDIUM / LOW
Files Scanned: 142
Issues Found: 8 (3 critical, 3 high, 2 medium)

CRITICAL ISSUES
====================================
[SEC-001] SQL Injection
|- File: src/api/users.ts:42
|- Risk: Database compromise
|- Fix: Use parameterized queries

[SEC-002] Hardcoded Secret
|- File: src/lib/stripe.ts:5
|- Risk: Credential exposure
|- Fix: Use environment variables

[SEC-003] XSS Vulnerability
|- File: src/components/Comment.tsx:28
|- Risk: Script injection
|- Fix: Sanitize with DOMPurify

HIGH ISSUES
====================================
[SEC-004] Missing Authentication
[SEC-005] CORS Misconfiguration
[SEC-006] Weak Session Secret

MEDIUM ISSUES
====================================
[SEC-007] Missing Rate Limiting
[SEC-008] Outdated Dependencies

RECOMMENDATIONS
====================================
1. [URGENT] Fix critical issues before deploy
2. [HIGH] Add authentication middleware
3. [HIGH] Configure CORS properly
4. [MEDIUM] Set up rate limiting
5. [LOW] Update dependencies

====================================
Report saved: .toh/security-audit-YYYY-MM-DD.md
====================================
```

---

## Integration with Commands

### Quick Check Integration

Add to `/toh-dev` and `/toh-test`:

```text
BEFORE building/testing:
|- Run Level 1 Quick Check
|- If CRITICAL found → BLOCK
|- If WARNING found → WARN and continue
|- If clean → PASS
```

### Full Audit Integration

Triggered by `/toh-protect`:

```text
FULL AUDIT FLOW:
|- Step 1: Run all Level 1 checks
|- Step 2: Run Level 2 deep analysis
|- Step 3: Run npm audit
|- Step 4: Check security headers
|- Step 5: Generate report
|- Step 6: Save to .toh/security-audit-[date].md
```

---

## Auto-Fix Capabilities

| Issue | Auto-Fix | Method |
|-------|----------|--------|
| Hardcoded secrets | Yes | Move to .env |
| Dynamic code execution | Partial | Suggest alternatives |
| SQL injection | Partial | Convert to parameterized |
| XSS | Yes | Add sanitizer wrapper |
| Missing headers | Yes | Update config |
| CORS misconfig | Yes | Fix configuration |
| Outdated deps | Yes | npm audit fix |

### Requires Human Review
- Authentication logic
- Authorization rules
- Business logic validation
- Complex queries
- Third-party integrations

---

## Security Checklist

### Before Development
- [ ] Environment variables configured
- [ ] .gitignore includes sensitive files
- [ ] Dependencies audited

### During Development
- [ ] No hardcoded secrets
- [ ] Input validation on user data
- [ ] Parameterized queries
- [ ] Output encoding
- [ ] Auth on protected routes

### Before Deployment
- [ ] npm audit clean
- [ ] Security headers set
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Full audit passed

---

## References

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- CWE: https://cwe.mitre.org/
- Node.js Security: https://nodejs.org/en/docs/guides/security/
- Next.js Security: https://nextjs.org/docs/app/building-your-application/configuring/security
