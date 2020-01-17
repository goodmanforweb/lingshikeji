<template>
    <div id="bd" :class="`bd flex ts ${$route.name}_bd  re ${!drawerActive&& 'drawerActive'}`">
        <template v-if="!fullscreen">

            <Aside v-if="!isMobile" :class="{fly}" ref="aside"></Aside>
            <MAside v-else></MAside>

            <div :class="`flex1 flex v mn ${$route.name}_mn ${!drawerActive && ' wwidth'}` " >
                <Note @hasnote="navTopHandle"/>
                <Nav :class="{fly}" ref="nav" v-if="!isMobile"></Nav>

                <router-view class="flex1 main" ></router-view>

                <div class="fixed-nav flex sb vc" v-if="isMobile && $route.name == 'index'">
                     <span class="lines draw-switch" :class="{active: !drawerActive}" @click="drawerActive = !drawerActive">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                    <div class="head" v-show="false">
                        <img class="cp" src="./assets/images/man.png" alt="">
                    </div>
                </div>
            </div>
        </template>

         <template v-else>
            <transition :name="name">
                <router-view class="flex1 router main" ></router-view>
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
    import {mapGetters,mapActions} from 'vuex';

    let fullscreen_config = ['rw', 'guide', 'lg', 'login', 'registar','fixpass','agreement','about', 'pro','poster','ddash','bdash', 'dash','resetpass'];
    import Nav from './components/nav.vue';
    import Aside from './components/aside/aside.vue';
    import MAside from './components/aside/maside.vue';
    import Note from './components/noteslider/index'
    export default {
        components: {
            Nav,
            Aside,
            MAside,
            RightPanel,
            About,
            PRO,
            Note
        },
        data() {
            return {
                fly:false,
                fullscreen: false,
                panel: About,
                drawerActive: true,
                name: '',
            }
        },
        computed: {
            ...mapGetters(['aboutPanel', 'isMobile','loginInfo'])
        },
        created() {
            
        },
        mounted() {
            this.init();
            window.addEventListener('resize', this.resizeHanlder, false);
            this.resizeHanlder();
            this.checkStyle();
            this.asideHoverHandler();
        },
        beforeDestroy() {
            this.clearTicker();
            window.removeEventListener('resize', this.resizeHanlder, false);
        },
        updated() {
            this.checkStyle();
        },
        methods: {
            ...mapActions(['getUserInfo','getVipLists','getManAssetsLists']),
            init() {
                const doc =  document.documentElement.classList;
                doc.add(this.$i18n.locale);
            },
            clearTicker() {
                this.assetTicker && clearInterval(this.assetTicker)
            },
            tickerGetManAssets() {
                this.clearTicker();
                this.assetTicker = setInterval(() => {
                    this.getManAssetsLists();
                }, 30*1000)
            },
            getInfo() {
                this.getManAssetsLists();
                Promise.all([this.getUserInfo(), this.getVipLists()]).then(res => {
                    res[1].forEach((el, index) => {
                        if(el.id == res[0].id) {
                            return this.$store.commit('givenVip', {viplevel:index + 1});
                        }
                    });
                })
            },
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
                this.fullscreen = fullscreen_config.includes(this.$route.name) || this.$route.name.indexOf('dash') > -1
            },
            asideHoverHandler() {
                if(this.isMobile || !this.$refs.aside) return false;
                const aside = this.$refs.aside.$el;
                if(this.$route.name == 'index') {
                    //init
                    // aside && (aside.style.left = '-63px');
                    if(!this.removeAsideHover) {
                        //add
                        this.handlerIn = () => {
                            this.$refs.aside.$el.style.left = '0px';
                        };
                        this.handlerOut = () => {
                            this.$refs.aside.$el.style.left = '-63px';
                        };
                        const body = document.body;
                        body.addEventListener('mouseenter', this.handlerIn, false);
                        body.addEventListener('mouseleave', this.handlerOut, false);
                        this.removeAsideHover = () => {
                            if(this.$route.name == 'index') return false;
                            body.removeEventListener('mouseenter', this.handlerIn, false);
                            body.removeEventListener('mouseleave', this.handlerOut, false);
                        }
                    }
                    else {
                        return true;
                    }
                }
                else {
                    //remove
                    this.removeAsideHover && this.removeAsideHover();
                    this.removeAsideHover = null;
                    aside && (aside.style.left = '0px');
                }
            },
            navTopHandle(has) {
                if(this.isMobile) return;
                this.$refs.nav.$el.style.top = has ? '26px': '0px';
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
                    nav.style.top = '0px';
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
        //全局监听
        watch: {
            $route: {
                immediate: true,
                handler: function(n) {
                    this.fullscreenHandle();
                    this.checkStyle();
                    this.setTransition();
                    // this.asideHoverHandler();
                }
            },
            '$route.name': function() {
                this.asideHoverHandler()
            },
            loginInfo: {
                immediate: true,
                handler: function(n) {
                    if(n.token) {
                        this.getInfo();
                        this.tickerGetManAssets();
                    }
                    else {
                        this.clearTicker();
                    }
                }
            },
            aboutPanel: {
                deep: true,
                handler: function(n) {
                    this.panel = {about: About, pro: PRO}[n.key]
                }
            },
            '$i18n.locale': function(n) {
                localStorage.setItem('lang', n);
            }

        }
    }
</script>
<style lang="scss">
.wwidth {
    width: 100vw;
}
#bd {
    min-height: 100vh;
    background: #DFEBF1;
     overflow-x: auto;
}

.mn {
    // padding: 0 16px 16px;
    box-sizing: border-box;
    max-height: 100vh;
    overflow-y: auto;
}
#bd {
   
    // padding-top: 60px;
}


</style>

