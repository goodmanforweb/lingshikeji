<template>
<Page :title="$t('m.hubcenter')" borderLine padding routerBack="/index">
    <div class="hub">
        <div class="hub-ad" v-if="false">广告</div>
        <Scroll :fetch="fetch" :disable="!isMobile">
        <div class="hub-bd flex" :class="{v:isMobile}">
            <div class="hub-cube-lists flex1 flex fwrap" :class="{sb:isMobile}" v-loading="loader && !isMobile">
                <div class="block center re" 
                :class="{qybackcolor: list.icon}" 
                v-for="(list, index) in lists" 
                :key="index" 
                @click="itemhandle(list)">
                    <span v-if="list.icon" :class="`icon-state ${list.icon}-icon`"></span>
                    <span :class="`f12 fuper ${list.state[1]}`" v-if="list.state">{{$t(`m.${list.state[0]}`)}}</span>
                    <div class="tcolor f20 fuper">{{list.nametext}}</div>
                    <div class="hub-icon" :class="{active: !list.metadata.img}" style="list.state[2] ? 'filter:grayscale(100%)' : '' " ><img  :src="list.metadata.img" alt=""></div>
                    <div class="f12 redcolor" style="height: 24px" >
                        {{
                            {'1': $t('m.hydaoqi', {day: list.endday[1]}), '0': '', '-1': $t('m.hyydq')}[list.endday[0]]
                        }}
                    </div>
                    <div class="f12 tcolor">{{list.metadata.min}}CJS{{$t('m.qi')}}</div>
                    <div class="gcolor f12 last-line fuper">{{list.contract_num}}{{$t('m.lkjyx')}}</div>
                </div>
                <NoRecord style="minWidth:100%;" :hasicon="true" :text="$t('m.zshimeiyouxm')" class="flex hc vc v" v-if="lists.length == 0"/>
            </div>
            <div class="hub-aside flex v sb">
                <div class="kj-state">
                    <ul :class="`${isMobile ? 'flex sb f12 kj-state-dot' : ''} re`">
                        <li @click="radioHandle(index, radio)" :class="{active: radio.active}" v-for="(radio, index) in radios" :key="index">{{$t(`m.${radio.text}`)}}</li>
                    </ul> 
                </div>

                <Pager style="minWidth: 130px;" v-model="page"  :total='total' />

            </div>
        </div>
        </Scroll>
        <RightPanel :show.sync="panelShow"  :fullScreen="true" class="hubPanel" routerBack="/hub">
            <router-view></router-view>
        </RightPanel>
    </div>
</Page>
</template>

<script>
import {mapGetters} from 'vuex';
import Hub from '../../Hub.js'
export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            loader: false,
            total:1,
            panel:'',
            panelShow: false,
            radios: [
                {
                    text: 'allpro',
                    active: true,
                    type: 0
                },
                {
                    text: 'proisbuying',
                    active: false,
                    type:2
                },
                {
                    text: 'proexe',
                    active: false,
                    type:4
                },
                {
                    text: 'over',
                    active: false,
                    type:8
                }
            ],
            lists: [],
            page:0
        }
    },
    created() {
        console.log(this,9090)
        this.fresh();
        this.listenerBuySuc();
    },
    beforeDestroy() {
        Hub.$off('buysucEvent');
    },
     methods: {
         listenerBuySuc() {
             Hub.$on('buysucEvent', data => {
                 data && this.fresh();
             })
         },
         fresh() {
            this.reset();
            this.type = 0;
            this.init();
         },
         init() {
             if(!this.isMobile) {
                this.panelShow = !!this.$route.params.id
             }
             !this.isMobile ? this.pagerHandle(1) : this.fetch();
         },
         reset() {
            this.finish = false;
            this.hasTotal = false;
            this.lists = [];
            this.size = this.isMobile ? 12 : 6;
            this.page = this.isMobile ? 0 : 1;
            this.total = 1;
        },
        radioHandle(idx, value) {
            this.radios.forEach((el, index) => {
                el.active = index == idx;
                if(el.active) {
                    
                    this.type = el.type;
                    this.reset();
                    this.init();
                }
            })
        },
        //pc端使用
        pagerHandle(page) {
            this.page = page;
            this.getLists()
            .then(res => {
                this.lists = res;
            })
        },
        //移动端使用
        fetch() {
            if(this.loader || this.finish || (this.hasTotal && this.page*this.size >= this.total)) return Promise.reject();
            this.page++;
            return this.getLists()
            .then(res => {
                this.lists = this.lists.concat(res);
            })
        },
        getIcon(el) {
            let timecha = new Date(el.end_time).getTime() - new Date().getTime()
            if(el.user_contract_id && timecha > 0) {
                return 'yqy'
            }
            else if(el.user_contract_id && timecha <= 0) {
                return 'qysx'
            }
            else if(el.trial) {
                return 'tzrz'
            }
            return null
        },
        getState(el) {
            let state = {
                0: ['',''],
                Open: ['buying','tcolor'],
                Open: ['buying','tcolor'],
                Executing: ['exe','lcolor'],
                Closed: ['over','gcolor', 1]
            }[el.status || 0];
            return state
        },
        getDay(el) {
            if(!el.end_time) return [false, false];
            let cd = new Date(el.end_time).getTime() - new Date().getTime();
            if(cd <= 0) {
                return [-1, false]
            }
            cd = cd/1000;
            cd = Math.floor(cd/(24*60*60));

            return cd <=7 ? [1, cd] : [0, false];
        },
        getLists() {
            let filters = this.$root.$options.filters;
            this.loader = true;
            return request.getHubLists({
                params: {
                    key: this.type,
                    pagesize: this.size,
                    offset: (this.page-1)*this.size
                }
            })
            .then(res => {
                const data = res.data;
                if(!Array.isArray(data.list)) {
                    this.finish = true;
                    return [];
                }
                const lang = this.$i18n.locale == 'zh';
                const config = {
                    'I类合约':'I type of program ',
                    'II类合约':'II type of program ',
                }
                data.list.forEach(el => {

                    el.metadata = JSON.parse(el.metadata);
                    el.icon = this.getIcon(el);
                    el.state = this.getState(el);
                    el.endday = this.getDay(el);
                    el.class_nametext = lang ? el.class_name : config[el.class_name];
                    el.nametext = lang ? el.name : (el.metadata.name_en || el.name);
                })

                this.total = Math.ceil(data.count/this.size);
                this.hasTotal = true;
                //处理过的数据
                return data.list;
            })
            .finally(() => {
                this.loader = false;
            })
        },
        itemhandle(item) {
            if(this.isMobile) {
                this.$router.push({name: `${{'I类合约': 'mdot', 'II类合约': 'mbs'}[item.class_name]}rw`, params: {id:item.id}})
            }
            else {
                this.$router.push({name: `${{'I类合约': 'pdot', 'II类合约': 'bs'}[item.class_name]}rw`, params: {id:item.id}})
                this.panelShow = true
            }

            
        }
    },
    watch: {
        $route: function(n) {
            if(!this.isMobile) {
                this.panelShow = !!this.$route.params.id
             }
        },
        page(n) {
            !this.isMobile && this.pagerHandle(n);
        }   
    }
}
</script>

