// "Command" listener -- handles the hotkey press:
chrome.commands.onCommand.addListener(handleHotKey);

async function handleHotKey(command) {
    chrome.tabs.query({active: true, currentWindow: true}, async function (tabs) {
        let tab = tabs[0]
        console.log("command: " + command);
        console.log("\tTab ID: " + tab.id);
        console.log("\tTab Title: " + tab.title);
        console.log("\tTab URL: " + tab.url);
        const data = {
            title: tab.title,
            url: tab.url
        };

        if (command === "copy-title-as-link") {
            await copyTitleAsLink(data);
        } else if (command === "copy-title-as-org-mode-link") {
            await copyTitleAsOrgModeLink(data);
        } else if (command === "copy-title-as-markdown-link") {
            await copyTitleAsMarkdownLink(data);
        } else {
            console.log("Unrecognized message");
        }
    });
}

async function copyTitleAsMarkdownLink(data) {
    //////// Using clipboard API here because it's just plain text:
    const linkMarkdownString = '[' + data.title + '](' + data.url + ')';
    navigator.clipboard.writeText(linkMarkdownString);
}
async function copyTitleAsOrgModeLink(data) {
    //////// Using clipboard API here because it's just plain text:
    const linkOrgModeString = '[[' + data.url + '][' + data.title + ']]';
    navigator.clipboard.writeText(linkOrgModeString);
}

async function copyTitleAsLink(data) {
    const copyFrom = document.createElement('a');
    copyFrom.style.position = 'fixed';
    copyFrom.style.opacity = 0;
    copyFrom.text = data.title;
    copyFrom.href = data.url;
    // copyFrom.setAttribute('style', '');
    document.body.appendChild(copyFrom);
    let range = document.createRange();
    range.selectNode(copyFrom);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.body.removeChild(copyFrom);
}



