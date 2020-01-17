class water {
  constructor(canvas, number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.number = number;
    this.isStop = false;
    let minWidth = Math.min(canvas.clientWidth, canvas.clientHeight);
    this.canvas.width = 2 * minWidth;
    this.canvas.height = 2 * minWidth;
    

    //range控件信息
    this.rangeValue = number;
    this.nowRange = number; //用于做一个临时的range

    //画布属性
    this.mW = canvas.width;
    this.mH = canvas.height;
    this.lineWidth = 4;
    this.tmp = 0.1; //rater

    //圆属性
    this.r = this.mH / 2; //圆心
    this.padding = 30;
    this.cR = this.r - this.padding; //圆半径

    this.render();
  }
  drawOuterCircle() {
    //   外层
    let lx, ly, r = this.r, cR = this.cR, ctx2 = this.ctx;
    ctx2.beginPath();
    ctx2.strokeStyle = "rgba(8, 101,153, 0.4)";
    ctx2.lineWidth = 2;
    ctx2.arc(r, r, cR + 20, -Math.PI / 3, Math.PI / 3);
    ctx2.stroke();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.arc(r, r, cR + 20, Math.PI / 2, Math.PI);
    ctx2.stroke();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.strokeStyle = "rgba(8, 101,153, 0.4)";
    ctx2.fillStyle = "#ffffff";
    ctx2.lineWidth = 4;
    lx = r + (cR + 20) * Math.cos(-Math.PI / 3);
    ly = r + (cR + 20) * Math.sin(-Math.PI / 3);
    ctx2.arc(lx, ly, 8, 0, 2 * Math.PI);
    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.strokeStyle = "rgba(8, 101,153, 0.4)";
    ctx2.fillStyle = "#ffffff";
    ctx2.lineWidth = 4;
    lx = r + (cR + 20) * Math.cos(Math.PI / 3);
    ly = r + (cR + 20) * Math.sin(Math.PI / 3);
    ctx2.arc(lx, ly, 8, 0, 2 * Math.PI);
    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();





    ctx2.beginPath();
    ctx2.strokeStyle = "rgba(8, 101,153, 0.4)";
    ctx2.fillStyle = "#ffffff";
    ctx2.lineWidth = 4;
    lx = r + (cR + 20) * Math.cos(Math.PI / 2);
    ly = r + (cR + 20) * Math.sin(Math.PI / 2);
    ctx2.arc(lx, ly, 8, 0, 2 * Math.PI);
    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.strokeStyle = "rgba(8, 101,153, 0.4)";
    ctx2.fillStyle = "#ffffff";
    ctx2.lineWidth = 4;
    lx = r + (cR + 20) * Math.cos(Math.PI);
    ly = r + (cR + 20) * Math.sin(Math.PI);
    ctx2.arc(lx, ly, 8, 0, 2 * Math.PI);
    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();
    this.IsdrawCircled = true;
  }
  drawCircle() {
    let r = this.r, cR = this.cR, ctx = this.ctx;
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#086599";
    ctx.arc(r, r, cR, 0, 2 * Math.PI);
    ctx.stroke();
  }

  //写百分比文本函数
  drawText() {
    this.ctx.save();

    this.ctx.font = '20px roboto';
    this.ctx.fillStyle = '#8E9FA9';
    this.ctx.textAlign = "center";
    let str = '社区人数';
    this.ctx.fillText(str, this.r, this.r - 20);


    var size = 0.4 * this.cR;
    this.ctx.font = "bold " + size + "px roboto";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#086599";
    this.ctx.fillText(this.nowRange, this.r, this.r + size / 2);

    this.ctx.restore();
  }
  render() {
    if (this.isStop) return false;
    this.ctx.clearRect(0, 0, this.mW, this.mH);
    this.drawCircle();
    this.drawOuterCircle();
    this.drawText();
    // this.xOffset += this.speed;
    // if(this.number != 0) {
    //   window.requestAnimationFrame(this.render.bind(this));
    // }
  }
  rerender(number) {
    this.isStop = false;
    this.number = number;
    this.rangeValue = number;
    this.nowRange = number;
    this.xOffset = 5
    this.render();
  }
  destroy() {
    this.isStop = true;
    console.log(this.isStop);
  }
  
}

export default water;
