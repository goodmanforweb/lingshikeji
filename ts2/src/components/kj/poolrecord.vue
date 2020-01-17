<template>
    <Page :title="$t('m.wkjl')" borderLine padding routerBack='/kj'>
        <div class="poolrecord flex1" :class="{block: isMobile}">
            <div class="tcolor" v-if="!isMobile">{{$t('m.wkjl')}}</div>
            <div :class="`${isMobile ? 'f14 tcolor borderLine' : 'f12 gcolor'}`">Nohksjhfkjsahfkjhsakj</div>
            <div class="rp-cont f14" >
                <div class="rp-row flex sb gcolor">
                    <span>{{$t('m.time')}}</span>
                    <span>{{$t('m.wkje')}}</span>
                </div>
                <div class="rp-row flex sb tcolor">
                    <span>2018.11.11 11:11:11</span>
                    <span>100CJOY</span>
                </div>
                <div class="rp-row flex sb tcolor">
                    <span>2018.11.11 11:11:11</span>
                    <span>100CJOY</span>
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
.mobile {
    .poolrecord {
        .borderLine {
            padding-bottom: 10px;
        }
    }
}
.pc {
    .poolrecord {
        width: 370px;
    }
}
    .rp-cont {
        margin-top: 30px;
        line-height: 20px;
    }
</style>