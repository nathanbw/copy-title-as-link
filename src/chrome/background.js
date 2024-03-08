// "Command" listener -- handles the hotkey press:
chrome.commands.onCommand.addListener(handleHotKey);

async function handleHotKey(command) {
    let messageToSend = "";
    // TODO: Can you pass the same command string as a message to the content script?
    // TODO: If you can't, can you make a "this-case-string" to "thisCaseString" converter function?
    if (command === "copy-title-as-link") {
        messageToSend = "copyTitleAsLink";
    } else if (command === "copy-title-as-org-mode-link") {
        messageToSend = "copyTitleAsOrgModeLink";
    } else if (command === "copy-title-as-markdown-link") {
        messageToSend = "copyTitleAsMarkdownLink";
    } else {
        console.log("Unrecognized message");
        return;
    }

    chrome.tabs.query({active: true, currentWindow: true}, async function (tabs) {
        let tab = tabs[0]
        // console.log("\tTab ID: " + tab.id);
        // console.log("\tTab Title: " + tab.title);
        // console.log("\tTab URL: " + tab.url);
        const offscreenDocumentPath = 'offscreen.html'
        // create offscreen document if it's not open already
        if (!(await hasOffscreenDocument(offscreenDocumentPath))) {
            await chrome.offscreen.createDocument({
                url: chrome.runtime.getURL(offscreenDocumentPath),
                reasons: ['CLIPBOARD'],
                justification: 'Copying the title as a link to the URL into the clipboard',
            });
        }
        // Send message to offscreen document
        // console.log("\tmessageToSend: " + messageToSend);
        chrome.runtime.sendMessage({
            message: messageToSend,
            data: {
                title: tab.title,
                url: tab.url
            }
        });
    });
}

async function hasOffscreenDocument(path) {
    // Check all windows controlled by the service worker to see if one
    // of them is the offscreen document with the given path
    const offscreenUrl = chrome.runtime.getURL(path);
    const matchedClients = await clients.matchAll();
    for (const client of matchedClients) {
        if (client.url === offscreenUrl) {
            return true;
        }
    }
    return false;
}
