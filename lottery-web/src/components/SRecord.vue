<template>
    <div class="record block level-record">
        <div class="record-tit f18">
            {{$t('ms.mth', {level: levelname})}}
        </div>
        <div class="record-table">
            <el-table
            :data="tableData"
            v-loading="!isMobile ? exchangeLoader : false"
            :max-height="tableHeight"
            style="width: 100%">
                <el-table-column
                    prop="time"
                    :label="$t('ms.rtime')"
                    >
                </el-table-column>
                <el-table-column
                    prop="game"
                    :label="$t('ms.game')"
                    >
                </el-table-column>
                <el-table-column
                    prop="type"
                    :label="$t('ms.type')">
                </el-table-column>
                 <el-table-column
                    prop="odds"
                    :label="$t('ms.odds')">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
const levelConfig = ['superjoy','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth'];

import util from 'util';
import mixin from './mixins/scroller';
import {mapGetters} from 'vuex';
import Big from 'bignumber.js';
export default {
    data() {
        return {
            tableData: [],
            exchangeLoader: false,
            tableHeight: 'auto',
            levelname: ''
        }
    },
    computed: {
        ...mapGetters(['isMobile', 'roomList'])
    },
    created() {
        
    },
    mounted() {
        this.addScrollListener(this.isMobile ? 'window' : '.record-table .el-table__body-wrapper', this.fetchMore);
    },
    mixins: [mixin],
    methods:{
        fetchInit() {
            this.pager = 0;
            this.count = null;
            this.empty = false;
            this.tableHeight = this.isMobile ? 'auto' : '500';
            this.size = Math.ceil((this.isMobile ? window.innerHeight : this.tableHeight)/48);
        },
        fetchMore(done) {
            if (this.exchangeLoader || this.empty) {
                done && done(true)
                return ;
            }
            if (this.count) {
                if (this.pager * this.size >= this.count) {
                    done && done(true)
                    return false;
                }
            }
            this.pager++;
            this.getRecord().finally(() => done && done());
        },
        getRecord() {
            this.exchangeLoader = true;
            return util.getLotteryRecordByRoom({params: {
                room_id: this.room_id,
                level: Number(this.level),
                size:  this.size,
                offset: (this.pager-1)*this.size,
            }}, this)
            .then(res => {
                if(res.data.code == 0) {
                    this.count = res.data.count;
                    if(util.isEmpty(res.data.list)) {
                        this.empty = true
                    }
                    else {
                        let filters = this.$options.filters;
                                
                        let d = res.data.list.reduce((prev, next) => prev.concat(next.tickets), []);
                        d = d.map(el => {
                            let name = this.roomList.find(rm => rm.id == el.record);
                            name = name ? name.name : '';
                            return {
                                time: filters.format(el.createtime),
                                game: el.pid,
                                type: name,
                                odds: filters.currency(Big(el.award).div(100).valueOf())
                            }
                        });
                        this.tableData = this.tableData.concat(d);
                    }
                }
            })
            .catch(err => {
                this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                this.exchangeLoader = false;
            })
        }
    },
    watch: {
        roomList: {
            deep: true,
            immediate: true,
            handler: function(n) {
                if(!util.isEmpty(n)) {
                    let {level, roomid} = this.$route.query;
                    if(level != undefined && roomid) {
                        this.levelConfig = levelConfig.map(el => this.$t(`ms.${el}`));
                        this.levelname = this.levelConfig[level];
                        this.level = level;
                        this.room_id = roomid;
                        this.fetchInit();
                        this.fetchMore();
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
.level-record {
    .record-tit {
        text-transform: capitalize
    }
}
</style>


