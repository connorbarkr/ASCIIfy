function img_replace() {
  let imgs = document.getElementsByTagName('img');
  let imgLen = imgs.length;

  for (var imgId = 0; imgId < imgLen; imgId++) {
    let original = imgs[imgId];
    let jqObj = 'img[src="' + original.src + '"]';
    console.log(jqObj);
    let jqRet = '<textarea id="ta' + imgId.toString() + '" style="resize: none; ';
    let width = original.offsetWidth || original.naturalWidth;
    let height = original.offsetHeight || original.naturalHeight;
    if (width < 100 || height < 100) {
      continue;
    }
    jqRet += 'width: ' + width.toString() + 'px; height: ' + height.toString() + 'px;">';
    jqRet += 'Hello, world!';
    jqRet += "</textarea>";
    console.log(jqRet);
    $(jqObj).replaceWith(jqRet);
  }
}

img_replace();
