<template> 
    <div class="index-wrap wrap" :class="{hasMargin}">
      <div class="yhzs-wrap flex sb">
        <span><img src="../assets/images/yhzsl-min.png" alt=""></span>
        <span><img src="../assets/images/yhzsr-min.png" alt=""></span>
         <span class="shake-denglong"><img  class="shake-denglong-pic" src="../assets/images/yrdenglong.png" alt=""></span>
      </div>

      <div class="yfangzi-wrap">
        <div class="yfangzi-layer center">
          <img src="../assets/images/yfangzi-min.png" alt="">
        </div>
         <img class="yyun" v-if="!isMobile" src="../assets/images/yyun.png" alt="">
        <div class="yfangzi-info flex sb">
          <div class="yf-text">
            <h4>{{$t('ms.indexjoy')}}</h4>
            <div>{{$t('ms.indexhbs')}}</div>
            <div>{{$t('ms.indexkhz')}}</div>
            <div v-html="$t('ms.indexqwhb')"></div>
            <div>
              <span v-html="$t('ms.indexzhyr')"></span>
              <img  v-if="!isMobile" class="ybird" src="../assets/images/ybird.png" alt="">
            </div>

            <div id="tosee">{{$t('ms.tosee3')}}</div>
            
          </div>
          <div class="yf-pic">
            <img src="../assets/images/yytree-min.png" alt="">
          </div>
        </div>
      </div>
      <div class="iiner  spec">
         <div class="slider-box" ref="slidebox">
          <div class="twocube flex" ref="game">
            <div :class="`cube${index+1} cube`" v-for="(pic, index) in sliderpics" :key="index">
              <template v-if='pic.path'>
                   <a :href="pic.path" target="_blank">
                    <img :src="pic[$i18n.locale]" alt="">
                  </a>
              </template>
              <template v-else>
                  <img :data-name="pic.name" :src="pic[$i18n.locale]" :style="'filter: grayscale(95%);-webkit-filter: grayscale(95%)'">
              </template>
            </div>
          </div>
        </div>
        <div class="slider-disabled" ref="noclick" v-if="!isMobile">
          <div class="slider-no-click no-click1" ></div>
          <div class="slider-no-click no-click2" ></div>
        </div>
        <div class="slider-arrows" v-if="!isMobile" ref="slidearrow">
            <div class="arrow arrow-left" @click="move('next')"><i class="el-icon-arrow-left"></i></div>
            <div class="arrow arrow-right" @click="move('prev')"><i class="el-icon-arrow-right"></i></div>
        </div>
      </div>

      <div class=" slider-box">
        <span class="ydenglong"  v-if="!isMobile">
          <img src="../assets/images/ydenglong-min.png" alt="">
        </span>
        <div class="switch-show iiner" ref="switchshow">
          <el-carousel :autoplay=false    @change="switchshowChange" height="420px" indicator-position="none" arrow="never" ref="car">
            <el-carousel-item key=0>
              <div class="ss-hd flex">
                <div class="ss-hd-number pic1">
                  <img src="../assets/images/number_01.png" alt="">
                </div>
                <div class="ss-hd-text">
                  <h1 v-html="$t('ms.indextit1')"></h1>
                  <div class='cont'>
                  {{$t('ms.tit1desc')}}
                    </div>
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item key=1>
              <div class="ss-hd flex">
                <div class="ss-hd-number">
                  <img src="../assets/images/number_02.png" alt="">
                </div>
                <div class="ss-hd-text">
                  <h1 v-html="$t('ms.indextit2')"></h1>
                  <div class='cont'>{{$t('ms.tit2desc')}}</div>
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item key=2>
              <div class="ss-hd flex">
                <div class="ss-hd-number">
                  <img src="../assets/images/number_03.png" alt="">
                </div>
                <div class="ss-hd-text">
                  <h1 class="last-h1 last-3" v-html="$t('ms.indextit3')"></h1>
                  <div class='cont'>{{$t('ms.tit3desc')}}</div>
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item key=3>
              <div class="ss-hd flex">
                <div class="ss-hd-number">
                  <img src="../assets/images/number_04.png" alt="">
                </div>
                <div class="ss-hd-text">
                  <h1 class="last-h1" v-html="$t('ms.indextit4')"></h1>
                  <div class='cont'>{{$t('ms.tit4desc')}}</div>
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item key=4>
              <div class="ss-hd flex">
                <div class="ss-hd-number">
                  <img src="../assets/images/number_05.png" alt="">
                </div>
                <div class="ss-hd-text">
                  <h1 class="last-h1" v-html="$t('ms.indextit5')"></h1>
                  <div class='cont'>{{$t('ms.tit5desc')}}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <ul class="ss-bd flex">
            <li class="ss-cube" @click="switchShow(0)">
             <div>
                <img src="../assets/images/x1.png" alt="">
                <p v-html="$t('ms.indextit1')"></p>
             </div>
            </li>
            <li class="ss-cube" @click="switchShow(1)">
              <div>
                <img src="../assets/images/x2.png" alt="">
                <p  v-html="$t('ms.indextit2')"></p>
              </div>
              
            </li>
            <li class="ss-cube" @click="switchShow(2)">
              <div>
                <img src="../assets/images/x3.png" alt="">
                <p v-html="$t('ms.indextit3')"></p>
              </div>
              
            </li>
             <li class="ss-cube" @click="switchShow(3)">
              <div>
                <img src="../assets/images/x4.png" alt="">
                <p v-html="$t('ms.indextit4')"></p>
              </div>
              
            </li>
             <li class="ss-cube" @click="switchShow(4)">
              <div>
                <img src="../assets/images/x5.png" alt="">
                <p v-html="$t('ms.indextit5')"></p>
              </div>
              
            </li>
          </ul>
        </div>
        <span class="ytree"  v-if="!isMobile">
          <img src="../assets/images/ytree-min.png" alt="">
        </span>
      </div>

      <div class="downlemon">
        <div class="downlemon-layer" v-if="!isMobile">
          <img src="../assets/images/yweiqiang-min2.png" alt="">
        </div>
        <footer class="center">
          <p>{{$t("ms.areyouready")}}</p>
          <p class="index-btns">
            <router-link v-if="!login.token" to="/loginTab/register"><el-button type="primary">{{$t("ms.register")}}</el-button></router-link>
            <router-link v-if="!login.token" to="/loginTab/login"><el-button plain>{{$t("ms.login")}}</el-button></router-link>
            <router-link v-if="login.token" to="/dashboard/rewards"><el-button type="primary">Dashboard</el-button></router-link>
          </p>
        </footer>
      </div>

    </div>
