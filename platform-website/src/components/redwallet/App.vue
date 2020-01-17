<template>
  <div class="hwrap">
        <Nav></Nav>
        <router-view class="hbd"></router-view>
       <span style="display:none">
          <audio src="./assets/coinshake.mp3" id="coinshake" preload="auto"  ></audio>
          <audio src="./assets/coinbg.mp3" id="coinbg" preload="auto" ref="coinbg" loop="loop"></audio>
       </span>
        <Loader />
  </div>
</template>

<script>
import './assets/style/app.scss';
import Nav from './components/nav';
import Loader from './components/widget/loader';
import {mapGetters, mapActions} from 'vuex';
export default {
  components: {
    Nav,
    Loader
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapGetters(['latestrecord']),
  },
  mounted() {
    this.coinbg = this.$refs.coinbg;
    this.setRem();
    if(localStorage.getItem('redwalletmusic') == 1) {
      this.coinbg.oncanplay = function() {
        try {
          this.play().catch(err => {
            console.log('需要手动点击播放');
          })
        } catch (error) {
          console.log('需要手动点击播放');
        }
      }
    }
  },
  beforeDestroy() {
     this.cdticker && clearInterval(this.cdticker);
  },
  methods: {
    ...mapActions(['regi', 'getuserinfo', 'getlatestrecord','getissuedetail','getprizerecord','getviplevel','getbalance','getsaletime']),
    getIssue() {
      this.getlatestrecord(this).then(res => {
          // let id  = res.id;
          // if(!id)return;
          // id = id.replace('no.', '');
          // id = 'no.' + (id - 1);
          // this.urlparams = {id};
          // this.getissuedetail(this);
          // this.getprizerecord({id, ctx:this});
        });
    },
    createTicker() {
      this.cdticker && clearInterval(this.cdticker);
      this.cdticker = setInterval(() => {
          this.getuserinfo(this);
         this.getIssue();
      }, 1000 * 4);
      this.$store.commit('giventicker', this.cdticker);
    },
    initData() {
      this.regi(this).then(() => {
        this.getuserinfo(this);
        this.getIssue();
        this.getviplevel(this);
        this.getbalance(this);
        this.getsaletime(this);
      });
    },
    setRem() {
      const ww = window.innerWidth;
      const design = 750;
      if(ww < design) {
        document.documentElement.style.fontSize = Math.floor(ww/design * 100) + 'px';
      }
    }
  },
  watch: {
    latestrecord: {
        deep: true,
        handler: function(n) {
          this.createTicker();
        }
    }
  }
}
</script>
<style lang="scss">
.hwrap {
  color:#3C3C3C
}
.hbd {
  min-height: 100vh
}
.h-hcolor {
  color:#3C3C3C;
}
.h-redcolor {
  color:#690606
}
</style>



