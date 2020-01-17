<template>
<Page :title="$t('m.mykjpool')" padding borderLine>
    <div class="pool">
       <div class="flex pool-area" :class="{v: isMobile}">
            <div class="flex1 block p-left" >
                <div class="cube cube1">
                    <div class="c-tt fw">{{$t('m.hysy')}}</div>
                    <span class="c-tt-desc f12">{{$t('m.ylj')}}</span>
                    <div class="c-num fw m20">
                        <span>CJOY</span>
                        <span class="c-num-text" :style="`${isMobile ? 'fontSize: 16vw' : ''}`">
                            29090.99
                        </span>
                    </div>
                </div>
                <div class="cube">
                    <div class="m20">
                        <div class="c-tt fw ">{{$t('m.propro')}}</div>
                        <span class="c-tt-desc f12">{{$t('m.procheck')}}</span>
                    </div>
                    <div class="c-ball flex">
                        <div class="c-kc flex v fe towrap" :class="{flex1: isMobile}">
                                <div class="c-tt"><{{$t('m.syzl')}}</div>
                                <span :class="`fw ${isMobile ? 'f20' : 'f28'}`">1900454545499</span>
                        </div>
                        <div class="c-ball-water canvas-wrap re">
                            <canvas ref="water"></canvas>
                            <div class="c-ball-water-layer">
                                <img src="../../assets/images/water.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <div class="flex1 flex v p-right" >
            <div class="block flex1 p-right-block1" :class="{m16: isMobile}">
                <div class="flex sb">
                    <div>
                        <div class="c-tt fw">{{$t('m.hubcenter')}}</div>
                        <span class="c-tt-desc f12">{{$t('m.joinclub')}}</span>
                    </div>
                    <div class="xm-num tcolor fw">
                        <span class="f34">4</span>个
                    </div>
                </div>
                <div class="xm-bd flex fwrap">
                    <div class="xm-item tcolor" v-for="(item, idx) in 5" :key="idx">
                        <span class="xm-icon"><img src="../../assets/images/plogo.png" alt=""></span>
                        crytojoy
                    </div>
                </div>
            </div>
            <div class="kjgk fw" >{{$t('m.hygk')}}</div>
            <div class="flex">
                <div class="block flex1 p-right-block2" style="marginRight: 8px;">
                    <div class="kj-icon">
                        <img src="../../assets/images/yxkj.png" alt="">
                    </div> 
                    <div class="kj-i-icon tcolor">
                        <span class="f34">4</span>{{$t('m.tai')}}
                    </div>
                    <span class="f12 gcolor">{{$t('m.exehy')}}</span>
                </div>
                <div class="block flex1 p-right-block3" style="marginLeft: 8px;">
                    <div class="kj-icon">
                        <img src="../../assets/images/sxkj.png" alt="">
                    </div>
                    <div class="kj-i-icon tcolor">
                        <span class="f34">0</span>{{$t('m.tai')}}
                    </div>
                    <span class="f12 gcolor">{{$t('m.shixiaohy')}}</span>
                </div>
            </div>
        </div>
       </div>
    </div>
</Page>
</template>
<script>
import Water from './pool-water.js';
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
    mounted() {
        this.showWater();
    },
    methods: {
        showWater() {
            let wa = new Water(this.$refs.water, '66.99%');
        }
        
    }
}
</script>
<style lang="scss">
.pool {
    .canvas-wrap {
        width: 215px;
        height: 215px;
        flex-shrink: 0;
    }
    .c-ball-water-layer {
        position: absolute;
        top: 3px;
        right: 3px;
        left: 3px;
        bottom: 3px;
        border-radius: 50%;
        overflow: hidden;
        img {
            position: absolute;
            left:0;
            right: 0;
            bottom: 0;
        }

    }
}

.c-tt, .c-num,.c-kc,.kjgk {
    color:#086599
}
.c-tt-desc {
    color:#8E9FA9
}
.kjgk {
    line-height: 35px;
}
.c-num-text {
    font-size: 70px
}
.cube1 {
    border-bottom: 1px solid rgba(199, 194, 194, 0.5)
}
.kj-icon {
    width: 50px;
}
.xm-icon {
    display: inline-block;
    width: 30px;
}
.xm-item {
    white-space: nowrap;
    margin: 16px 16px 0 0;
}
.pc {
    .p-left {
        margin-right: 8px;
    }
    .p-right {
        margin-left: 8px;
    }
    .p-right-block1 {
        margin-bottom: 16px;
    }
}
.mobile {
    .c-kc {
        max-width: 50%;
    }
    .canvas-wrap {
        margin-left: 16px;
        width: 120px;
        height: 120px;
        min-width: 120px;
        min-height: 120px;
        flex-shrink: 0;
    }
}
</style>

