<!--  -->
<template>
<page title="社交管理" borderLine padding leftBtn='menu'>
  <div class="tranoper">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">社交管理</span>
      <span class="fresh-action cp">
        <img src="../../assets/images/freshicon.png" alt="">
      </span>
  </div>
  <ul class="kjguide-bd" :class="{flex: !isMobile}">
    <li class="block block-padding cp bbox flex vc" @click="panelHandle" :class="{hc: isMobile}">
        <div class="vs-plus center fw f26 m16 cp">+</div>
        <div class="fw tcolor">添加渠道</div>
    </li>
     <li class="block block-padding bbox flex vc re" :class="{hc: isMobile}">
       <span class="vs-edit cp"></span>
       <span class="vs-delete cp"></span>
       <span class="vs-wechat"></span>
        <div class="fw tcolor">微信</div>
    </li>
    <li class="block block-padding bbox flex vc re" :class="{hc: isMobile}">
       <span class="vs-edit cp"></span>
       <span class="vs-delete cp"></span>
       <span class="vs-wechat"></span>
        <div class="fw tcolor">微信</div>
    </li>
  </ul>
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
      panelShow: false,
      panelData: {
        type:'tranoper',
        name:'添加社交渠道',
        form: ['渠道名称'],
        upload:1
      },
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

  methods: {
    panelHandle() {
      if(this.isMobile) {
        return this.$router.push({name: 'settingpanel', query: {type:'tranoper'}})
      }
      this.panelShow = true;
    }
  }
}

</script>
<style lang='scss'>
.vs-wechat {
  width: 50px;
  height: 50px;
  background: url(../../assets/images/wechaticon.png) no-repeat center/50px;
  margin-right: 10px;
}
.mobile {
  .kjguide-bd {
    li {
      margin: 8px 0;
    }
  }
}
</style>