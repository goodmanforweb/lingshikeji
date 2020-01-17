
<template>
<Page :title="$t('m.zhposter')" borderLine padding routerBack="/tool" 
class="flex v" style="width: 100%;" pcPanelClassName='toolpanel' :pcPanelFullScreen="true" :pcIsSlot='true'>
    <div class="poster re flex flex1 hc vc" style="height:100%">
        <div class="poster-bd">
            <div class="tcolor fw" v-if="!isMobile">{{$t('m.zsposter')}}</div>
            <div class="poster-cube flex m20" :class="{v:isMobile}">
                <div class="poster-sharepic block" >
                    <div  class="previewcontainer center" ref="previewcontainer" v-loading="picloader"></div>
                    <div class="center pt16">
                        <span class="n-btn btn-save tcolor f12" @click="downloadPoster">
                            <img style="width: 12px" src="../../assets/images/download.png" alt="">
                            <span>{{isShowLongPress ? $t('m.presssave') : $t('m.save')}}</span>
                        </span>
                    </div>
                </div>
                <div class="flex flex1 v links-blocks" >
                    <div class="block flex1 re links-block1" :class="{m16: isMobile}">
                        <div class="tcolor fw">{{$t('m.tglink')}}</div>
                        <span class="gcolor f12">{{$t('m.mynodelink')}}</span>

                        <div class="link tcolor m20 towrap" id='copylink'>
                           {{url}}
                        </div>
                        <span class="copy-icon"  ref="copylink" data-clipboard-target="#copylink"></span>
                    </div>
                    <div class="block flex1 re">
                        <div class="tcolor fw">{{$t('m.tgid')}}</div>
                        <span class="gcolor f12">{{$t('m.mynodeid')}}</span>
                        <div class="tcolor m20 towrap" id="copycode">
                            {{invitecode}} 
                        </div>
                        <span class="copy-icon"  ref="copycode" data-clipboard-target="#copycode"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Page>
</template>
<script>
import {mapGetters} from 'vuex';
import Clipboard from "clipboard";
import createimg from './poster/createImg'
export default {
    data() {
        return {
            invitecode:'',
            url:'',
            picloader: false
        }
    },
    created() {
        this.getInviteID()
        .then(() => {
            this.createPoster();
        })
    },
    computed: {
        ...mapGetters(['isMobile']),
        isShowLongPress() {
            return util.isWX() && this.isMobile;
        }
    },
    mounted() {
        this.createCopy();
    },
    methods: {
        createPoster() {
            this.picloader = true;
            createimg.create(this.$i18n.locale).then(() => {
                createimg.addInfo(this.invitecode, this.url, () => {
                    this.picloader = false;
                    createimg.preview(this.$refs.previewcontainer);
                });
            });
        },
        downloadPoster() {
            createimg.download(this.$t("m.myposter"));
        },
        createCopy() {
            new Clipboard(this.$refs.copycode).on("success", e => {
                this.$message.info(this.$t("m.copysuc"));
                e.clearSelection();
            });
            new Clipboard(this.$refs.copylink).on("success", e => {
                this.$message.info(this.$t("m.copysuc"));
                e.clearSelection();
            });
        },
        getInviteID() {
            return request.getInviteID()
            .then(res => {
                this.invitecode = res.data.invitecode;
                this.url = window.location.origin + '/#/lg/registar?inviteid=' + this.invitecode;
            }) 
        }
    }
}
</script>

<style lang="scss">
.pc {
    .poster-sharepic {
        margin-right: 8px;
        width: 360px;
        height:476px
    }
    .links-blocks {
        margin-left:8px;
        max-width: 465px
    }
    .links-block1 {
        margin-bottom: 16px;
    }
    .previewcontainer {
        height: calc(100% - 40px);
        img {
            max-height: 100%;
            width: auto;
        }
    }
}
.poster {
    .btn-save {
        border: 1px solid #086599;
        border-radius: 20px;
        padding: 3px 10px;
        img, span {
            vertical-align: middle
        }
    }
    .copy-icon {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 18px;
        height: 18px;
        cursor: pointer;
        background: url(../../assets/images/copy.png) no-repeat center/contain;
    }
}
.toolPanel {
    .rp-aside {
        display: flex;
    }
}
</style>

