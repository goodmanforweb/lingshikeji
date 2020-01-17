<!--  -->
<template>
<Page :title="select"  :titleValue="$route.query.type || 0" @titleChange="titleChange" borderLine padding >
        <div class="calcer">
            <div style="paddingTop: 60px" v-if="!isMobile">
                <select class="tcolor f14" v-model="calcerType">
                    <option :value="index" v-for="(se,index) in select" :key="index">{{se}}</option>
                </select>
            </div>
            <component  class="calcer-bd m20" :is="calcer"></component>
        </div>
</Page>
</template>

<script>
import Layer from '../widgets/layer'
import dot from './dot/index'
import hy from './hy/index'

export default {
  data () {
    return {
        select: ['节点计算器','币诺合约计算器'],
        calcerType:0,
        calcer: dot
    };
  },
  components: {
      Layer,
      dot,
      hy
  },
  computed: {
      isMobile () {
          return this.$store.getters.isMobile
      },
  },
  mounted() {},
  methods: {
      changeCalcer(n) {
          this.calcer = n == 0 ? dot : hy;
      },
      titleChange(n) {
          this.changeCalcer(n);
      }
  },
  watch: {
      calcerType(n) {
          this.changeCalcer(n);
      }
  }
}

</script>
<style lang='scss' scoped>
.pc {
    .calcer-bd {
        min-width: 800px;
    }
}
select {
    width: 170px;
    height: 35px;
    line-height: 35 ;
    background-color: transparent;
    border: 1px solid #086599;
    outline: none;
}
</style>