<!--  -->
<template>
<Page style="height:100%" :title="$t('m.hysj')" borderLine padding routerBack="ddash">

<div class="hysj" style="minHeight:100%;" :class="{'flex v hc vc': !isMobile}">
    <div class="checkin shadow mb6" :class="{flex1: isMobile}">
        <div class="ck-hd  tcolor center" v-if="!isMobile">
            <i class="el-icon-error" @click="$emit('update:show', false)"></i>
            {{$t('m.hysj')}}
        </div>
        <div class="ck-bd tcolor f14">
           <p> {{ $t('m.jin')+target.cname+$t('m.jjer')}}</p>
            <div>
                <i class='va el-icon-circle-check yes-icon'></i>
                <span class="va">{{$t('m.syfuwjb')}}：{{target.metadata.yield_rate}}%</span>
            </div>
            <div>
                <i class='va el-icon-circle-check yes-icon'></i>
                <span class="va">{{$t('m.jjrange')}}：{{target.metadata.next_level_need}}USD</span>
            </div>
            <div>
                <i class='va el-icon-circle-check yes-icon'></i>
                <span class="va">{{$t('m.nlzsong')}}：{{target.metadata.power}}%</span>
            </div>

            <p class="center">{{$t('m.ccsjneed')}}</p>
            <p class="center redcolor">
                <span class="f18">{{price | currency(4)}}</span>
                <i class="f12">CJS</i>
            </p>
        </div>
        <div class="ck-ft center" style="paddingBottom:16px;">
            <span class="gcolor f12">{{$t('m.dqye')}}: {{useraccount.value | currency(4)}} CJS</span>
            <div class="mt6" >
                <el-button :loading="loader" @click="upgradecheck" class='cj-btn-price f20 n-btn center'>{{$t('m.buy')}}</el-button>
            </div>
        </div>
    </div>
    <div class="f12 redcolor" v-if="meta.trial">{{$t('m.sjhint1')}}</div>
</div>
</Page>
</template>

<script>
//如果是体验认证，wid是想成为的id;用wid的下一级别服务商
import {mapGetters} from 'vuex';
import verifyman from '../../../mixins/index';
import Hub from '../../../Hub'

export default {
  data () {
    return {
        loader: false,
        target: {
            metadata: {}
        },
        price: 0
    };
  },
  props: ['panelData'],
  mixins:[verifyman],
  components: {},
  computed: {
      ...mapGetters(['fwsHYLists']),
      isMobile() {
          return this.$store.getters.isMobile
      },
      id() {
          return this.$route.params.id
      },
      useraccount() {
          return this.$store.getters.useraccount
      },
      meta() {
          return this.isMobile ? this.$route.query : this.panelData;
      }
  },
  created() {
      this.showUpgradeInfo();
  },
  mounted() {},
  methods: {
      showUpgradeInfo() {
          const wid = this.meta.wid;
          let target;
          if(this.meta.trial) {
             target =  this.fwsHYLists.find(el => el.id == wid);
             this.target = target;
            const  t3 = Big(this.target.metadata.lock_limit).times(this.target.metadata.discount_rate || 0).times(1e-2);
            this.price = Big(this.target.metadata.lock_limit).minus(t3).toFixed(4, 1)
          }
          else {
              this.fwsHYLists.forEach((el, index) => {
                  if(el.id == wid) {
                      return target = index;
                  }
              });
              if(target < this.fwsHYLists.length - 1) {
                  target = this.fwsHYLists[target + 1];
                   this.target = target;
                   this.price = 0;
              }
              else {
                  //已经是最高级别
              }
          }
      },
      upgradecheck() {
          this.verifyMan().then(res => {
            if(res.state == 'succ') {
                this.upgrade(res.data);
            }
        })
      },
      upgrade(jtdata) {
          this.loader = true;
          request.fwsUpgrade({
              data: {
                  challenge: jtdata.geetest_challenge,
                  validate:jtdata.geetest_validate,
                  seccode:jtdata.geetest_seccode,
                  flag: this.flag,
                  project: this.id,
                  id:this.meta.trial ? this.meta.wid  : ''
              }
          })
          .then(res => {
                this.$message.info(this.$t('m.upgradesuc'));
                !this.isMobile && setTimeout(() => {
                    this.$emit('update:show', false)
                }, 1000)
                this.isMobile && this.$router.push('ddash');
                 Hub.$emit('freshSignData', true);
          })
          .catch(err => {
               this.$message.info(this.$t('m.upgradefail'));
          })
          .finally(() => {
              this.loader = false;
          })
      }
  }
}

</script>
<style lang='scss'>
.hysj {
    .ck-bd {
        padding: 30px 30px 16px;
        .yes-icon {
            vertical-align: middle
        }
        .yes-icon:before {
            font-size: 16px;
        }

    }
}
</style>