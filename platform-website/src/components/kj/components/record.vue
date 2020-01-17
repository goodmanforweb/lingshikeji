<template>
    <div class="kcrecord kjwrap">
        <p class="center highlight tit">{{$t('ms.kcjl')}}</p>
       
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
              <div class="cube-blur" 
              
              ></div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
const pic = require("../assets/images/d1.png");
import util from "util";
import Clock from "./clock.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      loader: false,
      isMobile: window.innerWidth <= 700,
      name: "slider-out",
      pic
    };
  },
  filters: {
    clip: function(str) {
      return (
        str.substring(0, 3) + "..." + str.substring(str.length - 6, str.length)
      );
    }
  },
  components: {
    Clock
  },
  created() {
    this.pager = 0;
    this.count = null;
    this.size = 12;
  },
  mounted() {
    this.addScrollListener();
    this.loadmore();
  },
  beforeDestroy() {
    this.removeScrollListener();
  },
  methods: {
    addScrollListener() {
      const box = (this.box = document.querySelector(".kjbd"));
      box.addEventListener("scroll", this.scrollListenerHandler, false);
    },
    scrollListenerHandler() {
      const scrollTop = util.getScrollTop(this.box);
      const marker = this.box.scrollHeight - scrollTop - this.box.clientHeight;
      if (marker <= 1) {
        console.log(34);
        this.loadmore();
      }
    },
    removeScrollListener() {
      this.box.removeEventListener("scroll", this.scrollListenerHandler, false);
    },
    loadmore() {
      if (this.loader) return;
      if (this.count) {
        if (this.pager * this.size >= this.count) {
          return false;
        }
      }
      this.pager++;
      this.getMachine();
    },
    clipText(id) {
      return !this.isMobile ? this.$options.filters.clip(id) : id;
    },
    getMachine() {
      this.loader = true;
      util
        .getMachine(
          { params: { size: this.size, offset: (this.pager - 1) * this.size } },
          {},
          this
        )
        .then(res => {
          if (res.data.code == 0) {
            const dataArr = res.data.list;
            const filters = this.$root.$options.filters;
            this.count = res.data.count;
            Array.isArray(dataArr) &&
              (this.tableData = this.tableData.concat(
                dataArr.map(el => {
                  return {
                    UID: this.clipText(el.ID),
                    img: el.Img,
                    kj: el.Name,
                    counter: util.dropDec(el.Productivity, 1e4),
                    tprofit: util.dropDec(el.OriginReserves, 1e4),
                    cprofit: util.dropDec(el.HistoryMined, 1e4),
                    clocktime: this.calcTime(
                      (el.MineDuration * el.Reserves) / el.Productivity,
                      "dft"
                    ),
                    circler: Math.ceil(
                      (1 - el.Reserves / el.OriginReserves) * 60
                    ),
                    progresser: 10 - (el.Mines / el.MaxMines).toFixed(2) * 10
                  };
                })
              ));
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.loader = false;
        });
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
  watch: {}
};
</script>

<style lang="scss">
.kcrecord {
  .kc-table {
    padding: 1rem 0;
  }
}
</style>


