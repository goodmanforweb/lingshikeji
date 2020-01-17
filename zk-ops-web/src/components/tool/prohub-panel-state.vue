<!--  -->
<template>
<page title="修改项目状态" borderLine padding routerBack="/prohub">

<div class="prohub-panel-state panel-width" >
    <div class="tcolor x-hd fw f24 mb20">修改项目状态</div>

    <div class="m20 block block-padding re dc-left-line" style="opacity: 0.6">
        <span class="tcolor f12">当前状态</span>
        <div class="tcolor f20 fw">认购中</div>
    </div>

    <div class="gcolor f12 mb6">调整为</div>
    <div class="viplevel">
        <div class="cp  block block-padding re dc-left-line" @click="radioHandle(index)" v-for="(radio, index) in radios" :key="index" :class="{active: radio.active}">
            <i class="cp el-icon-circle-check w-icon w-yes w-icon-size"></i>
            <div class="tcolor f20 fw">{{radio.text}}</div>
        </div>
    </div>
    <div class="center m20">
        <span class="n-btn f20 btn-tcolor btn-panel-sure">确 认</span>
    </div>
</div>
</page>
</template>

<script>
export default {
  data () {
    return {
        radios:[
            {
                text: '执行中',
                active: true
            },
            {
                text: '已结束',
                active: false
            },

        ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
      radioHandle(idx) {
        this.radios.forEach((radio, index) => {
            radio.active = idx == index
        })
        }
  }
}

</script>
<style lang='scss'>

</style>