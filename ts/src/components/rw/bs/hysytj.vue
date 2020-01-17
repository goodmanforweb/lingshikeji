<!--  -->
<template>
<Page :title="$t('m.hysytj')" borderLine padding routerBack="dash">

<div class="tx-record" >
    
    <div class="flex sb" v-if="!isMobile">
        <div class="f24 tcolor fw mb16" >{{$t('m.hysytj')}}</div>
        <div class="hy-radios tcolor">
            <span @click="radioHandle(index)" :class="{active: radio.active}" v-for="(radio, index) in radios" :key="index">{{$t(`m.${radio.text}`)}}</span>
        </div>
    </div>

    <Scroll :fetch="fetch" ref="scroll" :initListener="isMobile">
        
        <div  class="table-tj-wrap">
            <div class="re-btns flex " v-if="isMobile">
                <span class="flex1" @click="radioHandle(index)" :class="{active: radio.active}" v-for="(radio, index) in radios" :key="index">{{$t(`m.${radio.text}`)}}</span>
            </div>
            <el-table
            v-show="radios[0].active"
        class="f14 whd-table"
        style="with:100%"
        :data="tableData[0].data"
        :max-height="tableData[0].maxHeight"
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
        <el-table-column
        prop="node"
        :min-width="tw[1]"
        :show-overflow-tooltip='true'
        :label="$t('m.node')"
        >
        </el-table-column>
        <el-table-column
        prop="type"
         :min-width="tw[2]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.type')"
        >
         <template v-slot:default="slotProps">
          {{slotProps.row.type[$i18n.locale]}}
        </template>
        </el-table-column>
        <el-table-column
        prop="input"
        :min-width="tw[3]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.input')+'(USD)'"
        >
        </el-table-column>
        <el-table-column
        prop="profitadd"
        :min-width="tw[4]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.addsy')+'(USD)'"
        >
        </el-table-column>
        <el-table-column
        prop="ratio"
         :min-width="tw[5]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.cbi')"
        >

        </el-table-column>
        
       

        </el-table>

         <el-table
         v-show="radios[1].active"
        class="f14 whd-table"
        style="with:100%"
        :data="tableData[1].data"
        :max-height="tableData[1].maxHeight"
        :data-tableLoader = '!isMobile'
        :empty-text="$t('m.norecord')"
        v-loadmore='pcloadmore'
        >
        <el-table-column
        prop="date"
        :min-width="tw2[0]"
        :label="$t('m.time')"
        >
        </el-table-column>
        <el-table-column
        prop="chiyou"
        :min-width="tw2[1]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.zhunbeijcy')+'(CJC)'"
        >
        </el-table-column>
        <el-table-column
        prop="lixlv"
         :min-width="tw2[2]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.lixililv')"
        >
        </el-table-column>
        <el-table-column
        prop="lixi"
         :min-width="tw2[3]"
        :show-overflow-tooltip='!isMobile'
        :label="$t('m.lixi')+'(CJC)'"
        >
        </el-table-column>
        <!-- <el-table-column
        prop="state"
        min-width="120"
        :show-overflow-tooltip='true'
        :label="$t('m.state')"
        >
        </el-table-column> -->
        </el-table>
        </div>
    
    </Scroll>
</div>
</Page>
</template>

