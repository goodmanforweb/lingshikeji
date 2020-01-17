<template>
<page title="控制台" borderLine padding leftBtn='menu'>
  <div class="dash">
    <div class="x-hd m16" v-if="!isMobile">
      <span class="f26 tcolor fw">控制台</span>
    </div>
    <div class="dash-bd ">
      <div class="dash-tabs">
        <ul class="flex">
          <li class="flex1 transi re tab-cube tcolor cp" 
          @click="tabHandle(tab, index)" :class="{active: tab.active}" v-for="(tab, index) in tabs" :key="index">
            <div class="tab-hd f12">{{tab.text}}</div>
            <div class="tab-bd f14 towrap">
              {{tab.num}}
            </div>
            <span class="tab-icon"><img :src="tab.icon" alt=""></span>
          </li>
        </ul>
      </div>
      <div class="dash-charts block m16">
        <div class="dc-hd noshadow dc-left-line flex sb vc re">
          <div class="dch-text tcolor">
            <span>用户总量7天趋势</span>
          </div>
          <XXRadio class="xx-radios flex"  :texts="radioTexts" v-model="radioValue"></XXRadio>
        </div>
        <div class="dc-bd flex fv">
          <div class="dcb-chart flex1" ref='container'>

          </div>
          <div class="dcb-info center flex v sb fh" :class="{vc: isMobile}">
            <div class="dcb-row m20">
              <span class="gcolor">昨日</span>
              <div class="f16 tcolor fw">1298</div>
            </div>
            <div class="dcb-row m20">
              <span class="gcolor">今日</span>
              <div class="f16 tcolor fw">1298</div>
            </div>
            <div class="dcb-row m20">
              <div class="n-btn btn-tcolor btn-panel-sure" @click="checkReport">查看报表</div>
            </div>
          </div>
        </div>
      </div>

      <div class="dash-ft flex fv">
        <div class="df-left block"  :class="{mb16: isMobile}">
          <div class="dc-hd dc-left-line flex sb vc re">
            <span class="dch-text tcolor">工作台</span>
          </div>
          <ul class="df-bd flex tcolor">
            <li class="center flex1 block">
              <span >上线项目</span>
              <div class="f20 fw">5</div>
            </li>
            <li class="center flex1 block">
              <span >在售矿机</span>
              <div class="f20 fw">5</div>
            </li>
            <li class="center flex1 block">
              <span >待审核提现</span>
              <div class="f20 fw">5</div>
            </li>
          </ul>
        </div>
        <div class="df-right block">
          <div class="dc-hd dc-left-line flex sb vc re">
            <span class="dch-text tcolor"> 超额提醒</span>
          </div>
          <div class="df-bd">
            <table>
              <tr>
                <td class="tcolor">本日</td>
                <td>
                  <span class="tcolor fw">10000000000</span>
                  <span class="gcolor f14">CJT</span>
                </td>
                <td>
                  <span class="tcolor fw">10000000000</span>
                  <span class="gcolor f14">CJS</span>
                </td>
              </tr>
              <tr>
                <td class="tcolor">本周</td>
                <td>
                  <span class="tcolor fw">10000000000</span>
                  <span class="gcolor f14">CJT</span>
                </td>
                <td>
                  <span class="tcolor fw">10000000000</span>
                  <span class="gcolor f14">CJS</span>
                </td>
              </tr>
              <tr>
                <td class="tcolor">本月</td>
                <td>
                  <span class="tcolor fw">10000000000</span>
                  <span class="gcolor f14">CJT</span>
                </td>
                <td>
                  <span class="tcolor fw">10000000000</span>
                  <span class="gcolor f14">CJS</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <RightPanel :show.sync="panelShow"  :fullScreen="true" class="dashPanel" >
        <component   :panelData='panelData'  :is="panel" @upate:show='panelShow=false'/>
        <!-- <router-view></router-view> -->
    </RightPanel>
  </div>
</page>
</template>

