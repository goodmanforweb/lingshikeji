<template>
<Page class="rw-page"  borderLine padding>
    <template slot="layer-right-btn" >
        <el-popover
            popper-class="popper"
            placement="bottom"
            width="80"
            trigger="hover"
            v-model="popShow">
            <div class="share" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

                <span></span>
                <span></span>
            </div>
            <span class="rw-dots center" slot="reference" @click="popShow = !popShow">
                <i></i>
            </span>
        </el-popover>
    </template>
    <div class="rw" :class="{flex: !isMobile}" style="minHeight:100%">
        <div class="rw-text">
            <div class="share" v-if="!isMobile">
                <span>
                </span>
                <span>
                </span>
            </div>
            <div class="m16">
                <div class="block  hy-notice flex vc" :class="{'sb': !isMobile,v: isMobile}">
                    <div class="flex vc" :class="{mb16: isMobile}">
                        <i class='el-icon-circle-check yes-icon'></i>
                        <i class='el-icon-warning sigh-icon'></i>
                        <div class="hyn-text ">
                            <div class="tcolor">{{$t('m.onestar',{star:'一'})+$t('m.shixiao')}}</div>
                            <span class="gcolor f12">{{$t('m.youxiaoqizhi')}}2020.11.11 11:11:11 </span>
                        </div>
                    </div>

                    <div class="n-btn btn-tcolor">{{$t('m.hydash')}}</div>
                </div>
            </div>
            <div class="rw-text-cont tcolor" v-html="$t('m.hydesc2')">
            </div>
            <div class="gcolor m16">{{$t('m.showmore')}}</div>
            <div class="n-btn btn-tcolor btn-calcer" @click="panelHandle('Calcer')">
                <img style="width: 18px" src="../../../assets/images/calcericon.png">
                <span>{{$t('m.syjsq')}}</span>
            </div>
            <p class="gcolor"> {{$t('m.morekonw')}}</p>

            <div class="tcolor fw f18">{{$t('m.hyrwlists')}}</div>
            <p class="tcolor f14">{{$t('m.bnlimts')}}</p>
            <ul class="rw-lists">
                <li class="flex sb vc" v-for="(list, index) in lists" :key="index">
                    <div class="flex">
                        <div class="rw-list-icon shadow">
                            <img src="../../../assets/images/group.png" alt="">
                        </div>
                        <div class="f14 rw-list-icon-info">
                            <span class="tcolor">{{list.name}}</span>
                            <div class="gcolor">{{list.price}}</div>
                        </div>
                    </div>
                    <div class="rw-list-btn tcolor f14 shadow" @click="panelHandle(list.isSign ? 'Dash' :'Detail',index)">
                        {{list.btn}}
                    </div>
                </li>
            </ul>
        </div>

        <div class="rw-pic flex v fe">
            <div class="rw-pic-ft">
                <div class="rw-index-cube flex vc">
                    <div>
                        <img src="../../../assets/images/plogo.png" alt="">
                    </div>
                    <div class="rwic-info">
                        <div class="f20 fw link-logo">CryptoJOY</div>
                        <span class='f12 cp link-btn '>
                            <img src="../../../assets/images/link.png" alt="">
                            {{$t('m.gwang')}}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <RightPanel :show.sync="panelShow"  :fullScreen="fullScreen" class="rwPanel" >
            <component :is="panel" :panelData='panelData'></component>
        </RightPanel>
    </div>
