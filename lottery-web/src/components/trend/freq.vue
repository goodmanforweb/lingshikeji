<template>
    <div class="trend-freq" v-loading="hotLoader">
        <template v-if="!isMobile">
            <div class="flex">
                <div class="tf-normal tf-sec">
                <div class="tfn-tt center f18 fma fwb">{{$t('ms.nofreq')}}</div>
                <div class="tfn-bd">
                    <ul class="tf-cirle center">
                        <li  v-for="(el, index) in hot.black" :key="index">
                            <span class="circle ciclegray kt">{{el.Member | makeUp}}</span>
                            <i class="f18 fma">{{el.Score}}</i>
                        </li>
                    </ul>
                    <div class="center nodata" v-if="hot.black.length==0" style="padding-top: 20px">{{$t('ms.norecord')}}</div>
                </div>
            </div>
            <div class="tf-mega  tf-sec">
                <div class="tfn-tt center f18 fma fwb">{{$t('ms.mefreq')}}</div>
                <div class="tfn-bd">
                    <ul class="tf-cirle center">
                        <li  v-for="(el, index) in hot.red" :key="index">
                            <span class="circle ciclered kt">{{el.Member | makeUp}}</span>
                            <i class="f18 fma">{{el.Score}}</i>
                        </li>
                    </ul>
                    <div class="center nodata" v-if="hot.red.length==0" style="padding-top: 20px">{{$t('ms.norecord')}}</div>

                </div>
            </div>
            <div class="tf-pair  tf-sec flex1" >
                <div class="tfn-tt center f18 fma fwb">{{$t('ms.msp')}} </div>
                <div class="tfn-bd">
                    <ul class="pair-list">
                        <li class="flex" v-for="(el, index) in pare.pairs" :key="index">
                            <div class="pair">
                                <span class="circle ciclegray kt"  v-for="(e, idx) in el.Member" :key="idx">{{e | makeUp}}</span>
                            </div>
                            <span class="pair-times f18 fma">{{el.Score}}</span>
                        </li>
                        <li class="center nodata" v-if="pare.pairs.length==0" style="padding-top: 20px">{{$t('ms.norecord')}}</li>

                    </ul>
                </div>

                <div class="tfn-tt tfn-tt2 center f18 fma fwb">{{$t('ms.mccp')}} </div>
                <div class="tfn-bd">
                    <ul class="pair-list">
                        <li class="flex" v-for="(el, index) in pare.consecutiveParis" :key="index">
                            <div class="pair">
                                <span class="circle ciclegray kt"  v-for="(e, idx) in el.Member" :key="idx">{{e | makeUp}}</span>
                            </div>
                            <span class="pair-times f18 fma">{{el.Score}}</span>
                        </li>
                        <li class="center nodata" v-if="pare.consecutiveParis.length==0" style="padding-top: 20px">{{$t('ms.norecord')}}</li>

                    </ul>
                </div>
            </div>
            </div>
        </template>
        <template v-else>
             <div class="tf-tabs">
                 <ul class="fma tf-tab-items" @click="handleTab" ref="tftabs">
                     <li v-html="$t('ms.nftbr')"></li>
                     <li v-html="$t('ms.mftbr')"></li>
                     <li v-html="$t('ms.mcpbr')"></li>
                     <li v-html="$t('ms.mccpbr')"></li>
                 </ul>
                 <div class="tf-tab-cont" ref="tftab">
                     <ul class="tf-cirle center">
                        <li  v-for="(el, index) in hot.black" :key="index">
                            <span class="circle ciclegray kt">{{el.Member | makeUp}}</span>
                            <i class="f18 fma">{{el.Score}}</i>
                        </li>
                        <li class="center nodata" v-if="hot.black.length==0" style="padding-top: 20px">{{$t('ms.norecord')}}</li>

                    </ul>
                    <ul class="tf-cirle center">
                        <li  v-for="(el, index) in hot.red" :key="index">
                            <span class="circle ciclered kt">{{el.Member | makeUp}}</span>
                            <i class="f18 fma">{{el.Score}}</i>
                        </li>
                        <li class="center nodata" v-if="hot.red.length==0" style="padding-top: 20px">{{$t('ms.norecord')}}</li>

                    </ul>
                    <ul class="pair-list">
                        <li class="flex" v-for="(el, index) in pare.pairs" :key="index">
                            <div class="pair">
                                <span class="circle ciclegray kt"  v-for="(e, idx) in el.Member" :key="idx">{{e | makeUp}}</span>
                            </div>
                            <span class="pair-times f18 fma">{{el.Score}}</span>
                        </li>
                        <li class="center nodata" v-if="pare.pairs.length==0" style="padding-top: 20px">{{$t('ms.norecord')}}</li>

                    </ul>
                    <ul class="pair-list">
                        <li class="flex" v-for="(el, index) in pare.consecutiveParis" :key="index">
                            <div class="pair">
                                <span class="circle ciclegray kt"  v-for="(e, idx) in el.Member" :key="idx">{{e | makeUp}}</span>
                            </div>
                            <span class="pair-times f18 fma">{{el.Score}}</span>
                        </li>
                        <li class="center nodata" v-if="pare.consecutiveParis.length==0" style="padding-top: 20px">{{$t('ms.norecord')}}</li>

                    </ul>
                 </div>
             </div>
        </template>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
