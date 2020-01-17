<template>
    <div id="bd" :class="`bd flex ts ${$route.name}_bd  re ${!drawerActive&& 'drawerActive'}`">
        <template v-if="!fullscreen">

            <Aside v-if="!isMobile" :class="{fly}" ref="aside"></Aside>
            <MAside v-else></MAside>

            <div :class="`flex1 flex v mn ${$route.name}_mn` " >

                <Nav :class="{fly}" ref="nav" v-if="!isMobile"></Nav>

                <router-view class="flex1 main"></router-view>

                <div class="fixed-nav flex sb vc" v-if="isMobile && $route.name == 'index'">
                     <span class="lines draw-switch" :class="{active: !drawerActive}" @click="drawerActive = !drawerActive">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                    <div class="head" v-show="drawerActive">
                        <img class="cp" src="./assets/images/man.png" alt="">
                    </div>
                </div>
            </div>
        </template>

         <template v-else>
            <transition :name="name">
                <router-view class="flex1 router main"></router-view>
            </transition>
        </template>

        <RightPanel :show.sync="aboutPanel.value"  :fullScreen="true" class="aboutPanel" >
            <component  :is="panel" @update:show="$store.commit('givenAboutPanel', {key: 'about', value: false})"/>
        </RightPanel>
    </div>
</template>
 <script >
    import RightPanel from './components/widgets/panel/rightpanel';
    import About from './components/about/index';
    import PRO from './components/pro/index';
    import {mapGetters} from 'vuex';

    let fullscreen_config = ['rw', 'guide', 'lg', 'login', 'scan','about', 'pro'];
    import Nav from './components/nav.vue';
    import Aside from './components/aside/aside.vue';
    import MAside from './components/aside/maside.vue';
    export default {
        components: {
            Nav,
            Aside,
            MAside,
            RightPanel,
            About,
            PRO,
        },
        data() {
            return {
                fly:false,
                fullscreen: false,
                panel: About,
                drawerActive: true,
                name: ''
            }
        },
        computed: {
            ...mapGetters(['aboutPanel', 'isMobile'])
        },
        created() {
            
        },
        mounted() {
            window.addEventListener('resize', this.resizeHanlder, false);
            this.resizeHanlder();
            // this.ajustStyle();
            this.checkStyle();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resizeHanlder, false);
        },
        updated() {
            this.checkStyle();
        },
        methods: {
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
                    return this.fullscreen = this.$route.name != 'index';
                }
                this.fullscreen = fullscreen_config.includes(this.$route.name);
            },
            checkStyle() {
                if(!this.$refs.aside)return;
                let aside = this.$refs.aside.$el;
                let nav = this.$refs.nav.$el;
                if(this.$route.name =='index') {
                    this.fly = true;
                    nav.style.left = aside.clientWidth + 'px';
                    aside.style.backgroundColor = 'rgba(8, 100, 153, 0.096)';
                }
                else {
                    this.fly = false;
                    nav.style.left = 0 + 'px';
                    aside.style.backgroundColor = '#086599';
                }
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
                    this.checkStyle();
                    this.setTransition();
                }
            },
            aboutPanel: {
                deep: true,
                handler: function(n) {
                    this.panel = {about: About, pro: PRO}[n.key]
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
    // padding: 0 16px 16px;
    box-sizing: border-box;
    max-height: 100vh;
    overflow-y: auto;
}
.main {
    // padding-top: 60px;
}


</style>

