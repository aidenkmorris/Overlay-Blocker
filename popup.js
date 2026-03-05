// Aiden K Morris

document.getElementById("toggle").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  try {
    await chrome.tabs.sendMessage(tab.id, { action: "toggleOverlay" });
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content-script.js"]
    });

    await chrome.tabs.sendMessage(tab.id, { action: "toggleOverlay" });
  }
});