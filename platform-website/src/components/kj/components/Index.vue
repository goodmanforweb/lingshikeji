<template>
  <div class="index">
      <section class="i1 i">
          <div class="i-pics flex">
            <div class="stone center">
                <img src="../assets/images/fire1.png" alt="">
            </div>
            <div class="show-text">
                <div class="st">
                  <div class="numbt">{{$t("ms.kjzsy")}}</div>
                  <div  class="numb numb1">{{(pool.TotalBalance + pool.weekBalance)  | currency }} <span class="xunit">SUC</span></div>
                </div>
               <div class="st">
                  <div class="numbt">{{$t("ms.bzkjsy")}}</div>
                  <div class="numb numb2">{{pool.weekBalance | currency }} <span class="xunit">SUC</span></div>
               </div>
            </div>
          </div>
      </section>
      <section class="i4 i">
         <div class="i-btns center">
              <router-link  class="btnwp" to="/kj/mall">
                <el-button class="btnw" type="danger" round>{{$t("ms.gmkj")}} <img class="uparrow" src="../assets/images/uparrow.png" alt=""></el-button>
              </router-link> 
              <el-button class="btng btnwp" type="primary" round @click="showPoster">{{$t("ms.yqhy")}}</el-button>
          
          </div>
      </section>
      <section class="i3 i flex">
          <Kjbox class="acc-time">
              <span class="highlight pd pot">{{$t('ms.jstimes')}}</span>
              <div class="a-hd">
                  <div class="circle">
                     +{{accTimes}}
                    </div>
                    <p class="slmj center">
                      <img src="../assets/images/bumble.png" alt=""> 
                      <span><router-link to="/kj/slmj">{{$t('ms.slmj')}}</router-link> </span></p>
              </div>
              <router-link to="/kj/pool">
              <el-button  class="a-btn" round>{{$t('ms.cksq')}}</el-button>
              </router-link>
          </Kjbox>
          <Exchange />
      </section>
      <section class="i5 i">
         <div class="kc-hd flex">
            <span class="highlight pot">{{$t("ms.mypool")}}</span>
            <span><router-link to="/kj/record">{{$t("ms.checkrecord")}}</router-link></span>
        </div>
        <div class="i5-wrap flex" ref="poolcubewrap">
          
          <div class="pool-cube" v-for="(row,index) in tableData" :key="index" >
            <div class="pool-cube-wrap">
             <div class="pool-cube-inner">
                <div class="pc-hd flex">
                <div class="kj-icon-box">
                  <img class="kj-icon-img" :src="row.img || pic" alt="">
                </div>
                <div class="kj-desc">
                  <div class="kj-name" :title="row.UID">{{$t('ms.kj') + ": "}}{{row.UID}}</div>
                  <div class="kj-type">{{$t('ms.kjtype') + ': ' + row.kj}}</div>
                  <div class="kj-power">{{$t('ms.mrsl')}}: {{row.counter}}</div>
                  </div>
              </div>
              <div class="pc-mid">
                <p>{{$t('ms.mbkjsy') + ": " + row.tprofit}}</p>
                <p>{{$t('ms.dqkjsy')+ ": " + row.cprofit}}</p>
              </div>
              <div class="pc-bd">
                <Clock :time="row.clocktime" :activeTime="row.circler"/>
              </div>
             </div>
              <div class="cube-blur" ></div>
            </div>
          </div>
        </div>
      </section>
      <Poster :posterVisible="posterVisible" :posterText="posterText" @posterClose='posterVisible=false'></Poster>
  </div>
</template>

<script>
const pic = require("../assets/images/d1.png");
import Exchange from "./Exchange";
import Clock from "./clock.vue";
import util from "util";
import { mapGetters, mapActions } from "vuex";
import Poster from "../../widget/poster/index";

