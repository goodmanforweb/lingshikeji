class Barrage {
    constructor(canvas) {
        this.canvas = document.getElementById(canvas);
        if(!this.canvas) return;
        let rect = this.canvas.getBoundingClientRect();
        this.w = 2*(rect.right - rect.left);
        this.h = 2*(rect.bottom - rect.top);
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = '30px wukong';
        this.barrageList = [];
        this.dropList = [];
        this.isdestroy = false;
    }

    //添加弹幕列表
    shoot(value) {
        let top = this.getTop();
        let color = this.getColor();
        let offset = this.getOffset();
        let width = Math.ceil(this.ctx.measureText(value).width);

        let barrage = {
            value: value,
            top: top,
            left: this.w,
            color: color,
            offset: offset,
            width: width
        }
        this.barrageList.push(barrage);
    }

    reshoot(arr) {
        this.barrageList = [];
        arr.forEach(t => this.shoot(t));
    }
    addshoot() {
        arr.forEach(t => this.shoot(t));
    }

    addLinearGradient(opts){
        let [sx,sy,ex,ey,stops] = [
            opts.startX,
            opts.startY,
            opts.endX,
            opts.endY,
            opts.colorStops || [{
                "point" : 0,
                "color" : 'rgba(255, 255,255, .1)'
            },{
                "point" : 1,
                "color" : 'transparent'
            }] 
        ];

        let linear = this.ctx.createLinearGradient(sx,sy,ex,ey);

        for( let stop of stops ){
            linear.addColorStop(stop.point,stop.color);
        }

        return linear;
    }
    //开始绘制
    draw() {
        if(this.isdestroy)return;
        if (this.barrageList.length) {
            this.ctx.clearRect(0, 0, this.w, this.h);
            for (let i = 0; i < this.barrageList.length; i++) {
                let b = this.barrageList[i];
                if (b.left + b.width <= 0) {
                    const drop = this.barrageList.splice(i, 1)[0];
                    this.shoot(drop.value);
                    i--;
                    continue;
                }
                b.left -= b.offset;
                this.drawTextBg(b);
                this.drawText(b);
                
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }

    //绘制文字
    drawText(barrage) {
        this.ctx.fillStyle = barrage.color;
        this.ctx.fillText(barrage.value, barrage.left, barrage.top);
    }

    drawTextBg(barrage) {
        // this.ctx.rect(barrage.left, barrage.top, barrage.width + 10, 45);
        // this.ctx.fillStyle = this.addLinearGradient({startX: barrage.left, startY: barrage.top, endX:barrage.left + barrage.width, endY: barrage.top});
        // this.ctx.fill();
    }

    //获取随机颜色
    getColor() {
        return '#f7da18';
        // return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    }

    //获取随机top
    getTop() {
        //canvas绘制文字x,y坐标是按文字左下角计算，预留30px
        const t = Math.floor(Math.random() * (this.h - 50));
        return t < 50 ? 50 : t;
    }

    //获取偏移量
    getOffset() {
        return +(Math.random() * 3).toFixed(1) + 1;
    }
    destroy() {

        this.isdestroy = true;
    }

}

export default Barrage;

