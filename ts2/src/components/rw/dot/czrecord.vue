<!--  -->
<template>
<Page :title="$t('m.nlczjl')" borderLine padding >

<Scroll >
<el-table
        class="f14= whd-table "
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
        prop="amount"
        :label="$t('m.czamount')"
        >
        </el-table-column>
        <el-table-column
        prop="price"
        :label="$t('m.price')"
        >
        </el-table-column>
        </el-table>
</Scroll>
</Page>
</template>

<script>
export default {
  data () {
    return {
        tableData: [
            {
                date:'2018.11.11 11:11:11',
                amount:'1000能量',
                price:'20CJS'
            },
            {
                date:'2018.11.11 11:11:11',
                amount:'1000能量',
                price:'20CJS'
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