<template>
    <div class="reward-wrap">
        <div class="reward flex v center">
            <div class="close" @click="back"></div>
            <div class="r-tp flex1 flex vc">
                <div class="r-tp-wrap">
                    <div class="h-joy">JOY摇摇乐</div>
                    <div class="h-joy-info htextshadow">
                        <div>{{id}}</div>
                        <template v-if="type">
                            开奖时间剩余：<template v-if="!cd.show">
                                        {{cd.hour | makeUp}}h:{{cd.minutes | makeUp}}:{{cd.seconds | makeUp}}
                                        </template>
                                        <template v-else>
                                            开奖中
                                        </template>
                        </template>
                        <template v-else>
                            已开奖
                        </template>
                    </div>
                    <div class="xiala">
                        <img src="../assets/images/xiala.png" alt="" class="xialabg">
                        <img src="../assets/images/bird.png" class="bird" alt="">
                        <div class="denglong">
                            <img src="../assets/images/denglong.png"  alt="">
                            <div class="denglong-info center">
                                <i>大奖</i>
                                <div>{{djh}}</div>
                            </div>
                        </div>
                        
                        <div class="r-bt-cont flex v">
                        <div class="congr flex1 flex hc vc">
                            <!-- <div class="congr-tt" v-if="cong.sorry">
                                很遗憾 <br> 请继续努力哟
                            </div> -->
                            <div v-if="type">
                                
                                <div class="congr-info">
                                    一大波金币正在来的路上 <br>  请耐心等待 
                                </div>

                                <span class="congr-tt2">
                                    红包编号 {{num}}
                                </span>
                            </div>
                            <div  v-if="!type">
                                <div class="congr-tt"><span>恭喜您摇到</span> <i>{{num}}</i> </div>
                                    <div class="congr-num din">{{value | currency}} HB</div>
                                    <p class="congr-hint">金币将自动存入您的账户内</p>
                                </div>
                            </div>
                            <footer class="congr-fter">
                                <p>CryptoJOY 社区祝您</p>
                                <p>阖家团圆，新春快乐</p>
                            </footer>
                        
                        </div>
                        <div class="re-check center">可至主页“左上角”-“金币中心”查看开奖进度</div>
                    </div>
                    <div class="fire-wrap">
                        <img class="fire" src="../assets/images/fire.png" alt="">
                        您还剩 {{userinfo.rock_cnt}}次摇一摇机会，
                        <br>
                        通过以下方式可以快速获得额外的机会
                    </div>
                    <div class="r-btns flex sb">
                        <div class="r-btn">
                            <router-link to="/wish">塞金币上吉祥树</router-link>
                        </div>
                        <div class="r-btn">
                            <a :href="jump" :target="jump ? '_blank' : ''"> 分享红包喜悦</a>
                            <img class="littletree" src="../assets/images/firetree.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="r-bt center">
                <img src="../assets/images/r1-4.png" alt="">
                <img class="fire" src="../assets/images/fire.png" alt="">
                <router-link :to="{name: 'award', params:{id}}" v-if="!type" ><span>查看获奖榜单</span></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import Big from 'bignumber.js';
