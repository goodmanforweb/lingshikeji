<!--  -->
<template>
<page title="项目详情" borderLine padding routerBack="/prohub">

<div class="prohub-panel" :class="{'block-padding': !isMobile}">
    <div class="flex vc">
        <span class="ph-cube-icon" style="marginRight: 10px">
            <img src="../../assets/images/proicon.png" alt="">
        </span>

        <span class="tcolor fw f26">FunnyUP</span>
    </div>
    <div class="pp-dash  m16" :class="{flex: !isMobile}">
        <ul class="ppd-left" :class="{'flex sb': isMobile}">
            <li class="cp ppdl-cube block block-padding  vc">
                <span >
                    <img src="../../assets/images/editciricon.png" alt="">
                </span>
                <div>
                    <div class="tcolor fw">编辑简介</div>
                    <span class="f12 gcolor">LOGO、简介、社交渠道等</span>
                </div>
            </li>
            <li class="cp ppdl-cube block block-padding  vc" @click="panelHandle('PState')">
                <span>
                    <img src="../../assets/images/stateciricon.png" alt="">
                </span>
                <div>
                    <div class="tcolor fw">认购中</div>
                    <span class="f12 gcolor">修改项目状态</span>
                </div>
            </li>
            <li class="cp ppdl-cube block block-padding  vc" @click="panelHandle('PDetail')">
                <span>
                    <img src="../../assets/images/manciricon.png" alt="">
                </span>
                <div>
                    <div class="tcolor fw">113人</div>
                    <span class="f12 gcolor">项目社区用户</span>
                </div>
            </li>
        </ul>
        <div class="ppd-right flex1 block flex v">
            <div class="dc-hd noshadow ">
                <XXRadio class="ppd-radios flex tcolor fw"  :texts="radioTexts" v-model="radioValue"></XXRadio>
            </div>
            <div class="ppr  flex1" :class="{flex: !isMobile}">
                <div class="ppr-chart flex1 dcb-chart" ref='barcontainer'>

                </div>
                <div class="ppr-info block-padding" :class="{'flex fwrap': isMobile}">
                    <div class="center ppr-sale">
                        <div class="gcolor f12 mb6">销售总量（CJS）</div>
                        <span class="tcolor fw f26 towrap">12980</span>
                    </div>
                    <div class="ppr-days" :class="{'flex flex1 sb':isMobile,m20: !isMobile}">
                        <div :class="{'flex sb mb6': !isMobile}">
                            <span class="gcolor f12">昨日</span>
                            <span class="tcolor fw f14">1298</span>
                        </div>
                        <div :class="{'flex sb': !isMobile}">
                            <span class="gcolor f12">今日</span>
                            <span class="tcolor fw f14">1298</span>
                        </div>
                    </div>
                    <div class="center pinfo-btn">
                        <span class="n-btn btn-tcolor btn-panel-sure" @click="panelHandle('PDash')">查看报表</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="pp-lists pp-block-sec " v-if="!isMobile">
        <ul class="ppl flex fwrap" >
            <li class="block flex vc hc v" @click="panelHandle('PAddKJ')">
                <div class="vs-plus center fw f26 m16 cp">+</div>
                <div class="fw tcolor">添加矿机</div>
                <div class="f12 gcolor">添加项目的矿机</div>
            </li>
            <li class="block re block-padding bbox flex v sb" v-for="(cube, index) in cubes" :key="index">
                <el-popover
                    popper-class="popper"
                    placement="bottom"
                    width="80"
                    trigger="hover"
                    v-model="cube.pop">
                    <ul >
                        <li class="cp" @click="panelHandle('PRWDash')">查看报表</li>
                        <li class="cp" @click="panelHandle('PRWDash')">矿机介绍</li>
                        <li class="cp">下线矿机</li>
                    </ul>
                    <span class="b-san" slot="reference" @click="cube.pop = !cube.pop">
                        <img src="../../assets/images/dots.png" alt="">
                    </span>
                </el-popover>
                <div>
                    <div class="tcolor">{{cube.name}}</div>
                    <span class="f12 gcolor">库存：{{cube.sku}}</span>
                    <div class="f14">{{cube.state}}</div>
                </div>
                <div>
                    <span class="f12 gcolor">总销量</span>
                    <div class="f14 tcolor mb20">{{cube.total}}CJS</div>

                    <span class="f12 gcolor">已售出</span>
                    <div class="f14 tcolor">{{cube.sell}}</div>
                </div>
            </li>
        </ul>
    </div>
    <div class="flex sb vc block block-padding " v-else @click="$router.push('/pkjlists')">
        <span class="f14 tcolor">查看矿机列表</span>
        <i class="el-icon-arrow-right"></i>
    </div>
    <div class="pp-ft  m20" :class="{'flex sb': !isMobile}">
        <div class="check-en">
            <span class="n-btn btn-tcolor-border f14" style="width:7em"> 切换至英文版</span>
            <span class="f12 gcolor">添加英文版介绍、矿机</span>
        </div>
        <XXPager  v-if="!isMobile" style="width: 120px" @change="pagerChange"/>
    </div>
    <RightPanel :show.sync="panelShow"   :fullScreen="fullScreen" class="prohubPanel" >
        <component :propdata="propdata" :is="panel"></component>
    </RightPanel>

