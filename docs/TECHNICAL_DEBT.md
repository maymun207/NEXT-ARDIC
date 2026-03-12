# Technical Debt Tracker

**Project:** CompanyTech Website  
**Last Updated:** February 1, 2026  
**Purpose:** Track technical debt and improvement opportunities

---

## 🔴 Critical (Fix Before Launch)

| ID     | Issue                    | Impact                   | Effort | Status  | Assigned |
| ------ | ------------------------ | ------------------------ | ------ | ------- | -------- |
| TD-001 | No automated testing     | High risk of regressions | 4h     | 🔴 Open | -        |
| TD-002 | Missing error boundaries | Poor UX on errors        | 1h     | 🔴 Open | -        |
| TD-003 | No security headers      | Security vulnerability   | 1h     | 🔴 Open | -        |
| TD-004 | Content not anonymized   | Legal risk               | 1h     | 🔴 Open | -        |
| TD-005 | No env var validation    | Runtime failures         | 30m    | 🔴 Open | -        |

---

## 🟡 High Priority (Fix Soon)

| ID     | Issue                                    | Impact            | Effort | Status  | Assigned |
| ------ | ---------------------------------------- | ----------------- | ------ | ------- | -------- |
| TD-006 | Header is Client Component unnecessarily | Bundle size       | 1h     | 🟡 Open | -        |
| TD-007 | ROI calculator missing useMemo           | Performance       | 30m    | 🟡 Open | -        |
| TD-008 | No lazy loading for sections             | Initial load time | 1h     | 🟡 Open | -        |
| TD-009 | Color contrast issues                    | Accessibility     | 1h     | 🟡 Open | -        |
| TD-010 | Missing focus trap in mobile menu        | Accessibility     | 1h     | 🟡 Open | -        |
| TD-011 | Hard-coded strings not i18n              | Localization      | 30m    | 🟡 Open | -        |
| TD-012 | Missing Twitter Cards                    | SEO               | 30m    | 🟡 Open | -        |
| TD-013 | Incomplete structured data               | SEO               | 1h     | 🟡 Open | -        |

---

## 🟢 Medium Priority (Nice to Have)

| ID     | Issue                                 | Impact               | Effort | Status  | Assigned |
| ------ | ------------------------------------- | -------------------- | ------ | ------- | -------- |
| TD-014 | No analytics integration              | No user insights     | 2h     | 🟢 Open | -        |
| TD-015 | No image optimization                 | Performance          | 2h     | 🟢 Open | -        |
| TD-016 | Missing JSDoc comments                | Documentation        | 3h     | 🟢 Open | -        |
| TD-017 | No Prettier configuration             | Code consistency     | 30m    | 🟢 Open | -        |
| TD-018 | Missing architecture diagrams         | Documentation        | 2h     | 🟢 Open | -        |
| TD-019 | No bundle analyzer                    | Performance insights | 30m    | 🟢 Open | -        |
| TD-020 | Currency formatting hard-coded locale | i18n                 | 30m    | 🟢 Open | -        |

---

## 📊 Summary

**Total Issues:** 20  
**Critical:** 5  
**High Priority:** 8  
**Medium Priority:** 7

**Total Estimated Effort:** ~25 hours

---

## 📝 Notes

- Update status as issues are resolved
- Add new issues as they're discovered
- Prioritize based on business impact
- Review quarterly

---

## 🔄 Resolution Template

When resolving an issue, update the entry:

```markdown
| TD-XXX | Issue name | Impact | Effort | ✅ Resolved | Developer Name |
```

Add resolution notes below the table:

```markdown
### TD-XXX Resolution

**Date:** YYYY-MM-DD  
**Solution:** Brief description  
**PR:** #123  
**Notes:** Any additional context
```
