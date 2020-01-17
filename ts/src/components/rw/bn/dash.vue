<!--  -->
<template>
<Page :title="$t('m.hydash')" borderLine padding :routerBack='`/bnrw/${id}`'>
<span class="tcolor f12" slot="layer-right-btn" @click="$router.push({name: 'bdashdetail'})">{{$t('m.hydetail')}}</span>
<div class="hy-dash m20 bn-dash">
    <div class="m-dash-hd" :class="{'block center mb16': isMobile}">
        <div class="tcolor m10" :class="{'flex sb': !isMobile}">
            <div :class="{'borderLine pd16 mb16': isMobile}">
                <div class="f12 gcolor mb6">{{$t('m.zjclj')}}</div>
                <div>
                    <i class="f12">USD</i>
                    <i class="f28 fw">{{jclj[0]}}</i>
                    <i class="f12">.{{jclj[1]}}</i>
                </div>
            </div>
            
            <div>
                <div class="f12 gcolor mb6" :class="{center: isMobile, right: !isMobile}">{{$t('m.hysyyxq')}}</div>
                <ul class="flex vc hc hy-countdown">
                    <template v-for="(value, key, index) in cd" >
                        <li class="center" :key="key">
                            <div class="fw f18">{{value | makeUp}}</div>
                            <div class="f12">{{key | uppercase}}</div>
                        </li>
                        <i :key="index" v-if="Object.keys(cd).length > index + 1" >:</i>
                    </template>
                </ul>
            </div>

        </div>

    </div>

    <div class="hy-dash-bd" :class="{flex: !isMobile}">
        <DashDetail  v-if="!isMobile"/>
        <div class="hy-center block" :class="{'ml16 mr16':!isMobile, mb16: isMobile}">

            <div class="flex sb vc f14 gcolor">
                <span>{{$t('m.syhj')}}</span>
                
                <!-- <span class="cp" @click="panelHandle('SYCalcer')"> <i class="calc-icon va "></i> <i class="va">{{$t('m.syjsq')}}</i></span> -->
            </div>
            <div class="tcolor m10 fw">
                USD <span class="f40">{{data.history_earnings[0]}}</span> <span class="f12">.{{data.history_earnings[1]}}</span>
                <span class="f12 lcolor">+{{yushangzhou}}%（{{$t('m.yszhou')}}）</span>

            </div>
            <div class="f12  borderLine pd16 mb16">
                <i class="gcolor">{{$t('m.zrisy')}}</i>
                &nbsp;&nbsp;&nbsp;
                <i class="tcolor">USD</i>
                <i class="tcolor f18 fw">{{data.yestoday_earnings[0]}}</i>
                <i class="tcolor">.{{data.yestoday_earnings[1]}}</i>
            </div>



            <div class="line-chart chart" ref="lineChart" :style="!isMobile ? 'width: 328px' : ''">
               
            </div>

            <div v-if="!isMobile" class="f14 gcolor flex sb borderLine pd16 mb16">
                <span>{{$t('m.newsyjl')}}</span>
                <span class="cp" @click="panelHandle('HYSYTJ')">{{$t('m.checkall')}}</span>
            </div>
            <router-link  to="hysytj" v-else class="f14 gcolor flex sb borderTopLine pt16">
                <span>{{$t('m.checksy')}}</span>
                <i class="el-icon-arrow-right"></i>
            </router-link>
            <NoRecord style="minWidth:100%;" iconwidth="60" :hasicon="true" :text="$t('m.zshimeiyoujl')" class="flex hc vc v" v-if="profits.length == 0 &&!isMobile"/>

            <table v-if="!isMobile" class="tcolor f14 latest-record" style="width: 100%;">
                <tr v-for="(profit, index) in profits" :key='index'>
                    <td>
                        <span>{{profit.name}}</span>
                        <div>
                            {{profit.type[$i18n.locale]}}
                            <!-- <i class="f12">CJS</i> -->
                        </div>
                    </td>
                    <td class="right">
                        <div>
                            <span class="fw">{{profit.amount}}</span>
                            <i class="f12">USD</i>
                        </div>
                        <span class="gcolor f12">{{profit.date}}</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="hy-right flex" :class="{v: isMobile}">
           <Rank :data="data"/>
           <div class="hr2 re" :class="{'flex v': isMobile}">
               <div class="block block-lj mb16">
                    <div class="f14 gcolor center">{{$t('m.hyqjs')}}</div>
                    <div class="f24 center lcolor fw m16">{{(cd.days*24+cd.hours)  | makeUp}}:{{cd.min | makeUp}}:{{cd.sec | makeUp}}</div>
                    <div class="flex sb m16">
                        <span class="f14 gcolor">{{$t('m.tzze')}}</span>
                        <span class="tcolor">
                            <i>{{data.standard.sum_key || 0}}</i>
                            <!-- <i class="f12">.09</i> -->
                        </span>
                    </div>
                    <div class="flex sb m16">
                        <span class="f14 gcolor">{{$t('m.jclj')}}</span>
                        <span class="tcolor">
                            <i>{{data.standard.sum_found || 0}}</i>
                            <!-- <i class="f12">.09</i> -->
                        </span>
                    </div>
                    <div class="block">
                        <div class="flex sb mb16">
                            <span class="f14 gcolor">{{$t('m.mykey')}}</span>
                            <span class="right">
                                <div class="f18 tcolor">{{data.key || 0}}</div>
                                <i class="f12 gcolor">≈{{allkeytocjoy}}CJOY</i>
                            </span>
                        </div>

                        <div class="flex sb">
                            <span class="f14 gcolor">{{$t('m.yizchu')}}</span>
                            <span class="tcolor">
                                <i class="f18 fw">{{(data.standard.sum_user_withdraw || 0) | w(4)}}</i>
                                <i class="f12">CJOY</i>
                            </span>
                        </div>
                    </div>
               </div>
               <div class="block block-key re choose-key" :class="{mb16:isMobile}">
                    <span class="cp" @click="panelHandle(isBuy ? 'KEYBUYRecord' : 'KEYEXCRecord')"> <i class="record-icon va "></i></span>
                    <div class="radio-choose tcolor re">
                        <div class="fw f18 center">KEY</div>
                        <div class="flex sb vc f12 radio-check">
                            <span @click="radioHandle(0)" :class="{active: isBuy}">
                                <!-- {{$t('m.buy')}} -->
                            </span>
                            <i class="radio-line flex1"></i>
                            <span @click="radioHandle(1)" :class="{active: !isBuy}">
                                <!-- {{$t('m.exchange')}} -->
                            </span>
                        </div>
                        <div class="flex sb f12 radio-check-text">
                            <span  :class="{active: isBuy}">
                                {{$t('m.buy')}}
                            </span>
                           
                            <span :class="{active: !isBuy}">
                                {{$t('m.exchange')}}
                            </span>
                        </div>
                    </div>
                    <div class="f14 center lcolor m16">
                        <template v-if="!isBuy">
                            {{$t('m.dqkdh')}}：{{data.key || 0}}KEY
                        </template>
                        <template v-else>
                            {{$t('m.dqjg')}}：{{rate2}}CJS/KEY
                        </template>
                    </div>
                    <div class="block-input flex qbk m16">
                        <span class="gcolor f14">
                            <template v-if="!isBuy">
                                {{$t('m.dhkey')}}
                            </template>
                            <template v-else>
                                {{$t('m.czcjsnum')}}
                            </template>
                        </span>
                        <input :disabled="isDisabled" type="number" v-model="buyinput" class="flex1 tcolor right">
                    </div>
                    <div class="m16">
                        <el-slider  :disabled="isDisabled"  v-model="sliderValue" :min=0 :max="sliderMax" :step=0.01></el-slider>
                        <div class="gcolor f12" v-if="!isBuy">
                            {{$t('m.yugu')}}：{{yugukeytocjoy | currency(4)}}CJOY
                        </div>
                        <div class="right f14 tcolor" v-else>
                            {{$t('m.yugu')}}：{{buysumcjs | currency(4)}}KEY
                        </div>
                    </div>

                    <div class="btn-fter center">
                        <el-button :disabled="isDisabled" :loading="keyLoader" @click="keyHandle" class="el-btn-tcolor db" style="width: 100%" >{{$t('m.sure')}}</el-button>
                        <span class="gcolor f12" v-if="isBuy">{{$t('m.kyye')}}：{{useraccount.value | currency(4)}}CJS</span>
                    </div>
               </div>
               <p v-if="!isMobile" class="key-hint f12 tcolor">{{$t('m.hint78')}}</p>
           </div>
        </div>
    </div>

    <RightPanel :show.sync="panelShow" id='dotside'>
        <component  :panelData="panelData" :is='panel' @update:show="val => panelShow=val"/>
    </RightPanel>  
