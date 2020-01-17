<!--  -->
<template>
<Page :title="$t('m.hytxjl')" borderLine padding routerBack="ddash">

<div class="tx-record panel-width">
    
    <div class="f24 tcolor fw" v-if="!isMobile">{{$t('m.hytxjl')}}</div>
        <div class="f14" :class="{'gcolor mb16': !isMobile, 'tcolor borderLine pd16': isMobile}" v-if="signHYDetail">NO.{{signHYDetail.id}}</div>


<Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
    <el-table
        class="f14 whd-table"
        style="with:100%"
        :data="tableData"
        :empty-text="$t('m.norecord')"
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
        :label="$t('m.txamount')+ '(USD)'" 
        >
        </el-table-column>
        <el-table-column
        prop="power"
        :min-width="tw[2]"
        :label="$t('m.nlxiaohao')"
        >
        </el-table-column>

        </el-table>
</Scroll>
</div>
</Page>
</template>

<script>
const config = {
    pc: {
        zh: [160, 120,100],
        en: [160, 120,100],
    },
    mobile: {
        zh: [160, 120,100],
        en: [160, 160,150],
    }
}
export default {
  data () {
    return {
        tw:[],
        tableData: [],
         maxHeight: 'auto'
    };
  },
  components: {},
  computed: {
      isMobile () {
          return this.$store.getters.isMobile
      },
      id() {
          return this.$route.params.id
      },
      signHYDetail() {
          return this.$store.getters.signHYDetail[this.id]
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
        //     //   this.container = ;
        //     this.$refs.scroll.init(document.querySelector('#dotside .rp-aside'));
        //       this.$refs.scroll.goFetch();
        // }.bind(this), 600) 
      }
      
  },
  methods: {
       pcloadmore(next) {
          this.fetch().finally(next)
      },
      reset() {
            this.maxHeight = !this.isMobile ? window.innerHeight - 100 : 'auto';
            this.tableData = [];
            this.size = Math.ceil(window.innerHeight/47);
            this.page = 0;
            this.total = null;
            this.hasTotal = false;
            this.finish = false;
        },
      fetch() {
          if(this.loader || this.finish ||(this.hasTotal && this.page*this.size >= this.total)) return Promise.resolve();
            this.page++;
            return this.getWidthdrawLists()
      },
      getWidthdrawLists() {
          this.loader = true;
          return request.fwsWidthdrawLists({
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
                      amount: util.fromHex(el.power, el.decimals || 0, 4),
                      power: util.fromHex(el.price, el.decimals || 0, 4)
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