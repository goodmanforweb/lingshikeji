class Level {
    constructor(canvas, totalLevel, activelevel) {
        this.canvas = canvas;
        let minWidth = Math.min(canvas.clientWidth,canvas.clientHeight);
        this.canvas.width = 2*minWidth;
        this.canvas.height = 2*minWidth;
        this.ctx = this.canvas.getContext("2d");
        this.padding = 50;
        this.width = this.canvas.width - this.padding;
        this.height = this.canvas.height - this.padding;
        this.r = this.canvas.width/2;
        this.activeColor = '#086599';
        this.defaultColor = 'rgba(8, 101,153, 0.4)';
        this.activelevel = activelevel || 1;
        this.totalLevel = totalLevel || 6;
    }
    render() {
        let ctx2 = this.ctx;
        const sectionbar = 2*Math.PI/this.totalLevel - 0.1;

        ctx2.translate(this.r, this.r);
        ctx2.rotate(-Math.PI/2 - 0.1);
        ctx2.translate(-this.r, -this.r);

        let sectionArr = [];
        Array.from({length: this.totalLevel}).forEach((el, index) => {
            let t = 0.1*(index+1) + sectionbar*index;
            sectionArr.push([t, t + sectionbar])
        });


        ctx2.lineWidth = 16;

        sectionArr.forEach((el, index) => {
            ctx2.beginPath();
            ctx2.strokeStyle = this.activelevel >= (index + 1) ? this.activeColor : this.defaultColor;
            ctx2.arc(this.r, this.r, this.r - 20, el[0], el[1]);
            ctx2.stroke();
            ctx2.closePath();
        })
    }
    

}

export default Level;