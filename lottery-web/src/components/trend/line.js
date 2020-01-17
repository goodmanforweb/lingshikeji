// 
class line {
    constructor(table_body, data) {

        this.container = table_body;
        this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.cubeWidth = 16;
        this.cubeHeight = 16;
        this.data = data;
        this.startX = 60;
        this.startY = 0;
        this.drawLine();
    }
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'mega-line';
        const w = this.container.clientWidth;
        const h = this.container.clientHeight
        this.canvas.width = 2*w;
        this.canvas.height = 2*h;
        this.canvas.style.width = w+'px';
        this.canvas.style.height = h+'px';
        this.container.appendChild(this.canvas);
    }
    drawLine() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ED6363";
        this.ctx.lineWidth = 2;
        let x, y;
        this.data.forEach((el, index) => {
            let newel = Object.assign({}, el);
            delete newel.number;
            newel = Object.values(newel);
            if(newel.length > 0) {
                newel = newel[0];
                x = this.startX+(newel - 1)*this.cubeWidth+this.cubeWidth/2;
                y = this.startY+index*this.cubeHeight+index+this.cubeHeight/2;
                this.ctx.lineTo(2*x, 2*y);
            }
        });
        this.ctx.stroke();
        this.ctx.closePath();
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    rerender(data) {
        this.clear();
        //re calc canvas size
        const w = this.container.clientWidth;
        const h = this.container.clientHeight
        this.canvas.width = 2*w;
        this.canvas.height = 2*h;
        this.canvas.style.width = w+'px';
        this.canvas.style.height = h+'px';
        this.data = data;
        this.drawLine();
    }
    destroy() {
        this.container.removeChild(this.canvas);
    }

}

export default line;