<script>
import UserPanel from './userpanel'
import Line from './line';
import Bar from './bar';
import StackBar from './stackbar';
export default {
  components: {
    UserPanel
  },
  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    }
  },
  data () {
    return {
      panel: UserPanel,
      panelData: {},
      panelShow: false,
      tabs: [
        {
          text:'用户总数',
          num: '100000000',
          icon:'',
          active: true
        },
        {
          text:'CJS换购量',
          num: '100000000',
          icon:'',
          active: 0
        },
        {
          text:'CJS平台/用户持有',
          num: '100000000/1000000',
          icon:'',
          active: 0
        },
        {
          text:'CJT释放量',
          num: '100000000',
          icon:'',
          active: 0
        },
        {
          text:'CJT提现量',
          num: '100000000',
          icon:'',
          active: 0
        },
        {
          text:'CJS提现量',
          num: '100000000',
          icon:'',
          active: 0
        },
        {
          text:'平台账户提现余额',
          num: '100000000',
          icon:'',
          active: 0
        }
      ],
      radioValue:'',
      radioTexts: ['3天','15天','30天']
    };
  },
  mounted() {
    setTimeout(() => {
      // this.createLine();
      // this.createBar();
      this.createStackBar();
    }, 300) 
  },
  methods: {
    createLine() {
      this.chart = Line(this.$refs.container, {barWidth: this.isMobile ? 13 : 30});
    },
    createBar() {
      this.chart = Bar(this.$refs.container, {barWidth: this.isMobile ? 13 : 30});
    },
    createStackBar() {
      this.chart = StackBar(this.$refs.container, {barWidth: this.isMobile ? 13 : 30});
    },
    tabHandle(tab, idx) {

      this.tabs.forEach((el, index) => {
        el.active = index == idx;
      });
      let panelConfig = ['Line','Bar','StackBar'][idx];
      this.chart && this.chart.dispose();
      panelConfig && this[`create${panelConfig}`]();
      
      
      
      
      // this.$router.push('/dash/userpanel');
      
    },
    checkReport() {
      if(this.isMobile) {
        return this.$router.push('/userpanel');
      }
      this.panelShow = true;
      this.panelData = tab;
    },
    radioHandle(tab, idx) {
      this.radios.forEach((el, index) => {
        el.active = index == idx;
      })
    }
  }
}

</script>
<style lang='scss'>
.pc {
  .dcb-chart {
    box-shadow: inset 0px 8px 25px 0px rgba(25,101,147,0.1);
  }
  .noshadow {
    box-shadow:none;
  }
  .dcb-info {
    width: 200px;
    flex-shrink: 0;
    background: #fff;
  }
  .dcb-row {
    // margin: 8px 0;
  }
  .df-left {
    flex: 1.5;
    margin-right: 8px;
  }
  .df-right {
    flex: 1;
    margin-left: 8px;
  }
}
.tab-cube {
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  margin: 4px;
  height:110px;

  box-sizing: border-box;
  opacity: .8;
  overflow: hidden;
}
.tab-cube:first-of-type {
  margin-left: 0
}
.tab-cube.active {
  opacity: 1;
}
.tab-cube.active:after {
  content:'';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 2px;
  background: #086599;
}
.mobile {
  .dash-tabs {
    overflow-y: auto;
  }
  .tab-cube {
    flex-shrink: 0;
    min-width: 134px;
    height: 86px;
  }
}
.dc-hd {
  height: 60px;
  padding-left: 16px;
  box-shadow:0px 8px 25px 0px rgba(25,101,147,0.1);
}

.dc-left-line:after {
  content:'';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #086599;
  border-radius: 1px;
}
.xx-radios {
  li {
    color: #8E9FA9;
    border: 1px solid #8E9FA9;
    border-radius: 4px;
    background: #fff;
    height: 38px;
    line-height: 38px;
    padding: 0 16px;
    margin: 0 8px;
    text-align: center;
  }
  li.active {
    color: #086599;
    border: 1px solid #086599
  }
}
.mobile {
  .xx-radios {
    li {
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      padding: 0 6px;
      margin: 0 4px;
    }
  }
  .dcb-chart {
    min-height: 400px
  }
  .dcb-info {
    padding: 0 10px;
  }
  .dc-hd {
    height: 53px;
  }

}
.df-bd {
  li {
    margin: 16px 16px 16px 0;
    padding: 20px 0;
  }
  li:first-child {
    margin-left: 16px;
  }
}
.df-bd {
  table {
    width: 100%;
    tr td:first-child{
      width: 20%;
      text-align: center;
      white-space: nowrap;
    }
    tr td {
      // width: 30%;
      line-height: 35px;
    }
  }
}
</style>