</template>

<script>
import Vue from "vue";

import util from "util";
import { mapGetters } from "vuex";
import QRCode from "qrcode";
import Clipboard from "clipboard";
import lineChart from "./lineChart";
import Slider from "./slider";
import Hub from "hub";
import apiconfig from 'apiconfig';
let sliderpics = [
  ["fn", "#/room"],
  ["kg", "#/kjindex"],
  
  // ['lot', 'https://testlottery.cjoy.games/#/index'],
  ['hongbao','./rindex.html#/index'],
  // ['hongbao2', ''],
  ["card", {
    ios: '#/apple',
    andriod: '#/andriod',
    pc: '#/card'
  }[util.checkSys()]],
  ["fh", ""],
  ["seer", ""]
];
sliderpics = sliderpics.map(el => {
  return {
    zh: require(`../assets/images/${el[0]}.png`),
    en: require(`../assets/images/${el[0]}en.png`),
    path: el[1],
    name: el[0]
  };
});

export default {
  data() {
    return {
      videolayer: false,
      hideLayer: true,
      sliderpics,
      indexPic: "",
      height: "500px",
      showqrcode: false,
      isMobile: window.innerWidth < 700,
      perinfo: {},
      showInfoLoader: false,
      hasMargin: false,
      buynowtext: this.$t("ms.buynow"),
      blockLoader: false,
      autoplay: true,
      blockData: {
        fixHeight: apiconfig.blockHeight,
        blockNumber: 0,
        show: true
      },
      whitebook: {
        zh: {
          url: 'http://cjoy.oss-cn-hongkong.aliyuncs.com/user-dir/cjoy_whitepaper_zh.pdf',
          name: 'Crypto Joy 白皮书'
        },
        en: {
          url: 'http://cjoy.oss-cn-hongkong.aliyuncs.com/user-dir/cjoy_whitepaper.pdf',
          name: 'white paper for Crypo Joy'
        }
      }
    };
  },
  name: "Index",
  created() {
    this.getPerInfo();
    this.blockFetchTime = 0;
    this.getBlockHeight();
  },
  mounted() {
    this.car = this.$refs.car;
    this.createCopy();
    Hub.$on("scrollToDeposit", this.goDeposit);
    Hub.$on("navChange", this.handleMargin);
    window.addEventListener("scroll", this.scollHandler, false);
    // this.blockTick = this.createTickForBlockHeight();
    this.$nextTick(() => {
      !this.isMobile && this.initSlider();
    });
    // this.isMobile && this.initTouch();
  },
  computed: {
    ...mapGetters(["login", "toDepositState"]),
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scollHandler, false);
    this.tick && clearInterval(this.tick);
    this.blockTick && clearInterval(this.blockTick);
    !this.isMobile && this.slide.destroy();
    if(this.isMobile && this.touch) {
      this.$refs.gif.removeEventListener('touchstart', this.touchstart, false);
      this.$refs.gif.removeEventListener('touchend', this.touchend, false);
    }
  },
  methods: {
    // showdialog(e) {
    //   if(e.target.tagName != "IMG") return;
    //   if(e.target.getAttribute('data-name')=='hongbao2') {
    //     this.$message.info(this.$t('ms.tosee2'));
    //   }
    // },
    initTouch() {
      this.touch = util.touch(this.$refs.gif, (direction) => {
        if(direction == 3) {//zuo
          this.autoplay = false;
          this.$refs.slider.prev();
        }
        else if(direction == 4) {//you
          this.autoplay = false;
          this.$refs.slider.next();
        }
      })
    },
    playvideo() {
      let url = {
        zh: 'http://v.youku.com/v_show/id_XMzg5MzI3MDIzMg==.html',
        en: 'https://youtu.be/gBCmH0Mxcpg'
      }[this.$i18n.locale];
      window.open(url);
      // this.videolayer = true;
      // this.$nextTick(() => {
      //   console.log(this.$refs.videoPlayer.player);
      // })
    },
    closeLayer() {
      this.player.pause();
      this.videolayer = false;
    },
    initSlider() {
      const slide = (this.slide = new Slider(this));
      slide.init();
    },
    move(type) {
      this.slide.move(type);
    },
    handleMargin(e) {
      this.hasMargin = e;
    },
    createLineChart() {
      if(this.lineChart) {
        this.lineChart.rerender(this.perinfo.price);
      }
      else {
        if(this.$refs.coincanvas) {
          this.lineChart = new lineChart(this.$refs.coincanvas, 
          this.perinfo.price
          );
          this.lineChart.scrollHide = true;
        }
      }
      
    },
    getPerInfo() {
      this.showInfoLoader = true;
      util
        .getPerInfo({}, {}, this)
        .then(res => {
          if (res.status == 200) {
            this.perinfo = res.data;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.showInfoLoader = false;
        });
    },
    createTickForPerInfo() {
      return setInterval(() => {
        this.getPerInfo();
      }, 1000 * 60);
    },
    createTickForBlockHeight() {
      return setInterval(() => {
        this.getBlockHeight();
      }, 1000 * 60);
    },
    createQrcode() {
      if(!this.$refs.qrcode) return false;
      QRCode.toCanvas(
        this.$refs.qrcode,
        this.perinfo.ctjAddress,
        {
          width: this.isMobile ? 120 : 200,
          height: this.isMobile ? 120 : 200,
          margin: 1
        },
        function(err) {
          if (err) {
            console.warn("生成二维码出错:(");
          }
          console.log("succ");
        }
      );
    },
    createCopy() {
      if(!this.$refs.copyBtn || !this.$refs.copyBtn.$el) return false;
      new Clipboard(this.$refs.copyBtn.$el).on("success", e => {
        this.$message.info(this.$t("ms.copy"));
        e.clearSelection();
      });
    },
    switchShow(e) {
      this.car.setActiveItem(e);
    },
    buynow() {
      this.showqrcode = !this.showqrcode;
      this.handleBtnLang();
    },
    handleBtnLang() {
      this.buynowtext = this.showqrcode
        ? this.$t("ms.seeprice")
        : this.$t("ms.buynow");
    },
    goDeposit(type) {
      let scrollY = util.getDomPosition(this.$refs[type])[1];
      let wtop = util.getScrollTop();
      let rate = 20;
      let check = null;
      //向上wtop - scrollY < -100
      //向下 wtop - scrollY > -100
      if (scrollY > wtop) {
        rate = rate;
        check = () => wtop - scrollY > -100;
      } else if (scrollY < wtop) {
        rate = -rate;
        check = () => wtop - scrollY < -100;
      } else {
        return;
      }
      let handler = () => {
        wtop += rate;
        if (check()) {
          return false;
        } else {
          window.scrollTo(0, wtop);
          window.requestAnimationFrame(handler);
        }
      };
      window.requestAnimationFrame(handler);
    },
    switchshowChange(idx) {
      const lis = [...document.querySelectorAll(".ss-bd li")];
      lis.forEach((li, index) => {
        index == idx
          ? li.classList.add("item-active")
          : li.classList.remove("item-active");
      });
    },
    scrollHanlderDispather() {
      const config = {
        switchshow: (domState, target) => {
          if (domState == "show") {
            console.log("show...");
            !target.classList.contains("animation-active") &&
              target.classList.add("animation-active");
          } else if (domState == "hide") {
            // target.classList.remove("animation-active");
          } else if (domState == "transition") {
            //do noting
          }
        },
        gamecoin: (domState, target) => {
          if (domState == "show") {
            console.log("show...");
            if (this.lineChart) {
              if(this.lineChart.hasGrow == false && this.lineChart.scrollHide) {
                this.lineChart.rerender();
                this.lineChart.scrollHide = false;
              }
            }
          } else if (domState == "hide") {
            this.lineChart && (this.lineChart.scrollHide = true);
          } else if (domState == "transition") {
            //do noting
          }
        }
      };

      Object.keys(config).forEach(cf => {
        const target = this.$refs[cf];
        if(target) {
          const domState = util.checkDomPosition(target);
          config[cf](domState, target);
        }
      });
    },
    scollHandler() {
      if (this.ticker) {
        clearTimeout(this.ticker);
      }

      this.ticker = setTimeout(() => {
        this.scrollHanlderDispather();
      }, 100);
    },
    getBlockHeight() {
      this.blockLoader = true;
      util
        .getBlockHeight({}, {}, this)
        .then(res => {
          if (res.status == 200) {
            const blockNumber = parseInt(res.data.blockNumber, 16);
            let obj = {
              blockNumber
            };
            if(Number(blockNumber) >= Number(this.blockData.fixHeight)) {
              obj.show = false;
              this.blockTick && clearInterval(this.blockTick);
            }
            Object.assign(this.blockData, obj);
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.blockLoader = false;
        });
    }
  },
  watch: {
    perinfo: {
      deep: true,
      handler: function() {
        if(!this.blockData.show) {
          this.createQrcode();
          this.createLineChart();
        }
      }
    },
    blockData: {
      deep: true,
      handler: function(n) {
        this.blockFetchTime++;
        if(this.blockFetchTime == 1) {
          this.hideLayer = false;
        }
        if(!n.show) {
          this.$nextTick(() => {
            this.createQrcode();
            this.createLineChart();
            this.tick = this.createTickForPerInfo();
          });
        }
      }
    },
    "$i18n.locale": function() {
      this.handleBtnLang();
    }
  }
};
</script>

<style lang="scss">
.index-wrap {
  // background: url(../assets/images/ybk.jpg) no-repeat center center;
  // background-size: 100% 100%;
  // padding-top: 4rem;
  background: linear-gradient(to bottom, #6a0000, #c3000b);
  margin-top: -4rem;
  // background-color: #305fb6;

  .layer-hd {
    position: relative;
    height: 4rem;
    i {
      font-size: 3rem;
      color:#fff;
      position: absolute;
      right:1rem;
      top:.5rem;
      cursor: pointer;
      transition: all .3s linear;
      will-change: transform;
    }
    i:hover {
      transform: rotate(90deg)
    }
  }
  .gif {
    .b-text-i {
      font-size: 2.5rem;
    }
    .gif-wrap {
      .el-carousel__arrow {
        font-size: 2.2rem;
        font-weight: bolder;
        width: 60px;
        height: 60px;
        background-color: transparent;
      }
      .el-carousel__arrow:hover {
        background-color: rgba(31, 45, 61, .3);
      }
    }
  }
  .ec-wrap-gif:after {
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: url(../assets/images/cj.gif) no-repeat center;
    background-size: cover;
    opacity: .3;

  }
  .ec-wrap {
    padding: 12rem 0 2rem;
    position: relative;
    color:#fff;
    height: 100%;
    box-sizing: border-box;
  }
  .b-text-i {
    text-transform: capitalize
  }
  .b-text-hint {
    margin-bottom: 5rem;
  }
  .bb-btns {
    text-transform: uppercase;
    font-size: 1.2rem;
    position: relative;
    width: 60%;
    max-width: 800px;
    margin: 0 auto;
    justify-content: space-around;
    padding: 1.2rem 0;
    border-top:1px solid rgba(255, 255, 255, 0.1);
    border-bottom:1px solid rgba(255, 255, 255, 0.1);
  }
  .bb-btns:after, .bb-btns:before {
    content:'';
    position: absolute;
    right:0;
    left: 0;
    height: 1px;
    width:0;
    margin: auto;
    transition: all .3s cubic-bezier(0.42,0,0.58,.8);
    background-color: #fff;
  }
  .bb-btns:after {
    top:-1px;
  }
  .bb-btns:before {
    bottom: -1px;
  }
  .bb-btns:hover:after, .bb-btns:hover:before {
    width: 100%;
  }
  .watch-btn {
    display: inline-block;
    width: 4rem;
    height: 4rem;
    background: url(../assets/images/play.png) no-repeat center center;
    background-size: cover;
    cursor: pointer;
    transition: all .3s linear;
  }
  .watch-btn:hover {
    background-image: url(../assets/images/playw.png)
  }
  .whitebook-btn {
    display: inline-block;
    width: 4rem;
    height: 4rem;
    background: url(../assets/images/dd.png) no-repeat center center;
    background-size: cover;
    cursor: pointer;
    transition: all .3s linear;
  }
  .whitebook-btn:hover {
    background-image: url(../assets/images/ddw.png)
  }
  .b-btn:hover {
    transform: scale(1.1);
  }
  .uplemon {
  }
  .downlemon {
   position: relative;
   margin-top: 200px;
  }
  .iiner {
    max-width: 1200px;
    margin: 0 auto;
  }

  footer {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    color: #fff;
    // padding-bottom: 2rem;
    p:first-child {
      margin-bottom: 3rem;
      font-size: 2rem;
    }
    .line {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 3rem;
      margin-top: 4rem;
      img {
        width: 175px;
      }
    }
  }
  .index-btns {
    button {
      width: 13.2rem;
      font-weight: normal;
      line-height: 1.5rem;
      font-size: 1.3rem;
    }
    a:first-child button {
      background-color: #af2326;
    }
    a:nth-child(2) button {
      border: 1px solid #fff !important;
      background-color: transparent;
      color: #fff;
      margin-left: 3rem;
    }
  }
  .banner {
    color: #fff;
    background: url(../assets/images/uplemon.png) no-repeat right center;
    background-size: 30% auto; 

    p:nth-child(1) {
      margin-top: 0;
      font-size: 4rem;
      width: 650px;
    }
    p:nth-child(2) {
      margin: 6rem 0 4rem;
    }
  }
  .spec {
    position: relative;
    margin: 10rem auto 10rem;
  }
  .slider-box {
    overflow: hidden;
    position: relative;
  }
  .slider-no-click {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 99;
  }
  .no-click1 {
    left: 0;
  }
  .no-click2 {
    right: 0;
  }
  .slider-arrows {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    z-index: 120;
    .arrow {
      position: absolute;
      top: -30px;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border-radius: 50%;
      color: #fff;
      background-color: #000;
      opacity: 0.2;
      font-size: 2rem;
      cursor: pointer;
    }
    .arrow:hover {
      opacity: 0.8;
    }
    .arrow-left {
      left: -30px;
    }
    .arrow-right {
      right: -30px;
    }
  }
  .tran {
    transition: transform 0.3s linear;
  }
  .twocube {
    white-space: nowrap;
    font-size: 0;
    .cube {
      img {
        width: 100%;
      }
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      transition: transform 0.3s linear;
      width: 11rem;
      border-radius: 4px;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      color: #333;
      margin: 0 1rem;
      position: relative;
    }
    .cube:first-of-type {
      margin-left: 0;
    }
    .cube:last-of-type {
      margin-right: 0;
    }
    .cube.disable {
      opacity: 0.4;
      transform: scale(0.8);
    }

    .cube:hover {
      transform: translate3d(1px, 1px, 0px) scaleX(0.99);
    }
  }
  .switch-show {
    h1 {
      color: #fcedd9;
      font-size: 4rem;
    }
    h1:last-child {
      font-size: 3rem;
    }
    .cont {
      color: #fcedd9;
    }
    .ss-hd {
      justify-content: center;
    }

    .last-h1 {
      font-size: 3.5rem;
      max-width: 490px;
    }

    .ss-hd-number {
      // flex: 1;
      width: 36%;
      img {
        width: 80%;
      }
    }
    .ss-hd-text {
      .p1 {
        font-size: 3.5vw;
        text-transform: capitalize;
      }
      .p2 {
        font-size: 3.5vw;
        text-transform: capitalize;
      }
      .p3 {
        font-size: 2.6vw;
        text-transform: capitalize;
      }
      width: 46%;
      // flex: 2;
      max-width: 700px;
    }
    .ss-bd {
      justify-content: space-between;
      li {
        width: 18%;
        height: 10rem;
        background-color: #fcedd9;
        border-radius: 4px;
        padding: 1rem 2rem;
        opacity: 0;
        overflow: hidden;
        box-sizing: border-box;
        animation-duration: 0.5s;
        animation-fill-mode: both;
        cursor: pointer;
        position: relative;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        > div {
        }
        img {
          width: 16px;
        }
        p {
          text-align: center;
          margin-top: 5px;
          margin-bottom: 0;
        }
      }

      li:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(221, 128, 131, .6)
      }

      li.item-active {
        box-shadow: 0px 10px 47px rgba(0, 0, 0, 0.1);
        // overflow: hidden;
      }
      li.item-active:after {
        background-color: transparent;
      }
      li:nth-child(2) {
        animation-delay: 0.3s;
      }
      li:nth-child(3) {
        animation-delay: 0.6s;
      }
      li:nth-child(4) {
        animation-delay: .8s;
      }
      li:nth-child(5) {
        animation-delay: 1s;
      }
      .p3 {
        font-size: 20px;
      }
    }
  }
  .switch-show.animation-active {
    .ss-bd {
      li {
        animation-name: fadeInDownBig;
      }
    }
  }
}
.index-wrap.hasMargin {
  margin-top: 0;
}

.game-coin-wrap {
  // position: relative;
  overflow: hidden;
  margin: 10rem 0 8rem;
  .i-progress {
    width: 100%;
    padding: 3px;
    // height: 18px;
    border-radius: 20px;
    background-color: #fff;
    font-size: 0;
    border: 1px solid #ffe200;
    text-align: center;
    position: relative;
    .p-wrap {
      position: relative;
    }
    i {
      font-size: 12px;
      color: #000;
      position: relative;
      z-index: 20;
    }
    span {
      max-width: 100%;
      transition: all 0.3s linear;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 12;
      width: 50%;
      border-radius: 20px;
      background: linear-gradient(to right, #fee100, #f7b74d);
    }
  }
  .block-counter {
    background-color: rgba(30, 25, 38, .922);
    padding: 6rem 3rem 1rem;
    border-radius: 4px;
    .block-counter-info {
      flex: 1.5
    }
    .bc-tit {
      font-size: 3rem;
      color:#fff;
    }
    .bc-info {
      color:#bd9eff;
      font-size: 2rem;
      margin: 2rem 0;
    }
    .bc-pic {
      flex: 1;
      img {
        max-width: 90%;
      }
    }
    .bc-steps {
      margin-top: 8rem;
      img {
        max-width: 100%;
      }
      
    }

    .i-progress {
      background-color: #8f8c93;
      border:none;
      span {
        background: #bd9eff!important;
      }
    }

  }
}
.game-coin-wrap.hideLayer {
  position: relative;
  z-index: 300;
}
.game-coin-wrap.hideLayer:after {
  content:'';
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  z-index: 301;
  background-color: #fff;
}
.game-coin {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 6rem 3rem 1rem;
  .lineChart {
    width: 100%;
    height: 100%;
    min-height: 200px;
  }
  > div {
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .gm {
    font-size: 3rem;
    padding: 12px 0;
    .gmen {
      font-size: 2rem;
    }
  }
  .i-info {
    // min-width: 430px;
    margin-right: 2rem;
    button {
      width: 13.2rem;
      font-weight: normal;
      line-height: 1.5rem;
      font-size: 1.3rem;
      margin: 3rem 0 3.5rem;
    }
    > span {
      i {
        font-weight: bold;
      }
    }
  }


  .i-img {
    text-align: right;
    max-height: 300px;
    img {
      width: 85%;
    }
    .el-button {
      margin-top: 1rem;
      text-transform: lowercase;
    }
  }

  .el-button {
    background-color: #ffe200;
    color: #131922;
  }
  .el-button:active {
    background-color: #ffe200;
  }

  .game-qrcode {
    text-align: center;
    .copy-input {
      border: none;
    }
    span {
      display: block;
      margin: 0 auto;
    }
  }
  .gamecoin-hint {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  .gamecoin-text {
    border-radius: 4px;
    background-color: #f7fdff;
    border-left: 4px solid #2fbffb;
    font-size: 12px;
    padding: 1rem 1rem 1rem 2.5rem;

    i {
      font-style: normal;
      color: #ff5400;
    }
    p {
      position: relative;
    }
    p:first-child {
      margin-bottom: 1.2rem;
    }
    .cjtcheck {
      a {
        text-decoration: underline
      }
    }
    p:before {
      content: "\E61A";
      position: absolute;
      top: 3px;
      left: -1.2rem;
      font-family: element-icons !important;
      speak: none;
      color: #2fbffb;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      -webkit-font-smoothing: antialiased;
    }
  }
}


.marquee .bar {
  animation: marquee 15s linear infinite;
}

.marquee .bar:hover {
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translate(0);
  }

  to {
    transform: translate(-100%);
  }
}
@keyframes marqueeup {
  0% {
    transform: translate(0, 0);
  }

  to {
    transform: translate(0, -100%);
  }
}
@-webkit-keyframes fadeInDownBig {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -1000px, 0);
    transform: translate3d(0, -1000px, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDownBig {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -1000px, 0);
    transform: translate3d(0, -1000px, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes slideDownUp {
  0% {
    opacity: 0.1;
  }
  25% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
  75% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}
@media screen and (max-width: 880px) {
  .index-wrap .banner p:nth-child(1) {
    font-size: 3rem;
  }
  .index-wrap {
    .switch-show {
      .ss-bd {
        li {
          font-size: 1rem;
        }
      }
    }
  }
}

@media screen and (max-width: 700px) {
  html {
    font-size: 14px
  }
  .index-wrap {
    // background-image: url(../assets/images/bbkm.png);
    .bb-btns {
      width: auto;
    }
    .uplemon {
      background-size: 60% auto;
    }
    .downlemon {
      background-size: 40% auto;
    }
    .iiner {
      padding: 1rem;
      width: auto !important;
    }
    .spec {
      padding: 0;
      margin: 0 auto;
    }
    .b-logo {
      img {
        width: 60%;
      }
    }
    .index-btns {
      button {
        width: 40%;
      }
    }
    .banner {
      text-align: center;
      p:nth-child(1) {
        font-size: 2.5rem;
        width: auto;
      }
    }
    .twocube {
      margin: 7rem 0 5rem;
      align-items: center;
      flex-direction: column;
      .cube {
        width: 85%;
        margin: 1rem 0;
        order: 2;
      }
      .cube1 {
        order: 1;
      }
    }
    .switch-show {
      .el-carousel__container {
        height: 500px !important;
      }
      .ss-hd {
        flex-direction: column;
      }
      .ss-hd-number {
        width: auto;
        text-align: center;
        img {
          width: 120px!important;
        }

      }
      .ss-hd-number.pic1 {
        img {
          width:100px!important;
        }
      }
      .ss-hd-text {
        width: auto;
        h1 {
          text-align: center;
          font-size: 12vw;
        }
        .last-h1 {
          font-size: 9vw;
          max-width: none;
          margin-right: auto;
          margin-left: auto;
        }
        .cont {
          width: 72%;
          margin: 0 auto;
        }
      }
      .ss-bd {
        li {
          img {
            width: 20px;
          }
          padding: 1rem;
          font-size: 12px;
          width: 31%;
        }
        .p3 {
          font-size: 12px;
        }
      }
    }
    .game-coin {
      padding: 3rem 1rem 1rem;
      position: relative;
      button {
        font-weight: normal;
        line-height: 1.5rem;
        font-size: 1.3rem;
      }
      .copy-link {
        button {
          width: 30%;
        }
      }
      > div {
        flex-direction: column;
        .i-info {
          // order: 2;
        }
        .i-img {
          // order: 1;
          text-align: center;
          flex: none;
          max-height: 320px;
        }
        .i-info {
          text-align: center;
          flex: none;
        }
        .i-progress {
          margin-bottom: 2rem;
        }
      }
      .gm {
        font-size: 2rem;
        padding-top: 6px;
        .gmen {
          font-size: 5.8vw;
        }
      }
      .lineChart {
        min-height: 250px;
      }
      .gamecoin-text {
        p:before {
          left: -1.5rem;
        }
      }

      

    }
    .downlemon {
      max-width: 1800px;
      margin-top: 120px;
      height: 240px;
      background: url(../assets/images/yweiqiang-min2.png) no-repeat center/140% 100%;
    }
    footer {
      position: relative;
      top: 30%;
      p:first-child {
        font-size: 1.6rem;
      }
      .line {
        img {
          width: 35%;
        }
      }
    }
    .switch-show .ss-bd {
      overflow: auto;
    }
    .switch-show .ss-bd .ss-cube {
      min-width: 100px;
      height: 70px;
      margin-right: 10px;
    }
    


      //year style
.yhzs-wrap {
  position: relative;
  img {
    width: 100px;
  }
  .shake-denglong {
    position: absolute;
    top: 40px;
    z-index: 99;
    right: 0px;
    img {
      width: 50px;
    }
  }
}


.yfangzi-wrap {
  
  position: relative;
  margin: -10px auto 0;
  width: 90%;
  max-width: 1800px;
}

.yfangzi-info {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  width: 70%;
  margin: auto;
  flex-direction: column;
  .yf-text {
    order: 2;
    text-align: center;
    h4 {
      font-size: 16px;
      margin: 10px 0;
    }
    div {
      font-size: 14px;
    }
  }
  .yf-pic {
    order: 1;
    text-align: center;
    img {
      width: 50%
    }
  }
}


.slider-box {
  position: relative;
  margin-top: 40px;
  .ydenglong {
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 150px;
    }
  }
  .ytree{
    position: absolute;
    right: 0;
    bottom: 0;
    img {
      width: 150px;
    }
  }
}


  }
   .game-coin-wrap {
    .block-counter {
      padding: 3rem 1rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .bc-info {
        font-size: 5vw;
      }
    }
    .block-counter-bd {
      flex-direction: column;
    }
    .block-counter-info {
      order: 3;
      margin-top:2rem;
    }
    .bc-pic {
      order: 1;
      img {
        width: 33%
      }
    }
    
    div.bc-steps {
      flex: 1;
      margin-top:1rem!important
    }
    .block-counter .bc-tit {
      font-size: 6vw;
    }
  }
  .zh {
    .switch-show .ss-hd-text .last-h1 {
      width: 86vw;
    }
  }
  .en {
    .index-wrap .switch-show .ss-hd-text {
      .p1, .p2{
        font-size: 9vw;
      }
      .p3 {
        font-size: 7vw;
      }
    }
    .spec {
      margin-top: 90px;
    }
    .index-wrap .switch-show .ss-hd-text .cont {
      width: 90%;
    }
  }
  .en {
      .switch-show .ss-bd li:nth-child(3) {
        min-width: 180px;
      }
      .switch-show .ss-bd li:nth-child(5) {
        min-width: 130px;
      }
    }
  

}
@media screen and (max-width: 900px) and (min-width: 701px) {
  .index-wrap {
    .switch-show {
      .ss-hd-number {
        width: 44%;
      }
      .ss-hd-text {
        width: 60%;
        h1 {
          font-size: 2.4rem;
        }
      }
    }
  }
}
@media screen and (max-width: 1000px) and (min-width: 701px) {
  .index-wrap {
    .twocube {
      .cube {
        padding: 1rem;
        font-size: 1.5rem;
        text-align: center;
      }
    }
  }
}
@media screen and (max-width: 1228px) and (min-width: 900px) {
  .index-wrap {
    .switch-show {
      .ss-hd-text {
        width: 55%;
        h1 {
          font-size: 3rem;
        }
      }
    }
  }
}
@media screen and (max-width: 1350px) {
  .index-wrap {
    .iiner {
      width: 80%;
    }
  }
}
@media screen and (max-width: 1380px) and (min-width: 701px) {
  .index-wrap {
  }
}
@media screen and (max-width: 1350px) and (min-width: 700px) {
  .game-coin-wrap .block-counter .bc-tit {
    font-size: 3.3vw;
  }
}
@media screen  and (min-width: 1500px){
  .index-wrap .yfangzi-info {
    .yf-text {
      h4 {
        font-size: 38px;
      }
      div {
        font-size: 36px;
      }
    }
  }
  
}







@font-face {
  font-family: "wukong1";
  src: url("../assets/style/wukong1.ttf") format("truetype");
}

//year style
.yhzs-wrap {
  position: relative;
  img {
    width: 280px;
  }
  .shake-denglong {
    position: absolute;
    top: 70px;
    z-index: 99;
    right: 10px;
    img {
      width: 120px;
    }
  }
}
.yfangzi-wrap {
font-family: "wukong1";
  position: relative;
  margin: -100px auto 0;
  width: 90%;
  .yyun {
      position: absolute;
      width: 300px;
      right: -90px;
      top: 57%;
    }
}
.yfangzi-layer {
  img {
    // width: 80%
  }
}
.yfangzi-info {
  align-items: center;
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  width: 70%;
  margin: auto;
  .yf-text {
    h4 {
      font-size: 32px;
      color:#fff;
      text-shadow: 2px 2px 2px #000;
    }
    div {
      color:#fffed9;
      font-size: 30px;
    }
    span.ych {
      color: #ffde00
    }
  }
  .yf-pic {
    // width: 160px
    position: relative;
    text-align: right;
    img {
      width: 80%
    }
    
  }
  
}
.zh .yf-text {
   white-space: nowrap;
}
.index-wrap .switch-show .pic1 {
  img {
    width: 65%
  }
}

.slider-box {
  position: relative;
  .ydenglong {
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 150px;
    }
  }
  .ytree{
    position: absolute;
    right: 0;
    bottom: 0;
    img {
      width: 150px;
    }
  }
}
.ybird {
  width: 30px;
  vertical-align: 10px
}
#tosee {
  background: #fcedd9;
  border-radius: 30px;
  color: #8f0203;
  display: inline-block;
  padding: 2px 26px;
  margin: 16px 0;;
}
.shake-denglong-pic {
  display: block;
  animation: shake 3s linear infinite;
  transform-origin: center top;
}
.en .pc {
      .switch-show .ss-bd li:nth-child(3) {
        font-size: 14px
      }
      .switch-show .ss-bd li:nth-child(5) {
        font-size: 16px
      }
       .index-wrap .switch-show .last-3 {
        font-size: 2.5rem
      }
      .index-wrap .switch-show .ss-hd-text {
        width: 50%
      }
    }
@keyframes shake {
  0% {
    transform: rotate(5deg)
  }
  10% {
    transform:rotate(10deg)
  }
  25% {
    transform:rotate(5deg)
  }
  50% {
    transform: rotate(0deg)
  }
  75% {
    transform: rotate(-5deg)
  }
  100% {
    transform: rotate(5deg)
  }
  
}


</style>
