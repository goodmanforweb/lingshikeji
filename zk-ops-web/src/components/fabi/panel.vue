<!--  -->
<template>
<page title="发币记录"  borderLine padding >
  <div class="fabi-panel">
     <div class="tcolor x-hd fw f24 mb20" v-if="!$isMobile">发币记录</div>
     <Scroll :fetch="mobileFetch" ref="scroll" :initListener="$isMobile">
     <div class="blocks">
        <el-table
        class="f14 whd-table"
        style="with:100%"
        :data="lists"
        :max-height="maxHeight"
        :data-tableLoader = "!$isMobile"
        v-loadmore='mobileFetch'
        >
        <el-table-column
        prop="date"
        min-width="170"
        label="时间"
        >
        </el-table-column>
        <el-table-column
        prop="user"
        min-width="100"
        label="用户"
        >
        </el-table-column>
        <el-table-column
        prop="phone"
        min-width="90"
        :show-overflow-tooltip='!$isMobile'
        label="电话"
        >
        </el-table-column>
        <el-table-column
        prop='amount'
        min-width="100"
        :show-overflow-tooltip='!$isMobile'
        label="数量"
        >
        </el-table-column>
        <el-table-column
        prop='status'
        min-width="120"
        :show-overflow-tooltip='!$isMobile'
        label="状态"
        >
        </el-table-column>
        </el-table>
    </div>
    
    </Scroll>
</div>

</page>
</template>

<script>
export default {
  data () {
    return {
        lists: [],
        maxHeight: 'auto'
    };
  },
  components: {},
  computed: {},
  created() {
      this.maxHeight = !this.isMobile ? window.innerHeight - 100 : 'auto';
      this.reset();
  },
  mounted() {
      this.mobileFetch(() => { })
  },
  methods: {
      getLists() {
        return request
            .getFaBiRecords({
            order: "create_time",
            desc: true,
            pagesize: this.siz,
            offset: (this.page - 1) * this.siz
            })
            .then(res => {
            if (!this.emptyCheck(res.data, 'list')) return [];

            return res.data.list.map(el => {
                return {
                ...el,
                date: util.format(el.createtime),
                user: el.username,
                amount: el.value,
                status: el.status
                };
            });
        });
    }
  }
}

</script>
<style lang='scss'>
.pc {
    .el-table, .el-table th, .el-table tr {
        background: transparent;
    }
    .el-table th .cell {
        color: #086599
    }
    .el-table::before {
    height: 0px;
}
}
.mobile {
    .blocks {
        overflow: hidden;
        border-radius: 4px;
    }
}
</style>