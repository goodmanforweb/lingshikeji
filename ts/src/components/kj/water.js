class water {
  constructor(canvas, number, canvas2) {
    this.canvas = canvas;
    this.canvas2 = canvas2;
    this.ctx = this.canvas.getContext("2d");
    this.ctx2 = this.canvas2.getContext("2d");
    this.number = number;
    this.isStop = false;
    let minWidth = Math.min(canvas.clientWidth, canvas.clientHeight);
    this.canvas.width = this.canvas2.width = 2 * minWidth;
    this.canvas.height = this.canvas2.height = 2 * minWidth;
    

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
    this.padding = 10 * this.lineWidth;
    this.cR = this.r - this.padding; //圆半径

    //Sin 曲线属性
    this.sX = 0;
    this.sY = this.mH / 2;
    this.axisLength = this.mW; //轴长
    this.waveWidth = 0.025; //波浪宽度,数越小越宽
    this.waveHeight = 20; //波浪高度,数越大越高
    this.speed = 0.09; //波浪速度，数越大速度越快
    this.xOffset = 5; //波浪x偏移量

    this.ctx.lineWidth = this.lineWidth;

    //画圈函数
    this.IsdrawCircled = false;
    this.clipCanvas();
    this.render();
  }
  drawOuterCircle() {
    //   外层
    let lx, ly, r = this.r, cR = this.cR, ctx2 = this.ctx2;
    ctx2.beginPath();
    ctx2.strokeStyle = "#9DE2FF";
    ctx2.lineWidth = 2;
    ctx2.arc(r, r, cR + 20, -Math.PI / 3, Math.PI / 3);
    ctx2.stroke();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.arc(r, r, cR + 20, Math.PI / 2, Math.PI);
    ctx2.stroke();
    ctx2.closePath();

    //小圆球
    // ctx2.beginPath();
    // ctx2.fillStyle = "#5ECEFD";
    // ctx2.arc(mW-40, 30, 16, 0, 2*Math.PI);
    // ctx2.fill();
    // ctx2.closePath();

    // ctx2.beginPath();
    // ctx2.strokeStyle = "#5ECEFD";
    // ctx2.arc(34, mH-34, 16, 0, 2*Math.PI);
    // ctx2.stroke();
    // ctx2.closePath();

    ctx2.beginPath();
    ctx2.strokeStyle = "#5ECEFD";
    ctx2.fillStyle = "#ffffff";
    ctx2.lineWidth = 4;
    lx = r + (cR + 20) * Math.cos(-Math.PI / 3);
    ly = r + (cR + 20) * Math.sin(-Math.PI / 3);
    ctx2.arc(lx, ly, 8, 0, 2 * Math.PI);
    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.strokeStyle = "#5ECEFD";
    ctx2.fillStyle = "#ffffff";
    ctx2.lineWidth = 4;
    lx = r + (cR + 20) * Math.cos(Math.PI / 3);
    ly = r + (cR + 20) * Math.sin(Math.PI / 3);
    ctx2.arc(lx, ly, 8, 0, 2 * Math.PI);
    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.fillStyle = "#5ECEFD";
    ctx2.lineWidth = 4;
    lx = r + (cR + 20) * Math.cos(Math.PI / 2);
    ly = r + (cR + 20) * Math.sin(Math.PI / 2);
    ctx2.arc(lx, ly, 8, 0, 2 * Math.PI);
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.fillStyle = "#5ECEFD";
    ctx2.lineWidth = 4;
    lx = r + (cR + 20) * Math.cos(Math.PI);
    ly = r + (cR + 20) * Math.sin(Math.PI);
    ctx2.arc(lx, ly, 8, 0, 2 * Math.PI);
    ctx2.fill();
    ctx2.closePath();
    this.IsdrawCircled = true;
  }
  clipCanvas() {
    this.ctx.beginPath();
    this.ctx.arc(this.r, this.r, this.cR, 0, 2 * Math.PI);
    this.ctx.clip();
  }
  drawCircle() {
    let r = this.r, cR = this.cR, ctx = this.ctx;
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#9DE2FF";
    ctx.arc(r, r, cR, 0, 2 * Math.PI);
    ctx.stroke();
    
  }
  //画sin 曲线函数
  drawSin() {
    this.ctx.save();

    var points = []; //用于存放绘制Sin曲线的点

    this.ctx.beginPath();
    //在整个轴长上取点
    for (var x = this.sX; x < this.sX + this.axisLength; x += 10) {
      //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
      var y = Math.sin((this.sX + x) * this.waveWidth + this.xOffset) * 0.8 + 0.1;

      var dY = (this.mH - 2 * this.padding) * (1 - this.nowRange / 100) + this.padding;

      points.push([x, dY - y * this.waveHeight]);
      this.ctx.lineTo(x, dY - y * this.waveHeight);
    }

    //封闭路径
    this.ctx.lineTo(this.axisLength, this.mH - this.padding);
    this.ctx.lineTo(this.sX, this.mH - this.padding);
    this.ctx.lineTo(points[0][0], points[0][1]);
    this.ctx.fillStyle = "#C5EDFE";
    this.ctx.fill();

    this.ctx.restore();
  }
  //写百分比文本函数
  drawText() {
    this.ctx.save();

    var size = 0.4 * this.cR;
    this.ctx.font = size + "px Microsoft Yahei";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "rgba(06, 85, 128, 0.8)";
    this.ctx.fillText(this.nowRange + "%", this.r, this.r + size / 2);

    this.ctx.restore();
  }
  render() {
    if (this.isStop) return false;
    this.ctx.clearRect(0, 0, this.mW, this.mH);
    this.drawCircle();
    !this.IsdrawCircled && this.drawOuterCircle();
    if (this.number != 0) this.drawSin();
    this.drawText();
    this.xOffset += this.speed;
    if(this.number != 0) {
      window.requestAnimationFrame(this.render.bind(this));
    }
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
