function img_replace() {
  var imgs = document.getElementsByTagName("img");
  var src = "POTD_chick_3597497k.jpg";
  for (img of imgs) {
    var url = chrome.extension.getURL(src);
    img.src = url;
  }
}

img_replace();
