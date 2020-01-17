<!--  -->
<template>
<div class="note-slider" v-if="lists.length > 0 && this.show" >
    <div class="note-box flex">
        <span class="note-laba f14">
            <img src="../../assets/images/laba.png" alt="">
            {{$t("m.newreport")}}:
        </span>
        <div class="note-text-box marquee">
            <div class="bar">
                <router-link 
                v-for="(report, key) in lists" 
                :key="key" 
                :to="{path ,query:{id: report.id}}">
                {{report.title}}
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
        show: false,
        path: '/report',
        lists:[]
    };
  },
  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    }
  },
  created() {
    this.path = this.isMobile ? '/detail' : '/report'
  },
  mounted() {
      this.getReports();
  },
  methods: {
      calcDays(date) {
          const now  = new Date().getTime()
          return now - new Date(date).getTime() <= 3 * 24 * 60 * 60 * 1000
      },
      getReports() {
          request.getReportLists(
          {
            params: {
              pagesize: 20,
              offset: 0,
              key: this.$i18n.locale,
              order: 'create_time',
              desc: true
            }
          }
        )
      .then(res => {
        if(Array.isArray(res.data.list)) {
            // this.lists = res.data.list;
            this.lists = res.data.list.filter(el => this.calcDays(el.createtime));
            this.$emit('hasnote', this.lists.length > 0);

         }
      })
      }
  },
  watch: {
      $route:{
          immediate: true,
          handler:function(n) {
              this.show = n.name == 'index';
          }
      }
  }
}

</script>
<style lang='scss'>
.note-laba {
    img {
        width: 15px;
    }
}
.mobile {
    .note-slider {
         height: 37px;
        line-height: 37px;
        padding-left: 50px;
    }
}
.note-slider {
    font-size: 14px;
    position: absolute;
    left:0;
    right: 0;
    top:0;
    width: 100%;
    z-index: 90;
    height: 30px;
    box-sizing: border-box;
    line-height: 30px;
    padding-left: 70px;
    color:#fff;
    background: linear-gradient(to bottom, rgba(106, 112, 115, 0.363) 6%, transparent);
  .note-box {
    margin: 0 auto;
    padding: 0 16px;
  }
  .note-text-box {
    overflow: hidden;
    flex: 1;
    font-weight: bolder;
    .bar {
      display: inline-block;
      padding-left: 100%;
      white-space: nowrap;
    }
    a {
      padding: 0 2rem;
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
.marquee .bar {
  animation: marquee 15s linear infinite;
}

.marquee .bar:hover {
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translate(0);
  }

  to {
    transform: translate(-100%);
  }
}
</style>