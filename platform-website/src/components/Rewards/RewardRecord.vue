<template>
  <div class="rewardrecord-wrap flex" v-loading='wateringLoader'>
    <div class="ptext">
      {{$route.query.name || 'cjoy'}}
    </div>
    <section class="flex">
      <WeekPicker @change="wpChange"  :startOfTime="startOfTime" class="flex1 wp"/>
      <div class="flex1" v-if="isMobile"></div>
    </section>
     <section class="flex chartsection">
      <div class="card red-zls flex1">
        <span><i class="icon water"></i>{{$t("ms.totalwater")}}</span>
        <p class="red-num">{{(water.water.water + water.water.waterofcommunity) |currency}} {{$t("ms.chip")}}</p>
        <div class="red-cv circle-block flex ">
          <div class="flex1 chart-sec">
            <canvas ref="circle" width="500" height="500"></canvas>
          </div>
          <div class="flex1 circle-chart-info">
            <span class="cv-tit cv-tit1" >{{$t("ms.hubwater")}}</span>
            <p>{{water.water.waterofcommunity |currency}} {{$t("ms.chip")}}</p>
            <span class="cv-tit cv-tit2">{{$t("ms.mytotalwater")}}</span>
            <p>{{(water.water.water)  | currency }} {{$t("ms.chip")}}</p>
          </div>
        </div>
      </div>
      <div class="card red-bzwk flex1">
        <span><i class="icon wk"></i>{{$t("ms.timewk")}}</span>
        <p class="red-num">{{water.water.mint | currency}} {{$t("ms.chip")}}</p>
        <div class="red-cv water-block flex">
          <div class="flex1 water chart-sec">
            <canvas ref="water" width="500" height="500"></canvas>
            <canvas class="waterDecro" ref="waterDecro" width="500" height="500"></canvas>
          </div>
          <div class="flex1 water-chart-info">
            <span>{{$t("ms.mywakuanglevel")}}</span>
            <p>{{water.water.level || 0}}%</p>
          </div>
        </div>
        <p class="red-cv-hint">{{$t("ms.wkhint")}}</p>
      </div>
    </section>
    <div class="card last-cart">
      
      <el-table
        :data="tableData"
        v-loading="waterLoader"
        v-loadmore="loadMore"
        @cell-click="handleUserWater"
        max-height="500"
        style="width: 100%">
        <el-table-column
          prop="user"
          :label="$t('ms.user') | capitalize"
          >
          <span class="user_name" slot-scope="scope" :title="scope.row.ruser">{{scope.row.user}}</span>
        </el-table-column>
        <el-table-column
          prop="water"
          :label="$t('ms.liushui') | capitalize"
          >
        </el-table-column>
        <el-table-column
          prop="level"
          :label="$t('ms.bopo')">
        </el-table-column>
        <el-table-column
          prop="bonus"
          :label="$t('ms.reward')">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import util from "../../util/util";
import { mapActions, mapGetters } from "vuex";
import circle from "./circle";
import Water from "./water";
import WeekPicker from "./WeekPicker";

export default {
  name: "RewardsRecord",
  components: {
    WeekPicker
  },
  data() {
    return {
      isMobile: window.innerWidth > 700,
      tableData: [],
      wateringLoader: false,
      waterLoader: false,
      startOfTime: null,
      breadList: []
    };
  },
  created() {
    this.resetBread();
    this.pager = 0;
    this.count = null;
    this.size = Math.ceil(500 / 48);
    // this.size  = 3;

    const gameid = (this.gameid = this.$route.query.id);

    this.week = null;
    this.user_id = null;
    // this.user_id = 'U_1037678547512475648';
    this.clearTable = true;

    this.getWater({
      ctx: this,
      params: { gameid }
    });

    this.loadMore();
  },
  filters: {
    clip: function(str) {
      return (
        str.substring(0, 8) + "..." + str.substring(str.length - 6, str.length)
      );
    }
  },
  mounted() {},
  beforeDestroy() {
    this.waterball && this.waterball.destroy();
  },
  computed: {
    ...mapGetters(["waterLists", "water", "login"])
  },
  methods: {
    ...mapActions(["getWaterLists", "getWater"]),
    switchTable(e, index) {
      this.user_id = e.user_id;
      this.breadList = this.breadList.slice(0, index + 1);
      this.resetFetchInfo();
      this.loadMore();
    },
    wpChange(e) {
      this.wateringLoader = true;
      this.getWater({
        ctx: this,
        params: { gameid: this.gameid, week: e.totalweeks - 1 }
      }).finally(() => {
        this.wateringLoader = false;
      });

      this.week = e.totalweeks - 1;
      this.resetBread();
      this.resetFetchInfo();
      this.user_id = null;
      this.loadMore();
    },
    resetBread() {
      this.breadList = [
        {
          user_id: this.login.user.id,
          user_name: this.login.user.username
        }
      ];
    },
    resetFetchInfo() {
      this.clearTable = true;
      this.pager = 0;
      this.count = null;
      this.waterLoader = false;
    },
    handleUserWater(e, t) {
      if (t.property != "user") return false;

      this.user_id = e.ruserid;
      this.user_name = e.ruser;
      this.breadList.push({
        user_id: e.ruserid,
        user_name: e.ruser
      });
      this.resetFetchInfo();
      this.loadMore();
    },
    loadMore() {
      if (this.waterLoader) return;
      if (this.count) {
        if (this.pager * this.size >= this.count) {
          return false;
        }
      }
      this.pager++;
      this.fetchWaterLists();
    },
    fetchWaterLists() {
      this.waterLoader = true;
      let params = {
        gameid: this.gameid,
        size: this.size,
        offset: (this.pager - 1) * this.size
      };
      this.week != null && (params.week = this.week);
      this.user_id != null && (params.user_id = this.user_id);

      this.getWaterLists({
        ctx: this,
        params
      })
        .then(data => {
          this.count = data.total;
          let filters = this.$root.$options.filters;
          let result = [];
          if (Array.isArray(data.list)) {
            let t = data.decimals;
            result = data.list.map(el => {
              return {
                ruser: el.user_name || el.user,
                user: el.user_name || filters.clip(el.user),
                ruserid: el.user,
                water: filters.currency(
                  util.fromHex(el.water, t) +
                    util.fromHex(el.waterofcommunity, t)
                ),
                bonus: filters.currency(util.fromHex(el.mint, t)),
                level: Number(el.level)
              };
            });
          }
          
          this.tableData = this.clearTable
            ? result
            : this.tableData.concat(result);
          this.clearTable && (this.clearTable = false);
        })
        .finally(() => {
          this.waterLoader = false;
        });
    },
    showChart() {
      const hubwater = this.water.water.waterofcommunity;
      const water = this.water.water.water;
      const rate = Number((water / (hubwater + water)).toFixed(2));
      if (!this.circleChartInstance) {
        this.circleChartInstance = new circle(
          this.$refs.circle,
          isNaN(rate) ? Math.PI : 2 * Math.PI * rate
        );
      } else {
        this.circleChartInstance.rerender(
          isNaN(rate) ? Math.PI : 2 * Math.PI * rate
        );
      }
      if (!this.waterball) {
        this.waterball = new Water(
          this.$refs.water,
          isNaN(this.water.water.level) ?  0 : this.water.water.level,
          this.$refs.waterDecro
        );
      } else {
        this.waterball.rerender(isNaN(this.water.water.level) ?  0 : this.water.water.level,);
      }
    }
  },
  watch: {
    water: {
      deep: true,
      handler: function(n, o) {
        this.startOfTime = n.startOfTime;
        this.showChart();
      }
    }
  }
};
</script>

