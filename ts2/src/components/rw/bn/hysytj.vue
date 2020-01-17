<!--  -->
<template>
<Page :title="$t('m.hysytj')" borderLine padding >

<div class="tx-record" >
    
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.hysytj')}}</div>

    <Scroll>
    <el-table
        class="f14 whd-table"
        :class="{block:isMobile}"
        style="with:100%"
        :data="tableData"
        >
        <el-table-column
        prop="date"
        :label="$t('m.time')"
        >
        </el-table-column>
        <el-table-column
        prop="node"
        :label="$t('m.node')"
        >
        </el-table-column>
        <el-table-column
        prop="type"
        :label="$t('m.type')"
        >
        </el-table-column>
        <el-table-column
        prop="input"
        :label="$t('m.input')+'（CJS）'"
        >
        </el-table-column>
        <el-table-column
        prop="profitadd"
        :label="$t('m.addsy')+'（CJOY）'"
        >
        </el-table-column>
        <el-table-column
        prop="ratio"
        :label="$t('m.cbi')"
        >
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
                date:'2019.11.11 11:11:11',
                node:'YOYO',
                type:'加入',
                input:'19899',
                profitadd:'109',
                ratio:'2.38%'
            },
            {
                date:'2019.11.11 11:11:11',
                node:'YOYO',
                type:'加入',
                input:'19899',
                profitadd:'109',
                ratio:'2.38%'
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
.pc {
    .tx-record {
        width: 600px;
    }
}
</style>