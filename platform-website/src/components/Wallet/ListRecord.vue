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
import {mapGetters, mapActions} from 'vuex';
export default {
  data() {
      return {
          listLoader: false,
      }
  },
  created() {
      this.listLoader = true;
      this.getAssetLists(this)
      .then(data => {
        data.forEach(el => {
          this.getAsset({ctx: this, asset: el.asset});
        })
      })
      .finally(() => {
        this.listLoader = false;
      });
  },
  computed: {
    ...mapGetters(['assetList', 'asset'])
  },
  methods: {
    ...mapActions(['getAssetLists', 'getAsset']),
    go(e) {
      this.$router.push({name: 'walletrecord' ,params: {id: e.symbol.toLowerCase()}, query: {type: 'deposite'}})
    }
  }
};
</script>
