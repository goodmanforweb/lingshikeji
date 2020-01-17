<!--     -->
<template>
<page title="VIP会员" borderLine padding leftBtn='menu'>
  <span slot="layer-right-btn"  @click="$router.push('/addvip')">
        <i class="w-date"><img src="../../assets/images/addicon.png" alt=""></i>
    </span>
<div class="viplist">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">VIP会员</span>
      <div>
        <!-- <div class="n-btn btn-tcolor-border f14" @click="handle('PAdd')">添加VIP</div> -->
        <span class="fresh-action cp">
          <img src="../../assets/images/freshicon.png" alt="">
        </span>
      </div>

  </div>
  <div class="wallet-hd flex fe m16 ">
      <XXSearch v-model="inputValue" class="wh-search"/>
  </div>
  <Scroll :initListener="$isMobile" :fetch="mobileFetch">
    <div class="viplist-bd">
      <XXTable :data="lists"
      @pagerChange="pagerChange"
      :pagerShow="true">
              <XXTable-Column
              prop="date"
              label='添加时间'
              >
              </XXTable-Column>
              <XXTable-Column
              prop="username"
              label="用户"
              >
              </XXTable-Column>
              <XXTable-Column
              prop="phone"
              label='手机号'
              >
              </XXTable-Column>
              <XXTable-Column
              prop="level"
              label="VIP等级"
              >
              </XXTable-Column>
              <XXTable-Column
              prop="yes"
              :width="`${isMobile ? '60px' : '160px'}`"
              :fixed="`${isMobile ? 'right' : false}`"
              >
              <template v-slot:default="slotProps">
                <template v-if="!isMobile">
                    <el-button @click="handle('PCheck',slotProps.row)" class="n-btn btn-tcolor man-btn" >查看权益</el-button>
                    <el-button @click="handle('PAjust', slotProps.row)" class="n-btn btn-tcolor man-btn" >调整等级</el-button>
                </template>
                <template v-else>
                    <el-popover
                        placement="bottom"
                        width="65"
                        trigger="click">
                          <el-button @click="handle('PCheck',slotProps.row)" class="n-btn btn-tcolor man-btn" >查看权益</el-button>
                          <el-button @click="handle('PAjust', slotProps.row)" class="n-btn btn-tcolor man-btn" >调整等级</el-button>
                        <button slot="reference" class="wallet-table-handle fw">&middot;&middot;&middot;</button>
                    </el-popover>
                </template>
              </template>
              </XXTable-Column>
          </XXTable>
    </div>
  </Scroll>
  <RightPanel :show.sync="panelShow"   class="viplistPanel" >
      <component :panelData='panelData'  :is="panel" @upate:show='panelShow=false'></component>
  </RightPanel>
</div>
</page>
</template>

<script>
import PAdd from './blacklist-panel-add';
import PCheck from './blacklist-panel-check';
import PAjust from './blacklist-panel-ajust';
import {mapActions,mapGetters} from 'vuex'
export default {
  data () {
    return {
      panelShow: false,
      inputValue:'',
      panelData: {},
      panel:'',
      lists: [
        {
          date: '2011:99:99',
          username: 'dada',
          phone: '12345678904567',
          level: 12,
        },
      ]
    };
  },

  components: {
    PAdd,
    PCheck,
    PAjust
  },

  computed: {
    ...mapGetters(['viplists']),
    isMobile() {
      return this.$store.getters.isMobile
    },
    
  },

  mounted() {
    this.getVipLists();
  },

  methods: {
    ...mapActions(['getVipLists']),
    handle(type, data) {
      if(this.isMobile) {
        return this.$router.push({'PAdd':'/addvip', 'PCheck':'/checkrights', 'PAjust':'/ajustrights'}[type]);
      }
      this.panel = this.$options.components[type];
      this.panelShow = 1;
      if(type == 'PCheck') {
        this.panelData = data;
      }
    },
    findVipLevel(el) {
      let t = this.viplists.find(el => el.id ==el.vip_id);
      return this.viplists.indexOf(t) + 1;
    },
    getLists() {
      return request.getUserLists({
        status: 0,
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
            level: this.findVipLevel(el)
          }
        })
      })
    }
  },
  watch: {
    viplists: {
      immediate: true,
      deep: true,
      handler: function(n) {
        if(!util.isEmpty(n)) {
          this.fetch();
        }
      }
    }
  }
}

</script>
<style lang='scss'>

</style>