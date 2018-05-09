function getRGB(data, index) {
  index *= 4;
  return [data[index], data[index + 1], data[index + 2]];
};

function getChar(val) {
  let chars = ['@', '%', '#', 'x', '+', '=', ':', '-', '.', ' '];
  return chars[parseInt(val * (chars.length - 1), 10)];
}

function g2a(grayscale) {
  let index = Math.ceil(grayscale * 10) - 1;
  let values = ['@', '%', '#', 'x', '+', '=', ':', '-', '.', ' '];
  return values[index];
}

function normalize(rgb) {

}

function asciify() {
  let imgs = document.getElementsByTagName('img');
  let imgLen = imgs.length;

  for (var imgId = 0; imgId < imgLen; imgId++) {
    //opening tag constructor
    let original = imgs[imgId];
    let src = '';
    let jqObj = '';
    let img = new Image();
    // some issue with image dimensions; maybe map actual dimensions to screen dimensions?
    img.src = original.src;
    if (original) {
      src = document.getElementsByTagName('img')[imgId].getAttribute('src');
      jqObj = 'img[src="' + src + '"]';
    } else {
      continue;
    }
    let jqRet = '<pre id="ASCIIfied' + imgId.toString() + '"'; //' resize: none; color: black; font-family: Courier; font-size: 4px; line-height: 1em; padding: 0px; ';
    let width = original.offsetWidth || original.naturalWidth;
    let height = original.offsetHeight || original.naturalHeight;
    let ratio = width / height;
    height = parseInt(width * (height / width), 10);
    if (width < 100 || height < 100) {
      console.log("Too smol");
      continue;
    }
    jqRet += 'width: ' + width.toString() + 'px; height: ' + height.toString() + 'px;">';
    //content + closing tag constructors
    const promise = contentConstructor(src, width, height);
    promise.then((result) => {
      jqRet += result;
      jqRet += '</pre>';
      $(jqObj).parent('a').replaceWith(jqRet);
    });
  }
}

function contentConstructor(src, width, height) {
  return new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    img.src = src;
    //specific nums due to specific font size
    let cols = Math.floor(width / 2.5);
    let rows = Math.floor(height / 4);
    let cellWidth = Math.floor(width / cols);
    let cellHeight = Math.floor(height / rows);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    let ret = '';
    img.onload = () => {
      console.log("New image");
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols - 1; j++) {
          ctx.drawImage(img, j * cellWidth, i * cellHeight, (j * cellWidth) + cellWidth, (i * cellHeight) + cellHeight, 0, 0, cellWidth, cellHeight);
          imgData = ctx.getImageData(0, 0, cellWidth, cellHeight).data;
          let len = cellWidth * cellHeight;
          let totalr = 0;
              totalg = 0;
              totalb = 0;
          for (var k = 0; k < len; k++) {
            let rgb = getRGB(imgData, k);
            totalr += rgb[0];
            totalg += rgb[1];
            totalb += rgb[2];
          }
          totalr = Math.ceil(totalr / len);
          totalg = Math.ceil(totalg / len);
          totalb = Math.ceil(totalb / len);
          let rgb = [totalr, totalg, totalb];
          ret += '<font style="font-size: 4px; color: rgb(' + rgb.join(',') + ')">' + getChar(Math.max(rgb[0], rgb[1], rgb[2]) / 255) + '</font>';
        }
        ret += '<br>';
      }
      resolve(ret);
    }
  });
}

asciify();
