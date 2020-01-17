<template>
    <div class="lj">
        <div class="lj-tt">
            <div class="lj-tt-icon">
                <img src="../../assets/images/ljtt.png" alt="">
                <div class="lj-tt-icon-info flex v sa">
                    <div class="name">
                        <span class="lj-name">YOYO</span>
                        <div class="lj-level icon-btn">
                            <i class="icon-pic vip1"></i><i class="icon-text">VIP1</i>
                        </div>
                    </div>
                    <div class="v-c din">
                        <i class="h-coin"></i>
                        <i>10000000 HB</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="lj-kjs">
            <ul class="v-b-card flex sb">
                <li class="center">
                    <router-link to="/detail">
                        <img src="" alt="">
                        <div class="h-c-name">CJ_20</div>
                        <span>1000CJT+200SUC</span>
                    </router-link>
                </li>
                <li class="center">
                    <router-link to="/detail">
                        <img src="" alt="">
                        <div class="h-c-name">CJ_20</div>
                        <span>1000CJT+200SUC</span>
                    </router-link>
                </li>
                <li class="center">
                    <router-link to="/detail">
                        <img src="" alt="">
                        <div class="h-c-name">CJ_20</div>
                        <span>1000CJT+200SUC</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="lj-ex">
            <div class="v-b-tt">
                <span>兑换记录</span>
            </div>
            <ul class="ex-list">
                <li class="flex sb">
                    <div>
                        <span>1月15日</span>
                        <span>no.809809890</span>
                    </div>
                    <div>-19</div>
                </li>
                <li class="flex sb">
                    <div>
                        <span>1月15日</span>
                        <span>no.809809890</span>
                    </div>
                    <div>-19</div>
                </li>
                <li class="flex sb">
                    <div>
                        <span>1月15日</span>
                        <span>no.809809890</span>
                    </div>
                    <div>-19</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.lj-tt {
    background: #2E2E2E;
    padding-top: 80px;
}
.lj-tt-icon {
    width: 90%;
    margin: 0 auto;
    position: relative;
}
.lj-tt-icon-info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 16px;
    box-sizing: border-box;

}
.lj-name {
color: #5E5E5E;
text-shadow: 0 1px 2px rgba(3,3,3,0.44);
}

.lj .lj-level {
    .icon-pic {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-size: 100% auto;
        position: relative;
        z-index: 1;
    }
    .vip1 {
        background-position: 0 -39px;
    }
    .vip0 {
        background-position: 0 2px;
    }
    .vip2 {
        background-position: 0 -74px;
    }
    .vip3 {
        background-position: 0 -116px;
    }
    .icon-text {
        display: inline-block;
        color: #CBAA88;
        background: rgba(255, 255, 255, 0.637);
        padding: 0 16px;
        border-radius: 10px;
        margin-left: -10px;
        position: relative;
        z-index: 0;
    }
}
.v-c {
    font-size: .5rem;
        color:#710001;
    i {
        vertical-align: middle;
    }
    .h-coin {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url(../../assets/images/icon.png) no-repeat 0 0/100%;
    }
}
.v-b-card {
    border-radius: 4px;
    padding: 10px;
    box-shadow: 3px 1px 9px 0 rgba(168,162,162,0.27);
    .h-c-name {
        font-size: .24rem
    }
    li span {
        color:#EB6106;
        font-size: .2rem;
    }
}
.lj-kjs {
    padding: 16px;
}
.lj-ex {
   border-top: 16px solid #ECECEC
}
.ex-list {
    li {
        border-bottom: 1px solid rgba(235, 229, 229, 0.47)
    }
}


</style>

