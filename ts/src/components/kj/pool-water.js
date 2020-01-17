const img = require('../../assets/images/water.png');
class Water {
    constructor(selector, text) {
        this.canvas = selector;
        // let minWidth = Math.min(selector.clientWidth,selector.clientHeight);
        let minWidth = 215;

        this.canvas.width = 2*minWidth;
        this.canvas.height = 2*minWidth;
        this.ctx = this.canvas.getContext("2d");
        this.padding = 10;
        this.width = this.canvas.width - this.padding;
        this.height = this.canvas.height - this.padding;
       
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.rad = (Math.PI * 2) / 100;
        this.speed = -Math.PI / 2;
        this.realAngle = 0;
        this.number = 100;
        this.text = text+'';
        this.rate = Number(this.text.replace('%',''))*1e-2;
        this.loop.call(this);
        this.loadImg();
    }
    drawPath(angle,color,lineWidth = 4, x = this.centerX,y = this.centerY,r = this.width / 2) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, r, -Math.PI / 2, angle, false);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }
    drawText(num) {
        let centerY = this.centerY - 20;
        this.ctx.save();
        this.ctx.textAlign = "center";

        this.ctx.font = '20px roboto';
        this.ctx.fillStyle = '#086599';
        let str = '已完成';
        this.ctx.fillText(str, 100, centerY - 50);


        this.ctx.font = 'bold 75px roboto';
        this.ctx.fillStyle = '#086599';
        this.ctx.textBaseline = "top";
        let text = num ? num+'' : this.text.replace('%','');
        let len2 = this.ctx.measureText(text).width;
        this.ctx.fillText(text, this.centerX + 16, centerY - 70);

        this.ctx.font = '20px roboto';
        this.ctx.fillStyle = '#086599';
        this.ctx.fillText('%', this.centerX + 10+ len2/2 + 12, centerY - 30);


        this.ctx.restore();
    }
    loadImg() {
        return new Promise((resolve, reject) => {
            let t = new Image();
            t.src = img;
            t.onload = () => {
                resolve(t);
            }
            t.onerror = () => {
                reject();
            }
        })
    }
    drawImg() {
        this.loadImg().then((t) => {
            this.ctx.drawImage(t, 0, 0, t.width, t.height, 0+ 22, this.centerY - 25, 390, 222);
        })
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    loop() {
        this.animate(0, 100, 0, this.rate,(rate) => {
            this.clear();
            //画轨迹
            this.drawPath(-Math.PI / 2 + 2 * Math.PI, "rgba(8, 101,153, 0.4)");
             //画动态轨迹
            this.drawPath(-Math.PI / 2 + 2*Math.PI * rate, "#67AAD5", 8);
            this.drawText((rate*100).toFixed(2));
        }, (rate) => {

        });
    }
    animate(starttime=0, duringtime, beginstate, endstate, resolve, reject) {
        let step = function() {
            let changer = Math.tween.Cubic.easeInOut(starttime, beginstate, endstate, duringtime);
            starttime++;
            if (starttime <= duringtime) {
                resolve && resolve(changer);
                window.requestAnimationFrame(step);
            } else {
                reject && reject(changer);
            }
        };
        step();
    }
}

export default Water;