<style lang="scss">
.rewardrecord-wrap {
  .ptext {
    font-size: 2.5rem;
    font-weight: bolder;
    font-family: "pingfang";
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }
  flex-direction: column;
  .bread {
    padding: 2rem 0;
    span {
      cursor: pointer;
    }
  }
  .last-card {
    padding-top: 18px;
    .user_name {
      cursor: pointer;
    }
  }
  .icon {
    background-color: #000;
    vertical-align: -8px;
    margin-right: 0.6rem;
    background-size: 50% auto;
    background-position: center;
  }
  .water {
    background-image: url(../../assets/images/water.png);
  }
  .wk {
    background-image: url(../../assets/images/wk.png);
  }
  .wp {
    margin-right: 2rem;
  }
  .red-zls {
    margin-right: 1rem;
  }
  .red-bzwk {
    margin-left: 1rem;
  }
  .card .red-num {
    text-indent: 3rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
  > section {
    margin-bottom: 2rem;
  }
  .red-hd {
  }
  .red-hd-tit {
    position: relative;
    color: #2fbffb;
    display: inline-block;
    height: 2.5rem;
    cursor: pointer;
  }
  .red-hd-tit::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    content: "";
    margin-left: -12px;
    display: block;
    width: 25px;
    height: 4px;
    background-color: #2fbffb;
  }

  .el-table::before {
    top: 0;
    bottom: auto;
  }
  .red-cv {
    border-top: 1px solid #e5e5e5;
    padding-top: 2rem;
    canvas {
      width: 100%;
    }
    .water {
      position: relative;
      .waterDecro {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: transparent;
      }
    }
    .circle-chart-info {
      padding-left: 2rem;
    }
    .water-chart-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        font-weight: bold;
        font-size: 2rem;
      }
    }
  }
  .circle-block {
    padding-top: 4rem;
  }
  .water-block {
  }
  .cv-tit {
    position: relative;
  }
  .cv-tit:before {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: -25px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #dff6ff;
  }
  .cv-tit2:before {
    background-color: #32c0fb;
  }
}

@media screen and (max-width: 704px) {
  .rewardrecord-wrap {
    .ptext {
      font-size: 1.6rem;
      padding-left: 1rem;
    }
    .el-input-group__prepend,
    .el-input__inner,
    .el-input-group__append {
      border: none;
    }
    .wp {
      margin-right: 0;
    }
    section {
      margin-bottom: 0;
    }
    > div.card {
      margin-bottom: 10px;
      padding: 0;
    }
    .chartsection {
      flex-direction: column;
    }
    .red-hd {
      color: #333;
      padding-top: 1.5rem;
      padding-left: 18px;
      padding-bottom: 0;
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      .red-hd-tit {
      }
      .red-hd-info {
        padding-right: 1rem;
      }
    }
    .red-hd-tit::after {
      // width: 100px;
      // bottom: -20px;
      // left: -18px;
      // background-color: #333;
    }
    section {
      border-top: 7px solid #f7f7f7;
      border-bottom: 7px solid #f7f7f7;
    }
    .circle-chart-info {
      text-align: center;
      margin-top: 1.7rem;
    }
    .water-chart-info {
      margin-top: 1.7rem;
      p {
        font-size: 33px;
        margin: 10px;
      }
    }
    .red-cv {
      > .chart-sec {
        width: 80%;
        display: block;
        margin: 0 auto;
      }
    }
    .red-cv-hint {
      text-align: center;
    }
    .red-zls {
      margin-right: 0;
    }
    .red-bzwk {
      margin-left: 0;
    }
    .red-cv {
      border-top: none;
      padding-top: 0;
    }
    .red-num {
      text-align: center;
    }
  }
}
</style>


