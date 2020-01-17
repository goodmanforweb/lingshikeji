<!--  -->
<template>
<Page :title="$t('m.xmyji')" borderLine padding >

<div class="tx-record panel-width" >
    
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.xmyji')}}</div>

<Scroll>
    <el-table
        class="f14 whd-table"
        :class="{block: isMobile}"
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
        prop="water"
        :label="$t('m.water')+'(CJS)'"
        >
        </el-table-column>
        <el-table-column
        prop="level"
        :label="$t('m.syjb')"
        >
        </el-table-column>
        <el-table-column
        prop="bonus"
        :label="$t('m.bonus')+'（CJOY）'"
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
                water:'10,000.00',
                level:'5%',
                bonus:'5000'
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

</style>