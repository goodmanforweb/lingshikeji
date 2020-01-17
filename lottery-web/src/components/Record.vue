<template>
    <div class="record block">
        <div class="record-tit f18">
            <ul class="flex  xx-tab" @click="changeTab">
                <li v-for="(tab, index) in tabs" :key="index" :class="{active: tab.active}">{{tab.name}}</li>
            </ul>
        </div>
        <div class="record-table exchange-record">
            <el-table
            :data="tableData"
            :max-height="tableHeight"
            style="width: 100%">
                <el-table-column
                    prop="time"
                    :label="$t('ms.time')"
                    min-width="120"
                    >
                </el-table-column>
                <el-table-column
                    prop="pair"
                    :label="$t('ms.pair')"
                    >
                </el-table-column>
                <el-table-column
                    prop="amount"
                    :label="$t('ms.amount')">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import util from 'util';
import mixin from './mixins/scroller';
import {mapGetters} from 'vuex';
import Hub from 'hub';
import Big from 'bignumber.js';
export default {
    data() {
        return {
            tableData: [],
            exchangeLoader: false,
            tableHeight: 'auto',
            activeName: 'game',
            tabs: [
                {name: this.$t('ms.depositrecord'), active: true}, 
                {name: this.$t('ms.withdrawrecord'), active: false}
                ]
        }
    },
    created() {
        this.tabIndex = 0;
        Hub.$on('exchangeDone', data => {
            if(data && data.type) {
                this.tabIndex = {
                    withdraw: 1,
                    deposit:0
                }[data.type];
                this.showTab(this.tabIndex);
            }
            this.fetchInit();
            this.fetchMore();
        });
        this.fetchInit();
        this.fetchMore();
    },
    mixins: [mixin],
    computed: {
        ...mapGetters(['isMobile'])
    },
    mounted() {
        this.showTab(this.tabIndex);
        // 移动端 pc  统一下拉刷新处理
        this.addScrollListener(this.isMobile ? 'window' : '.exchange-record .el-table__body-wrapper', this.fetchMore);
    },
    methods: {
        changeTab(e) {
            let target = e.target;
            if(target.tagName != "LI") return false;
            let targetIndex = null;
            [...target.parentElement.children].forEach((el,index) => {
                if(el == target) {
                    targetIndex = index;
                    return false;
                }
            });

            if(targetIndex == null) return false;
            this.showTab(targetIndex);
            
        },
        showTab(targetIndex) {
            //tabs
            this.tabs.forEach((el, index) => {
                el.active = index == targetIndex;
            });
            //targetIndex
            this.tabIndex = targetIndex;
            this.fetchInit();
            
            this.fetchMore();
        },
        fetchInit() {
            this.initLoader();
            this.tableData = [];
            this.tableHeight = this.isMobile ? 'auto' : '500';
            this.pager = 0;
            this.count = null;
            this.size = Math.ceil((this.isMobile ? window.innerHeight : this.tableHeight)/48);
        },
        fetchMore(done) {
            // 翻页计数器
            console.log('er');
            if (this.exchangeLoader) {
                done && done(true);
                return;
            }
            if (this.count) {
                if (this.pager * this.size >= this.count) {
                    done && done(true)
                    return false;
                }
            }
            this.pager++;
            this.tabIndex == 0 ? this.getExchangeHistory().finally(() => done && done()) : this.getWidthdrawRecord().finally(() => done && done());
            
        },
        getExchangeHistory() {
            this.exchangeLoader = true;
            return util.getExchangeRecord({
                params: {
                    size:  this.size,
                    offset: (this.pager-1)*this.size,
                    orderby:'create_time',
                    order:'desc'
                }
            }, this)
            .then(res => {
                if(res.data.code == 0) {
                    let data = res.data;
                    this.count = data.count;
                    let filter = this.$options.filters;
                    if(Array.isArray(data.list)) {
                        this.tableData = this.tableData.concat(data.list.map(el => (
                            {
                                time: filter.format(el.createtime),
                                pair: 'CJT/JLT',
                                amount: filter.currency(Big(el.total_fee).div(100).toNumber())
                            }
                        )));
                    }
                    
                }
            })
            .catch(err => {
              this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {this.exchangeLoader = false})
        },
        getWidthdrawRecord() {
            this.exchangeLoader = true;
            return util.getWidthdrawRecord({
                params: {
                    size:  this.size,
                    offset: (this.pager-1)*this.size,
                    orderby:'create_time',
                    order:'desc'
                }
            }, this)
            .then(res => {
                if(res.data.code == 0) {
                    let data = res.data;
                    this.count = data.count;
                    let filter = this.$options.filters;
                    if(Array.isArray(data.list)) {
                        this.tableData = this.tableData.concat(data.list.map(el => (
                            {
                                time: filter.format(el.createtime),
                                pair: 'JLT/CJT',
                                amount: filter.currency(Big(el.value).div(100).toNumber())
                            }
                        )));
                    }
                    
                }
            })
            .catch(err => {
              this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {this.exchangeLoader = false})
        }
    }
}
</script>

<style lang="scss">
.record {
    overflow: hidden;
}
.record-tit {
    height: 47px;
    line-height: 47px;
    padding: 0 32px;
    text-transform: capitalize;
    color:var(--goldcolor);
    background-color: var(--textcolor);
    .xx-tab {
        margin: 0;
        li {
            padding:0;
            color:#fff;
            opacity: .47;
        }
        li.active {
            opacity: 1;
            color:#fff;
        }
        li.active:after {
            bottom: 4px;
            right:0;
            background-color: #fff
        }
    }
}

.mobile {
    .record-tit {
        .xx-tab {
            li {
                color:var(--textcolor);
                opacity: .47;
            }
            li.active {
                opacity: 1;
                color:var(--textcolor);
            }
            li.active:after {
                bottom: 4px;
                background-color:var(--textcolor);
            }
        }
    }
}
.el-table {
    font-family: arial;
    .cell {
        font-size: 18px;
        color:#7C7565;
        text-align: center;
    }
    thead {
        .cell {
            text-transform: capitalize;
            font-weight: bold
        }
    }
    .el-table td, .el-table th.is-leaf {
        border-color: #cac7bf4d;
    }
    
}
</style>


