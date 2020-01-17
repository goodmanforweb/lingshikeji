<template>
    <div class="kjgame">
      <div class="item-show-wrap">
          <div class="flex item-show-lists">

              <div class="item-show">
                <div class="is-hd "><span class="is-star scale"></span></div>
                <div class="is-ww">
                  <div class="is-tit">
                    {{$t("ms.kjzsy")}}
                  </div>
                  <div class="is-bk flex">
                    
                    <div class="is-bd fma otf">{{(pool.TotalBalance + pool.weekBalance)  | currency }}</div>
                    <div class="is-ft"></div>
                  </div>
                </div>
              </div>

              <div class="item-show" >
                <div class="is-hd"><span class="is-dio scale"></span></div>
                <div class="is-ww">
                  <div class="is-tit">
                    {{$t("ms.bzkjsy")}}
                  </div>
                  <div class="is-bk flex">
                    <div class="is-bd fma">{{pool.weekBalance | currency }}</div>
                    <div class="is-ft"></div>
                  </div>
                </div>
              </div>

              <div class="item-show">
                <div class="is-hd"><span class="is-flash scale"></span></div>
                <div class="is-ww">
                  <div class="is-tit">
                    {{$t('ms.jstimes')}}
                  </div>
                  <div class="is-bk flex">
                    <div class="is-bd fma">{{accTimes}}</div>
                    <div class="is-ft"></div>
                  </div>
                </div>
              </div>


              <div class="item-show audiobtn" @click="$router.push({name:'kjexchange'})" >
                <div class="is-hd"><span class="is-plus scale"></span></div>
                <div class="is-ww">
                  <div class="is-tit">
                    SUC {{$t('ms.dh')}}
                  </div>
                  <div class="is-bk flex">
                    <div class="is-bd fma">{{Math.floor(pool.Balance) | currency}}</div>
                    <div class="is-ft"></div>
                  </div>
                </div>
              </div>
              <div class="item-show audiobtn" @click="$router.push({name:'kjpower'})">
                <div class="is-hd"><span class="is-heart scale"></span></div>
                <div class="is-ww">
                  <div class="is-tit">
                    {{$t('ms.nlz')}}
                  </div>
                  <div class="is-bk flex">
                    <div class="is-bd fma">{{pool.Energy}}</div>
                    <div class="is-ft"></div>
                  </div>
                </div>
              </div>
              <div class="item-show" :class="{diable: pool.Free <= 0}" @click="getFreeEnergyMine(pool.Free > 0)">
                <div class="is-hd"><span class="is-gift scale"></span></div>
                <div class="is-ww">
                  <div class="is-tit">
                    {{$t('ms.gsnl')}}
                  </div>
                  <div class="is-bk flex">
                    <div class="is-bd f12">{{pool.Free > 0 ? $t('ms.onekeygetpower') : $t('ms.storepowerforday')}}</div>
                    <div class="is-ft"></div>
                  </div>
                </div>
              </div>
        </div>

      </div>


        
        <div class="kj-hx">
          <div class="kj-hx-center">
            <div class="kj-zs-pic-wrap flex vc hc">
              <div class="kj-hx-zs"></div>
              <div class="kj-hx-zs-text-wrap center">
                <span class="kj-zh-tt f20 textshadow2">{{$t('ms.pooltatal')}}</span>
                <div class="kj-hx-zs-text flex " >
                  <span class="kzj-l"></span><span style="margin-left:-1px" class="kzj-m center f20 textshadow">{{totalPool}}</span>
                  <span class="kzj-r"></span>
                </div>
              </div>
            </div>
            <div class="kj-balls">
              <div class="kj-ball flex vc hc center"
              :class="{bqiu: item.type, lqiu: !item.type, ['loop'+index]: true}"
              :style="item"
              v-for="(item, index) in qius" :key="index" 
              @click="hgood(item)"
              >
                <span class="kj-ball-num">
                  <i>{{item.energy}}</i>
                  <i>SUC</i>
                </span>
                <!-- <span class="kj-ball-info">
                  <i>剩余时间</i>
                  <i>14:09</i>
                </span> -->
              </div>
              
            </div>
            <div class="kj-xingqi" @click="showPoster">
              <div class="kx center">
                  <div class="kx-text f18 " v-html="$t('ms.yqhy')">
                    
                  </div>
              </div>
            </div>
          </div>


          <div class="kj-rt">
            <div class="kr-btn-wrap mb20 center" @click="showkj">
              <div class="kb-btn cz audiobtn">
                <span class="kb-btn-icon scale"></span>
              </div>
              <span class="kb-text">{{$t("ms.mypool")}}</span>
            </div>
            <div class="kr-btn-wrap mb20 center">
              <router-link to="/kjrecord">
                  <div class="kb-btn record audiobtn">
                    <span class="kb-btn-icon scale"></span>
                  </div>
                  <span class="kb-text">{{$t('ms.allrecord')}}</span>
              </router-link>
            </div>
            <div class="kj-buy center mcenter">
              <router-link :to="{name:'kjmall'}">
                <div class="kb-box"></div>
                <span class="f20" v-html="$t('ms.gmkj')"></span>
              </router-link>
          </div>
          </div>
          


          <div class="kj-progress-bar">
            <p class="center f22 textshadow2">{{$t('ms.poolprogress')}}</p>
            <div class="kp-wrap flex">
              <span class="kp-l"></span>
              <span class="kp-m"></span>
              <span class="kp-r"></span>
              <div class="kp-bar-wrap flex">
                <span class="kp-barer flex flex1">
                  <i class="p1 pg" :style="`width: ${progressbar}%`"></i>
                </span>
                <span class="kp-barer-text f23">{{progress}}%</span>
              </div>
            </div>
        </div>
        <Menu style="marginTop: -.68rem"/>

        </div>

        

        


      <Poster :posterVisible="posterVisible" :posterText="posterText" @posterClose='posterVisible=false'></Poster>
      <YPoster :posterVisible="kjposterVisible" :posterText="kjposterdata" @posterClose="kjposterVisible=false"></YPoster>

    </div>
