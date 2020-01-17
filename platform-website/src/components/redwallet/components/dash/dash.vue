<template>
    <div class="dash-wrap">
        <div class="dash">
            <div class="d-tt">
                <img src="../../assets/images/rbk.png" alt="">
                <div class="d-tt-info flex vc hc v">
                    <span>已摇到金币</span>
                    <div class="din">{{userinfo.received | currency}} HB</div>
                    <!-- <router-link to="/lj" >至礼金商城兑奖 > </router-link> -->
                </div>
            </div>
            <div class="d-card flex h-hcolor sb">
                <div class="d-yfc  icon-btn flex vc">
                    <span class="icon-pic coin"></span>
                    <div class="center">
                        <span>已发出金币</span>
                        <div class="din">{{userinfo.send}} CJT</div>
                    </div>
                </div>
                <div class="d-line"></div>
                <div class="d-yyq flex icon-btn vc">
                    <div class="center">
                        <span>助力好友</span>
                        <div class="din">{{zhuli || 0}}</div>
                    </div>
                    <span class="icon-pic share"></span>
                </div>
            </div>
            <div class="d-record">
                <div class="d-r-tab h-hcolor flex">
                    <router-link to="/dash/yd">
                        摇到记录
                    </router-link>
                    <router-link to="/dash/fc">
                        发出记录
                    </router-link>
                    <router-link to="/dash/yq">
                        助力记录
                    </router-link>
                </div>
                <router-view class="d-record-cont" ></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import util from '../../util/util';
export default {
    data() {
        return {
            zhuli: 0
        }
    },
    created() {
        this.getRecord();
    },
    beforeRouteEnter (to, from, next) {
        if(from.path.indexOf('reward') > -1  || !from.name) {

        }
        else {
            sessionStorage.setItem('dashbefore', from.path)
        }
        next();
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
    methods: {
        getRecord() {
            return util.getinvitedrecord({
                params: {
                    size: 12,
                    offset: 0
                }
            }, this)
            .then(res => {
                if(res.data.code == 0) {
                  this.zhuli = res.data.total || 0;
                }
            })
        }
    }
}
</script>
<style lang="scss">
.dash-wrap {
    background-color: #F4F4F4;
    .d-card {
        border-radius: 6px;
        width: 90%;
        margin: -47px auto 0;
        opacity: 0.81;
        background: rgba(255,255,255,.57);
        box-shadow: 0 4px 10px 0 rgba(165,165,165,0.50);
        padding: 10px;
        .icon-btn {
            margin-bottom: 0
        }
}
.icon-btn {
    display: flex;
}
}

.d-record {
    margin: 0 16px;
}
.d-r-tab {
    border-bottom: 1px solid rgba(235, 229, 229,.47);
    line-height: 2.5;
    font-size: .22rem;
    a {
        padding: 5px 10px;
        opacity: .47;
    }
    a.router-link-exact-active {
        opacity: 1;
        position: relative;
    }
    a.router-link-exact-active:before {
        content:'';
        position: absolute;
        bottom: -2px;
        right: 0;
        left: 0;
        margin: auto;
        width: 16px;
        height: 2px;
        background-color: #822020

    }
}
.d-tt {
    position: relative;
    min-height: 250px;
}
.d-tt-info {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.d-record-cont,.ex-list {
    height: 40px;
    white-space: nowrap;
    max-height: 40px;
    line-height: 40px;
    font-size: .26rem;
    color:#3C3C3C;
    text-transform: capitalize;
}
</style>

