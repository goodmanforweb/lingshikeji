<template>
  <div class="nav" >
      <div class="nav-inner flex">
          <div class="index-menu">
             <el-dropdown v-if="isMobile">
               <span class="cjoy">
                  <img src="../../../assets/images/lemonlogo.png" alt="">
                  <img src="../../../assets/images/logotext.png" alt="">
                </span>
              <el-dropdown-menu slot="dropdown" class="kj-select">
                <el-dropdown-item >
                   <span class="cjoy">
                      <router-link to="/index">
                        <img src="../../../assets/images/lemonlogo.png" alt="">
                        <img src="../../../assets/images/logotext.png" alt="">
                      </router-link>
                    </span>
                </el-dropdown-item>
                <el-dropdown-item>
                    <span class="cjpool">
                      <router-link to="/kj/index">
                        <img class="kjlogo" src="../assets/images/kjlogo.png" alt="">
                        {{$t('ms.cjsl')}}
                      </router-link>
                    </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div v-if="!isMobile">
              <span class="cjoy">
              <router-link to="/index">
                <img src="../../../assets/images/lemonlogo.png" alt="">
                <img src="../../../assets/images/logotext.png" alt="">
              </router-link>
              </span>
              <span class="cjpool">
                <router-link to="/kj/index">
                  <img class="kjlogo" src="../assets/images/kjlogo.png" alt="">
                  {{$t('ms.cjsl')}}
                </router-link>
              </span>
            </div>
          </div>
          <div class="bunit">
            <router-link to="/kj/exchange">
              <span>SUC: {{Math.floor(pool.Balance) | currency}} <i v-if="isMobile">></i></span>
              <span v-if="!isMobile" class="ec" >{{$t("ms.dhzx")}}</span>
            </router-link>
            
          </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isMobile: window.innerWidth < 700
    };
  },
  computed: {
    ...mapGetters(["pool"])
  }
};
</script>

<style lang="scss" scoped>

.index-menu {
  cursor: pointer;
}
.cjpool {
    padding-left: 1rem;
    border-left:1px solid #373d42;
    margin-left: .6rem;

}
.kjlogo {
  width: 20px;
  vertical-align: middle;
  margin-right: .5rem;
}
.kj-select {
  background-color: #333;
}
.nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  
  
  span {
    vertical-align: middle
  }
  .ec {
    border: 1px solid #01e5f0;
    color: #01e5f0;
    border-radius: 20px;
    padding: 5px 10px;
    margin-left: 1rem;
    cursor: pointer;
  }
}
.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  white-space: nowrap;
  padding: 0 1rem;

  justify-content: space-between;
  align-items: center;

  line-height: 3.75rem;
  height: 3.75rem;

  .el-button.is-round {
    color: #01e5f0;
    border-color: #01e5f0;
    background-color: transparent;
    margin-left: 1rem;
    padding: 5px 10px;
  }
  .bunit {
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      vertical-align: middle
    }
  }
}
.nav-fixed {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>

