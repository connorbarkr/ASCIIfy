function c2a(r, g, b) {
  let grayscale = ((0.3 * r) + (0.59 * g) + (0.11 * b)) / 256;
  switch (Math.floor(grayscale * 10) / 10) {
    case (0.0):
      return ' ';
      break;
    case (0.1):
      return '.';
      break;
    case (0.2):
      return ':';
      break;
    case (0.3):
      return '-';
      break;
    case (0.4):
      return '=';
      break;
    case (0.5):
      return '+';
      break;
    case (0.6):
      return '*';
      break;
    case (0.7):
      return '#';
      break;
    case (0.8):
      return '%';
      break;
    case (0.9):
      return '@';
      break;
    default:
      return ' ';
      break;
  }
}

function asciify() {
  let imgs = document.getElementsByTagName('img');
  let imgLen = imgs.length;

  for (var imgId = 0; imgId < imgLen; imgId++) {
    //opening tag constructor
    let original = imgs[imgId];
    let src = '';
    let jqObj = '';
    if (original) {
      src = document.getElementsByTagName('img')[imgId].getAttribute('src');
      jqObj = 'img[src="' + src + '"]';
    } else {
      continue;
    }
    let jqRet = '<textarea id="ta' + imgId.toString() + '" style="resize: none; color: black; font-family: Courier; font-size: 10px; line-height: 1em; padding: 0px; ';
    let width = original.offsetWidth || original.naturalWidth;
    let height = original.offsetHeight || original.naturalHeight;
    if (width < 100 || height < 100)
      continue;
    jqRet += 'width: ' + width.toString() + 'px; height: ' + height.toString() + 'px;">';
    //content constructor
    jqRet += contentConstructor(src, width, height);
    //closing tag constructor
    jqRet += '</textarea>';
    console.log(contentConstructor(src, width, height));
    $(jqObj).parent('a').replaceWith(jqRet);
  }
}

function contentConstructor(src, width, height) {
  let img = document.createElement('img');
  img.crossOrigin = 'Anonymous';
  img.src = src;
  let cols = Math.ceil(width / 6.5);
  let rows = Math.ceil(height / 10);
  let cWidth = Math.ceil(width / cols);
  let cHeight = Math.ceil(height / rows);
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = cWidth;
  canvas.height = cHeight;
  let ret = '';

  for (var i = 0; i < rows - 1; i++) {
    for (var j = 0; j < cols; j++) {
      ctx.drawImage(img, i * cWidth, j * cHeight, cWidth, cHeight, 0, 0, canvas.width, canvas.height);
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let rgb = {r:0, g:0, b:0};
      let count = 0;
      for (var k = 0; k < imgData.data.length; k += 4) {
        ++count;
        rgb.r += imgData.data[k];
        rgb.g += imgData.data[k + 1];
        rgb.b += imgData.data[k + 2];
      }
      rgb.r = Math.floor(rgb.r / count);
      rgb.g = Math.floor(rgb.g / count);
      rgb.b = Math.floor(rgb.b / count);
      ret += c2a(rgb.r, rgb.g, rgb.b);
    }
    if (i != rows - 2)
      ret += '\n';
  }
  return ret;
}

asciify();
