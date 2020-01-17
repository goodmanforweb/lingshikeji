<template>
  <div class="kjbd" ref="bd" :style="`backgroundImage:url(${bk})`">
    <Nav :class="{'nav-fixed': isFixed}"></Nav>
    <Main ></Main>
  </div>
</template>
<script>
import "./assets/style/app.scss";
const commonbk = require("./assets/images/bk2.jpg");
// const kjindex = require('./assets/images/bk2.jpg');
// const mypoolbk = require('./assets/images/mypoolbk.png');
import apiconfig from 'apiconfig';
import './components/widget/dialog/config.js';
import Nav from "./components/Nav.vue";
import Main from "./components/Main.vue";
import Hub from "hub";
import util from "util";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "app",
  components: {
    Nav,
    Main
  },
  data() {
    return {
      isMobile: window.innerWidth > 700,
      height: "100%",
      cjtid: apiconfig.assetid,
      isFixed: false,
      bk: commonbk
    };
  },
  created() {
    this.ajust();
    this.getAsset({ ctx: this, asset: this.cjtid });
    this.getPool({ ctx: this });
    // this.setBk();
  },
  computed: {
    ...mapGetters(["login"])
  },
  mounted() {
    this.$refs.bd.addEventListener("scroll", this.scrollHandler, false);
    this.$refs.bd.scrollTop = 0;
  },
  beforeDestroy() {
    this.$refs.bd.removeEventListener("scroll", this.scrollHandler, false);
  },
  methods: {
    ...mapActions(["getPool", "getAsset"]),
    ajust() {
      this.height = this.$route.name == "Index" ? "auto" : "100%";
    },
    scrollHandler() {
      if (this.ticker) {
        clearTimeout(this.ticker);
      }
      this.ticker = setTimeout(() => {
        this.scrollHanlderDispather();
      }, 100);
    },
    scrollHanlderDispather() {
      let stop = util.getScrollTop(this.$refs.bd);
      this.isFixed = stop > 200;
    }
    // setBk() {
    //   if(this.$route.name == 'kc') {
    //     this.bk = mypoolbk;
    //   }
    //   else {
    //     this.bk = kjindex;
    //   }
    // }
  },
  watch: {
    $route: function() {
      this.ajust();
      this.isFixed = false;
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   this.$refs.bd.scrollTop = 0;
  //   next();
  // },
  beforeRouteUpdate (to, from, next) {
    this.$refs.bd.scrollTop = 0;
    next();
  }
};
</script>

<style lang="scss" scoped>
.kjbd {
  overflow: auto;
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  // min-height: 100vh;
  color: #fff;
  background-image: url(./assets/images/bk2.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
}
</style>