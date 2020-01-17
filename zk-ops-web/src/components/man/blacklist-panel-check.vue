<!--  -->
<template>
<page title="会员权益" borderLine padding>

<div class="blacklist-panel-check panel-width" >
  <div class="mb30">
    <div class="tcolor fw f24">{{panelData.username}}</div>
    <span class="tcolor">{{panelData.name}}</span>
  </div>

  <div class="m20 block block-padding re dc-left-line tcolor">
    <div class="f14">
      CJT 每日提现限额
    </div>
    <div class="f20 fw m16 towrap">{{panelData.cjt}}</div>
  </div>
  <div class="block block-padding re dc-left-line tcolor">
    <div class="f14">
      CJS 每日提现限额
    </div>
    <div class="f20 fw m16 towrap">{{panelData.cjs}}</div>
  </div>
</div>
</page>
</template>

<script>
export default {
  props: ['panelData'],
  data () {
    return {
    };
  },

  components: {},

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
.block-padding {
  padding: 16px;
}
</style>