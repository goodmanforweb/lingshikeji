<!--  -->
<template>
<page title="黑名单" borderLine padding leftBtn='menu'>
<div class="blaklist">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">黑名单</span>
      <div>
        <div class="n-btn btn-tcolor-border f14" @click="panelHandle">添加黑名单</div>
        <span class="fresh-action cp">
          <img src="../../assets/images/freshicon.png" alt="">
        </span>
      </div>

  </div>
  <div :class="`wallet-hd flex m16 vc ${isMobile ? 'sb' : 'fe'}`">
      <div v-if="isMobile" class="n-btn btn-tcolor-border f14" @click="panelHandle">添加黑名单</div>

      <XXSearch v-model="inputValue" class="wh-search"/>
  </div>
  <Scroll :initListener="$isMobile" :fetch="mobileFetch">
    <div class="blacklist-bd">
      <XXTable :data="lists"
      @pagerChange="pagerChange"
      :pagerShow="true">
              <XXTable-Column
              prop="date"
              label='注册时间'
              >
              </XXTable-Column>
              <XXTable-Column
              prop="phone"
              label='手机号'
              >
              </XXTable-Column>
              <XXTable-Column
              prop="state"
              label="状态"
              >
              <template v-slot:default="slotProps">
                  <span v-html="slotProps.row.state"></span>
              </template>
              </XXTable-Column>
              <XXTable-Column
              prop="yes"
              :width="`${isMobile ? '60px' : '180px'}`"
              :fixed="`${isMobile ? 'right' : false}`"
              >
              <template v-slot:default="slotProps">
                  <template v-if="!isMobile">
                      <el-button :loading="slotProps.row.loader" @click="handle(slotProps.row)" class="n-btn btn-disable man-btn" >解除禁止</el-button>
                  </template>
                  <template v-else>
                      <el-popover
                          placement="bottom"
                          width="65"
                          trigger="click">
                          <el-button :loading="slotProps.row.loader" @click="handle(slotProps.row)" class="n-btn btn-disable man-btn" >解除禁止</el-button>

                          <button slot="reference" class="wallet-table-handle fw">&middot;&middot;&middot;</button>
                      </el-popover>
                  </template>
              </template>
              </XXTable-Column>
        </XXTable>
    </div>
  </Scroll>

  <RightPanel :show.sync="panelShow"   class="blacklistPanel" >
      <BPanel @update:show = "panelShow=false"/>
  </RightPanel>

</div>
</page>
</template>

<script>
import BPanel from './blacklist-panel';
export default {
  data () {
    return {
      panelShow: false,
      inputValue:'',
      lists: [
        {
          date:'2018:89:90',
          phone:'1234567890',
          state:'禁止注册'
        },
        {
          date:'2018:89:90',
          phone:'1234567890',
          state:'禁止注册'
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

  methods: {
    handle(row) {
      row.loader = true;
      request.deleteBlackItem({}, {id:row.id})
      .then(res => {
        this.$message.info('删除成功');
        this.freshListsData();
      })
      .finally(() => {
        row.loader  = false;
      })
    },
    panelHandle() {
      if(this.isMobile) {
        return this.$router.push('/addblacklist');
      }
      this.panelShow = true;
    },
    getLists() {
      return request.getBlackLists({
        order:'created_time',
        desc: true,
        pagesize: this.size,
        offset: (this.page-1)*this.size
      })
      .then(res => {
        if(!this.emptyCheck(res.data)) return [];
        return res.data.map(el => {
          return {
            ...el,
            date: util.format(el.createtime),
            state: '禁止注册'
          }
        })
      })
    }

  }
}

</script>
<style lang='scss'>
.fresh-action {
  width: 22px;
  display: inline-block;
  margin-left: 20px
}

</style>