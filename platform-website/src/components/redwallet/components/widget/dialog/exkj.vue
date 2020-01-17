<template>
    <Layer @close="$emit('update:show');$emit('cancel')" v-if="show">
        <div class="exkj center">
            <h4 >兑换确认 </h4>
            <p>
                是否以 {{data.price}} 兑换 {{data.machine}}？
                兑换后可至“超级算力”查看矿机。
            </p>
            <el-button @click="confirm" :loading="loader">
                确认
            </el-button>
        </div>
    </Layer>
</template>
<script>
import Layer from './layer';
export default {
    props: ['show', 'data'],
    components: {
        Layer
    },
    data() {
        return {
            loader: false
        }
    },
    methods: {
        confirm() {
            this.$emit('confirm', this);
        }
    }
}
</script>

<style lang="scss">
.exkj {
    button {
        background-color: #C6AC8C;
        color:#fff;
        width: 100%;
        margin: 20px 0;
    }
}
</style>
