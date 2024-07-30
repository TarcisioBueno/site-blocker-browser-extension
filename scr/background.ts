chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ 'blockShorts': true, 'blockTerms': ['youtube.com/shorts'],'redirectUrl':'https://www.google.com/'});
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === "getBlockShorts") {
        chrome.storage.local.get('blockShorts', (result) => {
            sendResponse({ message: result.blockShorts })
        })
    } else if (message.message === "changeBlockShorts") {
        chrome.storage.local.set({ 'blockShorts': message.value });
        console.log(message.value)
        sendResponse({ message: 'ok' });
    } else if (message.message === "inputFieldUpdate") {
        let terms = message.value.split(',')
        chrome.storage.local.set({ 'blockTerms': terms })
        sendResponse({ message: 'ok' });
    } else if (message.message === "redirectFieldUpdate"){
        chrome.storage.local.set({ 'redirectUrl': message.value })
        sendResponse({ message: 'ok' });
    }
    return true;
});


async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function checkURL() {
    let tab = await getCurrentTab();
    if (tab) {


        chrome.storage.local.get('redirectUrl',(redirectUrlResult)=>{

            chrome.storage.local.get('blockTerms', (blockTermsResult) => {

                let terms: string[] = blockTermsResult.blockTerms.map((term: string) => term.trim());

                terms.forEach((term) => {

                    if (tab.url?.includes(term)) {
                        chrome.tabs.update(
                            tab.id!,
                            { url: redirectUrlResult.redirectUrl },
                            () => { console.log(redirectUrlResult.redirectUrl) }
                        );
                    }
                });
            });

        })


    }
}

chrome.tabs.onActivated.addListener(() => {
    chrome.storage.local.get('blockShorts', (result) => {
        if (result.blockShorts === true) {
            checkURL()
        }
    })
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        chrome.storage.local.get('blockShorts', (result) => {
            if (result.blockShorts === true) {
                checkURL()
            }
        })
    }
});
