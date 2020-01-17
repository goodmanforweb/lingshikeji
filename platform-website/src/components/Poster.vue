<template>
    <div class="poster-layer">
        <div class="pl-hd" v-if="me">{{$t("ms.seeposter")}}</div>
        <div class="pl-bd" ref="previewcontainer" v-loading='picloader' :style="{fontFamily}"></div>
        <div class="savelocal" v-if="!picloader">
          <span>{{$t("ms.savelocal")}}</span>
        </div>
      </div>
</template>
<script>
import createimg from "./widget/poster/createImg";
import winPoster from "./newkj/components/widgets/poster/poster.js";
import redPoster from "./widget/poster/redwallet.js";
import {mapGetters} from 'vuex';
import Hub from 'hub';
export default {
  data() {
    return {
      link: "",
      me: true,
      picloader:false,
      fontFamily:''
    };
  },
  created() {
    this.posterText = this.$route.query.inviteid;
    this.number = this.$route.query.number;
    this.type = this.$route.query.type;
    this.type = this.type || (this.number != undefined ? 'win' : 'invite');
    //设置字体
    this.fontFamily = {red:'din', win: 'MFLingHei', invite:''}[this.type];
    if(this.login.user && (this.login.user.invitecode == this.posterText)) {
      this.me = true;
    }
    else {
      this.me = false;
      Hub.$emit("posternonav", true);
    }
    this.setWeinxinurl();
    this.posterText && this.createPoster();
  },
  computed: {
    ...mapGetters(["login"])
  },
  beforeDestroy() {
    this.img && this.body && this.body.removeChild(this.img);
  },
  methods: {
    isWeixin() {
      let ua = window.navigator.userAgent.toLowerCase();
      return ua.indexOf('micromessenger') > -1
    },
    setWeinxinurl() {
      if(!this.isWeixin()) return false;
      if(!localStorage.getItem('fresh')) {
          setTimeout(() => {
            localStorage.setItem('fresh', '1');
            window.location.reload();
        }, 500);
      }
      else {
          localStorage.removeItem('fresh');
      }
    },
    createPosterByType(link) {
      if(this.type == 'win') {
        setTimeout(() => {
          winPoster.create(this.$i18n.locale).then(() => {
            winPoster.addInfo(this.number+this.$t('ms.kjin'), link, () => {
              this.picloader = false;
              const qrcodeimg = winPoster.preview(this.$refs.previewcontainer);
              this.isWeixin() && this.setSharePic(qrcodeimg);
            });
        });
        }, 1000)
      }
      else if(this.type == 'invite') {
        createimg.create(this.$i18n.locale).then(() => {
          createimg.addInfo(this.posterText, link, () => {
            this.picloader = false;
            const qrcodeimg = createimg.preview(this.$refs.previewcontainer);
            this.isWeixin() && this.setSharePic(qrcodeimg);
          });
        });
      }
      else if(this.type == 'red') {
        setTimeout(() => {
          redPoster.create(this.$i18n.locale).then(() => {
            redPoster.addInfo(this.number+"HB", link, () => {
              this.picloader = false;
              const qrcodeimg = redPoster.preview(this.$refs.previewcontainer);
              this.isWeixin() && this.setSharePic(qrcodeimg);
            });
        });
        }, 1000)
      }
    },
    createPoster() {
      this.picloader = true;
      const link = `${location.origin}/#/logintab/register?inviteid=${
        this.posterText
      }`;
      this.createPosterByType(link);
    },
    downloadPoster() {
      if(this.me) {
        createimg.download(this.$t("ms.myposter"));
      }
      else {
        this.$router.push({
          name: 'register',
          query: {
            inviteid: this.posterText
          }
        })
      }
    },
    setSharePic(qrcodeimg) {
      let img = qrcodeimg
      img.className = 'share_pic';
      const body = this.body = document.querySelector('body');
      body.insertBefore(img, body.firstElementChild);
    }
  }
}
</script>
<style lang="scss">

.savelocal {
  background-color: #f7f7f7;
  line-height: 3rem;
  text-align: center;
  font-size: 16px;
}
.poster-layer {
  background-color: #fff;
  transition: all 0.3s linear;
  overflow-y: auto;
  color: #000;
  .pl-hd {
    background-color: #f7f7f7;
    line-height: 3rem;
    text-align: center;
    position: relative;
    i {
      position: absolute;
      left: 1rem;
      top: 0;
      bottom: 0;
      height: 3rem;
      line-height: 3rem;
      width: 1rem;
      padding-right: 2rem;
    }
  }
  .pl-bd {
    padding: 1rem;
    min-height: 200px;
    canvas {
      width: 100%;
    }
    img {
        width: 100%
    }
  }
  .pl-fter {
    padding-bottom: 2rem;
  }
}

</style>


