<!--  -->
<template>
<page title="广告位" borderLine padding leftBtn='menu'>
  <span slot="layer-right-btn"  @click="$router.push('/adavailpanel')">
        <i class="w-date"><img src="../../assets/images/addicon.png" alt=""></i>
    </span>
  <div class="adavail">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">广告位</span>
      <div>
        <div class="n-btn btn-tcolor-border f14" @click="panelShow=true">添加广告</div>
        <span class="fresh-action cp">
          <img src="../../assets/images/freshicon.png" alt="">
        </span>
      </div>

  </div>
    <div class="wallet-hd m16">
        <XXRadio class="wh-radio flex gcolor f14" :texts="radioTexts" v-model="radioValue"></XXRadio>
    </div>
    <Scroll trigger>
    <XXTable :data="lists">
            <XXTable-Column
            prop="date"
            label='更新时间'
            >
            </XXTable-Column>
            <XXTable-Column
            prop="area"
            label="区域"
            >
            </XXTable-Column>
            <XXTable-Column
            prop="link"
            label='链接'
            >
            </XXTable-Column>
            <XXTable-Column
            prop="rank"
            label="轮播顺序"
            >
            </XXTable-Column>
            <XXTable-Column
            prop="pic"
            label="轮播图"
            >
            <template v-slot:default="slotProps">
              <div>
                <img :src="slotProps.cell" alt="">
              </div>
            </template>
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
                <span class="vs-edit vs-icon-nofix cp" @click="$router.push({name: 'adavailpanel', query:{edit: 1}})"></span> 
                <span class="vs-delete vs-icon-nofix cp"></span>                    
                <button slot="reference" class="wallet-table-handle fw">&middot;&middot;&middot;</button>
                </el-popover>
            </template>
          </template>
            </XXTable-Column>
        </XXTable>
    </Scroll>
          <RightPanel :show.sync="panelShow"   class="blacklistPanel" >
              <BPanel />
          </RightPanel>

</div>

</page>
</template>

<script>
import BPanel from './adavail-panel';
export default {
  data () {
    return {
      panelShow: false,
      lists:[
        {
          date: '2019:90:90',
          area: '主页',
          link:'hsdfhjskahfdjksafjkd',
          rank:1,
          pic: require('../../assets/images/temp.png')
        },
        {
          date: '2019:90:90',
          area: '主页',
          link:'hsdfhjskahfdjksafjkd',
          rank:1,
          pic: require('../../assets/images/temp.png')
        }
      ],
      radioTexts:['全部','主页','项目页','会员中心'],
      radioValue:'全部'
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