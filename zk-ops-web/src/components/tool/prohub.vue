<!--  -->
<template>
<page title="项目库" borderLine padding leftBtn='menu'>
    <span slot="layer-right-btn"  @click="$router.push('/editguide')">
        <i class="w-date"><img src="../../assets/images/addicon.png" alt=""></i>
    </span>
<div class="prohub">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">项目库</span>
      <div>
        <div class="n-btn btn-tcolor-border f14" @click="handle('addkjguide')">添加项目</div>
        <span class="fresh-action cp">
          <img src="../../assets/images/freshicon.png" alt="">
        </span>
      </div>

  </div>
    <div class="wallet-hd flex sb m16">
        <XXRadio class="wh-radio flex gcolor f14" :texts="radioTexts" v-model="radioValue"></XXRadio>

        <XXSearch v-model="inputValue" class="wh-search"/>
    </div>
    <Scroll trigger>
      <div class="prohub-bd flex fwrap" :class="{sb: isMobile}">
        <div class="ph-cube block block-padding bbox re cp" 
        :class="{center: isMobile}" @click="handle('PPanel', cube)" v-for="(cube, index) in lists" :key="index">
          <div class="f12" :class="{right: !isMobile}" 
          :style="{color: {'执行中':'#38B573','编辑中':'#ED6363','认购中':'#086599','已结束':'#6E6E6E'}[cube.state]}">{{cube.state}}</div>
          
          <div :class="{'flex vc': !isMobile}">
            <div class="tcolor fw" v-if="isMobile">{{cube.name}}</div>
            <span class="ph-cube-icon">
              <img :src="cube.img" v-if="cube.img" alt="">
            </span>
            <div class="phc-info">
              <div class="tcolor fw" v-if="!isMobile">{{cube.name}}</div>
              <span class="gcolor f12">{{cube.cat}}类矿机在运行</span>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="prohub-ft" v-if="!isMobile">
      <XXPager class="re-table-ft" @change="pagerChange"/>
    </div>
      <RightPanel :show.sync="panelShow"  :fullScreen="true" class="prohubPanel">
          <component :panelData='panelData'  :is="panel" @upate:show='panelShow=false'></component>
      </RightPanel>


</div>
</page>
</template>

<script>
import PPanel from './prohub-panel'
import addkjguide from '../guide/guide-panel-edit'
export default {
  data () {
    return {
      panel:'',
      panelData: {},
      panelShow: false,
      inputValue:'',
      radioValue:'全部',
      radioTexts: ['全部','认购中','执行中','已结束','编辑中'],
      lists: [
        {
          name:'sdfasfdas',
          cat: 999,
          state:'sjkldfjk'
        }
      ]
    };
  },

  components: {
    PPanel,
    addkjguide
  },

  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    }
  },
  created() {
    this.param = {};
  },
  mounted() {},

  methods: {
    handle(type, data) {
      if('PAdd' == type) {
        
      }
      if(this.isMobile) {
        return this.$router.push('/ppanel');
      }
      this.panel = this.$options.components[type];
      this.panelShow = true
    },
    getLists() {
      return request.getXmLists({
        ...this.param,
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
            metadata: JSON.parse(el.metadata),
            img: el.metadata.img
          }
        })
      })
    }
  },
  watch: {
    radioValue: {
      immediate: true,
      handler: function(n) {
        this.param.status = this.radioTexts.indexOf(n);
        this.fetch();
      }
    }
  }
}

</script>
<style lang='scss'>


.pc {
  .ph-cube {
    margin: 8px;
    width: 233px;
    height: 94px;
  }
  .ph-cube-icon {
    margin-right: 10px;
  }
}
.ph-cube-icon {
    width: 46px;
    display: inline-block;
}
.mobile {
  .ph-cube {
    width: calc(50% - 8px);
    margin: 8px 0;
    .tcolor {
      margin: 16px 0;
      font-size: 20px;
    }
    .phc-info {
      padding-top: 10px;
      margin: 16px -16px -6px;
      border-top: 1px solid rgba(0, 89, 130, 0.07);
    }
  }
}
</style>