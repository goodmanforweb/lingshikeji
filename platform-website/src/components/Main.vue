<template>
  <div id="main" :style="{height}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      height: "calc(100% - 4rem)"
    };
  },
  created() {
    this.ajust();
  },
  methods: {
    ajust() {
      let t = "auto";
      if (this.$route.name == "index") {
        t = "auto";
      } else if (this.$route.path.indexOf("dashboard") == -1) {
        if (this.$route.path.indexOf("kj") > -1) {
          t = "100%";
        } 
        else if(['pay', 'oauth'].includes(this.$route.name)) {
          t = '100%';
        }
        else {
          t = "calc(100% - 4rem)";
        }
      } else if (this.$route.path.indexOf("dashboard") > -1) {
        t = "100%";
      }
      this.height = t;
    }
  },
  watch: {
    $route: function() {
      this.ajust();
    }
  }
};
</script>
<style>
#main {
  height: calc(100% - 4rem);
  box-sizing: border-box;
  margin: 0 auto;
}
@media screen and (max-width: 700px) {
  #main {
    height: auto !important;
  }
}
</style>
