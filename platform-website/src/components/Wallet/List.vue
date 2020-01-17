<template>
    <div class="walletlist-wrap" v-loading="listLoader">
        <ul class="card" >
            <li v-for="(ass,index) in assetList"  :key="index" class="flex" @click="go(ass)">
                <div class="wallet-icon">
                    <img :src="ass.icon">
                    <span>{{ass.name}}</span>
                </div>
                <div class="wallet-rest">
                    {{$t('ms.avaiblerest')}}：{{(asset[ass.asset] ? asset[ass.asset].value : '0') | currency}}
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import util from "../../util/util";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      listLoader: false
    };
  },
  created() {
    this.listLoader = true;
    this.getAssetLists(this)
      .then(data => {
        data.forEach(el => {
          this.getAsset({ ctx: this, asset: el.asset });
        });
      })
      .finally(() => {
        this.listLoader = false;
      });
  },
  computed: {
    ...mapGetters(["assetList", "asset"])
  },
  methods: {
    ...mapActions(["getAssetLists", "getAsset"]),
    go(e) {
      this.$router.push({
        name: "walletdeposit",
        params: { id: e.symbol.toLowerCase() }
      });
    }
  }
};
</script>
<style lang="scss">
.wallet-icon {
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        padding-left: 1rem;
      }
    }
.walletlist-wrap {
  .card {
    padding: 0;
    li {
      padding: 1.3rem 1.5rem;
      justify-content: space-between;
      position: relative;
      border-bottom: 1px solid #eee;
    }
    li:hover {
      background-color: #f3fcff;
    }
    

    li:last-child {
      border: none;
    }
  }
}
@media screen and (max-width: 700px) {
  .walletlist-wrap {
    .card {
      li:last-child {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
