let globalData = {
  img: new Image(),
  width: 500,
  height: 500,
  level: 14, //数字越大越模糊
  index: 1,
};
function addcanvas() {
  let { img, width } = globalData;
  img.src = "timg.jpg";
  img.onload = function () {
    globalData.height = (width * img.height) / img.width;
    let { canvas, ctx } = createCanvasAndCtx(width, globalData.height);
    ctx.drawImage(img, 0, 0, width, globalData.height);
    //insert to page
    let canvasBox = document.querySelector("#canvasBox");
    let preCanvas = canvasBox.querySelector("canvas");
    if (preCanvas) {
      canvasBox.removeChild(preCanvas);
    }
    canvasBox.appendChild(canvas);
  };
}

function createCanvasAndCtx(width, height) {
  let canvas = document.createElement("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  canvas.setAttribute("onmouseout", "end()");
  canvas.setAttribute("onmousedown", "start()");
  canvas.setAttribute("onmouseup", "end()");
  let ctx = canvas.getContext("2d");
  return { ctx, canvas };
}
function start() {
  let { width, height } = globalData;
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  let imgData = ctx.getImageData(0, 0, width, height);
  canvas.onmousemove = (e) => {
    let w = imgData.width;
    let h = imgData.height;
    //获取鼠标当前所在像素的RGBA
    let rgba = getXY(imgData, e.offsetX, e.offsetY);
    for (let k = 0; k < globalData.level; k++) {
      for (let i = 0; i < globalData.level; i++) {
        setXY(imgData, e.offsetX + i, e.offsetY + k, rgba);
      }
    }
    ctx.putImageData(imgData, 0, 0);
  };
}
function generateImg() {
  let canvas = document.querySelector("canvas");
  document.querySelector("#pngBox").innerHTML += `<div id="png-${
    globalData.index
  }" style="display:inline-block;margin:10px;">
      <div>图片${globalData.index} <span data-index="${
    globalData.index
  }">删除❌</span></div>
      <img src="${canvas.toDataURL("image/png")}"/>
    </div>`;
  globalData.index++;
}

function deletePng() {}

function setXY(obj, x, y, rgba) {
  let w = obj.width;
  obj.data[4 * (y * w + x)] = rgba[0];
  obj.data[4 * (y * w + x) + 1] = rgba[1];
  obj.data[4 * (y * w + x) + 2] = rgba[2];
  obj.data[4 * (y * w + x) + 3] = rgba[3];
}

function getXY(obj, x, y) {
  let w = obj.width;
  let color = [];
  color[0] = obj.data[4 * (y * w + x)];
  color[1] = obj.data[4 * (y * w + x) + 1];
  color[2] = obj.data[4 * (y * w + x) + 2];
  color[3] = obj.data[4 * (y * w + x) + 3];
  return color;
}

function end() {
  let canvas = document.querySelector("canvas");
  canvas.onmousemove = null;
}

window.onload = function () {
  let pngBox = document.querySelector("#pngBox");
  pngBox.onclick = function (e) {
    let index = e.target.getAttribute("data-index");
    if (index) {
      let png = document.querySelector("#png-" + index);
      pngBox.removeChild(png);
    }
  };
  addcanvas()
};
