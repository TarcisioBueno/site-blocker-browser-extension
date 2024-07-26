window.onload = () => {
    // Retrieve the value of 'blockShorts' from local storage
    chrome.storage.local.get(['blockShorts'], (result) => {
        let checkBox = document.getElementById("allowShortsCheckBox") as HTMLInputElement;
        if (result.blockShorts === true) {
            checkBox.checked = true;
        } else {
            checkBox.checked = false;
        }
    });
}

document.getElementById("allowShortsCheckBox")?.addEventListener('change', () => {
    let checkboxElement = document.getElementById("allowShortsCheckBox") as HTMLInputElement;

    chrome.runtime.sendMessage({message:"changeBlockShorts", value:checkboxElement.checked}, (response)=>{
        console.log(response)
    })
});