<template>
    <Page :title="$t('m.cjoyjyjl')" borderLine padding routerBack="/wallet">
    <Scroll :fetch="fetch" ref="scroll" :initListener="true">
         <div class="record re">
            <div class="re-wrap block" >

               <div class="re-btns flex ">
                    <router-link class="flex1 tcolor" :to="`?asset=${$route.query.asset}&block=${$route.query.block}&type=${btn.text}`" v-for="(btn, index) in btns" :key="index">{{$t(`m.${btn.text}`)}}</router-link> 
                </div>
                
                <div class="re-table">
                    <el-table
                    :data="lists">
                    <el-table-column
                    prop="stat"
                    width="30px"
                    >
                    <span slot-scope="scope" class="center">
                        <i :class="`re-icon re-${scope.row.stat}`"></i>
                    </span>
                    </el-table-column>
                    <el-table-column
                    prop="time"
                    :label="$t('m.jytime')"
                    min-width="100px"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    :label="$t('m.dizhi')"
                    min-width="140px"
                    >
                    <template slot-scope="scope">
                        <span class="cancopy" :data="scope.row.addressraw">{{scope.row.address}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="txid"
                    label="TXID"
                    min-width="140px"
                    
                    >
                    <template slot-scope="scope">
                        <span class="cancopy" :data="scope.row.txidraw">{{scope.row.txid}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="amount"
                     :show-overflow-tooltip='true'
                    :label="$t('m.amount')">
                    </el-table-column>
                    <el-table-column
                    v-if="isShow"
                    prop="chargefee"
                     :show-overflow-tooltip='true'
                    :label="$t('m.chargefee')">
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    :label="$t('m.state')">
                    </el-table-column>
                </el-table>
                </div>
                
            </div>
        </div>
    </Scroll>
    </Page>
</template>
<script>
import {iconConfig, iconTextConfig} from './iconconfig'
import Clipboard from "clipboard";


export default {
    data() {
        return {
            btns: [
                {
                    name:'deposit',
                    text:'cz',
                    active:true
                },
                {
                    name:'withdraw',
                    text:'tx',
                    active: false
                },
                {
                    name:'audit',
                    text:'audit',
                    active: false
                },

            ],
            lists: [],
            isShow: false
        }
    },
    created() {
        if(!this.$route.query.type) {
           this.$router.replace({query: {...this.$route.query, type:'cz'}})
        }
        this.reset();
    },
    mounted() {
        this.$refs.scroll.goFetch();
    },
    beforeDestroy() {
        this.oldcopy && this.oldcopy.destroy();
    },
    methods: {
        createCopy() {
           this.oldcopy && this.oldcopy.destroy();
           this.oldcopy = new Clipboard(this.$el.getElementsByClassName('cancopy'), {
                text: function(trigger) {
                    return trigger.getAttribute("data");
                }
            }).on("success", e => {
                this.$message.info(this.$t("m.copysuc"));
                e.clearSelection();
            })
        },
        reset() {
            this.isShow = this.$route.query.type != 'cz';
            this.lists = [];
            this.size = Math.ceil(window.innerHeight/47);
            this.page = 0;
            this.total = null;
            this.hasTotal = false;
            this.finish = false;
        },
        getIconText(status) {
            if(this.type == 'cz') {
                status = status === 'Committed' ? 'Committed2' : status
            }
            return this.$i18n.locale == 'zh' ? iconTextConfig[status] : status
        },
        getIconState(status) {
            if(this.type == 'cz') {
                status = status === 'Committed' ? 'Committed2' : status
            }
            return iconConfig[status] 
        },
        txHandle(tx, filters) {
            if(/^#.*/.test(tx)) {
                return this.$t('m.neibuzz')
            }
            else {
                return filters.clip(tx || '')
            }
            return ''
        },
        fetch() {
          if(this.loader || this.finish || (this.hasTotal && this.page*this.size >= this.total)) return Promise.resolve();
            this.page++;
            return this.getLists()
        },
        getLists() {
            this.type = this.$route.query.type || 'cz';
            let type = this.type.toUpperCase();
            let filters = this.$root.$options.filters;
            if(this.loader || !this.$route.query.asset) return Promise.reject();
            this.loader = true;
            const param = {};
            if(type == 'AUDIT') {
                type = 'TX';
                param.is_audit = true
            }
            return request[`get${type}Lists`]({
                params: {
                    ...param,
                     order:'created_time',
                    desc: true,
                    asset: this.$route.query.asset,
                    pagesize: this.size,
                    offset: (this.page-1)*this.size
                }
            })
            .then(res => {
                this.total = Number(res.data.count);
                this.hasTotal = true;
                let t = Object.values(res.data);
                if(!Array.isArray(t[1]) || t.length ==0) return this.finish = true;
                t = t[1];
                this.store = [];
                t.forEach(el => {
                    let status = el.status || el.audit_status;
                    this.store.push({
                        timeraw:filters.format(el.createtime),
                        time: filters.format(el.createtime),
                        addressraw: el.wallet || el.to,
                        address: filters.clip(el.wallet || el.to),
                        txidraw: el.tx || '',
                        txid: this.txHandle(el.tx, filters),
                        amountraw: filters.currency(util.fromHex(el.value, el.decimals), 4),
                        amount: filters.currency(util.fromHex(el.value, el.decimals), 4),
                        chargefeeraw: filters.currency(util.fromHex(el.charge || 0, el.decimals), 4),
                        chargefee: filters.currency(util.fromHex(el.charge || 0, el.decimals), 4),

                        state: this.getIconText(status),
                        stateraw:this.getIconText(status),
                        stat: this.getIconState(status)
                    })
                });
                this.lists = this.lists.concat(this.store);
                this.store = [];
                this.$nextTick(() => {
                    this.createCopy();
                })
            })
            .finally(() => {
                this.loader = false;
            })
        }
    },
    watch: {
        '$route.query.type': {
            handler: function(n, p) {
                if( n && p ) {
                    this.reset();
                    this.$refs.scroll.goFetch();
                }
            }
        }
    }

}
</script>

<style lang="scss">


.re-hd {
    text-align: right;
    margin: 10px 0;
}
.re-table {
    padding: 16px;
}
.re-table-hd {
    padding: 0 16px;
}
.re-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
}

.mobile {
    .re-wrap {
        overflow-x: auto;
        padding: 0;
    }
    .re-btns {
        >a, >span {
            height: 20px;
            text-align: center;
            transition: all .3s linear;
            padding: 20px 10px;
            opacity: .3;
        }
        a.active, a.router-link-exact-active, span.active {
            color:#fff;
            background: #086599;
        }
    }
}
</style>

