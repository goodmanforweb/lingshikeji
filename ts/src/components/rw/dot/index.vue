<template>
<Page class="rw-page"  borderLine padding routerBack="/hub" style="width: 100%;height:100%">
    <template slot="layer-right-btn" >
        <SharePop @dialogHandle="dialogVisible=true"/>
    </template>
    <div class="rw" :class="{flex: !isMobile}">
        <div class="rw-text" :class="{'flex1': !isMobile}">
            <ShareCode :qr_img="data.qr_img"  :dialogShow.sync="dialogVisible" />
            <ConsoleBar  :data='data' @consoleBtnActive="panelHandle('Dash')"/>
            <div class="rw-text-cont tcolor" v-collapse="!descshow ? 1: 'all'" v-html="$i18n.locale == 'zh' ? data.desc : data.desc_en"></div>
            <div class="gcolor m16 cp" @click="descshow=!descshow">{{!descshow ? $t('m.showmore') : $t('m.shouqi')}}</div>
            <el-tooltip :content="$t('m.tosee')" placement="top">
                <div class="n-btn btn-tcolor btn-calcer nowrap" 
                
                >
                <!-- @click="panelHandle('Calcer')" -->
                    <img style="width: 18px" src="../../../assets/images/calcericon.png">
                    <span>{{$t('m.syjsq')}}</span>
                </div>
            </el-tooltip>
            
            <p class="gcolor2 f12"> {{$t('m.morekonw')}}</p>

            <div class="tcolor fw f18">{{$t('m.hyrwlists')}}</div>
            <p class="tcolor f14">{{$t('m.bnlimts')}}</p>
            <ul class="rw-lists">
                <li class="flex sb vc" v-for="(list, index) in lists" :key="index">
                    <div class="flex">
                        <div class="rw-list-icon shadow flex hc vc">
                            <img src="../../../assets/images/group.png" alt="">
                        </div>
                        <div class="f14 rw-list-icon-info">
                            <span class="tcolor ">{{$i18n.locale == 'zh' ? list.metadata.name : list.metadata.name_en}}</span>
                            <div class="gcolor">{{(list.metadata.lock_limit || 0) | currency}}CJS({{$t('m.zgyh')+(list.metadata.discount_rate || 0)}}%)</div>
                        </div>
                    </div>
                    <div class="rw-list-btn tcolor f14 shadow" :class="{gcolor: list.isSign}" @click="panelHandle(list.isSign ? 'Dash' :'Detail',list)">
                        {{list.isSign || $t('m.check')}}
                    </div>
                </li>
            </ul>
        </div>

        <div class="rw-pic flex v fe">
           <XXLogo :iconsrc="iconsrc"/>
        </div>

        <RightPanel  :show.sync="panelShow"  :fullScreen="fullScreen" class="rwPanel" >
            <component :is="panel" :panelData='panelData' @update:show="val => panelShow=val"></component>
        </RightPanel>
    </div>
</Page>
</template>
<script>
import ShareCode from '../widgets/share/share';
import SharePop from '../widgets/share/pop'
import ConsoleBar from '../widgets/consolebar';

import XXLogo from '../widgets/xxlogo'
import Detail from './detail';
const Calcer = () => import('../../calcer/index'/*webpackChunkName:'calcer' */)
import Dash from './dash'
import {mapGetters} from 'vuex';
export default {
    components: {
        Detail,
        Calcer,
        Dash,
        XXLogo,
        ShareCode,
        SharePop,
        ConsoleBar
    },
    computed: {
        ...mapGetters(['isMobile','signHYDetail','fwsHYLists']),
        data() {
            return this.signHYDetail;
        }
    },
    directives: {
        collapse: {
            bind(el, binding) {
                const value = binding.value;
                [...el.children].forEach((el, index) => {
                    if(index < value) {
                        el.style.display = 'block'
                    }
                    else {
                         el.style.display = 'none'
                    }
                })
            },
            update(el, binding) {
                 let value = binding.value;
                 if(value == 'all') {
                     value = el.children.length;
                 }
                [...el.children].forEach((el, index) => {
                    if(index < value) {
                        el.style.display = 'block'
                    }
                    else {
                         el.style.display = 'none'
                    }
                })
            },
            unbind(el) {
               
            }
        }
    },
    data() {
        return {
            iconsrc:require('../../../assets/images/lemon.png'),
            dialogVisible: false,
            descshow: false,
            fullScreen: false,
            panel: '',
            panelData:0,
            popShow: false,
            panelShow: false,
            lists: []
        }
    },
    methods: {
        setCollapse() {

        },
        panelHandle(type,list) {
            if(this.isMobile) {
                let t = {
                    Detail: () => {
                        return this.$router.push({name: 'ddetail',query: {id:list.id}});
                    }, 
                    Calcer: () => {
                        return this.$router.push({name: 'calcer',query: {type:0}});
                    }, 
                    Dash: () => {
                        return this.$router.push({name: 'ddash', params:{id: this.$route.params.id}});
                    }
                }[type]();
                return ;
            }

            
            if(type == 'Dash') {
                window.open(`./#/fws/${this.$route.params.id}/ddash`);
            }
            else {
                this.fullScreen = ['Calcer', 'Dash'].includes(type);
                this.panel = {Detail, Calcer}[type];
                this.panelShow = true;
                if(type == 'Calcer') {
                    this.panelData = {type: 0};
                }
                else {
                    this.panelData = list;
                }
            }
            
            
           
            
        },
        share() {
            
        },
        hyListsHandle() {
            let list = this.fwsHYLists,signdata = this.signHYDetail;
            this.lists = list.map(el => {
                if(signdata && el.id == signdata.project_contract) {
                    el.isSignMark = signdata.isHYValid ? 1 : -1;
                    el.isSign = signdata.isHYValid ? this.$t('m.yqianyue') : this.$t('m.shixiao') 
                }
                return el;
            })
        }
    },
    watch: {
        signHYDetail: {
            immediate: true,
            deep: true,
            handler: function(n) {
                this.hyListsHandle(n);
            }
        },
        fwsHYLists: {
            immediate: true,
            deep: true,
            handler: function(n) {
                !util.isEmpty(n) && this.hyListsHandle(n);
            }
        }
    }
}
</script>

<style lang="scss">
div.btn-calcer {
    // width: 150px;
}
div.popper {
    min-width:auto!important;
}
.pc {
    .rw {
        min-height: 100vh;
    }
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
    .bs-rw-pic {
         background: url(../../../assets/images/bsindexpic.jpg) no-repeat center/cover ;
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
    .bs-rw-pic {
         background: url(../../../assets/images/bsindexpic.jpg) no-repeat center/cover ;
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
        width: 70%;
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
    max-height: 170px;
    margin: 0 auto;
    padding: 20px;
    background:linear-gradient(to top,rgba(0,0,0,0) 0%,rgba(0,0,0,.25) 100%);
    box-shadow:0px 1px 3px 0px rgba(0,0,0,0);
    border-radius:12px;
    .rw-logo {
        width: 80px;
    }
}
.pc {
    .rw-index-cube {
        width: 300px;
    }
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

