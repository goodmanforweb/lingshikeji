<template>
    <div class="index-wrap">
        <div class="index-bk-layer flex v">
            <div class="i-wdd">
                <img src="../assets/images/wdd2.png" alt="">
            </div>
            <div class="i-wdd-base flex1">
                <img class="ltt" src="../assets/images/ltt.png" alt="">
                <img class="rtt" src="../assets/images/rtt.png" alt="">
            </div>
            <img class="fd" src="../assets/images/fd.png" alt="">
            <img class="gf" src="../assets/images/gf.png" alt="">
            <img class="btt" src="../assets/images/btt.png" alt="">
            
        </div>
        <div class="index flex v sb">
            <div class="malldeng2" @click="dialogshow3=true">
                 <img  src="../assets/images/ddlongd.png" alt="">
                  <router-link to="" >
                    <div class="lj-text">礼金商城</div>
                    <span class="lj-text-info">VIP专属福利</span>
                 </router-link>
            </div>
            <div class="malldeng center">
                 <img  src="../assets/images/ddlong.png" alt="">
                 <i>{{latestrecord.person_num}}</i>
                 <div class="lj-text">大奖号</div>
            </div>
            <div class="balance flex vc"  @click="$router.push('dash/yd')">
                <i class="coin-icon"></i>
                <i>{{userinfo.received | currency }} HB</i>  
            </div>
           
            <div class="icon-btns">
                <div class="icon-btn center"  @click="$router.push('vip')">
                    <span :class="`icon-pic v-l-icon vip0`" :style="vip.icon ? ('backgroundImage:url('+vip.icon+')') : ''"></span>
                    <i class="icon-pic-text">VIP{{vip.sort-1}}</i>
                    <!-- <i class="vip-hint" v-if="showTip" @click.stop="dialogshow2=true">!升级vip{{vip.sort-1}}</i> -->
                </div>
                <a class="icon-btn center" :href="jump" :target="jump ? '_blank' : ''">
                    <span class="icon-pic share"></span>
                    <i class="icon-pic-text">分享</i>
                </a>
                <div class="icon-btn center" @click="$router.push('wish')">
                    <span class="icon-pic coin"></span>
                    <i class="icon-pic-text">塞金币</i>
                </div>
                <div  class="icon-btn center" @click="$router.push('gl')">
                    <span class="icon-pic rule"></span>
                    <i class="icon-pic-text" >攻略</i>
                </div>
                <div  class="icon-btn center" @click="handleMusic">
                    <span class="icon-pic music" :class="{active}" style="minWidth: 30px;minHeight: 30px;width: 30px;height: 30px"></span>
                    <i class="icon-pic-text" >音乐</i>
                </div>
            </div>


            <div class="i-tp center">
                <div class="i-amount din htextshadow">{{latestrecord.total | currency }} HB</div>
                <div class="kj-info htextshadow">{{latestrecord.id}}</div>
                <div class="kj-info htextshadow">开奖时间剩余：
                    <template v-if="!cd.show">
                        {{cd.hour | makeUp}}h:{{cd.minutes | makeUp}}:{{cd.seconds | makeUp}}
                    </template>
                    <template v-else>
                       开奖中
                    </template>
                </div>
                <div class="tree " >
                    <img  src="../assets/images/tree.png" v-show="!isShake" ref="spic">
                    <div class="shakegif" v-show="isShake" ref="gif">
                        <!-- <img src="../assets/images/gif.gif"  id="gif"> -->
                    </div>
                </div>
                <div class="jrky" >可摇 ：{{userinfo.rock_cnt}}次</div>
                <div class="share-show" :class="{deactive}" 
                @click="shakeHandle"
                >
                    <i class="share-icon"></i>
                    <span v-if="!deactive">
                        摇一摇领金币
                    </span>
                    <span v-else>
                        下次继续摇奖
                    </span>
                </div>
            </div>
            <div class="i-bt" >
                <img ref="tag" src="../assets/images/p1-4.png" alt="">
                <div ref="barra" id="barra" v-show="showDanmu">
                    <canvas id="canvas"></canvas>
                </div>
            </div>

            
            <Useup :show.sync = 'dialogshow' ></Useup>
            <Ercode :show.sync = 'dialogshow2' ></Ercode>
            <Tosee :show.sync = 'dialogshow3'></Tosee>
            <Hint :show.sync = 'dialogshow4'></Hint>
        </div>
    </div>
