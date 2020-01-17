
const airpic = require('../assets/images/air.png');
class air {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = canvas.clientWidth *2;
        this.canvas.height = canvas.clientHeight *2;
        this.ctx = this.canvas.getContext('2d');
        this.padding = 90;
        this.w = this.canvas.width - this.padding;
        this.h = this.canvas.height - this.padding;
        this.startx = this.padding/2;
        this.starty = this.padding/2;
        this.rate = 30;
        this.ratio = 1;
        this.changer = 0;//curve changer;
        this.achanger = 0;// air changer;
        this.arate = 5;
        this.airpower = this.w/2;
        this.isPause = false;
        this.init();
    }
    init() {
        this.caclCurve();
        this.loadImg();
        this.ctx.translate(this.startx, this.starty);
    }
    caclCurve() {
        let x1 = 0, y1 = this.h, x2 = this.w/2, y2 = 0, x3 = this.w, y3 = this.h;
        let a, b, c;
        let d = ((x2-x3)*(x1-x2)*(x1-x3));
        a = - ((y2-y3)*x1-(x2-x3)*y1+x2*y3-x3*y2)/d;
        b = ((y2-y3)*x1*x1+x2*x2*y3-x3*x3*y2-(x2*x2-x3*x3)*y1)/d;
        c = ((x2*y3-x3*y2)*x1*x1 - (x2*x2-x3*x3)*x1+(x2*x2*x3-x2*x3*x3)*y1)/d;

        this.curves = [a, b, c];
    }
    curve(x) {
        let [a, b, c] = this.curves;
        return a*x*x + b*x + c;
    }
    drawCurve() {
        this.ctx.save();
        this.ctx.setLineDash([10,15]);
        this.ctx.lineWidth = 4; 
        this.ctx.strokeStyle = '#000000'; 
        this.ctx.beginPath();

        for(let i=0; i < this.changer; i+=this.ratio) {
            this.ctx.lineTo(i, this.curve(i));
        } 
         
        this.ctx.stroke();
        this.ctx.restore();
    }
    loadImg() {
        let img = new Image();
        img.src = airpic;
        return this.img = img;
    }
    drawAir() {
        this.ctx.save();
        this.ctx.translate(this.achanger, this.curve(this.achanger));
        this.ctx.rotate(this.ajustAirAngle(this.achanger) + 45*Math.PI/180);
        this.ctx.drawImage(this.img, -60, -60, 120, 120);
        this.ctx.restore();
    }
    ajustAirAngle(x) {
        let [a, b, c] = this.curves;
        return 2*x*a+b;
    }
    renderAir() {
        this.achanger += this.arate;
        if(this.achanger > this.airpower || this.isPause) {
            return false;
        }
        this.clear();
        this.renderCurve();
        this.drawAir();
        window.requestAnimationFrame(this.renderAir.bind(this));
    }
    renderCurve() {
        this.drawCurve();
    }
    render() {
        this.changer += this.rate;
        if(this.changer > this.w || this.isPause) {
            this.renderAir();
            return false;
        }
        else {
            this.clear();
            this.renderCurve();
            window.requestAnimationFrame(this.render.bind(this));
        }
    }
    clear() {
        this.ctx.clearRect(-this.startx, -this.starty, this.canvas.width, this.canvas.height);
    }
    rerender() {

    }
    destroy() {
        this.isPause = true;
    }
}

export default air;