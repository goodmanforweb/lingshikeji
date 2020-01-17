class Progress {
    constructor(selector, num, total, text) {
        this.canvas = selector;
        this.canvas.width = 2*selector.clientWidth;
        this.canvas.height = 2*selector.clientHeight;
        this.ctx = this.canvas.getContext("2d");
        this.padding = 10;
        this.width = this.canvas.width - this.padding;
        this.height = this.canvas.height - this.padding;
       
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.lineWidth = 10;
        this.r = 180;
        
        this.x = this.canvas.width/2;
        this.y =  this.r + this.padding  + this.lineWidth;
        this.num = num+'';
        this.total = total;
        this.rate = Math.ceil(num.replace('%','')) * 1e-2;
        this.timer = 0;
        this.duration = 200;
        this.startAngle = -Math.PI;
        this.arrowWidth = 26;
        this.color = '#086599';
        this.text = text;

        this.createColor();

        this.loop();
    }
    loop() {
        this.animate(0, 100, 0, this.rate,(rate) => {
            this.clear();
            this.drawCircle();
            this.drawDecText();

            this.drawText((Number(rate.toFixed(2))*1e2).toFixed(0));
            this.drawTicker(-Math.PI*(1 - rate));

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
    createColor () {
        this.lingrad =this. ctx.createLinearGradient(0, 0, this.canvas.width, 0);
        this.lingrad.addColorStop(0,'#B2CADA');
        this.lingrad.addColorStop(1,'#086599');
    }
    drawCircle() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.lingrad;
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI, true);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawText(angle) {
        angle = angle + '';
        
        this.ctx.save();
        this.ctx.textAlign = "center";
        this.ctx.font = '80px roboto';
        this.ctx.fillStyle = '#086599';
        this.ctx.textBaseline = "bottom";
        let len2 = this.ctx.measureText(angle).width;
        this.ctx.fillText(angle, this.x,this.y);

        this.ctx.font = '20px roboto';
        this.ctx.fillText('%', this.x+len2/2 + 10,this.y - 10);

        this.ctx.font = '22px roboto';
        let len3 =  this.text;
        this.ctx.fillText(len3, this.x,this.y - 90);
        this.ctx.restore();
    }
    drawDecText() {
        this.ctx.save();
        this.ctx.textAlign = "left";
        this.ctx.font = '26px roboto';
        this.ctx.fillStyle = '#8E9FA9';
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText('0USD', 50, this.y + 50);
        let l = this.ctx.measureText(this.total + 'USD').width;
        this.ctx.fillText(this.total + 'USD', this.canvas.width - 30 - l,this.y + 50);
        this.ctx.restore();
    }
    point(r, angle, x = this.x, y = this.y) {
        return [x + r * Math.cos(angle), y + r * Math.sin(angle)];
    }
    drawLine(angle) {
        this.ctx.save();
        this.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth/2;
        this.ctx.beginPath();
        let point1 = this.point(this.r - 20, angle);
        let point2 = this.point(this.r + 20, angle)
        this.ctx.moveTo(point1[0], point1[1]);
        this.ctx.lineTo(point2[0], point2[1]);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }
    drawArrow(angle) {
        this.ctx.save();
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.color; 
        let pointA = this.point(this.r + 20 + 8, angle);
        //以点A为圆形画圆， 等边三角形 10
        let pointB = this.point(this.arrowWidth, angle + Math.PI/6, pointA[0], pointA[1]);
        let pointC = this.point(this.arrowWidth, angle - Math.PI/6, pointA[0], pointA[1]);

        ctx.moveTo(pointA[0], pointA[1]); 
        ctx.lineTo(pointB[0],pointB[1]);
        ctx.lineTo(pointC[0],pointC[1]); 
        
        ctx.fill(); //闭合形状
        this.ctx.restore();
    }
    drawTicker(angle) {
        this.drawLine(angle);
        this.drawArrow(angle);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}
export default Progress;
