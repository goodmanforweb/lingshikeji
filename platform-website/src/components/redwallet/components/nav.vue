<template>
  <div class="h-nav center" :class="{navstyle}" v-if="show">
    <div class="h-back" @click="back"></div>
    <span v-if="navstyle">{{navtext}}</span>
  </div>
</template>
<script>
import util from '../util/util';
const showNavConfig = [['detail', '兑换详情', 1], ['gl','攻略说明', 1], ['award','获奖榜单', 1], ['lj', '礼金商城', 0]];
const showBackConfig = ['vip', 'fc', 'yd', 'yq'];

const routerConfig = {
  index: ['vip', 'wish', 'gl', 'dash', 'yd', 'fc', 'yq','lj'],
  lj:['detail'],
  reward: ['award']
};


export default {
  data() {
    return {
      navstyle: true,
      navtext: '',
      show: false
    }
  },
  methods: {
    back() {
      if(this.$route.path.indexOf('dash') > -1) {
        const dashbefore = sessionStorage.getItem('dashbefore');
        sessionStorage.removeItem('dashbefore');
        this.$router.push({path: util.isEmpty(dashbefore) ? '/index' : dashbefore});
      }
      else if(this.$route.path.indexOf('vip') > -1 || this.$route.path.indexOf('gl') > -1) {
        this.$router.push({path: '/index'});
      }
      else if(this.$route.path.indexOf('award') > -1) {
        const awardbefore = sessionStorage.getItem('awardbefore');
        sessionStorage.removeItem('awardbefore');
        this.$router.push({path: util.isEmpty(awardbefore) ? '/index' : awardbefore});
      }
      else {
        window.history.length > 1 ? this.$router.back() : this.$router.push({name: 'index'});
      }
    },
    handleNavStyle() {
      let index = 0;
      if((index = showNavConfig.map(el => el[0]).indexOf(this.$route.name)) > -1) {
        let navtext = showNavConfig[index][1];
        if(navtext == '获奖榜单') {
          navtext = this.$route.params.id + " " + navtext
        }
        this.navtext = navtext;
        this.navstyle = !!showNavConfig[index][2];
        this.show = true;
      }
      else if(showBackConfig.includes(this.$route.name)) {
        this.navstyle = false;
        this.show = true;
      }
      else {
        this.show = false;
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function() {
        this.handleNavStyle();
      }
    }
  }
}
</script>
<style lang="scss">
.h-nav {
  text-transform: capitalize;
  height: 50px;
  line-height: 50px;
  color:#fff;
  position: relative;
  z-index: 90;
  padding: 0 16px;
  .h-back {
    width: 40px;
    height: 100%;
    background: url(../assets/images/icon.png) no-repeat 0 -176px/45%;
    position: absolute;
    top:0;
    bottom: 0;
    left: 16px;
  }
}
.navstyle {
  background-color: #750B00
}
.vip,.dash-wrap, .lj {
  margin-top: -50px
}
</style>

