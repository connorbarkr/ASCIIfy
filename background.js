chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    file: "jquery.min.js"
  }, () => {
    chrome.tabs.executeScript({
      file: "content_script.js"
    });
  });
});
