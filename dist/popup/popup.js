"use strict";
var _a, _b, _c;
window.onload = () => {
    // Retrieve the value of 'blockShorts' from local storage
    chrome.storage.local.get(['blockShorts'], (result) => {
        let checkBox = document.getElementById("allowShortsCheckBox");
        if (result.blockShorts === true) {
            checkBox.checked = true;
        }
        else {
            checkBox.checked = false;
        }
    });
    chrome.storage.local.get(['blockTerms'], (result) => {
        let inputText = document.getElementById("blockTerms");
        inputText.value = result.blockTerms;
    });
    chrome.storage.local.get(['redirectUrl'], (result) => {
        let inputText = document.getElementById("redirectUrl");
        inputText.value = result.redirectUrl;
    });
};
(_a = document.getElementById("allowShortsCheckBox")) === null || _a === void 0 ? void 0 : _a.addEventListener('change', () => {
    let checkboxElement = document.getElementById("allowShortsCheckBox");
    chrome.runtime.sendMessage({ message: "changeBlockShorts", value: checkboxElement.checked }, (response) => {
        console.log(response);
    });
});
(_b = document.getElementById("blockTerms")) === null || _b === void 0 ? void 0 : _b.addEventListener('change', () => {
    let inputText = document.getElementById("blockTerms");
    let inputValue = inputText.value;
    // Regular expression to match the desired format
    let regex = /^((?:https?:\/\/)?[\w.-]+(?:\.[\w.-]+)*(?:\/[\w.-]*)*|[\w.-]+)(?:\s*,\s*((?:https?:\/\/)?[\w.-]+(?:\.[\w.-]+)*(?:\/[\w.-]*)*|[\w.-]+))*$/;
    if (regex.test(inputValue)) {
        // Input matches the desired format
        chrome.runtime.sendMessage({ message: "inputFieldUpdate", value: inputValue }, (response) => {
            console.log(response);
        });
    }
    else {
        // Input does not match the desired format
        inputText.value = '';
        alert("Please enter terms in the correct format: term, term1.com, https://example.com/, term3, ...");
    }
});
(_c = document.getElementById("redirectUrl")) === null || _c === void 0 ? void 0 : _c.addEventListener('change', () => {
    let inputText = document.getElementById("blockTerms");
    let inputValue = inputText.value;
    // Input matches the desired format
    chrome.runtime.sendMessage({ message: "redirectFieldUpdate", value: inputValue }, (response) => {
        console.log(response);
    });
});
