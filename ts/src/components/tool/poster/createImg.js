let template = require("../../../assets/images/poster.jpg");
let templateen = require("../../../assets/images/posteren.jpg");

import QRCode from "qrcode";
class bigman {
  constructor() {
    this.qrcodeimg = null;
    this.lang = 'zh';
  }
  create(lang) {
    this.lang = lang;
    return this.getImg()
      .then(template => {
        this.createCanvas(template.width, template.height);
        this.addTemplate(template);
      })
      .catch(err => {});
  }
  createQrcode(text, options) {
    let opts = Object.assign({
      width: 350,
      height: 350
    }, options || {});
    return QRCode.toDataURL(text, opts)
      .catch(err => {
        console.error(err)
      })
  }
  createCanvas(w, h) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = w;
    this.canvas.height = h;
    return (this.ctx = this.canvas.getContext("2d"));
  }
  addTemplate(img) {
    this.ctx.drawImage(img, 0, 0);
  }
  addInfo(text, link, callback) {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "12px yahei";
    let x = (this.canvas.width - this.ctx.measureText(text).width) / 2;
    this.ctx.fillText(text, x, 570);

    return this.createQrcode(link).then(url => {
      this.getImg(url).then(qr => {
        this.qrcodeimg = qr;
        this.ctx.drawImage(qr, 150, 355, 186, 186);
        callback && callback();
      });
    })
  }
  preview(container, type) {
    if(type == 'dom') {
      container.appendChild(this.canvas);
    }
    else {
      const img = document.createElement('img');
      img.src = this.canvas.toDataURL("image/png");
      container.appendChild(img);
      return this.qrcodeimg;
    }
    
    // container.appendChild(this.canvas);
  }
  getImg(src) {
    let img = new Image();
    img.src = src ? src : (this.lang == 'zh' ? template : templateen);
    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject();
      };
    });
  }

  base64Img2Blob(code) {
    let parts = code.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {
      type: contentType
    });
  }
  downloadFile(fileName, content) {
    let aLink = document.createElement("a");
    let blob = this.base64Img2Blob(content);
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
  }

  download(filename) {
    this.downloadFile(filename, this.canvas.toDataURL("image/png"));
  }
}

export {bigman}

export default new bigman();
