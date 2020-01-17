<template>
<div class="hr1  block" :class="{mr16: !isMobile}">
    <div class="f14 gcolor">{{$t('m.hycbpm')}}</div>
    <div class="tcolor">
        <i class="f50 fw">{{user.ratio}}%</i>
    </div>
    <ul class="f14 h-lists">
        <NoRecord v-if="ranks.length == 0" style="minWidth:100%;" iconwidth="60" :hasicon="true" :text="$t('m.zshimeiyoujl')" class="flex hc vc v" />
        <li class="flex sb vc gcolor " :class="{qbk: index<3}" :key="index" v-for="(rank, index) in ranks">
            <div class="hy-l-r flex towrap">
                <i class="hcolor hl-icon center " :class="{fw: index == 0}">{{rank.level}}</i>
                <div class="f12">
                    <i >{{rank.name}}</i>
                    <div >
                        <i class="tcolor">{{rank.key | fix(2)}}</i>
                        <i >KEY</i>
                    </div>
                </div>
            </div>
            <span class="tcolor">{{rank.ratio}}%</span>
        </li>
    </ul>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import Big from 'bignumber.js'
export default {
  props: ['data'],
  data() {
      return {
          ranks:[],
          user: {
              ratio: 0
          }
      }
  },
  computed: {
      ...mapGetters(['isMobile'])
  },
  methods: {
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
              if(!res.data.list) return [];
              this.ranks = res.data.list.map((el, index) => {
                  let t = el.key ? util.dropHex(el.key, 8, 4) : 0;
                  return {
                      level: index + 1,
                      name: el.username,
                      key: t,
                      ratio: Big(t).div(sum_key).times(100).toFixed(2, 1)
                  }
              })

              this.user.ratio = Big(user_key).div(sum_key).times(100).toFixed(2, 1)

          })
      },
  },
  watch: {
      data: {
          immediate: true,
          deep: true,
          handler: function() {
              this.getBNRanks();
          }
      }
  }
}

</script>
<style lang='scss'>
.h-lists {
    li {
        margin: 4px 0;
        padding: 4px 10px;
        .hl-icon {
            flex-shrink: 0;
            width: 30px;
            height: 30px;
            line-height: 30px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            background-image: url(../../../assets/images/fsticon2.png);
        }
    }
    
    li:nth-child(1) {
        .hl-icon {
           background-image: url(../../../assets/images/fsticon.png);
        }
    }
    li:nth-child(2) {
        .hl-icon {
           background-image: url(../../../assets/images/scdicon.png);
        }
    }
    li:nth-child(3) {
        .hl-icon {
            background-image: url(../../../assets/images/thdicon.png);
        }
    }
}
.hy-l-r {
    max-width: 50%;;
    >div {
        padding-left: 16px;
    }
    
}
</style>