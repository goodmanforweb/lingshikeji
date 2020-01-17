<template>
    <div class="record re">
        <div class="re-wrap" style='paddingTop: 40px'>
            <div class="flex sb vc tcolor p20">
                <div class="fw">{{$route.params.name | uppercase}} {{$t('m.cjoyjyjl')}}</div>
                <div class="re-btns flex">
                    <router-link :to="`?asset=${$route.query.asset}&block=${$route.query.block}&type=${btn.text}`" v-for="(btn, index) in btns" :key="index">{{$t(`m.${btn.text}`)}}</router-link> 
                </div>
            </div>

            <div class="re-table">
                <div class="re-table-hd f12 gcolor flex">
                    <span style="minWidth: 80px"></span>
                    <span class="flex1 center" v-for="(head, index) in header" :key="index">{{$t(`m.${head}`)}}</span>
                </div>
                <div class="re-table-bd tcolor f12" v-loading="loader">
                    <div class="re-table-hd-row flex block" v-for="(list, index) in lists" :key="index">
                        <span style="minWidth: 80px"  class="center">
                            <i :class="`re-icon re-${list.stat}`"></i>
                        </span>
                        <span class="flex1 center cancopy" :data="list[item+'raw']" :title="list[item+'raw'] ? list[item+'raw'] : ''" 
                        v-for="(item, idx) in header.slice(0, -1)" :key="idx">{{list[item.toLowerCase()]}}</span>
                        <span class="flex1 center fw">{{list.state}}</span>
                    </div>
                    <NoRecord style="minWidth:100%;" :hasicon="true" :text="$t('m.zshimeiyoujl')" class="flex hc vc v" v-if="lists.length == 0"/>

                </div>
            </div>

            <Pager v-model="page" :total='total' v-if="lists.length > 0"/>

        </div>
    </div>
</template>

<script>
import {iconConfig, iconTextConfig} from './iconconfig'
import {mapGetters} from 'vuex'
import Clipboard from "clipboard";
const header = [
                'time',
                'address',
                'TXID',
                'amount',
                'state'];
let  txheader = header.slice(0);
txheader.splice(4, 0,'chargefee');
export default {
    data() {
        return {
            loader: false,
            total:0,
            size: 12,
            page: 1,
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
            header,
            lists: []
        }
    },
    created() {
       if(!this.$route.query.type) {
           return this.$router.replace({query: {...this.$route.query, type:'cz'}})
       }
       this.reset();
       this.pagerHandle(1);
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
            this.header = this.$route.query.type == 'cz' ? header : txheader;
            this.lists = [];
            this.size = 12;
            this.page = 1;
            this.total = 0;
        },
        pagerHandle(page) {
            this.page = page;
            this.getLists();
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
        getLists() {
            this.type = this.$route.query.type || 'cz';
            let type = this.type.toUpperCase();
            let filters = this.$root.$options.filters;
            if(this.loader || !this.$route.query.asset) return;
            this.loader = true;
            const param = {};
            if(type == 'AUDIT') {
                type = 'TX';
                param.is_audit = true
            }
            
            request[`get${type}Lists`]({
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
                if(util.isEmpty(res.data)) return;
                this.total = Math.ceil(res.data.count/this.size);
                this.hasTotal = true;
                let t = Object.values(res.data);
                if(t.length ==0) return;
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
                this.lists = this.store;
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
        '$route': {
            handler: function(n) {
                this.reset();
                this.getLists();
            }
        },
        page(n) {
            this.pagerHandle(n)
        }
    }
}
</script>

<style lang="scss">
.recordPanel .rp-aside {
    left: 0;
}
.record {
    position: relative;
}

.re-hd {
    text-align: right;
    margin: 10px 0;
}
// .re-close {
//     color:#A0B8C4;
//     background: #fff;
//     border-radius: 4px;
//     padding: 2px 10px;
//     cursor: pointer;
// }
.re-table-hd {
    padding: 0 16px;
}
.re-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
}
.re-suc {
    background: url(../../assets/images/suc.png) no-repeat center/contain;
}
.re-fail {
    background: url(../../assets/images/fail.png) no-repeat center/contain;
}
.re-audit {
    background: url(../../assets/images/audit.png) no-repeat center/contain;
}
.re-check {
    background: url(../../assets/images/check.png) no-repeat center/contain;
}
.re-table-hd-row {
    border-radius: 4px;
    margin: 10px 0;
    cursor: pointer;
}
.pc {
    .re-wrap {
        width: 860px;
        margin: 0 auto;
        .kj-pager {
            width: 160px;
        }
    }
    .re-btns {
        >a {
            border: 1px solid #086599;
            text-align: center;
            color:#086599;
            border-radius: 4px;
            transition: all .3s linear;
            padding: 2px 10px;
            margin: 0 10px;
            cursor: pointer;
        }
        a.active, a.router-link-exact-active {
            color:#fff;
            background: #086599;
        }
    }
}

</style>

