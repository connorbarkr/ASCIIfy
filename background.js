function messageListener(response, sender, sendResponse) {
  switch (response) {
    case "testBackground":
      alert(response);
      break;
    default:
      break;
  }
}

function init() {
  chrome.runtime.onMessage.addListener(messageListener);
}

init();
