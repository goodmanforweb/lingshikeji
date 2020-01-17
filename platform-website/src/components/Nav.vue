 <template>
  <div class="nav" :class="{darkTheme: $route.name == 'game' || $route.name == 'room', 'nav-fixed': isFixed}">
     <div class="note-slider" v-show="($route.name == 'index')&&noteshow&&!isFixed&&!showchip&&noteLists.length>0">
          <div class="note-box flex">
            <span>{{$t("ms.newreport")}}:</span>
            <div class="note-text-box marquee">
                <div class="bar">
                  <router-link 
                  v-for="(report, key) in noteLists" 
                  :key="key" 
                  :to="{path:'/publicreport',query:{id: report.id}}">
                  {{`${report.title}`}}
                  </router-link>
                </div>
            </div>
          </div>
    </div>
    <div id="nav-box" :style="`maxWidth:${($route.name =='game' || $route.name == 'room') ? 'none' : '1500px'}`">
      
      
      <div v-if="!['game','room'].includes($route.name)" class="logo" :class="{gameactive: $route.name == 'game'}">
        <router-link to="/index" >
          <img v-if="$route.name == 'index'&&!isFixed" src="../assets/images/logotext.png" :alt="$t('ms.logo')">
          <img v-if="$route.name != 'index'&&$route.name != 'game' &&$route.name != 'room' || isFixed" src="../assets/images/logotextb.png" alt="$t('ms.logo')">   
        </router-link>
      </div>
      <div class="funnyup" v-else-if="$route.name == 'room'">
          <span class="cjoy">
            <router-link to="/index">
                <img src="../assets/images/lemonlogo.png" alt="">
                <img src="../assets/images/logotext.png" alt="">
            </router-link>
          </span>
          <span class="funny" >
            <img src="../assets/images/funny.png" alt="">
            <span class="gamelogo">Funny Up</span>
          </span>
        </div>
      <div class="funnyup" v-else-if="$route.name == 'game'">
          <span class="cjoy">
            <router-link to="/index">
                <img src="../assets/images/lemonlogo.png" alt="">
                <img src="../assets/images/logotext.png" alt="">
            </router-link>
          </span>
          <span class="funny">
            <router-link to="/room">
              <img src="../assets/images/funny.png" alt="">
              <span class="funny-text">
                <i class="gamelogo">Funny Up</i>
                <br>
                <i class="gamedesc">{{gameLevel}}</i>
              </span>
            </router-link>
          </span>
        </div>
      
      <div class="flex nav-left-wrap">
        <ul class="nav-item" v-if="$route.name == 'index'&&!isMobile">
          <li><router-link to="/publicreport">{{$t("ms.report")}}</router-link></li>
          <!-- <li>{{$t("ms.whitebook")}}</li> -->
          <li  @click="goToDeposit('game')">{{$t("ms.game")}}</li>
          <!-- <li class="active" @click="goToDeposit('gamecoin')">TOKEN</li> -->
          
          <!-- <li>{{$t("ms.mall")}}</li> -->
          <li><router-link to="/faq">FAQ</router-link></li>
          <li @click="chooseLang($event, 'no')">{{$t("ms.lang")}}</li>
          <li class="line"></li>
          <li class="login-btn" v-if="!login.token" @click="jump('/logintab/login')">{{$t("ms.login")}}</li>
        </ul>
        <div class="pc-login" v-if="login.token&&$route.name != 'game'" @click="isMobile ? showchip = !showchip : jump('/dashboard/rewards')">
          <span class="man-info">
            <!-- <i class="moon"></i>
            <i class="moon"></i>
            <i class="star"></i>
            <i class="star"></i>
            <i class="star"></i>
            <i class="sun"></i> -->
            <i class="head" :style="`backgroundImage: url(${login.head})`"></i>
          </span>
        </div>
        <span class="exchangecenter" v-if="$route.name == 'game' && isBigScreen" @click="showRightPanel"><span>{{$t("ms.exchangecenter")}} </span><i class="el-icon-arrow-right"></i></span>
      </div>


      <span class="lines" v-if="isMobile&&!login.token" @click="showchip = !showchip" :class="{active: showchip}">
        <i></i>
        <i></i>
        <i></i>
      </span>
      <div 
        class="nav-layer flex"  
        v-if="isMobile"  
        v-show="showchip" 
        @click.stop="!true"
        ref="layer"
        >
        <div class="nl-cont">
          <ul :class="{disable: !login.token}">
              <li >
                <span v-if="login.token" @click="jump('/dashboard/rewards')">Hello, <i class="musername">{{login.user.username}}</i></span>
                <span v-if="!login.token" @click="jump('/loginTab/login')">{{$t("ms.login")}}</span>
              </li>
              <li class="s" @click="jump('/publicreport')">{{$t("ms.report")}}</li>
              <template v-if="$route.name == 'index'"  >
                <li class="s" @click="goToDeposit('game')" >{{$t("ms.game")}}</li>
                <!-- <li class="s" @click="goToDeposit('gamecoin')">TOKEN</li> -->
              </template>
              <template v-if="login.token">
                <li class="s" @click="jump('/dashboard/rewards')" >{{$t("ms.myhub")}}</li>
                <li class="s" @click="jump('/dashboard/walletlist')">{{$t("ms.mywallet")}}</li>
                <li class="s" @click="jump('/dashboard/accountindex')">{{$t("ms.accountmaneger")}}</li>
                <!-- <li @click="jump('/PublicReport')">{{$t("ms.report")}}</li> -->
                <li class="s" @click="exit">{{$t("ms.exit")}}</li>
              </template>
              
          </ul>
          <div class="nl-ft"> 
            <span @click="chooseLang($event, 'zh')">{{$t("ms.zh")}}</span>  
            <span @click="chooseLang($event, 'en')">{{$t("ms.en")}}</span>
            <a  @click="jump('/faq')"   class="help" ><i class="el-icon-question"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hub from "hub";
