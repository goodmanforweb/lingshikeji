<template>
    <div class="apple">
        <div class="cg-icon center">
            <span>
                <img src="../../assets/images/cardicon.png" alt="">
            </span>
        </div>
        <div class="cg-tt center">
            <p>GOGO JOY</p>
            <div>做JOY达人，分分秒秒挑战极限</div>
        </div>
        <div class="apple-btn-download" @click="download" v-loading="dloader">
            <img src="../../assets/images/appleicon.png" alt="">
            <span>点击下载</span>
        </div>
        <section>
            <p class="cgh-tt">IOS下载指南：</p>
            <p class="cgh-tt">1、下载App</p>
            <div>扫一扫后使用苹果手机自带的 Safari 浏览器打开安装链接，点击安装到手机上。 
（注：若微信内无法打开下载链接，请复制下载网址到浏览器打开，进行安装步骤）</div>

            <p  class="cgh-tt">2、信任应用证书</p>
            <div>新下载APP的用户会出现提示框“未受信任的企业级开发者”。此时需要打开：
手机自带的设置 -> 通用 -> 设备管理 -> 选择应用 -> 点击信任。</div>

            <p  class="cgh-tt">3、畅享游戏</p>
            <div>信任应用完毕后，打开App，就可以尽情体验了。</div>

        </section>
        <a :href="url" style="display:none" ref="link" ></a>
        <div class="apple-layer" v-if="layer">
            <p>请点击右上角选择
                <br>
            “在浏览器中打开”      </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            layer: false,
            dloader: false,
            url: 'itms-services://?action=download-manifest&url=https://cjoycn.oss-cn-hangzhou.aliyuncs.com/games/cjtqp_601.plist'
        }
    },
    methods: {
        isWeixin() {
            let ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf('micromessenger') > -1
        },
        download() {
            if(this.isWeixin()) {
                this.layer = true;
            }
            else {
                this.dloader = true;
                this.$refs.link.click();

                this.$refs.link.onload = () => {
                    this.dloader = false;
                }
                this.$refs.link.onerror = () => {
                    this.dloader = false;
                }
                setTimeout(() => {
                    this.dloader = false;
                }, 2000)
            }
        }
    }
}
</script>


<style lang="scss">

</style>


