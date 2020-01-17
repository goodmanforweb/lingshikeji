<template>
        <Layer @close="$emit('update:show');$emit('cancel')" v-if="show">
            <div class="tosee center">
                <h4 >敬请期待 </h4>
                <p>
                    礼金商城正在给您准备新春贺礼，等待是为了更好的礼遇，Cryptojoy祝您诸事顺利！
                </p>
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
