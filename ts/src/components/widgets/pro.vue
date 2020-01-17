<template>
<Page :title="$t('m.sqpro')" borderLine padding routerBack='/pro' >
    <Layer :type="isMobile" :float="true" v-if="isMobile ? true : show">
        <div class="checkin shadow center" :class="{flex1: isMobile}">
            <div class="ck-hd  tcolor" v-if="!isMobile">
                <i class="el-icon-error" @click="$emit('update:show', false)"></i>
                {{$t('m.sqpro')}}
            </div>
            <div class="ck-bd">
                <div class="ercode">
                    <img src="../../assets/images/ercode.png" alt="">
                </div>
                <div class="tcolor f14 jjj" style="margin: 20px 0;" v-html="$t('m.addwxzs')"></div>
                <div class="tqc f14">
                    <img style="width: 20px" src="http://cjoy.oss-cn-hongkong.aliyuncs.com/new/17701555310383_.pic.jpg" alt="">

                    CryptoJOY
                </div>
            </div>
        </div>
    </Layer>
</Page>
</template>
<script>
import Layer from './layer';
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
  },
    components: {
        Layer
    },
    props: ['show']
}
</script>
<style lang="scss">
.ercode img {
    width: 200px
}
</style>

