function drawCircleProgress(selector, angle) {
  this.init = function(selector, angle) {
    this.canvas = selector;
    let minWidth = Math.min(selector.clientWidth,selector.clientHeight);
    this.canvas.width = 2*minWidth;
    this.canvas.height = 2*minWidth;
    this.ctx = this.canvas.getContext("2d");
    this.padding = 50;
    this.width = this.canvas.width - this.padding;
    this.height = this.canvas.height - this.padding;
   
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.rad = (Math.PI * 2) / 100;
    this.rate = 0.05;
    this.speed = -Math.PI / 2;
    this.realAngle = 0;
    this.number = 100;
    this.angle = angle;
    this.loop.call(this);
  };
  this.loop = function() {
    if(this.angle == 0 && this.realAngle == 0) {
      
    }
    else if(this.realAngle >= this.angle) {
      return false
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.speed += this.rate;
    this.realAngle += this.rate;
    //画轨迹
    this.drawPath(2 * Math.PI, "#DFF6FF");

    //画动态轨迹
    this.drawPath(this.speed, "#32C0FB");

    //画静态小圆点
    this.fill = true;
    this.drawPath(2 * Math.PI, "#32C0FB", this.centerX, this.padding / 2, 15);
    this.fill = false;

    //画动态小圆点
    this.fill = true;
    let r = this.width / 2;
    this.drawPath(
      2 * Math.PI,
      "#32C0FB",
      r * Math.cos(this.speed) + this.centerX,
      r * Math.sin(this.speed) + this.centerY,
      15
    );
    this.fill = false;
    window.requestAnimationFrame(this.loop.bind(this));
  };
  this.drawPath = function(angle,color,x = this.centerX,y = this.centerY,r = this.width / 2) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = color;
    this.ctx.arc(x, y, r, -Math.PI / 2, angle, false);
    this.ctx.stroke();
    if (this.fill) {
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fill();
    }
    this.ctx.closePath();
    this.ctx.restore();
  };
  this.rerender = function(angle) {
    this.speed = -Math.PI / 2;
    this.realAngle = 0;
    this.angle = angle;
    this.loop.call(this);
  };
  this.init(selector, angle);
}

export default drawCircleProgress;
