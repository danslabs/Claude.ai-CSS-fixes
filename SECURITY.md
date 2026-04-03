# Security Policy

## Supported Versions

Only the latest version receives fixes. This project does not maintain older release branches.

| Version      | Supported          |
| ------------ | ------------------ |
| 2026-04-03.x | :white_check_mark: |
| < 2026-04-03 | :x:                |

Always use the auto-update feature in Tampermonkey to stay on the latest version.

---

## Security Scope

This script is intentionally minimal:

- It injects a single `<style>` tag into `https://claude.ai/*` only
- It does not manipulate the DOM
- It does not collect, transmit, or store any data
- It has no backend, no server, and no authentication
- By default it makes no external network requests

**Exception - `interfont` feature:** when enabled, Inter is loaded from `fonts.googleapis.com`. This means Google's servers receive a request originating from `claude.ai`. No personal data is included in the request, but Google can infer that the requesting user visited claude.ai. This feature is **off by default** - users who are privacy-conscious should leave it disabled.

The main realistic attack surfaces are:

- **Supply chain via `@updateURL`** - if this GitHub repo were compromised, a malicious update could be pushed to users automatically
- **CSS injection** - a crafted CSS rule could theoretically be used to obscure UI elements or create visual phishing overlaps on the Claude.ai page

---

## Reporting a Vulnerability

If you believe you have found a security issue in this script:

1. **Do not open a public GitHub issue** for anything that could be exploited before it is fixed
2. Report privately by emailing or sending a direct message via GitHub - contact details are on the [profile page](https://github.com/danslabs)
3. Include as much detail as possible - what the issue is, how it could be exploited, and any suggested fix if you have one

You can expect:

- An acknowledgement within a few days
- A fix or decision (accept/decline) within 7 days for anything confirmed
- A public note in the changelog once resolved, without disclosing exploit details until patched

If the issue is declined, you will receive a clear explanation of why it falls outside scope.

---

## Recommendations for Users

- Only install userscripts from sources you trust
- Review the script source before installing - it is short and readable by design
- Keep Tampermonkey set to check for updates regularly
- If you fork or modify this script, disable `@updateURL` and `@downloadURL` so your modified version does not silently receive upstream updates
- If you are privacy-conscious, keep `interfont` disabled to avoid any requests to Google Fonts servers