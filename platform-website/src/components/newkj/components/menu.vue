<template>
        <div class="kj-menu"  @mouseleave="show(false)">
          <div class="km-wrap">
            <div class="km-main-btn"  @mouseenter="!isMobile && show(true)"  @click="show('click')" v-if="isShowMenu"></div>
            <ul class="km-list-btn flex" v-if="active" :class="{active: isShowMenu}">
              <li @click="txHandler" >
                <div class="km-bm">
                  <span class="kb-icon lb scale" :class="{'clb': !audio.tx}" ></span>
                </div>
                </li>
                <li @click="bgHandler">
                <div class="km-bm">
                  <span class="kb-icon music scale" :class="{'cbg': !audio.bg}"></span>
                </div>
                </li>
                <li>
                <div class="km-bm" @click="$router.push({name:'kjjz'})">
                  <span class="kb-icon ask scale"></span>
                </div>
                </li>
                <li >
                  <a href="#/index" target="_blank">
                    <div class="km-bm">
                      <span class="kb-icon lmon scale"></span>
                    </div>
                  </a>

              </li>
            </ul>
          </div>
        </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      active: window.innerWidth > 1500,
      isShowMenu: window.innerWidth < 1500
    }
  },
  created() {
    
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandler, false);
    this.initAudio();
  },
  computed: {
        ...mapGetters(['audio', 'isMobile'])
    },
   beforeDestroy() {
     window.removeEventListener('resize', this.resizeHandler, false);
   },
  methods: {
    initAudio() {
      let {tx, bg} = this.audio;
  

      this.tx = document.querySelector('#tx');
      this.bg = document.querySelector('#bg');
      this.bg.oncanplay = function() {
        setTimeout(() => {
          bg ? this.play() : this.pause();
        },0)
      }
      
      // !tx ? this.tx.pause() : this.tx.play();
      
    },
    resizeHandler() {
      this.debouce && clearTimeout(this.debouce);
      setTimeout(() => {
        this.active = window.innerWidth > 1500,
        this.isShowMenu = !this.active;
      }, 100);
    },
    show(state) {
      if(state == 'click') {
        this.active = !this.active;
      }
      else {
        if(this.isShowMenu) {
          this.active = !!state;
        }
      }
      
    },
    bgHandler() {
      const bg = this.bg;
      this.audio.bg ? bg.pause() : bg.play();
      this.$store.commit('givenAudio', {bg: !this.audio.bg});
    },
    txHandler() {
      const bg = this.tx;
      if(!this.audio.tx) {
        bg.play();
      }
      this.$store.commit('givenAudio', {tx: !this.audio.tx});
    },

  },

}
</script>
<style lang="scss">
  .kj-menu {
    audio {
      display: none
    }

    span.clb {
         background-image: url(../assets/images/clb.png);
         background-size: 55% auto;
    }
     span.cbg {
         background-image: url(../assets/images/cbg.png);
         background-size: 55% auto;
    }
  }

</style>

