<!--  -->
<template>
<div class="prohub-panel-rw-detail" style="width: 660px;">
    <div class="flex mb20 sb vc">
        <span class="tcolor fw f24 ">矿池详情</span>
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
    style="width: 100%"
    >
        <el-table-column
        prop="kjnum"
        label='矿机编号'
        >
        </el-table-column>
        <el-table-column
        prop="buydate"
        label="购买时间"
        >
        </el-table-column>
        <el-table-column
        prop="user"
        label="所属用户"
        >
        </el-table-column>
        <el-table-column
        prop="restdate"
        label="剩余时间"
        >
        </el-table-column>
        <el-table-column
        prop="kjprog"
        label="挖矿进度"
        >
        </el-table-column>
        <el-table-column
        prop="amount"
        label="挖矿数量（CJT）"
        min-width="120px"
        >
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
                kjnum: '000000000',
                buydate:'2018-90-90',
                user:'uuuu',
                restdate:'4天 11:11:11',
                kjprog:'30%',
                amount:'20000'
            },
            {
                kjnum: '000000000',
                buydate:'2018-90-90',
                user:'uuuu',
                restdate:'4天 11:11:11',
                kjprog:'30%',
                amount:'20000'
            },
            {
                kjnum: '000000000',
                buydate:'2018-90-90',
                user:'uuuu',
                restdate:'4天 11:11:11',
                kjprog:'30%',
                amount:'20000'
            },
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