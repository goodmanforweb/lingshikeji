import createjs from "./tweenjs";
let z = (function(e, t, a) {
  function o(e) {
    return Math.round(Math.log(e) / 6e-5);
  }
  function r(e) {
    return Math.round(100 * Math.pow(Math.E, 6e-5 * e)) / 100;
  }
  return {
    rateToTime: o,
    timeToRate: r
  };
})();
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
  let min_size = Math.min(w, h);
  if (r > min_size / 2) r = min_size / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};
class eth {
  constructor() {
    this.rendering = !1;
    this.startTime = Date.now();
    this.currentTime = 0;
    this.animRequest = null;
    this.elapsed = 0;
    this.state = "STARTING";
    this.i18n = ["Crashed", "Next round in %s s", "Connection..."];
    this.colors = ["#FF6B69", "#F7BB0A", "#20272c", "#808080", "#ffffff"];
    this.escapes = [];
    this.lastRate = 0;
    this.lastwait = 0;
    this.onWindowResizeBinded = this.onWindowResize.bind(this);
  }
  startRendering(A) {
    this.rendering = !0;
    this.canvas = A;
    if (!this.canvas.getContext) return console.error("No canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 2 * this.canvas.clientWidth;
    this.canvasHeight = 2 * this.canvas.clientHeight;
    this.configPlotSettings();
    this.animRequest = requestAnimationFrame(this.render.bind(this));
    window.addEventListener("resize", this.onWindowResizeBinded);
  }
  stopRendering() {
    this.rendering = !1;
    window.removeEventListener("resize", this.onWindowResizeBinded);
  }
  onWindowResize() {
    this.canvasWidth = 2 * this.canvas.clientWidth;
    this.canvasHeight = 2 * this.canvas.clientHeight;
    this.configPlotSettings();
  }
  configPlotSettings() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;

    this.plotWidth = this.canvasWidth - 60;
    this.plotHeight = this.canvasHeight - 40;

    this.xStart = this.canvasWidth - this.plotWidth;
    this.yStart = this.canvasHeight - this.plotHeight;

    this.XAxisPlotMinValue = 1e4;
    this.YAxisSizeMultiplier = 2;
    this.gradient = this.ctx.createLinearGradient(
      0,
      this.canvasHeight,
      this.canvasWidth,
      0
    );
    this.gradient.addColorStop("0", "#FF6B69");
    this.gradient.addColorStop("1.0", "#FF9169");
  }
  calcGameData() {
    this.currentTime =
      "PROGRESS" === this.state ? Date.now() - this.startTime : 0;
    //跳出值
    this.currentGamePayout = z.timeToRate(this.currentTime);
  }
  calcPlotValues() {
    this.YAxisPlotMinValue = this.YAxisSizeMultiplier;
    this.YAxisPlotValue = this.YAxisPlotMinValue;
    this.XAxisPlotValue = this.XAxisPlotMinValue;
    this.currentTime > this.XAxisPlotMinValue &&
      (this.XAxisPlotValue = this.currentTime);
    this.currentGamePayout > this.YAxisPlotMinValue &&
      (this.YAxisPlotValue = this.currentGamePayout);
    this.YAxisPlotValue -= 1;
    this.widthIncrement = this.plotWidth / this.XAxisPlotValue;
    this.heightIncrement = this.plotHeight / this.YAxisPlotValue;
    this.currentX = this.currentTime * this.widthIncrement;
  }
  clean() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawCicles(x, y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "RGBA(255, 196, 0, .3)";
    this.ctx.arc(x, y, 24, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "RGBA(255, 196, 0, 1)";
    this.ctx.strokeStyle = "RGBA(255, 196, 0, .5)";
    this.ctx.lineWidth = 12;
    this.ctx.arc(x, y, 12, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawBg() {
    this.ctx.fillStyle = "#20272c";
    this.ctx.roundRect(60, 0, this.plotWidth, this.plotHeight, 8).fill();
  }
  drawGraph() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 6;
    // this.ctx.strokeStyle = this.gradient;
    this.ctx.strokeStyle = "#F5BC03";
    let x = 0,
      y = 0;
    for (let A = 0, s = 0; A <= this.currentTime; A += 100, s++) {
      let t = z.timeToRate(A) - 1,
        h = this.plotHeight - t * this.heightIncrement,
        e = A * this.widthIncrement;
      (x = e + this.xStart + 4), (y = h - 4);
      this.ctx.lineTo(x, y);

      if (s > 5e3) {
        console.log("For 1 too long!");
        break;
      }
    }
    this.ctx.stroke();
    this.currentTime > 0 && this.drawCicles(x, y);
  }
  drawAxes() {
    function A(A) {
      let s = 0.4,
        t = 0.1,
        h = !0;
      while (h) {
        if (A < s) return t;
        if (((s *= 5), (t *= 2), A < s)) return t;
        (s *= 2), (t *= 5);
      }
    }
    this.YAxisPlotMaxValue = this.YAxisPlotMinValue;
    this.payoutSeparation = A(
      this.currentGamePayout ? this.currentGamePayout : 1
    );
    this.ctx.lineWidth = 1;
    // this.ctx.strokeStyle = this.colors[2];
    this.ctx.strokeStyle = "rgba(0,0,0,0)";
    this.ctx.font = "22px Verdana";
    this.ctx.fillStyle = this.colors[3];
    this.ctx.textAlign = "center";
    for (
      let s = this.plotHeight / this.YAxisPlotValue,
        t = this.payoutSeparation,
        h = 0;
      t < this.YAxisPlotValue;
      t += this.payoutSeparation, h++
    ) {
      let e = this.plotHeight - t * s;
      this.ctx.fillText(t + 1 + "x", 30, e);
      this.ctx.beginPath();
      this.ctx.moveTo(this.xStart, e);
      this.ctx.lineTo(this.xStart + 5, e);
      this.ctx.stroke();
      if (h > 100) {
        console.log("For 3 too long");
        break;
      }
    }
    (this.milisecondsSeparation = A(this.XAxisPlotValue)),
      (this.XAxisValuesSeparation =
        this.plotWidth / (this.XAxisPlotValue / this.milisecondsSeparation));
    for (
      let g = 0, i = 0, a = 0;
      g < this.XAxisPlotValue;
      g += this.milisecondsSeparation, i++, a++
    ) {
      let Q = g / 1e3,
        p = this.ctx.measureText(Q).width,
        n = i * this.XAxisValuesSeparation + this.xStart;
      this.ctx.fillText(Q, n - p / 2, this.plotHeight + 20);
      if (a > 100) {
        console.log("For 4 too long");
        break;
      }
    }
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.xStart, 0);
    this.ctx.lineTo(this.xStart, this.canvasHeight - this.yStart);
    this.ctx.lineTo(this.canvasWidth, this.canvasHeight - this.yStart);
    this.ctx.stroke();
  }
  drawGameData() {
    let A = this.canvasWidth / 100;
    function s(s) {
      return A * s;
    }
    function t(A) {
      let t = s(A);
      return t.toFixed(2) + "px";
    }
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    switch (this.state) {
      case "PROGRESS":
        this.ctx.fillStyle = this.colors[1];
        this.ctx.font = t(12) + " Verdana";
        let txt = this.currentGamePayout.toFixed(2) + "x";
        this.ctx.fillText(
          txt,
          this.ctx.measureText(txt).width / 2 + 100,
          t(12).replace("px", "") / 2 + 30
        );
        break;
      case "ENDED":
        this.ctx.font = t(6) + " Verdana";
        this.ctx.fillStyle = this.colors[1];
        this.ctx.fillText(
          this.i18n[0],
          this.canvasWidth / 2,
          this.canvasHeight / 2 - s(8) / 2
        );
        // this.ctx.fillText("@ " + z.timeToRate(this.elapsed).toFixed(2) + "x", this.canvasWidth / 2, this.canvasHeight / 2 + s(8) / 2);
        this.ctx.fillText(
          "@ " + (this.endRate / 100).toFixed(2) + "x",
          this.canvasWidth / 2,
          this.canvasHeight / 2 + s(8) / 2
        );
        break;
      case "STARTING":
        this.ctx.font = t(4) + " Verdana";
        this.ctx.fillStyle = this.colors[3];
        let h = (this.startTime - Date.now()) / 1e3;
        if (h < 0) return;
        this.ctx.fillText(
          `Next round in ${h.toFixed(2)} s`,
          this.canvasWidth / 2,
          this.canvasHeight / 2
        );
        break;
      case "CONNECTION":
        this.ctx.font = t(8) + " Verdana";
        this.ctx.fillStyle = this.colors[3];
        this.ctx.fillText(
          this.i18n[2],
          this.canvasWidth / 2,
          this.canvasHeight / 2
        );
        break;
      default:
    }
  }

  drawEscapes() {
    let A = this;
    this.escapes.forEach(function(s, index) {
      A.ctx.font = "26px Verdana";
      A.ctx.fillStyle = "#F5BC03";
      A.ctx.globalAlpha = s.payoutTween / s.payout;
      let x = A.widthIncrement * s.elapsed + A.xStart;
      let y = A.plotHeight - s.payoutTween * A.heightIncrement;
      let text = "".concat(s.nickname, " @").concat(s.rate + "x");
      let textLenth = A.ctx.measureText(text).width;
      
      A.ctx.fillText(text, x, y);
      A.ctx.beginPath();
      A.ctx.arc(x - textLenth / 2 - 8, y, 5, 0, 2 * Math.PI);
      A.ctx.closePath();
      A.ctx.fill();
      A.ctx.globalAlpha = 1;
    });
  }
  escape(A) {
    let s = this,
      t = Object.assign({}, A);
      //修改后的crate
      t.crate = Number(t.rate);
      //处理crate
      // this.checkRateSame(t);
    t.elapsed = z.rateToTime(Number(t.crate));
    t.payout = Number(t.crate);
    t.payoutTween = t.payout;
    t.wait = 0;
    if(Math.abs(this.lastRate - t.crate) < .2) {
      t.wait = this.lastwait + 500;
    }
    createjs.Tween.get(t)
      .wait(t.wait)
      .to({ payoutTween: 0 }, 8e3)
      .call(function() {
        let A = s.escapes.indexOf(t);
        -1 !== A && s.escapes.splice(A, 1);
      });
    this.escapes.push(t);
    this.lastRate = t.crate;
    this.lastwait = t.wait;

  }
  checkRateSame(t) {
    let lastone = this.escapes.slice(0).pop();
    let hasSame = this.escapes.filter(el => {
      if(Math.abs(el.crate - t.rate) < .2) {
        return true;
      } 
    });
    if(hasSame.length > 0) {
      t.crate = lastone.crate + .5;
    }
  }
  render() {
    if (!this.rendering) return false;
    this.calcGameData();
    this.calcPlotValues();
    this.clean();
    this.drawBg();
    this.drawGraph();
    this.drawAxes();
    this.drawGameData();
    this.drawEscapes();
    this.animRequest = requestAnimationFrame(this.render.bind(this));
  }
}

export default eth;
