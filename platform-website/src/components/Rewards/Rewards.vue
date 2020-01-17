<template>
  <div class="rewards-wrap depowith-wrap dash-cont-box">
      <div class="re-top-hint clearfix" v-if="!isMobile">
        <span>Hello, {{login.user.username}}</span>
        <span class="fr" ><i class="el-icon-circle-check"></i>{{$t("ms.validphone") }}:{{login.user.phone | clip}}</span>
      </div>
      <div class="card">
        <div class="re-hd ">
          <div class="re-code">
          <canvas ref="qrcode"></canvas>
        </div>
        <div class="re-desc">
          <div class="mylink" v-html="$t('ms.mylink')"></div>
          <p class="copy-link flex" v-if="isMobile">
            <span id="myinvitationlink" class="copy-input" >{{invitationlink}}</span>
            <el-button ref="copyBtn" data-clipboard-target="#myinvitationlink" type="primary">{{$t("ms.copytext")}}</el-button>
          </p>
          <p class="createposter" v-if="isMobile">
            {{$t('ms.invitedid2')}}
            <span>{{login.user.invitecode}}</span>
            <el-button @click="createPoster">{{$t("ms.createmyposter")}}</el-button>
          </p>
        </div>
        </div>
        <div class="copy-link mcl" v-if="!isMobile">
            <div class="mcl-c"><span id="myinvitationlink" >{{invitationlink}}</span></div>
            <div class="mcl-c"><el-button ref="copyBtn" data-clipboard-target="#myinvitationlink" type="primary">{{$t("ms.copytext")}}</el-button></div>
        </div>
        <div class="createposter center" v-if="!isMobile">
           <span> {{$t('ms.invitedid2')}}</span>
            <span>{{login.user.invitecode}}</span>
            <span @click="createPoster">{{$t("ms.createmyposter")}}</span>
          </div>
      </div>
      <div class="card">
          <div><i class="icon game"></i>{{$t('ms.mygame')}}</div>
          <ul class="game-list-wrap">

            <li v-for="(game,index) in gamelists"  :key="index" class="game-list flex" @click="golist('m', game)">
              <div class="game-avator">
                <img :src="game.img || templateImg">
              </div>
              <span class="game-info">{{game.name}}</span>
              <div class="game-btn">
                <i class="el-icon-arrow-right" v-if="!isMobile"></i>
                <el-button type="primary" @click="golist('p', game)" v-if="isMobile" >{{$t("ms.gohub")}}</el-button>
              </div>
            </li>
          </ul>
      </div>
      <Poster :posterVisible="posterVisible" :posterText="posterText" @posterClose='posterVisible=false'></Poster>
  </div>
</template>

