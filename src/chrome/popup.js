// This script is loaded with `defer`. It might be preferable to
// Use "document.ready" or whatever, but this seems to work ¯\_(ツ)_/¯
let openHotkeyConfigPage = function () {
    chrome.tabs.create({url: 'chrome://extensions/shortcuts'});
}

let hotkey_link = document.getElementById("hotkey-link");
hotkey_link.onclick = openHotkeyConfigPage;