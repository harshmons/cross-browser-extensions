console.log("----------------------------------")
chrome.tabs.onCreated.addListener(function(tab) {
    console.log("TAB CREATED LISTENER : ", tab)
});
