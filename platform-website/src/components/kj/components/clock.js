
class clock {
    constructor(canvas, text, seconds, padding=40,textSize=40) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.style.height = this.canvas.clientWidth + 'px';
        this.canvas.width = 2* this.canvas.clientWidth;
        this.canvas.height = 2* this.canvas.clientWidth;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.padding = padding;
        this.radius = this.width/2;
        this.tickLength = 20;
        this.radius = this.width/2 - this.tickLength - this.padding;
        this.tickWidth = 4;
        this.tickColor = 'rgba(255, 255, 255, .4)';
        this.tickActiveColor = '#ffffff';
        this.text = text;
        this.textSize = textSize;
        this.seconds = seconds;
        this.ticker = 0;
        this.center = {
            x: this.width/2, 
            y: this.height/2
        }
    }
    getPointAxis(n, r) {
        let perangle, startangle, nowangle,x = 0 ,y = 0;
        perangle = 360/60;
        startangle = -Math.PI/2;
        nowangle = startangle + perangle*n* Math.PI/180;
        y = Math.sin(nowangle) * r;
        x = Math.cos(nowangle) * r;

        x = this.center.x + x;
        y = this.center.y + y;

        return {x, y}
    }
    drawTick(n, tickColor) {
        const start = this.getPointAxis(n, this.radius);
        const end = this.getPointAxis(n, this.radius + this.tickLength);

        this.ctx.beginPath();
        this.ctx.lineWidth = this.tickWidth;
        this.ctx.strokeStyle = tickColor;
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawTicks(n, tickColor) {
        Array.from({length: n}).forEach((el, index) => {
            this.drawTick(index, tickColor);
        });
    }
    drawCurrentTick() {

    }
    drawText() {
        this.ctx.fillStyle = this.tickActiveColor;
        this.ctx.font = `bolder ${ Math.floor(this.radius*2*0.12)}px  Verdana`;
       
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text, this.center.x, this.center.y + 10);
    }
    drawActiveTicks() {
        // this.ticker++;
        // if(this.ticker > this.seconds) return false;
        this.drawTicks(this.seconds, this.tickActiveColor);
        // window.requestAnimationFrame(this.drawActiveTicks.bind(this));
    }
    render() {
        this.drawText();
        this.drawTicks(60, this.tickColor);
        this.drawActiveTicks();
    }
    rerender(text, seconds) {
        this.text = text;
        this.seconds = seconds;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.render();
    }
}
export default clock