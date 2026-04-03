---
name: Bug report
about: Create a report to help us improve
title: "[BUG]"
labels: ''
assignees: danslabs

---

**Describe the bug**
A clear and concise description of what the bug is. Which feature is affected?

**To Reproduce**
Steps to reproduce the behaviour:
1. Go to '...'
2. Do '...'
3. See issue

**Expected behaviour**
A clear and concise description of what you expected to happen.

**Actual behaviour**
What is it doing instead? If a feature is silently doing nothing, say so.

**Selector check**
This script targets Claude.ai's Tailwind classes which can change without notice. Before reporting, please do a quick check:
1. Open Chrome DevTools - Elements tab
2. Find the element the feature should affect
3. Check whether the classes in the selector still match the live DOM

- [ ] I checked the selector and the classes have changed
- [ ] I checked the selector and it still matches but the feature is still broken
- [ ] I was not able to check

If the classes have changed, paste the current classes from DevTools here:
```
(paste here)
```

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome, Firefox]
- Browser version: [e.g. 123]
- Script version: [e.g. 2026-03-31.2 - found in the @version line at the top of the script]
- Tampermonkey version: [e.g. 5.4.1]

**Additional context**
Add any other context about the problem here - e.g. when it started, whether it worked before a recent Claude.ai update.
