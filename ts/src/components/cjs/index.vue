<template>
<Page :title="$t('m.cjscenter')" borderLine padding routerBack="/index">
    <div class="cjs">

        <div class="block cjs-top-block re">
            <div>
                <div class="flex sb">
                    <span class="tcolor fw">{{$t('m.buycjs')}}</span>
                    <div class="f14 gcolor">
                        <span v-for="(coin, index) in coinList" :key="index" class="cp" :class="{tcolor: coin.name == coinType.name}" style="padding: 0 8px;"   @click="coinType=coin">{{coin.name | uppercase}}</span>
                    </div>
                </div>
                <span class="gcolor f12">
                    {{
                        `CJS/${coinType.name.toUpperCase()}`
                    }}
                </span>
            </div>
            <div class="center">
                <div :class="`gcolor ${isMobile ? 'left f13 m16' : ''}`" >{{$t('m.ssratio')}}</div>
                <div class="tcolor cjs-center-num">
                    <span :class="`${isMobile ? 'f30' : 'f50'} fw`">1.00</span>
                    <span>CJS</span>
                    <span class="equal">≈</span>
                    <span :class="`${isMobile ? 'f30' : 'f50'} fw`">{{cjss.price}}</span>
                    <span>{{coinType.name | uppercase}}</span>
                </div>
                <el-button  @click="showBlock = !showBlock" class="cj-btn-price f14 n-btn center">{{!showBlock ? $t("m.checkprice") : $t('m.buy')}}</el-button>
            </div>
            <div class="cjs-icons">
                <img class="cjs-icon-right" src="../../assets/images/coinb.png" alt="">
                <img class="cjs-icon-left" v-if="coinType.icon" :src="coinType.icon" alt="">
            </div>
        </div>

        <div class="flex cjs-bottom-block">
            <div class="block cjs-data-block">
                <div>
                    <div class="tcolor fw">{{$t('m.data')}}</div>
                    <span class="f12 gcolor">CJS/{{coinType.name | uppercase}}</span>
                </div>
                <div class="cjs-bb-hd" :class="{m16: !isMobile}">
                    <div class="flex sb f14" >
                        <span class="gcolor">{{$t('m.price')}}</span>
                        <span class="tcolor fw">{{(cjss.price || 0)}}</span>
                    </div>
                    <!-- <div class="flex sb f14 price-line" >
                        <span class="gcolor">{{$t('m.24changeratio')}}</span>
                        <span class="lcolor">+1.09%</span>
                    </div> -->
                </div>
                

                <div :class="`${isMobile ? 'flex sa' : ''} cjs-bb-bd`" >
                    <!-- <div class="f12 m16">
                        <span  class="gcolor">{{$t('m.24trannum')}}</span>
                        <div class="tcolor fw">¥898989</div>
                    </div> -->

                    <div class="f12 m16">
                        <span  class="gcolor">{{$t('m.ltggl')}}</span>
                        <div class="tcolor fw">{{ cangongyin}}CJS</div>
                    </div>
                    <div class="f12 m16">
                        <span class="gcolor">{{$t('m.zfxl')}}</span>
                        <div class="tcolor fw">{{(cjss.supply || 0) | fix(4)}}CJS</div>
                    </div>
                </div>


            </div>

            <div class="flex1 re switch-block">
                <TrendChart :class="{active: showBlock}" v-if="!isMobile" >
                    <div class="kj-pager">
                        <span class="kj-ra" @click="showBlock = !showBlock"></span>
                    </div>
                </TrendChart>
                <div class="block buy-block" :class="{active: !showBlock}" >
                    <div>
                        <div class="flex sb">
                            <span class='tcolor fw'>{{$t('m.buy')}}</span>
                            <div class="f14 right fuper">
                                <span class="gcolor" style="paddingRight: 30px">{{$t('m.avail') + useraccount}}{{coinType.name | uppercase}}</span>
                                <router-link class="tcolor cp" :to="`/wallet?coin=${coinType.name}&type=deposit`">{{$t('m.cbii')}}</router-link>
                                <span v-if="!isMobile" class="tcolor cp" style="paddingLeft: 10px" @click="recordHandle">{{$t('m.buyrecord')}}</span>
                            </div>
                        </div>
                        <span class="f12 gcolor">{{$t('m.buycjs')}}</span>
                    </div>
                    <div class="buy pt16">
                        <div class="tcolor f12 fw">{{$t('m.trannum')}}</div>
                        <div class="b-num flex m16 vc">
                            <div class="tcolor f12 flex  sb b-num-bk block-input" :class="{flex1: isMobile}">
                                <input type="number" v-model="inputValue" class="tcolor f12">
                                <span>{{coinType.name | uppercase}}</span>
                            </div>
                            <div>
                                <div>
                                    <span class="b-equla tcolor">
                                        ≈
                                    </span>
                                    <span class="tcolor fw">
                                        {{inputcjsvalue}}
                                    </span>
                                    <span class="tcolor f12">
                                        CJS
                                    </span>
                                </div>
                                <!-- <div class="gcolor f12 b-rmb">¥9.90</div> -->
                            </div>
                        </div>
                        <div class="b-slider">
                            <div class="b-slider-box">
                                <el-slider v-model="sliderValue" :min=0 :max="sliderMax" :step=1></el-slider>
                            </div>
                            <div class="b-slider-text flex sb f14 gcolor">
                                <span>0{{coinType.name | uppercase}}</span>
                                <span>{{sliderMax}}{{coinType.name | uppercase}}</span>
                            </div>
                        </div>
                        <div class="b-btns center">
                            <el-button class="cj-btn-price f14 n-btn center" @click="panelHandle">{{$t('m.sure')}}</el-button>
                           <div class="center f12 pt16">
                                <span v-if="isMobile" class="tcolor cp" style="paddingLeft: 10px" @click="recordHandle">{{$t('m.buyrecord')}}</span>
                           </div>
                        </div>
                    </div>
                    <div class="kj-pager">
                        <span class="kj-ra" @click="showBlock = !showBlock"></span>
                    </div>
                </div>
            </div>
        </div>
         <RightPanel :show.sync="panelShow" id="cjsside">
            <Record  @update:show="val => panelShow=val"/>
        </RightPanel> 
        <Checkin :show.sync='showPanel' v-if="!isMobile" :data="buydata"/>
        <!-- <Pro /> -->
    </div>
