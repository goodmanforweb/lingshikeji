<template>
  <div class="deposit-wrap" >
      <p class="hash">
        <span> {{$t('ms.myaddress')}}</span>
        <span class="hash-wrap">
          <span id="myhash">{{currentasset.address}}</span>
          <el-button type="primary" ref="copyBtn" data-clipboard-target="#myhash">{{$t("ms.copytext")}}</el-button>
        </span>
      </p>
      <div class="wrap-balance" >
        <canvas id="qrcode" ref="qrcode"></canvas>
      </div>
      <p class="hint" v-html="$t('ms.deposithint5', {minideposit: this.minideposit, assetname: this.coin})"></p>
      <div class="deposit-hint-layer" v-if="!isConfirm">
            <div class="dh-text">
              <p>{{$t('ms.deposithint6')}}</p>
              <div v-html="$t('ms.deposithint5', {minideposit: this.minideposit, assetname: this.coin})"></div>
            </div>
            <div class="btn-wrap center">
                <el-button class="btn-sure" type="primary" @click="confirm" >{{$t("ms.confirm")}}</el-button>
            </div>

      </div>
  
  </div>
</template>

<script>
import util from "../../util/util";
import { mapGetters, mapActions } from "vuex";
import QRCode from "qrcode";
import Clipboard from "clipboard";

export default {
  name: "Deposit",
  data() {
    return {
      currentasset: {},
      activeAsset: {},
      coin: "",
      minideposit: 1000,
      isConfirm: false
    };
  },
  computed: {
    ...mapGetters(["asset", "assetList"])
  },
  created() {
    this.coin = this.$route.params.id.toUpperCase();
    this.init();
  },
  mounted() {
    this.createQRCode(this.currentasset.address);
    new Clipboard(this.$refs.copyBtn.$el).on("success", e => {
      this.$message.info(this.$t("ms.copy"));
      e.clearSelection();
    });
  },
  methods: {
    init() {
      this.findActiveAsset(this.assetList);
      this.findActiveAssetSpec(this.asset);
    },
    findActiveAsset(n) {
      this.activeAsset = n.find(el => el.symbol == this.coin);
      if (this.activeAsset) {
        this.minideposit = util.fromHex(
          this.activeAsset.minideposit,
          this.activeAsset.decimals
        );
      }
    },
    findActiveAssetSpec(n) {
      if (this.activeAsset) {
        if (n[this.activeAsset.asset]) {
          this.currentasset = n[this.activeAsset.asset];
          this.createQRCode(this.currentasset.address);
        }
      }
    },
    createQRCode(address) {
      QRCode.toCanvas(
        this.$refs.qrcode,
        address,
        {
          width: 200,
          height: 200,
          margin: 1
        },
        function(err) {
          if (err) {
            console.warn("生成二维码出错:(");
          }
          console.log("succ");
        }
      );
    },
    copy() {
      this.$refs.copyInput.select();
      document.execCommand("Copy");
      this.$message.info(this.$t("ms.copy"));
    },
    confirm() {
      this.isConfirm = true;
    }
  },
  watch: {
    assetList: {
      deep: true,
      handler: function(n) {
        this.findActiveAsset(n);
      }
    },
    asset: {
      deep: true,
      handler: function(n) {
        this.findActiveAssetSpec(n);
      }
    }
  }
};
</script>

<style lang="scss">
.hash {
  .el-button {
    background-color: #2fbffb;
    border: none;
    margin-left: 1rem;
    padding: 8px 12px;
    font-size: 14px;
  }
}
.deposit-wrap {
  text-align: center;
  position: relative;
  .wrap-balance {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 1.4rem;
    margin-bottom: 1.4rem;
  }
  .deposit-hint-layer {
    text-align: left;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 99;
    padding: 0 57px;
    background-color: rgba(255,255,255, .98);
    .dph1, .dph2 {
      margin: 2rem 0;
    }
    .btn-wrap {
      margin-top:2.5rem;
      padding-top: 2.5rem;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }
  }
}

.deposit-wrap .hash {
  margin-top: 2rem;
  position: relative;
}
.deposit-wrap .hash input {
  background-color: transparent;
  color: #fff;
  border: none;
  outline: none;
  width: 300px;
}
.deposit-wrap .hint {
  text-align: left;
  color: rgba(128, 128, 128, 1);
  font-size: 0.6rem;
  margin: 4px 0;
  strong {
    color: #fc8868;
  }
}

@media screen and (max-width: 700px) {
  .xtab-row {
    margin: 0 -16px;
}
  .deposit-wrap {
    text-align: left;
    padding: 0 3rem;
    .deposit-hint-layer {
      padding: 0 3rem;
    }
  }
  .hash-wrap {
    overflow: hidden;
    #myhash {
      display: inline-block;
      width: calc(100% - 70px);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
  .deposit-wrap .hint {
    font-size: 14px;
  }
  .wrap-balance {
    text-align: center;
  }
  .deposit-wrap .hash input {
    width: 250px;
  }
  .hash {
    .el-button {
      padding: 6px 8px;
    }
    span:last-child {
      display: block;
    }
  }
}
</style>
