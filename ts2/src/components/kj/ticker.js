import util from '../../util.js';

class Ticker {
    constructor(selector, date) {
        this.canvas = selector;
        this.canvas.width = 2*selector.clientWidth;
        this.canvas.height = 2*selector.clientHeight;
        this.ctx = this.canvas.getContext("2d");
        this.padding = 10;
        this.width = this.canvas.width - this.padding;
        this.height = this.canvas.height - this.padding;
       
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.rateWidth = 40;
        this.date = date;
        this.activeColor = '#ED6363';
        this.defaultColor = '#B1CAD8';
        this.config = ['days', 'hours','min', 'sec'];
        this.circleR = (this.canvas.width - this.rateWidth * (this.config.length - 1))/this.config.length;
        this.circleR = Math.floor(this.circleR/2) - 4;
        //居中
        let hasdraw = this.circleR * this.config.length *2 + this.rateWidth * (this.config.length - 1);
        this.ctx.translate(this.canvas.width/2 - hasdraw/2 , 0);

        this.loop();
    }
    drawText(x, y, num, type) {
        this.ctx.save();
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = '#086599';
        this.ctx.textBaseline = "middle";

        this.ctx.font = 'bold 26px roboto';
        num  = num + '';
        this.ctx.fillText(num, x, y);

        this.ctx.font = '16px roboto';
        type = type.toUpperCase();
        this.ctx.fillText(type, x, y + 25);

        this.ctx.restore();
    }
    drawPath(angle,color,lineWidth = 4, x = this.centerX,y = this.centerY,r = this.circleR) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = '#FAFAFA';
        this.ctx.arc(x, y, r, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + angle, false);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawDots(x) {
        this.ctx.save();
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = '#086599';
        this.ctx.textBaseline = "middle";
        this.ctx.font = 'bolder 40px roboto';
        this.ctx.fillText(":", x + this.rateWidth/2, this.centerY);
        this.ctx.restore();
    }
    drawCircle(rate) {
        this.config.forEach((key, index) => {
            let x = 2*this.circleR * (index + 1) + this.rateWidth * index - this.circleR;

            let angle = 0;
            if(rate != undefined) {
                angle = 2*Math.PI * Math.min(this.date[key]/this.date[`t${key}`], rate);
            }
            else {
                angle = 2*Math.PI * this.date[`t${key}`];
            }
            
            this.drawPath(angle, (this.date.days == 0 && this.date.hours <= 24) ? this.activeColor : this.defaultColor, 4, x);
            let text = Math.min(Math.floor(rate * this.date[`t${key}`]), this.date[key]);
            this.drawText(x, this.centerY, util.makeUp(text), key);
            (this.config.length != index + 1) && this.drawDots(x+this.circleR);
        });
    }
    loop() {
        this.animate(0, 100, 0, 1,(rate) => {
            this.clear();
            this.drawCircle(rate);
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
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    render(date) {
        this.clear();
        this.date = date;
        this.drawCircle();
    }


}

export default Ticker;