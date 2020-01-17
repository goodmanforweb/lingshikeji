class Level {
    constructor(canvas, activelevel) {
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
    }
    render() {
        let ctx2 = this.ctx;
        let section = 2*Math.PI/6.5;
        let sectionArr = [
            [-section, 0 ],
            [0.1, section],
            [section + 0.1, 
                section + 0.1 + section],
            [section + 0.1 + section + 0.1, 
                section + 0.1 + section + 0.1 + section],
            [section + 0.1 + section + 0.1 + section + 0.1, 
                section + 0.1 + section + 0.1 + section + 0.1 + section],
            [section + 0.1 + section + 0.1 + section + 0.1 + section + 0.1, 
                -section - 0.1]
        ];
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