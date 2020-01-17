<template>
<Page :title="$t('m.cjoycz')" borderLine padding  routerBack="/wallet">
    <div class="deposit" :class="{'wallet-sub': isMobile}">
        <div class="tcolor f24 fw de-tt" v-if="!isMobile">{{$t('m.cjoycz')}}</div>
       
       <div :class="`${isMobile ? 're block' :''}`">
           <div :class="`${isMobile ? 'coin-name flex vc' : 'm20'}`">
                <span class="coin-icon" v-if="isMobile">
                    <img  alt="">
                </span>
                <div class="tcolor">
                    <span class="f14">{{$t('m.kyye')}}</span>
                    <div><span class="f40 fw">8989</span><span class="f12">.90</span></div>
                </div>
            </div>

            <div :class="{re: !isMobile}">
                    <div class="de-ercode" :class="{block: !isMobile}">
                    <div class="de-code f12 tcolor">
                        <div class="de-code-wrap">
                            <span>{{$t('m.mydizhi')}}</span>
                            <div class="de-ad">{{this.address}}</div>
                            <canvas id="qrcode" ref="qrcode"></canvas>
                            <div class="center" v-show="!layerShow">
                                <span class="n-btn btn-copy" ref="copyBtn">{{$t('m.')}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <transition name="fade">
                    <div class="de-warn-layer block" v-if="layerShow" v-html="$t('m.czhint')">

                        <div class="center" style='marginTop: 70px'>
                        <span class="n-btn tcolor" @click="layerShow = false">{{$t('m.sure')}}</span>
                        </div>
                    </div>
                </transition>
            </div>
       </div>
       
        <div class="de-hint f12 gcolor" style="marginTop: 20px" v-html="$t('m.czhint2')">
        </div>
    </div>
</Page>
</template>
<script>
import QRCode from "qrcode";
import Clipboard from "clipboard";
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            layerShow: true,
            address: 'sdfhdslkhflsjhafjksadh'
        }
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    mounted() {
        this.createQRCode(this.address);
        this.createCopy();
    },
    methods: {
        createCopy() {
            new Clipboard(this.$refs.copyBtn).on("success", e => {
                this.$message.info(this.$t("ms.copy"));
                e.clearSelection();
            });
        },
        createQRCode(address) {
        QRCode.toCanvas(
            this.$refs.qrcode,
                address,
                {
                width: 237,
                height: 237,
                margin: 0,
                color: {
                    dark: '#086599'
                }
                },
                function(err) {
                if (err) {
                    console.warn("生成二维码出错:(");
                }
                console.log("succ");
                }
            );
        },
    }
}
</script>

<style lang="scss">
.pc {
    .deposit {
        width: 350px
    }
}
.mobile {
    .wallet-sub {
        >.block {
            padding:0;
        }
        .coin-name {
            padding: 16px;
            background:rgba(223,235,241,0.3);
        }
    }
}
.de-ercode {
    position: relative;
    // width: 350px;
    height: 350px;
    #qrcode {
        margin: 16px 0;
        display: block;
    }
}
.de-code-wrap {
    width: 237px;
    margin: 0 auto;
}


.de-warn-layer {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    color:#fff;
    padding: 32px 16px 16px;
    box-sizing: border-box;
    background: rgba(8, 100, 153, 0.5);
    .n-btn {
        display: inline-block;
        line-height: 30px;
        width: 80px;
        text-align: center;
        background:#fff;
        border-radius:4px;
        border: 1px solid transparent;
    }
}
.btn-copy {
    display: inline-block;
    color: #086599;
    border: 1px solid #086599;
    line-height: 30px;
    width: 80px;
    text-align: center;
}
.de-ad {
    word-break: break-all;
    word-wrap: break-word;
}
</style>

