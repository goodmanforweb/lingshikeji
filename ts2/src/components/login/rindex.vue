<template>
    <div class="login shadow re">
        <div class="l-logo">
            <img src="../../assets/images/plogo.png" alt="">
        </div>
        <!-- <div class="l-logo-text">
            <img src="../../assets/images/ltext.png" alt="">
        </div> -->
        <div class="login-tabs">
            <div class="lt-hd flex">
                <router-link class="flex1 center" 
                    v-for="(tab, index) in tabs"  :key="index"
                :to="`${tab.url}`">
                    {{tab.text}}
                </router-link>
            </div>
            <div class="lt-bd">
                <router-view></router-view>
            </div>
        </div>
        <div class="logo-back tcolor cp" v-if="!isMobile">
            <i class="el-icon-error" @click="$router.push('/tsindex')"></i>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            tabs: [
                {
                    text: '登录',
                    active: true,
                    url:'/lg/login'
                },
                {
                    text: '扫一扫',
                    active: false,
                    url: '/lg/scan'
                }
            ]
        }
    },
}
</script>
