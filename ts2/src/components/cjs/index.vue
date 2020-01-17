<template>
<Page :title="$t('m.cjscenter')" borderLine padding >
    <div class="cjs">

        <div class="block cjs-top-block re">
            <div>
                <div class="flex sb">
                    <span class="tcolor fw">{{$t('m.buycjs')}}</span>
                    <div class="f14" v-if="!showBlock">
                        <span class="cp" :class="{tcolor: coinType == 'dai'}" @click="coinType='dai'">DAI</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="cp" :class="{tcolor: coinType == 'pax'}" @click="coinType='pax'">PAX</span>
                    </div>
                </div>
                <span class="gcolor f12">
                    {{
                        showBlock ? 'ETH/CJS' : $t('m.excratio')
                    }}
                </span>
            </div>
            <div class="center">
                <div :class="`gcolor ${isMobile ? 'left f13 m16' : ''}`" >{{$t('m.ssratio')}}</div>
                <div class="tcolor cjs-center-num">
                    <span :class="`${isMobile ? 'f30' : 'f50'} fw`">1.00</span>
                    <span>{{showBlock ? 'ETH' : coinType.toUpperCase()}}</span>
                    <span class="equal">≈</span>
                    <span :class="`${isMobile ? 'f30' : 'f50'} fw`">1808080</span>
                    <span>CJS</span>
                </div>
                <el-button @click="panelHandle" class="cj-btn-price f14 n-btn center">{{$t('m.buy')}}</el-button>
            </div>
            <div class="cjs-icons">
                <img class="cjs-icon-right" src="../../assets/images/coinb.png" alt="">
                <img v-if='showBlock' class="cjs-icon-left" src="../../assets/images/jcoin.png" alt="">
                <img v-else class="cjs-icon-left" src="../../assets/images/jjcoin.png" alt="">
            </div>
        </div>

        <div class="flex cjs-bottom-block">
            <div class="block cjs-data-block">
                <div>
                    <div class="tcolor fw">{{$t('m.data')}}</div>
                    <span class="f12 gcolor">ETH/CJS</span>
                </div>
                <div class="cjs-bb-hd" :class="{m16: !isMobile}">
                    <div class="flex sb f14" >
                        <span class="gcolor">{{$t('m.price')}}</span>
                        <span class="tcolor fw">¥0.01</span>
                    </div>
                    <div class="flex sb f14 price-line" >
                        <span class="gcolor">{{$t('m.24changeratio')}}</span>
                        <span class="lcolor">+1.09%</span>
                    </div>
                </div>
                

                <div :class="`${isMobile ? 'flex sa' : ''} cjs-bb-bd`" >
                    <div class="f12 m16">
                        <span  class="gcolor">{{$t('m.24trannum')}}</span>
                        <div class="tcolor fw">¥898989</div>
                    </div>

                    <div class="f12 m16">
                        <span  class="gcolor">{{$t('m.ltggl')}}</span>
                        <div class="tcolor fw">898989CJS</div>
                    </div>
                    <div class="f12 m16">
                        <span class="gcolor">{{$t('m.zfxl')}}</span>
                        <div class="tcolor fw">898989万CJS</div>
                    </div>
                </div>


            </div>

            <div class="flex1 re switch-block">
                <TrendChart :class="{active: showBlock}" v-if="!isMobile">
                    <div class="kj-pager">
                        <span class="kj-ra" @click="showBlock = !showBlock"></span>
                    </div>
                </TrendChart>
                <div class="block buy-block" :class="{active: !showBlock}" >
                    <div>
                        <div class="flex sb">
                            <span class='tcolor fw'>{{$t('m.buy')}}</span>
                            <div class="f14">
                                <span class="gcolor" style="paddingRight: 30px">{{$t('m.avail')}}1.0000{{coinType | toUpperCase}}</span>
                                <span class="tcolor">{{$t('m.cbi')}}</span>
                            </div>
                        </div>
                        <span class="f12 gcolor">{{$t('m.buycjs')}}</span>
                    </div>
                    <div class="buy m20">
                        <div class="tcolor f12 fw">{{$t('m.trannum')}}</div>
                        <div class="b-num flex m16 vc">
                            <div class="tcolor f12 flex  sb b-num-bk" :class="{flex1: isMobile}">
                                <span>1.0000</span>
                                <span>{{coinType | toUpperCase}}</span>
                            </div>
                            <div>
                                <div>
                                    <span class="b-equla tcolor">
                                        ≈
                                    </span>
                                    <span class="tcolor fw">
                                        10000
                                    </span>
                                    <span class="tcolor f12">
                                        CJS
                                    </span>
                                </div>
                                <div class="gcolor f12 b-rmb">¥9.90</div>
                            </div>
                        </div>
                        <div class="b-slider">
                            <div class="b-slider-box">
                                <el-slider v-model="slider" :min='1' :max="1000" :step="1"></el-slider>
                            </div>
                            <div class="b-slider-text flex sb f14 gcolor">
                                <span>0.0000{{coinType | toUpperCase}}</span>
                                <span>1.0000{{coinType | toUpperCase}}</span>
                            </div>
                        </div>
                        <div class="b-btns center">
                            <el-button class="cj-btn-price f14 n-btn center">{{$t('m.sure')}}</el-button>
                            <div>
                                <span class="gcolor f12"> {{$t('m.fl')}}0.1%</span>
                            </div>
                        </div>
                    </div>
                    <div class="kj-pager">
                        <span class="kj-ra" @click="showBlock = !showBlock"></span>
                    </div>
                </div>
            </div>
        </div>

        <Checkin :show.sync='showPanel' v-if="!isMobile"/>
        <!-- <Pro /> -->
    </div>
</Page>
</template>

<script>
import TrendChart from './trend.vue';
import Checkin from '../widgets/checkin';
import Pro from '../widgets/pro';
import {mapGetters} from 'vuex';
export default {
    components: {
        Checkin,
        Pro,
        TrendChart
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            coinType: 'dai',
            showBlock: this.isMobile,
            showPanel: false,
            slider: 20
        }
    },
    methods: {
        panelHandle() {
            if(this.isMobile) {
                this.$router.push('/buy');
                return;
            }
            
            this.showPanel = true;
        }
    }
}
</script>

<style lang="scss">
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
        transform:translateX(50px)
    }
    .cjs-data-block {
        margin-right: 16px;
        min-width: 245px;
    }
    .switch-block {
        >.block {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transition: transform .3s linear;
            transform: scale(.9) translateX(60px);
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
                opacity: .5;
                transition: opacity .3s linear;
            }
            >span:hover {
                opacity: 1;
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