</template>
<script>
import Useup from './widget/dialog/useup';
import Tosee from './widget/dialog/tosee';
import Ercode from './widget/dialog/ercode';
import Hint from './widget/dialog/hint';
import Barrage from './widget/damu';
import {mapGetters, mapActions} from 'vuex';
import countdown from './minx/countdown';
import util from '../util/util';
export default {
    data() {
        return {
            showDanmu: false,
            dialogshow: false,
            dialogshow2: false,
            dialogshow3: false,
            dialogshow4: false,
            deactive: false,
            isShake: false,
            active: false

        }
    },
    mixins: [countdown],
    components: {
        Useup,
        Tosee,
        Ercode,
        Hint
    },
    computed: {
        ...mapGetters(['userinfo','loginInfo','latestrecord', 'lastissue', 'prizerecord','vip', 'viplevel', 'firsttime', 'saletime']),
        jump() {
            if(!this.loginInfo.token) {
                return null;
            }
            return `./#/poster?inviteid=${this.loginInfo.user.invitecode}&number=${this.userinfo.received || 0}&type=red`
        },
        showTip() {
            let t = this.viplevel.find(el => el.name == this.vip.name && this.vip.name != 'vip0');
            if(t && this.vip.exp == t.exp) {
                return true;
            }
            return false;
        }
    },
    mounted() {
        this.initMusicStatus();
        this.setShakeGif();
        this.initDamu();
        this.coinshake = document.querySelector('#coinshake');
        this.coinbg = document.querySelector('#coinbg');
    },
    beforeDestroy() {
        this.barrage && this.barrage.destroy();
    },
    methods: {
        ...mapActions(['shake', 'getuserinfo', 'getissuedetail','getprizerecord']),
        checkIfFirst() {
            const t = localStorage.getItem('firsttime');
            return new Promise((resolve, reject) => {
                if(!t) {
                    localStorage.setItem('firsttime', 1);
                    resolve();
                }
                else {
                    reject();
                }
            })
        },
        initMusicStatus() {
            const t = localStorage.getItem('redwalletmusic');
            this.active = t != 1;
            // //可以播放
            // if(t == 1) {
            //     this.active = false;
            // }
            // else {
            //     this.active = true
            // }
        },
        handleMusic() {
            const t = localStorage.getItem('redwalletmusic');
            const coinbg = document.querySelector('#coinbg');
            //可以播放
            if(t == 1) {
                coinbg.pause();
                this.active = true;
                localStorage.setItem('redwalletmusic', 0);
            }
            else {
                coinbg.play();
                this.active = false;
                localStorage.setItem('redwalletmusic', 1);
            }
        },
        shakeHandle() {
            if(util.isEmpty(this.userinfo) || this.isShake)return;
           if(!this.handleShakeChance() || this.deactive) return;
           if(this.latestrecord.status != 'WAITTING')return;
           this.isShake = true;

           this.coinbg.pause();
           
           if(localStorage.getItem('redwalletmusic') == 1) {
               this.coinshake.play();
               if(!this.coinshake.isendevent) {
                   this.coinshake.isendevent = true;
                   this.coinshake.onended = () => {
                       this.isShake = false;
                        document.querySelector('#coinbg').play();
                    }
               }
           }

           this.shake(this).then(res => {
               //更新摇奖次数
               this.getuserinfo(this);
               setTimeout(() => {
                    this.$router.push({name: 'reward', params: {id: res.log.id, list: res.log}});
                }, 1000);
           })
           .catch(() => {
               
           })
           .finally(() => {
                localStorage.getItem('redwalletmusic') != 1 && setTimeout(() => {
                    this.isShake = false;
                }, 1500);
           });
        },
        setShakeGif() {
            this.$refs.spic.onload = () => {
                this.$refs.gif.style.height = this.$refs.spic.height + 'px';
            }
        },
        cliptext(text) {
            if(!text)return '';
            // if(text.length <= 3)return text;
            return text.substring(0,1) + '***' + text.substring(text.length - 1, text.length)
        },
        rundanmu() {
            this.showDanmu = true;
            this.$nextTick(() => {
                if(!this.barrage) {
                    let barrage = this.barrage = new Barrage('canvas');
                    if(!barrage)return;
                    barrage.draw();
                }
                
                const issue = this.lastissue;
                const p = this.prizerecord;
                let arr = [];

                if(issue.person_num && issue.L && p.length > 0) {
                    arr = [`${issue.id}大奖号码 ${issue.person_num}`, `${issue.id}幸运号码 ${issue.L}`];
                    p.forEach(el => {
                        arr.push('恭喜' + this.cliptext(el.nickname) + "在"+issue.id +"获得" + el.value + 'HB');
                    });
                }
                else {
                    arr = ['阖家团圆，新春快乐','牛气冲天，诸事顺利','平安喜乐，心想事成','身体健康，万事如意'];
                }
                this.barrage.reshoot(arr);
            });
        },
        initDamu() {
            if(this.showDanmu) {
                this.rundanmu();
            }
            else {
                this.$refs.tag.onload=() => {
                    setTimeout(() => {
                        this.rundanmu();
                    }, 500) 
                }
            }
        },
        handleShakeChance(noshowdialog) {
            if(util.isEmpty(this.userinfo))return;
            if(this.userinfo.rock_cnt == 0 || this.cd.show) {
                !noshowdialog && (this.dialogshow = true);
                this.deactive = true;
                return false;
            }
            else {
                this.deactive = false;
            }
            return true;
        },
        triggerdanmufetch(res) {
            let id  = res.id;
            if(!id)return;
            id = id.replace('no.', '');
            id = 'no.' + (id - 1);
            this.urlparams = {id};
            let t = this.getissuedetail(this);
            let r = this.getprizerecord({id, ctx:this});

            Promise.all([t, r]).then(d => {
                this.initDamu();
            });
        }
    },
    watch: {
        userinfo: {
            immediate: true,
            deep: true,
            handler: function(n) {
                this.handleShakeChance(true);
            }
        },
        'cd.show': {
            immediate: true,
            handler: function(n) {
                this.handleShakeChance(true);
            }
        },
        saletime: {
            deep: true,
            handler: function(n) {
                if(this.firsttime == 0 && n .received_add_time && n.received_add_time > 0) {
                    this.dialogshow4 = true;
                    this.$store.commit('givenfirsttime', 1);
                }
            }
        },
        latestrecord: {
            deep: true,
            handler: function(n,o) {
                if(n.id && n.id != o.id) {
                    this.triggerdanmufetch(n);
                }
                
            }
        },
        // lastissue: {
        //     deep: true,
        //     handler: function(n) {
        //         this.handleShakeChance(n);
        //     }
        // },
        // prizerecord: {
        //     deep: true,
        //     handler: function(n) {
        //         this.handleShakeChance(n);
        //     }
        // }

    }
}
</script>
<style lang="scss">
.kj-info {
    text-transform: capitalize
}
.shakegif {
    margin: 0 .75rem;
    background: url(../assets/images/gif.gif) no-repeat center -1.8rem/131% auto;
}
.i-bt {
    position: relative;
}
#barra {
    position: absolute;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    z-index: 99;
    canvas {
        width: 100%;
        height: 100%;
    }
}
.index-wrap {
    overflow-x: hidden;
    color:#fff;
    position: relative;
    background-image: linear-gradient(to bottom, #730A00, #CA1C0C)
}
.index-bk-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
}
.i-wdd {
    
}
.i-wdd-base {
    background: #AF2226;
    margin: 0 .75rem;
    position: relative;
}
.ltt, .rtt,.btt,.gf,.fd,.malldeng,.malldeng2 {
    position: absolute;
}
.fd {
    top: 45%;
    left: 0;
    z-index: 1;
    width: 100px;
    
}
.gf {
    bottom: 40%;
    right: 0;
    z-index: 1;
    width: 100px;
    margin: auto;
}
.btt {
    left:0;
    top: 23%;
    width: 90px;
}

