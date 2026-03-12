# Branch Protection Configuration

> **This file documents the exact GitHub UI steps to enable branch protection.**
> These settings must be configured manually in the GitHub web interface.

## Steps

1. Go to **[Repository Settings → Branches](https://github.com/maymun207/CompanyTech-website/settings/branches)**

2. Under **Branch protection rules**, click **"Add branch protection rule"**

3. Set **Branch name pattern** to: `main`

4. Enable the following settings:

### Required Status Checks

- [x] **Require status checks to pass before merging**
- [x] **Require branches to be up to date before merging**
- Add the following required checks:
  - `Lint & Typecheck`
  - `Build`
  - `Security Audit`

> **Note:** These check names must match the `name:` field in `.github/workflows/ci.yml`.
> The checks will only appear after the CI workflow has run at least once.

### Pull Request Reviews

- [x] **Require a pull request before merging**
- [x] **Require 1 approving review**
- [x] **Dismiss stale pull request approvals when new commits are pushed**

### Additional Protections

- [x] **Require branches to be up-to-date before merging**
- [x] **Block force pushes** (except for admins)
- [ ] ~~Require signed commits~~ _(optional — enable if GPG signing is set up)_

5. Click **"Create"** to save the rule.

## Verification

After creating the rule:

1. Create a test branch: `git checkout -b test/ci-check`
2. Push a commit: `git push -u origin test/ci-check`
3. Open a PR to `main`
4. Verify that the CI checks run automatically
5. Verify that merging is blocked until checks pass
6. Merge the PR and delete the test branch

## Workflow Summary

```
Developer pushes to feature branch
        │
        ▼
 Opens PR to main
        │
        ▼
┌───────────────────┐
│   CI Pipeline     │
│                   │
│  ✓ Lint & TS      │
│  ✓ Build          │
│  ✓ Security Audit │
└───────┬───────────┘
        │
        ▼
 1 approving review
        │
        ▼
 Merge to main
        │
        ▼
 Vercel auto-deploys
 to production
```
