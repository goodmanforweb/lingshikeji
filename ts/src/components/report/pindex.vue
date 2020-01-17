<template>
  <div class="publicreport flex">
    <ul 
    class="re-left block" 
    v-loading="reportFetchLoader"
    v-fetchmore="fetchmore"
    ref="reportscroller"
    >
      <li 
      @click="choose(index)" 
      :class="{active: tit.active}" 
      :index="index" v-for="(tit, index) in info" 
      :key="index">{{tit.title}}</li>
      <NoRecord  class="flex hc vc" v-if="info.length <= 0"/>
    </ul>

    <div class="re-cont block">
      <div class="card" v-if="Object.keys(cont).length > 0">
        <div class="card-hd tcolor">
          <h2 v-html="cont.title"></h2>
          <div class="card-hd-info">
            <img src="../../assets/images/plogo.png" alt="">
            <p >Geeker</p>
            <p>{{cont.createtime | format}}</p>
          </div>
        </div>
        <div class="card-bd tcolor" v-html="cont.content"></div>
      </div>
       <NoRecord style="minWidth:100%" class="flex hc vc" v-if="Object.keys(cont).length <= 0"/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailcont: {},
      info: [],
      cont: {},
      reportloader: false,
      reportFetchLoader: false
    };
  },
  created() {
    this.pager = 0;
    this.count = null;
    this.size = 30;
    this.finished = false;
  },
  mounted() {
    this.id = this.$route.query.id;
    this.setFetchSize();
    this.fetchmore();
    this.getReportDetail();
  },
  methods: {
    getReportDetail() {
      if(!this.id) return Promise.reject();
      return request.getReportDetail({},{id:this.id})
      .then(res => {
        return this.detailcont = res.data;
      })
    },
    choose(idx) {
      this.info.forEach((el, index) => {
        el.active = index == idx;
        el.active && (this.cont = el)
      });
    },
    setFetchSize() {
      this.size = Math.ceil(this.$refs.reportscroller.clientHeight/60);
    },
    fetchmore() {
      if(this.reportFetchLoader || this.finished) return ;
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
      request.getReportLists(
          {
            params: {
              pagesize: this.size,
              offset: (this.pager - 1)*this.size,
              key: this.$i18n.locale,
              order: 'create_time',
              desc: true
            }
          }
        )
      .then(res => {
        if(Array.isArray(res.data.list)) {
            this.info = this.info.concat(res.data.list);
            util.isEmpty(this.cont) && (this.cont = this.info[0], this.info[0].active=true);
            this.count = res.data.total;
         }
         else {
           this.finished = true
         }
      })
      .finally(() => {
        this.reportFetchLoader = false;
      });
    },
    setLeftActive() {
      if(util.isEmpty(this.info) || util.isEmpty(this.detailcont)) return;
      this.cont = this.detailcont;
      this.info.forEach(el => {
        el.active = el.id == this.cont.id
      })
    }
  },
  watch: {
    info: {
      deep: true,
      handler:function() {
        this.setLeftActive()
      }
    },
    detailcont: {
      deep: true,
      handler:function() {
        this.setLeftActive();
      }
    }
  }
};
</script>

<style lang="scss">
.publicreport {
  height: 100%;
  .block:hover {
    transform: scale(1)
  }
  .re-left {
    width: 200px;
    list-style: none;
    overflow-y: auto;
    margin-right: 16px;
    .active {
      color: #086599;
      font-weight: bold;
      opacity: 1;
    }
    li {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      max-height: 47px;
      padding: 6px;
      box-sizing: border-box;
      word-break: break-all;
      word-wrap: break-word;
      cursor: pointer;
      color:#086599;
      opacity: .5;
      transition: all 0.3s linear;
      border-bottom: 1px solid rgba(0, 89, 130, 0.166);
    }
    li:last-child {
      border:none
    }
  }
  .re-cont {
    flex: 1;
    overflow-y: auto;
    .card {
      margin-bottom: 4px;
      padding: 0 16px 16px;
    }
    .card-hd-info {
      font-size: 12px;
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
      font-size: 12px;
      margin-top: 1rem;
    }
  }
}
</style>


