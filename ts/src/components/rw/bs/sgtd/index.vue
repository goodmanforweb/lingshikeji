<!--  -->
<template>
<Page :title="$t('m.sgtd')" borderLine padding routerBack="dash">
<div class="sgtd-panel">
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.tokensgtd')}}</div>

    <SG :data="data.current" :uint="unit" v-if="Object.keys(data.current).length > 0"/>
    <div class="more">
        <div class="f20 gcolor mb16">{{$t('m.morexm')}}</div>
        <ul>
            <li class="mb16 f12 flex vc"  v-for="(list, index) in data.lists" :key="index">
                <div class="flex1">
                    <div class="bs-info-wrap flex" :class="{vc: !isMobile}">
                        <div>
                            <div class="bs-avatar flex vc hc" :style="`backgroundImage:url(${list.img})`">
                                <div class="wc f800 f20 fuper center">{{list.name[$i18n.locale]}}</div>
                            </div>
                            <div class="bs-btns center" v-if="isMobile">
                                <el-button class="bs-btn disable">{{$t('m.sgxm')}}</el-button>
                                <div class="f12 tcolor mt6">
                                    <a :href="list.url" target="_blank">{{$t('m.lioajiexm')}}</a>
                                </div>
                            </div>
                        </div>
                       
                        <div class="bs-info flex1" :class="{'flex sb': !isMobile, 'flex v sa': isMobile}">
                            <div class="bs-ii tcolor flex v sb">
                                <div class="bs-row">
                                    <div class="f250">{{$t('m.fxjg')}}</div>
                                    <div class="f500">1 {{unit[0]}} ≈ {{list.rate + " " + unit[1]}}</div>
                                </div>
                                <div class="bs-row">
                                    <div class="f250">{{$t('m.mbsgsl')}}</div>
                                    <div class="f500">{{list.total + " " + unit[0]}}</div>
                                </div>
                            </div>
                            <div class="bs-ii tcolor flex v sb">
                                <div class="bs-row">
                                    <div class="f250">{{$t('m.sgkstime')}}</div>
                                    <div class="f500">{{list.start | format}}</div>
                                </div>
                                <div class="bs-row">
                                    <div class="f250">{{$t('m.sgjstime')}}</div>
                                    <div class="f500 redcolor">{{list.end | format}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bs-pro m16">
                        <div class="flex1">
                            <el-progress :percentage="Number(list.progress)" :show-text="false" color="#2EBA7E" :stroke-width=8></el-progress>
                            <div class="f12 tcolor mt6">
                                {{$t('m.sgjd')}}: {{list.progress}}% &nbsp;&nbsp;{{list.finished + " " + unit[0]}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bs-btns center" v-if="!isMobile">
                    <el-button class="bs-btn disable">{{$t('m.sgxm')}}</el-button>
                    <div class="f12 tcolor mt6">
                        <a :href="list.url" target="_blank">{{$t('m.lioajiexm')}}</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</Page>
</template>

<script>
import {mapGetters} from 'vuex';
import SG from './sg'
import Big from 'bignumber.js'
import Hub from '../../../../Hub.js'
export default {
  data () {
    return {
        state: false,
        loader: false,
        data: {
            lists: [],
            current: {}
        }
    };
  },
  components: {SG},
  computed: {
      ...mapGetters(['isMobile','signHYDetail']),
      unit() {
          let t = {};
          if(this.data.lists[0]) {
            t = this.data.lists[0];
          }
          else if(!util.isEmpty(this.data.current)) {
              t = this.data.current;
          }
          else {
              return [];
          }
          return [t.base_symbol.toUpperCase(), t.target_symbol.toUpperCase()]
      }
  },
  created() {
      if(!this.signHYDetail.project_contract) {
          return this.$router.replace({path:'dash'})
      }
      Hub.$on('sgsuc', () => {
          this.reset();
          this.fetch();
      })
    this.reset();
    this.fetch();
  },
  mounted() {},
  methods: {
      pcloadmore(next) {
          this.fetch().finally(next)
      },
      reset() {
            this.size = Math.ceil(window.innerHeight/47);
            this.page = 0;
            this.total = null;
            this.hasTotal = false;
            this.finish = false;
        },
      fetch() {
          if(this.loader || this.finish || (this.hasTotal && this.page*this.size >= this.total)) return Promise.resolve();
            this.page++;
            return this.getLists()
      },
      getLists() {
          this.loader = true;
          return request.buySGlists({
              params: {
                  order:'created_time',
                  desc: true,
                  contract_id: this.signHYDetail.project_contract,
                  pagesize: this.size,
                  offset: (this.page-1)*this.size
              }
          })
          .then(res => {
              this.total = Number(res.data.count);
              this.hasTotal = true;
            //   if(!Array.isArray(res.data.list)) return this.finish = true;
              res.data.list.forEach(el => {
                  el.decimals = el.decimals || 8;
                  el.progress = Big(el.finished).div(el.total).times(100).toFixed(2, 1);
                  el.total = util.dropHex(el.total, el.decimals, 4);
                  el.finished = util.dropHex(el.finished, el.decimals, 4);
                  el.name = JSON.parse(el.name)
                  
              });
              let current = {};
              if(!util.isEmpty(res.data.current)) {
                  current = {
                      ...res.data.current,
                      name: JSON.parse(res.data.current.name),
                      total: util.dropHex(res.data.current.total, res.data.current.decimals || 8, 4),
                      finished: util.dropHex(res.data.current.finished || 0, res.data.current.decimals || 8, 4),
                      progress: res.data.current.finished ? Big(res.data.current.finished).div(res.data.current.total).times(100).toFixed(2, 1) : 0
                  }
              }
              this.data = {
                  lists: res.data.list || [],
                  current
              }
          })
          .finally(() => {
              this.loader = false;
          })
      }
  }
}

</script>
<style lang='scss'>
.pc {
    .sgtd-panel {
        width: 850px;
        box-sizing: border-box;
        padding: 0 35px;
        .btn-wrap {
            margin: 30px 0 -24px;
            button {
                border-color: transparent
            }
        }
    }
    .bs-avatar {
        width:239px;
        height:149px;
        margin-right: 16px;
        background-image: url(../../../../assets/images/bbn.png)
    }
    .more {
        .bs-avatar {
            width:152px;
            height:95px;
        }
    }
    .bs-btns {
        min-width: 250px;
    }
    .bs-info-wrap {
        width: 90%
    }
    .bs-row {
        >div:first-child {
            margin-bottom: 10px;
        }
    }
}
.bs-avatar {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    >div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }
}
.mobile {
    .bs-avatar {
        width:130px;
        height:130px;
        margin-bottom: 16px;
        background-image: url(../../../../assets/images/bbn.png)
    }
    .bs-info {
        margin-left: 16px;
    }
    .bs-row {
         >div:first-child {
            font-size: 12px;
        }
        >div:last-child {
            font-size: 14px;
            margin-bottom: 10px;
        }
    }
}
button.bs-btn,button.bs-btn:active {
    color:#fff;
    background-color: #086599;
}
.bs-buy-input {
    border:none;
    outline: none;
    background-color: #fff;
    height: 54px;
    border-radius: 4px;
    padding: 2px 10px;
    width: 80%;
    margin: 16px auto;
    display: block;
    text-align: center;
    color:#086599;
    font-size: 20px;
}
.bs-btns {
    button.disable {
        background-color: rgba(151, 151, 151, 0.438)
    }
    button.opensoon {
        background-color: rgba(8, 100, 153, 0.411)
    }
}
.bt-buy-btn {
    width: 180px;
    margin-bottom: -30px!important;
}

</style>