<template>
    <div class="klass flex" >
        <div class="cl-trend" v-if="!isMobile">
            <div class="cl-trend-tit">
                <router-link to="/trend/normal">
                    <el-tooltip class="item" ref="tip"   effect="dark"  :content="$t('ms.clickseemore')" placement="right-start">
                        <span>
                            <img src="../../../assets/images/trend.png" alt="">
                            <span>{{$t('ms.trend')}}</span>
                        </span>
                    </el-tooltip>
                </router-link>
            </div>

            <div class="trend-block normal">
                <div class="tb-tt center">{{$t('ms.hotnumber')}}</div>
                <div class="tb-wrap kt">
                    <template v-if="hot.black.length>0">
                        <div class="tb-row"  v-for="(b,idx) in hot.black" :key="idx">
                            <span class="circle ciclegray">{{b.Member | makeUp}}</span>
                            <span :style="`width:${b.ch || b.Score}px`"></span>
                            <span>{{b.Score}}</span>
                        </div>
                    </template>
                    <div v-else class="center nodata">{{$t('ms.norecord')}}</div>

                </div>
            </div>
            <div class="trend-block mege">
                <div class="tb-tt center">{{$t('ms.smega')}}</div>
                <div class="tb-wrap kt">
                     <template v-if="hot.red.length>0">
                        <div class="tb-row" v-for="(b,idx) in hot.red" :key="idx">
                            <span class="circle ciclered">{{b.Member | makeUp}}</span>
                            <span :style="`width:${b.ch || b.Score}px`"></span>
                            <span>{{b.Score}}</span>
                        </div>
                    </template>
                    <div v-else class="center nodata">{{$t('ms.norecord')}}</div>
                </div>
            </div>
        </div>
        <div class="cl-board">
            <div class="cl-last center">
                <div class="howtoplay f18" v-if="!isMobile">
                    <router-link :to="{path: 'rule'}">
                        <img src="../../../assets/images/help.png" alt="">
                        <span>{{$t('ms.howtoplay')}}</span>
                    </router-link>
                </div>
                <template v-if="issueList.length > 1">
                    <div class="cl-last-text">
                    {{$t('ms.ldna')}} <span class="num">{{prevIssue.createtime |format('YY.MM.DD')}} ( NO.{{prevIssue.no}})</span>
                    </div>
                    <ul class="cl-last-num kt">
                        <li class="circle ciclegray" v-for="(k, ii) in ['ONE','TWO','THREE','FOUR','FIVE']" :key="ii" >{{prevIssue.record[k] || '?' | makeUp}}</li><li class="circle ciclered">{{prevIssue.record.MEGA || '?' | makeUp}}</li>
                    </ul>
                </template>
                    <p class="flex past-rule-link">
                        <router-link :to="{path: `/rule/${$route.params.id}`}" v-if='isMobile' class="rule-link">
                            <img src="../../../assets/images/help.png" alt="">
                            <span>{{$t('ms.howtoplay')}}</span>
                        </router-link>
                        <router-link to="/krecord">
                            {{$t('ms.pr')}} >
                        </router-link>
                    </p>
                
                
            </div>

            <div class="cl-btime flex">
                <template v-if="currentIssue.status == 'BETTING' && !cd.show">
                    <div class="cl-btime-text">
                        <div>{{$t('ms.bt')}}</div>
                        <span>{{$t('ms.ndc')}}</span>
                    </div>
                    <div class="cl-btime-time kt">
                        <div class="cl-bt-wrap">
                            <span>
                                <i>{{cd.day | makeUp}}:</i>
                                <i>{{$t('ms.day')}}</i>
                            </span>
                            <span>
                                <i>{{cd.hour | makeUp}}:</i>
                                <i>{{$t('ms.hour')}}</i>
                            </span>
                            <span>
                                <i>{{cd.minutes | makeUp}}:</i>
                                <i>{{$t('ms.min')}}</i>
                            </span>
                            <span>
                                <i>{{cd.seconds | makeUp}}</i>
                                <i>{{$t('ms.sec')}}</i>
                            </span>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="cl-btime-text">
                        <div>{{$t('ms.gs')}}</div>
                    </div>
                    <div class="cl-btime-time">
                        <div class="cl-bt-wrap game-status">
                            {{gamestatustext}}
                        </div>
                    </div>
                </template>
            </div>
            <div class="cl-picker" v-if="!isMobile">
                <div class="cl-picker-num">
                    <div class="clp-tit flex kt">
                        <span>NO.{{currentIssue.no}}</span>
                        <span>Ticket</span>
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
                                    <img src="../../../assets/images/rubish.png" alt="">
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
                            <span>{{payment}}</span>
                            <sub class="kt">JLT</sub>
                            </div>
                            <div class="clp-rate-b flex">
                                <span class="cm">{{$t('ms.rate')}}</span>
                                <el-slider class="flex1" v-model="rate" :min='1' :max='active.max_rate || 100' :step='1'></el-slider>
                            </div>
                        </div>
                        <div class="clp-bet center">
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
            <router-link :to="`/game/${$route.params.id}`" class="entergame center" v-if="isMobile"><div class="btn-round">{{$t("ms.entergame")}}</div></router-link>
        </div>
    </div>
</template>

<script>

import mixin from '../../mixins/game';
export default {
    mixins: [mixin]
}
</script>

