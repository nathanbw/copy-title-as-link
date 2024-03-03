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
The submission to the Firefox addons page is pending; when it has completed, I'll
include a link to the page here. In the meantime, you can load this as a temporary
addon, which I will unfortunately leave as an exercise for the reader (because the
submission is pending, which will obviate the need to load this extension as a
temporary extension)

### In Chrome
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

![screenshot of how to open the extention's popup](how-to-open-popup.png)
