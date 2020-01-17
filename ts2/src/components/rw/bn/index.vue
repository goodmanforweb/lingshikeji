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
                <div class="block flex vc hy-notice sb">
                    <div class="flex vc">
                        <i class='el-icon-circle-check yes-icon'></i>
                        <i class='el-icon-warning sigh-icon'></i>
                        <div class="hyn-text ">
                            <div class="tcolor">{{$t('m.qybnrw')}}</div>
                            <span class="gcolor f12">{{$t('m.youxiaoqi')}}2020.11.11 11:11:11 </span>
                        </div>

                    </div>
                    <div class="n-btn btn-tcolor">{{$t('m.hydash')}}</div>
                </div>
            </div>
            <div class="rw-text-cont tcolor" v-html="$t('m.bnhint5')">
            </div>

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

        <div class="rw-pic bn-rw-pic flex v sb">
            <div class="rw-pic-hd wcolor" style="paddingLeft: 30px">
                <p>{{$t('m.hyjclj')}}</p>
                <p><span :class="`${isMobile ? 'f34' : 'f60'}`">10987980</span> <span>CJS</span></p>
            </div>
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
// import Calcer from '../../calcer/index'
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
                    name: '币诺合约',
                    price: '100,000.00 CJ',
                    isSign:1,
                    btn:'可升级'
                },
                {
                    name: '币诺合约',
                    price: '100,000.00 CJ',
                    isSign:0,
                    btn:'查看'
                }
            ]
        }
    },
    methods: {
        panelHandle(type,index) {
            if(this.isMobile) {
                let t = {
                    Detail: () => {
                        return this.$router.push({name: 'bdetail'});
                    }, 
                    Calcer: () => {
                        return this.$router.push({name: 'calcer',query: {type:1}});
                    }, 
                    Dash: () => {
                        return this.$router.push({name: 'bdash'});
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
.yes-icon:before {
    color: #38B573;
    font-size: 27px;
}

.sigh-icon:before {
    color: #ED6363;
    font-size: 23px;
}
.sigh-icon-tcolor:before {
    color:#086599;
    font-size: 14px;
}
.icon14:before {
    font-size: 14px;
    vertical-align: middle;
}
.hy-notice {
    max-width: 400px;
    width: 80%;
    margin: 0 auto;
    border-radius: 4px;
    box-shadow:0px 8px 25px 0px rgba(25,101,147,0.25);
    .n-btn {
        margin: 0;
    }
}
.hyn-text {
    margin-left: 10px;
}
</style>

