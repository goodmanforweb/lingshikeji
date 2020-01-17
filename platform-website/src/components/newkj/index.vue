<template>
  <div class="kjwrap" :class="{shrink, pc: !isMobile, mobile: isMobile, bk:shrink}">
   <Loader />
   <Nav v-if="$route.name != 'kjindex'"></Nav>
   <router-view :style="$route.name != 'kjindex' && isMobile &&'paddingTop:100px;'"></router-view>
   <Menu v-if="$route.name != 'kjindex'" class="menushow"/>
   <span style="display:none">
          <audio src="./assets/horse.wav" preload="auto" id="tx" ref="horse"></audio>
          <audio src="./assets/card.mp3" preload="auto"  loop="true" id="bg"></audio>
          <audio src="./assets/coin.mp3" preload="auto"  id="coin"></audio>
          <audio src="./assets/water.wav" preload="auto"  id="water"></audio>
   </span>
  </div>
</template>
<script>
import './assets/style/mapp.scss';
import './assets/style/app.scss';
import Nav from './components/Nav.vue';
import {mapActions, mapGetters} from 'vuex';
import Menu from './components/menu';
import Loader from './components/widgets/loader';
// import dialogConfigRun from './components/widgets/dialog/config.js';
export default {
  components: {
    Nav,
    Menu,
    Loader
  },
  data() {
    return {
      shrink: window.innerWidth < 1100
    }
  },
  created() {
    //动态添加body 样式，不能写死
    document.body.classList.add('body');
    !this.isMobile && document.body.classList.add('kjbk');
    document.documentElement.classList.add('html');

    this.getAsset({ ctx: this, asset: this.cjtid });
    this.getPool({ ctx: this });
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandler, false);
    this.resizeHandler();
    document.body.addEventListener('click', this.clickAudioHandle, false);
  },
  computed: {
    ...mapGetters(['isMobile', 'login','cjtid', 'audio'])
  },
  beforeDestroy() {
    //一定要清除样式， 并且把html fontsize 置于默认
    document.documentElement.style.fontSize = '16px';
    document.documentElement.classList.remove('html');
    document.body.classList.remove('body');
    !this.isMobile && document.body.classList.remove('kjbk');
     window.removeEventListener('resize', this.resizeHandler, false);
     document.body.removeEventListener('click', this.clickAudioHandle, false);
  },
  methods: {
    ...mapActions(["getPool", "getAsset"]),
    resizeHandler() {
      this.setRem();
      this.mobileSetter();
      // this.setShrink();
    },
    clickAudioHandle(e) {
      let target = e.target, isAudio = false;
      do {
          if(target.className.indexOf('audiobtn') > -1) {
              isAudio = true;
              break;
          }
      } while (target = target.parentElement);

      if(isAudio) {
        if(this.audio.tx) {
          this.$refs.horse.play();
        }
      }
    },
    setRem() {
      const designWidth = 700;
      const ww = window.innerWidth;
      let html = document.documentElement;
      let rem = 100;
      if(ww >= 1100) {
        //do nothing
        rem = 100;
      }
      else if(ww < 1100 && ww > designWidth) {
        rem = Math.floor(ww*100/1100);
      }
      else if(ww <= designWidth) {
        rem = Math.floor(ww*100/designWidth);
      }

      html.style.fontSize = rem + 'px';
    },
    mobileSetter() {
      this.debounce && clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$store.commit('givenIsMobile', window.innerWidth <= 700);
      }, 200);
    },
    setShrink() {
      this.debounce2 && clearTimeout(this.debounce2);
      this.debounce2 = setTimeout(() => {
        const ww = window.innerWidth;
        this.shrink  = ww <= 1100 && ww > 700;
        if(ww <= 700 || ww >= 1100) {
          this.$el.style.transform = 'scale(1)';
          return;
        }
        // const base = ww <= 1100 && ww > 750 ? 1100 : (ww <= 750 && ww >= 320 && 750);
        const base = 1100;
        const ratio = ww/base;
        // this.$el.style.transform = `scale(${ratio})`;
      }, 200);
    }
  }
}
</script>
<style lang="scss" scoped>
.menushow {
  position: fixed;
  left:0;
  z-index: 99;
  bottom: 1rem;
}
  .kjwrap {
    margin: 0 auto;
  }
  .kjwrap.pc {
    .nav {
      max-width: 1100px;
       margin: 0 auto;
    }
  }


</style>

