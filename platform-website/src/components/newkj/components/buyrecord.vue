<template>
    <div class="ke-record w1100">
        <div class="kr-tt center">
                <span class="f34 kr-tt-stroke">
                    {{$t('ms.buyrecord')}}
                </span>
            </div>
        <div class="kr-table">
            <el-table
                :data="tableData"
                :max-height="height"
                style="width: 100%">
                <el-table-column
                    prop="time"
                    min-width="150px"
                    :label="$t('ms.dhtime')">
                </el-table-column>
                <el-table-column
                    prop="type"
                    min-width="120px"
                    :label="$t('ms.tltype')">
                </el-table-column>
                
                <el-table-column
                min-width="100px"
                    prop="amount"
                    :label="$t('ms.money') + '(CJT)'">
                </el-table-column>
                </el-table>
        </div>
            <div class="kr-pager flex" v-if="!isMobile">
                <div class="ke-pager-btn ke-btn" @click="prevPage">
                    <span class="scale left-back"></span>
                </div>
                <span class="ke-pager-number hcolor">{{pager + '/' + totalPage}}</span>
                <div class="ke-pager-btn ke-btn" @click="nextPage">
                    <span class="scale right-back"></span>
                </div>
            </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import util from 'util';
export default {
    data() {
    return {
      tableData: [
          {
              time: '2018-12-12',
              type: 'CJT/SUC',
              amount:10000,
              money:'2000.00SUC'
          },
          {
              time: '2018-12-12',
              type: 'CJT/SUC',
              amount:10000,
              money:'2000.00SUC'
          },
          {
              time: '2018-12-12',
              type: 'CJT/SUC',
              amount:10000,
              money:'2000.00SUC'
          }
      ],
      loader: false,
      height: '650',
      count:0,
        totalPage:0,
        pager:0,
    };
  },
  props:['fetchsuc'],
  created() {
      this.initLoadRecord();
        this.height = this.isMobile ? 'auto' : 650;
  },
  mounted() {
      if(this.isMobile) {
          this.loaderDom = document.querySelector('.kj-power');
          this.loaderDom.addEventListener('scroll', this.loadmore,false);
      }
  },
  computed: {
    ...mapGetters(['isMobile','login'])
  },
  beforeDestroy() {
      this.isMobile && this.loaderDom.removeEventListener('scroll', this.loadmore,false);
  },
  methods: {
      initLoadRecord() {
        this.pager = 1;
        this.count = null;
        this.size = 12;
        this.tableData = [];
        this.getTransfer();
    },
       prevPage() {
          let pager = this.pager;
          if(--pager <= 0)return;
          this.pager = pager;
          this.getTransfer();
      },
      nextPage() {
          let pager = this.pager;
          if(++pager > this.totalPage)return;
          this.pager = pager;
          this.getTransfer();

      },
      setPagerShow() {
          this.totalPage = Math.ceil(this.count/this.size)
      },
      loadmore() {
            if (this.loader) return;
            if (this.count) {
                if (this.pager * this.size >= this.count) {
                return false;
                }
            }
            this.pager++;
            this.getTransfer(true);
        },
        getType(amount) {
            if(amount == 100) {
                return '100' + this.$t('ms.dtlz');
            }
            else if(amount == 1000) {
                return '1000' + this.$t('ms.dtlz');
            }
            else {
                return this.$t('ms.quanman');
            }
        },
    getTransfer(type) {
        if (this.loader) return;
        this.loader = true;
        util
            .getTransfer(
            {
                params: {
                    uid: this.login.user.id,
                    size: this.size,
                    offset: (this.pager - 1) * this.size,
                    orderby: "create_time", //选填
                    order: "DESC",
                    energy: true
                }
            },
            {},
            this
            )
            .then(res => {
            if (res.data.code == 0) {
                const dataArr = res.data.list;
                const filters = this.$root.$options.filters;
                this.count = res.data.count;
                let tableData = Array.isArray(dataArr) && dataArr.map(el => {
                    return {
                        time: filters.format(el.CreateTime),
                        type: this.getType(util.dropDec(el.Value, 1e4)),
                        amount: util.dropDec(el.Value, 1e4)
                    };
                    });
                this.tableData = type ? this.tableData.concat(tableData) : tableData;
            }
            })
            .catch(err => {
                this.$message.info(this.errorInfo(err.response));
            })
            .finally(() => {
                this.loader = false;
            });
        },
    

  },
  watch: {
      count: function(n, o) {
          if(n != 0) {
              this.setPagerShow();
          }
      },
      fetchsuc() {
          this.initLoadRecord();
      }
  }
}
</script>

<style lang="scss">

</style>

