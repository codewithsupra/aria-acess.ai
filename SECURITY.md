# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| `main` | ✅ Yes |
| Older branches | ❌ No |

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability in Aria Access, please report it responsibly:

1. **Email:** supratim347@gmail.com  
   Subject line: `[SECURITY] Aria Access — <brief description>`

2. Include in your report:
   - A description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fix (optional but appreciated)

3. You will receive an acknowledgement within **48 hours** and a resolution timeline within **7 days**.

We follow responsible disclosure: once a fix is deployed, we will credit you in the release notes (unless you prefer to remain anonymous).

## Scope

In scope:
- Authentication bypass
- Stored/reflected XSS
- SQL injection
- Exposed secrets or API keys
- Server-Side Request Forgery (SSRF) via the scan endpoint
- Remote Code Execution

Out of scope:
- Denial-of-service attacks
- Issues in third-party dependencies already disclosed upstream
- Missing security headers (please open a regular issue instead)

Thank you for helping keep Aria Access safe.
