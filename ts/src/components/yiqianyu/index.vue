<template>
<Page :title="$t('m.yiqianyue')" borderLine padding routerBack="/index">
    <div class="hub">
        <Scroll :disable="true">
            <div class="hub-bd flex" :class="{v:isMobile}">
                <div class="hub-cube-lists flex1 flex fwrap" :class="{sb:isMobile}" v-loading="loader">
                    <div class="block center re" 
                :class="{qybackcolor: list.icon}" 
                v-for="(list, index) in lists" 
                :key="index" 
                @click="itemhandle(list)">
                    <span v-if="list.icon" :class="`icon-state ${list.icon}-icon`"></span>
                    <span :class="`f12  fuper ${list.state[1]}`" v-if="list.state">{{$t(`m.${list.state[0]}`)}}</span>
                    <div class="tcolor f20 fuper">{{list.name}}</div>
                    <div class="hub-icon" :class="{active: !list.metadata.img}" style="list.state[2] ? 'filter:grayscale(100%)' : '' " ><img  :src="list.metadata.img" alt=""></div>
                    <div class="f12 redcolor" style="height: 24px" >
                        {{
                            {'1': $t('m.hydaoqi', {day: list.endday[1]}), '0': '', '-1': $t('m.hyydq')}[list.endday[0]]
                        }}

                    </div>
                    <div class="f12 tcolor">{{$t('m.hasout')}} <br> {{list.history_earnings}} USD</div>
                    <!-- <div class="gcolor f12 last-line fuper">{{list.class_nametext}}{{$t('m.lkjyx2')}}</div> -->
                </div>
                <NoRecord style="minWidth:100%;" :hasicon="true" :text="$t('m.zshimeiyouxm')" class="flex hc vc v" v-if="lists.length == 0"/>

                </div>
                <div class="hub-aside flex v sb">
                    <div class="kj-state">
                        <ul :class="`${isMobile ? 'flex sb f12 kj-state-dot' : ''} re`">
                            <li @click="radioHandle(index, radio)" :class="{active: radio.active}" v-for="(radio, index) in radios" :key="index">{{$t(`m.${radio.text}`)}}</li>
                        </ul> 
                    </div>
                    <!-- <Pager style="minWidth: 130px" @change="pagerHandle" :total='total'/> -->
                </div>
            </div>
        </Scroll>
    </div>
</Page>
</template>

<script>
export default {
    computed: {
        isMobile() {
            return this.$store.getters.isMobile
        }
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
                    type:0
                },
                {
                    text: 'proisbuying',
                    active: false,
                    type:2
                },
                {
                    text: 'proexe',
                    active: false,
                    type: 4
                },
                {
                    text: 'over',
                    active: false,
                    type: 8
                }
            ],
            lists: []
        }
    },
    created() {
        this.reset();
        this.type = 0;
        this.init();
    },
     methods: {
         init() {
             if(!this.isMobile) {
                this.panelShow = !!this.$route.params.id
             }
             !this.isMobile ? this.pagerHandle(1) : this.fetch();
         },
         reset() {
            this.hasTotal = false;
            this.lists = [];
            this.size = this.isMobile ? 12 : 6;
            this.page = this.isMobile ? 0 : 1;
            this.total = null;
        },
        radioHandle(idx, value) {
            this.radios.forEach((el, index) => {
                el.active = index == idx;
                if(el.active) {
                    this.type = el.type;
                    this.reset();
                    this.getLists()
                    .then(res => {this.lists = res;})
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
            if(this.loader || (this.hasTotal && this.page*this.size >= this.total)) return Promise.resolve();
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
            return request.getSignHubLists({
                params: {
                    key: this.type,
                }
            })
            .then(res => {
                const data = res.data;
                if(!Array.isArray(data.list)) return [];
                const lang = this.$i18n.locale == 'zh';
                const config = {
                    'I类合约':'I type of program ',
                    'II类合约':'II type of program ',
                }
                data.list.forEach(el => {
                    el.metadata = JSON.parse(el.metadata)
                    el.icon = this.getIcon(el);
                    el.state = this.getState(el);
                    el.endday = this.getDay(el);
                    el.class_nametext = lang ? el.class_name : config[el.class_name];
                    el.history_earnings = el.history_earnings ? util.fromHex(el.history_earnings, el.decimals || 18, 4) : 0
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
                this.$router.push({name: `${{'I类合约': 'ddash', 'II类合约': 'bsdash'}[item.class_name]}`, params: {id:item.id}})
            }
            else {
                let t = {
                    'I类合约': () => {
                    window.open(`./#/fws/${item.id}/ddash`);
                }, 'II类合约': () => {
                     window.open(`./#/bs/${item.id}/dash`);
                }}[item.class_name]();
            }
        }
    }
}
</script>

<style lang="scss">
</style>

