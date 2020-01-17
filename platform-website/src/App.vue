<template>
  <div class="bd" :class="{pc: isMobile}" :style="{height}">
    <template v-if="!['card','apple', 'andriod', 'cjtcheck'].includes($route.name)">
      <Nav v-if="navShow"></nav>
      <Main></Main>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
import "./assets/style/app.scss";
import Nav from "./components/Nav.vue";
import Main from "./components/Main.vue";
// import ExchengePanel from "./components/ExchengePanel.vue";
import util from "./util/util";
import Hub from 'hub';
export default {
  name: "app",
  components: {
    Nav,
    Main
    // ExchengePanel
  },
  data() {
    return {
      isMobile: window.innerWidth > 700,
      height: "100%",
      navShow: true
    };
  },
  created() {
    this.calcNavShow();
    this.ajust();
    this.addPosterListener();
  },
  mounted() {
    
  },
  methods: {
    addPosterListener() {
      Hub.$on("posternonav", data => {
        if(data) {
          this.navShow = false;
        }
      });
    },
    calcNavShow() {
      let t = false;
      if (!this.isMobile) {
        t = true;
      } else if (this.isMobile) {
        if (this.$route.path.indexOf("dashboard") > -1) {
          t = false;
        } else {
          t = true;
        }
      }

      if (
        ["pay", "oauth"].includes(this.$route.name) ||
        this.$route.path.indexOf("kj") > -1
      ) {
        t = false;
      }

      this.navShow = t;
    },
    ajust() {
      this.height = this.$route.name == "index" ? "auto" : "100%";
    }
  },
  watch: {
    $route: function() {
      this.ajust();
      this.calcNavShow();
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}

body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration: none;
  color: inherit;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.bd {
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
}
.flex {
  display: flex;
}
i {
  font-style: normal;
}
dd {
  margin: 0;
}

@media screen and (max-width: 700px) {
  .bd,
  body {
    height: auto;
  }
}
</style>