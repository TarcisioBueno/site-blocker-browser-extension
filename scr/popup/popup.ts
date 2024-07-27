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

    chrome.storage.local.get(['blockTerms'], (result)=>{
        let inputText = document.getElementById("blockTerms") as HTMLInputElement;
        inputText.value = result.blockTerms;
    })

    chrome.storage.local.get(['redirectUrl'], (result)=>{
        let inputText = document.getElementById("redirectUrl") as HTMLInputElement;
        inputText.value = result.redirectUrl;
    })
}

document.getElementById("allowShortsCheckBox")?.addEventListener('change', () => {
    let checkboxElement = document.getElementById("allowShortsCheckBox") as HTMLInputElement;

    chrome.runtime.sendMessage({message:"changeBlockShorts", value:checkboxElement.checked}, (response)=>{
        console.log(response)
    })
});

document.getElementById("blockTerms")?.addEventListener('change',()=>{
    let inputText = document.getElementById("blockTerms") as HTMLInputElement;
    let inputValue = inputText.value;

    // Regular expression to match the desired format
    let regex = /^((?:https?:\/\/)?[\w.-]+(?:\.[\w.-]+)*(?:\/[\w.-]*)*|[\w.-]+)(?:\s*,\s*((?:https?:\/\/)?[\w.-]+(?:\.[\w.-]+)*(?:\/[\w.-]*)*|[\w.-]+))*$/;

    if (regex.test(inputValue)) {
        // Input matches the desired format
        chrome.runtime.sendMessage({ message: "inputFieldUpdate", value: inputValue }, (response) => {
            console.log(response);
        });
    } else {
        // Input does not match the desired format
        inputText.value = '';
        alert("Please enter terms in the correct format: term, term1.com, https://example.com/, term3, ...");
    }
})


document.getElementById("redirectUrl")?.addEventListener('change',()=>{
    let inputText = document.getElementById("blockTerms") as HTMLInputElement;
    let inputValue = inputText.value;

    // Input matches the desired format
    chrome.runtime.sendMessage({ message: "redirectFieldUpdate", value: inputValue }, (response) => {
        console.log(response);
    });

})