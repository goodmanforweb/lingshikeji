<template>
<Page title="推广新用户注册" borderLine padding routerBack="/rw">
    <div class="cj">
        <div :class="`tcolor fw ${isMobile ? 'f18' : 'f24'} `">
            完成游戏成就
        </div>
        <div class="cj-desc tcolor f14 shadow">
            注册cj平台后，每推荐一位好友成功注册平台，
            即视为完成一次有效任务，
            好友每注册一次即可获得100CJOY
        </div>

        <div class="cj-list-desc">
            <div class="gcolor f14">
                矿机参数
            </div>

            <div class="cj-l-row">
                <div class="tcolor flex vc">
                    <div>
                        <span class="f24">100.00</span>
                        <span class="f14">CJOY/任务</span>
                        <img  class="cj-icon" src="../../assets/images/diam.png" alt="">
                    </div>
                    <span class="cj-dash flex1"></span>
                </div>
                <div class='f12 gcolor'>单任务产出</div>
            </div>

            <div class="cj-l-row">
                <div class="tcolor flex vc">
                    <div>
                        <span class="f24">1000000.00</span>
                        <span class="f14">CJOY</span>
                        <img  class="cj-icon" src="../../assets/images/cz.png" alt="">
                    </div>
                    <span class="cj-dash flex1"></span>
                </div>
                <div class='f12 gcolor'>矿机总产量</div>
            </div>


            <div class="cj-l-row">
                <div class="tcolor flex vc">
                    <div>
                        <span class="f24">365</span>
                        <span class="f14">天</span>
                        <img  class="cj-icon" src="../../assets/images/ticker.png" alt="">
                    </div>
                    <span class="cj-dash flex1"></span>
                </div>
                <div class='f12 gcolor'>矿机周期</div>
            </div>
        </div>

        <div class="cj-btns center">
            <router-link to="/guide">
                <div class="cj-btn-rw tcolor n-btn center">查看任务向导</div>
            </router-link>
            <div class="cj-btn-price f20 n-btn center">100000CJS</div>
            <span class="f14 tcolor">剩余： 189台</span>
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
.cj {
    width: 428px;
}
.cj-desc {
    border-radius: 4px;
    background: #fff;
    border-left: 3px solid #086599;
    padding: 16px;
}
.cj-icon {
    width: 12px;
    vertical-align: 10px
}
.cj-dash {
    border-bottom: 1px dashed #086599;
    height: 1px;
    margin-left: 16px;
}
.cj-dash:before {
    content:'';
    width: 8px;
    height: 8px;
    position: relative;
    top:-10px;
    background: #dfebf1;
    border: 1px solid #086599;
    display: inline-block;
}
.cj-btn-rw {
    border: 1px solid #086599;
    width: 240px;
    line-height: 45px;
    margin: 10px auto;
}
.cj-btn-price {
    background: #086599;
    color:#fff;
    width: 240px;
    line-height: 45px;
    margin: 10px auto;
}


.cj-desc {
    margin: 20px 0;
}
.cj-l-row {
    margin: 16px 0;
}
.cj-btns {
    margin-top: 100px;
}
</style>

