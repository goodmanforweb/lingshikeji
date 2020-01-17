<!--  -->
<template>
<Page :title="$t('m.keyexcjl')" borderLine padding routerBack="bdash">

<div class="tx-record panel-width">
    
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.keyexcjl')}}</div>

    <Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
    <div  :class="{block:isMobile}">
        <el-table
        class="f14 whd-table"
        style="with:100%"
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
        <!-- <el-table-column
        prop="num"
        :label="$t('m.hyqi')"
        >
        </el-table-column> -->
        <el-table-column
        prop="cumskey"
        :show-overflow-tooltip='true'
        :label="$t('m.xiaohaokey')"
        >
        </el-table-column>
        <el-table-column
        prop='echange'
        :show-overflow-tooltip='true'
        :label="$t('m.exc')+'(USD)'"
        >
        </el-table-column>
        <el-table-column
        prop='cjoy'
        :show-overflow-tooltip='true'
        label="CJOY"
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
        maxHeight: ''
    };
  },
  components: {},
  computed: {
      isMobile () {
          return this.$store.getters.isMobile
      },
      id() {
          return this.$route.params.id
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
        //       this.$refs.scroll.init(document.querySelector('#dotside .rp-aside'));
        //       this.$refs.scroll.goFetch();
        // }.bind(this), 600) 
      }
  },
  methods: {
      pcloadmore(next) {
          this.fetch().finally(next)
      },
      reset() {
            this.maxHeight = !this.isMobile ? window.innerHeight - 100 : '';
            this.tableData = [];
            this.size = Math.ceil(window.innerHeight/47);
            this.page = 0;
            this.total = null;
            this.hasTotal = false;
            this.finish = false;
        },
      fetch() {
          if(this.loader || this.finish || (this.hasTotal && this.page*this.size >= this.total)) return Promise.resolve();
            this.page++;
            return this.getBNWidthdrawRecord()
      },
      getBNWidthdrawRecord() {
          this.loader = true;
          return request.bnWithdrawLists({
              params: {
                  order:'created_time',
                  desc: true,
                  project: this.id,
                  pagesize: this.size,
                  offset: (this.page-1)*this.size
              }
          })
          .then(res => {
              this.total = Number(res.data.count);
              this.hasTotal = true;
              if(!Array.isArray(res.data.list)) return this.finish = true;
              let store = [];
              let filters = this.$root.$options.filters;
              res.data.list.forEach(el => {
                  store.push({
                      date: filters.format(el.created_time),
                      cumskey: util.dropHex(el.key, el.decimals || 8,4),
                      echange:  util.dropHex(el.found, el.decimals || 8,4),
                      cjoy: util.dropHex(el.cjoy, el.decimals || 8,4)
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