<!--  -->
<template>
<Page :class="{'hy-left block': !isMobile}" :title="$t('m.hydetail')" borderLine padding >
    <div class="re" :class="{block: isMobile}">
        <div class="center">
            <img style="width:50px" src="../../../assets/images/plogo.png" alt="">
            <div class="f18 tcolor fw m10">{{$t('m.bnhy')}}</div>
            <div class="f12 gcolor">NO.kj894304869j3as</div>
        </div>
        <div class="hy-row m10">
            <span class="gcolor f12">{{$t('m.qyje')}}：</span>
            <div class="tcolor f14">19999CJS</div>
        </div>
        <div class="hy-row m10">
            <span class="gcolor f12">{{$t('m.qyxmu')}}：</span>
            <div class="tcolor f14">{{$t('m.bn')}}</div>
        </div>
        <div class="hy-row m16 borderLine pd16">
            <span class="gcolor f12">{{$t('m.qytime')}}：</span>
            <div class="tcolor f14">2019.11.11 12:19:11</div>
        </div>
        <div class="gcolor f12">
            <div>{{$t('m.hycont')}}</div>
            <div class="hy-row m10" >
                10%
                <br>
                {{$t('m.trjjzall')}}
                
            </div>
            <div class="hy-row m10" >
                365天
                <br>
                {{$t('m.hyzqi')}}
                
            </div>
        </div>
        <span class="qystate">
            <img src="../../../assets/images/yqyicon.png" alt="">
        </span>
    </div>
</Page>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  components: {},
  computed: {
      isMobile () {
          return this.$store.getters.isMobile
      }
  },
  mounted() {},
  methods: {}
}

</script>
<style lang='scss'>

</style>