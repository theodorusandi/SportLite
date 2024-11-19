import { filterContent } from "./filter.js";

const filterButton = document.querySelector("#filterButton");

filterButton.addEventListener("change", (e) => {
  const { checked } = e.target;

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
    const tabId = tabs[0]?.id || "";

    await chrome.scripting.executeScript({
      target: { tabId },
      func: filterContent,
      args: [checked]
    })
  });
});