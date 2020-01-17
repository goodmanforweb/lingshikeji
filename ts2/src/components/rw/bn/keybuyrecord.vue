<!--  -->
<template>
<Page :title="$t('m.keybuyjl')" borderLine padding >

<div class="tx-record panel-width">
    
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.keybuyjl')}}</div>

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
        prop="num"
        :label="$t('m.hyqi')"
        >
        </el-table-column>
        <el-table-column
        prop="cumskey"
        :label="$t('m.xiaohaokey')"
        >
        </el-table-column>
        <el-table-column
        prop='echange'
        :label="$t('m.exc')+'（CJOY）'"
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
                num:'NO.5',
                cumskey:'100',
                echange:200
            },
            {
                date:'2019.11.11 11:11:11',
                num:'NO.5',
                cumskey:'100',
                echange:200
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