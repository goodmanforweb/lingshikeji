<template>
<Page :title="$t('m.guide')" class="flex v" borderLine padding >
    <div class="guide-right-btn" @click="$router.back();" slot="layer-right-btn" v-if="finishBtn">{{$t('m.finish')}}</div>
    <div class="guide flex flex1 vc hc v re">
        <span v-if="!show" @click="close" class="n-btn re-close">{{$t('m.exitguide')}}</span>

        <div class="guide-banner shadow">
            <div class="gb-hd flex vc">
                <div class="bz active nowrap">
                    <span>1</span>
                    <span class="tcolor">{{$t('m.zbsx')}}</span>
                </div>
                <div class="flex1 bz-line "></div>
                <div class="bz nowrap">
                    <span>2</span>
                    <span class="tcolor">{{$t('m.wkbz')}}</span>
                </div>
                <div class="flex1 bz-line"></div>
                <div class="bz nowrap">
                    <span>3</span>
                    <span class="tcolor">{{$t('m.shkj')}}</span>
                </div>
            </div>
            <div class="gb-bd">
                <el-carousel ref="slider" 
                :height="`${isMobile ? '400px' : '250px'}`" arrow="never" 
                @change="change" indicator-position="none" 
                :loop='false' :autoplay="false">
                    <el-carousel-item key="1">
                        <div class="flex gb sb">
                            <div>
                                <div class="tcolor g-desc1" v-html="guide[0]">
                                    
                                </div>
                                <!-- <div class="f12 gcolor" v-html="$t('m.guide2')">
                                    
                                </div> -->
                            </div>
                            <div>
                                <img style="width: 285px" src="../../assets/images/b2.png" alt="">
                            </div>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item key="2">
                        <div class="flex gb sb">
                            <div class="w340">
                                <div class="tcolor g-desc2" v-html="guide[1]">
                                </div>
                                <!-- <div class="gcolor f12" v-html="$t('m.guide4')">
                                    
                                </div> -->
                            </div>
                            <div>
                                <img style="width: 285px" src="../../assets/images/b1.png" alt="">
                            </div>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item key="3">
                        <div class="flex gb sb">
                            <div class="tcolor w380 g-desc3" v-html="guide[2]">
                            </div>
                            <div>
                                <img class="gd-last-pic" style="width: 236px" src="../../assets/images/b3.png" alt="">
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="kj-pager flex sb" v-if="!isMobile">
                <span class="kj-la" @click="slide('prev')" :class="{prev}"></span>
                <span class="kj-ra" @click="slide('next')" :class="{next}"></span>
            </div>
        </div>
        <div class="kj-pager flex sb m20" v-if="isMobile">
            <span class="kj-la" @click="slide('prev')" :class="{prev}"></span>
            <span class="kj-ra" @click="slide('next')" :class="{next}"></span>
        </div>

        <div v-show="show" v-if="!isMobile" class="finish-btn cj-btn-rw tcolor n-btn center" @click="close">{{$t('m.finishexit')}}</div>
    </div>
</Page>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            prev: false,
            next: false,
            show: false,
            finishBtn:false,
            guide:[]
        }
    },
    computed: {
        ...mapGetters(['isMobile']),
        type() {
            return this.$route.query.type || 'fws';
        },
    },
    methods: {
        guideTextHandle() {
            const arr = this.type == 'fws' ? [1,2,3] : [4,5,6];
            this.guide = arr.map(el => this.$t(`m.guide${el}`))
        },
        change(e) {
            this.prev = e == 0;
            this.next = e == 2;
            [...document.querySelectorAll('.bz')].forEach((el, index) => {
                index == e ? el.classList.add('active') :  el.classList.remove('active');
            });
            this.show = e == 2;
            this.finishBtn = e == 2 ? this.$t('m.finish') : false;
        },
        slide(type) {
            this.$refs.slider[type]();
        },
        close() {
            window.opener=null;window.close();
        }
    },
    watch: {
        type: {
            immediate: true,
            handler:function() {
                this.guideTextHandle();
            }
        }
    }
}
</script>

<style lang="scss">
.guide {
    // padding: 16px;
    position: relative;
    .kj-pager {
        span {
            opacity: 1;
        }
    }
}
.guide-btn-back {
    position: absolute;
    top: 20px;
    right: 20px;
}
.guide-banner {
    background: #fff;
    border-radius: 10px;
    position: relative;
}
.gb {
    padding: 20px;
}
.gb-hd {
    border-radius: 10px 10px 0 0;
    padding: 20px 16px;
    border-bottom:1px solid rgba(25,101,147,.2);
    overflow-x: auto;
}
.bz-line {
    border-bottom: 2px solid #979797;
    height: 1px;
    margin: 0 10px;
}
.bz {
    span {
        vertical-align: middle;
        opacity: .47;
        transition: all .3s linear;
        will-change: font-size
    }
    span:first-child {
        width: 23px;
        height: 23px;
        display: inline-block;
        line-height: 23px;
        background: #086599;
        border-radius: 50%;
        text-align: center;
        color:#fff;
    }
    span:last-child {
        font-size: 12px;
    }
}
.bz.active {
    span {
        opacity: 1;
    }
    span:first-child {
        width: 37px;
        height: 37px;
        line-height: 37px;
    }
    span:last-child {
        font-size: 18px;
    }
}
.prev, .next {
    opacity: .47!important;
} 
.finish-btn {
    margin-top: 30px;
     width: 180px;
    height: 45px;
    line-height: 45px;
}
.pc {
    .w340 {
        width: 340px;
    }
    .w380 {
        width: 380px;
    }
    .guide-banner {
        width: 700px;
    }
    .guide {
        .kj-pager {
            position: absolute;
            top: 50%;
            left:-80px;
            right: -80px;
            z-index: 99;
            span {
                opacity: 1;
            }
        }
    }
}
.mobile {
    .g-desc1, .g-desc2,.g-desc3 {
        padding: 16px;
    }
    .bz {
        span:first-child {
            width: 18px;
            height: 18px;
            font-size: 12px;
            line-height: 18px;
        }
        span:last-child {
            font-size: 12px;
        }
    }
    .bz.active {
        span:first-child {
            width: 20px;
            height: 20px;
            font-size: 12px;
            line-height: 20px;
        }
        span:last-child {
            font-weight: bold;
            font-size: 14px;
        }
    }

    .guide-banner {
        width: 100%;
    }
    .guide {
        .kj-pager {
            width: 120px;
        }
    }
    .gb {
        font-size: 14px;
        flex-direction: column;
        >div:first-of-type {
            order:2
        }
        >div:last-of-type {
            order: 1;
            text-align: center;
            img {
                width: 80%!important;
            }
            .gd-last-pic {
                width: 60%!important
            }
        }
    }
    .bz-line {
        margin: 0 6px;
    }
}
</style>

