<!--  -->
<template>
<Page :title="$t('m.xmyji')" borderLine padding routerBack="ddash">

<div class="tx-record panel-width" >
    
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.xmyji')}}</div>

<Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
    <div>
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
        :min-width="tw[0]"
        :label="$t('m.time')"
        >
        </el-table-column>
        <el-table-column
        prop="node"
        :min-width="tw[1]"
        :label="$t('m.node')"
        >
        </el-table-column>
        <el-table-column
        prop="water"
        :min-width="tw[2]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.water')+'(USD)'"
        >
        </el-table-column>
        <el-table-column
       prop="type"
       :min-width="tw[3]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.bonustype')"
        >
        <template v-slot:default="slotProps">
          {{slotProps.row.type[$i18n.locale]}}
        </template>
        </el-table-column>
        <el-table-column
        prop="bonus"
        :min-width="tw[4]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.bonus')+'(USD)'"
        >
        </el-table-column>
        </el-table>
    </div>
    
</Scroll>
</div>
</Page>
</template>

<script>
const config = {
    pc: {
        zh: [160, 90,100,90,90],
        en: [160, 90,140,100,110],
    },
    mobile: {
        zh: [160, 90,100,90,90],
        en: [160, 90,140,100,110],
    }
}
import textTypeDecide from '../mixin/getprofittype'

export default {
  data () {
    return {
        tw:[],
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
          return this.$route.params.id;
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
      reset() {
            this.maxHeight = !this.isMobile ? window.innerHeight - 100 : 'auto';
            this.tableData = [];
            this.size = Math.ceil(window.innerHeight/47);
            this.page = 0;
            this.total = null;
            this.hasTotal = false;
            this.finish = false;
        },
        pcloadmore(next) {
          this.fetch().finally(next)
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
              if(!Array.isArray(res.data.incomes)) return this.finish = true;
              let store = [];
              let filters = this.$root.$options.filters;
              res.data.incomes.forEach(el => {
                  store.push({
                      date: filters.format(el.created_time),
                      node:el.username,
                      water: util.fromHex(el.cjs, el.decimals || 0, 4),
                      type: '',
                      bonus: util.fromHex(el.value, el.decimals || 0,4),
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
