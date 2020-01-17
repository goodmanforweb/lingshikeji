<template>
  <div id="login-wrap" class="flex">
    <div class="login-container">
      <div class="login-tit center">{{$t("ms.welcome")}}</div>
      <div class="login-bd">
        <div class="login-pic center"><img src="../../assets/images/lemonlogo.png" alt=""></div>
        <div class="login-name center"><img src="../../assets/images/logotextb.png" alt=""></div>
        <Xtabs  @change="switchTab" :tabnames="[$t('ms.login'), $t('ms.register')]" :defaultKey="activeTab">
          <router-view slot="body"></router-view>
        </Xtabs>
      </div>
    </div>
  </div>
</template>

<script>
import Xtabs from "../widget/xtabs/index";
export default {
  name: "LoginTab",
  components: {
    Xtabs
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  methods: {
    switchTab(e) {
      this.$router.push({ name: ["login", "register"][e] });
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(to, from) {
        this.activeTab = { login: 0, register: 1 }[to.name];
      }
    }
  }
};
</script>
<style lang="scss">
.xtab-wrap .xtab-hd .xtab.active,
.xtab-wrap .xtab-hd .xtab:hover {
  color: #2fbffb;
}
.xtab-wrap .xtab-hd .active-bar {
  background-color: #2fbffb;
}
#login-wrap {
  background: url(../../assets/images/logobk.jpg) center no-repeat;
  background-size: cover;
  min-height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  .login-tit {
    font-size: 3rem;
    text-transform: uppercase;
    padding-bottom: 10px;
  }
  .login-pic img {
    width: 25px;
  }
  .login-name {
    font-weight: bold;
    margin: 1rem 0;
    img {
      width: 50%;
    }
  }
  .login-container {
    width: 477px;
    margin: 2rem 0;
    overflow: hidden;
  }
  .login-bd {
    background-color: #fff;
    border-radius: 6px;
    padding: 2rem 3rem 1rem 3rem;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

@media screen and (max-width: 700px) {
  .xtab-wrap .xtab-hd .xtab.active,
  .xtab-wrap .xtab-hd .xtab:hover {
    color: #000;
  }
  .xtab-wrap .xtab-hd .active-bar {
    background-color: #000;
  }
  .xtab {
    flex: 1;
    text-align: center;
  }
  .btn-sure {
    width: 100%;
  }
  .tab-footer {
    border: none;
    padding: 0;
    a {
      text-decoration: underline;
    }
  }
  #login-wrap {
    background: none;
    .login-container {
      width: 100%;
      margin-bottom: 2rem;
      .login-pic,
      .login-name {
        display: none;
      }
      .login-bd {
        padding: 0;
        border-radius: 0;
        box-shadow: none;
      }
      .register-tab,
      .login-tab {
        padding: 0 3rem;
      }
    }
  }
}
@media screen and (max-width: 350px) {
  #login-wrap .login-container {
    .register-tab,
    .login-tab {
      padding: 0 1rem;
    }
  }
}
</style>