</div>
</Page>
</template>
<script>
import DashDetail from './dashdetail'
import KEYEXCRecord from './keyrecord'
import KEYBUYRecord from './keybuyrecord'
import SYCalcer from './sycalcer'
import HYSYTJ from './hysytj'
import Line from '../dot/line'
import CountDownTicker from '../mixin/countdown'
import {mapGetters, mapActions} from 'vuex';
import Big from 'bignumber.js'
import signDetail from '../mixin/signdetail'
import verifyman from '../../../mixins/index';
import textTypeDecide from '../mixin/getprofittype'
import Hub from '../../../Hub.js'
import Rank from '../widgets/rank'
export default {
  data () {
    return {
        buyinput: 1,
        keyLoader: false,
        radioTexts: [
            {
                text: this.$t('m.buy'),
                name: 'buy',
                active: true
            },
            {
                text:this.$t('m.exchange'),
                name:'exchange',
                active: false
            },
        ],
        sliderValue: 1,
        user: {
            ratio: 1,
            rank: 1
        },
        ranks: [],
        panelData: {},
        fullScreen: false,
        panel:'',
        panelShow: false,
        cjstokeyprice:0,
        keytocjoy:0,
        profits:[],
        linechartrecord: false,
    };
  },
  components: {
      KEYEXCRecord,
      KEYBUYRecord,
      SYCalcer,
      HYSYTJ,
      DashDetail,
      Rank
  },
  mixins:[CountDownTicker, signDetail, verifyman, textTypeDecide],
  computed: {
      ...mapGetters(['manAssetsLists','useraccount','signHYDetail']),
      isMobile () {
          return this.$store.getters.isMobile
      },
      jclj() {
          return (Number(this.data.standard.sum_found || 0).toFixed(4) + '').split('.')
      },
      isBuy() {
          const t = this.radioTexts.find(el => el.active);
          return t && t.name == 'buy';
      },
      id() {
          return this.$route.params.id;
      },
      data() {
          return this.signHYDetail;
      },
      isDisabled() {
          if(this.isBuy) {
              return Number(this.sliderMax) <= 0
          }
          else {
              return Number(this.data.key) <= 0
          }
          return false
      },
      min() {
          return this.isDisabled ? 0 : 1;
      },
      rate2() {
          if(!this.cjstokeyprice) return 0;
          return Big(1).div(this.cjstokeyprice).toFixed(4);
      },
      sliderMax() {
          let t = 0;
          const t1 = this.useraccount.value || 0, t2 = this.data.key || 0;
          if(this.isBuy) {
              t = Number(Big(t1).toFixed(4, 1));
          }
          else {
              t = Number(t2)
          }
          return t;
      },
      
      buysumcjs() {
          return Big(this.buyinput).times(this.cjstokeyprice).toFixed(4)
      },
      allkeytocjoy() {
          return Big(this.data.key).times(this.keytocjoy).toFixed(4)
      },
      yugukeytocjoy() {
          return Big(this.buyinput).times(this.keytocjoy).toFixed(4)
      },
      yushangzhou() {
          if(!this.data.history_earningsraw || !this.data.last_week_earnings) return 0;
          let t = Big(this.data.history_earningsraw).minus(this.data.last_week_earnings || 0);
          return Big(t).div(this.data.history_earningsraw).times(100).toFixed(2)
      }
  },
  created() {
      this.createTicker();
      this.getBNKeyPrice();
      this.getBNKEYTOCJOYPrice();
  },
  mounted() {
      this.init(this.signHYDetail);
      this.getProfitLists();
      this.getBNStatics().then(res => {
          !this.linechartrecord && this.createLineChart(res);
      })
  },
  beforeDestroy() {
      this.clearTicker();
  },
  methods: {
      ...mapActions(['getManAssetsLists']),
      clearTicker() {
          this.ticker && clearTicker(this.ticker);
      },
      createTicker() {
          this.clearTicker();
          setInterval(() => {
              this.getBNKeyPrice();
              this.getBNKEYTOCJOYPrice();
          }, 30*1000)
      },
      init(res) {
        this.end_time = res.end_time;
        this.createCountDownTicker();
        //依赖contract_id
        this.getBNRanks();
      },
      keyHandle() {
          if(this.buyinput == 0 || this.keyLoader) return;
          if(this.isBuy) {
              if(Number(this.useraccount.value) < this.buyinput ) {
                  return this.$message.info(this.$t('m.yuebuzu'))
              }
              this.verifyMan().then(res => {
                if(res.state == 'succ') {
                    this.bnDeposit('Deposit', res.data);
                }
              })
          }
          else {
              if(Number(this.data.key) < this.buyinput ) {
                  return this.$message.info(this.$t('m.yuebuzu'))
              }
               this.verifyMan().then(res => {
                if(res.state == 'succ') {
                    this.bnDeposit('Withdraw', res.data);
                }
              })
          }
      },
      bnDeposit(type,jtdata) {
          this.keyLoader = true;
          request[`bn${type}`]({
              data: {
                  challenge: jtdata.geetest_challenge,
                  validate:jtdata.geetest_validate,
                  seccode:jtdata.geetest_seccode,
                  flag: this.flag,
                  project: this.id,
                  value: this.buyinput
              }
          })
          .then(res => {
              //刷新账户
              if(type == 'Withdraw') {
                  this.$message.info(this.$t('m.sellsuc'));
              }
              else {
                  this.$message.info(this.$t('m.buysuc'));
              }
              this.getManAssetsLists();
              
              Hub.$emit('freshSignData', true);
          })
          .finally(() => {
              this.keyLoader = false
          })
      },
      radioHandle(idx) {
          this.radioTexts  = this.radioTexts.map((el, index) => {
              el.active = index == idx;
              return el;
          });
          this.buyinput = 0;
          this.sliderValue = this.min;
      },
      panelHandle(type, data) {
          if(this.isMobile) {
              let id = this.id;
              let t = {
                  SYCalcer: () => {
                      return {name: 'bsyjsq'};
                  },
                  KEYBUYRecord: () => {
                      return {name: 'keybuy'}
                  },
                  KEYEXCRecord: () => {
                      return {name: 'keyexc'}
                  },
                  HYSYTJ: () => {
                      return {name: 'hysytj'}
                  }
              }[type]();
              t.params = {id};
             return this.$router.push(t)
          }
          this.panel = this.$options.components[type];
          this.panelShow = true;
      },
      createLineChart(data) {
          new Line(this.$refs.lineChart, data);
      },
      getBNStatics() {
          return request.getBNStatics({
              params: {
                  project: this.id,
                  pagesize: 20,
                  offset: 0,
                  start: util.getDay(-7),
                  end:util.getDay(0)
              }
          })
          .then(res => {
              let t = {
                  date: [],
                  value: [
                      [],
                      []
                  ],
                  text:[this.$t('m.profit'),this.$t('m.rollout')]
              };
              if(util.isEmpty(res.data)) {
                  return t;
              }
              let filters = this.$root.$options.filters;
              res.data.list.forEach(el => {
                  t.date.push(filters.format(el.time, 'MM-DD'));
                  t.value[0].push(el.earnings ? util.fix(el.earnings, 4) : 0);
                  t.value[1].push(el.rollout ? util.fix(el.rollout, 4) : 0);
              });
              return t;
          })
      },
      getProfitLists() {
          request.bnProfitLists({
              params: {
                  order:'created_time',
                  desc: true,
                  project: this.id,
                  pagesize: 4,
                  offset: 0
              }
          })
          .then(res => {
              let store = [];
              if(!Array.isArray(res.data.list)) return store;
              let filters = this.$root.$options.filters;
              res.data.list.forEach(el => {
                  store.push({
                      date: filters.format(el.created_time),
                      name: el.username,
                      type: '',
                      amount: util.dropHex(el.key, el.decimals || 8 ,4),
                      description: el.description,
                  })
              }) 
              this.profits = store;
              this.textsHandler(this.profits, 'type');
          })
      },
      getBNKeyPrice() {
          request.getBNKeyPrice({
              params: {
                  project: this.id
              }
          })
          .then(res => {
              if(util.isEmpty(res.data)) return {};
              return this.cjstokeyprice = res.data.price;
          })
      },
      getBNKEYTOCJOYPrice() {
          request.getBNKEYTOCJOYPrice({
              params: {
                  project: this.id
              }
          }).then(res => {
              if(util.isEmpty(res.data)) return {};
              return this.keytocjoy = res.data.price;
          })
      },
      getBNRanks() {
          if(!this.data.project_contract) return ;
          request.getBNRanks({
              params: {
                  contract_id: this.data.project_contract,
                  pagesize: 10,
                  offset: 0
              }
          })
          .then(res => {
              if(util.isEmpty(res.data)) return [];
              const sum_key = this.data.standard.sum_key || 1;
              const user_key = this.data.key || 0;
              this.ranks = res.data.list.map((el, index) => {
                  let t = el.key ? util.dropHex(el.key, 8) : 0;
                  return {
                      level: index + 1,
                      name: el.username,
                      key: t,
                      ratio: Big(t).div(sum_key).times(100).toFixed(2)
                  }
              })

              this.user.ratio = Big(user_key).div(sum_key).times(100).toFixed(2)

          })
      },
      checkInput(n) {
          // interger / float
          const reg = /^\d+(\.\d{1,4})?$/;
          if(!reg.test(n)) {
              this.$message.info(this.$t('m.canonlynum'));
              return false;
          }
          return true
      }
  },
  watch: {
      buyinput: function(n, p) {
          if(!this.checkInput(n)) {
              return this.buyinput = p;
          }
          const t = Number(n) ;
          
          if(t <= this.sliderMax && t > 0) {
              this.sliderValue = Number(t);
          }
          else if(t > this.sliderMax) {
              this.buyinput = this.sliderMax;
          }
      },
      sliderValue: function(n) {
          this.buyinput = n;
      },
      signHYDetail: {
          deep: true,
          handler: function(n) {
              this.init(n);
          }
      },
  }
}

</script>
<style lang='scss'>


</style>