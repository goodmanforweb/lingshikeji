class lineChart {
  constructor(selector, number) {
    this.canvas = selector;
    this.ctx = this.canvas.getContext("2d");
    this.padding = 30;
    this.x = 1;
    this.y = 0;
    this.target = number || '0';
    this.number = 3;
    this.hasGrow = false;
    this.acunumber = 0;
    this.rate = 0.01;
    this.bet = 4;
    this.calcAxis();
    this.addListener();
    this.render();
  }
  addListener() {
    this.resizew = this.resize.bind(this);
    window.addEventListener("resize", this.resizew, false);
  }
  resize() {
    this.calcAxis();
    this.rerender();
  }
  destroy() {
    window.removeEventListener("resize", this.resizew, false);
  }
  calcAxis() {
    this.canvas.width = this.canvas.clientWidth * 2;
    this.canvas.height = this.canvas.clientHeight * 2;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.unitHeight = (this.height - 2 * this.padding) / this.number;
    this.uinitWidth =
      (this.width - 4 * this.padding) / Math.pow(Math.E, this.number);
  }
  drawLine() {
    let hpadding = this.height / 5;
    let xwidth = this.width;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#f2f2f2";
    this.ctx.lineWidth = 1;
    Array.from({ length: 6 }).forEach((el, index) => {
      this.ctx.moveTo(0, index * hpadding);
      this.ctx.lineTo(xwidth, index * hpadding);
    });
    this.ctx.stroke();
    this.ctx.closePath();
  }
  drawCurve() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#fdd713";
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(this.uinitWidth * 1, this.height);
    const E = Math.E;
    let maxX = Math.pow(E, this.acunumber);
    let y = 0,
      x = 1,
      s = 1;
    for (s = 1; s <= maxX; s += this.rate) {
      y = this.height - Math.log(s) * this.unitHeight;
      x = s * this.uinitWidth;
      this.ctx.lineTo(x, y);
    }
    this.x = x;
    this.y = y;
    this.ctx.stroke();
    this.ctx.closePath();
  }
  drawCircles() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "RGBA(255, 196, 0, .3)";
    this.ctx.arc(this.x, this.y, 24, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "RGBA(255, 196, 0, 1)";
    this.ctx.strokeStyle = "RGBA(255, 196, 0, .5)";
    this.ctx.lineWidth = 12;
    this.ctx.arc(this.x, this.y, 12, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawText() {
    this.ctx.strokeStyle = "#fa7533";
    this.ctx.font = "20px Verdana";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`${this.target} ETH`, this.x, this.y - 30);
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  render() {
    this.hasGrow = true;
    if (this.acunumber > this.number) {
      this.drawText();
      this.hasGrow = false;
      return false;
    }
    this.acunumber += this.rate * this.bet;
    this.clear();
    this.drawLine();
    this.drawCurve();
    this.drawCircles();
    window.requestAnimationFrame(this.render.bind(this));
  }
  rerender(number) {
    if(number != undefined) {
      this.target = number || '0';
    }
    this.acunumber = 0;
    this.render();
  }
}

export default lineChart;
