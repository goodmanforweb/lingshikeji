<!--  -->
<template>
<page title="矿机向导" borderLine padding leftBtn='menu'>

<div class="kjguide">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">矿机向导</span>
      <span class="fresh-action cp">
        <img src="../../assets/images/freshicon.png" alt="">
      </span>
  </div>
  <ul class="kjguide-bd" :class="{flex: !isMobile}">
    <li class="block block-padding cp bbox flex vc" :class="{hc:isMobile}" @click="panelHandle('PAdd')">
        <div class="vs-plus center fw f26 m16 cp">+</div>
        <div class="fw tcolor">添加向导</div>
    </li>
     <li class="block block-padding bbox flex v vc hc re" :class="{m16: isMobile}">
       <span class="vs-edit cp" @click="panelHandle('PEdit')"></span>
       <span class="vs-delete cp"></span>
        <div class="fw tcolor">通用向导</div>
        <span class="gcolor f12">查看英文版</span>
    </li>
    <li class="block block-padding bbox flex v vc hc re">
       <span class="vs-edit cp" @click="panelHandle('PEdit')"></span>
       <span class="vs-delete cp"></span>
        <div class="fw tcolor">游戏向导</div>
        <span class="gcolor f12">查看英文版</span>
    </li>
  </ul>
  <RightPanel :show.sync="panelShow"   :fullScreen="true" class="prohubPanel" >
       <component :is="panel"></component>
    </RightPanel>
</div>
</page>
</template>

<script>
import PAdd from '../guide/guide-panel-add';
import PEdit from '../guide/guide-panel-edit'
export default {
  data () {
    return {
      panelShow: false,
      panel:''
    };
  },

  components: {
    PAdd,
    PEdit
  },

  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    }
  },

  mounted() {},

  methods: {
    panelHandle(type, data) {
        if(this.isMobile) {
          return this.$router.push({PAdd: 'addguide',PEdit: 'editguide'}[type]);
        }
        this.panel = this.$options.components[type];
        this.panelShow = true;
      },
  }
}

</script>
<style lang='scss'>
.pc {
  .kjguide-bd {
    li:first-of-type {
      margin-left: 0;
    }
    li {
      width: 233px;
      margin: 8px;
    }
  }
}

.kjguide-bd {

  li {
    height: 94px;
    .vs-plus {
      width: 50px;
      height: 50px;
      line-height: 50px;
      margin-right: 10px;
    }
    .vs-edit {
      width: 24px;
      height: 24px;
      background-size: 15px auto;
      top:0;
      right: 40px;
    }
    .vs-delete {
      width: 24px;
      height: 24px;
      top:0;
      right: 10px;
    }
  }
}
</style>