# Contributing to Aria Access

Thank you for your interest in contributing! Whether it's a bug fix, a new feature, or a documentation improvement — all contributions are valued.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold these standards.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/aria-access.git
   cd aria-access
   ```
3. **Add the upstream remote:**
   ```bash
   git remote add upstream https://github.com/supratimsarkar/aria-access.git
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Configure environment** — copy `.env.example` to `.env.local` and fill in your own keys (see README)

---

## How to Contribute

### Reporting bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include steps to reproduce, expected vs actual behaviour, and your environment.

### Suggesting features

Open a [feature request](.github/ISSUE_TEMPLATE/feature_request.md) or start a [GitHub Discussion](https://github.com/supratimsarkar/aria-access/discussions) for larger ideas before investing time in a PR.

### Submitting code

1. Check the [open issues](https://github.com/supratimsarkar/aria-access/issues) — comment on one to claim it before starting
2. For new features, open an issue first to align on scope
3. Branch off `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
4. Make your changes, then push and open a PR

---

## Development Setup

```bash
# Start the dev server
npm run dev

# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Push DB schema changes
npx drizzle-kit push
```

The app runs on [http://localhost:3000](http://localhost:3000).

---

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]
```

**Types:**

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `perf` | Performance improvement |
| `refactor` | Code change that is neither a fix nor a feature |
| `style` | Formatting, whitespace (no logic change) |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `chore` | Build process, dependency updates |

**Examples:**
```
feat(scan): add keyboard shortcut to trigger scan
fix(score-ring): clamp score to 0-100 before rendering
docs(readme): add architecture diagram
```

---

## Pull Request Process

1. **Keep PRs focused** — one concern per PR
2. **Fill in the PR template** completely
3. **Link the related issue** with `Closes #<number>`
4. **Ensure CI passes** — TypeScript, ESLint, and build must all be green
5. **Add a changeset description** in the PR body if the change affects public behaviour
6. PRs are reviewed within **48 hours** on weekdays

### PR checklist

- [ ] My change has a clear, focused scope
- [ ] I have run `npm run lint` and `npx tsc --noEmit` locally
- [ ] I have tested the feature / fix manually in the browser
- [ ] I have updated documentation where necessary
- [ ] I have linked the relevant issue

---

## Issue Guidelines

- **Search first** — avoid duplicate issues
- **One bug / one issue** — don't bundle unrelated problems
- **Provide context** — OS, browser, Node.js version, reproduction URL

---

## Questions?

Start a [GitHub Discussion](https://github.com/supratimsarkar/aria-access/discussions) or reach out at supratim347@gmail.com.
