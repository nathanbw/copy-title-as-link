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
    let textForLink = transformTitleText(data.url, data.title);
    ///////////////////////// The way that definitely works
    var copyFrom = document.createElement("a");
    copyFrom.text = textForLink;
    copyFrom.href = data.url;
    copyFrom.setAttribute('style', '');
    document.body.appendChild(copyFrom);

    // https://stackoverflow.com/questions/34191780/javascript-copy-string-to-clipboard-as-text-html
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(copyFrom);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.body.removeChild(copyFrom);
    ////////////////////////////////////
}

async function copyTitleAsOrgModeLink(data) {
    // TODO DRY this up; avoid duplication with copyTitleAsMarkdownLink
    let textForLink = transformTitleText(data.url, data.title);
    const linkOrgString = '[['  + data.url + ']['+ textForLink + ']]';
    var copyFrom = document.createElement("textarea");
    copyFrom.value = linkOrgString;
    document.body.appendChild(copyFrom);

    // https://stackoverflow.com/questions/34191780/javascript-copy-string-to-clipboard-as-text-html
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(copyFrom);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    document.body.removeChild(copyFrom);

}

async function copyTitleAsMarkdownLink(data) {
    let textForLink = transformTitleText(data.url, data.title);
    const linkMarkdownString = '[' + textForLink + '](' + data.url + ')';
    var copyFrom = document.createElement("textarea");
    copyFrom.value = linkMarkdownString;
    document.body.appendChild(copyFrom);

    // https://stackoverflow.com/questions/34191780/javascript-copy-string-to-clipboard-as-text-html
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(copyFrom);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    document.body.removeChild(copyFrom);
}

function transformTitleText(url, title) {
    // TODO: This is the beginnings of a feature that will allow users to define custom regexes per-domain to change
    //       the title which is copied to the clipboard. This mechanism would allow people to add, remove, or change a
    //       prefix or suffixes from configured sites as desired.
    return title;
}
