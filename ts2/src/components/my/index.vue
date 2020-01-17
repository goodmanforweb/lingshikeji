<template>
  <Page :title="$t('m.clubcenter')" borderLine padding routerBack="/center">
    <div class="my">
       <div class="flex" :class="{v: isMobile}">
            <div class="block my-left" >
                <div>
                    <div class="tcolor">{{$t('m.mydj')}}</div>
                    <span class="f12 tqc">VIP{{$t('m.dj')}}</span>
                </div>
                <div :class="`chart-wrap ${isMobile ? 'flex vc sb' : ''}`">
                    <div class="canvas-wrap re">
                        <canvas ref="level"></canvas>
                        <div class="level-inner flex hc vc">
                            <div class="level-inner-circle flex v hc vc">
                                <div>
                                    <img src="../../assets/images/star.png" alt="">
                                </div>
                                <span class="f14">VIP1</span>
                            </div>
                        </div>
                    </div>
                    <div class="center">
                        <span class="f12 tqc">{{$t('m.jyzhi')}}</span>
                        <div class="tcolor f40 fw">4444</div>
                    </div>
                </div>
            </div>

            <div class="flex1 flex v my-right" :class="{block: isMobile, m16: isMobile}">
                <div class=" my-right-block1" :class="{block: !isMobile}">
                    <div>
                        <div class="tcolor">{{$t('m.mydj')}}</div>
                        <span class="f12 tqc">VIP{{$t('m.dj')}}</span>
                    </div>
                    <ul :class="`flex quanyi ${isMobile ? 'borderLine fwrap vc sb m16' : ''}`">
                        <li >
                            <span class="level-icon"><img src="../../assets/images/tx.png" alt=""></span>
                            <div class="f14 tqc">{{$t('m.mrxzhi')}}</div>
                            <div class="tcolor">
                                <span class="f20 fw">8989</span><span>CJOY</span>
                            </div>
                        </li>
                        <li >
                            <span class="level-icon"><img src="../../assets/images/lp.png" alt=""></span>
                            <div class="f14 tqc">{{$t('m.hytxi')}}</div>
                            <div class="tcolor f20 fw">
                                {{$t('m.kjduih')}}
                            </div>
                        </li>
                        <li >
                            <span class="level-icon"><img class="flag" src="../../assets/images/flag.png" alt=""></span>
                            <div class="f14 tqc">{{$t('m.hyyxin')}}</div>
                            <div class="tcolor f20 fw">
                                {{$t('m.xxhdong')}}
                            </div>
                        </li>
                        <li class="more center">
                            <img src="../../assets/images/more.png" alt="">
                            <div class="f12 tqc">{{$t('m.quanyigx')}}</div>
                        </li>
                    </ul>
                </div>
                <div class="flex flex1">
                    <div class=" center flex1 my-right-block2" :class="{block: !isMobile}">
                        <span  class="my-level-icon"><img src="../../assets/images/hysm.png" alt=""></span>
                        <div class="f14 tqc">{{$t('m.hysm')}}</div>
                    </div>
                    <div class=" center flex1 my-right-block3" :class="{block: !isMobile}">
                        <span class="my-level-icon"><img src="../../assets/images/lpsc.png" alt=""></span>
                        <div class="f14 tqc">{{$t('m.lpsc')}}</div>
                        <span class="f14 tqc">coming soon</span>
                    </div>
                </div>
            </div>
       </div>
       <div>
           广告
       </div>
    </div>
</Page>
</template>
<script>
import Level from './level';
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
    mounted() {
        this.showLevel();
    },
    methods: {
        showLevel() {
            let le = new Level(this.$refs.level, 1);
            le.render();
        }
    }
}
</script>

<style lang="scss">
.my {
    .canvas-wrap {
        width: 180px;
        height: 180px;
        margin: 16px auto;
    }
    .level-inner {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 12;
    }
    .level-inner-circle {
        border-radius: 50%;
        background: #BDD9E0;
        width: 120px;
        height: 120px;
        color:#fff;
        img {
            width: 50px;
        }
    }

}

.level-icon {
    display: inline-block;
    margin: 10px 0;
    img {
        width: 22px;
    }
    .flag {
        width: 20px
    }
}
.more {
    img {
        width: 40px;
    }
}
.my-level-icon {
    width: 47px;
    display: inline-block;
}
.pc {
    .quanyi {
        margin-top: 40px
    }
    .my-left {
        margin-right: 16px;
        width: 240px;
    }
    .my-right-block1 {
        margin-bottom: 16px;
    }
    .my-right-block2 {
        margin-right: 8px
    }
    .my-right-block3 {
        margin-left: 8px;
    }
    .quanyi li {
        flex: 1
    }
}
.mobile {
    .quanyi {
        li {
            width: 50%;
            box-sizing: border-box;
            padding: 16px;
        }
    }
    .my {
        .canvas-wrap {
            width: 120px;
            height: 120px;
        }

        .level-inner-circle {
            width: 70px;
            height: 70px;
            img {
                width: 40px;
            }
        }
    }
}
</style>

