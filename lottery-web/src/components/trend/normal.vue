<template>
    <div class="bt-table">
        <CVTable :xnum="xnum" :data="data" type='gray' :tableHeight="tableHeight"></CVTable>
    </div>
</template>
<script>
import CVTable from '../widget/canvastable/table.vue';
import util from 'util';
import {mapGetters, mapActions} from 'vuex';
import mixin from '../mixins/scroller';
export default {
    data() {
        return {
            xnum:69,
            data:[],
            tableLoader: false,
            tableHeight: 'auto'
        }
    },
    components: {
        CVTable
    },
    created() {
        this.tableHeight = this.isMobile ? 'auto' : window.innerHeight*0.8;
    },
    mixins: [mixin],
    computed: {
      ...mapGetters(['trendid', 'isMobile', 'roomList'])
    },
    mounted() {
        // 移动端 pc  统一下拉刷新处理
        this.addScrollListener(this.isMobile ? 'window' : '.bt-table .x-table-body-container', this.fetchMore);
    },

    methods: {
        findActiveRoom(id) {
            if(this.roomList.length > 0 ) {
                this.active = this.roomList.find(el => el.id == id);
                if(!this.active) {
                    this.$message.info(this.$t('paramwrong'));
                }
            }
            else {

            }
        },
        fetchInit() {
            this.data = [];
            this.pager = 0;
            this.count = null;
            this.size = Math.ceil((this.isMobile ?  window.innerHeight : window.innerHeight*0.8)/17);
        },
        fetchMore(done) {
            // 翻页计数器
            console.log('er');
            if (this.tableLoader){
                done && done(true)
                return;
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
            this.tableLoader = true;
            return util.getIssueList({params: {
                room_id: this.trendid,
                size: this.size,
                offset: (this.pager-1)*this.size
            }}, this)
            .then(res => {
                if(res.data.code == 0) {
                    this.count = res.data.count;
                  //record 饭回来的是 string object
                    let temp = [];
                    res.data.list.forEach(el => {
                        let tt = {
                            no: el.no,
                            item:[]
                        };
                        el.record = el.record ? JSON.parse(el.record) : el.record;
                        if(el.record != '') {
                            ['ONE','TWO','THREE','FOUR','FIVE'].forEach(k => {
                                tt.item.push(el.record[k])
                            });
                        }
                        temp.push(tt)
                        
                    });
                    this.data = this.data.concat(temp);
                }
            })
            .catch(err => {
              this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                this.tableLoader = false;
            })
        }
    },
    watch: {
        trendid: {
            immediate: true,
            handler: function(n) {
                if(n) {
                    this.initLoader();
                    this.findActiveRoom(n);
                    this.xnum = this.active.black_max_num;
                    this.fetchInit();
                    this.fetchMore();
                }
            }
        }
    }
}
</script>
<style lang="scss">
.bt-table {
    .el-table td, .el-table th {
        padding: 0;
        // width: 16px;
        height: 16px;
        
    }
    .el-table .cell {
        padding: 0!important;
        font-size: 12px;
        line-height: 16px;
    }
    .el-table th, .el-table td {
        text-align: center;
        font-family: arial;
        border-right: 1px solid #CAC7BF!important;
        border-bottom: 1px solid #CAC7BF!important;
    }
    td.ciclegraye {
        .cell {
            background: linear-gradient(to right,#8B9093, #424242);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            color:#fff;
        }
    }
    td.ciclerede {
    .cell {
            background: linear-gradient(to right,#D97967, #C5493E);
            width: 16px;
            height: 16px;
            border-radius: 50%;
            color:#fff;
        }
    }

}
</style>


