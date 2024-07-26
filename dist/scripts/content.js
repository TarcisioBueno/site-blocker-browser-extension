"use strict";
let isShorts;
let blockShorts;
let redirectSite = 'https://www.openbible.info/topics/building_wealth';
chrome.storage.local.get(["blockShorts"], (result) => {
    blockShorts = result.blockShorts;
    console.log(blockShorts);
    if (blockShorts) {
        setInterval(() => {
            isShorts = window.location.href.includes("shorts");
            if (isShorts) {
                window.location.replace(redirectSite);
            }
        }, 250);
    }
});
