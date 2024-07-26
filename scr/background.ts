chrome.runtime.onInstalled.addListener(function(){
   console.log("hello")
   chrome.storage.local.set({ 'blockShorts': 'false' });
});

chrome.runtime.onMessage.addListener((message, sender,sendResponse)=>{
    if(message.message === "getBlockShorts"){
        chrome.storage.local.get('blockShorts',(result)=>{
            sendResponse({message:result.blockShorts})
        })     
    } else if(message.message === "changeBlockShorts"){
        chrome.storage.local.set({'blockShorts':message.value});
        console.log(message.value)
        sendResponse({message:'ok'});
    }

    return true;
})