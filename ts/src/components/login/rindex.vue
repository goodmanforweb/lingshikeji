<template>
    <div class="loginwrap shadow re">
        <div class="l-logo">
            <img src="../../assets/images/plogo.png" alt="">
        </div>

        <div class="login-tabs" v-if="['login','registar'].includes($route.name)">
            <div class="lt-hd flex">
                <router-link class="flex1 center fuper" v-for="(tab, index) in tabs"  :key="index" :to="`${tab.url}`">
                    {{$t(`m.${tab.text}`)}}
                </router-link>
            </div>
            <div class="lt-bd">
                <router-view></router-view>
            </div>
        </div>
        <router-view v-else></router-view>

        <div class="logo-back tcolor cp center" v-if="!isMobile">
            <i class="el-icon-error" @click="$route.name=='agreement' ? $router.replace('registar') : $router.push('/index')"></i>
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
                    text: 'login',
                    active: true,
                    url:'/lg/login'
                },
                {
                    text: 'registar',
                    active: false,
                    url: '/lg/registar'
                }
            ]
        }
    },
}
</script>
