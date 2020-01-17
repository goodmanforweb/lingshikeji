<template>
    <el-dialog
        :visible.sync="centerDialogVisible"
        width="350px"
        @close="dialogClose"
        v-if="isMobile"
        center>
        <div  class="previewcontainer" ref="previewcontainer" v-loading="picloader"></div>
        <span slot="footer" class="dialog-footer" v-if="!picloader">
          <el-button type="primary" @click="downloadPoster">{{$t("ms.savelocal1")}}</el-button>
        </span>
      </el-dialog>
</template>

<script>
import createimg from "./createImg";
export default {
  props: ["posterVisible", "posterText"],
  data() {
    return {
      centerDialogVisible: false,
      isMobile: window.innerWidth > 704,
      link: "",
      picloader: false
    };
  },
  methods: {
    createPoster() {
      if (!this.isMobile) {
        this.$router.push({
          name: "poster",
          query: { inviteid: this.posterText }
        });
      } else {
        this.centerDialogVisible = true;
        this.picloader = true;
        const link = `${location.origin}/#/logintab/register?inviteid=${
          this.posterText
        }`;
        createimg.create(this.$i18n.locale).then(() => {
          createimg.addInfo(this.posterText, link, () => {
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


<style lang="scss">
.previewcontainer {
  // height: 300px;
  canvas,
  img {
    max-height: 100%;
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
}
.poster-layer {
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // right: 0;
  // left: 0;
  // z-index: 9000;
  background-color: #fff;
  // transform: translateX(100%);
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
    canvas,
    img {
      width: 100%;
    }
  }
  .pl-fter {
    padding-bottom: 2rem;
  }
}
.poster-layer.active {
  // will-change: transform;
  // transform: translateX(0);
}
</style>


