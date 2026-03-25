// ==UserScript==
// @name         Claude.ai CSS Fixes
// @namespace    http://tampermonkey.net/
// @version      2026-03-25.5
// @description  Pure CSS tweaks for Claude.ai: wider chat, better code blocks, improved sidebar, and other quality-of-life improvements. No DOM manipulation - just a injected <style> tag.
// @author       Vibe coded by Dan - inspired by alexchexes/chatgpt_ui_fix for ChatGPT
// @match        https://claude.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// @updateURL    https://raw.githubusercontent.com/danslabs/claude-ai-css-fixes/main/claude-ai-css-fixes.user.js
// @downloadURL  https://raw.githubusercontent.com/danslabs/claude-ai-css-fixes/main/claude-ai-css-fixes.user.js
// @grant        GM_addStyle
// ==/UserScript==

/* global GM_addStyle */

/*
 * ============================================================
 *  Claude.ai CSS Fixes - vibe coded by Dan
 * ============================================================
 *  A pure-CSS Tampermonkey userscript that improves the
 *  Claude.ai interface without touching the DOM.
 *
 *  HOW TO TURN FEATURES ON OR OFF
 *  --------------------------------
 *  Each feature has an entry in the `settings` object below.
 *  Set  enabled: true   to turn it on.
 *  Set  enabled: false  to turn it off.
 *
 *  Example - to disable the wider chat column:
 *    chatWidth: {
 *      enabled: false,   // ← change true to false
 *      maxWidth: '90%',
 *    },
 *
 *  HOW TO ADJUST VALUES
 *  ---------------------
 *  Most features also expose a value you can tweak:
 *    maxWidth    - percentage or px width (e.g. '90%', '1200px')
 *    maxHeight   - max height of the textarea (e.g. '50dvh')
 *    fontFamily  - font name for code blocks
 *    bgColor     - background colour for code blocks
 *    background  - gradient or colour for user message bubbles
 *    color       - colour for sidebar headings
 *    width       - fixed width for the sidebar
 * ============================================================
 */

console.info("%c Claude.ai CSS Fixes - vibe coded by Dan ", 'color: #8ff; background: #111; font-weight: bold');