</Page>
</template>

<script>
import TrendChart from './trend.vue';
import Checkin from './checkin.vue';
import Pro from '../widgets/pro';
import {mapGetters, mapActions} from 'vuex';
import Big from 'bignumber.js'
import Record from './record'
export default {
    components: {
        Checkin,
        Pro,
        TrendChart,
        Record
    },
    computed: {
        ...mapGetters(['isMobile','manAssetsLists','loginInfo']),
        useraccount :{
            get() {
                let temp = 0;
                if(!util.isEmpty(this.manAssetsLists) && this.coinType.name) {
                    let t = this.manAssetsLists.find(el => el.asset.symbol == this.coinType.name);
                    if(t && t.account && t.account.value) {
                        temp = util.fix(t.account.value, 4);
                    }
                }
                return temp;
            }
        },
        sliderMax:{
            get() {
                if(!this.cjss.supply || !this.cjss.price || !this.useraccount) return 0;
                let t = Big(this.cjss.supply).times(this.cjss.price).toNumber();
                t = Math.min(this.useraccount, t);
                return Math.floor(t);
            }
        },
        inputcjsvalue() {
            if(!this.cjss.price) return 0;
            return Big(this.inputValue || 0).div(this.cjss.price).toFixed(4,1)
        },
        cangongyin() {
            if(util.isEmpty(this.cjss)) return 0;
            return Big(this.cjss.supply).minus(this.cjss.outstanding).toFixed(4,1)
        }
    },
    data() {
        return {
            panelShow: false,
            buydata: {},
            inputValue: 1,
            sliderValue: 1,
            cjschartdata: {
                date: [],
                value: []
            },
            coinType: {
                name:''
            },
            showBlock: !this.isMobile,
            showPanel: false,
            slider: 20,
            coinList: [],
            counterCoin: 0,
            cjss: {}
        }
    },
    created() {
        this.createTicker();
        this.getCJSExchange();
        
        this.getCJSStatics();
    },
   beforeDestroy() {
      this.clearTicker();
  },
    methods: {
        clearTicker() {
          this.ticker && clearTicker(this.ticker);
      },
      createTicker() {
          this.clearTicker();
          setInterval(() => {
               this.getCJSStatics();
          }, 30*1000)
      },
        recordHandle() {
            if(this.isMobile) {
                return this.$router.push('cjsbuyrecord')
            }
            this.panelShow = true
        },
        getAssetIcon() {
            if(util.isEmpty(this.manAssetsLists) || util.isEmpty(this.coinList)) return
            this.manAssetsLists.forEach(el => {
                this.coinList.forEach(li => {
                    if(el.asset.symbol === li.name) {
                        li.icon = el.asset.img
                    }
                })
            })
        },
        check() {
            if(!this.inputValue) return false;
            if(this.useraccount <=0) {
                this.$message.info(this.$t('m.yuebuzu'))
                return false
            }
            return true;
        },
        panelHandle() {
            if(!this.loginInfo.token) {
                return this.$router.push({name:'login',query: {redirect:'cjs'}})
            }
            if(!this.check())return;
            this.buydata = {
                value: this.inputValue,
                balance: this.useraccount,
                coin: this.coinType.name,
                rate: this.cjss.price,
                id: this.coinType.id
            };
            if(this.isMobile) {
                this.$router.push({name: 'buy', query: this.buydata});
                return;
            }
            this.showPanel = true;
        },
        getCJSExchange() {
            request.getCJSExchange()
            .then(res => {
                this.coinList = res.data.list.map(el => {
                    el.icon = '';
                    return el;
                })
                this.coinType = this.coinList[0];
            }) 
        },
        getCJSStatics() {
            request.getCJSStatics()
            .then(res => {
                // for(let i in res.data) {
                //     res.data[i] = util.fromHex(res.data[i], 18)
                // }
                
                this.cjss = res.data;
            })
        },
    },
    watch: {
        inputValue:function(n) {
            if(!util.isEmpty(n) && n <= this.sliderMax) {
                this.sliderValue = Number(n);
            }
            else if(n > this.sliderMax) {
                this.inputValue = this.sliderMax;
            }
        },
        sliderValue: function(n) {
            this.inputValue = n;
        },
        manAssetsLists: {
            deep: true,
            immediate: true,
            handler: function(n) {
                this.getAssetIcon();
            }
        },
        coinList: {
            deep: true,
            immediate: true,
            handler: function(n) {
                this.getAssetIcon();
            }
        },

    }
}
</script>

