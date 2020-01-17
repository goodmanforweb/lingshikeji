<template>
    <div id="bd" :class="`bd flex ts ${$route.name}_bd  re ${!drawerActive&& 'drawerActive'}`">
        <template v-if="!fullscreen">

            <Aside v-if="!isMobile" ref="aside"></Aside>
            <MAside v-else></MAside>

            <div :class="`flex1 flex v mn ${$route.name}_mn` " >
                 <transition :name="name" v-if="isMobile">
                    <router-view class="flex1 router"></router-view>
                </transition>
                <router-view v-else class="flex1 router"></router-view>
                <!-- <div class="fixed-nav flex sb vc" v-if="isMobile && $route.name == 'index'">
                     <span class="lines draw-switch" :class="{active: !drawerActive}" @click="drawerActive = !drawerActive">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </div> -->
            </div>
        </template>

         <template v-else>
            <transition :name="name">
                <router-view class="flex1 router"></router-view>
            </transition>
        </template>

    </div>
</template>
 <script >
    import {mapGetters, mapActions} from 'vuex';
    import Aside from './components/aside/aside.vue';
    import MAside from './components/aside/maside.vue';
    let fullscreen_config = ['login'];
    export default {
        components: {
            
            Aside,
            MAside,
            
        },
        data() {
            return {
                name: ''
            }
        },
        computed: {
            ...mapGetters(['isMobile','drawerActive','loginInfo','userInfo'])
        },
        created() {
            this.getAssetLists();
        },
        mounted() {
            window.addEventListener('resize', this.resizeHanlder, false);
            this.resizeHanlder();
            // this.ajustStyle();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resizeHanlder, false);
        },
        updated() {
        },
        methods: {
            ...mapActions(['getAssetLists','getUserInfo']),
            resizeHanlder() {
                this.mobileSetter();
            },
             mobileSetter() {
                this.debounce && clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    let isMobile = window.innerWidth <= 700;

                    this.$store.commit('givenIsMobile', isMobile);

                    let doc =  document.documentElement.classList;
                    if(isMobile) {
                        if(doc.contains('pc'))doc.remove('pc');
                        doc.add('mobile');
                    }
                    else {
                        if(doc.contains('mobile'))doc.remove('mobile');
                        doc.add('pc');
                    }
                }, 200);
            },
            fullscreenHandle() {
                if(this.isMobile) {
                    return this.fullscreen = false;
                }
                this.fullscreen = fullscreen_config.includes(this.$route.name);
            },
            setTransition() {
                if(!this.isMobile) return this.name = '';
                this.name = this.$router.isBack ? 'slide-right' : 'slide-left';
                this.$router.isBack = false;
            }
        },
        watch: {
            $route: {
                immediate: true,
                handler: function(n) {
                    this.fullscreenHandle();
                    this.setTransition();
                }
            },
            loginInfo: {
                deep: true,
                immediate: true,
                handler: function(n) {
                    if(!util.isEmpty(n)) {
                        this.getUserInfo();
                    }
                }
            }
        }
    }
</script>
<style lang="scss">
#bd {
    min-height: 100vh;
    background: #DFEBF1;
}

.mn {
    box-sizing: border-box;
    max-height: 100vh;
    overflow-y: auto;
}
.pc {
   .mn {
        padding: 0 32px 16px;
   }
}


</style>

