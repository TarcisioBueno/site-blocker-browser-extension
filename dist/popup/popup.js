"use strict";
var _a;
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
};
(_a = document.getElementById("allowShortsCheckBox")) === null || _a === void 0 ? void 0 : _a.addEventListener('change', () => {
    let checkboxElement = document.getElementById("allowShortsCheckBox");
    chrome.runtime.sendMessage({ message: "changeBlockShorts", value: checkboxElement.checked }, (response) => {
        console.log(response);
    });
});
