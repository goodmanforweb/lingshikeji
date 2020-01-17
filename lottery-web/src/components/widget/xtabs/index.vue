<template>
  <div class="xtab-wrap" v-loading="tabLoader">
    <div class="xtab-hd flex" >
      <span class="xtab-prev xtab-arrow" v-show="arrowShow" @click="tabScroll('right')"></span>
      <div class="xtabs flex1" ref="xtab">
         <div class="xtab-scroller"  ref="scoller">
           <router-link :class="{active: el.id == $route.params.id}" :to="{path:`/board/${el.id}/game`}" v-for="(el, index) in roomList" :key="index">
            <i class="fly-icon"></i>
            <span>{{el.name}}</span>
          </router-link>
         </div>
      </div>
      <span class="xtab-next xtab-arrow" v-show="arrowShow" @click="tabScroll('left')"></span>
    </div>
    <div class="xtab-bd">
      <router-view class="cl-router-container"></router-view>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import util from 'util';
export default {
  name: 'Xtabs',
  data() {
    return {
      list: [],
      tabLoader: false,
      arrowShow: false
    }
  },
  computed: {
    ...mapGetters(['isMobile', 'roomList', 'issueList'])
  },
  created() {
  },
  mounted() {
    this.xtabDom = this.$refs.xtab;
    this.arrowShow = this.xtabDom.clientWidth < this.roomList.length * 170;
    this.setShowTabArrow();
  },
  methods: {
    tabScroll(type) {
      switch(type) {
        case "left":
          this.xtabDom.scrollTo(this.xtabDom.scrollLeft + 170 ,0);
        break;
        case "right":
          this.xtabDom.scrollTo(this.xtabDom.scrollLeft - 170 ,0);
        break;
        default:
      }
    },
    setShowTabArrow() {
      if(this.xtabDom && this.$refs.scoller) {
        this.arrowShow = this.xtabDom.clientWidth < this.$refs.scoller.clientWidth
      }
    }
  },
  watch: {
    roomList: {
      deep: true,
      immediate: true,
      handler: function(n) {
        if(!util.isEmpty(n)) {
          this.$nextTick(() => {
            this.setShowTabArrow();
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
.pc {
  .cl-router-container {
    height: 100%;
  }
  .xtab-hd {
    background-color: var(--textcolor);
  }
  .xtab-bd {
    max-height: 800px;
  }
  .xtab-prev:after {
    border-right-color: #fff;
  }
  .xtab-next:after {
    border-left-color: #fff;
  }
  .xtab-prev:hover:after {
    border-right-color:rgba(255, 255,255,.6)
  }  
  .xtab-next:hover:after {
    border-left-color:rgba(255, 255,255,.6)
  }
  .xtabs {
    i.fly-icon {
      vertical-align: -4px;
      background-image: url(../../../assets/images/flyicona.png);
      transition: transform .3s ease-in;
    }
  }
}
  .xtab-arrow {
    width: 30px;
    height: 100%;
    position: relative;
    cursor: pointer;
    text-align: center;
  }
  .xtab-arrow:after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width:0;
    height: 0;
    border:10px solid transparent;
  }
  
  .xtab-hd {
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
  }
  .xtabs {
    color:#fff;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    a {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding-left:10px;
      padding-right: 10px;
      position: relative;
      cursor: pointer;
      transition: all .3s linear;
      will-change: transform;
      position: relative;
      font-size: 12px;
      opacity: 0.47;
      white-space: nowrap;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        vertical-align: middle
      }

    }
    a:first-child.active {
      padding-left: 20px;
    }
    a.active {
      opacity: 1;
      transform: scale(1.2)
    }
    a:hover {
      opacity: 1;
    }
    .fly-icon {
        vertical-align: middle;
        width: 16px;
        height: 20px;
        display: inline-block;
        background: url(../../../assets/images/flyicon.png) no-repeat center;
        background-size: contain;
      }
    
  }
  .xtab-scroller {
    white-space: nowrap;
    display: inline-block;
    height: 100%;
  }
.mobile {
  .xtab-hd {
    overflow-x: auto;
  }
}
</style>

