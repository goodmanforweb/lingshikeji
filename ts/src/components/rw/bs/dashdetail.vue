<!--  -->
<template>
<Page :class="{'hy-left block': !isMobile}" :title="$t('m.hydetail')" borderLine padding routerBack="dash">
    <div class="re" :style="isMobile ? '' : 'height: 100%'" :class="{block:isMobile}" >
        <div class="center">
            <img style="width:50px" :src="t.xm_img || defaultSrc" alt="">
            <div class="f18 tcolor fw m10">{{$i18n.locale == 'zh' ? t.name : t.name_en}}</div>
            <div class="f12 gcolor">NO.{{t.id}}</div>
        </div>
        <div class="hy-row m10">
            <span class="gcolor f12">{{$t('m.qyje')}}：</span>
            <div class="tcolor f14">{{price}}CJC</div>
        </div>
        <div class="hy-row m10">
            <span class="gcolor f12">{{$t('m.qyxmu')}}：</span>
            <div class="tcolor f14">{{$i18n.locale == 'zh' ? t.project_name : t.project_name_en}}</div>
        </div>
        <div class="hy-row m16 borderLine pd16">
            <span class="gcolor f12">{{$t('m.qytime')}}：</span>
            <div class="tcolor f14">{{t.start_time | format}}</div>
        </div>
        <div class="gcolor f12" :class="{'flex v sa': !isMobile}">
            <div>{{$t('m.hycont')}}</div>
            <div class="hy-row m10" >
                {{t.yield || 0}}%
                <br>
                {{$t('m.trjjzall')}}
                
            </div>
            <div class="hy-row m10" >
                {{suoding || 0}}%
                <br>
                {{$t('m.sdybjztz')}}
                
            </div>
            <div class="hy-row m10" >
                {{lilv[0]}}% ~ {{lilv[1]}}%
                <br>
                {{$t('m.ybjmzll')}}
                
            </div>
            <div class="hy-row m10" >
                <i style="fontWeight:500">{{t.description.experience == 0 ? $t('m.cqyx') : t.description.experience + $t('m.day')}}</i>
                <br>
                {{$t('m.hyzqi')}}
                
            </div>
        </div>
        <span class="qystate">
          <img v-if="isHYValid" :src="icon[$i18n.locale].yqy" alt="">
                <img v-else :src="icon[$i18n.locale].qysx" alt="">
                <img v-if="t.trial" :src="icon[$i18n.locale].tyrz" alt="">
        </span>
    </div>
</Page>
</template>

<script>
import Big from 'bignumber.js'
import {mapActions, mapGetters} from 'vuex';
export default {
  data () {
    return {
        icon: {
            zh: {
                yqy:require('../../../assets/images/yqyicon.png'),
                qysx:require('../../../assets/images/qysxicon.png'),
                tyrz:require('../../../assets/images/tyrzicon.png'),
            },
            en: {
                yqy:require('../../../assets/images/yqyiconen.png'),
                qysx:require('../../../assets/images/qysxiconen.png'),
                tyrz:require('../../../assets/images/tyrziconen.png'),
            },
        },
         defaultSrc: require('../../../assets/images/plogo.png'),
    };
  },
  components: {},
  computed: {
      ...mapGetters(['signHYDetail']),
      isMobile () {
          return this.$store.getters.isMobile
      },
      id() {
          return this.$route.query.id
      },
      t() {
          return this.signHYDetail;
      },
      isHYValid() {
          let t = this.t.end_time ? this.t.end_time : new Date();
          return (new Date(t).getTime() - new Date().getTime()) > 0;
      },
      price() {
          return  util.dropHex(this.t.price, this.t.decimals, 4);
      },
      suoding() {
          return Big(100).minus(this.t.yield).toNumber();
      },
      lilv() {
          if(this.t.description && this.t.description.interest_rate) {
              return this.t.description.interest_rate.split(',')
          }
          return [0,0]
      }
  }
}

</script>
<style lang='scss'>

</style>