import countdown from './minx/countdown';
import util from '../util/util';
export default {
    data() {
        return {
            type: true,
            num: 0,
            value: 0,
            id:0,
            djh: 0
        }
    },
    beforeRouteEnter (to, from, next) {
        if(from.path.indexOf('wish') > -1 || from.path.indexOf('award') > -1 || !from.name) {

        }
        else {
            sessionStorage.setItem('rewardbefore', from.path)
        }
        next();
    },
    mixins: [countdown],
    created() {
        this.setType();
    },
    computed: {
        ...mapGetters(['userinfo','loginInfo', 'latestrecord','hticker']),
        jump() {
            if(!this.loginInfo.token) {
                return null;
            }
            return `./#/poster?inviteid=${this.loginInfo.user.invitecode}&number=${this.userinfo.received || 0}&type=red`
        }
    },
    beforeDestroy() {
        this.ticker && clearInterval(this.ticker);
    },
    methods: {
        back() {
            const wishbefore = sessionStorage.getItem('rewardbefore');
            sessionStorage.removeItem('rewardbefore');

            this.$router.push({path: util.isEmpty(wishbefore) ? '/index' : wishbefore});
        },
        showDetail(list) {
            this.type = list.status == 'WAITTING';
            this.id = list.issue;
            this.getissuedetail(list.issue).then(res => {
                this.djh = res.person_num;
            });
            this.num = list.no;
            //已开奖
            if(!this.type) {
                this.value = Big(list.value).div(100).toNumber();
                //清除开奖剩余倒计时
                this.cdticker && clearInterval(this.cdticker);
                //清除轮询
                this.ticker && clearInterval(this.ticker);
            } 
            //没开奖 轮询
            else {
                this.createTicker();
            }
        },
        createTicker() {
            this.ticker && clearInterval(this.ticker);
            this.ticker = setInterval(() => {
                this.getshakerecord().then(res => {
                    if(res.status != 'WAITTING') {
                        this.showDetail(res);
                    }
                });
                this.id && this.getissuedetail(this.id).then(res => {
                    this.djh = res.person_num;
                });
            }, 1000 * 4);
        },
        setType() {
            const list = this.$route.params.list;
            if(list) {
                this.showDetail(list);
            }
            else {
                this.getshakerecord().then(this.showDetail)
            }
        },
        //主要是显示l 大奖号
        getissuedetail(issue) {
            if(!issue)return;
            this.urlparams = {id: issue};
            return util.getissuedetail({}, this)
            .then(res => {
                if(res.data.code == 0) {
                    delete this.urlparams;
                  return res.data.record;
                }
            })
        },
        getshakerecord() {
            if(!this.$route.params.id)return;
            this.urlparams = {id: this.$route.params.id};
            return util.getshakerecord({}, this)
            .then(res => {
                if(res.data.code == 0) {
                   delete this.urlparams;
                  return res.data.record;
                }
            })
        },
        // checkhaskj(n) {
        //     //issue id
        //     //如果最新一期的issue id 和 本页面的issue id 不一样 说
        //     if(n.id == this.issueid) {
                
        //     }
        // }
    },
    watch: {
        latestrecord: {
            deep: true,
            handler: function(n) {
                // this.checkhaskj(n);
                // this.setlatest();
            }
        }
    }
}
</script>

<style lang="scss" >
.reward-wrap {
    background-color: #AC2024;
    color:#fff;
    .h-joy-info {
        text-transform: capitalize;
        >div {
            padding-bottom: 10px;
        }
    }
    
}
.reward {
    min-height: 100vh;
    background: url(../assets/images/dot.png) no-repeat center/100% 100%;
}
.r-btns {
    margin-bottom: 20px
}
div.r-btn, button.r-btn {
    background-image: linear-gradient(-180deg, #E9CBA5 9%, #DDBA8C 26%, #D6AF7E 36%, #CDA46D 48%, #C4975B 61%, #BB8A49 74%, #B07B33 89%, #A87023 100%);
    border-radius: 4px;
    line-height: 3;
    font-size: .3rem;
    position: relative;
    flex: 1;
    border:none;
    font-family: "wukong";
    color:#fff;
    padding:0;
    img {
        position: absolute;
        top: -15px;
        right:-6px;
        width: 55px;
    }
}
.r-btn:first-of-type{
    margin-right: 10px;
}
.r-btn:last-of-type{
    margin-left: 10px;
}
.xiala {
    // background: url(../assets/images/xiala.png) no-repeat center/100% 100%;

}

.xiala {
    position: relative;
    min-height: 260px;
    min-width: 288px;
    .xialabg {
        
        // background: #fff8e2;
    }
    .re-check {
        position: absolute;
        bottom: 6px;
        left: 0;
        right: 0;
        height: 20px;
        color:rgba(94, 71, 65, 0.801);
        font-size: 12px;
    }
}
.r-bt-cont {
    position: absolute;
    top: 35px;right: 0;left: 0;bottom: 40px;

}
.bird {
    position: absolute;
    top:-30px;
    left: 0;
    width: 2rem;
    max-width: 100px;
}
.denglong {
    position: absolute;
    top:-86px;
    right: 0;
    width: 80px;
    .denglong-info {
        text-shadow: 0 2px 2px rgba(3,3,3,0.73);
        position: absolute;
        left: 0;
        right: 0;
        white-space: nowrap;
        bottom: 56px;
        width:65px;
        font-size: 12px;
    }
}
.fire-wrap {
    position: relative;
    padding: 30px 0
}
.fire {
    position: absolute;
    top:0;
    left: 0;
    width: 80px;
}
.r-bt {
    position: relative;
    .fire {
        position: absolute;
        right: 20px;
        top: -10px;
        left:auto;
        width: 60px;
    }
    span {
        position: absolute;
        bottom: 20px;
        right: 0;
        left: 0;
    }
}
.close {
    position: absolute;
    top: 10px;
    z-index: 90;
    right: 10px;
    width: 40px;
    height: 40px;
    background: url(../assets/images/icon.png) no-repeat 0 -145px/80% auto;
}


</style>

