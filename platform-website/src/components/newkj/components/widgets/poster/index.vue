<template>
    <el-dialog
        :visible.sync="centerDialogVisible"
        width="350px"
        @close="dialogClose"
        v-if="!isMobile"
        center>
        <div  class="previewcontainer" ref="previewcontainer" v-loading="picloader" style="height: auto"></div>
        <span slot="footer" class="dialog-footer" v-if="!picloader">
          <el-button  class="kjbtn kjbtn-buy" type="primary" @click="downloadPoster">{{$t("ms.savelocal1")}}</el-button>
        </span>
      </el-dialog>
</template>

<script>
import createimg from "./poster";
import {mapGetters} from 'vuex';
export default {
  props: ["posterVisible", "posterText"],
  data() {
    return {
      centerDialogVisible: false,
      link: "",
      picloader: false
    };
  },
  created() {
      
  },
  computed:{
      ...mapGetters(['isMobile','login'])
  },
  methods: {
    createPoster() {
      if (this.isMobile) {
        this.$router.push({
          name: "poster",
          query: { inviteid: this.login.user.invitecode, number:  this.posterText}
        });
      } else {
        this.centerDialogVisible = true;
        this.picloader = true;
        const link = `${location.origin}/#/logintab/register?inviteid=${
          this.login.user.invitecode
        }`;
        createimg.create(this.$i18n.locale).then(() => {
          createimg.addInfo(this.posterText+this.$t('ms.kjin'), link, () => {
            this.picloader = false;
            createimg.preview(this.$refs.previewcontainer, "dom");
          });
        });
      }
    },
    downloadPoster() {
      createimg.download(this.$t("ms.myposter"));
    },
    dialogClose() {
      this.centerDialogVisible = false;
      this.picloader = false;
      this.$refs.previewcontainer.innerHTML = "";
      this.$emit("posterClose");
    }
  },
  watch: {
    posterVisible(n) {
      n && this.createPoster();
    }
  }
};
</script>


