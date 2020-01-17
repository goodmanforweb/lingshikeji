<template>
    <div class="accountinfo-wrap">
        <div class="accountinfo-hd center">
            <span class="man-info"><i class="head" :style="`backgroundImage: url(${login.head})`"></i></span>
            <p class="username">{{login.user.username}}</p>
            <p class="tel"><i class="el-icon-circle-check"></i>{{$t("ms.validphone")}}: {{login.user.phone | clip}}</p>
        </div>
        <ul class="accountinfo-bd card">
            <li class="flex">
                <span>{{$t("ms.validphone")}}</span>
                <span>{{login.user.phone | clip}}</span>
            </li>
            <li class="flex" @click="jump('m')">
                <span>{{$t("ms.fixpass")}}</span>
                <el-button type="primary" v-if="isMobile"  @click="jump('p')">{{$t("ms.goin")}}</el-button>
                <i class="el-icon-arrow-right" v-if="!isMobile"></i>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isMobile: window.innerWidth > 704
    };
  },
  computed: {
    ...mapGetters(["login"])
  },
  methods: {
    jump(type) {
      if (this.isMobile && type == "p") {
        this.$router.push({ name: "accountupdatepassword" });
      } else if (!this.isMobile && type == "m") {
        this.$router.push({ name: "accountupdatepassword" });
      }
    }
  }
};
</script>
<style lang="scss">
.accountinfo-wrap {
  .accountinfo-hd {
    margin: 32px 0;
    .head {
      width: 60px;
      height: 60px;
    }
    .username {
      font-size: 1.6rem;
      font-weight: bold;
      margin-bottom: 0;
      margin-top: 10px;
    }
    .tel {
      color:rgba(0, 0, 0, 0.5);
    }
  }
  .accountinfo-bd {
    padding: .3rem 3rem;
    .el-button {
      padding: 8px 10px;
      background-color: #2FBFFB
    }
  }
  ul {
    li {
      padding: 1rem;
      justify-content: space-between;
      align-items: center;
    }
    li:first-child {
      border-bottom: 1px solid #eee;
    }
  }
}
@media screen and (max-width: 700px) {
  .accountinfo-wrap {
    .accountinfo-bd {
      padding:.5rem
    }
    ul {
      li {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>

