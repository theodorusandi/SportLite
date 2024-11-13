const filterSwitch = document.querySelector("#filterButton");

filterSwitch.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const curTab = tabs[0];
    if (curTab) {
      await chrome.scripting.executeScript({
        target: { tabId: curTab.id },
        files: ["scripts/filter.js"]
      })
    }
  })
});