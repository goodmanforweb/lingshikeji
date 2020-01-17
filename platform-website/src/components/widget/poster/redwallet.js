
import {bigman} from 'createposter';
let template = require("../../../components/redwallet/assets/images/sharepic.jpg");
let templateen = require("../../../components/redwallet/assets/images/sharepic.jpg");
import './font.css';
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
      this.ctx.font = "80px din";
      const w = this.ctx.measureText(text).width;
      if(w >= this.canvas.width*.7) {
        const t = 80/w * this.canvas.width*.7;
        return t > 12 ? t : 12;
      }
      else {
        return 80;
      }
    }
    //@override
    addInfo(text, link, callback) {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = `${this.calcFontSize(text)}px din`;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        // 将阴影向右移动15px，向上移动10px
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
        // 轻微模糊阴影
        this.ctx.shadowBlur = 6;

        let x = (this.canvas.width - this.ctx.measureText(text).width) / 2;
        this.ctx.fillText(text, x, 300);
    
        return this.createQrcode(link+'', {color: {light: '#FFEFDABB'}}).then(url => {
          this.getImg(url).then(qr => {
            this.qrcodeimg = qr;
            this.ctx.drawImage(qr, 38, 1082, 190, 195);
            callback && callback();
          });
        })
    }
    
}

export default new cjposter();