<script>
const templateImg = require("../../assets/images/gamepic.png");
import QRCode from "qrcode";
import util from "../../util/util";
import { mapActions, mapGetters } from "vuex";
import Clipboard from "clipboard";
import Poster from "../widget/poster/index";
export default {
  name: "Rewards",
  components: {
    Poster
  },
  data() {
    return {
      isMobile: window.innerWidth > 704,
      totalWakuang: 0,
      invitationlink: "",
      gamelists: [],
      templateImg,
      posterVisible: false,
      posterText: ""
    };
  },
  created() {
    this.createInvitationLink();
    this.getGameLists();
  },
  filters: {
    // clip: function(str) {
    //   return (
    //     str.substring(0, 8) + "..." + str.substring(str.length - 6, str.length)
    //   );
    // }
  },
  mounted() {
    this.createQrcode();
    new Clipboard(this.$refs.copyBtn.$el).on("success", e => {
      this.$message.info(this.$t("ms.copy"));
      e.clearSelection();
    });
  },
  computed: {
    ...mapGetters(["login"])
  },
  methods: {
    createQrcode() {
      QRCode.toCanvas(
        this.$refs.qrcode,
        this.invitationlink,
        {
          width: this.isMobile ? 160 : 120,
          height: this.isMobile ? 160 : 120,
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
    createInvitationLink() {
      return (this.invitationlink = `${
        location.origin
      }/#/logintab/register?inviteid=${this.login.user.invitecode}`);
    },
    golist(type, game) {
      if (type == "m" && !this.isMobile) {
        this.$router.push({
          path: "/dashboard/rewardrecord",
          query: { id: game.id, name: game.name }
        });
      } else if (type == "p") {
        this.$router.push({
          path: "/dashboard/rewardrecord",
          query: { id: game.id, name: game.name }
        });
      }
    },
    getGameLists() {
      util
        .getGameLists(
          {
            params: {
              size: 12,
              offset: 0
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            this.gamelists = res.data.list;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {});
    },
    createPoster() {
      this.posterVisible = true;
      this.posterText = this.login.user.invitecode;
    }
  },
  watch: {
    login: {
      deep: true,
      handler: function(n) {
        this.createQrcode();
      }
    },
    invitation: {
      deep: true,
      handler: function(n) {
        console.log(n);
      }
    }
  }
};
</script>

<style lang='scss'>
.el-dialog {
  border-radius: 4px;
}
.el-icon-circle-check {
  color: #93dbf9;
  padding-right: 6px;
}
.rewards-wrap {
  color: #333;
  font-size: 14px;

  .mylink {
    line-height: 1.8rem;
    padding-top: 5px;
  }
  > div:nth-child(1) {
    margin-bottom: 16px;
  }
  .game-list-wrap {
    margin: 0 -1.5rem;
  }
  .game-list {
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    padding: 1.2rem 1.5rem;
  }
  .game-list:hover {
    background-color: #f3fcff;
  }
  .game-list:last-child {
    border-bottom: none;
  }
  .game-avator {
    width: 150px;
    height: 60px;
    overflow: hidden;
    margin-right: 1rem;
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .game-btn {
    flex: 1;
    text-align: right;
    .el-button {
      background-color: #2fbffb;
      padding: 6px 10px;
      margin-right: 3rem;
    }
  }
  .game {
    background-image: url(../../assets/images/game.png);
    background-color: #000;
    background-size: 50% auto;
    background-position: center;
    vertical-align: -9px;
    margin-right: 0.6rem;
  }
}
.copy-input {
  border: none;
  border-bottom: 1px solid #333;
  border-radius: 0;
  background-color: inherit;
  outline: none;
  margin-right: 1.5rem;
  font-weight: bold;
  /* word-break: break-all; */
  /* word-wrap: break-word; */
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  width: calc(89% - 80px);
  white-space: nowrap;
  height: 1rem;
}
.copy-link {
  font-size: 12px;
  align-items: center;
  .el-button {
    background-color: #2fbffb;
    padding: 8px 15px;
    border: none;
  }
}
.createposter {
  > span:first-child {
    padding: 0 2rem;
  }
  .el-button {
    border: 1px solid #2fbffb !important;
    color: #2fbffb;
    padding: 10px;
  }
}
.card {
  border-radius: 6px;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s linear;
}
.card:hover {
  transform: translate3d(1px, 1px, 0px) scaleX(0.999999);
}

.re-top-hint {
  padding-bottom: 7px;
  span:first-child {
    font-size: 25px;
    font-weight: bold;
    color: #333;
    line-height: 4rem;
  }
  span:last-child {
    color: #808080;
  }
}
.re-top-hint {
}
.re-hd {
  display: flex;
}
.re-hd .re-code {
  display: inline-block;
}
.re-hd .re-desc {
  padding-left: 1rem;
  overflow: hidden;
}
.re-hd .re-desc p {
}

@media screen and (max-width: 704px) {
  .rewards-wrap {
    > div:nth-child(2) {
      margin: 0;
      border-top: 7px solid #f7f7f7;
      border-bottom: 7px solid #f7f7f7;
    }
    .game-list-wrap {
      margin: 0;
    }
    .game-list {
      padding: 1.2rem 0;
    }
    .game-list:last-child {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    .re-hd {
      align-items: center;
    }
    .mcl {
      display: table;
      margin-bottom: 1rem;
      .mcl-c {
        display: table-cell;
      }
      .mcl-c:first-of-type {
        word-break: break-all;
        word-wrap: break-word;
        span {
          font-weight: bolder;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;  //这里是在第二行有省略号
          overflow: hidden;
        }
      }
      .mcl-c:last-of-type {
        vertical-align: middle;
        padding-left: .9rem;
      }

    }
  }
  .card {
    padding: 0.5rem 16px;
    box-shadow: none;
  }
  .card:hover {
    transform: none;
  }
  .createposter {
    border-top: 1px solid #e6e6e6;
    line-height: 2rem;
    padding: 1rem 0;
    span:first-child {
      font-size: 1.3rem;
    }
    span:nth-child(2) {
      word-break: break-all;
      word-wrap: break-word;
      display: block;
      font-weight: bold;
    }
    span:last-child {
      color: #2fbffb;
      border-bottom: 1px solid #2fbffb;
    }
  }
  .re-top-hint {
    text-align: center;
    background-color: #fff;
    span {
      display: block;
      float: none;
    }
  }
}
</style>