</div>
</page>
</template>

<script>
import PState from './prohub-panel-state';
import PDetail from './prohub-panel-detail'
import PDash from './prohub-panel-dash'
import PRWDash from './prohub-panel-rw'
import PAddKJ from '../guide/prohub-panel-addkj'
import Bar from './bar';
import KJBar from './bar2';

export default {
  data () {
    return {
        propdata: {},
        panel:'',
        panelShow: false,
        cubes: [
            {
                name:'朋友圈集赞任务',
                sku: '1000',
                state: '上线中',
                total: 1000000,
                sell: 33,
                pop: false
            },
            {
                name:'朋友圈集赞任务',
                sku: '1000',
                state: '已下线',
                total: 1000000,
                sell: 33,
                pop: false
            },
            {
                name:'朋友圈集赞任务',
                sku: '1000',
                state: '编辑中',
                total: 1000000,
                sell: 33,
                pop: false
            },

        ],
        radioTexts: ['矿机销售', '挖矿统计'],
        radioValue:'矿机销售',
        fullScreen: false
    };
  },

  components: {
      PState,
      PDetail,
      PDash,
      PRWDash,
      PAddKJ
  },

  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    }
  },
  mounted() {
      this.createBar();
  },

  methods: {
      panelHandle(type, data) {
          if(this.isMobile) {
              let cf = {
                PState: 'pstate',
                PDetail: 'pdetail',
                PDash: 'pdash',
                PRWDash: 'prw',
              }[type];
              return this.$router.push(cf);
          }
          let fullscreenconfig = ['PDash','PRWDash','PAddKJ'];
          this.fullScreen = fullscreenconfig.includes(type);
          this.panel = this.$options.components[type];
          this.panelShow = true;
      },
      showPanel() {

      },
      pagerChange() {

      },
      createBar() {
        this.chart = Bar(this.$refs.barcontainer);
      },
      createKJBar() {
        this.chart = KJBar(this.$refs.barcontainer);
      },

  },
  watch: {
      radioValue(n) {
          this.chart && this.chart.dispose();
          n == '矿机销售' ? this.createBar() : this.createKJBar();
      }
  }
}

</script>
<style lang='scss'>
.pc {
    .ppd-left {
        margin-right: 16px;
        width: 253px;
        
        li {
            display: flex;
            height: 110px;
            box-sizing: border-box;
            >span {
                width: 47px;
                margin-right: 10px
            }
        }
        li:nth-of-type(2) {
            margin: 8px 0;
        }
    }
}
.ppd-right {
    .dc-hd {
        height: 53px;
        line-height: 53px;
    }
}
.ppd-radios {
    li {
        margin: 0 8px;
        position: relative;
    }
    li.active:before {
        content:'';
        position: absolute;
        bottom: 0;
        left: 4px;
        right: 4px;
        height: 2px;
        border-radius: 2px;
        background: #086599
    }
}
.ppr-info {
    box-sizing: border-box;
    width: 206px;

}
.pc {
    .ppr-days {
        padding: 20px 0;
        border-top: 1px solid rgba(8, 100, 153, 0.158);
        border-bottom: 1px solid rgba(8, 100, 153, 0.158);

    }

}
.pp-block-sec {
    padding-top: 16px;
    border-top: 1px solid rgba(8, 100, 153, 0.158);

}
.ppl {
    li:first-of-type {
        margin-left: 0
    }
    li {
        width: 228px;
        height: 263px;
        margin: 0 8px 8px;
        >span {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 20px;
            text-align: center;
            img {
                width: 4px;
            }
        }
    }
}

.mobile {
    .ppd-left {
        li {
            flex: 1;
            text-align: center;
            >span {
                display: inline-block;
                padding: 10px 0;
                img {
                    width: 30px;
                }
            }
        }
        li:nth-child(2) {
            margin: 0 8px;
        }
    }
    .ppd-right {
        margin: 16px 0;
    }
    .ppr-info {
        width: auto;
    }
    .pinfo-btn {
        min-width: 100%;
        margin-top: 20px;
    }
    .ppr-days {
        border:none;
        border-left: 1px solid rgba(8, 100, 153, 0.158);
        padding-left: 16px;
        div span:first-child {
            display: block;
            margin-bottom: 8px;
        }
        div span:last-child {
            font-size: 20px;
        }
    }
    .ppr-sale {
        margin-right: 16px;
    }
    .check-en {
        display: block;
        text-align: center;
        span:last-child {
            margin-top: 6px;
            display: block;
        }
    }
    .el-icon-arrow-right:before {
        color: #086599;
        font-weight: bold;
    }
    .ppl {
        li {
            width: calc(50% - 8px);
            height: auto;
            margin: 8px 0;
        }
        .ppl-tal {
            margin-top: 30px;
        }
    }

}
</style>