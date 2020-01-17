<template>
    <div class="wallet-wrap card" v-loading="loaderShow">
        <div class="wallet-hd flex">
             <div class="wallet-icon">
               <img :src="activeAsset.icon">
                <span>{{coin}}</span>
            </div>
            <div class="wallet-rest">
                {{$t('ms.avaiblerest')}}：{{currentasset.value | currency}}
            </div>
        </div>

        <Xtabs  v-if="isMobile"  @change="switchTab" :tabnames="[$t('ms.deposit'), $t('ms.withdraw')]" :defaultKey="activeTab">
          <router-view slot="body"></router-view>
        </Xtabs>
        <template v-if="!isMobile">
          <div class="xtab-row">
              <el-radio v-model="activeTab"  @change="switchTab" :label=0 >{{$t('ms.deposit')}}</el-radio>
              <el-radio v-model="activeTab"  @change="switchTab" :label=1 >{{$t('ms.withdraw')}}</el-radio>
          </div>
          <router-view></router-view>
        </template>
    </div>
</template>

<script>
import Xtabs from "../widget/xtabs/index";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Xtabs
  },
  data() {
    return {
      activeTab: 0,
      isMobile: window.innerWidth > 704,
      loaderShow: false,
      currentasset: {
        value: "0"
      },
      activeAsset: {},
      coin: ""
    };
  },
  created() {
    this.coin = this.$route.params.id.toUpperCase();
    this.activeTab = { walletdeposit: 0, walletwithdraw: 1 }[this.$route.name];
    if (this.assetList.length == 0 && Object.keys(this.asset).length == 0) {
      this.loaderShow = true;
      this.getAssetLists(this)
        .then(data => {
          data.forEach(el => {
            this.getAsset({ ctx: this, asset: el.asset });
          });
        })
        .finally(() => {
          this.loaderShow = false;
        });
    } else {
      this.init();
    }
  },
  computed: {
    ...mapGetters(["asset", "assetList"])
  },
  methods: {
    ...mapActions(["getAsset", "getAssetLists"]),
    init() {
      this.findActiveAsset();
      this.findActiveAssetSpec();
    },
    findActiveAsset() {
      this.activeAsset = this.assetList.find(el => el.symbol == this.coin);
    },
    findActiveAssetSpec() {
      if (this.activeAsset) {
        this.currentasset = this.asset[this.activeAsset.asset]
          ? this.asset[this.activeAsset.asset]
          : {};
      } else {
        this.activeAsset = {};
      }
    },
    switchTab(e) {
      this.$router.push({ name: "wallet" + ["deposit", "withdraw"][e] });
    }
  },
  watch: {
    $route: function(e) {
      this.activeTab = { walletdeposit: 0, walletwithdraw: 1 }[e.name];
    },
    activeTab(e) {},
    assetList: {
      deep: true,
      handler: function() {
        this.findActiveAsset();
      }
    },
    asset: {
      deep: true,
      handler: function() {
        this.findActiveAssetSpec();
      }
    }
  }
};
</script>

<style lang="scss">
.wallet-wrap {
  .xtab-wrap .xtab-hd .xtab {
    padding: 0;
  }
  .wallet-hd {
    justify-content: space-between;
    padding-bottom: 22px;
    align-items: center;
  }
  .card {
    padding-top: 0;
  }
}
.xtab-row {
  background-color: #f5faff;
  line-height: 3rem;
  margin: 0 -1.5rem;
  padding: 0 1.5rem;
}

@media screen and (max-width: 704px) {
  .wallet-wrap,
  .depowith-records {
    padding-top: 0;
  }
  .wallet-hd {
    line-height: 3rem;
    padding: 1rem 0;
  }
}
</style>


