"use strict";

    let isShorts:boolean; 
    let blockShorts:boolean;
    let redirectSite:string = 'https://www.openbible.info/topics/building_wealth'

    chrome.storage.local.get(["blockShorts"], (result) => {
        blockShorts = result.blockShorts;
        console.log(blockShorts)
        if (blockShorts) {
            setInterval(() => {
                isShorts = window.location.href.includes("shorts");
                if (isShorts) {
                    window.location.replace(redirectSite);
                }
            }, 250);
        }
    });


 
    
 




