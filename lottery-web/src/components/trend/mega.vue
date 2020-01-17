<template>
<div class="bt-table bt-table-mega" >
    <CVTable :xnum="xnum" :data="data" type='red' :tableHeight="tableHeight"></CVTable>
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
            xnum:29,
            data:[],
            whiteWidth: 100,
            tableLoader: false,
            tableHeight: 'auto',               
        }
    },
    created() {
        this.tableHeight = this.isMobile ? 'auto' : window.innerHeight*0.8;
    },
    mixins: [mixin],
    computed: {
        ...mapGetters(['trendid', 'isMobile', 'roomList'])
    },
    components: {
        CVTable
    },
    mounted() {
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
                            item: []
                        };
                        el.record = el.record ? JSON.parse(el.record) : el.record;
                        if(el.record != '') {
                            tt.item.push(el.record.MEGA)
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
                    this.xnum = this.active.red_max_num;
                    this.fetchInit();
                    this.fetchMore();
                }
            }
        }
    }
}
</script>
<style lang="scss">
.bt-table-mega {
    position: relative;
    .mega-line {
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        // width: 100%;
        // height: 100%;
    }
}

</style>


