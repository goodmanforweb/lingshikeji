<template>
    <div class="vip" >
        <div class="v-tt">
            <img src="../../assets/images/viptt.jpg" alt="">
            <div class="v-tt-cont flex vc hc v">
                <div class="v-cont-icon vip0 flex vc"  :style="`backgroundImage:url(${vip.icon})`" >
                    <!-- <span v-if="showTip" @click='dialogshow2=true'>升级至VIP{{vip.sort}}</span> -->
                </div>
                <div>当前等级: 
                    <!-- {{vip.name}} -->
                    暂未开放
                </div>
                <span>经验值： {{vip.exp}}</span>
            </div>
        </div>
        <div class="v-cont ">
            <div class="v-block" v-if="false">
                <div class="v-b-tt flex sb">
                    <span>我的会员</span>
                    <span><i>等级说明</i><i class="v-b-icon"></i></span>
                </div>
                <div class="v-b-cont v-b-cont-icons" >
                    <ul class="v-b-icons flex sb" >
                        <li v-for="(level, index) in viplevel" :key="index">
                            <span class="v-l-icon"><img :src="level.icon" alt=""></span>
                            <div>
                                {{level.name}}
                            </div>
                            <span>{{level.exp}}</span>
                        </li>
                    </ul>
                    <div class="v-b-bars" ref="bar"><span :style="{width: bar}" >
                            <i>{{vip.exp}}</i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="v-block">
                <div class="v-b-tt flex sb">
                    <span>VIP会员说明</span>
                    <!-- <span><i>兑换记录</i><i class="v-b-icon"></i></span> -->
                </div>
                <div class="v-b-cont">
                   
                    <h4>会员体系概述</h4>
                    <p>JOY摇摇乐会员体系包含5个等级：VIP0、VIP1、VIP2、VIP3、VIP4</p>
                    <p>等级由“经验值“所决定，经验值越高，等级越高，等级越高可享受的会员权益也就更丰富。其中VIP0为普通会员，无法享受礼金商城中的会员礼遇，该等级会员可以累积经验值至VIP1以上的等级享受更多会员福利。</p>
                    <p>
                        vip经验值将于每周进行清零，新一周的经验值将以vip0开始累积。同时每人每周有一次兑换vip等级的机会，请及时兑换。
                    </p>
                    <h4>如何升级</h4>
                    <p>
                        VIP经验值由
                        <router-link to="" class="v-hcolor">
                            参与摇奖的
                        </router-link>
                        方式获得，系统会根据经验值计算VIP等级。只要经验值达到升级的门槛，联系CJ小助手即可开通/升级VIP。
                    </p>
                    <p>经验值具体分值说明</p>
                    <div class="v-b-cont-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>行为</th>
                                    <th>分值</th>
                                    <th>说明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        参与摇一摇
                                    </td>
                                     <td>
                                        +1
                                    </td>
                                     <td>
                                       成功摇取摇钱树，无论是否中奖均视为获得一次经验值
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <h4>VIP权益</h4>
                    <p>
                        VIP1以上的用户可以享受礼金商城中的用户权益。 
                    </p>
                    <p>
                        商城即将推出矿机限时礼遇，用户可以通过HB（红包礼金）+CJT的形式购买矿机，VIP的等级越高，所享受的折扣越高。
                        用户可以通过获得的奖金兑换矿机获得二次收益。兑换后的矿机可至平台“超级算力”处查看。
                    </p>
                </div>
            </div>
        </div>
         <Ercode :show.sync = 'dialogshow2' ></Ercode>
    </div>
