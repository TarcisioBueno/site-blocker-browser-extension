"use strict";


window.onload = () => {
    /*chrome.runtime.sendMessage({ message: "getBlockShorts" }, (response) => {
        alert(response.message);
    });*/

    let pageURL = window.location.href;

    alert(pageURL);

    chrome.storage.local.get(["blockShorts"],(result)=>{
        if (result.blockShorts && pageURL.includes("shorts")){
            window.location.replace("https://stackoverflow.com/questions/3842614/how-do-i-call-a-javascript-function-on-page-load");
        }
    })
}