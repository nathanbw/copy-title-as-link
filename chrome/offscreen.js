chrome.runtime.onMessage.addListener(handleRequest);

async function handleRequest(request, sender, sendResponse) {
    if (request.message === "copyTitleAsLink") {
        copyTitleAsLinkToClipboard(request.data).then(
            sendResponse("OK")
        );
    } else if (request.message === "copyTitleAsOrgModeLink") {
        copyTitleAsOrgModeLink(request.data).then(
            sendResponse("OK")
        );
    } else if (request.message === "copyTitleAsMarkdownLink") {
        copyTitleAsMarkdownLink(request.data).then(
            sendResponse("OK")
        );
    }
}

async function copyTitleAsLinkToClipboard(data) {
    const copyFrom = document.createElement('a');
    copyFrom.style.position = 'fixed';
    copyFrom.style.opacity = 0;
    // copyFrom.style = '';
    copyFrom.text = data.title;
    copyFrom.href = data.url;
    await copyDomElement(copyFrom);
}

async function copyTitleAsOrgModeLink(data) {

    const linkOrgModeString = '[[' + data.url + '][' + data.title + ']]';
    // As far as I can tell, Google Chrome will not allow us to use `navigator.clipboard.writeText` because
    // this offscreen document will never have focus, so we have to invent `copyRawTextToClipboard` to do it
    // the hard way:
    //navigator.clipboard.writeText(linkOrgModeString);
    copyRawTextToClipboard(linkOrgModeString);
}

async function copyTitleAsMarkdownLink(data) {
    const linkMarkdownString = '[' + data.title + '](' + data.url + ')';
    // As far as I can tell, Google Chrome will not allow us to use `navigator.clipboard.writeText` because
    // this offscreen document will never have focus, so we have to invent `copyRawTextToClipboard` to do it
    // the hard way:
    copyRawTextToClipboard(linkMarkdownString);
}

async function copyDomElement(element) {
    document.body.appendChild(element);
    let range = document.createRange();
    range.selectNode(element);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.body.removeChild(element);
}

async function copyRawTextToClipboard(text) {
    const copyFrom = document.createElement('textarea');
    copyFrom.style.position = 'fixed';
    copyFrom.style.opacity = 0;
    copyFrom.value = text;
    await copyDomElement(copyFrom);
}

function transformTitleText(url, title) {
    // TODO: This is the beginnings of a feature that will allow users to define custom regexes per-domain to change
    //       the title which is copied to the clipboard. This mechanism would allow people to add, remove, or change a
    //       prefix or suffixes from configured sites as desired.
    return title;
}
