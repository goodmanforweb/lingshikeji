<!--  -->
<template>
<page title="社区详情" borderLine padding routerBack="/prohub">
<Scroll trigger>
<div class="prohub-panel-detail panel-width" >
    <div class="tcolor x-hd fw f24 mb20">社区详情</div>

    <el-table
    class="xx-panel-table"
    :class="{block: isMobile}"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="user"
        label="用户">
      </el-table-column>
      <el-table-column
        prop="water"
        label="流水">
      </el-table-column>
      <el-table-column
        prop="bonus"
        label="奖励">
      </el-table-column>
    </el-table>
</div>
</Scroll>
</page>
</template>

<script>
export default {
  data () {
    return {
        tableData: [
            {
                user: 'uuuu',
                water: 3000,
                bonus: '没有'
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
.pc {
  div.xx-panel-table {
      background-color: transparent;
      th, tr {
          background-color: transparent
      }
      td, th.is-leaf {
       border-bottom:none!important
    }
  }
  div.xx-panel-table:before {
        width: 0;
        height: 0;
  }
}
div.xx-panel-table {
    font-size: 14px;
    
    
    thead {
        .cell {
            color: #8E9FA9
        }
    }
    tbody {
        .cell {
            color: #086599
        }
    }
}


</style>