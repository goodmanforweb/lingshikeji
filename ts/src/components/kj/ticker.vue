<template>
    <div class="ticker-wrap" >
        <canvas ref="ticker" class="ticker"></canvas>
    </div>
</template>
<script>
import Ticker from './ticker.js';
export default {
    mounted() {
        this.showTicker();
    },
    methods: {
        showTicker() {
            this.date = {
                days: 0,
                hours: 11,
                min: 20,
                sec: 30,
                tdays:20,
                thours: 12,
                tmin: 60,
                tsec: 60
            }
            let t = new Ticker(this.$refs.ticker, this.date);
            // setInterval(() => {
            //     this.date.sec += 1;
            //     this.date.sec_rate = this.date.sec/60;
            //     t.render(this.date);
            // }, 1000)
        }
    }
}
</script>
<style lang="scss">
.ticker-wrap {
    height: 80px;
    margin-top: 10px;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>

