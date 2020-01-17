<template>
  <div class="xtab-wrap">
    <div class="xtab-hd flex" @click="swithTab" >
      <div class="xtab" ref="tabs" v-for="(name, index) in tabnames" :key="index" :dataid="index">{{name}}</div>
      <i class="active-bar" ref="activeBar"></i>
    </div>
    <div class="xtab-bd">
     <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Xtabs',
  props: {
    tabnames: {
      type: Array,
      default: []
    },
    defaultKey: {
      type: Number,
      default:0
    }
  },
  data() {
    return {}
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.setTab(this.$refs.tabs[this.defaultKey], this.defaultKey);
    });
  },
  methods: {
    swithTab($event) {
      let target = $event.target;
      let id = target.getAttribute('dataid');
      if(id) {
        this.setTab(target, id);
        this.$emit('change', id);
      }
      
    },
    setTab(target, id) {
      this.$refs.activeBar.style.width =  target.clientWidth + 'px';
      let left = `translateX(${target.offsetLeft}px)`;
      let style = this.$refs.activeBar.style;
      style.transform = left;
      style.msTransform = left;
      style.webkitTransform = left;

      this.$refs.tabs.forEach((tab, index) => {
        index == id ? !tab.classList.contains('active') && tab.classList.add('active') : tab.classList.remove('active')
      });
    }
  },
  watch: {
    defaultKey: function(e) {
      this.setTab(this.$refs.tabs[e], e);
    }
  }
}
</script>
<style lang="scss">
  .xtab-wrap {
    .xtab-hd {
      position: relative;
      border-top: 1px solid #E6E6E6;
      border-bottom: 1px solid #E6E6E6;
      line-height: 40px;
      justify-content: space-around;
      height: 40px;
      .xtab {
        // padding: 0 20px;
        cursor: pointer;
        display: inline-block;
        list-style: none;
        text-transform: capitalize;
      }
      .xtab:hover {
        color: #3087F3
      }
      .xtab.active {
        color: #3087F3
      }
      .active-bar {
        position: absolute;
        bottom:0;
        left:0;
        height: 2px;
        background-color: #3087F3;
        transition: transform .3s cubic-bezier(.645,.045,.355,1)
      }
    }
    .xtab-bd {
      position: relative;
      // overflow: hidden;
    }
  }
</style>

