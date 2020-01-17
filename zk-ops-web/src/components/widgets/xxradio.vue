<!--  -->
<template>
  <ul class="xx-radio">
    <li
      @click="raidoHandle(radio, index)"
      :class="{active: radio.active}"
      v-for="(radio, index) in radios"
      :key="index"
      class="cp nowrap"
    >{{radio.text}}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      radios: []
    };
  },
  props: ["texts", "value"],
  methods: {
    raidoHandle(radio, index) {
      this.radios.forEach((el, idx) => {
        el.active = index == idx;
      });
      this.$emit("input", radio.text);
    }
  },
  watch: {
    texts: {
      immediate: true,
      deep: true,
      handler: function() {
        this.radios = this.texts.map((el, index) => {
          return {
            text: el,
            active: this.value == el
          };
        });
      }
    }
  }
};
</script>
<style lang='scss'>
</style>