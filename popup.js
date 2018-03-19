var asciify = () => {
  chrome.tabs.executeScript(null, {file: "content_script.js"});
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('asciify').addEventListener('click', asciify);
});
