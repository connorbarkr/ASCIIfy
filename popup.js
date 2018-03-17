var test = () => {
  chrome.tabs.executeScript(null, {file: "content_script.js"});
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('test').addEventListener('click', test);
});