</Page>
</template>
<script>
import Detail from './detail';
const Calcer = () => import('../../calcer/index'/*webpackChunkName:'calcer' */)
import Dash from './dash'
import {mapGetters} from 'vuex';
export default {
    components: {
        Detail,
        Calcer,
        Dash
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            fullScreen: false,
            panel: '',
            panelData:0,
            popShow: false,
            panelShow: false,
            lists: [
                {
                    name: '一星服务商',
                    price: '10000.00 CJS（最高优惠5%）',
                    isSign: 1,
                    btn: '已签约'
                },
                {
                    name: '二星服务商',
                    price: '50000.00 CJS（最高优惠7%）',
                    isSign: 0,
                    btn: '查看'
                },
                {
                    name: '三星服务商',
                    price: '100000.00 CJS（最高优惠9%）',
                    isSign: 0,
                    btn: '查看'
                },
                {
                    name: '四星服务商',
                    price: '200000.00 CJS（最高优惠10%）',
                    isSign: 0,
                    btn: '查看'
                }
            ]
        }
    },
    methods: {
        panelHandle(type,index) {
            if(this.isMobile) {
                let t = {
                    Detail: () => {
                        return this.$router.push({name: 'ddetail', query:{star:index}});
                    }, 
                    Calcer: () => {
                        return this.$router.push({name: 'calcer',query: {type:0}});
                    }, 
                    Dash: () => {
                        return this.$router.push({name: 'ddash'});
                    }
                }[type]();
                
            }
            this.fullScreen = ['Calcer', 'Dash'].includes(type);
            this.panel = {Detail, Calcer, Dash}[type];
            this.panelData = index;
            this.panelShow = true;
        },
        share() {
            
        }
    }
}
</script>

<style lang="scss">
div.btn-calcer {
    width: 150px;
}

.rw-dots {
    height: 30px;
    line-height: 30px;
    width: 35px;
    display: inline-block;
    i {
        display: inline-block;
        position: relative;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #086599;
    }
    i:before,i:after {
        content:'';
        position: absolute;
        top:0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #086599;
    }
    i:before {
        left: -8px;
    }
    i:after {
        right: -8px;
    }
}
.mobile {
    .rw-page {
        .page-right-btn{
            height: 30px;
        }
    }
    .rw-pic {
        margin: 30px -16px -16px;
        padding: 16px;
        background: url(../../../assets/images/mount.jpg) no-repeat center/cover ;
    }
    .bn-rw-pic {
        background: url(../../../assets/images/house.jpg) no-repeat center/cover ;

    }



    .share {
        span {
            background-color: rgba(8, 100, 153, 0.158);

        }
    }

}
.pc {
    .rw-text {
        padding: 32px;
    }
    .rw-pic {
        width: 512px;
        min-width: 512px;
        background: url(../../../assets/images/mount.png) no-repeat center/cover ;
    }
    .bn-rw-pic {
        background: url(../../../assets/images/house.png) no-repeat center/cover ;

    }
}
.rw-text-cont {
    margin: 20px 0;
}



.share {
    span {
        cursor: pointer;
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url(../../../assets/images/wx.png) no-repeat center/16px;
        background-color: #fff;
        border-radius: 50%;
    }
    span:last-child {
        background-image: url(../../../assets/images/tele.png)
    }
}
.rw-lists >li {
    cursor: pointer;
    padding: 16px 0;
    border-bottom: 1px solid rgba(175, 187, 194, 0.185);
}
.rw-list-icon {
    width: 45px;
    // height: 45px;
    background-color: #C8D8E2;
    text-align: center;
    padding: 8px 0;
    border-radius: 4px;
    box-shadow:0px 8px 20px 0px rgba(162,162,162,0.14);
    img {
        width: 70%
    }
}
.rw-list-icon-info {
    padding-left: 10px;
    >div {
        margin-top: 10px;
    }
}
.rw-list-btn {
    background: #fff;
    border-radius: 4px;
    padding: 0 10px;
    text-align: center;
    width: 100px;
    height: 30px;
    line-height: 30px;
}
.rw-pic-ft {
    padding-bottom: 40px
}
.rw-index-cube {
    width: 200px;
    margin: 0 auto;
    padding: 20px;
    background:linear-gradient(360deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
    box-shadow:0px 1px 3px 0px rgba(0,0,0,0);
    border-radius:12px;
}
.rwic-info {
    margin-left: 16px;
}
.link-logo {
    color:#fff;
    margin-bottom: 8px;
}
.link-btn {
    border-radius: 20px;
    border: 1px solid #fff;
    padding: 2px 8px;
    color:#fff;
    img {
        width: 16px;
    }
}

</style>

