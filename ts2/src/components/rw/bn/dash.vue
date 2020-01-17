<!--  -->
<template>
<Page :title="$t('m.hydash')" borderLine padding>
<span class="tcolor f12" slot="layer-right-btn" @click="$router.push('/bdashdetail')">{{$t('m.hydetail')}}</span>
<div class="hy-dash m20 bn-dash">
    <div class="m-dash-hd" :class="{'block center mb16': isMobile}">
        <div class="tcolor m10" :class="{'flex sb': !isMobile}">
            <div :class="{'borderLine pd16 mb16': isMobile}">
                <div class="f12 gcolor mb6">{{$t('m.zjclj')}}</div>
                <div>
                    <i class="f12">CJS</i>
                    <i class="f28 fw">823900</i>
                    <i class="f12">.98</i>
                </div>
            </div>
            
            <div>
                <div class="f12 gcolor mb6" :class="{center: isMobile, right: !isMobile}">{{$t('m.hysyyxq')}}</div>
                <ul class="flex vc hc hy-countdown">
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

        </div>

    </div>

    <div class="hy-dash-bd" :class="{flex: !isMobile}">
        <DashDetail v-if="!isMobile"/>
        <div class="hy-center block" :class="{'ml16 mr16':!isMobile, mb16: isMobile}">

            <div class="flex sb vc f14 gcolor">
                <span>{{$t('m.syhj')}}</span>
                <span class="cp" @click="panelHandle('SYCalcer')"> <i class="calc-icon va "></i> <i class="va">收益计算器{{$t('m.')}}</i></span>
            </div>
            <div class="tcolor m10 fw">
                CJOY <span class="f40">787897897</span> <span class="f12">.98</span>
                <span class="f12 lcolor">+2.09%（{{$t('m.yszhou')}}）</span>

            </div>
            <div class="f12  borderLine pd16 mb16">
                <i class="gcolor">{{$t('m.zrisy')}}</i>
                &nbsp;&nbsp;&nbsp;
                <i class="tcolor">CJOY</i>
                <i class="tcolor f18 fw">900</i>
                <i class="tcolor">.98</i>
            </div>



            <div class="line-chart chart" ref="lineChart">
            </div>

            <div v-if="!isMobile" class="f14 gcolor flex sb borderLine pd16 mb16">
                <span>{{$t('m.newsyjl')}}</span>
                <span class="cp" @click="panelHandle('HYSYTJ')">{{$t('m.checkall')}}</span>
            </div>
            <router-link  to="/hysytj" v-else class="f14 gcolor flex sb borderTopLine pt16">
                <span>{{$t('m.checksy')}}</span>
                <i class="el-icon-arrow-right"></i>
            </router-link>
            <table v-if="!isMobile" class="tcolor f14 latest-record" style="width: 100%;">
                <tr v-for="(profit, index) in profits" :key='index'>
                    <td>
                        <span>{{profit.name}}</span>
                        <div>
                            {{profit.type}} 
                            <i class="f12">CJS</i>
                        </div>
                    </td>
                    <td class="right">
                        <div>
                            <span class="fw">{{profit.amount}}</span>
                            <i class="f12">CJOY</i>
                        </div>
                        <span class="gcolor f12">{{profit.date}}</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="hy-right flex" :class="{v: isMobile}">
           <div class="hr1  block" :class="{mr16: !isMobile}">
               <div class="f14 gcolor">{{$t('m.hycbpm')}}</div>
                <div class="tcolor">
                    <i class="f50 fw">2.98%</i>
                    <i class="f12">NO.9</i>
                </div>
                <ul class="f14 h-lists">
                    <li class="flex sb vc gcolor" :class="{qbk: index<3}" :key="index" v-for="(rank, index) in ranks">
                        <div class="hy-l-r flex">
                            <i class="hcolor hl-icon center" :class="{fw: index == 0}">{{rank.level}}</i>
                            <div>
                                <i >{{rank.name}}</i>
                                <div>
                                    <i :class="{tcolor:index <3}">{{rank.key}}</i>
                                    <i class="f12">KEY</i>
                                </div>
                            </div>
                        </div>
                        <span :class="{tcolor:index <3}">{{rank.ratio}}</span>
                    </li>
                </ul>
           
           
           
           </div>
           <div class="hr2" :class="{'flex v': isMobile}">
               <div class="block block-lj mb16">
                    <div class="f14 gcolor center">NO.5 {{$t('m.hyqjs')}}</div>
                    <div class="f24 center lcolor fw m16">71:10:34</div>
                    <div class="flex sb m16">
                        <span class="f14 gcolor">{{$t('m.tzze')}}</span>
                        <span class="tcolor">
                            <i>879869</i>
                            <i class="f12">.09</i>
                        </span>
                    </div>
                    <div class="flex sb m16">
                        <span class="f14 gcolor">{{$t('m.jclj')}}</span>
                        <span class="tcolor">
                            <i>879869</i>
                            <i class="f12">.09</i>
                        </span>
                    </div>
                    <div class="block">
                        <div class="flex sb mb16">
                            <span class="f14 gcolor">{{$t('m.mykey')}}</span>
                            <span class="right">
                                <div class="f18 tcolor">2456</div>
                                <i class="f12 gcolor">≈1034.00CJS</i>
                            </span>
                        </div>

                        <div class="flex sb">
                            <span class="f14 gcolor">{{$t('m.yizchu')}}</span>
                            <span class="tcolor">
                                <i class="f18 fw">10.00</i>
                                <i class="f12">CJOY</i>
                            </span>
                        </div>
                    </div>
               </div>
               <div class="block block-key re choose-key" :class="{mb16:isMobile}">
                    <span class="cp" @click="panelHandle(isBuy ? 'KEYBUYRecord' : 'KEYEXCRecord')"> <i class="record-icon va "></i></span>
                    <div class="radio-choose tcolor re">
                        <div class="fw f18 center">KEY</div>
                        <div class="flex sb f12 radio-check">
                            <span @click="radioHandle(index)" :class="{active: radio.active}" :key="index" v-for="(radio, index) in radioTexts">{{radio.text}}</span>
                        </div>
                    </div>
                    <div class="f14 center lcolor m16">
                        <template v-if="!isBuy">
                            {{$t('m.dqkdh')}}：2456KEY
                        </template>
                        <template v-else>
                            {{$t('m.dqjg')}}：0.000CJS
                        </template>
                    </div>
                    <div class="block-input flex qbk m16">
                        <span class="gcolor f14">
                            <template v-if="!isBuy">
                                {{$t('m.dhkey')}}
                            </template>
                            <template v-else>
                                {{$t('m.buynum')}}
                            </template>
                        </span>
                        <input type="text" v-model="buyinput" class="flex1 tcolor right">
                    </div>
                    <div class="m16">
                        <el-slider v-model="slider"></el-slider>
                        <div class="gcolor f12" v-if="!isBuy">
                            {{$t('m.yugu')}}：10987.00CJS
                        </div>
                        <div class="right f14 tcolor" v-else>
                            {{$t('m.heji')}}：0.00000CJS
                        </div>
                    </div>

                    <div class="btn-fter center">
                        <div class="n-btn btn-tcolor db">{{$t('m.sure')}}</div>
                        <span class="gcolor f12" v-if="isBuy">{{$t('m.kyye')}}：0.00CJS</span>
                    </div>
               </div>
           </div>
        </div>
    </div>

    <RightPanel :show.sync="panelShow" >
        <component  :panelData="panelData" :is='panel' @update:show="val => panelShow=val"/>
    </RightPanel>  
