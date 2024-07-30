"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ 'blockShorts': true, 'blockTerms': ['youtube.com/shorts'], 'redirectUrl': 'https://www.google.com/' });
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === "getBlockShorts") {
        chrome.storage.local.get('blockShorts', (result) => {
            sendResponse({ message: result.blockShorts });
        });
    }
    else if (message.message === "changeBlockShorts") {
        chrome.storage.local.set({ 'blockShorts': message.value });
        console.log(message.value);
        sendResponse({ message: 'ok' });
    }
    else if (message.message === "inputFieldUpdate") {
        let terms = message.value.split(',');
        chrome.storage.local.set({ 'blockTerms': terms });
        sendResponse({ message: 'ok' });
    }
    else if (message.message === "redirectFieldUpdate") {
        chrome.storage.local.set({ 'redirectUrl': message.value });
        sendResponse({ message: 'ok' });
    }
    return true;
});
function getCurrentTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = yield chrome.tabs.query(queryOptions);
        return tab;
    });
}
function checkURL() {
    return __awaiter(this, void 0, void 0, function* () {
        let tab = yield getCurrentTab();
        if (tab) {
            chrome.storage.local.get('redirectUrl', (redirectUrlResult) => {
                chrome.storage.local.get('blockTerms', (blockTermsResult) => {
                    let terms = blockTermsResult.blockTerms.map((term) => term.trim());
                    terms.forEach((term) => {
                        var _a;
                        if ((_a = tab.url) === null || _a === void 0 ? void 0 : _a.includes(term)) {
                            chrome.tabs.update(tab.id, { url: redirectUrlResult.redirectUrl }, () => { console.log(redirectUrlResult.redirectUrl); });
                        }
                    });
                });
            });
        }
    });
}
chrome.tabs.onActivated.addListener(() => {
    chrome.storage.local.get('blockShorts', (result) => {
        if (result.blockShorts === true) {
            checkURL();
        }
    });
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        chrome.storage.local.get('blockShorts', (result) => {
            if (result.blockShorts === true) {
                checkURL();
            }
        });
    }
});
