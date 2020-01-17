<template>
  <div class="publicreport flex"  v-loading="reportloader">
    <ul 
    class="re-left block" 
    @click="choose" 
    v-if="!isMobile"
    v-loading="reportFetchLoader"
    v-fetchmore="fetchmore"
    ref="reportscroller"
    >
      <li :class="{active: tit.active}" :index="index" v-for="(tit, index) in info" :key="index">{{tit.title}}</li>
    </ul>
    <div class="re-cont block">
      <div class="card" index="0" v-for="(cont, idx) in conts" :key="idx">
        <div class="card-hd tcolor">
          <h2 v-html="cont.title"></h2>
          <div class="card-hd-info">
            <img src="../../assets/images/plogo.png" alt="">
            <p >{{$t("ms.logo")}}</p>
            <p>{{cont.createtime | format}}</p>
          </div>
        </div>
        <div class="card-bd tcolor" ref="cardbd"  v-html="cont.content" :style="`height: ${!isMobile && cont.collapse ? '20' : 'auto'}px`"></div>
        <div class="card-collapse center" v-if="isMobile" @click="collapse(idx)"> 
          {{!cont.collapse ? $t('ms.sq') : $t("ms.zk")}}
          <i :class="`el-icon-arrow-${!cont.collapse ? 'up' : 'down'}`"></i> 
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import util from "../../util";
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      info: [],
      conts: [],
      reportloader: false,
      reportFetchLoader: false
    };
  },
  computed: {
        ...mapGetters(['isMobile'])
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
      // this.reportFetchLoader = true;
      let data = {"code":0,"list":[{"id":"A_1068121776824819712","lang":"zh","title":"系统升级公告","content":"\u003cp\u003e    亲爱的用户：\u003c/p\u003e\u003cp\u003e    \u0026nbsp;\u003c/p\u003e\u003cp\u003e    Crypto JOY将于2018年11月30日0:00(UTC+8)开始系统升级维护，维护时长预计6个小时，期间将暂停平台一切服务。给您带来的不便，敬请谅解！\u2028\u2028\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    注意：\u2028\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    \u2028系统升级的预估时间可能并不准确，我们会在各个社交媒体同步升级进度，您可以通过微信群内的通知关注最新进展。\u2028\u2028\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    我们建议您访问官方网站（cjoy.games）及（ipfs.cjoy.games）获得及时推送。\u2028\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    感谢您对Crypto JOY团队的支持！\u003c/p\u003e\u003cp\u003e\u003cbr/\u003e\u003c/p\u003e\u003cp\u003e    \u2028\u2028Crypto JOY团队\u2028\u003c/p\u003e\u003cp\u003e    2018年11月29日\u003cbr/\u003e\u003c/p\u003e","createtime":"2018-11-29T12:37:30Z","updatetime":"2018-11-29T12:37:30Z"},{"id":"U_1040060981432066049","lang":"zh","title":"BTC如期企稳快速迫近6800 隔夜领涨的LTC反而最值得担忧？","content":"隔夜主流币种走出集体上涨，BTC如期在6450一线企稳后迅速回升至6660上方，短线震荡上升势头得以维稳。不过作为隔夜领涨主流币的LTC，目前续涨空间看似并不乐观。","createtime":"2018-09-01T09:35:03Z","updatetime":"0001-01-01T00:00:00Z"},{"id":"U_1040060981432066048","lang":"zh","title":"澳洲BTC药房即将登陆中国电商！阿里巴巴澳新展会又掘一宝！\n","content":"　　9月21日-22日，第二届阿里巴巴澳新电商生态博览会在澳大利亚悉尼国际会议中心成功举行。本次博览会吸引了170余家澳新地区品牌参展，旨在促进当地优质企业与阿里巴巴生态合作系统融合发展，向中国消费者提供来自澳洲和新西兰的优质产品。","createtime":"2018-09-01T09:35:03Z","updatetime":"0001-01-01T00:00:00Z"},{"id":"U_1040060981432066047","lang":"zh","title":"公告名称","content":"公告内容","createtime":"2018-09-01T09:35:03Z","updatetime":"0001-01-01T00:00:00Z"},{"id":"U_1040060981432066050","lang":"zh","title":"神秘矿工从2009年开始挖矿，已经转移3万个BTC","content":"截至发稿时，比特币突破6700美元关口，报价6706美元，24小时涨幅约3%。 \n\n加密货币交易者和投资者或许会为此感到高兴。然而，近期针对比特币最早区块的活动分析显示，一位早期参与挖矿的矿工从2016年12月开始，一直在悄悄将数万个比特币变现。 \n\n加密货币专家兼区块链数据分析师AntoineLeCalvez透露，某位神秘的比特币矿工在2016年12月和2018年1月期间，将大约3万个比特币转到了加密货币交易所，这部分比特币有可能已经变现，其也取得了丰厚的收益。 \n\nLeCalvez说，这位神秘的比特币矿工很聪明，只转移了最新挖出的比特币，这样就不至于被查到其参与挖矿的具体时间。","createtime":"2018-09-01T09:35:03Z","updatetime":"0001-01-01T00:00:00Z"},{"id":"U_1040060981432066051","lang":"zh","title":"BTC跌破6500美元 市场整体跟随下行","content":"　据《币世界》行情，今日午后BTC价格持续下跌，最低跌至6451美元，BTC现报6472.79美元，跌幅1.06%。市场整体跟随下行，其他主流币种表现如下：BCH（-2.29%）、ETH（-2.06%）、ETC（-1.54%）、LTC（-0.99%）、EOS（-0.97%）。","createtime":"2018-09-01T09:34:12Z","updatetime":"0001-01-01T00:00:00Z"}],"total":6};
                  let result = Array.isArray(data.list) && data.list.map((el, index) => {
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
            this.count = data.total;
            
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

      // util
      //   .getReports(
      //     {
      //       params: {
      //         size: this.size,
      //         offset: (this.pager - 1)*this.size,
      //         lang: this.$i18n.locale,
      //         orderby: 'create_time',
      //         order:'desc'
      //       }
      //     },
      //     {},
      //     this
      //   )
      //   .then(res => {
      //     if (res.status == 200) {
      //       let result = Array.isArray(res.data.list) && res.data.list.map((el, index) => {
      //           return {
      //             ...el,
      //             active: false,
      //             collapse: true
      //           };
      //         });
      //       if(this.isMobile) {
      //         this.info = this.info.concat(result);
      //       }
      //       else {
      //         this.conts = this.conts.concat(result);
      //       }
      //       this.count = res.data.total;
            
      //       if (this.pager == 1) {
      //         // 如果是第一次,那就显示激活第一条
      //         let h = null;
      //         h = this.id ? result.find(el => el.id == this.id) : result[0];
      //         //显示
      //         if(h) {
      //           h.active = true;
      //           this.isMobile && (this.conts = [h]);
      //           h.collapse = false;
      //         }
      //       }
            

      //     } else {
      //       this.$message.info(res.data.msg);
      //     }
      //   })
      //   .catch(err => {
      //     this.$message.info(this.errorInfo(err.response));
      //   })
      //   .finally(() => {
      //     this.reportFetchLoader = false;
      //   });
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