</div>
</Page>
</template>

<script>
import DashDetail from './dashdetail'
import KEYEXCRecord from './keyrecord'
import KEYBUYRecord from './keybuyrecord'
import SYCalcer from './sycalcer'
import HYSYTJ from './hysytj'
import Line from '../dot/line'
export default {
  data () {
    return {
        buyinput: 30,
        radioTexts: [
            {
                text:'购买',
                name: 'buy',
                active: true
            },
            {
                text:'兑换',
                name:'exchange',
                active: false
            },
        ],
        slider: 30,
        ranks: [
            {
                level:1,
                name:'DADA',
                key:'18989',
                ratio:'78%'
            },
            {
                level:2,
                name:'DADA',
                key:'18989',
                ratio:'78%'
            },
            {
                level:3,
                name:'DADA',
                key:'18989',
                ratio:'78%'
            },
            {
                level:4,
                name:'DADA',
                key:'18989',
                ratio:'78%'
            },
        ],
        panelData: {},
        fullScreen: false,
        panel:'',
        panelShow: false,
        profits:[
            {
                name:'YOYO',
                type:'投入9876.00',
                amount:'+2000.00',
                date:'2019.11.11 11:11:11'
            },
            {
                name:'YOYO',
                type:'终止合约',
                amount:'+2000.00',
                date:'2019.11.11 11:11:11'
            },
            {
                name:'YOYO',
                type:'投入9876.00',
                amount:'+2000.00',
                date:'2019.11.11 11:11:11'
            }
        ]
    };
  },
  components: {
      KEYEXCRecord,
      KEYBUYRecord,
      SYCalcer,
      HYSYTJ,
      DashDetail
  },
  computed: {
      isMobile () {
          return this.$store.getters.isMobile
      },
      isBuy() {
          const t = this.radioTexts.find(el => el.active);
          return t && t.name == 'buy';
      }
  },
  mounted() {
      this.createLineChart();
  },
  methods: {
      radioHandle(idx) {
          this.radioTexts.forEach((el, index) => {
              el.active = index == idx;
          });
      },
      panelHandle(type, data) {
          if(this.isMobile) {
              let t = {
                  SYCalcer: () => {
                      return this.$router.push('/syjsq');
                  },
                  KEYBUYRecord: () => {
                      return this.$router.push('/keybuy');
                  },
                  KEYEXCRecord: () => {
                      return this.$router.push('/keyexc');
                  },
                  HYSYTJ: () => {
                      return this.$router.push('/hysytj');
                  }
              }[type]();
          }
          this.panel = this.$options.components[type];
          this.panelShow = true;
      },
      createLineChart() {
          new Line(this.$refs.lineChart);
      },
  }
}