(function () {

  /*==============================================*
   *   SETTINGS - tweak these to your preference  *
   *===============================================*/
  const settings = {

    // Widens the main chat column and the home page input box.
    // Default Claude width is quite narrow - 90% uses most of the screen.
    chatWidth: {
      enabled: true,
      maxWidth: '90%',
    },

    // Lets the message input textarea grow taller before scrolling,
    // useful when pasting long blocks of text or code.
    textAreaHeight: {
      enabled: true,
      maxHeight: '50dvh',
    },

    // Changes the font inside code blocks to Consolas (a monospace coding font).
    // Replace 'Consolas' with any font installed on your system.
    codeBlockFont: {
      enabled: true,
      fontFamily: 'Consolas',
    },

    // Sets a darker background colour on code blocks for better contrast.
    codeBlockBackground: {
      enabled: true,
      bgColor: '#181818',
    },

    // Wraps long lines in code blocks instead of requiring horizontal scrolling.
    codeBlockLineBreaks: { enabled: true },

    // Gives inline code (e.g. `variable`) a warmer colour and subtle background
    // so it stands out more clearly from surrounding prose.
    inlineCodeColor: { enabled: true },

    // Tints your own message bubbles with a blue/purple gradient so they
    // stand out from Claude's plain responses.
    userMessageVisibility: {
      enabled: true,
      background: 'linear-gradient(135deg, #34437a, #2b2f54)',
    },

    // Makes the top bar on chat pages transparent so it doesn't eat vertical space.
    topBarTransparency: { enabled: true },

    // Widens the sidebar. Disabled by default - enable if you want more room
    // for longer chat titles. May affect layout on smaller screens.
    sidebarWidth: {
      enabled: false,
      width: '280px',
    },

    // Colours the "Recents" / date headings in the sidebar so they're easier
    // to scan. Change the hex value to any colour you like.
    sidebarHeadingsVisibility: {
      enabled: true,
      color: '#f39c12',
    },

    // Allows sidebar chat titles to wrap onto multiple lines instead of being
    // cut off with an ellipsis. Also strips the fade-out mask Claude applies.
    multilineHistoryTitles: { enabled: true },

    // Makes the copy/retry/thumbs action buttons always visible below each
    // message, rather than only appearing on hover.
    alwaysVisibleActions: { enabled: true },

    // Reduces the visual weight of the "Invite team members" button at the
    // bottom of the sidebar so it doesn't compete for attention.
    subtleInviteButton: { enabled: true },

    // Fades the top-right action buttons on the home/new-chat page (they use
    // a different structure to the chat page header).
    homePageTopBar: { enabled: true },
  };

  /*=============================================*
   *   CSS - verified against live DOM           *
   *==============================================*/
  const css = {

    /* Two wrappers both carry max-w-3xl - override both */
    chatWidth: `
      /* Outer scroll container (chat page) */
      .mx-auto.flex.size-full.flex-col.max-w-3xl {
        max-width: ${settings.chatWidth.maxWidth} !important;
      }
      /* Inner message column (chat page) */
      .flex-1.flex.flex-col.px-4.max-w-3xl.mx-auto.w-full.pt-1 {
        max-width: ${settings.chatWidth.maxWidth} !important;
      }
      /* Home page greeting + input column */
      .mx-auto.flex.w-full.flex-col.items-center.gap-7.max-w-2xl,
      .top-5.z-10.mx-auto.w-full.max-w-2xl,
      .mx-auto.w-full.max-w-2xl {
        max-width: ${settings.chatWidth.maxWidth} !important;
      }
    `,

    textAreaHeight: `
      .tiptap.ProseMirror {
        max-height: ${settings.textAreaHeight.maxHeight} !important;
        overflow-y: auto;
      }
    `,

    codeBlockFont: `
      code, pre, pre code {
        font-family: ${settings.codeBlockFont.fontFamily}, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace !important;
      }
    `,

    /* Claude uses an inline arbitrary variant on the parent:
       [&_pre>div]:bg-bg-000/50  - we target pre > div directly */
    codeBlockBackground: `
      .font-claude-response pre > div {
        background-color: ${settings.codeBlockBackground.bgColor} !important;
      }
    `,

    codeBlockLineBreaks: `
      @media (min-width: 768px) {
        pre code {
          white-space: pre-wrap !important;
          overflow-wrap: anywhere !important;
          min-width: unset !important;
        }
      }
    `,

    /* Inline code: confirmed classes from live DOM:
       bg-text-200/5 border border-0.5 border-border-300 text-danger-000 */
    inlineCodeColor: `
      .font-claude-response :not(pre) > code,
      .standard-markdown :not(pre) > code {
        color: #eab38a !important;
        background: #272727 !important;
        border-color: rgba(94, 93, 89, 0.4) !important;
      }
    `,

    /* User bubble outer wrapper confirmed: bg-bg-300 rounded-xl
       We target the direct child div which holds the content */
    userMessageVisibility: `
      .bg-bg-300.rounded-xl {
        background: ${settings.userMessageVisibility.background} !important;
      }
    `,

    /* Header confirmed: header.flex.w-full.bg-bg-100.sticky.top-0.z-header */
    topBarTransparency: `
      header.sticky.top-0 {
        background: transparent !important;
        box-shadow: none !important;
      }
    `,

    /* Sidebar nav confirmed: nav[aria-label="Sidebar"] */
    sidebarWidth: `
      nav[aria-label="Sidebar"] {
        min-width: ${settings.sidebarWidth.width} !important;
        width:     ${settings.sidebarWidth.width} !important;
      }
    `,

    /* Sidebar date headings use text-text-500 class (confirmed: "Recents" h2) */
    sidebarHeadingsVisibility: `
      nav[aria-label="Sidebar"] h2 {
        color: ${settings.sidebarHeadingsVisibility.color} !important;
        font-weight: 600;
        opacity: 1 !important;
      }
    `,

    /* Chat titles use span.truncate inside anchor tags in the sidebar.
       Also override the fixed h-8 height on the anchor that clips wrapped text. */
    multilineHistoryTitles: `
      /* Remove fixed height and overflow-hidden from the anchor */
      nav[aria-label="Sidebar"] a[data-dd-action-name="sidebar-chat-item"] {
        height: auto !important;
        min-height: 2rem !important;
        overflow: visible !important;
        padding-block: 0.375rem !important;
        white-space: normal !important;
      }
      /* Unwrap the inner span */
      nav[aria-label="Sidebar"] a[data-dd-action-name="sidebar-chat-item"] span.truncate {
        overflow: visible !important;
        white-space: normal !important;
        text-overflow: unset !important;
        mask-image: none !important;
        -webkit-mask-image: none !important;
      }
    `,

    /* Message action buttons (copy, retry, thumbs) - always visible, not just on hover */
    alwaysVisibleActions: `
      [role="group"][aria-label="Message actions"] {
        opacity: 1 !important;
      }
    `,

    /* Shrink the "Invite team members" button and make it less prominent */
    subtleInviteButton: `
      nav[aria-label="Sidebar"] .px-2.py-1 button {
        opacity: 0.4;
        font-size: 0.75rem;
        padding-block: 0.375rem;
        transition: opacity 0.2s;
      }
      nav[aria-label="Sidebar"] .px-2.py-1 button:hover {
        opacity: 0.8;
      }
    `,

    /* Home page uses a different top-right fixed div for actions, not a <header> */
    homePageTopBar: `
      /* Fixed action bar top-right on home page */
      .fixed.right-3.z-header {
        opacity: 0.5;
        transition: opacity 0.2s;
      }
      .fixed.right-3.z-header:hover {
        opacity: 1;
      }
      /* Home page <main> has no header - the bg shows through fine already,
         but neutralise any accidental sticky header bleed */
      main.mx-auto > header,
      main + header {
        background: transparent !important;
        box-shadow: none !important;
      }
    `,
  };

  /*=============================================*
   *   Inject only enabled feature blocks        *
   *==============================================*/
  let combined = '/* CLAUDE_CSS_FIXES */\n';
  for (const [key, block] of Object.entries(css)) {
    if (settings[key]?.enabled) {
      combined += block + '\n';
    }
  }
  GM_addStyle(combined);

})();
