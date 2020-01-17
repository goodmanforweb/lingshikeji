<!--  -->
<template>
<Page :title="$t('m.hysytj')" borderLine padding routerBack="bdash">

<div class="tx-record" >
    
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.hysytj')}}</div>

    <Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
        <div :class="{block:isMobile}">
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
        min-width="90"
        :label="$t('m.time')"
        >
        </el-table-column>
        <el-table-column
        prop="node"
        :show-overflow-tooltip='true'
        :label="$t('m.node')"
        >
        </el-table-column>
        <el-table-column
        prop="type"
        :show-overflow-tooltip='true'
        :label="$t('m.type')"
        >
         <template v-slot:default="slotProps">
          {{slotProps.row.type[$i18n.locale]}}
        </template>
        </el-table-column>
        <el-table-column
        prop="input"
        min-width="110"
        :show-overflow-tooltip='true'
        :label="$t('m.input')+'(USD)'"
        >
        </el-table-column>
        <el-table-column
        prop="profitadd"
        min-width="120"
        :show-overflow-tooltip='true'
        :label="$t('m.addsy')+'(USD)'"
        >
        </el-table-column>
        <el-table-column
        prop="ratio"
        :label="$t('m.cbi')"
        >
        </el-table-column>
        
       

        </el-table>
        </div>
    
    </Scroll>
</div>
</Page>
</template>

<script>
import textTypeDecide from '../mixin/getprofittype'

export default {
  data () {
    return {
        tableData: [],
        maxHeight: 'auto'
    };
  },
  mixins:[textTypeDecide],
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
            this.maxHeight = !this.isMobile ? window.innerHeight - 100 : 'auto';
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
            return this.getLists()
      },
      getLists() {
          this.loader = true;
          return request.bnProfitLists({
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
                      node: el.username,
                      type: el.description,
                      input: util.dropHex(el.usd, el.decimals || 8, 4),                      
                      profitadd: util.dropHex(el.key, el.decimals || 8, 4),
                      ratio: util.fix(el.rate || 0, 4) + '%' ,
                      description: el.description,                     
                  })
              }) 
              this.tableData = this.tableData.concat(store);
              this.textsHandler(this.tableData, 'type');
          })
          .finally(() => {
              this.loader = false;
          })
      },
  }
}

</script>
<style lang='scss'>
.pc {
    .tx-record {
        width: 600px;
    }
}
</style>