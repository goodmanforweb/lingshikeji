<template>
<Page class="rw-page"  borderLine padding routerBack="/hub" style="width: 100%;height:100%">
    <template slot="layer-right-btn" >
        <SharePop @dialogHandle="dialogVisible=true"/>
    </template>
    <div class="rw" :class="{flex: !isMobile}" style="minHeight:100%">
        <div class="rw-text" :class="{'flex1': !isMobile}">
            <ShareCode :qr_img="data.qr_img"  :dialogShow.sync="dialogVisible" />
            <ConsoleBar  :data='data' @consoleBtnActive="panelHandle('Dash')"/>
            <div class="rw-text-cont tcolor" v-collapse="!descshow ? 2: 'all'" v-html="$i18n.locale == 'zh' ? data.desc : data.desc_en"></div>
            <div class="gcolor m16 cp" @click="descshow=!descshow">{{!descshow ? $t('m.showmore') : $t('m.shouqi')}}</div>
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
                            <div class="gcolor">{{(list.metadata.lock_limit || 0) | currency}}CJC</div>
                        </div>
                    </div>
                    <div class="rw-list-btn tcolor f14 shadow" :class="{gcolor: list.isSign}" @click="panelHandle(list.isSign ? 'Dash' :'Detail',list)">
                        {{list.isSign || $t('m.check')}}
                    </div>
                </li>
            </ul>
        </div>

        <div class="rw-pic bs-rw-pic flex v sb">
            <div class="rw-pic-hd wcolor" style="paddingLeft: 30px">
                <p>{{$t('m.hyjclj')}}</p>
                <p class="towrap"><span :class="`${isMobile ? 'f34' : 'f60'}`">{{sum}}</span> <span>USD</span></p>
            </div>
            <!-- <XXLogo :iconsrc="iconsrc" :name="$i18n.locale == 'zh' ? data.project_name : data.project_name_en" link="https://coinoah.com"/> -->

            <XXLogo :iconsrc="iconsrc"/>
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
import {mapGetters} from 'vuex';
import Big from 'bignumber.js'
const ht = (el, value) => {
    [...el.children].forEach((el, index) => {
        if(index < value) {
            el.style.display = 'block'
        }
        else {
            el.style.display = 'none'
        }
    })
};
export default {
    components: {
        Detail,
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
    directives: {
        collapse: {
            bind(el, binding) {
                const value = binding.value;
                ht(el, value)
            },
            update(el, binding) {
                 let value = binding.value;
                 if(value == 'all') {
                     value = el.children.length;
                 }
                 ht(el, value)
            },
            unbind(el) {
               
            }
        }
    },
    data() {
        return {
            iconsrc:require('../../../assets/images/lemon.png'),
            // iconsrc:require('../../../assets/images/jianjian.png'),
            dialogVisible: false,
            fullScreen: false,
            panel: '',
            panelData:0,
            popShow: false,
            panelShow: false,
            lists: [],
            listsum:0,
            descshow: false,
        }
    },
    methods: {
        panelHandle(type,item) {
            if(this.isMobile) {
                let t = {
                    Detail: () => {
                        return this.$router.push({name: 'bsdetail',query: {id:item.id}});
                    }, 
                    Dash: () => {
                        return this.$router.push({name: 'bsdash', params: {id: this.$route.params.id}});
                    }
                }[type]();
                return;
            }
            if(type == 'Dash') {
               window.open(`./#/bs/${this.$route.params.id}/dash`);
            }
            else {
                this.fullScreen = ['Dash'].includes(type);
                this.panel = {Detail}[type];
                this.panelShow = true;
                if(type == 'Calcer') {
                    this.panelData = {type: 1};
                }
                else {
                    this.panelData = item;
                }
            }
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

