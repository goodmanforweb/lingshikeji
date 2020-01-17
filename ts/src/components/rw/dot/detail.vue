<!--  -->
<template>
<Page :title="table.bd[0]" borderLine padding routerBack="rw">
    <!-- <router-link class="tcolor f12" slot="layer-right-btn" to="/guide?type=fws" >{{$t('m.guide')}}</router-link> -->
    <div class="dot-detail">
        <div class="flex sb vc" v-if="!isMobile">
            <span class="tcolor fw f24">
                {{table.bd[0]}}
            </span>
            <!-- <a href="#/guide?type=fws" target="_blank" class="n-btn btn-tcolor-border" style="width: auto">
                {{$t('m.checkguide')}}
            </a> -->
        </div>

        <div class="dh-bar block re tcolor m16">
            <!-- {{$t('m.hyy9')}} -->
            {{$i18n.locale=='zh' ? item.tip : item.tip_en}}
        </div>
        <div class="dot-table f14 m16" v-loading='loader'>
            <table>
                <thead>
                    <tr class="">
                        <td v-for="(h, index) in table.hd" :key='index'>{{$t(`m.${h}`)}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="tcolor">
                        <td v-for="(h, index) in table.bd" :key='index'>{{h}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- v-html="$t('m.hydesc')" -->
        <div class="f14 hcolor m20" v-html="$i18n.locale=='zh' ? item.desc : item.desc_en">
        </div>
        <div class="center">
            <p class="tcolor f14">{{$t('m.kgmesy')+restnum}}</p>
            <el-button :disabled="disabled"   :loading="btnLoader" class="n-btn f20 btn-tcolor hcenter db btn-panel-width" @click="toSign"> {{item.price || 0}}CJS</el-button>
            <p class="f14 tqc">{{$t('m.yuanprice')+(item.lock_limit || 0)}}CJS，{{$t('m.yiyouhui') + (item.discount_rate || 0)}}%</p>
        </div>

        
    </div>
</Page>
</template>

<script>
import Big from 'bignumber.js'
import mixin from '../mixin/mixin'
import {mapGetters} from 'vuex';
export default {
    props:['panelData'],
    mixins:[mixin],
    data () {
        return {
            table: {
                hd: ['fwstype','fwsme','fwsedu','fwsshouyi','fwspower','fwschae','fwsground','fwsbiaoz'],
                bd: []
            },
            item: {
                
            },
            join_num:0,
            id: '',
            loader: false,
            disabled: false
        };
    },
    created() {
        this.id = this.isMobile ? this.$route.query.id : this.panelData.id;
        this.getDetail();
        this.getSignNum();
    },

    components: {},
    computed: {
        ...mapGetters(['signHYDetail']),
        isMobile() {
            return this.$store.getters.isMobile
        },
        star() {
            return this.$route.query.star;
        },
        restnum() {
          return (Number(this.item.open_num) - Number(this.join_num)) || 0;
        }
    },
    mounted() {},
    methods: {
        getSignNum() {
            request.getFWSSignNum({params: {contract: this.id}})
            .then(res => {
                this.join_num = res.data.Count || 0;
            })
        },
        getDetail() {
            if(!this.id) return;
            this.listid = this.id;
            this.loader = true;
            request.getHYDetail({}, {id: this.id})
            .then(res => {
                let data = res.data.metadata ? JSON.parse(res.data.metadata) : {};
                this.id = res.data.project;
                const  t = Big(data.lock_limit).times(data.discount_rate || 0).times(1e-2);
                data.price = Big(data.lock_limit).minus(t).toNumber();
                this.item = data;
                const {name, name_en, open_num, lock_limit, yield_rate, power, balance_rate, is_must, next_level_need} = data;
                this.table.bd = [
                    this.$i18n.locale == 'zh' ? name : name_en, 
                    open_num, 
                    lock_limit+"CJS", 
                    yield_rate+"%", power+"%", 
                    balance_rate+"%", 
                    is_must ? this.$t('m.shi') : this.$t('m.fou'), 
                    next_level_need+"USD"
                    ];
            })
            .finally(() => {
                this.loader = false
            })
        },
        
    },
    watch: {
        signHYDetail: {
            immediate: true,
            deep: true,
            handler: function(n) {
                if(n.quota > 0) {
                  this.disabled = n.isSign;
                }
            }
        }
    }
}

</script>
<style lang='scss'>
.pc {
    .dot-detail {
        width: 760px;
    }
    .btn-panel-width {
        width: 250px;
    }
}
.mobile {
    .dot-table {
        overflow-x: auto;
        table {
            width: 600px;
        }
    }
}
.btn-panel-width.el-button {
    background: #196593;
    color: #fff;
    padding: 12px 10px;
    height: auto;
    line-height: 1;
    display: block;
    margin: 0 auto;
    font-size: 20px;
}
.dot-table {
    table {
        border-collapse: collapse;
        text-align: center;
        border-radius: 4px;
        overflow: hidden;
    }
    thead {
        background: #086599;
        color:#fff;
        td {
            height: 50px;
            border-right: 1px solid #fff;
        }
        td:last-child {
            border:none
        }

    }
    tbody {
        background: #fff;
        td {
            height: 60px;
            border-right: 1px solid rgba(8, 101, 153,.1);
        }
        td:last-child {
            border:none
        }
        tr td:first-child {
            background: rgba(8, 101, 153,.15);
        }
    }
    
}
</style>