<template>
  <div class="jl-nav flex" :class="{'nav-fixed': isFixed}">
    <div class="jl-logo">
      <template v-if="['game','index','board'].includes($route.name) || !isMobile">
          <router-link to="/index" >
            <img src="../assets/images/tlogo.png" alt="">
            <span class="kt">
              {{$t('ms.joylotto')}}
            </span>
          </router-link>
          <span class="swth-lang-btn" @click="swthLang" v-if="$route.name == 'index'">{{{zh: '中文',en: 'English'}[lang]}}</span>
      </template>
      <div class="game-back-btn" v-else @click="back"></div>
    </div>
    <div class="jl-balance kt" ref="exedom" @click="showExchange" v-if="loginInfo.token">
      <span >{{$t('ms.jlt')}}:</span>
      <span>{{wallet | currency}}</span>
      <i class="jl-arrow"></i>
    </div>
    <div v-show="exchangeShow" ref="exdom" class="ex-wrap">
       <Exchange ></Exchange>
    </div>
  </div>
</template>
<script>
const routerConfig = {
  index: ['game'],
  game: ['mrecord', 'mrule', 'krecord', 'sgame'],
  mrecord: ['srecord'],
  sgame: ['trend','normal','mega','freq'],
  exchange: ['record']
};

const parallRouterConfig = ['trend','normal','mega','freq'];
const routerParamsConfig = ['game','mrule','sgame'];

import Exchange from './widget/exchange/index';
import {mapGetters, mapActions} from "vuex";
import util from 'util';
import Hub from 'hub';
export default {
  components: {
    Exchange
  },
  data() {
    return {
      exchangeShow: false,
      isFixed: false
    }
  },
  computed: {
    ...mapGetters(['isMobile', 'wallet', 'activeroom','loginInfo','lang'])
  },
  created() {
    console.log();
    !this.isMobile && Hub.$on('exchangeDone', () => {
      this.exchangeShow = !this.exchangeShow;
    })
  },
  mounted() {
    this.isMobile && window.addEventListener("scroll", this.scrollHandler, false);
  },
  beforeDestroy() {
    this.isMobile && window.removeEventListener("scroll", this.scrollHandler, false);
    this.showExchangeListener && 
    document.body.removeEventListener('click', this.showExchangeListener, false);
  },
  methods: {
    ...mapActions(['getWallet']),
    handleBackWidthRoomList(page) {
      let jump = {};
      let id = this.activeroom.id;
      if(routerParamsConfig.includes(page)) {
        if(id) {
          jump.params = { id };
          jump.name = page;
        }
        //roomlist 还没有回来的情况
        else {
          jump.name = 'index';
        }
      }
      else {
        jump.name = page;
      }
      this.$router.replace(jump);
    },
    back() {
      let cname = this.$route.name;
      let temp = [];
      //特殊处理 exchange页面
      if(cname == 'exchange') {
        let page = sessionStorage.getItem('exchangebeforepage');
        if(page) {
          sessionStorage.removeItem('exchangebeforepage');
          this.handleBackWidthRoomList(page);
        }
        else {
          window.history.length > 1 ? this.$router.back() : this.$router.replace({name: 'index'});
        }
        return;
      }
      for(let i in routerConfig) {
        if(routerConfig[i].includes(cname)) {
          this.handleBackWidthRoomList(i);
          break;
        }
        else {
          temp.push(false);
        }
      }
      if(temp.length == Object.keys(routerConfig).length) {
        window.history.length > 1 ? this.$router.back() : this.$router.replace({name: 'index'});
      }
    },
    swthLang() {
      this.$store.commit('givenLang', this.$i18n.locale = this.lang == 'en' ? "zh" : 'en');
    },
    showExchange() {
      if(this.isMobile) {
        if(this.$route.name == 'record' || this.$route.name == 'exchange') return;
        sessionStorage.setItem('exchangebeforepage', this.$route.name);
        this.$router.push({name: 'exchange'})
      }
      else {
        this.exchangeShow = !this.exchangeShow;
        !this.isMobile && this.setCloseListener();
      }
    },
    setCloseListener() {
      if(this.exchangeShow) {
        this.showExchangeListener = this.addCloseListener();
      }
      else {
        this.showExchangeListener && 
        document.body.removeEventListener('click', this.showExchangeListener, false);
      }
    },
    addCloseListener() {
      this.exdom = this.$refs.exdom;
      this.exedom = this.$refs.exedom;
      const handler = e => {
        let target = e.target;
        let clicksec = false;
        do {
          if(target == this.exdom) {
            clicksec = 'd';
            return false;
          }
          else if(target == this.exedom) {
            clicksec = 'm';
            return false
          }
        } while (target = target.parentElement);
        if(!clicksec) {
          //做 隐藏逻辑
          this.exchangeShow = false;
        }
        else if(clicksec == 'd'){
          //自己的框框
          //do nothing
        }
        else if(clicksec == 'm') {
          //自己的按钮
          //交给vue 处理
        }
      };
      document.body.addEventListener('click', handler, false);
      return handler;
    },
    // scrollHandler() {
    //   if (this.ticker) {
    //     clearTimeout(this.ticker);
    //   }
    //   this.ticker = setTimeout(() => {
    //     this.scrollHanlderDispather();
    //   }, 100);
    // },
    scrollHandler() {
      let stop = util.getScrollTop();
      this.isFixed = stop > 200;
      // Hub.$emit("navChange", this.isFixed);
    },
  },
  watch: {
    $route() {
      this.exchangeShow = false;
    },
    loginInfo: {
      deep: true,
      immediate: true,
      handler: function(n) {
        n.token && this.getWallet({ctx: this, noShowErr: true});
      }
    },
    '$i18n.locale': {
      immediate: true,
      handler: function(n) {
        document.documentElement.classList.remove('zh');
        document.documentElement.classList.remove('en');
        document.documentElement.classList.add(n);
      }
    }

  }
}
</script>

<style lang="scss">
  .jl-nav {
    transition: all .3s linear;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 16px 0;
    .jl-logo {
      img {
        width: 33px;
        vertical-align: middle;
      }
      span {
        padding-left: 10px;
        font-size: 0.3rem;
        vertical-align: middle;
      }
      .swth-lang-btn {
        font-size: 20px;
        cursor: pointer;
      }
    }
    
    .jl-balance {
      font-size: 0.2rem;
      cursor: pointer;
      .jl-arrow {
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-top-color: var(--textcolor);
        vertical-align: -4px;
      }
    }
    .ex-wrap {
      position: absolute;
      top: 70px;
      right:16px;
      z-index: 300;
      width: 217px;
      .ex {
        border-radius: 4px;
        padding: 10px;
        box-shadow: 0 0 6px #818180;
      }
      .ex-btns {
        button {
          padding: 10px 20px;
        }
      }
    }
  }

  .mobile {
    .jl-nav {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2000;
    }
    .nav-fixed {
        position: fixed;
        background-color: #fff;
        // border-bottom: 1px solid var(--mlinecolor);
        box-shadow: 0 2px 4px rgba(0,0,0,.1);
    }
  }
  

</style>