</template>
<script>
import Ercode from '../widget/dialog/ercode';
import {mapGetters, mapActions} from 'vuex';
import util from '../../util/util';
export default {
    data() {
        return {
            dialogshow2: false,
            bar: '90%'
        }
    },
    components: {
        Ercode
    },
    computed: {
        ...mapGetters(['viplevel', 'vip', 'viplevel']),
        showTip() {
            let t = this.viplevel.find(el => el.name == this.vip.name && this.vip.name != 'vip0');
            if(t && this.vip.exp == t.exp) {
                return true;
            }
            return false;
        }
    },
    mounted() {
        this.calcvipbar();
    },
    methods: {
        calcvipbar() {
            if(util.isEmpty(this.viplevel) || util.isEmpty(this.vip))return;
            const all = this.$refs.bar.clientWidth;
            const sectionbar = all/(this.viplevel.length - 1);
            let t = this.viplevel.filter(el => el.exp <= this.vip.exp);
            if(t.length == this.viplevel.length) {
                this.bar = '100%';
                return;
            }
            let has = (t.length - 1) * sectionbar;
            let cha = this.vip.exp - this.viplevel[t.length - 1].exp;
            let bi = this.viplevel[t.length].exp - this.viplevel[t.length - 1].exp;
            let h = sectionbar/bi * cha + has;
            bi = h + 12;
            this.bar = Math.floor(bi/all * 100) + '%';
        }
    },
    watch: {
        viplevel: {
            deep: true,
            handler: function(n) {
                // this.calcvipbar();
            }
        },
        vip: {
            deep: true,
            handler: function(n) {
                // this.calcvipbar();
            }
        }
    }
}
</script>
<style lang="scss">
.v-tt {
    position: relative;
    .v-tt-cont {
        min-height: 200px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        color:#fff;
        .v-cont-icon {
            width: 100px;
            height: 100px;
            span {
                border-radius: 10px;
                text-align: center;
                width: 100%;
                background-image: linear-gradient(-180deg, #E9CBA5 9%, #DDBA8C 26%, #D6AF7E 36%, #CDA46D 48%, #C4975B 61%, #BB8A49 74%, #B07B33 89%, #A87023 100%);
                border: 1px solid #FFFFFF;
            }

        }
        .vip1 {
            background: url(../../assets/images/stars.png) no-repeat 0 -169px/100%;
        }
        .vip2 {
            background-image: url(../../assets/images/vip3.png);
            background-position: center;
            background-size: contain;
        }
        .vip3 {
            background: url(../../assets/images/stars.png) no-repeat 0 -320px/100%;
        }
        .vip4 {
            background: url(../../assets/images/stars.png) no-repeat 0 -490px/100%;
        }
        .vip0 {
            background: url(../../assets/images/stars.png) no-repeat 0 0/100%;
        }

    }
}
.v-hcolor {
    color:#E3A60F
}
.v-block {
    padding: 0 16px;
    background-color: #fff;
    margin-bottom: 16px;
}
.v-b-tt {
    line-height: 2.5;
    border-bottom: 1px solid rgba(235, 229, 229,.47);
    i {
        vertical-align: middle;
    }
}
.v-b-icon {
    display: inline-block;
    
    width: 16px;
    height: 16px;
    background: url(../../assets/images/leftarrow.png) no-repeat center/contain;
}

.v-cont {
    background-color: #ECECEC;
}
.v-b-cont-icons {
    padding: 30px 0;
    position: relative;
}

.v-b-icons {
    position: relative;
    z-index: 1;
    li {
        text-align: center;

    }
    li:first-child .v-l-icon, li:last-child .v-l-icon {
        margin: 0
    }
    .v-l-icon {
        display: block
    }
}
.v-b-bars {
    height: 12px;
    background: #808080;
    position: absolute;
    top: 43px;
    right: 6px;
    z-index: 0;
    left: 6px;
    font-size: 0;
    span {
        display: inline-block;
        height: 100%;
        background: #F5A623;
        width: 59%;
        min-width: 27px;
        border-radius: 6px;
        position: relative;
        transition: width .8s ease-in;
        i {
            position: absolute;
            top: -30px;
            right: 0;
            border-radius: 2px;
            background: inherit;
            color:#fff;
            font-size: 12px;
            padding: 2px 4px;
        }
        i:after {
            content:'';
            border: 5px solid transparent;
            border-top-color: #F5A623;
            width: 0;
            height: 0;
            position: absolute;
            right: 0;
            left: 0;
            margin: auto;
            bottom: -9px;
        }
    }
}
.v-b-cont {
    h4 {
        text-align: center;
        font-size: .3rem;
        color:#A10D0D;
    }
    p {
        font-size: .24rem;
        color:#333
    }
}
.v-b-cont-table {
    font-size: .2rem;
    table {
        border-collapse: collapse;
    }
    thead {
        background: #F6F6F6;
        height: 35px;
        line-height: 35px;
    }
    tbody {
        tr td:first-child {
            white-space: nowrap;
        }
    }
    th {
        min-width: 60px;
    }
    th, td {
        padding: 2px;
        border-left: 1px solid #F8F8F8;
        border-bottom: 1px solid #F8F8F8;
    }
}
</style>

