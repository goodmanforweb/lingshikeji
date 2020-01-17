<!--  -->
<template>
 <div class="rw-pic-ft">
    <div class="rw-index-cube flex vc">
        <div class="rw-logo">
            <img v-if="iconsrc" :src="iconsrc" alt="">
            <img v-else src="../../../assets/images/plogo.png" alt="">
        </div>
        <div class="rwic-info">
            <div class="f20 fw link-logo">{{name}}</div>
            <a class='f12 cp link-btn nowrap' target="_blank" :href="link">
                <img src="../../../assets/images/link.png" alt="">
                {{$t('m.gwang')}}
            </a>
        </div>
    </div>
</div>
</template>
<script>
export default {
    // props:['iconsrc','name','link']
    props: {
        link:{
            type: String,
            default:'https://china.cjoy.games:4430/#/index'
        },
        name: {
            type: String,
            default: 'CryptoJOY'
        },
        iconsrc: {
            type: String,
            default: require('../../../assets/images/plogo.png')
        },
    }
}
</script>
