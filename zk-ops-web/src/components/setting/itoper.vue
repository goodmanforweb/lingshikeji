<!--  -->
<template>
<page title="运维管理" borderLine padding leftBtn='menu'>
  <span slot="layer-right-btn"  @click="$router.push({name: 'settingpanel', query: {type:'itoper'}})">
        <i class="w-date"><img src="../../assets/images/addicon.png" alt=""></i>
    </span>
  <div class="itoper">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">运维管理</span>
      <div>
        <div class="n-btn btn-tcolor-border f14" @click="panelShow = true">添加运维</div>
        <span class="fresh-action cp">
          <img src="../../assets/images/freshicon.png" alt="">
        </span>
      </div>
  </div>
  <Scroll>
  <XXTable :data="lists">
          <XXTable-Column
          prop="date"
          label='更新时间'
          >
          </XXTable-Column>
          <XXTable-Column
          prop="content"
          label='配置内容'
          >
          </XXTable-Column>
          <XXTable-Column
          prop="value"
          label="数值"
          >
          </XXTable-Column>
          <XXTable-Column
          prop="warn"
          label="提醒运维"
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
                <span class="vs-edit vs-icon-nofix cp" @click="$router.push({name: 'settingpanel', query: {type:'itoper'}})"></span> 
                <span class="vs-delete vs-icon-nofix cp"></span>                    
                <button slot="reference" class="wallet-table-handle fw">&middot;&middot;&middot;</button>
                </el-popover>
            </template>
          </template>
            </XXTable-Column>
    </XXTable>
  </Scroll>
    <RightPanel :show.sync="panelShow"   class="blacklistPanel" >
          <SPanel :panelData='panelData'/>
      </RightPanel>
</div>
</page>
</template>

<script>
import SPanel from './monitoraddress-panel'

export default {
  data () {
    return {
      panelData: {
        type:'itoper',
        name:'添加运维',
        form: ['提醒内容','数值','运维手机号码']
      },
      panelShow: false,
      lists: [
        {
          date: '2019:99:99',
          content:'每日最大提现额度',
          value: '1000CJT',
          warn: '008618766565789'
        },
        {
          date: '2019:99:99',
          content:'每日可提现总额',
          value: '1000CJT',
          warn: '008618766565789'
        },

      ]
    };
  },

  components: {
    SPanel
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
