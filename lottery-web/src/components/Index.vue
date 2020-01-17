<template>
    <div class="trecord">
        <div class="tr-tt center">
            <div class="tlogo center">                
                <span><img src="../assets/images/tlogo.png" alt=""></span>
            </div>
            <div class="tr-tra center"></div>
            <div >
                <div class="tr-tt2 f24" v-html="$t('ms.welcome')"></div>
                <span class="f18 tr-tt3" v-html="$t('ms.jacket')"></span>
            </div>
        </div>
        <ul class="tr-numbers center kt">
            <li v-for="(num, index) in trnumbers" :key="index">{{num}}</li>
        </ul>

        <div class="tr-cards flex" v-loading="preLoader">
            <div class="slider-box" :class="{'swiper-container':!isMobile}" ref="slidebox">
                <div :class="{'swiper-wrapper':!isMobile}" ref="game">
                    <div class="tr-card" :class="{'swiper-slide':!isMobile}" v-for="(card, index) in cards" :key="index">
                        <div class="trc-tt clearfix fmdc">
                            <span class="fl">{{card.info}}</span>
                            <!-- <span class="fr">{{$t('ms.betting')}}</span> -->
                        </div>
                        <div class="trc-bd flex">
                            <div class="trc-game fmdc">
                                <div class="trcg-name f18">{{$t('ms.game')}}</div>
                                <div class="trcg-nums kt" v-for="(c, i) in card.record" :key="i">
                                    <i v-for="(cc, ii) in c.no.split('')" :key="ii">{{cc}}</i>
                                </div>
                            </div>
                            <div class="trc-status fmdc">
                                <div class="trcg-name f18">{{$t('ms.status')}}</div>
                                <div class="trcg-nums kt" v-for="(c, i) in card.record" :key="i">
                                    <i v-for="(cc, ii) in ($i18n.locale == 'zh' ? gameStateConfig[c.status] : c.status).split('')" :key="ii">{{cc}}</i>
                                </div>
                            </div>
                            <div class="trc-arrival">
                                <div class="trcg-name f18 fmdc">{{$t('ms.arrival')}}</div>
                                <div v-for="(c, i) in card.record" :key="i" class="kt">
                                    <span class="circle ciclegray" v-for="(k, ii) in ['ONE', 'TWO','THREE', 'FOUR', 'FIVE']" :key="ii">{{c.record[k] || '?'}}</span>
                                    <span class="circle ciclered">{{c.record.MEGA || '?'}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="trc-ft fmdc">
                            <i><img src="" alt=""></i>
                            <span>{{$t('ms.passengers')}}:   <i class="kt">{{ card.man}}</i>   </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="slider-arrows flex" v-if="!isMobile" ref="slidearrow">
                <div class="arrow arrow-left" ><i class="el-icon-arrow-left"></i></div>
                <div class="arrow arrow-right" ><i class="el-icon-arrow-right"></i></div>
            </div>
        </div>
        <div class="tr-login center">
            <div>
                <a v-if="!loginInfo.token" @click="loginHandler"><el-button class="cj-login-btn" :loading="loginLoader"><img src="../assets/images/ff.png" alt="">{{$t('ms.login')}}</el-button></a>
                <router-link v-else :to="{path: `/board/${activeroom.id}/game`}"><el-button class="cj-login-btn">{{$t('ms.enter')}}</el-button></router-link>
            </div>
        </div>
        <div class="t-bigbuilid center">
            <img src="../assets/images/bigbuild.png" alt="">
        </div>
    </div>
</template>
<script>
import mixin from './mixins';
import logintool from './mixins/login';
import {mapGetters, mapActions} from 'vuex';
import util from 'util';
import Big from 'bignumber.js';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
export default {
    data() {
        return {
            trnumbers: '0000000000000'.split(''),
            loginLoader: false,
            preLoader: true,
            cards: [],
            gameStateConfig: {
                BETTING:'投注中',
                DRAWING: '等待开奖',
                ACCEPTING: '兑奖中',
                CLAIMING: '已开奖'
            },
        }
    },
    mixins:[mixin, logintool],
    computed: {
        ...mapGetters(['isMobile', 'loginInfo' ,'roomList', 'issueList', 'activeroom'])
    },
    created() {
        this.getTotalGamePool();
        this.checkQueryLogin();
    },
    beforeDestroy() {
        this.swiper && this.swiper.destroy();
    },
    methods: {
        ...mapActions(['getIssueList']),
        loginHandler() {
            this.loginLoader = true;
            this.login().finally(() => {
                this.loginLoader = false;
            })
        },
        initSlider() {
            this.swiper = new Swiper('.swiper-container',{
                // autoplay: 5000,
                speed: 1000,
                autoplayDisableOnInteraction: false,
                loop: true,
                simulateTouch: false,
                centeredSlides: true,
                slidesPerView: 2,
                prevButton: '.arrow-left',
                nextButton: '.arrow-right',
                onInit: function(swiper) {
                    swiper.slides[2].className = "swiper-slide swiper-slide-active";
                },
                breakpoints: {
                    668: {
                        slidesPerView: 1,
                    }
                }
            });
        },
        preHandleIssue() {
            this.preIssueList = {};
            this.roomList.forEach(el => {
                this.preIssueList[el.id] = [];
                this.getIssueLists(el.id);
            });
        },
        getIssueLists(room_id) {
            this.preLoader = true;
            this.getIssueList({params: {
                    room_id,
                    size: 2,
                }, ctx: this})
                .then(res => {
                    this.preIssueList[room_id] = res;
                    this.handleShowCardData.call(this, room_id);
                })
                .finally(() => {
                    this.preLoader = false;
                })
        },
        handleShowCardData(room_id) {
            let t = [];
            this.roomList.forEach(el => {
                this.preIssueList[el.id].forEach(el => {
                    el.no = util.makeUp(el.no, 4);
                });
                t.push({
                    info: el.name,
                    record: this.preIssueList[el.id],
                    man: this.preIssueList[el.id].reduce((prev,next) => {
                        return prev + next.person_num
                    }, 0)
                })
            });

            this.cards = t;
        },
        getTotalGamePool() {
            util.getTotalGamePool({}, this)
            .then(res => {
                if(res.data.code == 0) {
                    if(res.data.record) {
                        let tt = Big(res.data.record.balance).div(100).toNumber();
                        tt = Math.floor(tt)+ '';
                        if(tt.length < 12) {
                            tt = util.makeUp(tt, 12);
                        }
                        this.trnumbers = tt.split('');
                    }
                }
            })
            .catch(err => {
                this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {})
        },
        move(type) {
            this.slide.move(type);
        },
    },
    watch: {
        roomList: {
            immediate: true, 
            deep: true,
            handler: function(n) {
                if(!util.isEmpty(n)) {
                    this.preHandleIssue(n);
                    this.preLoader = false;
                }
                
            }
        },
        cards: {
            deep: true,
            handler: function() {
                !this.isMobile && this.$nextTick(() => {
                    this.initSlider();
                })
            }
        }
    }
}
</script>

<style lang="scss">
.pc {
    .trecord {
        height: 1147px;
        // height: 100vh;
        // overflow-y: auto;
        margin-bottom: -10px;
    }
    .t-bigbuilid {
        // min-height: 347px;
    }
    .tr-cards {
        height: 255px;
        position: relative;
        .tr-card.disable {
            opacity: 0.4;
            transform: scale(0.8);
        }
        .slider-arrows {
            z-index: 99;
            position: absolute;
            top:40%;
            left:-60px;
            right:-60px;
            justify-content: space-between
        }
        .arrow {
            width: 40px;
            height: 40px;
            line-height: 40px;
            color:#fff;
            background-color: rgba(0,0,0,.3);
            border-radius: 50%;
            text-align: center;
            cursor: pointer;
        }
        .arrow:hover {
            background-color: #000;
            font-weight: bolder;
        }

    }
    .trc-bd {
        height: 115px;
    }
    .slider-box {
        max-width: 1100px;
        overflow: hidden;
    }
    .swiper-slide {
        height: auto!important;
        transition: transform 1.0s linear;
        transform: scale(0.8);
        opacity: .47;
    }
    .swiper-slide-active,.swiper-slide-duplicate-active {
        z-index: 1002;
        transform: scale(1);
        opacity: 1;
    }

}
.tr-tt {
    padding-top: 32px;
}
.tr-tra {
    height: 21px;
    background: url(../assets/images/tra.png) no-repeat center;
    background-size: contain;
}
.tr-tt2 {
    position: relative;
    top: -24px;
}
.tr-tt3 {
    position: relative;
    top: -24px;
}
.tlogo {
    background: url(../assets/images/flysmoketop.png) no-repeat right center;
    background-size: 25%;
    padding: 32px 0;
    img {
        width: 64px;
    }
}
.tr-numbers {
    margin: 64px 0;
    li {
        margin: 0 4px;
        display: inline-block;
        width: .5rem;
        border-radius: 4px;
        background-color: #fff;
        height: 0.83rem;
        line-height: .83rem;
        text-align: center;
        font-size: .64rem;
        overflow: hidden;
        position: relative;
    }
    li:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        word-break: break-all;
        background-color: #fff;
    }
    li:before {
        margin-top: -670px;
        animation: letter1 1s 0.1s forwards;
    }
    li:nth-child(1):before{
        content: "1792036815";
    }
    li:nth-child(2):before{
        content: "2492034815";
    }
    li:nth-child(3):before{
        content: "3593036835";
    }
    li:nth-child(4):before{
        content: "4392036818";
    }
    li:nth-child(5):before{
        content: "5292036811";
    }
    li:nth-child(6):before{
        content: "6192636812";
    }
    li:nth-child(7):before{
        content: "7092736813";
    }
    li:nth-child(8):before{
        content: "8792836814";
    }
    li:nth-child(9):before{
        content: "9792936816";
    }
    li:nth-child(10):before{
        content: "1079203617";
    }
    li:nth-child(11):before{
        content: "1171206818";
    }
    li:nth-child(12):before{
        content: "1292036819";
    }

    @-webkit-keyframes letter1 {
        from {
            margin-top: -670px;
        }
        to {
            margin-top: 70px;
        }
    }
    
}
.tr-cards {
    margin-bottom: 48px;
    justify-content: center;
}

.tr-card,.swiper-slide {
    box-sizing: border-box;
    width: 470px;
    min-width: 470px;
    padding: 0 16px;
    color:#fff;
    border-radius: 6px;
    background-color: #000;
    // margin: 0 10px;
    position: relative;
    overflow: hidden;
    border-top: 10px solid rgba(255,255,255,.2);
}
.trc-tt {
    line-height: 48px;
    font-size: 24px;
    padding-top: 4px;
}
.mobile {
    .trc-tt {
    padding-top: 2px;
}
}
.trc-ft {
    line-height: 48px;
}
.trc-bd {
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 16px 0;
    border-top: 1px solid rgba(255,255,255,.2);
    border-bottom: 1px solid  rgba(255,255,255,.2);
}
.trcg-name {
    margin-bottom: 12px;
}
.trc-status {
    .trcg-nums{
        text-transform: uppercase
    }
}
.trcg-nums {
    margin-bottom: 10px;
    i {
        display: inline-block;
        width: 16px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        font-size: 24px;
        color:#fff;
        // font-weight: bold;
        position: relative;
        margin: 1px;
    }
    i:after {
        content:'';
        position: absolute;
        bottom:0;
        left:0;
        right:0;
        height: 1px;
        background-color: #fff;
    }
}
.fmdc .trcg-nums:last-of-type {
    i {
        color:#565656
    }
    i:after {
        background-color: #565656
    }
}
.trc-arrival {
    span {
        width: 33px;
        height: 33px;
        line-height: 33px;
        display: inline-block;
        margin: 3px 2px;
    }
}
.tr-login {
    button span {text-transform: capitalize;}
    font-size: 0.32rem;
    // padding-bottom: 80px;
    a {
        cursor: pointer;
    }
    p {
        img {
            width: 2rem
        }
    }
}
.t-bigbuilid {
    img {
        width: 100%;
        vertical-align: middle
    }
}

button.cj-login-btn {
    border-color:var(--textcolor);
    background-color: var(--textcolor);
    color:#fff;
    font-weight: bolder;
    font-size: 18px;
    width: 150px;
    img {
        vertical-align: middle;
        width: 14px;
        padding-right: 10px;
    }
}

.flying {
    animation: fly-in-left 1s 0s ease-in-out forwards;
    will-change: transform;
    display: inline-block;
    margin: 0 auto;
    transition: transform .3s ease-in-out;
}

@keyframes fly-in-left {
    0% {
        transform: translateX(-1500px);
    }
    50% {
        transform: translateX(-700px);
    }
    100% {
        transform: translateX(0px);
    }
}






</style>


