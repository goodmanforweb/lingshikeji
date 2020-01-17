<template>
<Page class="rw-page"  borderLine padding routerBack="/hub" style="width: 100%;height:100%">
    <template slot="layer-right-btn" >
        <SharePop @dialogHandle="dialogVisible=true"/>
    </template>
    <div class="rw" :class="{flex: !isMobile}" style="minHeight:100%">
        <div class="rw-text" :class="{'flex1': !isMobile}">
           <ShareCode :qr_img="data.qr_img"  :dialogShow.sync="dialogVisible" />
           <ConsoleBar  :data='data' @consoleBtnActive="panelHandle('Dash')"/>
            <!-- $i18n.locale == 'zh' ? data.desc : data.desc_en -->
            <div class="rw-text-cont tcolor" v-html="$i18n.locale == 'zh' ? data.desc : data.desc_en">
            </div>
            <el-tooltip :content="$t('m.tosee')" placement="top">
                <!-- @click="panelHandle('Calcer')" -->
            <div class="n-btn btn-tcolor btn-calcer" >
                <img style="width: 18px" src="../../../assets/images/calcericon.png">
                <span>{{$t('m.syjsq')}}</span>
            </div>
            </el-tooltip>
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
                            <span class="tcolor">{{$i18n.locale == 'zh' ? list.metadata.name : list.metadata.name_en}}</span>
                            <div class="gcolor">{{(list.metadata.lock_limit || 0) | currency}}CJS</div>
                        </div>
                    </div>
                    <div class="rw-list-btn tcolor f14 shadow" :class="{gcolor: list.isSign}" @click="panelHandle(list.isSign ? 'Dash' :'Detail',list)">
                        {{list.isSign || $t('m.check')}}
                    </div>
                </li>
            </ul>
        </div>

        <div class="rw-pic bn-rw-pic flex v sb">
            <div class="rw-pic-hd wcolor" style="paddingLeft: 30px">
                <p>{{$t('m.hyjclj')}}</p>
                <p class="towrap"><span :class="`${isMobile ? 'f34' : 'f60'}`">{{sum}}</span> <span>USD</span></p>
            </div>
            <XXLogo :iconsrc="iconsrc" :name="$i18n.locale == 'zh' ? data.project_name : data.project_name_en" link="https://coinoah.com"/>
        </div>

        <RightPanel :show.sync="panelShow"  :fullScreen="fullScreen" class="rwPanel" >
            <component :is="panel" :panelData='panelData' @update:show="val => panelShow=val"></component>
        </RightPanel>
    </div>
</Page>
</template>
<script>
import ShareCode from '../widgets/share/share';
import SharePop from '../widgets/share/pop';
import ConsoleBar from '../widgets/consolebar';

import XXLogo from '../widgets/xxlogo'
import Detail from './detail';
// import Calcer from '../../calcer/index'
const Calcer = () => import('../../calcer/index'/*webpackChunkName:'calcer' */)

import Dash from './dash'
import {mapGetters} from 'vuex';
import Big from 'bignumber.js'

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
        },
        sum() {
            if(this.data.isSign) {
                return this.data.standard.sum_found || 0;
            }
            else {
                return this.listsum;
            }
        }
    },
    data() {
        return {
            iconsrc:require('../../../assets/images/jianjian.png'),
            dialogVisible: false,
            fullScreen: false,
            panel: '',
            panelData:0,
            popShow: false,
            panelShow: false,
            lists: [],
            listsum:0
        }
    },
    methods: {
        panelHandle(type,item) {
            if(this.isMobile) {
                let t = {
                    Detail: () => {
                        return this.$router.push({name: 'bdetail',query: {id:item.id}});
                    }, 
                    Calcer: () => {
                        return this.$router.push({name: 'calcer',query: {type:1}});
                    }, 
                    Dash: () => {
                        return this.$router.push({name: 'bdash', params: {id: this.$route.params.id}});
                    }
                }[type]();
                return;
            }
            if(type == 'Dash') {
               window.open(`./#/bn/${this.$route.params.id}/bdash`);
            }
            else {
                this.fullScreen = ['Calcer', 'Dash'].includes(type);
                this.panel = {Detail, Calcer}[type];
                this.panelShow = true;
                if(type == 'Calcer') {
                    this.panelData = {type: 1};
                }
                else {
                    this.panelData = item;
                }
            }
        },
        share() {
            
        },
        hyListsHandle() {
            let list = this.fwsHYLists, signdata = this.signHYDetail;
            this.lists = list.map(el => {
                if(signdata && el.id == signdata.project_contract) {
                    el.isSignMark = signdata.isHYValid ? 1 : -1;
                    el.isSign = signdata.isHYValid ? this.$t('m.yqianyue') : this.$t('m.shixiao') 
                }
                return el;
            })
        },
        getNOSignSum() {
            if(!this.signHYDetail.isLoad || util.isEmpty(this.fwsHYLists)) return;

            if(this.signHYDetail.isSign) return;
            let pp = this.fwsHYLists.map(el => {
                return request.getBNNOSignSum({params: {id: el.id}})
            });
            Promise.all(pp).then(res => {
                let decimals =  res[0].data.decimals || 8;
                let sum = res.reduce((prev, next) => {
                    return prev + next.data.sum_found
                }, 0);
                this.listsum = util.dropHex(sum, decimals)
            })
        }
    },
    watch: {
        signHYDetail: {
            immediate: true,
            deep: true,
            handler: function(n) {
                this.hyListsHandle(n);
                this.getNOSignSum();
            }
        },
        fwsHYLists: {
            immediate: true,
            deep: true,
            handler: function(n) {
                if(!util.isEmpty(n)) {
                    this.hyListsHandle(n);
                    this.getNOSignSum();
                }
            }
        }
    }
}
</script>

<style lang="scss">
</style>

