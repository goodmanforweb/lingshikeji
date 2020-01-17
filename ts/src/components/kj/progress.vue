<template>
    <div class="progress-wrap">
        <canvas ref="progress"></canvas>
    </div>
</template>
<script>
import progress from './kj-progress';
export default {
    mounted() {
        this.showProgress();
    },
    methods: {
        showProgress() {
            let p = new progress(this.$refs.progress, '99%');
        }
    }
}
</script>
<style lang="scss">
.progress-wrap {
    height: 120px;
    // width: 180px;
    margin: 0 auto;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>