<style lang="scss">
    .pc {
        .clp-tit {
            position: absolute;
            top:0;
            left:0;
            width: 37px;
            height:100%;
            line-height: 37px;
            background-color: var(--textcolor);
            color:#fff;
            flex-direction: column;
            align-items: center;
            justify-content:  space-between;
            padding: 30px 0 20px;
            box-sizing: border-box;
            span:last-child {
                opacity: .2;
                display: block;
            }
            span {
                transform-origin: center center;
                transform: rotate(-90deg);
            }
        }
        .clp-rate-b {
            width: 250px;
        }
        .trend-block {
            min-height: 293px;
        }
        .clp-nums {
            i:hover{
                color:#fff;
                border-color: var(--textcolor);
                background-color: var(--textcolor)
            }
        }
        .clp-line {
            width: 1px;
            border-left:1px dashed #9A9A9A;
            margin: 0 16px;
        }
        .clp-mega {
            min-width: 37%;
        }
        .cl-picker-mount {
            .clp-tit {
                padding: 10px 0;
                justify-content: center;
            }
        }
    }
    .btn-rubish {
        img {
            width: 16px;
            vertical-align: middle
        }
    }
    .howtoplay {
        text-align: right;
        border-bottom: 1px solid #D8D8D8;
        padding-bottom: 10px;
        
    }
    .howtoplay,.rule-link {
        img {
            width:16px;
            vertical-align: middle;
        }
        span {
            vertical-align: middle;
        }
    }
    .past-rule-link {
        justify-content: space-around;
        align-items: center;
    }
    .cl-trend {
        width: 139px;
        background-color: #fff;
        padding: 16px 10px;
        overflow: hidden;
    }
    .cl-board {
        background-color: var(--blockbgcolor);
        width: 570px;
        padding: 16px;
        box-sizing: border-box;
    }
    .tb-row {
        padding: 4px 0;
        white-space: nowrap;
        span {
            display: inline-block;
            vertical-align: middle;

        }
        
        span:nth-child(2) {
            height: 7px;
            background-color: var(--textcolor);
            transition: width .3s linear;
            width: 50px;
            // position: relative;
            // i {
            //     float: left;
            //     vertical-align: middle
            // }
            // i:first-child {
            //     transition: width .3s linear;
            //     display: block;
            //     height: 100%;
            //     background-color: var(--textcolor);
            // }
        }
        span:last-child {
            font-family: 'Arial';
            font-size: 12px;
        }
    }
    .trend-block:first-of-type{
        margin-bottom: 32px;
    }
    .cl-trend-tit {
        img {
            width: 30px;
            vertical-align: middle
        }
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px dashed #D8D8D8;
    }
    .tb-tt {
        margin-bottom: 10px;
    }
    .cl-last {
        >p {
            font-family: arial;
            font-size: 14px;
            color:#585858
        }
    }
    .cl-last-text {
        line-height: 32px;
        padding: 8px 0;
    }
    .cl-last-num {
        li {
            width: 50px;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            display: inline-block;
            margin: 2px;
        }
    }
    .cl-btime {
        padding: 32px 0;

        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #D8D8D8;
        border-bottom: 1px solid #D8D8D8;

    }
    .cl-btime-text {
        div {
            color:var(--textcolor);
            font-size: 26px;
        }
        span {
            color: #585858;
            font-family: arial;

        }
    }
    .cl-bt-wrap.game-status {
        text-transform: uppercase;
        font-size: 26px;
    }
    .cl-bt-wrap {
        span {
            display: inline-block;
        }
        i {
            display: block;
        }
        span i:first-child {
            font-size: 36px;
        }
        span i:last-child {
            font-size: 14px;
            font-family: arial;
            color:#585858;
            text-align: center;
        }
    }
    .cl-picker-num,.cl-picker-mount {
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        background-color: #fff;
        padding: 16px 16px 16px 50px;
        margin: 10px 0;
    }
    .cl-picker {
        
    }
    
    .clp-pick{
        // width: 520px;
        // margin-right: 16px;
    }
    
    .clp-num-tit {
        font-family: arial;
    }
    .clp-nums {
        margin-top: 10px;
        i {
            border:1px solid #D0D0D0;
            color:#D0D0D0;
            font-size: 12px;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            display: inline-block;
            font-family: arial;
            margin: 2px;
            cursor: pointer;
        }
        i.active {
            color:#fff;
            border-color: var(--textcolor);
            background-color: var(--textcolor)
        }

    }
    .btn-rec {
        display: inline-block;
    }
    .cl-picker-mount {
        .clp-tbd {
            align-items: center;
            justify-content: space-between;
        }
    }
    .clp-rate-b {
        align-items: center;
        span {
            padding-right: 20px;
        }
    }
    .clp-mega-btn {
        margin-top: 16px;
        .btn-rec {
            padding: 0 10px;
        }
    }
    .clp-rate {
        font-family: arial;
    }
    .clp-rate-amount {

        span:first-child {
            vertical-align: middle;
            padding-right: 8px;
        }
        span:nth-child(2) {
            vertical-align: middle;
            font-size: 30px;
            font-weight: bolder;
        }
        sub {
            font-size: 14px;
        }
    }
    .clp-bet {
        font-family: arial;
        .btn-round {
            text-align: center;
            // width: 105px;
            margin: 0 auto;
        }
    }
    .clp-bet-hint {
        padding-top: 10px;
        color:#7D7D7D
    }
    .clp-rate-b {
        .el-slider__button {
            border-color: var(--textcolor);
            background-color: var(--textcolor);
        }
        .el-slider__bar {
            background-color: #e4e7ed
        }
    }

    

</style>


