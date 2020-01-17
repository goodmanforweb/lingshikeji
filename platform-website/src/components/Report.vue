<template>
  <div class="publicreport flex"  v-loading="reportloader">
    <ul 
    class="re-left" 
    @click="choose" 
    v-if="isMobile"
    v-loading="reportFetchLoader"
    v-fetchmore="fetchmore"
    ref="reportscroller"
    >
      <li :class="{active: tit.active}" :index="index" v-for="(tit, index) in info" :key="index">{{tit.title}}</li>
    </ul>
    <div class="re-cont">
      <div class="card" index="0" v-for="(cont, idx) in conts" :key="idx">
        <div class="card-hd">
          <h2 v-html="cont.title"></h2>
          <div class="card-hd-info">
            <img src="../assets/images/lemonlogo.png" alt="">
            <p >{{$t("ms.logo")}}</p>
            <p>{{cont.createtime | format}}</p>
          </div>
        </div>
        <div class="card-bd" ref="cardbd"  v-html="cont.content" :style="`height: ${!isMobile && cont.collapse ? '20' : 'auto'}px`"></div>
        <div class="card-collapse center" v-if="!isMobile" @click="collapse(idx)"> 
          {{!cont.collapse ? $t('ms.sq') : $t("ms.zk")}}
          <i :class="`el-icon-arrow-${!cont.collapse ? 'up' : 'down'}`"></i> 
          </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import util from "../util/util";
export default {
  data() {
    return {
      info: [],
      conts: [],
      isMobile: window.innerWidth > 700,
      reportloader: false,
      reportFetchLoader: false
    };
  },
  created() {
    this.pager = 0;
    this.count = null;
    this.size = 30;
    this.id = this.$route.query.id;
  },
  mounted() {
    this.bd = document.querySelector(".bd");
    this.isMobile && this.setFetchSize();
    !this.isMobile && window.addEventListener('scroll', this.scrollHander, false);
    this.fetchmore();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHander, false);
  },
  methods: {
    choose(e) {
      let target = e.target;
      if (target.tagName != "LI") return;
      let index = target.getAttribute("index");
      this.info.forEach((art, idx) => {
        if (idx == index) {
          art.active = true;
          this.conts = [art];
        } else {
          art.active = false;
        }
      });
    },
    collapse(idx) {
      this.conts[idx].collapse = !this.conts[idx].collapse;

      if (!this.conts[idx].collapse) {
        this.$refs.cardbd[idx].style.height = "auto";
        this.$refs.cardbd[idx].style.height =
          this.$refs.cardbd[idx].clientHeight + "px";
      } else {
        this.$refs.cardbd[idx].style.height = "20px";
      }
    },
    setFetchSize() {
      this.size = Math.ceil(this.$refs.reportscroller.clientHeight/60);
    },
    scrollHander(e) {
      let stop = util.getScrollTop();
      let wh = window.innerHeight;
      if(this.bd.clientHeight - (stop + wh) <= 1) {
        this.fetchmore();
      }
    },
    fetchmore() {
      if(this.reportFetchLoader) return ;
      if(this.count) {
        if(this.pager*this.size >= this.count) {
          return false;
        }
      }
      this.pager++;
      this.getReports();
    },
    getReports() {
      this.reportFetchLoader = true;
      util
        .getReports(
          {
            params: {
              size: this.size,
              offset: (this.pager - 1)*this.size,
              lang: this.$i18n.locale,
              orderby: 'create_time',
              order:'desc'
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.status == 200) {
            let result = Array.isArray(res.data.list) && res.data.list.map((el, index) => {
                return {
                  ...el,
                  active: false,
                  collapse: true
                };
              });
            if(this.isMobile) {
              this.info = this.info.concat(result);
            }
            else {
              this.conts = this.conts.concat(result);
            }
            this.count = res.data.total;
            
            if (this.pager == 1) {
              // 如果是第一次,那就显示激活第一条
              let h = null;
              h = this.id ? result.find(el => el.id == this.id) : result[0];
              //显示
              if(h) {
                h.active = true;
                this.isMobile && (this.conts = [h]);
                h.collapse = false;
              }
            }
            

          } else {
            this.$message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.reportFetchLoader = false;
        });
    }
  },
  wath: {
    conts: function() {
      this.$nextTick(() => {
        this.$refs.cardbd.forEach(el => {
          el.style.height = el.clientHeight + "px";
        });
      });
    }
  }
};
</script>

<style lang="scss">
.publicreport {
  height: 100%;
  .re-left {
    width: 200px;
    list-style: none;
    overflow-y: auto;
    .active {
      color: #3087f3;
      background-color: #f4f9fe;
    }
    li {
      padding: 1rem;
      box-sizing: border-box;
      word-break: break-all;
      word-wrap: break-word;
      cursor: pointer;
      transition: all 0.3s linear;
    }
  }
  .re-cont {
    flex: 1;
    background-color: #f4f4f4;
    padding: 3rem;
    overflow-y: auto;
    .card {
      padding: 1.5rem 2rem;
      margin-bottom: 4px;
    }
    .card-hd-info {
      color: #808080;
      font-size: 0.75rem;
      position: relative;
      img {
        width: 30px;
        position: absolute;
        top: 1px;
        left: 0
      }
      p {
        margin-left: 2.6rem
      }
      p:first-of-type {
        margin-bottom: -5px;
      }
    }
    .card-hd {
      border-bottom: 1px solid #ededed;
      margin-bottom: 1.5rem;
    }
    .card-bd {
      transition: height 0.4s linear;
      overflow: hidden;
    }
    .card-collapse {
      cursor: pointer;
      color: #808080;
      font-size: 12px;
      margin-top: 1rem;
    }
  }
}

@media screen and (max-width: 700px) {
  .publicreport .re-cont {
    padding: 0;
    .card {
      border-radius: 0;
    }
    .card-hd-info {
      display: flex;
      justify-content: space-between;
      img {
        width: 20px;
        top: 8px;
      }
    }
  }
}
</style>


