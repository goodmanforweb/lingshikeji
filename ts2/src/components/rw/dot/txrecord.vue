<!--  -->
<template>
<Page :title="$t('m.hytxjl')" borderLine padding >

<div class="tx-record panel-width" :class="{block:isMobile}">
    
    <div class="f24 tcolor fw" v-if="!isMobile">{{$t('m.hytxjl')}}</div>
        <div class="f14" :class="{'gcolor mb16': !isMobile, 'tcolor borderLine pd16': isMobile}">NO.kj894304869j3as</div>


<Scroll>
    <el-table
        class="f14 whd-table"
        style="with:100%"
        :data="tableData"
        >
        <el-table-column
        prop="date"
        :label="$t('m.time')"
        min-width="110"
        >
        </el-table-column>
        <el-table-column
        prop="amount"
        :label="$t('m.txamount')"
        >
        </el-table-column>
        <el-table-column
        prop="power"
        :label="$t('m.nlxiaohao')"
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
                date:'2018.11.11 11:11:11',
                amount:'1000CJOY',
                power:'2000'
            },
            {
                date:'2018.11.11 11:11:11',
                amount:'1000CJOY',
                power:'1000'
            }
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