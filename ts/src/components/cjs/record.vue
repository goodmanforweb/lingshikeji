<!--  -->
<template>
<Page :title="$t('m.cjsbuyrecord')" borderLine padding routerBack="/cjs">
<div class="tx-record panel-width">
    
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.cjsbuyrecord')}}</div>

    <Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
        <div :class="{block:isMobile}">
            <el-table
            class="f14 whd-table"
            
            style="with:100%"
            :empty-text="$t('m.norecord')"
            :data="tableData"
            :max-height="maxHeight"
            :data-tableLoader = '!isMobile'
            v-loadmore='pcloadmore'
            >
            <el-table-column
            prop="date"
            :label="$t('m.time')"
            >
            </el-table-column>
            <el-table-column
            prop="value"
            :label="$t('m.buyamount')"
            >
            </el-table-column>
            <el-table-column
            prop='state'
            :label="$t('m.state')"
            >
            </el-table-column>

        </el-table>
        </div>
        
    </Scroll>
</div>
</Page>
</template>

<script>
export default {
  data () {
    return {
        tableData: [],
        maxHeight: 'auto'
    };
  },
  computed: {
      isMobile () {
          return this.$store.getters.isMobile
      }
  },
  created() {
      this.reset();
  },
  mounted() {
      
      if(this.isMobile) {
          this.$refs.scroll.goFetch();
      }
      else {
        // setTimeout(function() {
        //       this.$refs.scroll.init(document.querySelector('#cjsside .rp-aside'));
        //       this.$refs.scroll.goFetch();
        // }.bind(this), 600) 
      }
  },
  methods: {
      pcloadmore(next) {
          this.fetch().finally(next)
      },
      reset() {
            this.maxHeight = !this.isMobile ?  window.innerHeight - 100: 'auto';
            this.tableData = [];
            this.size = Math.ceil(window.innerHeight/47);
            this.page = 0;
            this.total = null;
            this.hasTotal = false;
            this.finish = false;
        },
      fetch() {
          if(this.loader || this.finish || (this.hasTotal && this.page*this.size >= this.total)) return Promise.reject();
            this.page++;
            return this.getRecord()
      },
      getStatus(lang, status) {
          if(lang == 'en') return status;
          return {
              Freezed:'已冻结',
              Committed:'已确认',
              Canceled:'已取消'
          }[status];
      },
      getRecord() {
          this.loader = true;
          return request.getCJSBuyLists({
              params: {
                  order:'created_time',
                  desc: true,
                  pagesize: this.size,
                  offset: (this.page-1)*this.size
              }
          })
          .then(res => {
              this.hasTotal = Number(res.data.count);
              if(!Array.isArray(res.data.list))return this.finish = true;
              let store = [];
              res.data.list.forEach(el => {
                  store.push({
                      date: util.format(el.created_time),
                      value: util.fromHex(el.value, el.decimals || 0,4),
                      state: this.getStatus(this.$i18n.locale, el.status)
                  })
              }) 
              this.tableData = this.tableData.concat(store);
          })
          .finally(() => {
              this.loader = false;
          })
      },
  }
}

</script>
<style lang='scss'>

</style>