import util from "util";
export default {
  name: "Nav",
  data() {
    return {
      noteshow: true,
      noteLists: [],
      showchip: false,
      showlang: false,
      isMobile: window.innerWidth < 704,
      isBigScreen: window.innerWidth < 1500,
      gameLevel: "",
      isFixed: false,
      hasPaddingTop: true
    };
  },
  created() {
    this.init();
    this.getNote();
    window.addEventListener("resize", this.ajust, false);
    this.$route.name == "index" &&
      window.addEventListener("scroll", this.scrollHandler, false);
  },
  mounted() {
    
  },
  computed: {
    ...mapGetters(["login", "balance", "lang"])
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.ajust, false);
    window.removeEventListener("scroll", this.scrollHandler, false);
  },
  methods: {
    getNote() {
      util
        .getReports(
          {
            params: {
              size: 3,
              offset: 0,
              lang: this.$i18n.locale,
              orderby: 'create_time',
              order:'desc'
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.status == 200) {
            const now = +new Date();
            this.noteLists = res.data.list.filter(article => {
              // return true;
              return (
                now - new Date(article.createtime).getTime() <=
                3 * 24 * 60 * 60 * 1000
              );
            });
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
    },
    goToDeposit(type) {
      // this.$store.commit("givenToDepositState", true);
      this.isMobile && (this.showchip = false);
      Hub.$emit("scrollToDeposit", type);
    },
    ajust() {
      this.isBigScreen = window.innerWidth < 1500;
    },
    scrollHandler() {
      if (this.ticker) {
        clearTimeout(this.ticker);
      }
      this.ticker = setTimeout(() => {
        this.scrollHanlderDispather();
      }, 100);
    },
    scrollHanlderDispather() {
      let stop = util.getScrollTop();
      if (stop > 200) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
      Hub.$emit("navChange", this.isFixed);
    },
    calcLayerSize() {
      const rate = this.login.token ? 0.65 : 1;
      this.$refs.layer.style.fontSize =
        (this.$refs.layer.clientHeight * 24 * rate) / 680 + "px";
    },
    showRightPanel() {
      this.$store.commit("givenRightPanel", true);
    },
    exit() {
      this.$store.commit("exit");
      this.$router.push({ path: `/index` });
    },
    jump(path) {
      this.showchip = false;
      this.$router.push({ path });
    },
    chooseLang($event, lang) {
      if (lang == "no") {
        lang = this.$i18n.locale == "zh" ? "en" : "zh";
      } else {
        let target = $event.target;
        if (target.tagName.toLowerCase() == "li") {
          lang = target.getAttribute("value");
        }
      }

      this.$store.commit("givenLang", lang);
    },
    init() {
      if (this.$route.name == "Index") {
        this.getNote();
      }
      let level = this.$route.query.room;
      if (level) {
        this.gameLevel = {
          basic: this.$t("ms.basicgame"),
          normal: this.$t("ms.normalgame"),
          advance: this.$t("ms.advancegame")
        }[level];
      }
    },
    
  },
  watch: {
    lang: {
      deep: true,
      handler: function(n) {
        this.$i18n.locale = n;
      }
    },
    "$i18n.locale": function(n) {
      document.title = this.$t("ms.logo");
    },
    $route: function() {
      this.init();
    },
    showchip: function(n) {
      n
        ? (document.body.className += " noscroll")
        : (document.body.className = document.body.className
            .split(" ")
            .filter(cn => cn != "noscroll")
            .join(" "));

      n && this.$nextTick(this.calcLayerSize);
    }
  }
};
</script>
<style lang="scss" scoped>
.funnyup {
  .funny {
    margin-left:1rem;
    border-left:1px solid #373d42;
    img {
      width:3.7rem;
      padding: 0 1rem;
      vertical-align: middle;
      display: inline-block;
    }
    .funny-text {
      vertical-align: middle;
      display: inline-block;

    }
  }
  
}
.musername {
  text-transform: lowercase;
}
.note-slider {
  height: 3rem;
  line-height: 3rem;
  color: rgba(255, 255, 255, 0.3);
  background-color: #730201;
  box-shadow: 0 4px 19px 0 rgba(0, 0, 0, 0.3);
  .note-box {
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 16px;
  }
  .note-text-box {
    overflow: hidden;
    flex: 1;
    .bar {
      display: inline-block;
      padding-left: 100%;
      white-space: nowrap;
    }
    a {
      padding: 0 2rem;
      // display: inline-block;
      // padding-left: 100%;
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
button.el-button:not(.kjbd button) {
  border-color: transparent;
}
.logo.gameactive {
  overflow: hidden;
  position: relative;
  padding-left: 15px;

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  
}
.gamelogo {
  font-size: 1.2rem;
}
.gamedesc {
  font-size: 12px;
}
.exchangecenter {
  cursor: pointer;
  i {
    color: #606569;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
}
.man-info {
  white-space: nowrap;
  cursor: pointer;
  .moon,
  .star,
  .sun {
    width: 22px;
    height: 22px;
    display: inline-block;

    // background-image: url(../assets/images/stars.png);
    // background-repeat: no-repeat;
    background-image: url(../assets/images/icon.png);
    background-repeat: no-repeat;
    background-size: 100px auto;
    margin: 0 2px;
    vertical-align: middle;
  }
  .moon {
    background-position: -40px -1px;
  }
  .star {
    background-position: -71px -1px;
  }
  .sun {
    background-position: -9px -1px;
  }
  .head {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-image: url(../assets/images/sa.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 50%;
    vertical-align: middle;
  }
}
.nav {
  color:#fff;
  .nav-left-wrap {
    align-items: center;
  }
}
.nav-item {
  list-style: none;
  li {
    display: inline-block;
    border-radius: 4px;
    padding: 0 1rem;
    line-height: 2rem;
    cursor: pointer;
    text-transform: uppercase;
  }
  li.active {
    color: #fff04e;
    background-color: #42348b;
  }
  li.line {
    background-color: rgba(255, 255, 255, 0.2);
    height: 20px;
    width: 1px;
    padding: 0;
    vertical-align: middle;
    margin-right: 1rem;
  }
  li.login-btn {
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    margin: 0 1.5rem;
    cursor: pointer;
  }
}
.lines {
  i {
    display: block;
    width: 30px;
    height: 4px;
    background-color: #fff;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }
  i:nth-child(2) {
    margin: 4px 0;
  }
}

.nav-fixed .lines i {
  background-color: #000;
}
.lines.active i:nth-child(2){  
  opacity: 0;  
}
.lines.active i:nth-child(1){
  transform: translateY(11px) rotate(45deg);
}
.lines.active i:nth-child(3){
  transform: translateY(-5px) rotate(-45deg);
}
.nav {
  height: 4rem;
  // background-color: #fff;
  color: #fff;
  // transition: background-color 0.5s linear;
  position: relative;
  z-index: 900;
}
.darkTheme {
  background-color: #20272c !important;
}
.nav-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  color: #000;
  padding-top: 0;
  background-color: #fff;
  // animation: slideDownUp .3s ease-in-out;
}
.logo {
  font-size: 1.6em;
  transition: all 0.3s linear;
  a {
    img {
      vertical-align: middle;
      width: 175px;
    }
  }
}

.logo img {
  // width: 1.4rem;
  // padding-right: 4px;
  // vertical-align: -8px;
}
#nav-box {
  // width: 80%;
  max-width: 1500px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-box {
  font-size: 1em;
}
.login-box .login {
  padding: 0 10px;
}
.help img {
  vertical-align: middle;
  width: 20px;
}
.nl-cont li:first-child span {
  color: #ff7a40;
  padding-right: 0.5rem;
}

.nav-layer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2000;
  top: 4rem;
  background-color: #fff;
  align-items: center;
  color: #000;
  font-size: 20px;
}
.nl-cont {
  text-align: center;
  line-height: 2em;
  font-size: 1.4em;
  flex: 1;
  margin-top: -150px;
  li {
    text-transform: capitalize;
  }
  .disable {
    li.s {
      color: #ccc;
    }
  }
  li:first-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
}
.nl-ft {
  font-size: 1rem;
  position: absolute;
  width: 100%;
  bottom: 20px;

  span:nth-child(2) {
    color: #ccc;
    border-left: 1px solid #ccc;
  }
  .help {
    color: #808080;
  }
}
.nl-ft span,
.nl-ft a {
  padding: 0 10px;
}
@media (max-width: 704px) {
  .note-slider {
    .note-text-box {
      height: 3rem;
      overflow: hidden;
      .bar {
        padding-left: 0;
        display: block;
        animation-name: marqueeup;
        a {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .nav {
    // background-color: #f7f7f7;
  }
  #nav-box {
    width: auto;
  }
  .logo {
    a {
      img {
        width: 36%;
      }
    }
  }
  .log-userinfo {
    display: none;
  }
}
@media (max-width: 350px) {
}

@media (max-width: 830px) {
  .log-userinfo {
    display: none;
  }
}
</style>
