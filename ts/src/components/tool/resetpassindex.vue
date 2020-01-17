<template>
<Page :title="$t('m.grsz')" borderLine padding routerBack="/center">
    <div class="tool m16" :class="{block: isMobile}">
        <div class="tool-hd" v-if="!isMobile">
            <div class="tcolor fw">{{$t('m.grsz')}}</div>
            <span class="f12 gcolor">{{$t('m.fixpass')}}</span>
        </div>
        <div :class="`cp tool-lists ${isMobile ? 'm16' : 'm20'}`">
            <div class="flex vc" @click="$router.push('resetpass')" :class="{block: !isMobile}">
                <span><img src="../../assets/images/pac.png" alt=""></span>

                <div class="tcolor flex1 fw tool-list-text" :class="{center: !isMobile}">
                    {{$t('m.fixpass')}}
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


