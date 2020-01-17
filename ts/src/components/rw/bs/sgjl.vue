<!--  -->
<template>
<Page :title="$t('m.sgjl')" borderLine padding routerBack="dash">

<div class="tx-record panel-width">
    
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.sgjl')}}</div>
    <div class="qcolor f12" :class="{'mb6': isMobile}">{{$t('m.sgsuchint')}}</div>
    <Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
    <div>
        <el-table
        class="f14 whd-table"
        style="with:100%"
        :data="tableData"
        :max-height="maxHeight"
        :data-tableLoader = '!isMobile'
        v-loadmore='pcloadmore'
        :empty-text="$t('m.norecord')"
        >
        <el-table-column
        prop="date"
        :min-width="tw[0]"
        :label="$t('m.time')"
        >
        </el-table-column>
        <!-- <el-table-column
        prop="num"
        :label="$t('m.hyqi')"
        >
        </el-table-column> -->
        <el-table-column
        prop="project"
        :min-width="tw[1]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.sgxm')"
        >
        </el-table-column>
        <el-table-column
        prop='amount'
        :min-width="tw[2]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.sgsl')+ (unit[0] ? '('+unit[0]+')' : '')"
        >
        </el-table-column>
        <el-table-column
        prop='gter'
        :min-width="tw[3]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.xiaohao')+ (unit[1] ? '('+unit[1]+')' : '')"
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
        zh: [170, 90, 100, 90],
        en: [170, 90, 130, 90],
    },
    mobile: {
        zh: [170, 90, 100, 90],
        en: [170, 90, 140, 100],
    }
}
import {mapGetters} from 'vuex';
export default {
  data () {
    return {
        tableData: [],
        maxHeight: 'auto',
        unit: ['',''],
        tw: []
    };
  },
  components: {},
  computed: {
      ...mapGetters(['isMobile','signHYDetail']),
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
          return request.getSGLists({
            order:'created_time',
            desc: true,
            contract_id: this.signHYDetail.project_contract,
            pagesize: this.size,
            offset: (this.page-1)*this.size
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
                      project: JSON.parse(el.description)[this.$i18n.locale],
                      amount:  util.dropHex(el.base_num, el.decimals || 8,4),
                      gter: util.dropHex(el.target_num, el.decimals || 8,4)  
                  })
              });
              if(!this.unit[0]) {
                  this.unit = [res.data.list[0].base_symbol.toUpperCase(), res.data.list[0].target_symbol.toUpperCase()];
              }
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