</script>
<style lang='scss'>
.pc {
    .bn-dash {
        .hy-left {
            width:280px;
            flex: none;
        }
        .hr1 {
            min-width: 260px;
        }
        .hr2 {
            min-width: 260px;
        }
    }
}
.mobile {
    .hr1,.block-lj {
        order: 2
    }
    .hr2,.block-key {
        order: 1
    }
}
.choose-key {
    >span.cp {
        position: absolute;
        top:10px;
        right: 10px;
        z-index: 99;
    }
    .block-input {
        padding: 12px 6px;
    }
}
.radio-choose {
    width: 80px;
    margin: 16px auto;
    .radio-check {
        margin-top: 10px;
        padding-top: 4px;
        border-top: 1px solid rgba(8, 100, 153, 0.258);
        span {
            color:rgba(8, 100, 153, 0.258);
            position: relative;
        }
        span.active {
            color: #086599
        }
        span:first-child {
            margin-left: -10px;
        }
        span:last-child {
            margin-right: -10px;
        }
        span.active:before {
            border:1px solid #086599;
            background: #fff;
            
        }
        span:before {
            cursor: pointer;
            content:'';
            position: absolute;
            top:-10px;
            left: 0;
            right: 0;
            margin: auto;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(8, 100, 153, 0.258);
            border:1px solid rgba(8, 100, 153, 0.258);


        }
    }
}
.h-lists {
    li {
        margin: 4px 0;
        padding: 4px 10px;
    }
    
    li:nth-child(1) {
        .hl-icon {
            width: 30px;
            height: 30px;
            line-height: 30px;
            background: url(../../../assets/images/fsticon.png) no-repeat center/contain;
        }
    }
    li:nth-child(2) {
        .hl-icon {
            width: 30px;
            height: 30px;
            line-height: 30px;
            background: url(../../../assets/images/scdicon.png) no-repeat center/contain;
        }
    }
    li:nth-child(3) {
        .hl-icon {
            width: 30px;
            height: 30px;
            line-height: 30px;
            background: url(../../../assets/images/thdicon.png) no-repeat center/contain;
        }
    }
}
.hy-l-r {
    >i {
        
    }
    >div {
        padding-left: 16px;
    }
    
}
</style>