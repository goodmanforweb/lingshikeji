<template>
<Page :title="$t('m.hysyjl')" borderLine padding routerBack="ddash">

<div class="tx-record panel-width">
    
    <div class="f24 tcolor fw" v-if="!isMobile">{{$t('m.hysyjl')}}</div>
    <div class="f14" :class="{'gcolor mb16': !isMobile, 'tcolor borderLine pd16': isMobile}" v-if="signHYDetail">NO.{{signHYDetail.id}}</div>
    <Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
    <el-table
        class="f14 whd-table"
        style="with:100%"
        ref="table"
        :empty-text="$t('m.norecord')"
        :data="tableData"
        :max-height="maxHeight"
        :data-tableLoader = '!isMobile'
        v-loadmore='pcloadmore'
        >
        <el-table-column
        prop="node"
        :label="$t('m.node')"
        >
        </el-table-column>
        <el-table-column
        prop="type"
        :label="$t('m.bonustype')"
        >
        <template v-slot:default="slotProps">
          {{slotProps.row.type[$i18n.locale]}}
        </template>
        </el-table-column>
        <el-table-column
        :label="$t('m.profit')"
        >
        <template v-slot:default="slotProps">
           <div ><i class="fw">{{slotProps.row.profit}}</i> <i class="f12">USD</i> </div>
           <div class="f12 gcolor">{{slotProps.row.date}}</div>
        </template>
        </el-table-column>

        </el-table>
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
  components: {},
  computed: {
    isMobile () {
          return this.$store.getters.isMobile
    },
    id() {
          return this.$route.params.id;
    },
    signHYDetail() {
        return this.$store.getters.signHYDetail[this.id]
    }
  },
  created() {
       this.reset();
  },
  mounted() {
       this.$refs.table.doLayout();
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
        //   
            this.maxHeight = !this.isMobile ?  window.innerHeight - 100: 'auto';
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
          return request.fwsProfitLists({
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
            //   let t = {
            //           date: 'filters.format(el.created_time)',
            //           node:'el.username',
            //           type: '',
            //           profit: "util",
            //           description: 'el.description',
            //   }
            //   Array.from({length: 20}).forEach(el => {
            //       this.tableData.push(t)
            //   });
              if(!Array.isArray(res.data.incomes)) return this.finish = true;
              let store = [];
              let filters = this.$root.$options.filters;
              res.data.incomes.forEach(el => {
                  store.push({
                      date: filters.format(el.created_time),
                      node:el.username,
                      type: '',
                      profit: util.fromHex(el.value, el.decimals || 0,4),
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
