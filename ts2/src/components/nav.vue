<template>
    <div class="flex sb vc nav">
        <ul class="nav-l flex">
            <li>
                <router-link to="/index">{{$t('m.ts')}}</router-link>
            </li>
            <li>
                <router-link to="/cjs">{{$t('m.cjscenter')}}</router-link>
            </li>
            <li>
                <router-link to="/hub">{{$t('m.hubcenter')}}</router-link>
            </li>
            <li>
                <router-link to="/report">{{$t('m.report')}}</router-link>
            </li>
            <li @click="$store.commit('givenAboutPanel', {key: 'about',value: true})">
                <!-- <router-link to="/about">关于</router-link> -->
                {{$t('m.about')}}
            </li>
        </ul>
        <ul class="flex nav-r">
            <li @click="switchLang">{{$t('m.zh')}}</li>
            <li>
                <router-link to="/help">
                    <img  src="../assets/images/help.png" alt="">
                </router-link>
            </li>
            <li>
                <router-link to="/warn">
                    
                </router-link>
                <el-popover
                    placement="bottom"
                    width="210"
                    trigger="click">
                    <div class="notice">
                        <div class="n-tt tcolor fw">
                            {{$t('m.txx')}}
                        </div>
                        <div class="n-bd m20">
                            <ul>
                                <li>
                                    <div class="f14 tcolor n-tit">{{$t('m.czcg')}}</div>
                                    <span class="gcolor f12">2018.11.11 11:11:11</span>
                                    <div class="n-bk center shadow tcolor">
                                        <span class="fw">
                                            +10098
                                        </span>
                                        <span class="f12">CJOY</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="f14 tcolor n-tit">充值成功</div>
                                    <span class="gcolor f12">2018.11.11 11:11:11</span>
                                    <div class="n-bk center shadow tcolor">
                                        <span class="fw">
                                            +10098
                                        </span>
                                        <span class="f12">CJOY</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="f14 tcolor n-tit">充值成功</div>
                                    <span class="gcolor f12">2018.11.11 11:11:11</span>
                                    <div class="n-bk center shadow tcolor">
                                        <span class="fw">
                                            +10098
                                        </span>
                                        <span class="f12">CJOY</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img class="warn" slot="reference" src="../assets/images/warn.png" alt="">
                </el-popover>
            </li>
            <li>
                <router-link to="">
                    <img class="fresh" src="../assets/images/fresh.png" alt="">
                </router-link>
            </li>
            <li class="nav-r-btn tcolor" @click="$store.commit('givenAboutPanel', {key: 'pro',value: true})">
                <!-- <router-link to="/pro">
                PRO计划</router-link> -->
                {{$t('m.proplan')}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
        switchLang() {
            this.$i18n.locale = this.$i18n.locale == 'zh' ? 'en' : 'zh'
        }
    }
}
</script>


<style lang="scss">
.nav {
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    height: 60px;
    min-height: 60px;
    padding: 0 40px;
    transition: all .3s linear;
    
    color:#8E9FA9;
    li {
        cursor: pointer;
    }
}
.nav li a.router-link-active {
    color:#086599
}
.ts_bd_slider {
    .nav li a, .nav li {
        color: #fff;
        opacity: .65;
    }
    .nav li a.router-link-active {
        color:#fff;
        font-weight: bold;
        opacity: 1;
    }
    .nav-r {
        li img {
            filter: brightness(50);
        }
    }
}
.nav-l {
    li {
        padding: 0 10px;
        line-height: 40px;
    }
    li {
        .router-link-active {
            color: #086599;
            font-weight: bolder
        }
    }
}
.nav-r {
    li {
        margin: 0 8px;
        padding: 0 10px;
        line-height: 40px;
        img {
            width: 20px;
        }
    }
    .warn, .fresh {
        width: 18px;
    }
}
.nav-r-btn {
    height: 40px;
    line-height: 40px;
    background: #fff;
    color:#086599!important;
    border-radius: 4px;
    box-shadow:0px 8px 25px 0px rgba(25,101,147,0.1);
}
.n-bk {
    background: #E8F1F7;
    border-radius: 4px;
    line-height: 40px;
}
.n-bd {
    ul {
        margin-left: 14px;
        padding-left: 20px;
        border-left: 2px solid rgba(0, 89, 130, 0.399);
        li {
            margin: 4px 0 16px;
        }
    }
    .n-tit {
        position: relative;
    }
    .n-tit:before {
        content:'';
        position: absolute;
        top: 0;
        left: -30px;
        width: 18px;
        height: 18px;
        background: #086599;
        border-radius: 50%;
    }
}
</style>

