<!--  -->
<template>
<Page :title="$t('m.hydash')" borderLine padding >
    <span class="tcolor f12" slot="layer-right-btn" @click="$router.push('/dashdetail')">{{$t('m.hydetail')}}</span>
    <div class="hy-dash m20">
        <div class="m-dash-hd" :class="{'block center mb16': isMobile}">
            <div class=" f12 gcolor" :class="{center: isMobile, right: !isMobile}">
                {{$t('m.hyyxqsy')}}
            </div>
            <div class="clearfix" :class="{'borderLine pd10 mb16': isMobile}">
                <ul class="m16 tcolor flex vc hc hy-countdown" :class="{fr: !isMobile}">
                    <li class="center">
                        <div class="fw f18">09</div>
                        <div class="f12">DAYS</div>
                    </li>
                    :
                    <li class="center">
                        <div class="fw f18">09</div>
                        <div class="f12">HOURS</div>
                    </li>
                    :
                    <li class="center">
                        <div class="fw f18">09</div>
                        <div class="f12">MIN</div>
                    </li>
                    :
                    <li class="center">
                        <div class="fw f18">09</div>
                        <div class="f12">SEC</div>
                    </li>
                </ul>
            </div>
            <div class="tcolor mb6 f14">
                <i class='el-icon-warning sigh-icon-tcolor'></i> 
                {{$t('m.tdxyijib')}}
                <div v-if="isMobile" class="n-btn btn-redcolor f14" @click="$router.push('/hysj')">{{$t('m.sjqy')}}</div>
            </div>
        </div>
    
        <div class="hy-dash-bd " :class="{flex: !isMobile}">
            <DashDetail @panelHandle="panelHandle" v-if="!isMobile" />

            <div class="hy-center block " :class="{'ml16 mr16':!isMobile, mb16: isMobile}">

                <div class="flex sb vc f14 gcolor">
                    <span>{{$t('m.syhj')}}</span>
                    <span class="cp" @click="panelHandle('SYCalcer')"> <i class="calc-icon va "></i> <i class="va">{{$t('m.syjsq')}}</i></span>
                </div>
                <div class="tcolor m10 fw">
                    CJOY <span class="f40">787897897</span> <span class="f12">.98</span>
                </div>
                <div class="f12 lcolor borderLine pd16 mb16">+2.09%（{{$t('m.yszhou')}}）</div>


                <div class="line-chart chart" ref="lineChart">
                </div>

                <div v-if="!isMobile" class="f14 gcolor flex sb borderLine pd16 mb16">
                    <span>{{$t('m.newsyjl')}}</span>
                    <span class="cp" @click="panelHandle('HYSYRecord')">{{$t('m.checkall')}}</span>
                </div>
                <router-link  to="/hysyjl" v-else class="f14 gcolor flex sb borderTopLine pt16">
                    <span>{{$t('m.checksy')}}</span>
                    <i class="el-icon-arrow-right"></i>
                </router-link>

                <table v-if="!isMobile" class="tcolor f14 latest-record" style="width: 100%;">
                    <tr v-for="(profit, index) in profits" :key='index'>
                        <td>{{profit.name}}</td>
                        <td class="center">{{profit.type}}</td>
                        <td class="right">
                            <div>
                                <span class="f14 fw">{{profit.amount}}</span>
                                <i>CJOY</i>
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
                    <div class="hy-profit flex borderLine pd16 mb16" :class="{v:isMobile}">
                        <div class='hp-info'>
                            <div class="hp-info-row flex m20">
                                <div class="circle-chart chart mr10">
                                    <el-progress :width="44" :stroke-width="4" type="circle" :percentage="80" color="#1A70A0"></el-progress>
                                </div>
                                <div class="circle-info tcolor">
                                    <div class="f12 mb6">{{$t('m.synlkzc')}}</div>
                                    <div >
                                        <span>  <i class="f14 fw">1098.09</i>  <i class="f12">CJOY</i> </span>
                                        <span class="n-btn btn-tcolor-border f12 ml10">{{$t('m.zchu')}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="hp-info-row flex m20" style="marginTop: 40px">
                                <div class="circle-chart chart mr10">
                                    <el-progress :width="44" :stroke-width="4" type="circle" :percentage="80" color="#8EB8D0"></el-progress>
                                </div>
                                <div class="circle-info tcolor">
                                    <div class="f12 mb6"> {{$t('m.dnlzchu')}}</div>
                                    <div class="mb6">
                                        <span>  <i class="f14 fw">1098.09</i>  <i class="f12">CJOY</i> </span>
                                        <span class="n-btn btn-tcolor-border f12 ml10" @click="panelHandle('CPower')">{{$t('m.nlcz')}}</span>
                                    </div>
                                    <span class="gcolor f12">{{$t('m.cznlallzchu',{num: 10989})}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="hp-chart  pieChart flex1" ref='pieChart'></div>
                    </div>
                    <div class="hy-power flex vc">
                        <div>
                            <div class="f12 gcolor">{{$t('m.nlsyu')}}</div>
                            <span class="redcolor f14 fw">10987</span>
                        </div>
                        <div class="flex1 clearfix hp-pk">
                            <span class=" transi hp-left fl"></span>
                            <span class="transi hp-right fr"></span>
                        </div>
                        <div>
                            <div class="f12 gcolor">{{$t('m.yynl')}}</div>
                            <span class="tcolor f14 fw">10987</span>
                        </div>
                    </div>
                    
                </div>

                <div class="block" v-if="1">
                    <div class="tcolor f18 fw center mb16 vc">
                        {{$t('m.hyfuxx')}}
                        <span class="record-icon fr cp" @click="panelHandle('GZLZM')"></span>
                    </div>
                    <div>
                        <div class="flex">
                            <div class="flex1 center borderRightLine">
                                <span class="f12 gcolor">{{$t('m.ddfls')}}(CJS)</span>
                                <div class="tcolor fw f28">
                                    219090 <i class="f12">.98</i>
                                </div>
                            </div>
                            <div class="flex1 center">
                                <span class="f12 gcolor">{{$t('m.tjnode')}}</span>
                                <div class="tcolor fw f28">
                                    3<i class="f12">个</i>
                                </div>
                            </div>
                        </div>
                        <div class="progress-chart chart">
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
                        <select name="" id="" class="n-btn btn-tcolor-border">
                            <option value="">{{$t('m.onestar',{star:'一'})}}</option>
                            <option value="">{{$t('m.onestar',{star:'二'})}}</option>
                            <option value="">{{$t('m.onestar',{star:'三'})}}</option>
                            <option value="">{{$t('m.onestar',{star:'四'})}}</option>

                        </select>
                    </div>
                    <div class="right">
                        <span class="gcolor f12 " >{{$t('m.yzekou')}}10% </span>

                        <span class="tcolor fw f18 va"> 17000CJS </span>
                        <span class="f12 n-btn btn-tcolor va " style="marginLeft:10px">{{$t('m.gopay')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <RightPanel :fullScreen='fullScreen' :show.sync="panelShow" >
            <component  :panelData="panelData" :is='panel' @update:show="val => panelShow=val"/>
        </RightPanel>  
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
export default {
  data () {
    return {
        panelData: {},
        fullScreen: false,
        panel:'',
        panelShow: false,
        profits:[
            {
                name:'YOYO',
                type:'购入一星服务商',
                amount:'+2000.00',
                date:'2019.11.11 11:11:11'
            },
            {
                name:'YOYO',
                type:'购入一星服务商',
                amount:'+2000.00',
                date:'2019.11.11 11:11:11'
            },
            {
                name:'YOYO',
                type:'购入一星服务商',
                amount:'+2000.00',
                date:'2019.11.11 11:11:11'
            }
        ]
    };
  },
  components: {
      HYSJ,
      CPower,
      TXRecord,
      HYSYRecord,
      GZLZM,
      SYCalcer,
      DashDetail
  },
  computed: {
      isMobile () {
          return this.$store.getters.isMobile
      }
  },
  mounted() {
      this.createLineChart();
      this.createPieChart();
      this.createProgressChart();
  },
  methods: {
      panelHandle(type, data) {
          if(this.isMobile) {
              let t = {
                  SYCalcer: () => {
                      return this.$router.push('/syjsq');
                  },
                  HYSYRecord: () => {
                      return this.$router.push('/hysyjl');
                  },
                  CPower: () => {
                      return this.$router.push('/cznl');
                  },
                  TXRecord: () => {
                      return this.$router.push('/hytxjl');
                  },
                  GZLZM: () => {
                      return this.$router.push('/xmyj');
                  }
              }[type]();
          }
          this.panel = this.$options.components[type];
          this.fullScreen = type == 'HYSJ';
          this.panelShow = true;
      },
      createProgressChart() {
          new Progress(this.$refs.progressChart, '98%');
      },
      createLineChart() {
          new Line(this.$refs.lineChart);
      },
      createPieChart() {
          new Pie(this.$refs.pieChart);
      }
  }
}

</script>
<style lang='scss'>
.pc {
    .hy-dash,.calcer {
        min-width: 1200px;
        max-width: 1200px;
        margin: 30px 20px 20px;
    }
    .bn-dash {
         min-width: 1400px;
        max-width: 1400px;
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
    min-width: 200px;
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
.hy-left {
    flex: 1
}
.hy-center {
    flex: 1.2
}
.hy-right {
    flex: 1.5
}
.qystate {
    position: absolute;
    bottom: 20px;
    right: 16px;
    width: 45px;
}
.hp-pk {
    margin: 0 10px;
    span {
        display: inline-block;
        height: 12px;
        width: 50%;
        position: relative;
    }
    span:first-child {
        background: #8EB8D0;
    }
    span:first-child:after {
        content:'';
        position: absolute;
        top: 0;
        right: -12px;
        z-index: 99;
        width: 0;
        height: 0;
        border:6px solid #8EB8D0;
        border-right-color:transparent;
        border-bottom-color:transparent
    }
    span:last-child {
        background: #DFEBF1
    }
}
</style>