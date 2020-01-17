<!--  -->
<template>
<Page class="dot-output" :title="$t('m.yjsy')" borderLine padding >
    <div >
        <div class="block mb16">
        <div class="tcolor f20">{{$t('m.ccsy')}}</div>
        <p class="tcolor">{{$t('m.hjsy')}} <span class="f26 fw">5000</span></p>
        <p class="tcolor fw center">{{$t('m.sjksj')}}</p>
        <div class="tcolor prevei limitW center clearfix mb6">
            <span class="fw f24">10000</span>
            <span class="fr">CJS</span>
        </div>
        <div class="flex sb limitW mb6">
            <span class="gcolor">{{$t('m.yicc')}}</span>
            <span class="tcolor fw">1250000CJOY</span>
        </div>
        <div class="flex sb limitW">
            <span class="gcolor">{{$t('m.lcunnl')}}</span>
            <span class="tcolor fw">0CJOY</span>
        </div>
        </div>
        <div class="block ">
        <div class="tcolor f20">{{$t('m.nljhua')}}</div>
        <p class="tcolor fw center">{{$t('m.sjxhnl')}}</p>
        <div class="tcolor prevei limitW center fw f24 mb6">
            210000
        </div>
        <div class="flex sb borderLine limitW sec-line mb16">
            <span class="gcolor">{{$t('m.yxhnlz')}}</span>
            <span class="tcolor fw">210000</span>
        </div>
        <div class="limitW">
            <el-slider v-model="slider"></el-slider>
            <div class="flex sb tcolor f12">
            <i>0</i>
            <i>20000</i>
            </div>
            <div class="center gcolor f12 slider-hint">
            <i>{{$t('m.zsong')}}</i>
            <i>{{$t('m.czhi')}}</i>
            </div>
        </div>
        </div>

    </div>
</Page>
</template>

<script>
export default {
  data () {
    return {
        slider: 20,
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {}
}

</script>
<style lang='scss'>

</style>