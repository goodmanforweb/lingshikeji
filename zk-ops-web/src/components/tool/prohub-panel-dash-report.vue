<!--  -->
<template>
<div class="prohub-panel-dash-report" style="width:300px">
    <div class="flex mb20 sb vc">
        <span class="tcolor fw f24 ">每日销售报表</span>
        <div>
            <span class="cp">
                <img style="width:20px" src="../../assets/images/fileicon.png" alt="">
            </span>
            &nbsp;&nbsp;&nbsp;
            <span class="cp">
                <img style="width:18px;opacity:0.47" src="../../assets/images/dateicon.png" alt="">
            </span>
        </div>
    </div>

    <el-table
    class="xx-panel-table"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="销售总额（CJS）">
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
        tableData: [
            {
                date: '2019:88:99',
                amount: 766474
            }
        ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss'>

</style>