
<template>
<Page title='专属海报' borderLine padding routerBack="/tool" class="flex v" style="width: 100%">
    <div class="poster re flex flex1 hc vc">
         <span class="re-close" @click="$emit('update:show', false)">完成</span>

        <div class="poster-bd">
            <div class="tcolor fw" v-if="!isMobile">专属海报</div>
            <div class="poster-cube flex m20" :class="{v:isMobile}">
                <div class="poster-sharepic block" >
                    <div class="poster-img">

                    </div>
                    <div class="center">
                        <span class="n-btn tcolor f12">
                            <img style="width: 12px" src="../../assets/images/download.png" alt="">
                            <span>保存</span>
                        </span>
                    </div>
                </div>
                <div class="flex flex1 v links-blocks" >
                    <div class="block flex1 re links-block1" :class="{m16: isMobile}">
                        <div class="tcolor fw">推广链接</div>
                        <span class="gcolor f12">我的节点链接</span>

                        <div class="link tcolor m20 towrap">
                            https://testnet.cjoy.games/#/logintab/register?inviteid=3NMw1sv8XsEy8A5XKJW7G155Ju73eHWttm6 
                        </div>
                        <span class="copy-icon"></span>
                    </div>
                    <div class="block flex1 re">
                        <div class="tcolor fw">推广ID</div>
                        <span class="gcolor f12">我的节点ID</span>
                        <div class="tcolor m20 towrap">
                            3NMw1sv8XsEy8A5XKJW7G155Ju73eHWttm6 
                        </div>
                        <span class="copy-icon"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Page>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
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
}
.poster {
    .n-btn {
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

