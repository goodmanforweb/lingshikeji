function drawCircleProgress(selector, angle, totalwater) {
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
    this.totalwater = totalwater+'';
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
    this.drawPath(2 * Math.PI, "rgba(8, 101,153, 0.4)");

    //画动态轨迹
    this.drawPath(this.speed, "#086599");

    //画静态小圆点
    this.fill = true;
    this.drawPath(2 * Math.PI, "#086599", this.centerX, this.padding / 2, 15);
    this.fill = false;

    //画动态小圆点
    this.fill = true;
    let r = this.width / 2;
    this.drawPath(
      2 * Math.PI,
      "#086599",
      r * Math.cos(this.speed) + this.centerX,
      r * Math.sin(this.speed) + this.centerY,
      15
    );
    this.drawText();
    this.fill = false;
    window.requestAnimationFrame(this.loop.bind(this));
  };
  this.drawPath = function(angle,color,x = this.centerX,y = this.centerY,r = this.width / 2) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 4;
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
  this.rerender = function(angle, totalwater) {
    this.speed = -Math.PI / 2;
    this.realAngle = 0;
    this.angle = angle;
    this.totalwater = totalwater+'';
    this.loop.call(this);
  };
  this.drawText = function() {
    let [str2, str3] = this.totalwater.split('.');
    this.ctx.save();
    this.ctx.font = '20px roboto';
    this.ctx.fillStyle = '#8E9FA9';
    this.ctx.textAlign = "center";
    let str = '总流水';
    this.ctx.fillText(str, this.centerX, this.centerY - 30);

    this.ctx.font = 'bold 40px roboto';
    this.ctx.fillStyle = '#086599';
    this.ctx.textAlign = "center";
    let len2 = this.ctx.measureText(str2).width;
    this.ctx.fillText(str2, this.centerX - 10, this.centerY + 10);

    //小数
    this.ctx.font = '18px roboto';
    this.ctx.fillStyle = '#086599';
    this.ctx.textAlign = "center";
    str3 = '.' + str3;
    let len3 = this.ctx.measureText(str3).width;
    this.ctx.fillText(str3, this.centerX - 10 + len2/2 + len3/2, this.centerY + 10);


    this.ctx.restore();
  }
  this.init(selector, angle);
}

export default drawCircleProgress;
