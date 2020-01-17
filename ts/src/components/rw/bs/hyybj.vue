<!--  -->
<template>
<Page :title="$t('m.ybjjl')" borderLine padding routerBack="dash">

<div class="tx-record panel-width">
    
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.ybjjl')}}</div>

    <Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
    <div >
        <el-table
        class="f14 whd-table"
        :empty-text="$t('m.norecord')"
        style="with:100%"
        :data="tableData"
        :max-height="maxHeight"
        :data-tableLoader = '!isMobile'
        v-loadmore='pcloadmore'
        >
        <el-table-column
        prop="date"
        min-width="170"
        :label="$t('m.time')"
        >
        </el-table-column>
        <el-table-column
        prop="type"
        min-width="90"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.type')"
        >
        <template v-slot:default="slotProps">
          {{slotProps.row.type[$i18n.locale]}}
        </template>
        </el-table-column>
        <el-table-column
        prop='biandong'
        min-width="120"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.biandong')+'(USD)'"
        >
        </el-table-column>
        </el-table>
    </div>
    
    </Scroll>
</div>
</Page>
</template>

<script>
import {mapGetters} from 'vuex';
import textTypeDecide from '../mixin/getprofittype'

export default {
  data () {
    return {
        tableData: [],
        maxHeight: 'auto'
    };
  },
  mixins:[textTypeDecide],
  components: {},
  computed: {
      ...mapGetters(['isMobile','signHYDetail']),
      id() {
          return this.$route.params.id
      }
  },
  created() {
      if(!this.signHYDetail.project_contract) {
          return this.$router.replace({path:'dash'})
      }
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
          return request.getYBJLists({
              params: {
                  order:'created_time',
                  desc: true,
                  contract_id: this.signHYDetail.project_contract,
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
                  el.decimals = el.decimals || 8;
                  store.push({
                      date: filters.format(el.created_time),
                      type: util.dropHex(el.key, el.decimals,4),
                      biandong: util.dropHex(el.value, el.decimals,4),
                      description: el.description
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

</style>