<style lang="scss">
.qybackcolor {
    background-color: #EAF4FF;
}
.icon-state {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 46px;
    height: 46px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 35px auto;
}
.mobile {
    .icon-state {
        width: 35px;
        height: 35px;
        background-size: 25px auto;
    }
}
.zh {
    .yqy-icon {
        background-image: url(../../assets/images/yqyicon.png)
    }
    .qysx-icon {
        background-image: url(../../assets/images/qysxicon.png)
    }
    .tyrz-icon {
        background-image: url(../../assets/images/tyrzicon.png)
    }
}
.en {
    .yqy-icon {
        background-image: url(../../assets/images/yqyiconen.png)
    }
    .qysx-icon {
        background-image: url(../../assets/images/qysxiconen.png)
    }
    .tyrz-icon {
        background-image: url(../../assets/images/tyrziconen.png)
    }
}

.hub-ad {
    height: 100px;
}
.hub-aside {
    width: 120px;
    padding: 8px;
}
.hub-cube-lists>.block {
    width: 233px;
    // height: 266px;
    cursor: pointer;
    line-height: 2;
    margin: 8px;
    box-sizing: border-box;
    transition: all .3s linear;
    border: 1px solid transparent;
}
.hub-cube-lists .hub-icon.active {
    background: url(../../assets/images/jj.png) no-repeat center/60%;
    background-color: #086599;
}
.hub-cube-lists >.block.qybackcolor {
    background: #EAF4FF;
}
.hub-cube-lists>.block:hover, 
.hub-cube-lists>.block.active {
    border: 1px solid #086599;
}
.hub-icon {
    width: 46px;
    height: 46px;
    display: inline-block;
    border-radius: 50%;
    // background: url(../../assets/images/jj.png) no-repeat center/30px;
    // background-color: #196593;
    margin: 16px 0;
}
.last-line {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid rgba(8, 100, 153, 0.1);
    // line-height: 30px;
}
.hubPanel {
    >.rp-aside {
        display: flex;
    }
    >.rp-aside .rw {
        flex: 1
    }

}
.kj-state {
    ul {
        padding-right: 20px;
    }
    ul:after {
        content:'';
        position: absolute;
        top:16px;
        z-index: 0;
        bottom: 16px;
        right: 8px;
        width: 1px;
        border-right: 1px solid #CADDE8;
    }
    li {
        cursor: pointer;
        line-height: 40px;
        text-align: right;
        color:#8E9FA9;
        position: relative;
        transition: all .3s linear;
    }
    li.active {
        color:  #086599;
    }
    li.active:after {
        background: #fff;
        border: 2px solid #086599;
        width: 6px;
        height: 6px;
    }
    li:after {
        content:'';
        position: absolute;
        top:0;
        bottom: 0;
        z-index: 99;
        margin: auto;
        right: -16px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #CADDE8;
        
    }
}
.mobile {
    .kj-state-dot {
        border-top: 1px solid #CADDE8;
        width: 100%;
        padding-top: 6px;
        padding-right:0;
    }
    .hub-aside {
        order: 0;
        width: 100%;
        padding: 0;
    }
    .hub-cube-lists {
        order: 1
    }
    .kj-state {
        li:after {
            top:-52px;
            right: 0;
            left: 0;
            width: 10px;
            height: 10px;
        }
        li:first-child:after {
            left: 0;
            right:auto;
        }
        li:last-child:after {
            left: auto;
            right:0;
        }
    }
    .hub-cube-lists>.block {
        width: 48%;
        margin: 8px 0;
        line-height: 1.8;
    }
    .hub-icon {
        margin: 10px 0;
    }
    .last-line {
        margin-top: 12px;
        padding-top: 10px;
    }
    


}
</style>

