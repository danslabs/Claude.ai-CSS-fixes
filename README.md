# Claude.ai CSS Fixes
A pure-CSS [**Tampermonkey**](https://www.tampermonkey.net/) userscript that improves the Claude.ai interface.
No DOM manipulation - just an injected `<style>` tag.
> Inspired by [**alexchexes/chatgpt_ui_fix**](https://gist.github.com/alexchexes/d2ff0b9137aa3ac9de8b0448138125ce) for ChatGPT.
---
## Install
1. Install the [**Tampermonkey**](https://www.tampermonkey.net/) browser extension
2. Click the link below to install the script directly:
**[⬇️ Install claude-ai-css-fixes.user.js](https://github.com/danslabs/Claude.ai-CSS-fixes/raw/refs/heads/main/claude-ai-css-fixes.user.js)**
Tampermonkey will detect the `@downloadURL` header and prompt you to install it automatically.
---
## Features
All features can be toggled on/off via the `settings` object at the top of the script.
| Feature                     | Default | What it does                                          |
| --------------------------- | ------- | ----------------------------------------------------- |
| `debug`                     | ❌ Off  | Logs active features and injected CSS size to console |
| `chatWidth`                 | ✅ On   | Widens the chat column to 90% of the screen           |
| `textAreaHeight`            | ✅ On   | Lets the input box grow taller before scrolling       |
| `codeBlockFont`             | ✅ On   | Uses Consolas font in code blocks                     |
| `codeBlockBackground`       | ✅ On   | Darker background on code blocks for contrast         |
| `codeBlockLineBreaks`       | ✅ On   | Wraps long code lines instead of horizontal scroll    |
| `inlineCodeColor`           | ✅ On   | Warmer colour on inline `code` so it stands out       |
| `userMessageVisibility`     | ✅ On   | Blue/purple gradient on your message bubbles          |
| `topBarTransparency`        | ✅ On   | Makes the chat page top bar transparent               |
| `sidebarWidth`              | ❌ Off  | Widens the sidebar (enable if titles get cut off)     |
| `sidebarHeadingsVisibility` | ✅ On   | Colours the "Recents" date headings in the sidebar    |
| `multilineHistoryTitles`    | ✅ On   | Lets sidebar chat titles wrap instead of truncating   |
| `alwaysVisibleActions`      | ✅ On   | Always shows copy/retry/thumbs buttons under messages |
| `subtleInviteButton`        | ✅ On   | Fades the "Invite team members" sidebar button        |
| `homePageTopBar`            | ✅ On   | Fades the top-right buttons on the home page          |
---
## Customising
Open the script in Tampermonkey's editor. At the top you'll find a `settings` object:
```js
chatWidth: {
  enabled: true,   // set to false to turn off
  maxWidth: '90%', // change to e.g. '1200px'
},
```
- Set `enabled: false` to turn any feature off
- Most features expose a value you can tweak (width, colour, font, etc.)
---
## Debug Mode
To see which features are active and how much CSS was injected, enable debug mode:
```js
debug: {
  enabled: true,
},
```
With debug on, the browser console will show:
- A styled banner confirming the script loaded
- A list of every active feature by name
- The total number of CSS characters injected
Set it back to `false` before normal use - it produces no output when off.
---
## Auto-updates
The script includes `@updateURL` and `@downloadURL` headers pointing to this repo.
Tampermonkey will check for updates automatically based on your update settings.
---
## Notes
- CSS selectors are verified against the live Claude.ai DOM - if Anthropic update their frontend, some selectors may need refreshing
- Tested on Chrome, Edge & FireFox + Tampermonkey
- No data is collected or sent anywhere
---
## Selector Health Check
Claude.ai uses Tailwind utility classes that can change without notice. If a feature silently stops working:

1. Open Chrome DevTools → **Elements** tab
2. Find the element the feature should affect
3. Compare its current classes to the selector in the `css {}` block inside the script
4. Update the selector to match, or [open an issue](https://github.com/danslabs/Claude.ai-CSS-fixes/issues)

ARIA-based selectors (e.g. `nav[aria-label="Sidebar"]`) and `data-*` attribute selectors are more stable than Tailwind class combinations and are preferred where possible.
---
## Changelog
| Version      | Changes                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-03.1 | Fixed `chatWidth` outer container selector for existing chat pages: `size-full` → `w-full flex-1` to match current live DOM                               |
| 2026-03-31.3 | README - added Known Issues section covering fragile selectors and other known issues; added Debug Mode section; added Selector Health Check section       |
| 2026-03-31.2 | Fixed `textAreaHeight` to suppress horizontal scrollbars; fixed `sidebarHeadingsVisibility` font-weight to use `!important` so Tailwind can't override it |
| 2026-03-31.1 | Added debug mode, changelog, and selector health-check notes; moved `console.info` inside IIFE                                                            |
| 2026-03-25.5 | Added `homePageTopBar` and `subtleInviteButton` features                                                                                                  |
---
## Licence
MIT - do whatever you like with it.