.ltt {
    width: 35px;
    top: 60%;
    left: -35px;
}
.rtt {
    width: 28px;
    top: 45%;
    right: -28px;
}

.malldeng {
    width: 60px;
    top:0;
    right: 1.3rem;
    text-shadow:0px 1px 1px rgba(3,3,3,0.73);
    color:#DDCB8E;
    font-size: 12px;
    i {
        position: absolute;
        width: 100%;
        height: 30px;
        left:0;
        top: 30px;
    }
    .lj-text {
        position: absolute;
        top: 50px;
        width: 100%;

    }
}
.malldeng2 {
    width: 65px;
    top: 51px;
    right: -10px;
    white-space: nowrap;
    font-size: 12px;
    a {
        position: absolute;
        top: 40px;
        left: 0;
        right: 0;
        height: 40px;
        z-index: 99;
    }
}
.index {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    // background: url(../assets/images/p1-11.png) no-repeat top center/100% auto;
}
.balance {
    font-size: 12px;
    white-space: nowrap;
    position: absolute;
    left: 0;
    top: 20px;
    // height: 45px;
    border-radius:  0 22px 22px 0;
    background-color: rgba(0,0,0,.47);
    padding: 5px 6px;
}
.coin-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../assets/images/icon.png) no-repeat 0 0/90% auto;
}
.icon-btns {
    position: absolute;
    top: 60px;
    left: 10px;
}
.icon-btn {
    display: block;
    margin-bottom: 12px;
    position: relative;
    >i.icon-pic-text{
        text-shadow:0px 6px 7px rgba(3,3,3,0.73);
        background:linear-gradient(180deg, rgba(233,203,165,1) 0%, rgba(221,186,140,1) 19%, rgba(214,175,126,1) 30%, rgba(205,164,109,1) 43%, rgba(196,151,91,1) 57%, rgba(187,138,73,1) 71%, rgba(176,123,51,1) 88%, rgba(168,112,35,1) 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent
    }
    >span {
        display: block;
        background-image: url(../assets/images/icon.png);
        background-repeat: no-repeat;
        background-size: 90% auto;
        width: 35px;
        height: 35px;
        min-width: 35px;
        min-height: 35px;
        margin: 0 auto;
    }
    .share {
        background-position: 0 -182px;
    }
    .coin {
        background-position: 0 -226px;
    }
    .rule {
        background-position: 0 -270px;
    }
    .vip0 {
        background-image: url(../assets/images/stars.png);
        background-position: 0 0;
    }
    .vip1 {
        background-image: url(../assets/images/stars.png);
        background-position: 0 -53px;
    }
    .vip2 {
        background-image: url(../assets/images/vip3.png);
        background-position: center;
        background-size: contain;
    }
    .vip3 {
        background-image: url(../assets/images/stars.png);
        background-position: 0 -98px;
    }
    .vip4 {
        background-image: url(../assets/images/stars.png);
        background-position: 0 -153px;
    }
    .music {
        background: url(../assets/images/music.png) no-repeat center/contain;
    }
    .music.active {
        background: url(../assets/images/musica.png) no-repeat center/contain;
    }
    .vip-hint {
        font-size: 12px;
        position: absolute;
        top: 10px;
        right:-50px;
        background-image: linear-gradient(-180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.20) 18%, rgba(255,255,255,0.31) 41%, rgba(255,255,255,0.38) 57%, rgba(255,255,255,0.44) 70%, rgba(255,255,255,0.50) 82%, rgba(255,255,255,0.58) 100%);
        border: 1px solid #FFF;
        border-radius: 10px;
    }
}
.i-tp {
    padding-top: 2.3rem
}
.tree {
    overflow: hidden;
    img:first-child {
        width: 80%;
        min-height: 249px;
    }
    
}
.share-show {
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: rgba(0,0,0,.47);
    border-radius: 23px;
    width: 60%;
    margin: 16px auto;
    position: relative;
}
.share-icon {
    position: absolute;
    top:5px;
    left: 5px;
    bottom: 5px;
    margin-right: 10px;
    display: inline-block;
    width:35px;
    height: 35px;
    background: url(../assets/images/icon.png) no-repeat 0 -44px/100% auto;
}
.share-show.deactive {
    background: #929293;
    span {
        text-shadow: 1px 1px 1px rgb(48, 46, 46)
    }
}

.lj-btn {
    position: absolute;
    top: 118px;
    right: -2px;
    transform: rotate(9deg);
}
.lj-text {
    font-size: 14px;
    text-shadow:0px 1px 1px rgba(3,3,3,0.73);
    color:#DDCB8E;
    // background:radial-gradient(180deg, rgba(255,255,255,1) 0%, rgba(247,242,227,1) 17%, rgba(243,237,215,1) 30%, rgba(239,230,200,1) 41%, rgba(232,220,178,1) 58%, rgba(227,211,159,1) 72%, rgba(221,203,142,1) 85%, rgba(215,182,122,1) 100%);
    // -webkit-background-clip:text;
    // -webkit-text-fill-color:transparent;
    
}
.lj-text-info {
    display: block;
    font-size: 12px;
    color:#fff;
    
}
.hpop {
    .icon-btn {
        display: flex;
    }
}
.i-amount {
    margin: 0 .75rem;
}
</style>