<script>
import textTypeDecide from '../mixin/getprofittype'
import {mapGetters} from 'vuex';
import util from '../../../util';
const config = {
    pc: {
        zh: [170, 90, 90, 110, 120, 100],
        en: [170, 90, 90, 110, 110, 100],
    },
    mobile: {
        zh:[170, 90, 90, 110, 120, 100],
        en: [170, 90, 90, 110, 96, 90],
    }
}
const config2 = {
    pc: {
        zh: [170, 120, 100, 100],
        en: [170, 160, 150, 110],
    },
    mobile: {
        zh: [170, 120, 100, 100],
        en: [170, 160, 150, 110]
    }
}
export default {
  data () {
    return {
        tw: [],
        tw2: [],
        tableData: [],
        radioIndex:0,
        radios: [
            {
                text: 'heysy',
                active: true
            },
            {
                text: 'lixsy',
                active: false
            }
        ]
    };
  },
  mixins:[textTypeDecide],
  computed: {
      ...mapGetters(['isMobile','signHYDetail']),
      id() {
          return this.$route.params.id
      },
      target() {
          return this.tableData[this.radioIndex]
      }
  },
  created() {
    this.tw2 = config2[this.isMobile ? 'mobile' : 'pc'][this.$i18n.locale];

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
      radioHandle(index) {
          this.radios.forEach((el, ibn) => {
              el.active = index == ibn;
              el.active && (this.radioIndex = ibn);
          });
          !this.target.hasTotal && this.fetch();
      },
      pcloadmore(next) {
          this.fetch().finally(next)
      },
      reset() {
          const maxHeight = !this.isMobile ? window.innerHeight - 100 : 'auto';
          const size = Math.ceil(window.innerHeight/47);
          this.radioIndex = 0;
          this.tableData = [
              {
                  radioIndex:0,
                  maxHeight,
                  data: [],
                  size,
                  page: 0,
                  total: null,
                  hasTotal: false,
                  finish: false,
                  loader: false
              },
              {
                  radioIndex:1,
                  maxHeight,
                  data: [],
                  size,
                  page: 0,
                  total: null,
                  hasTotal: false,
                  finish: false,
                  loader: false
              },
          ];
            // this.radioIndex = 0;
            // this.maxHeight = !this.isMobile ? window.innerHeight - 100 : 'auto';
            // this.tableData = [];
            // this.size = Math.ceil(window.innerHeight/47);
            // this.page = 0;
            // this.total = null;
            // this.hasTotal = false;
            // this.finish = false;
      },
      fetch() {
          const {loader, finish, hasTotal, page, size, total} = this.target;
          if(loader || finish || (hasTotal && page*size >= total)) return Promise.resolve();
            this.target.page++;
            this.target.loader = true;
            return this[['getLists','getLIXILists'][this.radioIndex]]()
            .finally(() => {
                this.target.loader = false;
            })
      },
      getLIXILists() {
          return request.getLIXILists({
            order:'created_time',
            desc: true,
            contract_id: this.signHYDetail.project_contract,
            pagesize: this.target.size,
            offset: (this.target.page-1)*this.target.size
          })
          .then(res => {
              this.target.total = Number(res.data.count);
              this.target.hasTotal = true;
              if(!Array.isArray(res.data.list)) return this.target.finish = true;
              let store = res.data.list.map(el => {
                  el.decimals = el.decimals || 8;
                  return {
                      date: util.format(el.created_time),
                      chiyou: util.dropHex(el.base, el.decimals, 4),
                      lixlv: el.rate + '%',
                      lixi: util.dropHex(el.interest, el.decimals, 4)               
                  }
              }) 
              this.target.data = this.target.data.concat(store);
          })
      },
      getLists() {
          return request.bnProfitLists({
            order:'created_time',
            desc: true,
            project: this.id,
            pagesize: this.target.size,
            offset: (this.target.page-1)*this.target.size
          })
          .then(res => {
              this.target.total = Number(res.data.count);
              this.target.hasTotal = true;
              if(!Array.isArray(res.data.list)) return this.target.finish = true;
              let store = res.data.list.map(el => {
                  return {
                      date: util.format(el.created_time),
                      node: el.username,
                      type: el.description,
                      input: util.dropHex(el.usd, el.decimals || 8, 4),                      
                      profitadd: util.dropHex(el.key, el.decimals || 8, 4),
                      ratio: util.fix(el.rate || 0, 4) + '%' ,
                      description: el.description,                     
                  }
              }) 
              this.target.data = this.target.data.concat(store);
              this.textsHandler(this.target.data, 'type');
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
.mobile {

}
.hy-radios {
    span {
        color:#086599;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        border-radius: 4px;
        display: inline-block;
        margin: 0 10px;
        opacity: 0.6;
        border: 1px solid #086599;
        padding: 2px 10px;
        cursor: pointer;
    }
    span.active {
        opacity: 1;
    }
}
</style>