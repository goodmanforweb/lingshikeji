<!--  -->
<template>
<page title="会员权益" borderLine padding>

<div class="blacklist-panel-ajust panel-width" >
  <div class="tcolor fw f24 mb20">{{panelData.username}}</div>
  <div class="m20 block block-padding re dc-left-line" style="opacity: 0.6">
    <span class="tcolor f12">当前等级</span>
    <div class="tcolor f20 fw mb16">{{panelData.name}}</div>
    <div class="flex sb f12 mb6">
      <span class="gcolor">CJT每日提现限额</span>
      <span class="tcolor">{{panelData.cjt}}</span>
    </div>
    <div class="flex sb f12">
      <span class="gcolor">CJS每日提现限额</span>
      <span class="tcolor">{{panelData.cjs}}</span>
    </div>
  </div>

  <div class="gcolor f12 mb6">调整为</div>
  <div class="viplevel">
    <div class="cp  block block-padding re dc-left-line" @click="radioHandle(index)" v-for="(radio, index) in radios" :key="index" :class="{active: radio.active}">
      <i class="cp el-icon-circle-check w-icon w-yes w-icon-size"></i>
      <div class="tcolor f20 fw mb16">{{radio.vip.toUpperCase()}}</div>
      <div class="flex sb f12 mb6">
        <span class="gcolor">CJT每日提现限额</span>
        <span class="tcolor">{{radio.cjt[1]}}</span>
      </div>
      <div class="flex sb f12">
        <span class="gcolor">CJS每日提现限额</span>
        <span class="tcolor">{{radio.cjs[1]}}</span>
      </div>
    </div>
  </div>

  <div class="center m20">
    <el-button :loading="loader" @click="submit" class="n-btn f20 btn-tcolor btn-panel-sure">确 认</el-button>
  </div>
  
</div>
</page>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  props: ['panelData'],
  data () {
    return {
      loader: false,
      radios:[
        {
          vip: 'vip1',
          cjt: ['cjt', 10000000],
          cjs: ['cjs', 10000000],
          active: true
        },
        {
          vip: 'vip2',
          cjt: ['cjt', 20000000],
          cjs: ['cjs', 20000000],
          active: 0
        },
        {
          vip: 'vip3',
          cjt: ['cjt', 30000000],
          cjs: ['cjs', 30000000],
          active: 0
        },
      ]
    };
  },

  components: {},

  computed: {
    ...mapGetters(['viplists']),
    isMobile() {
      return this.$store.getters.isMobile
    }
  },

  mounted() {
    this.activeIndex = 0;
  },

  methods: {
    radioHandle(idx) {
      this.radios.forEach((radio, index) => {
        radio.active = idx == index;
        radio.active && (this.activeIndex = index);
      })
    },
    submit() {
      this.loader = false;
      request.amendVipItem(this.viplists[this.activeIndex])
      .then(res => {
        this.$message.info('修改成功');
        this.$emit('update:show', false);
      })
      .finally(() => {
        thisd.loader  = false;
      })
    }
  },
  watch: {
    viplists: {
      immediate: true,
      deep: true,
      handler: function(n) {
        if(!util.isEmpty(n)) {
          this.radios = n.map((el, index) => {
            return {
              vip: 'vip'+ index + 1,
              cjt: ['cjt', el.cjt],
              cjs: ['cjs', el.cjs],
              active: this.panelData.level == (index + 1)
            }
          })
        }
      }
    }
  }
}

</script>
<style lang='scss'>
.viplevel {
  .w-yes {
      position: absolute;
      top:8px;
      right: 8px;
  }
  .block.active {
    .w-yes:before {
      color:#38B573
    }
  }
}
.viplevel .block:nth-of-type(2) {
    margin: 16px 0;
  }
</style>