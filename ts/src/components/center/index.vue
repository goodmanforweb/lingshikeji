<template>
    <Page :title="$t('m.mancenter')" borderLine padding routerBack='/index'>
        <span slot="layer-right-btn" class="cp" @click="$router.push('/resetpassindex')"><img style="width: 16px" src="../../assets/images/gear.png" alt=""></span>
        <div class="flex1 mancenter">
            <div class="head-pop block">
                <div class="tcolor center">
                    <div class='head hcenter'>
                        <img src="../../assets/images/man.png" alt="">
                    </div>
                    <div class="name fw">{{userInfo.username}}</div>
                    <div class="f12">{{userInfo.phone}}</div>
                </div>
                
                <div class="star-line flex tcolor f12 vc m16" v-if="0">
                    <div class="star-icons">
                        <span><img style="width: 20px" src="../../assets/images/star.png" alt=""></span>
                        <div>VIP{{vip.viplevel}}</div>
                    </div>
                    <div class="star-lines flex flex1">
                        <div class="flex1 center active">
                            <span></span>
                        </div>
                        <div class="flex1 center">
                            <span></span>
                            <div>VIP{{vip.viplevel+1}}</div>
                        </div>
                    </div>
                </div>

                <div class='m20'>
                    <div class="balance-row tcolor center">
                        <span class="fw f26">{{balance.cjs.value | currency(4)}}</span>
                        <span>CJS</span>
                    </div>
                    <div class="balance-row tcolor center">
                        <span class="fw f26">{{balance.cjoy.value | currency(4)}}</span>
                        <span>CJOY</span>
                    </div>
                </div>

                <div class="mhead-btns flex tcolor f14" >
                     <!-- @click="$router.push('/my')" -->
                     <el-tooltip :content="$t('m.tosee')" placement="top">
                            <div class="flex1 center">
                                <img src="../../assets/images/hyicon.png" alt="">
                                <div>{{$t('m.clubcenter')}}</div>
                            </div>
                     </el-tooltip>
                   
                    <div class="flex1 center" @click="exit">
                        <img src="../../assets/images/exitmicon.png" alt="" >
                        <div>{{$t('m.exit')}}</div>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters(['userInfo','vip','balance'])
    },
    methods: {
        exit() {
            this.$store.commit('exit');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
}
</script>
<style lang="scss">
.head-pop {
    .name {
        line-height: 2;
    }
}
.balance-row {
    // width: 80%;
    line-height: 40px;
    background: #E8F1F7;
    border-radius: 4px;
    margin: 0 auto 4px;
}
.mhead-btns {
    padding-top: 16px;
    border-top: 1px solid rgba(0, 89, 130, 0.1);
    img {
        width: 20px;
        margin-bottom: 6px;
    }
    
}
.star-line {
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(0, 89, 130, 0.1);
}
</style>

