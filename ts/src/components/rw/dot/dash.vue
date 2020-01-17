<!--  -->
<template>
<Page :title="$t('m.hydash')" borderLine padding :routerBack='`/dotrw/${id}`'>
    <span class="tcolor f12" slot="layer-right-btn" @click="$router.push({name: 'dashdetail', params: {id}})">{{$t('m.hydetail')}}</span>
    <div class="hy-dash m20 fws-dash">
        <div class="m-dash-hd" :class="{'block center mb16': isMobile}">
            <div class=" f12 gcolor" :class="{center: isMobile, right: !isMobile}">
                {{$t('m.hyyxqsy')}}
            </div>
            <div class="clearfix" :class="{'borderLine pd10 mb16': isMobile}">
                <ul class="m16 tcolor flex vc hc hy-countdown" :class="{fr: !isMobile}">
                    <template v-for="(value, key, index) in cd" >
                        <li class="center" :key="key">
                            <div class="fw f18">{{value | makeUp}}</div>
                            <div class="f12">{{key | uppercase}}</div>
                        </li>
                        <i :key="index" v-if="Object.keys(cd).length > index + 1" >:</i>
                    </template>
                </ul>
            </div>
            <div class="tcolor mb6 f14" v-if="isShowSJBtn">
                <i class='el-icon-warning sigh-icon-tcolor'></i> 
                {{$t('m.tdxyijib')}}
            </div>
            <div class="tcolor f14" v-if="isMobile">
                    <template v-if="isShowSJBtn">
                        {{$t('m.tdxyijib')}}<div   class="n-btn btn-redcolor f14" @click="panelHandle('HYSJ')">{{$t('m.sjqy')}}</div>
                    </template >
                    <span v-else class='f12 gcolor'>
                        {{$t('m.ndqshi') + ($i18n.locale == 'zh' ? data.name : data.name_en)}}
                    </span>
            </div>
        </div>
    
        <div class="hy-dash-bd " :class="{'flex': !isMobile}">
            <DashDetail  @panelHandle="panelHandle" v-if="!isMobile" />

            <div class="hy-center block " :class="{'ml16 mr16':!isMobile, mb16: isMobile}">

                <div class="flex sb vc f14 gcolor">
                    <span>{{$t('m.syhj')}}</span>
                    <!-- <span class="cp" @click="panelHandle('SYCalcer')"> <i class="calc-icon va "></i> <i class="va">{{$t('m.syjsq')}}</i></span> -->

                    
                </div>
                <div class="tcolor m10 fw">
                    USD <span class="f40">{{data.history_earnings[0]}}</span> <span class="f12">.{{data.history_earnings[1]}}</span>
                </div>
                <div class="f12 lcolor borderLine pd16 mb16">+{{yushangzhou}}%（{{$t('m.yszhou')}}）</div>


                <div class="line-chart chart" ref="lineChart" :style="!isMobile ? 'width: 358px': ''">
                   
                </div>

                <div v-if="!isMobile" class="f14 gcolor flex sb borderLine pd16 mb16">
                    <span>{{$t('m.newsyjl')}}</span>
                    <span class="cp" @click="panelHandle('HYSYRecord')">{{$t('m.checkall')}}</span>
                </div>
                <router-link  to="hysyjl" v-else class="f14 gcolor flex sb borderTopLine pt16">
                    <span>{{$t('m.checksy')}}</span>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
                <!-- <NoRecord v-if="profits.length == 0"/> -->
                <NoRecord style="minWidth:100%;" iconwidth="60" :hasicon="true" :text="$t('m.zshimeiyoujl')" class="flex hc vc v" v-if="profits.length == 0 && !isMobile"/>

                <table v-if="!isMobile" class="tcolor f14 latest-record" style="width: 100%;">
                    <tr v-for="(profit, index) in profits" :key='index'>
                        <td>{{profit.node}}</td>
                        <td class="center">{{profit.type[$i18n.locale]}}</td>
                        <td class="right">
                            <div>
                                <span class="f14 fw">{{profit.profit}}</span>
                                <i>USD</i>
                            </div>
                            <span class="gcolor">{{profit.date}}</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="hy-right">
                <div class="block mb16">
                    <div class="flex sb f18 tcolor vc">
                        <span>{{$t('m.syzc')}}</span>
                        <span class="record-icon cp" @click="panelHandle('TXRecord')"></span>
                    </div>
                    <div class="hy-profit flex " :class="{v:isMobile}">
                        <div class='hp-info'>
                            <div class="hp-info-row flex m20">
                                <div class="circle-chart chart mr10">
                                    <img src="../../../assets/images/circle1.png" alt="">
                                </div>
                                <div class="circle-info tcolor">
                                    <div class="f12 mb6">{{$t('m.synlkzc')}}</div>
                                    <div class="towrap">
                                        <span>  <i class="f14 fw ">{{canzhuanchu}}</i>  <i class="f12">USD</i> </span>
                                        <br>
                                        <span class="n-btn btn-tcolor-border f12" @click="tixianhandle">{{$t('m.zchu')}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="hp-info-row flex m20" style="marginTop: 40px">
                                <div class="circle-chart chart mr10">
                                     <img src="../../../assets/images/circle2.png" alt="">
                                </div>
                                <div class="circle-info tcolor">
                                    <div class="f12 mb6"> {{$t('m.dnlzchu')}}</div>
                                    <div class="mb6 towrap">
                                        <span>  <i class="f14 fw">{{needzhuanchu}}</i>  <i class="f12">USD</i> </span>
                                        <br>
                                        <span class="n-btn btn-tcolor-border f12" @click="panelHandle('CPower')">{{$t('m.nlcz')}}</span>
                                    </div>
                                    <span class="gcolor f12">{{$t('m.cznlallzchu',{num: needzhuanchu})}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="hp-chart  pieChart flex1" ref='pieChart'></div>
                    </div>
                    <div class="hy-power">
                         <div class="clearfix hp-pk">
                            <span class=" transi hp-left fl" :style="`width:${g.you}%`"></span>
                            <span class="transi hp-right fr" :style="`width:${g.sum}%`"></span>
                        </div>
                        <div class="flex sb vc">
                            <div>
                                <div class="f12 gcolor">{{$t('m.nlsyu')}}</div>
                                <span class="redcolor f14 fw">{{data.gas | fix(4)}}</span>
                            </div>
                        
                            <div>
                                <div class="f12 gcolor">{{$t('m.yynl')}}</div>
                                <span class="tcolor f14 fw">{{hasSumGas}}</span>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

                <div class="block" v-if="!data.trial">
                    <div class="tcolor f18 fw center mb16 vc">
                        {{$t('m.hyfuxx')}}
                        <span class="record-icon fr cp" @click="panelHandle('GZLZM')"></span>
                    </div>
                    <div>
                        <div class="flex">
                            <div class="flex1 center borderRightLine">
                                <span class="f12 gcolor">{{$t('m.ddfls')}}(USD)</span>
                                <div class="tcolor fw f28">
                                    {{data.total_water[0]}} <i class="f12">.{{data.total_water[1]}}</i>
                                </div>
                            </div>
                            <div class="flex1 center">
                                <span class="f12 gcolor">{{$t('m.tjnode')}}</span>
                                <div class="tcolor fw f28">
                                    {{data.node_cnt || 0}}<i class="f12">{{$i18n.locale == 'zh' ? '个' : ''}}</i>
                                </div>
                            </div>
                        </div>
                        <div class="progress-chart chart" :style="!isMobile ? 'width: 358px': ''">
                            <canvas ref="progressChart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="block sjfws" v-else>
                    <div class="tcolor f18 fw mb16">
                        {{$t('m.sjzsfws')}}
                    </div>

                    <div class="tcolor f14">
                        <div><i class='va el-icon-circle-check yes-icon icon14'></i> {{$t('m.hyyxccc')}}</div>
                        <div><i class='va el-icon-circle-check yes-icon icon14'></i> {{$t('m.hyy3')}}</div>
                        <div><i class='va el-icon-circle-check yes-icon icon14'></i> {{$t('m.hyy4')}}</div>
                        <div><i class='va el-icon-warning sigh-icon icon14'></i> {{$t('m.hyy5')}}</div>
                    </div>
                    <div class="right f12 pd16 mb16 borderLine">
                        <span class="gcolor">{{$t('m.wwtobe')}}</span>
                        <select v-model="wantId" class="n-btn btn-tcolor-border">
                            <option :value="item.id" v-for="(item, index) in fwsHYLists" :key="index">{{$i18n.locale == 'zh' ? item.cname : item.enname}}</option>
                        </select>
                    </div>
                    <div class="right">
                        <span class="gcolor f12 " >{{$t('m.yzekou')}} {{want.rate}}% </span>

                        <span class="tcolor fw f18 va"> {{want.price}}CJS </span>
                        <span class="f12 n-btn btn-tcolor va"  @click="panelHandle('HYSJ')" style="marginLeft:10px">{{$t('m.gopay')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <RightPanel :fullScreen='fullScreen' :show.sync="panelShow" id="dotside">
            <component  :panelData="panelData" :is='panel' @update:show="val => panelShow=val"/>
        </RightPanel>  

        <Checkin :data="checkindata" :show.sync='widthdrawpanel' v-if="!isMobile"/>
    </div>
</Page>
</template>
<script>
import HYSJ from './hysj'
import CPower from './chargepower'
import TXRecord from './txrecord'
import HYSYRecord from './hysyrecord'
import GZLZM from './gzlzm'
import SYCalcer from './sycalcer'
import Line from './line'
import Pie from './pie'
import Progress from './kj-progress'
import DashDetail from './dashdetail'
import Checkin from '../widgets/checkin'
import CountDownTicker from '../mixin/countdown'
import Big from 'bignumber.js'
import {mapActions, mapGetters} from 'vuex';
import textTypeDecide from '../mixin/getprofittype'
export default {
  data () {
    return {
        loader: false,
        panelData: {},
        fullScreen: false,
        panel:'',
        panelShow: false,
        profits:[],
        leftdata: {},
        widthdrawpanel: false,
        checkindata: {},
        wantId:0,
        linechartrecord: false,
    };
  },
  components: {
      HYSJ,
      CPower,
      TXRecord,
      HYSYRecord,
      GZLZM,
      SYCalcer,
      DashDetail,
      Checkin
  },
  mixins:[textTypeDecide,CountDownTicker],
  computed: {
      ...mapGetters(['fwsHYLists','signHYDetail']),
      isMobile () {
          return this.$store.getters.isMobile
      },
      id() {
          return this.$route.params.id;
      },
      data() {
          return this.signHYDetail;
      },
      canzhuanchu() {
          return util.fix(Math.min(Number(this.data.gas), Number(this.data.earnings)),4)
      },
      needzhuanchu() {
          let t = 0;
          if(Number(this.data.earnings) > Number(this.data.gas)) {
              t = Math.floor(Big(this.data.earnings).minus(this.data.gas).toNumber())
          }
          else {
              t = 0
          }
          return util.fix(t,4);
      },
      hasSumGas() {
          return Big(this.data.history_earningsraw).minus(this.data.earnings).toFixed(4, 1)
      },
      g() {
          const t = Big(this.data.gas).plus(this.hasSumGas).toNumber()
          if(!t) {
              return {
                  you: 0,
                  sum: 0
              }
          }
          return {
              you: Big(this.data.gas).div(t).times(100).toFixed(1),
              sum: Big(this.hasSumGas).div(t).times(100).toFixed(1)
          }
      },
      yushangzhou() {
          if(!this.data.history_earningsraw || !this.data.last_week_earnings) return 0;
          let t = Big(this.data.history_earningsraw).minus(this.data.last_week_earnings || 0);
          return Big(t).div(this.data.history_earningsraw).times(100).toFixed(2)
      },
      isMaxLevel() {
          const id = this.data.project_contract;
          let t = this.fwsHYLists.find(el => el.id == id);
          if(t) {
              return t.sort >= this.fwsHYLists.length;
          }
          return false;
      },
      isShowSJBtn() {
          if(!this.data.history_earningsraw || !this.data.next_level_need || this.isMaxLevel) return  false;
          return Big(this.data.history_earningsraw).gt(this.data.next_level_need)
      },
      want() {
          let t = {
                  rate:0,
                  price:0
              };
          if(!this.wantId) return t;
          
          let t2 = this.fwsHYLists.find(el => el.id == this.wantId);
          if(t2) {
              t.rate = t2.metadata.discount_rate;
              const  t3 = Big(t2.metadata.lock_limit).times(t2.metadata.discount_rate || 0).times(1e-2);
              t.price = Big(t2.metadata.lock_limit).minus(t3).toNumber();
          }
          return t;
      }
  },
  mounted() {
      this.init(this.signHYDetail);
      const p1 = this.getProfitLists();
      const p2 = this.getFWSStatics();
      Promise.all([p1, p2]).then(res => {
          setTimeout(() => {
              this.createLineChart(res[1]);
          }, 500) 
      });
  },
  methods: {
      init(res) {
        if(util.isEmpty(res)) return;
        this.end_time = res.end_time;
        this.createCountDownTicker();
        this.createProgressChart();
        setTimeout(() => {
            this.createPieChart();
        }, 300)
      },
      panelHandle(type, data) {
          if(this.isMobile) {
              let id = this.id;
              let t = {
                  SYCalcer: () => {
                      return {name:'syjsq'}
                  },
                  HYSYRecord: () => {
                      return {name: 'hysyjl' }
                  },
                  CPower: () => {
                      return {name: 'cznl'}
                  },
                  TXRecord: () => {
                      return {name:'hytxjl'}
                  },
                  GZLZM: () => {
                      return {name:'xmyj'}
                  },
                  HYSJ: () => {
                      return {name:'hysj',query: {trail: this.data.trial, wid: this.data.trial ? this.wantId : this.data.project_contract}}
                  }
              }[type]();
              t.params = {id};
              return this.$router.push(t);
          }
          this.panel = this.$options.components[type];
          this.fullScreen = type == 'HYSJ';
          if(type == 'HYSJ') {
             
              this.panelData = {
                  trial: this.data.trial,
                  wid: this.data.trial ? this.wantId : this.data.project_contract
                  
              };
          }
          this.panelShow = true;
      },
      createProgressChart() {
          const level = this.data.description.next_level_need;
          const total = this.data.total_waterraw;
          let rate = '0%';
          if(!total || !level) {
              rate = '0%';
          }
          else if(Big(total).gte(level)){
              rate = '100%';
          }
          else {
              rate = Big(total).div(level).times(100).toFixed(2)+'%'
          }
          if(this.oldrate == rate && this.oldlevel == level) return;
          this.oldlevel = level;
          this.oldrate = rate;
          new Progress(this.$refs.progressChart, rate, level, this.$t('m.yejijindu'));

      },
      createLineChart(data) {
          new Line(this.$refs.lineChart,data);
      },
      createPieChart() {
          const can = util.fix(this.canzhuanchu, 4), need = util.fix(this.needzhuanchu, 4)
          new Pie(this.$refs.pieChart, {
            total:util.tranNumber(can, 4),
            value: [
                {value:can,name: this.$t('m.synlkzc')},
                {value: need,name: this.$t('m.dnlzchu')},
            ],
            text:[this.$t('m.curpower'), this.$t('m.syzchu')]
          });
        //   new Pie(this.$refs.pieChart, {
        //     total:util.tranNumber(100000000000),
        //     value: [
        //         {value:10000000, name: this.$t('m.synlkzc')},
        //         {value:100000000, name: this.$t('m.dnlzchu')},
        //     ],
        //     text:[this.$t('m.curpower'), this.$t('m.syzchu')]
        //   });
      },
      tixianhandle() {
          if(this.canzhuanchu <= 0) return;
          this.checkindata = {
              id: this.id,
              value: this.canzhuanchu
          };
          if(this.isMobile) {
              return this.$router.push({name: 'txcheck',query: this.checkindata})
          }
          
          this.widthdrawpanel = true;
      },
      getProfitLists() {
          request.fwsProfitLists({
              params: {
                  order:'created_time',
                  desc: true,
                  project: this.id,
                  pagesize: 4,
                  offset: 0
              }
          })
          .then(res => {
              let t =[]
              t = util.isEmpty(res.data) ? [] : res.data.incomes
              let store = [];
              let filters = this.$root.$options.filters;
              t.forEach(el => {
                  store.push({
                      date: filters.format(el.created_time),
                      node: el.username,
                      type: '',
                      profit: util.fromHex(el.value, el.decimals || 0,4),
                      description: el.description,
                      project: el.project
                  })
              });
              this.profits = store;
              this.textsHandler(this.profits, 'type');
          })
      },
      getFWSStatics() {
          return request.getFWSStatics({
              params: {
                  project: this.id,
                  pagesize: 20,
                  offset: 0,
                  start: util.getDay(-7),
                  end:util.getDay(0)
              }
          })
          .then(res => {
              let t = {
                  date: [],
                  value: [
                      [],
                      []
                  ],
                  text:[this.$t('m.profit'),this.$t('m.rollout')]
              };
              if(util.isEmpty(res.data)) {
                  return t;
              }
              let filters = this.$root.$options.filters;
              res.data.list.forEach(el => {
                  t.date.push(filters.format(el.time, 'MM-DD'));
                  t.value[0].push(el.earnings ? util.fix(el.earnings, 4) : 0);
                  t.value[1].push(el.rollout ? util.fix(el.rollout, 4) : 0);
              });
              return t;
          })
      },
  },
  watch: {
      signHYDetail: {
          deep: true,
          handler: function(n) {
              this.init(n);
          }
      },
      fwsHYLists:{
          immediate: true,
          deep: true,
          handler: function(n) {
              if(!util.isEmpty(n)) this.wantId = n[0].id;
          }
      },
  }
}

</script>
<style lang='scss'>
.circle-chart {
    width: 40px;
    min-width: 40px;
}
.pc {
    .hy-dash,.calcer {
        min-width: 1150px;
        max-width: 1150px;
        width: 1150px;
        // padding: 30px 20px 20px;
    }
    .bn-dash {
         min-width: 1300px;
        max-width: 1300px;
        width: 1300px;
        .hy-left {
            min-width: 330px;
            width: 330px;
            box-sizing: border-box
        }
        .hy-center {
            min-width: 360px;
            width: 360px;
            box-sizing: border-box
        }
        .hy-right {
            .hr1 {
                width: 290px;
                min-width: 290px;
                box-sizing: border-box
            }
            .hr2 {
                width: 260px;
                min-width: 260px;
                box-sizing: border-box
            }
        }
    }
    .fws-dash {
        .hy-dash-bd {
            // height: 616px;
        }
        .hy-left {
            flex-shrink: 0;
            min-width: 330px;
            max-width: 330px;
            width: 330px;
            box-sizing: border-box
        }
        .hy-center {
             flex-shrink: 0;
            min-width: 390px;
            max-width: 390px;
            width: 390px;
            box-sizing: border-box
        }
        .hy-right {
             flex-shrink: 0;
            min-width: 390px;
            max-width: 390px;
            width: 390px;
            box-sizing: border-box
        }
    }
    
}
.pc {
    .hp-info {
        max-width: 50%;
    }
}
.mobile {
    .m-dash-hd {

    }
    .hp-info {
        order:2
    }
    .hp-chart {
        order: 1;
        min-height: 200px
    }
}
.latest-record {
    tr {
        height: 45px;
    }
}
.chart {
    canvas {
        width: 100%;
        height: 100%;
    }
}
.line-chart {
    height: 230px;
}
.pieChart {
    height: 200px;
    min-width: 180px;
}
.progress-chart {
    height: 130px;
}
.calc-icon {
    display: inline-block;
    width: 20px;
    height: 26px;
    background: url(../../../assets/images/calcicon.png) no-repeat center/16px;

}
.record-icon {
    display: inline-block;
    width: 20px;
    height: 26px;
    background: url(../../../assets/images/recordicon.png) no-repeat center/16px;
}
.hy-countdown {
    li {
        margin: 0 10px;
    }
}

.qystate {
    position: absolute;
    bottom: 20px;
    right: 16px;
    width: 45px;
}
.hp-pk {
    margin: 8px 0;
    span {
        display: inline-block;
        height: 12px;
        // width: 50%;
        position: relative;
    }
    span:first-child {
        background: #8EB8D0;
    }
    // span:first-child:after {
    //     content:'';
    //     position: absolute;
    //     top: 0;
    //     right: -12px;
    //     z-index: 99;
    //     width: 0;
    //     height: 0;
    //     border:6px solid #8EB8D0;
    //     border-right-color:transparent;
    //     border-bottom-color:transparent
    // }
    span:last-child {
        background: #DFEBF1
    }
}
</style>