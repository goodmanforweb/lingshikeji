
import util from 'util';

class Grid {
    constructor(canvas, data, type) {
        this.canvas = canvas;
        this.data = data;
        this.type = type;
        this.ctx = this.canvas.getContext('2d');
        this.rate = 2;
        this.cubeWidth = 16*this.rate;
        this.cubeHeight = 17*this.rate;
        this.lineWidth = 1*this.rate;
        this.lineColor = '#cac7bf';
        this.R = 8*this.rate;
        this.grayColor = this.ctx.createLinearGradient(0,0,16,16);
        this.grayColor.addColorStop(0,"#8B9093");
        this.grayColor.addColorStop(1,"#424242");

        this.redColor = this.ctx.createLinearGradient(0,0,16,16);
        this.redColor.addColorStop(0,"#D97967");
        this.redColor.addColorStop(1,"#C5493E");
        this.init();
        
    }
    init() {
        this.calcSize();
        this.drawGrid();
        this.drawDots();
        if(this.type == 'gray') {

        }
        else if(this.type == 'red') {
            // this.drawPolyLine();
        }
       
    }
    calcSize() {
        this.startX = 60;
        this.startY = 0;
        const w = this.canvas.clientWidth;
        const h = this.canvas.clientHeight
        this.canvas.width = this.rate*w;
        this.canvas.height = this.rate*h;
        this.w = this.rate*w;
        this.h = this.rate*h;

        this.yLineNumber = this.w/this.cubeWidth;
        this.xLineNumber = this.h/this.cubeHeight;

    }
    drawGrid() {
        Array.from({length: this.xLineNumber}).forEach((el, index) => {
            let t = (this.cubeHeight - this.lineWidth)*(index + 1) + this.lineWidth*index;
            this.drawLine(0, t, this.w, t);
        });
        Array.from({length: this.yLineNumber}).forEach((el, index) => {
            let t = (this.cubeWidth - this.lineWidth)*(index + 1) + this.lineWidth*index;

            this.drawLine(t, 0, t, this.h);
        });
    }
    drawLine(startX, startY, endX, endY) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawDot(x,y, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x,y,this.R,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawGrayDot(x, y) {
        this.drawDot(x, y, this.grayColor);
    }
    drawRedDot(x, y) {
        this.drawDot(x, y, this.redColor);
    }
    drawDots() {
        let t = this.type == 'red' ? this.drawRedDot : this.drawGrayDot;
        this.data.forEach((el, index) => {
            let x, y;
            el.item.forEach((it, i) => {
                x = (it -1)*this.cubeWidth + (this.cubeWidth - this.lineWidth)/2;
                y = index*this.cubeHeight + (this.cubeHeight - this.lineWidth)/2;
                t.apply(this, [x,y]);
                this.drawText(x,y, util.makeUp(it));
            })
        })
    }
    drawText(x, y, text) {
        this.ctx.beginPath();
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle'
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(text, x,y);
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawPolyLine() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ED6363";
        this.ctx.lineWidth = this.lineWidth;
        this.data.forEach((el, index) => {
            let x, y;
            x = (el.item -1)*this.cubeWidth + (this.cubeWidth - this.lineWidth)/2;
            y = index*this.cubeHeight + (this.cubeHeight - this.lineWidth)/2;
            this.ctx.lineTo(x, y);
        });
        this.ctx.stroke();
        this.ctx.closePath();
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    rerender(data) {
        this.clear();
        this.data = data;
        this.init();
    }

}

export default Grid;