</template>
<script>
const cf = [
      {
        type: true,
         energy: 0,
        top:3.1,
        left:1
      },
      {
        type: true,
         energy: 0,
        top:1.6,
        left:1.6
      },
      {
        type: false,
        energy: 0,
        top:.5,
        left:3.3
      },
      {
        type: true,
         energy: 0,
        top:1.6,
        right:1.6
      },
      {
        type: true,
         energy: 0,
        top:3.1,
        right:1
      }
    ];
    const cfmobile = [
      {
        type: true,
         energy: 0,
        top:3.1,
        left:.4
      },
      {
        type: true,
         energy: 0,
        top:1.6,
        left:1
      },
      {
        type: false,
        energy: 0,
        top:.3,
        left:2.7
      },
      {
        type: true,
         energy: 0,
        top:1.6,
        right:1
      },
      {
        type: true,
         energy: 0,
        top:3.1,
        right:.4
      }
    ];

import Menu from './menu';
import util from 'util';
import { mapGetters, mapActions } from "vuex";
import Big from 'bignumber.js';
import Poster from "../../widget/poster/index";
import YPoster from './widgets/poster/index'
import Hub from 'hub';
export default {
  components: {
    Menu,
    Poster,
    YPoster
  },
  data() {
    return {
      accTimes: 0,
      totalPool: 0,
      progress: '0',
       posterVisible: false,
      posterText: "",
      qius: [],
      kjposterVisible: false,
      kjposterdata: ''
    }
  },
  computed: {
    ...mapGetters(["login", "pool",'isMobile','audio']),
    progressbar() {
      let t = 0, y = Math.ceil(this.progress);
      if(y >= 5) {
        t = y
      }
      else if(y < 5 && y > 0) {
        t = 5;
      }
      else if(this.progress == 0) {
        t = 0;
      }
      return t;
    }
  },
  created() {
    
    this.getAccList();
    this.listenKJPoster();
    this.coin = document.querySelector('#coin');
  },
  mounted() {
    this.coin = document.querySelector('#water');
    setTimeout(() => {
      this.createTicker();
    }, 1000*30)
  },
  beforeDestroy() {
    this.ticker && clearInterval(this.ticker);
  },
  methods: {
    ...mapActions(["getPool"]),
    createTicker() {
      this.ticker = setInterval(() => {
        this.getPool({ ctx: this });
      }, 1000*60);
      
    },
    listenKJPoster() {
      Hub.$on('kjposterChange', data => {
        this.kjposterVisible = data.state;
        this.kjposterdata  = data.data;
      })
    },
    hgood(ball) {
      if(this.audio.tx) {
        this.coin.play();
      }
      if(!ball.type) {
        this.getFreeEnergyMine(true);
      }
      else {
        this.$energy(ball, () => {}, () => {});
      // this.$fire(ball, () => {}, () => {})
      }
      
    },
    calcEnergy() {
      //中间的一颗放免费的能量
      if(Object.keys(this.pool).length == 0) return;
      const free = this.pool.Free;
      const needMoney = Big(this.pool.Valid).minus(free).toNumber();;
      let qius = JSON.parse(JSON.stringify(this.isMobile ? cfmobile : cf));

      let mid = qius.splice(2,1)[0];
      if(needMoney > 0) {
        if(needMoney >= 40000) {
          const t = Math.floor(Big(needMoney).div(4).toNumber());
          qius = qius.map(el => {
            el.energy = t;
            return el;
          });
        }
        else if(needMoney > 10000 && needMoney < 40000) {

          const y = Math.floor(Big(needMoney).div(1e4).toNumber());;
          qius = qius.slice(0, y+1);
          Array.from({length: y}).forEach((el, index) => {
            qius[index].energy = 10000;
          });

          qius[y].energy = needMoney%10000;
        }
        else {
          qius = [
            {
              type: true,
              energy: needMoney,
              top:1.6,
              left:1.6
            }
          ]
        }
        
      }
      else {
        qius = [];
      }

      if(free > 0) {
        mid.energy = free;
        qius.push(mid);
      }

      this.qius = qius.map(el => {
        el.top = el.top + 'rem';
          el.left && (el.left = el.left + 'rem');
          el.right && (el.right = el.right + 'rem');
        return el;
      })

    },
    getFreeEnergyMine(status) {
      if(!status)return;
      const promi = this.freeMine();
      if(this.audio.tx && (util.checkSys() == 'ios')) {
          setTimeout(() => {
              this.coin.play();
          }, 200);
      }
      promi && promi.then(data => {
        this.$fire({mined: data}, () => {}, () => {})
      });
    },
    showPoster() {
      // this.$fire({}, () => {}, () => {})
      // this.$energy({type: true, energy: 30000}, () => {}, () => {});
      this.posterVisible = true;
      this.posterText = this.login.user.invitecode;

    },
    showkj() {
      this.$yxkj({
        pool: this.pool
      }, () => {}, () => {})
    },
    setXAxis(distance) {
      const ww = window.innerWidth;
      const startx = ww*0.1, endx = ww*0.9;
      const random = (startx, endx) => Math.random()*(endx - startx) + startx;
      const zhishao = (endx - startx)/5 - distance;
      let temp = [];
      Array.from({length: 5}).forEach((el, index) => {
        let s = 0;
        if(index == 0) {
          s = startx;
        }
        else {
          //限制产生的随机数至少大于求的宽度
          s = temp.slice(0).pop() + distance;
        }
        temp.push(Math.round(random(s, s + zhishao)));
      });
      console.log(temp);
      return temp;
    },
    getAccList() {
      util
        .getAccList({ params: { size: 12, offset: 0 } }, {}, this)
        .then(res => {
          if (res.data.code == 0) {
            this.accTimes = res.data.count;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {});
    },
    freeMine() {
      if(this.btnloader) return; 
        this.btnloader = true;
        
        return util
        .mine({data: {
            value:0,
        }}, {}, this)
        .then(res => {
            if (res.data.code == 0) {
                let oldMined = this.pool.weekBalance, newMined = 0;
                if (Array.isArray(res.data.pool.Machines)) {
                    let t = res.data.pool.Machines.reduce((prev, next) => Big(prev).plus(next.Mined).toNumber(), 0);
                    newMined = util.dropDec(t, 1e4);
                    this.$store.commit('givenPool', {process: true, pool: res.data.pool});
                    return Math.abs(Big(oldMined).minus(newMined).toNumber());
                }

                
            }
        })
        .catch(err => {
            this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
            this.btnloader = false;
        });
    },
    setTotalPool() {
      if(!this.pool.Machines) return;
      const totalPool = this.pool.Machines.reduce((prev, next) => {
        return prev + next.OriginReserves;
      }, 0);
      const hasMined = this.pool.Machines.reduce((prev, next) => {
        return prev + next.HistoryMined;
      }, 0);

      this.totalPool = util.dropDec(totalPool, 1e4);
      this.progress = ((hasMined/totalPool)*100).toFixed(2);
      
    },

  },
  watch: {
    pool: {
      immediate: true, 
      handler: function(n) {
        this.setTotalPool();
        this.calcEnergy();
      }
    }
  }
}
</script>

<style lang="scss">
 
</style>

