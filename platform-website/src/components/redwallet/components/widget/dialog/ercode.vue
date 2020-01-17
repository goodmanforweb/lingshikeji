<template>

    <Layer @close="$emit('update:show');$emit('cancel')" v-if="show">
        <div class="useup center">
            <h4 >升级VIP权益 </h4>
            <p>扫描二维码进群了解VIP详情，VIP升级开放时间为春节期间，具体升级政策以及时间请关注相关公告。</p>
            <div style="margin-bottom: 20px">
                <img style="width: 80%" src="../../../assets/images/ercode.png" alt="">
            </div>
        </div>
    </Layer>
</template>
<script>
import Layer from './layer';
export default {
    props: ['show'],
    components: {
        Layer
    }
}
</script>