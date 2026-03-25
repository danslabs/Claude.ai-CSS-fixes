# Claude.ai CSS Fixes

A pure-CSS [Tampermonkey](https://www.tampermonkey.net/) userscript that improves the Claude.ai interface.  
No DOM manipulation — just an injected `<style>` tag.

> Inspired by [alexchexes/chatgpt_ui_fix](https://github.com/alexchexes/chatgpt_ui_fix) for ChatGPT.

---

## Install

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Click the link below to install the script directly:

**[⬇️ Install claude-ai-css-fixes.user.js](https://raw.githubusercontent.com/danslabs/claude-ai-css-fixes/main/claude-ai-css-fixes.user.js)**

Tampermonkey will detect the `@downloadURL` header and prompt you to install it automatically.

---

## Features

All features can be toggled on/off via the `settings` object at the top of the script.

| Feature | Default | What it does |
|---|---|---|
| `chatWidth` | ✅ On | Widens the chat column to 90% of the screen |
| `textAreaHeight` | ✅ On | Lets the input box grow taller before scrolling |
| `codeBlockFont` | ✅ On | Uses Consolas font in code blocks |
| `codeBlockBackground` | ✅ On | Darker background on code blocks for contrast |
| `codeBlockLineBreaks` | ✅ On | Wraps long code lines instead of horizontal scroll |
| `inlineCodeColor` | ✅ On | Warmer colour on inline `code` so it stands out |
| `userMessageVisibility` | ✅ On | Blue/purple gradient on your message bubbles |
| `topBarTransparency` | ✅ On | Makes the chat page top bar transparent |
| `sidebarWidth` | ❌ Off | Widens the sidebar (enable if titles get cut off) |
| `sidebarHeadingsVisibility` | ✅ On | Colours the "Recents" date headings in the sidebar |
| `multilineHistoryTitles` | ✅ On | Lets sidebar chat titles wrap instead of truncating |
| `alwaysVisibleActions` | ✅ On | Always shows copy/retry/thumbs buttons under messages |
| `subtleInviteButton` | ✅ On | Fades the "Invite team members" sidebar button |
| `homePageTopBar` | ✅ On | Fades the top-right buttons on the home page |

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

## Auto-updates

The script includes `@updateURL` and `@downloadURL` headers pointing to this repo.  
Tampermonkey will check for updates automatically based on your update settings.

---

## Notes

- CSS selectors are verified against the live Claude.ai DOM — if Anthropic update their frontend, some selectors may need refreshing
- Tested on Chrome + Tampermonkey
- No data is collected or sent anywhere

---

## Licence

MIT — do whatever you like with it.