<style lang="scss">
.cjs-icons img {
    opacity: .4;
}
.cjs-icon-right {
    width: 72px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -10px;
}
.cjs-top-block {
    overflow: hidden;
    .cj-btn-price {
        margin: 20px 0;
    }
}
.cjs-icon-left {
    width: 90px;
    position: absolute;
    bottom: -30px;
    left:16px;
} 
.equal {
    margin: 0 30px;
}
.cjs-data-block {
    .m16>div.tcolor {
        margin-top: 4px;
    }
}

.b-num-bk {
    padding: 0 10px;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    background: #E8F1F5;
    border-radius: 4px;
    margin-right: 16px;
}
.b-slider {
    // padding-left: 10px;
}
.b-btns {
    margin-top: 20px;
}
.b-equla {
    padding-right: 16px;
}
.b-rmb {
    padding-left: 30px
}
.ts .el-slider__bar {
    background-color: #086599;
}
.ts .el-slider__button {
    border-color: #086599
}
.cjs-bb-bd {
   
    border-top: 1px solid #00598228;
}

.pc {
    .cjs-top-block {
        margin: 16px auto;
    }
    .cjs-center-num {
        // transform:translateX(50px)
    }
    .cjs-data-block {
        margin-right: 16px;
        min-width: 245px;
    }
    .cjs-bb-bd {
         height: 190px;
    }
    .switch-block {
        >.block {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transition: transform .3s linear;
            transform: scale(.9) translateX(80px);
            z-index: 99;
            background: #E5EDF3;

        }
        .kj-pager {
            position: absolute;
            top: 46%;
            right: -16px;
            z-index: 100;
            >span {
                height: 30px;
                width: 30px;
                background-size: 8px auto;
                display: inline-block;
                transition: opacity .3s linear;
            }
            >span:hover {
                transition: transform .3s linear;
                transform: scale(1.1);
            }
        }
        >.block.active {
            opacity: 1;
            z-index: 100;
            background: #fefefe;
            transform: scale(1) translateX(0);
            .kj-pager {
                display: none;
                
            }
        }
    }
    .b-slider,.b-num-bk {
        width: 426px;
    }
    
}
.mobile {
    .cjs-bottom-block {
        flex-direction: column;
    }
    .cjs-data-block {
        order: 1;
    }
    .switch-block {
        width: 100%;
        order: 0
    }
    .buy-block {
        margin: 16px 0;
    }
    .cjs-bb-hd {
        width: 80%;
        margin:16px auto;
    }
    .equal {
        margin: 0 16px;
    }
    
}
</style>

