<template>
    <div class="poster-layer">
        <div class="pl-hd" v-if="me">{{$t("ms.seeposter")}}</div>
        <div class="pl-bd" ref="previewcontainer" v-loading='picloader'></div>
        <div class="pl-fter center" v-if="false">
          <el-button  type="primary" @click="downloadPoster">{{me ? $t("ms.savelocal") : $t('ms.gotoreg')}}</el-button>
        </div>
        <div class="savelocal" v-if="!picloader">
          <span>{{$t("ms.savelocal")}}</span>
        </div>
      </div>
</template>
<script>
import winPoster from "./widgets/poster/poster";
import {mapGetters} from 'vuex';
import Hub from 'hub';
export default {
//   props: ["posterVisible", "posterText"],
  data() {
    return {
      link: "",
      me: true,
      picloader:false
    };
  },
  created() {
    this.posterText = this.$route.query.inviteid;
    this.number = this.$route.query.number;
    this.type = this.number != undefined ? 'win' : 'invite';
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
        winPoster.create(this.$i18n.locale).then(() => {
          winPoster.addInfo(this.number, link, () => {
            this.picloader = false;
            const qrcodeimg = winPoster.preview(this.$refs.previewcontainer);
            this.isWeixin() && this.setSharePic(qrcodeimg);
          });
        });
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
      // const img = this.img = document.createElement('img');

      img.className = 'share_pic';
      // img.src = logo;
      const body = this.body = document.querySelector('body');
      body.insertBefore(img, body.firstElementChild);
    }
  }
}
</script>


