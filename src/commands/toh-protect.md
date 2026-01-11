---
command: /toh-protect
aliases: ["/toh-p", "/toh-security", "/toh-audit"]
description: Full security audit for AI-generated code - scan for vulnerabilities before deploy
trigger: /toh-protect or /toh-p
---

# /toh-protect - Security Audit

## Purpose

Comprehensive security audit for AI-generated code. Scans for vulnerabilities, hardcoded secrets, injection risks, and configuration issues before deployment.

## Signature Command

```
/toh-protect [scope]
/toh-p [scope]
/toh-security [scope]
/toh-audit [scope]
```

## Workflow

```
User: /toh-protect

+-------------------------------------------------------------+
|  SECURITY AUDIT                                             |
+-------------------------------------------------------------+
|  0. READ MEMORY (MANDATORY - ALL 7 FILES!)                  |
|     |- .toh/memory/active.md      (current task)            |
|     |- .toh/memory/summary.md     (project overview)        |
|     |- .toh/memory/decisions.md   (past decisions)          |
|     |- .toh/memory/changelog.md   (session changes)         |
|     |- .toh/memory/agents-log.md  (agent activity)          |
|     |- .toh/memory/architecture.md (project structure)      |
|     +- .toh/memory/components.md  (existing components)     |
|                                                             |
|  1. READ Skills                                             |
|     +- ~/.toh/skills/security-engineer/SKILL.md             |
|                                                             |
|  2. LEVEL 1: Quick Check                                    |
|     |- Hardcoded secrets                                    |
|     |- Dangerous code patterns                              |
|     |- Basic auth issues                                    |
|     +- Obvious injection vectors                            |
|                                                             |
|  3. LEVEL 2: Deep Analysis                                  |
|     |- SQL/XSS/Command injection                            |
|     |- Auth/Authorization flaws                             |
|     |- AI-generated code risks                              |
|     +- Configuration security                               |
|                                                             |
|  4. DEPENDENCY AUDIT                                        |
|     +- npm audit                                            |
|                                                             |
|  5. SECURITY HEADERS CHECK                                  |
|     |- Content-Security-Policy                              |
|     |- X-Frame-Options                                      |
|     |- HSTS, etc.                                           |
|                                                             |
|  6. GENERATE REPORT                                         |
|     +- Save to .toh/security-audit-[date].md                |
|                                                             |
|  7. SAVE MEMORY (MANDATORY!)                                |
|     |- Update active.md (audit results)                     |
|     +- Add to decisions.md (security decisions)             |
+-------------------------------------------------------------+
```

## Usage Examples

```bash
# Full project audit
/toh-protect

# Audit specific scope
/toh-protect src/api/
/toh-p auth system
/toh-security checkout flow

# Pre-deploy check
/toh-protect --pre-deploy
```

## Security Levels

### Level 1: Quick Check (< 5 seconds)

| Check | What It Finds |
|-------|---------------|
| **Secrets** | API keys, passwords, tokens in code |
| **Code Exec** | Dynamic code evaluation patterns |
| **SQL** | Unparameterized queries |
| **XSS** | Unsafe HTML rendering |
| **Auth** | Hardcoded credentials, bypass flags |

### Level 2: Deep Analysis (30-60 seconds)

| Check | What It Finds |
|-------|---------------|
| **Injection** | SQL, XSS, Command injection vectors |
| **Auth Flaws** | Missing middleware, weak sessions |
| **AI Risks** | Unimplemented TODOs, type bypasses |
| **Config** | Insecure CORS, missing headers |
| **Deps** | Known vulnerabilities in packages |

## Report Format

```
+------------------------------------------------------------+
|  SECURITY AUDIT REPORT                                     |
|  Project: my-project                                       |
|  Date: 2024-12-26 14:30                                    |
+------------------------------------------------------------+

EXECUTIVE SUMMARY
====================================
Risk Level: HIGH
Files Scanned: 142
Issues Found: 8 (3 critical, 3 high, 2 medium)

CRITICAL ISSUES (must fix before deploy)
====================================
[SEC-001] Hardcoded API Secret
|- File: src/lib/payment.ts:12
|- Risk: Credential exposure
|- Fix: Move to process.env.STRIPE_KEY

[SEC-002] SQL Injection
|- File: src/api/users.ts:45
|- Risk: Database compromise
|- Fix: Use parameterized query

[SEC-003] XSS Vulnerability
|- File: src/components/Comment.tsx:28
|- Risk: Script injection
|- Fix: Use DOMPurify.sanitize()

HIGH ISSUES
====================================
[SEC-004] Missing Auth Middleware
[SEC-005] CORS Allows All Origins
[SEC-006] Weak Session Configuration

MEDIUM ISSUES
====================================
[SEC-007] No Rate Limiting on Login
[SEC-008] 5 Outdated Dependencies

DEPENDENCY AUDIT
====================================
npm audit: 3 high, 5 moderate, 12 low
Run: npm audit fix

SECURITY HEADERS
====================================
[OK] X-Frame-Options
[OK] X-Content-Type-Options
[MISSING] Content-Security-Policy
[MISSING] Strict-Transport-Security

RECOMMENDATIONS
====================================
1. [URGENT] Fix 3 critical issues
2. [HIGH] Add auth to unprotected routes
3. [HIGH] Configure CORS properly
4. [MEDIUM] Add rate limiting
5. [LOW] Update dependencies

====================================
Full report: .toh/security-audit-2024-12-26.md
====================================
```

## Auto-Fix Support

Some issues can be auto-fixed:

| Issue | Auto-Fix | How |
|-------|----------|-----|
| Hardcoded secrets | Yes | Move to .env, update references |
| XSS | Yes | Wrap with DOMPurify |
| Missing headers | Yes | Add to next.config.js |
| CORS misconfig | Yes | Update allowed origins |
| Outdated deps | Yes | npm audit fix |

For auto-fix:
```bash
/toh-protect --fix
```

## Integration with Deploy

**IMPORTANT:** Always run before `/toh-ship`

```bash
# Recommended flow
/toh-protect          # Check first
# Fix any issues
/toh-protect          # Verify fixes
/toh-ship             # Deploy only if clean
```

## Severity Levels

| Level | Meaning | Action |
|-------|---------|--------|
| CRITICAL | Exploitable vulnerability | **MUST fix before deploy** |
| HIGH | Serious security flaw | Should fix before deploy |
| MEDIUM | Security concern | Fix when possible |
| LOW | Best practice | Nice to have |
| INFO | Informational | For awareness |

## Files Scanned

```
Included:
- src/**/*.ts, src/**/*.tsx
- src/**/*.js, src/**/*.jsx
- *.config.js, *.config.ts
- .env* (check for committed secrets)
- package.json (dependencies)

Excluded:
- node_modules/
- .git/
- dist/, build/
- *.test.*, *.spec.*
```

## Agent Reference

Read full skill at: `.toh/skills/security-engineer/SKILL.md`