export default {
  data() {
    return {
      pic,
      tableData: [
        {
          kj: "中型矿机",
          counter: "1000",
          tprofit: "1000",
          cprofit: "10000",
          resttime: this.calcTime(3600),
          reducetime: "2H",
          progresser: "1%"
        },
        {
          kj: "中型矿机",
          counter: "1000",
          tprofit: "1000",
          cprofit: "10000",
          resttime: "103D 11H 58MIN 累计减少：2H"
        },
        {
          kj: "中型矿机",
          counter: "1000",
          tprofit: "1000",
          cprofit: "10000",
          resttime: "103D 11H 58MIN 累计减少：2H"
        }
      ],
      accTimes: 0,
      isMobile: window.innerWidth <= 700,
      fixed: false,
      posterVisible: false,
      posterText: ""
    };
  },
  components: {
    Exchange,
    Poster,
    Clock
  },
  filters: {
    clip: function(str) {
      return (
        str.substring(0, 3) + "..." + str.substring(str.length - 6, str.length)
      );
    }
  },
  created() {
    this.setTable(this.pool);

    this.getAccList();
    this.tickerIsFetching = false;
    this.createTicker();
  },
  computed: {
    ...mapGetters(["login", "pool"])
  },
  beforeDestroy() {
    this.ticker && clearInterval(this.ticker);
  },
  methods: {
    ...mapActions(["getPool"]),
    createTicker() {
      console.log(44);
      this.ticker = setInterval(() => {
        if (this.tickerIsFetching) return false;
        this.tickerIsFetching = true;
        this.getPool({ ctx: this }).finally(() => {
          this.tickerIsFetching = false;
        });
      }, 1000 * 60);
    },
    stopTicker() {
      if (
        !this.pool.Machines ||
        (Array.isArray(this.pool.Machines) && this.pool.Machines.length == 0)
      ) {
        this.ticker && clearInterval(this.ticker);
      }
    },
    showPoster() {
      this.posterVisible = true;
      this.posterText = this.login.user.invitecode;
    },
    clipText(id) {
      return !this.isMobile ? this.$options.filters.clip(id) : id;
    },
    setTable(n) {
      if (n && Array.isArray(n.Machines)) {
        this.tableData = n.Machines.map(el => {
          return {
            UID: this.clipText(el.ID),
            img: el.Img,
            kj: el.Name,
            counter: util.dropDec(el.Productivity, 1e4),
            tprofit: util.dropDec(el.OriginReserves, 1e4),
            cprofit: util.dropDec(el.HistoryMined, 1e4),
            clocktime: this.calcTime(
              Math.floor((el.MineDuration * el.Reserves) / el.Productivity),
              "dft"
            ),
            circler: Math.ceil((1 - el.Reserves / el.OriginReserves) * 60),
            // circler: Math.ceil((el.Mines / el.MaxMines) * 60),
            progresser: 10 - (el.Mines / el.MaxMines).toFixed(2) * 10
          };
        });
      } else {
        this.tableData = [];
      }
    },
    getAccList() {
      util
        .getAccList({ params: { size: 12, offset: 0 } }, {}, this)
        .then(res => {
          if (res.data.code == 0) {
            this.accTimes = res.data.count;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {});
    },
    calcTime(time, type) {
      // if (time == 0) return 0;
      let h, m, s, t, k;
      k = 60 * 60;
      h = Math.floor(time / k);
      m = Math.floor((time % k) / 60);
      s = Math.floor((time % k) % 60);

      const config = {
        zh: () => {
          h = `${h}小时`;
          m = `${m}分`;
          s = `${s}秒`;
        },
        en: () => {
          h = `${h}H`;
          m = `${m}M`;
          s = `${s}S`;
        },
        dft: () => {
          h = (h + "").length < 2 ? "0" + h : h;
          m = (m + "").length < 2 ? "0" + m : m;
          s = (s + "").length < 2 ? "0" + s : s;
        }
      }[type || this.$i18n.locale]();
      return type ? `${h}:${m}:${s}` : `${h} ${m} ${s}`;
    }
  },
  watch: {
    pool(n) {
      this.setTable(n);
      this.stopTicker();
    }
  }
};
</script>

<style lang="scss">
.kc-table {
  .el-button {
    background-color: transparent;
    color: #fff;
  }
  .el-button:hover {
    color: #00f3ff;
  }
  .progress {
    height: 8px;
    background-color: #273542;
    border-radius: 4px;
    overflow: hidden;
    .p-cater {
      height: 100%;
      border-radius: inherit;
      background-color: #01e5f0;
      width: 50%;
      display: block;
      transition: width 0.3s linear;
    }
  }
  .ar {
    text-align: right;
  }
}
.kj-icon {
  width: 24px;
}
.i2 {
  .kj-icon {
    width: 24px;
  }
}
.index {
  overflow: hidden;
  // position: relative;
  // z-index: 60;
  .i {
    margin-bottom: 1rem;
  }
  .i2,
  .i3 {
    margin: 1rem;
  }
  .i2,
  .i3,
  .i4,
  .i5 {
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }
  .i-pics {
    overflow: hidden;
    position: relative;
    max-width: 1200px;
    margin: 2rem auto;
    align-items: center;
    .stone {
      flex: 1.5;
      animation: updown 2s ease-in-out infinite;
      img {
        max-width: 100%;
      }
    }
    .show-text {
      flex: 1;
      font-size: 2rem;
      padding-top: 3rem;
      .numbt {
        font-size: 1em;
        padding-bottom: 1rem;
      }
      .numb {
        color: #00f3ff;
        font-size: 1.5em;
        .xunit {
          font-size: 0.8rem;
          color: #fff;
        }
      }
      .numb1 {
        margin-bottom: 4rem;
      }
    }
  }
  .i-btns {
    margin: 4rem 0;
    button {
      width: 25%;
      padding: 20px 0;
      border-radius: 50px;
      font-size: 1.5rem;
      margin: 0 2rem;
      border: none;
    }
  }
  .uparrow {
    display: inline-block;
    width: 15px;
    transition: all 0.3s linear;
    animation: updown 0.5s linear infinite;
  }
  .kc-hd {
    justify-content: space-between;
    margin: 0.8rem 0 1.2rem;
  }
  .acc-time {
    flex: 1;
    margin-right: 1rem;
  }

  .circle {
    color: #00b5ff;
    text-align: center;
    font-size: 4.4rem;
    margin: 3rem 0;
    color: #02abf5;
    font-weight: bolder;
  }
  .slmj {
    img {
      vertical-align: middle;
      width: 30px;
      padding-right: 10px;
    }
    span {
      vertical-align: middle;
      a {
        font-size: 1.2rem;
      }
    }
  }
  .i3 {
    .acc-time {
      padding-bottom: 1rem;
      .a-btn {
        width: 262px;
        height: 50px;
        font-size: 1.5rem;
        border-radius: 30px;
        display: block;
        margin: 0 auto;
        color: #0faff6;
        border-color: #0faff6 !important;
        background-color: transparent;
      }
      .a-btn:hover {
        background-color: #0faff6;
        border-color: #0faff6;
        color: #fff;
      }
    }
  }
}
@keyframes updown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  90% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

