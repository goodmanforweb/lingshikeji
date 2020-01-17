<template>
<Page :title="$t('m.cjscenter')" borderLine padding routerBack='/cjs'>
    <div class="cjs flex1">
        <div class="block cjs-top-block re">
            <div>
                <div class="flex sb">
                    <span class="tcolor fw">{{$t('m.buycjs')}}</span>
                </div>
                <span class="gcolor f12">
                    {{`CJS/${(d.coin).toUpperCase()}`}}
                </span>
            </div>
            <div class="center">
                <div class="gcolor left f13 m16">{{$t('m.ssratio')}}</div>
                <div class="tcolor " >
                    <span class="f30 fw">1.00</span>
                    <span>CJS</span>
                    <span class="equal">≈</span>
                    <span class="f30 fw">{{cjss.price || 0}}</span>
                    <span>{{`${(d.coin).toUpperCase()}`}}</span>
                </div>
                <el-button @click="buy" class="cj-btn-price f14 n-btn center">{{$t('m.buy')}}</el-button>
            </div>
            <div class="cjs-icons">
                <img class="cjs-icon-right" src="../../assets/images/coinb.png" alt="">
                <img class="cjs-icon-left" v-if="coin.icon" :src="coin.icon" alt="">

            </div>
        </div>

        <div class="block cjs-data-block m16" >
            <div>
                <div class="tcolor fw">{{$t('m.data')}}</div>
                <span class="f12 gcolor">CJS/{{d.coin | uppercase}}</span>
            </div>
            <div style="width: 80%;margin:16px auto">
                <div class="flex sb f14" >
                    <span class="gcolor">{{$t('m.price')}}</span>
                    <span class="tcolor fw">{{cjss.price || 0}}</span>
                </div>

                <!-- <div class="flex sb f14" >
                    <span class="gcolor">{{$t('m.24changeratio')}}</span>
                    <span class="lcolor">+1.09%</span>
                </div> -->
            </div>

            <div class="flex sa price-line">
                <!-- <div class="f12 m16">
                    <span  class="gcolor">{{$t('m.24trannum')}}</span>
                    <div class="tcolor fw">¥898989</div>
                </div> -->

                <div class="f12 m16">
                    <span  class="gcolor">{{$t('m.ltggl')}}</span>
                    <div class="tcolor fw">{{cangongyin}}CJS</div>
                </div>
                <div class="f12 m16">
                    <span class="gcolor">{{$t('m.zfxl')}}</span>
                     <div class="tcolor fw">{{(cjss.supply || 0) | fix(4)}}CJS</div>
                </div>
            </div>

        </div>

        <TrendChart :class="{active: showBlock}" ></TrendChart>

    </div>
</Page>
</template>

<script>
import TrendChart from './trend.vue';
import {mapGetters, mapActions} from 'vuex';
import Big from 'bignumber.js'
export default {
    components: {
        TrendChart
    },
    data() {
        return {
            coinType: 'dai',
            showBlock: true,
            showPanel: false,
            slider: 20,
            cjss: {},
            coinList: [],
            coin: {}
        }
    },
    computed:{
         ...mapGetters(['isMobile','manAssetsLists']),
        d() {
            return this.$route.query;
        },
        cangongyin() {
            if(util.isEmpty(this.cjss)) return 0;
            return Big(this.cjss.supply).minus(this.cjss.outstanding).toFixed(4,1)
        }
    },
    created() {
        this.getCJSStatics()
        this.getCJSExchange();
    },
    methods: {
        getAssetIcon() {
            if(util.isEmpty(this.manAssetsLists) || util.isEmpty(this.coinList)) return
            this.manAssetsLists.forEach(el => {
                this.coinList.forEach(li => {
                    if(el.asset.symbol === li.name) {
                        li.icon = el.asset.img
                    }
                })
            })
            this.coin = this.coinList.find(el => el.name === this.d.coin)
        },
        buy() {
             this.$router.push({name: 'checkin', query: this.$route.query});
        },
        getCJSExchange() {
            request.getCJSExchange()
            .then(res => {
                this.coinList = res.data.list.map(el => {
                    el.icon = '';
                    return el;
                })
            }) 
        },
        getCJSStatics() {
            request.getCJSStatics()
            .then(res => {
                
                this.cjss = res.data;
            })
        },
    },
    watch: {
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

</style>

