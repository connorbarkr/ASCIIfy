function img_replace() {
  let imgs = document.getElementsByTagName("img");
      imgLen = imgs.length;
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
  for (var width, height, imgData, newImg, pixel, pix, pixLen, imgId = 0; imgId < imgLen; imgId++) {
    original = imgs[imgId];
    width = original.offsetWidth || original.naturalWidth;
    height = original.offsetHeight || original.naturalHeight;
    if (width == 0 || height == 0) {
      continue;
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(original, 0, 0);
    imgData = ctx.getImageData(0, 0, width, height);
    console.log(imgData);
    // pix = imgData.data;
    // pixLen = pix.length;
    // for (pixel = 0; pixel < pixLen; pixel += 4) {
    //   pix[pixel + 2] = pix[pixel + 1] = pix[pixel] = (pix[pixel] + pix[pixel + 1] + pix[pixel + 2]) / 3;
    // }
    // ctx.putImageData(imgData, 0, 0);
    // var replacement = new Image();
    // replacement.src = canvas.toDataURL();
    // ctx.clearRect(0, 0, width, height);
    original.style.display = "none";
    // original.parentNode.insertBefore(replacement, original);
  }
}

img_replace();
