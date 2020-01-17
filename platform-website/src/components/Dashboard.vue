<template>
    <div class="dash">
      <el-container >
        <div class="dash-left-aside" :style="`paddingLeft:${paddingLeft}px`">
          <el-aside width="300px" v-if="isMobile">
            <el-row>
              <div class="dash-logo center" ><router-link to="/index"><img  src="../assets/images/logotext.png" /></router-link></div>
              <div class="accountinfo-hd center dash-man-info">
                <span class="man-info"><i class="head" :style="`backgroundImage: url(${login.head})`"></i></span>
                <p class="man-username">{{login.user.username}}</p>
                <p><i class="el-icon-circle-check"></i>{{$t("ms.validphone")}}: {{login.user.phone | clip}}</p>
              </div>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-menu
                  :default-active="activeItem"
                  @select="handleSelect"
                  >
                  <el-menu-item index="rewards">
                    <i class="icon hub"></i>
                    <span slot="title">{{$t("ms.myhub")}}</span>
                  </el-menu-item>

                  <el-submenu index="wallet">
                    <template slot="title" index="tt">
                      <i class="icon wallet "></i>
                      <span>{{$t("ms.mywallet")}}</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="walletlist">{{$t("ms.wallet")}}</el-menu-item>
                      <el-menu-item index="listrecord">{{$t("ms.records")}}</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>

                  <el-submenu index="account">
                    <template slot="title">
                      <i class="icon account"></i>
                      <span>{{$t("ms.accountmaneger")}}</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="accountindex">{{$t("ms.fixpass")}}</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>

                  <el-menu-item index="exit">
                    <i class="icon exit"></i>
                    <span slot="title">{{$t("ms.accountexit")}}</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </el-aside>
        </div>
        <el-main ref="main">
          <Xtabs  v-if="!isMobile && ['walletdeposit','walletwithdraw','walletrecord','walletlist', 'listrecord'].includes($route.name)" @change="switchTab" :tabnames="[$t('ms.wallet'), $t('ms.records')]" :defaultKey="activeTab">
            <router-view slot="body"></router-view>
          </Xtabs>
          <router-view v-else></router-view>
        </el-main>
      </el-container>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Xtabs from "./widget/xtabs/index";
const menues = ["rewards", "walletlist", "walletrecord", "accountindex"];

export default {
  name: "dashboard",
  data() {
    return {
      hideTabs: false,
      isMobile: window.innerWidth > 704,
      activeTab: 0,
      activeItem: "rewards",
      paddingLeft: 100
    };
  },
  components: {
    Xtabs
  },
  created() {
    window.addEventListener("resize", this.calcPaddingLeft, false);
    this.calcPaddingLeft();
    menues.includes(this.$route.name) && (this.activeItem = this.$route.name);
    if (!this.isMobile) {
      this.activeTab = { wallet: 0, walletrecord: 1 }[this.$route.name];
    }
  },
  mounted() {},
  beforeDestroy() {
    window.removeEventListener("resize", this.calcPaddingLeft, false);
  },
  computed: {
    ...mapGetters(["login", "account"])
  },
  methods: {
    handleSelect(e) {
      if (e == "exit") {
        this.exit();
      } else {
        this.$router.push({ name: e });
      }
    },
    exit() {
      this.$store.commit("exit");
      this.$router.push({ path: "/index" });
    },
    switchTab(e) {
      this.$router.push({ name: ["walletlist", "listrecord"][e] });
    },
    calcPaddingLeft() {
      let ww = window.innerWidth;
      let paddingLeft = 0;
      if (ww < 1200) {
        paddingLeft = 0;
      } else if (ww > 1200 && ww < 1700) {
        paddingLeft = ww * 120 / 1920;
      } else if (ww > 1700) {
        paddingLeft = ww - 1600;
      }
      this.paddingLeft = paddingLeft;
    }
  },
  watch: {
    $route: function(e) {
      menues.includes(this.$route.name) && (this.activeItem = this.$route.name);
      if (this.isMobile) return false;
      this.activeTab = { walletList: 0, walletrecord: 1 }[e.name];
    }
  }
};
</script>

<style lang="scss">
.icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #999;
  background-position: center;
  background-repeat: no-repeat;
}
.bd .el-main {
    padding: 4rem 44px;
  }
.dash {
  .dash-logo {
    font-size: 1.5rem;
    color: #fff;
    line-height: 4rem;
    border-bottom: 1px solid #3b3f43;
    margin-bottom: 1rem;
    img {
      vertical-align: middle;
      width: 50%
    }
  }
  .dash-man-info {
    color: #fff;
    padding: 1rem 0;
    .man-username {
      font-size: 1.6rem;
          margin-top: 16px;
    }
    p:last-child {
      color:rgba(255,255,255,.5)
    }
    .el-icon-circle-check {
      color: rgba(255,255,255,.3)
    }
  }
  .dash-left-aside {
    transition: all 0.3s linear;
    background: url(../assets/images/lemon.png) no-repeat center bottom;
    background-size: 50%;
    background-color: #25292e;
  }
  .el-menu-item,
  .el-submenu__title {
    color: #808080;
    padding-left:30px!important;
  }
  .el-menu-item:hover,
  .el-submenu__title:hover,
  .el-menu-item.is-active {
    color: #fff;
    border-left: 2px solid #fff;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }
  .el-aside {
    color: #808080;
    height: 100%;
  }
  .el-aside,
  .el-menu {
    background-color: transparent;
  }
  aside .icon {
    margin-right: 0.5rem;
    background-image: url(../assets/images/icon.png);
    background-repeat: no-repeat;
    background-size: 100px auto;
    margin-right: 1rem;
  }
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-main {
    background-color: #f7f7f7;
    max-width: 1300px;
  }
  .hub {
    background-position: -48px -27px;
    // background-image: url(../assets/images/hub.png)
  }
  .wallet {
    background-position: -20px -27px;
    // background-image: url(../assets/images/wallet.png)
  }
  .account {
    background-position: 8px -27px;
    // background-image: url(../assets/images/account.png)
  }
  .exit {
    background-position: -77px -26px;
    // background-image: url(../assets/images/exit.png)
  }
  .el-menu {
    border-right: none;

    .el-menu-item,
    .el-submenu__title {
      font-size: 22px;
    }
    .el-submenu .el-menu-item {
        padding: 0 80px;
    }
    li[role="menuitem"]:nth-child(2) {
      .el-menu-item {
        text-align: center;
      }
    }
    li[role="menuitem"]:nth-child(3) {
      .el-menu-item {
        text-align: center;
        // padding-left: 62px!important;
      }
    }

    li.is-active {
      .el-submenu__title {
        span {
          color: #fff;
        }
      }
      .icon {
        background-color: #fff;
      }
    }
  }
  .xtab-hd {
    background-color: #fff;
    line-height: 50px;
    height: 50px;
    border-color:rgba(0,0,0,.05)
  }
}

@media screen and (max-width: 704px) {
  .dash {
    .el-main,
    .dash-cont-box {
      padding: 0;
      background-color: #fff;
    }
  }
  .card {
    border-radius: 0 !important;
  }
  .rewardrecord-wrap {
    .red-cv {
      // flex-direction: column;
    }
  }
}
</style>
