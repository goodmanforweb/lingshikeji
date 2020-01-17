<template>
    <div class="sgame jl-index">
        <div class="sg-hd">
            <ul class="flex xx-tab" @click="changeTab">
                <li v-for="(tab, index) in tabs" :key="index" :class="{active: tab.active}">{{tab.name}}</li>
            </ul>
        </div>
        <div class="sg-cont" ref="panes">
            <div class="sg-pane">
                
                <div class="cl-picker">
                    <div class="cl-picker-num">
                        <div class="clp-tit flex kt">
                            <span>Ticket</span>
                            <span>NO.{{currentIssue.no}}</span>
                        </div>
                        <div class="clp-tbd flex">
                            <div class="clp-pick">
                                <span class="clp-num-tit cm" v-html="$t('ms.pfn')"></span>
                                <div class="clp-nums" @click="picker($event, 'normal')">
                                    <i v-for="(num, index) in normalnumbers" :key="index" :class="{active: num.state}">{{num.num}}</i>
                                </div>
                            </div>
                            <div class="clp-line"></div>
                            <div class="clp-mega">
                                <span class="clp-num-tit cm">{{$t('ms.mega')}}</span>
                                <div class="clp-nums" @click="picker($event, 'mega')">
                                    <i v-for="(num, index) in meganumbers" :key="index" :class="{active: num.state}">{{num.num}}</i>
                                </div>
                                <div class="clp-mega-btn">
                                    <span class="btn-rec btn-quick" @click="quickPick">
                                        {{$t('ms.qp')}}
                                    </span>
                                    <span class="btn-rec btn-rubish" @click="clear">
                                        <img src="../assets/images/rubish.png" alt="">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cl-picker-mount">
                        <div class="clp-tit flex kt">
                            <span>Payment</span>
                        </div>
                        <div class="clp-tbd flex">
                            <div class="clp-rate">
                            <div class="clp-rate-amount">
                                <span class="cm">
                                    {{$t('ms.payment')}}
                                </span>
                                <span class="kt">{{payment}}</span>
                                <sub class="kt">JLT</sub>
                                </div>
                                <div class="clp-rate-b flex">
                                    <span  class="cm">{{$t('ms.rate')}}</span>
                                    <el-slider class="flex1" v-model="rate" :min='1' :max='active.max_rate || 100' :step='1'></el-slider>
                                </div>
                            </div>
                            <div class="clp-bet center">
                                <!-- <div class="btn-round" @click="buy" v-loading="betLoader">
                                    BET NOW
                                </div> -->
                                <el-button class="btn-round" @click="buy" :loading="betLoader" :disabled="currentIssue.status != 'BETTING'">
                            {{$t('ms.bn')}}
                                </el-button>
                                <div class="clp-bet-hint f14 fma">
                                    <i >{{$t('ms.avail')}}</i>
                                    <i >:{{wallet | currency}}</i>
                                    <i >JLT</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sg-pane">
                <div class="cl-trend" >
                    <div class="cl-trend-tit">
                       <router-link to="/trend/normal">
                            <el-tooltip class="item" ref="tip"   effect="dark"  :content="$t('ms.clickseemore')" placement="right-start">
                                <span>
                                    <img src="../assets/images/trend.png" alt="">
                                    <span>{{$t('ms.trend')}}</span>
                                </span>
                            </el-tooltip>
                        </router-link>
                    </div>

                    <div class="trend-block normal">
                        <div class="tb-tt center">{{$t('ms.hotnumber')}}</div>
                        <div class="tb-wrap">
                            <template v-if="hot.black.length>0">
                                <div class="tb-row"  v-for="(b,idx) in hot.black" :key="idx">
                                    <span class="circle ciclegray kt">{{b.Member | makeUp}}</span>
                                    <span :style="`width:${b.ch || b.Score}px`"></span>
                                    <span>{{b.Score}}</span>
                                </div>
                            </template>
                            <div v-else class="center nodata">{{$t('ms.norecord')}}</div>
                        </div>
                    </div>
                    <div class="trend-block mege">
                        <div class="tb-tt center">{{$t('ms.smega')}}</div>
                        <div class="tb-wrap">
                            <template v-if="hot.red.length>0">
                                <div class="tb-row" v-for="(b,idx) in hot.red" :key="idx">
                                    <span class="circle ciclered kt">{{b.Member | makeUp}}</span>
                                    <span :style="`width:${b.ch || b.Score}px`"></span>
                                    <span>{{b.Score}}</span>
                                </div>
                            </template>
                            <div v-else class="center nodata">{{$t('ms.norecord')}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from './mixins/game';

export default {
    data() {
        return {
            activeName: 'game',
            tabs: [
                {name: this.$t('ms.gamechoosenumber'), active: true}, 
                {name: this.$t('ms.hotnumbers'), active: false}
                ]
        }
    },
    mounted() {
        this.showTab(0);
    },
    mixins: [mixin],
    methods: {
        changeTab(e) {
            let target = e.target;
            if(target.tagName != "LI") return false;
            let targetIndex = null;
            [...target.parentElement.children].forEach((el,index) => {
                if(el == target) {
                    targetIndex = index;
                    return false;
                }
            });

            if(targetIndex == null) return false;
            this.showTab(targetIndex);
            targetIndex == 1 && !localStorage.getItem('isfirsttip') && this.$nextTick(() => {
                this.handleTip();
            })
        },
        showTab(targetIndex) {
            //tabs
            this.tabs.forEach((el, index) => {
                el.active = index == targetIndex;
            });
            //panes
            [...this.$refs.panes.children].forEach((el, index) => {
                el.style.display = index == targetIndex ? 'block' : 'none'
            });
        }
    }
}
</script>


<style lang="scss">
.sgame.jl-index {
    background-color: #fff
}
ul.xx-tab {
            text-transform: capitalize;
            margin: 10px 0;
            padding: 0;
            justify-content: space-around;
            li {
                padding: 3px 8px;
                color: #D3D3D3;
                cursor: pointer;
            }
            li.active {
                color:var(---textcolor);
                position: relative;
            }
            li.active:after {
                content:'';
                position: absolute;
                bottom: 0px;
                right:8px;
                width: 16px;
                height: 2px;
                background-color: var(--textcolor)
            }
        }
.sgame {
    .sg-hd {
        
    }
    .sg-pane {
        display: none
    }
    .cl-trend {
        border-top: 10px solid var(--blockbgcolor)
    }
}
</style>

