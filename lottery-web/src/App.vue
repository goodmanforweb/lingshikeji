<template>
  <div class="wrap" ref="wrap" :class="{pc: !isMobile, mobile: isMobile, shrink}">
    <template v-if="['trecord'].includes($route.name)">
      <router-view></router-view>
    </template>
    <template v-else>
        <Nav></Nav>
        <Main> </Main>
    </template>
  </div>
</template>

<script>
import './assets/style/app.scss';
import './assets/style/mapp.scss';
import Nav from './components/Nav';
import Main from './components/Main';
import minx from './components/mixins/index';
import {mapGetters, mapActions} from 'vuex';
// const commonbk = require('./assets/images/bk.jpg');
// const mobilesociety = require('./assets/images/msbk.jpg');
// const bigbuildbk = require('./assets/images/bigbuildbk.jpg');
export default {
  data() {
    return {
      shrink: false
    }
  },
  components: {
    Nav,
    Main
  },
  created() {
    this.getRoomList({ctx: this, isCommitActiveRoom: true});
  },
  mounted() {
     window.addEventListener('resize', this.resizeHanlder, false);
     window.addEventListener('resize', this.mobileSetter, false);
     this.setShrinkClassName();
     this.setRem();
     this.setPCShrink();
  },
  mixins: [minx],
  computed: {
    ...mapGetters(['isMobile', 'roomList'])
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHanlder, false);
    window.removeEventListener('resize', this.mobileSetter, false);
  },
  methods: {
    ...mapActions(['getRoomList']),
    mobileSetter() {
      this.debounce && clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$store.commit('givenIsMobile', window.innerWidth <= 700);
      }, 200);
    },
    setPCShrink() {
      this.$nextTick(() => {
        !this.isMobile && this.$refs.wrap && this.setShrink(this.$refs.wrap);
      })
    },
    resizeHanlder() {
      this.setShrinkClassName();
      this.$nextTick(() => {
        !this.isMobile && this.$refs.wrap && this.setShrink(this.$refs.wrap);
      });
      this.setRem();
    },
    setRem() {
      const designWidth = 700;
      const ww = window.innerWidth;
      let html = document.documentElement;
      let rem = 100;
      if(ww >= designWidth) {
        //do nothing
        rem = 100;
      }
      else if(ww < designWidth) {
        rem = Math.floor(ww*100/designWidth);
      }

      html.style.fontSize = rem + 'px';
    },
    setBk() {
      //移动端 我的社区  游戏首页  有背景
      let bk;
      if(this.isMobile) {
        if(['index','society'].includes(this.$route.name)){
          bk = 'bigbuildbk'
        }
        else {
          bk = '';
        }
      }
      else {
        if(['index','society'].includes(this.$route.name)) {
          bk = 'bigbuildbk'
        }

        else {
          bk = 'commonbk';
        }
      }
      let body = document.body;
      if(bk) {
        if(!body.classList.length) {
          body.classList.remove('bigbuildbk');
          body.classList.remove('commonbk');
        }
        body.classList.add(bk);
      }
      else {
        body.classList.remove('bigbuildbk');
        body.classList.remove('commonbk');
      }

    },
    setShrinkClassName() {
      const ww = window.innerWidth
      if(ww >= 1100) {
        this.shrink = false;
      } 
      else if(ww < 1100 && ww > 700) {
        this.shrink = true
      }
    }
  },
  watch: {
    $route: {
      immediate:true,
      handler:function() {
        this.setBk();
        this.setPCShrink();
        setTimeout(() => {
          window.scrollTo(0,0);
        }, 100)
      }
    }
  }
}
</script>

<style lang="scss">
html {
  -webkit-tap-highlight-color:transparent;
  tap-highlight-color:transparent;
}
body {
  font-size: 16px;
  overflow-y: scroll;
  // position: relative;
}
.bigbuildbk {
  background: url(./assets/images/bigbuildbk.jpg) no-repeat center;
  background-size: cover;
}
.commonbk {
  background: url(./assets/images/bk.jpg) no-repeat center;
  background-size: cover;
}
.wrap {
  
  max-width: 1100px;
  margin: 0 auto;
  box-sizing: border-box
}
.mobile {
  
}
.wrap.pc {
  padding: 0 0 16px;
  width: 1100px;
}
.wrap.mobile {
  min-height: 100vh;
  // overflow-y: auto;
}
.wrap.shrink {
  // position: absolute;
  // top:0;
  // left:0;
  // right: 0;
  // float:left;
  transform-origin: left top;
}
</style>


