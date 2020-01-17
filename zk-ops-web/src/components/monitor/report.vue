<!--  -->
<template>
<page title="公告管理" borderLine padding leftBtn='menu'>
   <span slot="layer-right-btn"  @click="$router.push('/reportpanel')">
        <i class="w-date"><img src="../../assets/images/addicon.png" alt=""></i>
    </span>
  <div class="report">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">公告管理</span>
      <div>
        <div class="n-btn btn-tcolor-border f14" @click="panelShow=true">添加公告</div>
        <span class="fresh-action cp">
          <img src="../../assets/images/freshicon.png" alt="">
        </span>
      </div>
  </div>
  <Scroll >
  <XXTable :data="lists">
            <XXTable-Column
            prop="date"
            label='更新时间'
            >
            </XXTable-Column>
            <XXTable-Column
            prop="title"
            label="公告标题"
            >
            </XXTable-Column>
            <XXTable-Column
            prop="yes"
            :width="`${isMobile ? '60px' : '120px'}`"
            :fixed="`${isMobile ? 'right' : false}`"

            >
            <template v-slot:default="slotProps">
            <template v-if="!isMobile">
                <span class="vs-edit vs-icon-nofix cp" ></span> 
                <span class="vs-delete vs-icon-nofix cp"></span>
            </template>
            <template v-else>
                <el-popover
                    placement="bottom"
                    width="65"
                    trigger="click">
                <span class="vs-edit vs-icon-nofix cp" @click="$router.push({name: 'reportpanel', query:{edit: 1}})"></span> 
                <span class="vs-delete vs-icon-nofix cp"></span>                    
                <button slot="reference" class="wallet-table-handle fw">&middot;&middot;&middot;</button>
                </el-popover>
            </template>
          </template>
            </XXTable-Column>
  </XXTable>
  </Scroll>
  <RightPanel :show.sync="panelShow"   :fullScreen="true" class="blacklistPanel" >
      <BPanel />
  </RightPanel>

</div>

</page>
</template>

<script>
import BPanel from './report-panel';

export default {
  data () {
    return {
      panelShow: false,
      lists:[
        {
          date: '2019:90:90',
          title: '这里是公告的标题'
        },
        {
          date: '2019:90:90',
          title: '这里是公告的标题'
        },
        {
          date: '2019:90:90',
          title: '这里是公告的标题'
        },

      ]
    };
  },

  components: {
    BPanel
  },

  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    }
  },

  mounted() {},

  methods: {}
}

</script>
<style lang='scss'>

</style>