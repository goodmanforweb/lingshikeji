<!--  -->
<template>
<Page :title="$t('m.hysyjl')" borderLine padding >

<div class="tx-record panel-width" :class="{block:isMobile}">
    
    <div class="f24 tcolor fw" v-if="!isMobile">{{$t('m.hysyjl')}}</div>
    <div class="f14" :class="{'gcolor mb16': !isMobile, 'tcolor borderLine pd16': isMobile}">NO.kj894304869j3as</div>
    <Scroll>
    <el-table
        class="f14 whd-table"
        style="with:100%"
        :data="tableData"
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
        </el-table-column>
        <el-table-column
        :label="$t('m.profit')"
        >
        <template v-slot:default="slotProps">
           <div><i class="fw">{{slotProps.row.profit}}</i> <i class="f12">CJOY</i> </div>
           <div class="f12 gcolor">{{slotProps.row.date}}</div>
        </template>
        </el-table-column>

        </el-table>
    </Scroll>
</div>
</Page>
</template>

<script>
export default {
  data () {
    return {
        tableData: [
            {
                node:'YOYO',
                type:'购入一星服务商',
                profit:'+2000.00',
                date:'2019.11.11 11:11:11'
            },
            {
                node:'YOYO',
                type:'购入一星服务商',
                profit:'+2000.00',
                date:'2019.11.11 11:11:11'
            },
            {
                node:'YOYO',
                type:'购入一星服务商',
                profit:'+2000.00',
                date:'2019.11.11 11:11:11'
            },
            
        ]
    };
  },
  components: {},
  computed: {
    isMobile () {
          return this.$store.getters.isMobile
      }
  },
  mounted() {},
  methods: {}
}

</script>
<style lang='scss'>
.mobile {
  .whd-table {
    td, th.is-leaf {
        border-bottom: none
    }
    
  }
  .whd-table:before {
      width: 0;
      height: 0;
  } 
}
</style>