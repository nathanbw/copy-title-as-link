# Copy Title As Link
This repo houses the source code to a browser extension that adds a keyboard shortcut
(default: Alt-Shift-C / Option-Shift-C) that, when pressed, will copy a hyperlink to
the currently-focused page into the clipboard. This link can then be pasted anywhere
that accepts hyperlinks in text, like chat applications and office document
applications.

There are also hotkeys to copy links as Markdown text (default: Alt-Shift-M /
Option-Shift-M) or org-mode text (default: Alt-Shift-E / Option-Shift-E).

You can assign other hotkeys besides the defaults. In Firefox, you do that by
navigating to `about:addons`, clicking the cog wheel in the top right and selecting
"Manage Extension Shortcuts". In Chrome, the extension's popup should provide a link
to the configuration page in Chrome that allows you to select other hotkeys.

## How to install
### In Firefox
Install here: [Copy Page Title As Link – Get this Extension for 🦊 Firefox (en-US)](https://addons.mozilla.org/en-US/firefox/addon/copy-page-title-as-link/)

### In Chrome
The extension has been submitted to the Chrome Web Store but is currently pending review. Once the extension is
available in the web store, I'll update with a link to its page on the Chrome Web Store. In the meantime, you can clone
this repo and add the extension to Chrome manually, using the steps outlined below:

Clone this git repo (example below clones into
`~/src/chrome-extensions/copy-title-as-link`):
```
mkdir -p ~/src/chrome-extensions
cd ~/src/chrome-extensions
git clone git@github.com:nathanbw/copy-title-as-link.git
cd -
```

Go to `chrome://extensions` (copy-paste that into you URL bar), toggle "Developer
mode" on (top right corner of the page), then click on "Load Unpacked" (top left
corner of the page)

![screenshot of where to load unpacked extensions](load-unpacked-extension.png)

Select the `src/chrome` directory inside the directory you cloned this repo into.

After the extension is loaded, you can click on it in the extension menu to see its
popup; it has the aforementioned link for customizing the hotkeys:

![screenshot of how to open the extension's popup](how-to-open-popup.png)
