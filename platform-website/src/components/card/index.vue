<template>
<div class="cardgame-wrap">
    <div class="cardgame">
        <section class="flex">
            <div class="cg-icon">
                <img src="../../assets/images/cardicon.png" alt="">
            </div>
            <div class="cg-tt">
                <p>GOGO JOY</p>
                <div>做JOY达人，分分秒秒挑战极限</div>
            </div>
        </section>
        <section class="flex">
            <div class="center">
                <canvas  ref="apple"></canvas>
                <p>IOS下载</p>
            </div>
            <div class="center">
                <canvas ref="andriod"></canvas>
                <p>Andriod下载</p>
            </div>
        </section>
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
    </div>
        
</div>
</template>

<script>
import QRCode from "qrcode";

export default {
    data() {
        return {

        }
    },
    mounted() {
        this.createQrcode(this.$refs.apple, location.origin+'/#/apple');
        this.createQrcode(this.$refs.andriod, location.origin+'/#/andriod');
    },
    methods: {
        createQrcode(dom, link) {
            QRCode.toCanvas(
                dom,
                link,
                {
                width: 160,
                height: 160,
                margin: 1
                },
                function(err) {
                if (err) {
                    console.warn("生成二维码出错:(");
                }
                }
            );
    },
    }
}
</script>

<style lang="scss">
.cardgame-wrap {
    min-height: 100vh;
    background: url(../../assets/images/cardgame.jpg) no-repeat center;
    background-size: cover;
    padding: 5rem 0;
}
.cardgame {
    max-width: 800px;
    margin: 0 auto;
    color:#fff;
    section:first-of-type {
        align-items: center;
    }
    section:nth-of-type(2){
        margin: 2rem 0;
        justify-content: space-around;
        border-top:1px solid #8d93d3;
        border-bottom:1px solid #8d93d3;
        padding: 2.5rem 0 1.5rem;
    }
    
    
}
.cg-tt {
        padding-left: 60px;
        p {
            font-size: 26px;
            font-weight: bolder;
            margin-top: 0;
        }
    }
.cgh-tt:first-of-type {
        font-size: 18px;
    }
    .cgh-tt {
        font-weight: bold;
    }





    .apple {
    position: relative;
    padding: 2rem;
    box-sizing: border-box;
    min-height: 100vh;
    background: url(../../assets/images/cardgame.jpg) no-repeat center;
    background-size: cover;
    color:#fff;
    font-size: 16px;
    .cg-icon {
        margin: 2rem 0;
        span {
            display: inline-block;
            img {
                width: 80%
            }
        }
    }
    .cg-tt {
        padding-left: 0
    }
    section {
        border-top: 1px solid #9192d4;
        padding-top: 1rem;
    }
    .apple-layer {
        position: fixed;
        top:0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 99;
        text-align: right;
        padding: 1rem;
        background-color: rgba(0,0,0,.8)
    }
}
.apple-btn-download {
    overflow: hidden;
    cursor: pointer;
    display: block;
    width: 70%;
    margin: 2rem auto;
    border-radius: 6px;
    background-color: #8585cd;
    text-align: center;
    line-height: 2rem;
    font-size: 24px;
    padding: 13px;
    img {
        width: 28px;
        vertical-align: -10px;
    }
    span {
        vertical-align: middle;
        font-weight: bold;
    }
}
</style>


