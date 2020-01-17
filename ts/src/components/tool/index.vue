<template>
<Page :title="$t('m.more')" borderLine padding routerBack="/index">
    <div class="tool" :class="{block: isMobile}">
        <div class="tool-hd" v-if="!isMobile">
            <div class="tcolor fw">{{$t('m.musttool')}}</div>
            <span class="f12 gcolor">{{$t('m.yxzshou')}}</span>
        </div>
        <div :class="`cp tool-lists ${isMobile ? 'm16' : 'm20'}`">
            <div class="flex vc" @click="$router.push('/poster')" :class="{block: !isMobile}">
                <span><img src="../../assets/images/tooli.png" alt=""></span>

                <div class="tcolor flex1 fw tool-list-text" :class="{center: !isMobile}">
                    {{$t('m.zsposter')}}
                </div>
            </div>
        </div>
    </div>
</Page>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
}
</script>
<style lang="scss">


</style>

