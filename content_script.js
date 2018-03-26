function img_replace() {
  let imgs = document.getElementsByTagName('img');
  let imgLen = imgs.length;

  for (var imgId = 0; imgId < imgLen; imgId++) {
    let original = imgs[imgId];
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d');
    let width = original.offsetWidth || original.naturalWidth;
    let height = original.offsetHeight || original.naturalHeight;\
    if (width == 0 || height == 0) {
      continue;
    }
    canvas.width = width;
    canvas.height = height;
    // ctx.drawImage(original, 0, 0, width, height);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, width, height);
    let testImg = new Image();
    let src = canvas.toDataURL();
    original.src = src;
    original.srcset = src;
  }
}

img_replace();
