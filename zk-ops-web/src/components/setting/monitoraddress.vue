<!--  -->
<template>
<page title="监控地址" borderLine padding leftBtn='menu'>
  <span slot="layer-right-btn"  @click="$router.push({name: 'settingpanel', query: {type:'monitoraddress'}})">
        <i class="w-date"><img src="../../assets/images/addicon.png" alt=""></i>
    </span>
  <div class="monitoraddress">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">监控地址</span>
      <div>
        <div class="n-btn btn-tcolor-border f14" @click="panelShow = true">添加地址</div>
        <span class="fresh-action cp">
          <img src="../../assets/images/freshicon.png" alt="">
        </span>
      </div>
  </div>
  <div class="wallet-hd flex fe m16 ">
      <XXSearch v-model="inputValue" class="wh-search"/>
  </div>
  <Scroll>
    <XXTable :data="lists">
          <XXTable-Column
          prop="date"
          label='更新时间'
          >
          </XXTable-Column>
          <XXTable-Column
          prop="phone"
          label='手机号码'
          >
          </XXTable-Column>
          <XXTable-Column
          prop="address"
          label="监控地址"
          
          >
          </XXTable-Column>
          <XXTable-Column
          prop="decimal"
          label="小数位"
          >
          </XXTable-Column>
          <XXTable-Column
          prop="value"
          label="数值"
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
                <span class="vs-edit vs-icon-nofix cp" @click="$router.push({name: 'settingpanel', query: {type:'monitoraddress'}})"></span> 
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
        type:'monitoraddress',
        name:'添加监控地址',
        form: ['监控地址','数值','小数位']
      },
      inputValue:'',
      panelShow: false,
      lists: [
        {
          date: '11-13 11:11:11',
          phone:'008618765434567',
          address:'0x76AAf3b27AD3b1d250F47cBcB6a59bB92863C273',
          decimal: 18,
          value: '1000CJT'
        },
        {
          date: '11-13 11:11:11',
          phone:'008618765434567',
          address:'0x76AAf3b27AD3b1d250F47cBcB6a59bB92863C273',
          decimal: 18,
          value: '1000CJT'
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
<style lang='scss'>

</style>