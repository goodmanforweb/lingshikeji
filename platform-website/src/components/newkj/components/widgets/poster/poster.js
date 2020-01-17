
import './font.css';

import {bigman} from 'createposter';
let template = require("../../../assets/images/sharepic.jpg");
let templateen = require("../../../assets/images/sharepicen.jpg");

class cjposter extends bigman {
    constructor() {
        super();
    }
    //@override
    create(lang) {
        this.lang = lang;
        return this.getImg((this.lang == 'zh' ? template : templateen))
          .then(template => {
            this.createCanvas(template.width, template.height);
            this.addTemplate(template);
          })
          .catch(err => {});
      }
    calcFontSize(text) {
      this.ctx.font = "100px MFLingHei";
      const w = this.ctx.measureText(text).width;
      if(w >= this.canvas.width*.7) {
        const t = 100/w * this.canvas.width*.7;
        return t > 12 ? t : 12;
      }
      else {
        return 100;
      }
    }
    //@override
    addInfo(text, link, callback) {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = `${this.calcFontSize(text)}px MFLingHei`;

        let x = (this.canvas.width - this.ctx.measureText(text).width) / 2;
        this.ctx.fillText(text, x, 550);
    
        return this.createQrcode(link+'').then(url => {
          this.getImg(url).then(qr => {
            this.qrcodeimg = qr;
            this.ctx.drawImage(qr, 140, 950, 140, 140);
            callback && callback();
          });
        })
    }
    
}

export default new cjposter();