import util from 'util';
export default {
    data() {
        return {
            normaldata: Array.from({length: 69}).map((el, index) => {
                return {
                    number: Math.floor(Math.random()*70),
                    times:Math.floor(Math.random()*100)
                }
            }),
            hotLoader: false,
            hot: {
                black: [],
                red: []
            },
            pare: {
                pairs: [],
                consecutiveParis: []
            }
        }
    },
    computed: {
        ...mapGetters(['isMobile', 'trendid'])
    },
    mounted() {
        this.isMobile && this.setActiveTab(0);
        this.isMobile && this.setHeight();
    },
    methods: {
        setHeight() {
            const wh = window.innerHeight;
            const mh = document.querySelector('#main').clientHeight;
            const nh = document.querySelector('.jl-nav').clientHeight;
            const xh =  nh + document.querySelector('.record-tit').clientHeight
            

            if(mh + nh < wh) {
                this.$el.style.height = wh - xh + 'px';
            }
        },
        handleTab(e) {
            let target = e.target;
            if(target.tagName != 'LI') return false;
            let targetIndex;
            [...target.parentElement.children].forEach((el, index) => {
                if(el == target) {
                    targetIndex = index;
                }
            })

            if(targetIndex == undefined) return false;

            this.setActiveTab(targetIndex);

        },
        setActiveTab(targetIndex) {
            [...this.$refs.tftabs.children].forEach((el, index) => {
                index == targetIndex ? el.classList.add('active') : el.classList.remove('active');
            });
            [...this.$refs.tftab.children].forEach((el, index) => {
                el.style.display = index == targetIndex ? 'block' : 'none';
            });
        },
        getHotNumberByRoom() {
            this.hotLoader = true;
            util.getHotNumberByRoom({params: {
                room_id: this.trendid,
                num: 50
            }}, this)
            .then(res => {
                if(res.data.code == 0) {
                    let {black, red} = res.data;
                    black = black.length > 50 ? black.slice(0, 50) : black;
                    red = red.length > 50 ? red.slice(0, 50) : red;
                    this.hot = {black, red};
                }
            })
            .catch(err => {
                this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                this.hotLoader = false
            })
        },
        getHotPareByRoom() {
            this.hotLoader = true;
            util.getHotPareByRoom({params: {
                room_id: this.trendid,
                num: 5
            }}, this)
            .then(res => {
                if(res.data.code == 0) {
                    let consecutiveParis = res.data.consecutiveParis.map(el => {
                        el.Member = el.Member ? el.Member.split(',') : [];
                        return el;
                    });
                    let pairs = res.data.pairs.map(el => {
                        el.Member = el.Member ? el.Member.split(',') : [];
                        return el;
                    });
                    this.pare = {
                        consecutiveParis: consecutiveParis.length >5 ? consecutiveParis.slice(0, 5) : consecutiveParis,
                        pairs: pairs.length >5 ? pairs.slice(0, 5) : pairs
                    }
                }
            })
            .catch(err => {
                this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                this.hotLoader = false
            })
        },

    },
    watch: {
        trendid: {
            immediate: true,
            handler: function(n) {
                if(n) {
                    this.getHotNumberByRoom();
                    this.getHotPareByRoom();
                }
            }
        }
    }
}
</script>
<style lang="scss">
.pc {
    .pair-list {
        height: 280px;
    }
}
.trend-freq {
    .tfn-tt {
        color:#7C7565;
        line-height: 48px;
        height: 48px;
        border-bottom:1px solid #A0A0A0;
        border-top:1px solid #A0A0A0;
    }
    .tf-sec:first-of-type {
        border-left: 1px solid  #A0A0A0;

    }
    .tf-sec {
        border-right: 1px solid  #A0A0A0;
    }
    .tf-cirle {
        li {
            display: inline-block;
            text-align: center;
            margin: 10px;
        }
    }
    span.circle {
        display: block;
        width: 33px;
        height: 33px;
        line-height: 33px;
        font-size: 16px;
    }
    .tf-pair {
        min-width: 350px;
        .tfn-tt2{
            margin: 0 16px;
            border-bottom:none;
        }
    }
    .pair-list {
        li {
            margin:16px 0;
            justify-content: center;
            align-items: center;
        }
    }
    .pair {
        position: relative;
        margin-right: 16px;
        span.circle {
            display: inline-block;
        }
        span:first-child {
            margin-right: 16px;
        }
    }
    .pair:after {
        content:'';
        position: absolute;
        top: calc(50% - 2px);
        left: 33px;
        width: 16px;
        height: 4px;
        background-color: #979797

    }
    .tf-tabs {
        position: relative;
        height: 100%;
    }
    .tf-tab-items {
        width: 140px;
        height: 100%;
        background-color: #F6F5F3;
        font-size: 0.22rem;
        text-align: center;
        color:#7C7565;
        font-weight: bold;
        li {
            padding: 30px 4px;
            opacity: 0.47;
            cursor: pointer;
        }
        li.active {
            opacity: 1;
        }
    }
    .tf-tab-cont {
        position: absolute;
        top:0;
        right: 0;
        bottom:0;
        left: 140px;
        overflow-y: auto;
        >ul {
            display: none
        }
    }
}
</style>


