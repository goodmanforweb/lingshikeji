<template>
    <div class="aside re flex v sb">
        <div class="side-hd flex vc p16">
            <div class="head">
               <router-link to="/center">
                 <img class="cp" src="../../assets/images/man.png" alt="">
               </router-link>
            </div>
            <div class="head-info wc">
                <div class='head-name'>{{$t('m.username')}}</div>
                <div class="f12 head-vip">
                    <img style="width: 14px" src="../../assets/images/star.png" alt="">
                     VIP1
                </div>
            </div>
        </div>
        <div class="side-hd bal-row-hd">
            <div class="bal-row">
                <span class="bal-row-icon">
                    <img src="../../assets/images/coin.png" alt="">
                </span>
                <span class="fw f14" style='padding:0 5px'>1808080</span>
                <span class="f12">CJOY</span>
            </div>
            <div class="bal-row">
                <span class="bal-row-icon">
                    <img src="../../assets/images/coin.png" alt="">
                </span>
                <span class="fw f14" style='padding:0 5px'>1808080</span>
                <span class="f12">CJS</span>
            </div>
        </div>
        <div class="side-bd flex1">
            <ul class="menu-block">
                <li v-for="(item, index) in menus1" :key="index" :class="{active: item.active}">
                    <router-link :to="`/${item.url}`" >
                        <span :class='`draw-icon icon-${item.icon}`'></span>
                         <label>{{$t(`m.${item.entext}`)}}</label>
                    </router-link>
                </li>
            </ul>
            <ul class="menu-block">

                <div class="n-btn center now-login-btn f18" @click="$router.push({name: 'login'})">立即登录</div>
                <template>
                    <li 
                    v-for="(menu, index) in menus" 
                    :class="{active: menu.active}" 
                    :key="index" 
                    @click="menuHandle(menu.name)">
                        <span :class="`draw-icon icon-${menu.icon}`" ></span> {{menu.text}}
                        <transition name="fade">
                            <ul class="sub-menu" v-if="menu.submenusactive && menu.submenus && menu.submenus.length > 0">
                                <li v-for="(sub, idx) in menu.submenus" 
                                :class="{active: sub.active}" :key="idx" 
                                @click.stop="menuHandle(sub.name, 2, menu.name)">
                                    <label>{{$t(`m.${sub.entext}`)}}</label>
                                </li>
                            </ul>
                        </transition>
                    </li>
                </template>
            </ul>
        </div>
        <ul class="side-ft flex sb vc">
            <li @click="$i18n.locale = $i18n.locale == 'zh' ? 'en' : 'zh'">{{$t('m.zh')}}</li>
            <li>
                <router-link to="/help">
                    <img  style="width: 22px" src="../../assets/images/help.png" alt="">
                </router-link>
            </li>
            <li>
                <router-link to="/notice">
                    <img style="width:18px" class="warn" src="../../assets/images/warn.png" alt="">
                </router-link>
            </li>
            <li class="n-btn btn-pro shandow tcolor f12">
                <router-link to="/pro">{{$t('m.proplan')}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    data() {
        return {
            menus1: [
                {
                    text: '探索',
                    entext:'ts',
                    icon: 'ts',
                    url: 'tsindex',
                    active: true
                },
                {
                    text: 'CJS中心',
                    entext:'cjscenter',
                    icon: 'cjs',
                    url: 'cjs'
                },
                {
                    text: '项目社区',
                    entext:'hubcenter',
                    icon: 'hub',
                    url: 'hub'
                },
                {
                    text: '公告中心',
                    entext:'report',
                    icon: 'report',
                    url: 'report'
                },
                {
                    text: '关于',
                    entext:'about',
                    icon: 'about',
                    url: 'about'
                }
            ],
            menus: [
                {
                    name: 'kjmenu',
                    text: '我的矿池',
                    entext:'mykjpool',
                    active: false,
                    icon: 'kj',
                    submenusactive: false,
                    submenus: [
                        {
                            name: 'pool',
                            text: '矿池',
                            entext:'pool',
                            active: false,
                            url: 'pool'
                        },
                        {
                            name: 'kj',
                            text: '矿机',
                            entext:'kj',
                            active: false,
                            url: 'kj'
                        },

                    ]
                },
                {
                    name:'wallet',
                    text:'我的钱包',
                    entext:'wallet',
                    url:'wallet',
                    icon: 'wallet',
                    active: false,
                },
                {
                    name:'tool',
                    text:'更多',
                    entext:'more',
                    url:'tool',
                    icon:'tool',
                    active: false,
                },
                {
                    name:'exit',
                    text:'退出登录',
                    entext:'exit',
                    url:'exit',
                    icon:'exit',
                    active: false,
                }
            ]
        }
    },
    mounted() {
        this.setAsideWidth();
    },
    methods: {
        findActive(checkArr, name) {
            let target = {
                target: null,
                parent: null
            };
            checkArr.forEach(el => {
                if(el.name == name) {
                    return target = {
                        target: el,
                        parent: null
                    }
                }
                else {
                    if(el.submenus) {
                        return target = {
                            target: this.findActive(el.submenus, name),
                            parent: el
                        }
                    }
                    else {

                    }
                }
            });
            return target;
        },
        setAsideWidth() {
            if(!this.$el)return;
            this.$el.style.width = window.innerWidth - 90 + 'px';
        },
        setMenuDeactive(checkArr) {
            checkArr.forEach(el => {
                el.active = false;
                if(typeof el.submenusactive != 'undefined') {
                    el.submenusactive = false;
                }
                if(el.submenus) {
                    this.setMenuDeactive(el.submenus);
                }
            })
        },
        setMenuActive() {
            let menuConfig = ['kj', 'pool', 'wallet', 'tool'];
            if(!menuConfig.includes(this.$route.name)) {
                return this.setMenuDeactive(this.menus);
            }
            let target = this.findActive(this.menus, this.$route.name);
            if(target.target) {
                if(target.parent) {
                    //有 child
                   target.parent.active = true;
                   target.parent.submenusactive = true;
                   target.target.target.active = true;
                }
                else {
                    target.target.active = true;
                }
                
            }
        },
        menuHandle(name, level, mname) {

            if(!level) {
                this.menus.forEach(target => {
                    if(target.name == name) {
                        if(target.active) return;

                        target.active = true;
                        target.submenusactive = true;
                        if(target.submenus && target.submenus.length > 0) {
                            // target.submenus[0].active = true;
                            // this.$router.push({name: target.submenus[0].url})
                        }
                        else {
                            this.$router.push({name});
                        }
                    }
                    else {
                        target.active = false;
                        target.submenusactive = false;
                    }
                });
            }
            else {
                this.menus.forEach(el => {
                    if(el.name == mname) {
                        el.active = true;
                         el.submenus && el.submenus.forEach(l => {
                             l.active = l.name == name;
                        })
                    }
                    else {
                        el.active = false;
                    }
                })
                this.$router.push({name});
            }
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler: function() {
                // this.setAsideWidth();
                // this.setMenuActive();
            }
        }
    }
}
</script>
<style lang="scss">
</style>

