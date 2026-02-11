# X Clean Share

A Chrome extension that removes tracking parameters from X/Twitter share URLs.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shifumin/x-clean-share.git
   cd x-clean-share
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the extension:
   ```bash
   pnpm build
   ```
4. Open `chrome://extensions/` in Chrome
5. Enable **Developer mode** (toggle in the top right)
6. Click **Load unpacked** and select the `.output/chrome-mv3` directory

## Features

Automatically cleans X/Twitter URLs when you copy them — no manual action needed.

### What it removes

Tracking parameters such as `s`, `t`, `cxt`, `ref_src`, `ref_url` are stripped from copied URLs.

| Before | After |
|--------|-------|
| `https://x.com/user/status/123?s=20&t=abc` | `https://x.com/user/status/123` |

### How it works

- Intercepts clipboard writes (share button, copy link, etc.)
- Intercepts copy events (Ctrl+C / Cmd+C on selected text)
- Only modifies X/Twitter URLs — all other content is left untouched
- Preserves parameters on search, hashtag, and redirect pages

## Tech Stack

- TypeScript
- [WXT](https://wxt.dev/) (Manifest V3)
- [Vitest](https://vitest.dev/)
- [Biome](https://biomejs.dev/)
