<!--  -->
<template>
<Page :title="$t('m.nlczjl')" borderLine padding routerBack="ddash">

<Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
<div >
    <el-table
        class="f14= whd-table "
        :empty-text="$t('m.norecord')"
        style="with:100%"
        :data="tableData"
        :max-height="maxHeight"
        
        :data-tableLoader = '!isMobile'
        v-loadmore='pcloadmore'
        >
        <el-table-column
        prop="date"
        :min-width="tw[0]"
        :label="$t('m.time')"
        >
        </el-table-column>
        <el-table-column
        prop="amount"
        :min-width="tw[1]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.czamount')"
        >
        </el-table-column>
        <el-table-column
        prop="price"
        :min-width="tw[2]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.price')+'(CJS)'"
        >
        </el-table-column>
        </el-table>
</div>

</Scroll>
</Page>
</template>

<script>
const config = {
    pc: {
        zh: [160, 100,100],
        en: [160, 110,100],
    },
    mobile: {
        zh: [160, 100,100],
        en: [160, 120,100],
    }
}
export default {
  data () {
    return {
        tw:[],
        tableData: [],
        disable: false,
        maxHeight: 'auto'
    };
  },
  computed: {
      isMobile () {
          return this.$store.getters.isMobile
      },
      id() {
          return this.$route.params.id
      }
  },
  created() {
    this.tw = config[this.isMobile ? 'mobile' : 'pc'][this.$i18n.locale];

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
      fresh() {
          this.reset();
          this.$refs.scroll.goFetch();
      },
      reset() {
            this.maxHeight = !this.isMobile ? window.innerHeight - 100 : 'auto';
            this.tableData = [];
            this.size = Math.ceil(window.innerHeight/47);
            this.page = 0;
            this.total = null;
            this.hasTotal = false;
            this.finished = false;
        },
        pcloadmore(next) {
          this.fetch().finally(next)
      },
      fetch() {
          if(this.loader ||  (this.hasTotal && this.page*this.size >= this.total) || this.finished) return Promise.resolve();
            this.page++;
            return this.getDepositRecord()
      },
      getDepositRecord() {
          this.loader = true;
          return request.fwsDepositLists({
              params: {
                  order:'created_time',
                  desc: true,
                  project: this.id,
                  pagesize: this.size,
                  offset: (this.page-1)*this.size
              }
          })
          .then(res => {
              if(util.isEmpty(res.data)) {
                  return this.finished = true;
              }
              this.total = Number(res.data.count);
              this.hasTotal = true;
              if(!Array.isArray(res.data.list)) return ;
              let store = [];
              let filters = this.$root.$options.filters;
              res.data.list.forEach(el => {
                  store.push({
                      date: filters.format(el.created_time),
                      amount: util.fromHex(el.power, el.decimals, 8),
                      price: util.fromHex(el.price, el.decimals, 8)
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