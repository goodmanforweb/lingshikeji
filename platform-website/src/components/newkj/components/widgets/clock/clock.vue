<template>
    <canvas ref="clock" width="300" height="300"></canvas>
</template>

<script>
import clock from "./clock.js";
export default {
  props: ["time", "activeTime"],
  created() {},
  mounted() {
    let padding = 10;
    this.$nextTick(() => {
       this.clockInstance = new clock(
        this.$refs.clock,
        this.time,
        this.activeTime,
        padding
      );
      this.clockInstance.render();
    })
  },
  watch: {
    time() {
      this.clockInstance &&
        this.clockInstance.rerender(this.time, this.activeTime);
    }
  }
};
</script>

