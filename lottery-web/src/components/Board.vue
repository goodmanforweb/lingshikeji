<template>
  <div class="jl-index">
    <div class="section sec1 flex">
      <div class="wk3 block block1 fly-in fly-in-1">
        
        <div class="block1-wrap">
          <div class="w1">{{$t('ms.wjf')}}</div>
          <div class="w2">{{$t('ms.ywg')}}</div>
          <div class="w3 kt">
            <span>
              <i v-for="(num, index) in numbers" :key="index">{{num}}</i>
            </span>
            <span>{{$t('ms.jlt')}}</span>
          </div>
        </div>
      </div>
       <div class="wk1 block block2 fly-in fly-in-2">
        <div class="b-row">
          <span>{{$t('ms.tb')}}</span>
          <div class="flex">
            <span class="kt">{{totalAward | currency}}</span>
            <router-link to="/mrecord">
              <div class="btn-round">{{$t('ms.records')}}</div>
            </router-link>
          </div>
        </div>
      </div>

    </div>
    <div class="section sec2 flex">
     <div class="wk3 block3 block fly-in fly-in-3" >
        <Xtab></Xtab>
      </div>
      <div class="wk1 block block4 flex1 fly-in fly-in-4">
        <div class="cl-ticket-center">
           <div 
            class="cl-ticket" 
            v-for="(v, index) in record"
            :key="index"
            @click="switchTicket(index)" 
            :class="{
                active: v.active, 
                wzj: v.wzj, 
                duiprize: v.duiprize,
              }"
            :style="`${record.length == 1 && 'top:0px'}`"
            >
                <div class="clt-tit flex">
                  <div class="clt-ttt f18 kt">{{$t('ms.joylotto')}}</div>
                  <div class="clt-tt-info fma flex">
                    <div>
                      <span class="cm">{{$t('ms.game')}}</span>
                      <span class="f20 fma">{{v.no}}</span>
                    </div>
                    <div>
                      <span class="cm">{{$t('ms.lines')}}</span>
                      <span class="f20 fma">{{v.data.length}}</span>
                    </div>
                  </div>
                </div>
                <div class="clt-bd">
                  <table>
                    <thead>
                      <tr class="f14">
                        <td class="fma fwb" colspan="5">{{activeRoom.name}}</td>
                        <td class="fma fwb">{{$t('ms.mega')}}</td>
                        <td class="fma fwb">{{$t('ms.rate')}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(r, index) in v.data" :key="index">
                        <td 
                        v-for="(k, ii) in ['ONE','TWO','THREE','FOUR','FIVE','MEGA']" 
                        :style="`${r.record_map[k] == v.zjnum[k] && 'color:#C5493E'}`"
                        :key="ii"
                        >{{r.record_map[k] || '?' | makeUp}}</td>
                        <td>*{{r.num}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="center nodata" v-if="v.data.length == 0">{{$t('ms.norecord')}}</div>
                </div>
                <footer class="clt-ft fma">
                  <div class="clt-tt-row flex jsb">
                    <span class="cm">{{$t('ms.total')}}</span>
                    <span class="fw">{{v.fee | currency}} JLT</span>
                  </div>
                  <div class="clt-tt-row flex jsb">
                    <span class="cm">{{$t('ms.odds')}}</span>
                    <span class="fw">{{v.award | currency}} {{$t('ms.jlt')}}</span>
                  </div>
                  <div class="f14 center cm">
                    <span>{{$t('ms.lpur')}}</span>
                    <div class="fma">{{v.time}}</div>
                    <span>{{$t('ms.buck')}}</span>
                  </div>
                </footer>
                <div class="clt-bk-bar">
                  <div>
                    <span class="f18">{{$t('ms.playres')}}</span>
                    <span class="f18">{{$t('ms.playres')}}</span>
                    <span class="f18">{{$t('ms.playres')}}</span>
                    <img src="../assets/images/tlogow.png" alt="">
                  </div>
                </div>
                <span class="seal"></span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Xtab from './widget/xtabs/index';
import {mapGetters, mapActions} from 'vuex';
import Hub from 'hub';
import Big from 'bignumber.js';
import util from 'util';
export default {
  components: {
    Xtab,
  },
  data() {
    return {
      klass: false,
      numbers: '000194006100'.split(''),
      lotteryRecordLoader: false,
      block1Loader: false,
      block2Loader: false,
      prizeStatus: {},
      activeRoom: {
        name: '',
        desc:''
      },
      issueidmap:{},
      latest: [],
      old: [],
      record: [
        // {
        //   active: true,
            
        //     data: [],
        //     fee: 9090,
        //     award: 9090,
        //     no: 9090,
        //     issue_id: 9090,
        //     wzj: false,
        //       duiprize: false,
        //       time: '2018-12-14'
        // }
      ],
      totalAward:0,
    }
  },
  created() {
    Hub.$on('updateTicket', () => {
      this.getLotteryRecords(this.issueList);
    })
  },
  computed: {
    ...mapGetters(['isMobile', 'roomList','activeroom','issueList', 'lotteryRecord']),
  },
  beforeDestroy() {
    this.ticker && clearInterval(this.ticker);
  },
  methods: {
    ...mapActions(['getLotteryRecord', 'getIssueList', 'getWallet']),
    switchTicket(e) {
      this.record.forEach((el,index) => {
        el.active = index == e;
      })
    },
    getLotteryRecords(res) {
      //获取对应的记录
      this.lotteryRecordLoader = true;
      let ppmise = [];
      // the latest
        let l = this.getLotteryRecord({params: {issue_id: res[0].id}, ctx: this}).then(data => {
          this.latest = data;
        });
        ppmise.push(l);
      if(res.length >= 2 && !this.isMobile) {
        // the old
        let o = this.getLotteryRecord({params: {issue_id: res[1].id}, ctx: this}).then(data => {
          this.old = data;
        });
        ppmise.push(o)
      }      
      let filters = this.$options.filters;
      let calcPrize = data => {
        if(data.length == 0) {
          return {
              wzj: false,
              duiprize: false,
              time: '-'
            }
        }
        return {
            wzj: data.every(el => el.status == 'LOSING'),
            duiprize: data.some(el => el.status == 'SUCCESS'),
            time: filters.format(data[0].createtime),
        };

      };
      return Promise.all(ppmise).finally(() => {
        let tt = this.latest.reduce((prev, next) => prev + next.award, 0);
        let record = [
          {
            active: true,
            ...calcPrize(this.latest),
            data: this.latest,
            fee: this.latest.reduce((prev, next) => prev + next.fee, 0),
            award: Big(tt).div(100).toNumber(),
            no: res[0].no,
            issue_id: res[0].id,
            zjnum: res[0].record
          }
        ]
        if(ppmise.length == 2) {
          tt = this.old.reduce((prev, next) => prev + next.award, 0)
          record.unshift({
            active: false,
            ...calcPrize(this.old),
            data: this.old,
            fee: this.old.reduce((prev, next) => prev + next.fee, 0),
            award: Big(tt).div(100).toNumber(),
            no: res[1].no,
            issue_id: res[1].id,
            zjnum: res[1].record
          })
        }
        this.record = record;
        this.lotteryRecordLoader = false;
        this.checkIfFreshWallet(record)
      });
    },
    setActiveRoom() {
      if(this.roomList.length == 0 || !this.$route.params.id) return false;
      this.activeRoom = this.roomList.find(el => el.id == this.$route.params.id) || {};
      this.$store.commit('givenActiveRoom', this.activeRoom);
    },
    getRoomPool() {
      if(util.isEmpty(this.$route.params.id))return;
      this.block2Loader = true;
      util.getRoomAwardPool({roomid:  this.$route.params.id}, this)
      .then(res => {
          if(res.data.code == 0) {
            
            let t = Big(res.data.wallet.balance).div(100).valueOf();
            this.numbers = util.makeUp(t, 12).split('');
          }
      })
      .catch(err => {
        this.$message.info(window.errorInfo(err.response));
      })
      .finally(() => {
        this.block2Loader = false;
      })
    },
    getTotalRoomAward() {
      if(util.isEmpty(this.$route.params.id))return;
      this.block1Loader = true;
      util.getTotalRoomAward({roomid:  this.$route.params.id}, this)
      .then(res => {
          if(res.data.code == 0) {
            let t = 0;
            if(!res.data.record) {
              t = 0;
            }
            else if(res.data.record && res.data.record.data) {
              let d = JSON.parse(res.data.record.data);
              t = Object.values(d).reduce((prev, next) => prev + next.total_fee,0);
              t = Big(t).div(100).toNumber();
            }
            this.totalAward = t;
          }
      })
      .catch(err => {
        this.$message.info(window.errorInfo(err.response));
      })
      .finally(() => {
        this.block1Loader = false;
      })
    },
    createTicker() {
      this.ticker && clearInterval(this.ticker);
      this.ticker = setInterval(() => {
        this.getTotalRoomAward();
        this.getRoomPool();
      }, 10*1000);
    },
    checkIfFreshWallet(record) {
      // wzj: false,
      // duiprize: false,
      //判断record 元素， 就是当期的 或者上一期的，因为iusslist10s刷新一次
      let t = record.some(el => !!el.wzj || !!el.duiprize);
      if(t) {
        this.getWallet({ctx: this});
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler:function(n) {
        if(!util.isEmpty(n.params.id) && !util.isEmpty(this.roomList)) {
          this.setActiveRoom();
          this.getTotalRoomAward();
          this.getRoomPool();
          this.createTicker();
        }
      }
    },
    issueList: {
      deep: true,
      handler: function(n) {
        if(!util.isEmpty(n) && !util.isEmpty(this.$route.params.id)) {
          this.getLotteryRecords(n);
        }
      }
    },
    roomList: {
      deep: true,
      immediate: true,
      handler: function(n) {
        if(!util.isEmpty(n) && !util.isEmpty(this.$route.params.id)) {
          this.setActiveRoom();
          this.getTotalRoomAward();
          this.getRoomPool();
          this.createTicker();
        }
      }
    },
    activeroom: {
      deep: true,
      handler: function(n) {
        //路由上的id 为undefinded, 但是activeroom不为空， 说明进入页面的时候roomlist 还没有回来
        if(util.isEmpty(this.$route.params.id) && !util.isEmpty(n)) {
          this.$router.replace({name: 'game', params: {id: n.id}});
        }
      }
    }
  }
  
}
</script>

<style lang="scss">
.win-hint {
  cursor: pointer;
  color:#fff;
  margin: -16px -16px 0 -11px;
  text-align: center;
  background-image: linear-gradient(to right, #D97967, #C5493E)
}
.pc {
  .jl-index {
    .cl-ticket {
      position: absolute;
      top:16px;
      right:0;
      left:0;
      margin: 0 auto;
      opacity: .6;
      z-index: 99;
      transition: all .3s ease-in-out;
      transform: scale(.93);
      transform-origin: top center;
    }
    .cl-ticket.active {
      top:70px;
      opacity: 1;
      z-index: 100;
      transform: scale(1)
    }
  }
  .wk3 {
    width: 740px;
    margin-right: 16px;
  }
  .wk1 {
    width: 340px;
  }
  .block2 {
    text-align: center;
    overflow: hidden;
    .b-row {
      >span {
        font-size: 18px;
      }
      >div {
        span {
          padding: 10px 0;
          font-size: 40px;
        }
        .btn-round {
          width: 130px;
          padding: 6px 0;
        }
        flex-direction: column;
      }
    }
  }
  .block4 {
    min-height: 700px;
    box-sizing: border-box;
  }
  .cl-board {
    max-height: 800px;
    overflow-y: auto
  }
}
.jl-index {
  .block1 {
    padding: 24px 32px;
    margin-bottom: 16px;
  }
  .w1 {
    font-size: 28px;
  }
  .w2 {
    line-height: 32px;
  }
  .w3 span:first-child {
    display: flex-inline;
    i {
      width:39px;
      height:65px;
      display: inline-block;
      background-color: #fff;
      border-radius: 4px;
      text-align: center;
      line-height: 65px;
      font-size: 40px;
      margin: 0 3px;
    }
  }
  .w3 span:last-child {
    vertical-align: bottom;
  }
  // .section:first-of-type {
    

  // }
  // .section:last-of-type {
    
  //   flex-direction: column;
  // }

  .block2 {
    padding: 24px 16px;
    margin-bottom: 16px;
  }
  .b-row {
    >span {
      color:var(--ao)
    }
    >div {
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 30px;
      }
    }
    .btn-round {
      padding: 4px;
    }
  }
  .cl-router-container {
    // width: 570px
  }
  .block3 {
    overflow: hidden;
  }
  .block4 {
    overflow: hidden;
    padding:16px 0;


    
    

  }
  .cl-ticket-center {
    position: relative;
    top:6%;
  }
}
</style>


