function drawCircleProgress() {
  this.init = function(selector, color, number, text) {
    this.canvas = document.getElementById(selector);
    this.ctx = this.canvas.getContext("2d");
    var ww = window.innerWidth;
    if (ww < 580) {
      this.canvas.width = 120;
      this.canvas.height = 120;
      this.isMobile = true;
    }
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.rad = (Math.PI * 2) / 100;
    this.rate = 0.5;
    this.speed = 0.9;

    this.indicatorColor = color;
    this.number = number;
    this.text = text;
    this.loop.call(this);
  };
  this.loop = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawPath();
    this.drawIndicator();
    this.drawNumber();
    this.drawText();
    if (this.speed < this.number) {
      window.requestAnimationFrame(this.loop.bind(this));
    }
    this.speed += this.rate;
  };
  this.drawIndicator = function() {
    this.ctx.save();
    this.ctx.strokeStyle = this.indicatorColor;
    this.ctx.lineWidth = 10;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.canvas.width / 2 - 20,
      -Math.PI / 2,
      -Math.PI / 2 + this.speed * this.rad,
      false
    );
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  };
  this.drawPath = function() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = "#f8fafc";
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.canvas.width / 2 - 20,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  };
  this.drawNumber = function() {
    this.ctx.save();
    this.ctx.fillStyle = "#4a4a4a";
    this.ctx.font = this.isMobile ? "16px Arial" : "40px Arial";
    var number = this.speed.toFixed(0) + "%";
    var y = this.isMobile ? this.centerY : this.centerY + 10;
    this.ctx.fillText(
      number,
      this.centerX - this.ctx.measureText(number).width / 2,
      y
    );
    this.ctx.restore();
  };
  this.drawText = function() {
    this.ctx.save();
    this.ctx.fillStyle = "#777";
    this.ctx.font = this.isMobile ? "12px Arial" : "25px Arial";
    var y = this.isMobile ? this.centerY + 20 : this.centerY + 40;
    this.ctx.fillText(
      this.text,
      this.centerX - this.ctx.measureText(this.text).width / 2,
      y
    );
    this.ctx.restore();
  };
}
if (!window.i18n) {
  console.error("请将i18n脚本放置在本脚本之前！");
}
function getConfig(lang) {
  var progressCircles = i18n[lang || "cn"].progressCircles;
  return [
    {
      select: "canvas1",
      color: "#3c7fff",
      number: 1,
      text: progressCircles.airdrop
    },
    {
      select: "canvas2",
      color: "#61b232",
      number: 4,
      text: progressCircles.operation
    },
    {
      select: "canvas3",
      color: "#ff7c3f",
      number: 10,
      text: progressCircles.team
    },
    {
      select: "canvas4",
      color: "#ffcc35",
      number: 15,
      text: progressCircles.found
    },
    {
      select: "canvas5",
      color: "#ea4334",
      number: 30,
      text: progressCircles.sale
    },
    {
      select: "canvas6",
      color: "#4b4b4b",
      number: 40,
      text: progressCircles.mining
    }
  ];
}

getConfig().forEach(cf => {
  new drawCircleProgress().init(cf.select, cf.color, cf.number, cf.text);
});

function renewCircle(lang) {
  setTimeout(function() {
    getConfig(lang).forEach(cf => {
      new drawCircleProgress().init(cf.select, cf.color, cf.number, cf.text);
    });
  }, 500);
}
