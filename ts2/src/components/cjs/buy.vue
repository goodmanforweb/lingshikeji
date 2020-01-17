<template>
<Page :title="$t('m.cjscenter')" borderLine padding routerBack='/cjs'>
    <div class="cjs flex1">
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
                <div class="gcolor left f13 m16">{{$t('m.ssratio')}}</div>
                <div class="tcolor " >
                    <span class="f30 fw">1.00</span>
                    <span>{{showBlock ? 'ETH' : coinType.toUpperCase()}}</span>
                    <span class="equal">≈</span>
                    <span class="f30 fw">1808080</span>
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

        <div class="block cjs-data-block m16" >
            <div>
                <div class="tcolor fw">{{$t('m.data')}}</div>
                <span class="f12 gcolor">ETH/CJS</span>
            </div>
            <div style="width: 80%;margin:16px auto">
                <div class="flex sb f14" >
                    <span class="gcolor">{{$t('m.price')}}</span>
                    <span class="tcolor fw">¥0.01</span>
                </div>

                <div class="flex sb f14" >
                    <span class="gcolor">{{$t('m.24changeratio')}}</span>
                    <span class="lcolor">+1.09%</span>
                </div>
            </div>

            <div class="flex sa price-line">
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

        <TrendChart :class="{active: showBlock}" ></TrendChart>

    </div>
</Page>
</template>

<script>
import TrendChart from './trend.vue';
export default {
    components: {
        TrendChart
    },
    data() {
        return {
            coinType: 'dai',
            showBlock: true,
            showPanel: false,
            slider: 20
        }
    },
    methods: {
        panelHandle() {
            this.$router.push('checkin');
        }
    }
}
</script>

<style lang="scss">

</style>

