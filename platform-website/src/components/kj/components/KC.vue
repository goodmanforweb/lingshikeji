<template>
    <div class="kc kjwrap" ref="accbox">
        <p class="highlight center tit">{{$t('ms.mypoolrecord')}}</p>
        <div class="acc-wrap flex">
          <div class="acc-cube" 
          v-for="(row,index) in tableData" :key="index"
           >
            <div class="acc-cube-wrap">
              <div class="acc-cube-inner">
                <div class="acc-hd">
                  <div class="acc-hd-icon">
                  </div>
                  <div class="acc-hd-desc center">
                    <span>{{$t("ms.kg")}}</span>
                    <div>{{row.craw}}</div>
                  </div>
                </div>
                <div class="acc-mid center">
                  <p><span>{{$t("ms.tkj")}}</span><span>{{row.uid}}</span></p>
                </div>
                <div class="acc-bd">
                  <p>{{$t('ms.jszl') + ": " + row.tamount}}</p>
                  <p>{{$t('ms.gmsj') + ": " + row.time}}</p>
                </div>
              </div>
              <div class="cube-blur"></div>
            </div>           

          </div>
        </div>
        <div class="center" v-if="tableData.length == 0">{{$t("ms.norecord")}}</div>
    </div>
</template>
<script>
const pic = require("../assets/images/d1.png");
import util from "util";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      tableData: [
        // {
        //   craw: "el.From",
        //   tamount: "el.Value / 1e4",
        //   time: "filters.format(el.CreateTime)",
        //   uid: "el.UID"
        // }
      ],
      loader: false,
      pic,
      cubeWidth: "",
      isMobile: window.innerWidth <= 700
    };
  },
  filters: {
    clip: function(str) {
      if (!str) return "";
      return (
        str.substring(0, 3) + "..." + str.substring(str.length - 6, str.length)
      );
    }
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
      this.getAccList();
    },
    clipText(id) {
      return !this.isMobile ? this.$options.filters.clip(id) : id;
    },
    getAccList() {
      this.loader = true;
      util
        .getAccList(
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
                    img: el.Img,
                    craw: el.From,
                    price: util.dropDec(el.MachinePrice, 1e4),
                    tamount: util.dropDec(el.Value, 1e4),
                    time: filters.format(el.CreateTime),
                    uid: this.clipText(el.TMID)
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
    }
  }
};
</script>
<style lang="scss" >
.kc {
  .hd-lf {
    border-right: 1px solid #2f4459;
  }
  .num {
    font-size: 2.5rem;
  }
  .ex-table {
    padding: 1rem 0;
  }
  .board-section {
    margin: 2rem 0;
    .kj-container:first-of-type {
      margin-right: 0.5rem;
    }
    .kj-container:last-of-type {
      margin-left: 0.5rem;
    }
  }
  .acc-wrap {
    // margin: 0 -1.5rem;
    flex-wrap: wrap;
  }

  .acc-cube {
    width: 33.33%;
  }
  .acc-cube-wrap {
    position: relative;
    margin: 1.3rem;
    .acc-cube-inner {
      border: 2px solid #fff;
      border-radius: 20px;
      padding: 1rem 2rem;

      box-sizing: border-box;
      position: relative;
      z-index: 12;
      overflow: hidden;
      transition: all 0.3s linear;
      background: url(../assets/images/filter.jpg) center no-repeat;
      background-size: cover;
    }
    .acc-cube-inner:hover {
      border-color: #fff;
      box-shadow: 0 0 10px 6px #c896c1;
      transform: translateY(-1px);
    }
  }
  .acc-cube-wrap .acc-cube-inner:after {
    content: "";
    position: absolute;
    top: -30px;
    right: -30px;
    z-index: 20;
    width: 50%;
    height: 48%;
    background: url(../assets/images/gz.png) center no-repeat;
    background-size: contain;
  }
  .acc-hd-desc {
    position: relative;
    z-index: 23;
  }
  .acc-hd {
    font-size: 1.25rem;
    position: relative;
  }
  .acc-hd-icon {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 38%;
    background: url(../assets/images/wm.png) center no-repeat;
    background-size: contain;
    opacity: 0.7;
  }
  .acc-hd-desc {
    padding: 1rem 0;
  }
  .acc-mid {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    span:first-child {
      font-size: 1.25rem;
      vertical-align: middle;
      padding-right: 1rem;
    }
    span:last-child {
      font-size: 0.875rem;
      vertical-align: middle;
    }
  }
  .acc-bd {
    padding: 0 1rem;
    p {
      white-space: nowrap;
    }
    p:first-child {
      color: #00f3ff;
    }
  }
}
</style>


