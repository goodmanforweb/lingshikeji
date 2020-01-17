<!--  -->
<template>
<Page :class="{'hy-left block': !isMobile}" :title="$t('m.hydetail')" borderLine padding  routerBack="ddash">

<div class="re" :class="{'flex v sa': !isMobile, block:isMobile}" >
            <div class="center">
                <img style="width:50px" :src="t.xm_img || defaultSrc" alt="">
                <div class="f18 tcolor fw m10">{{$i18n.locale == 'zh' ? t.name : t.name_en}}</div>
                <div class="f12 gcolor m10">NO.{{t.id}}</div>
                <div v-if="isShowSJBtn" class="n-btn btn-redcolor f14" @click="panelHandle('HYSJ')" >{{$t('m.sjqy')}}</div>
            </div>
            <div class="hy-row m10">
                <span class="gcolor f12">{{$t('m.qyje')}}：</span>
                <div class="tcolor f14">{{price}}CJS</div>
            </div>
            <div class="hy-row m10">
                <span class="gcolor f12">{{$t('m.qyxmu')}}：</span>
                <div class="tcolor f14">{{$i18n.locale == 'zh' ? t.project_name : t.project_name_en}}</div>
            </div>
            <div class="hy-row m16 borderLine pd16">
                <span class="gcolor f12">{{$t('m.qytime')}}：</span>
                <div class="tcolor f14">{{t.start_time | format}}</div>
            </div>
            <div class="gcolor f12" :class="{'flex v sa': !isMobile}" >
                <div>{{$t('m.hycont')}}</div>
                <div class="hy-row m10">
                    {{t.yield || 0}}%
                    <br>
                    {{$t('m.fwsyjb')}}
                </div>
                <div class="hy-row m10">
                    {{t.flow_upperbound || 0}}USD
                    <br>
                    {{$t('m.hyy8')}}
                </div>
                <div class="hy-row m10">
                    {{(t.valid_time|| t.validTime || 0) | getday}}{{$t('m.day')}}
                    <br>
                   {{$t('m.hyzqi')}}
                </div>
                <div class="hy-row m10">
                    {{t.initGas}}
                    <br>
                    {{$t('m.nlzsong')}}
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
        loader: false,
    };
  },
  computed: {
      ...mapGetters(['signHYDetail','fwsHYLists']),
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
      isMaxLevel() {
          const id = this.t.project_contract;
          let t = this.fwsHYLists.find(el => el.id == id);
          if(t) {
              return t.sort >= this.fwsHYLists.length;
          }
          return false;
      },
      isShowSJBtn() {
          if(!this.t.total_waterraw || !this.t.description.next_level_need || this.isMaxLevel) return  false;

          return Big(this.t.total_waterraw).gte(this.t.description.next_level_need)
      },
      price() {
          return  util.fromHex(this.t.price, this.t.decimals, 4);
      }
  },
  created() {
      
  },
  mounted() {},
  methods: {
      panelHandle(type) {
          if(this.isMobile) {
              return this.$router.push(`hysj?&wid=${this.t.project_contract}`);
          }

          this.$emit('panelHandle', type);
      },
      
  }
}

</script>
<style lang='scss'>

</style>