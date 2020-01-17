<template>
    <div class="aside re flex v sb">
        <div class="side-hd flex vc p16">
            <div class="head">
               
               <router-link v-if="loginInfo.token" to="/center">
                 <img class="cp" src="../../assets/images/man.png" alt="">
               </router-link>
               <router-link v-else to="/lg/login">
                 <img class="cp" src="../../assets/images/manh.png" alt="">
               </router-link>
            </div>
            <div class="head-info wc" v-if="loginInfo.token">
                <div class='head-name' style="height: auto">{{userInfo.username}}</div>
                <div class="f12 head-vip" v-if='0'>
                    <img style="width: 14px" src="../../assets/images/star.png" alt="">
                     VIP{{vip.viplevel}}
                </div>
            </div>
        </div>
        <div class="side-hd bal-row-hd" v-if="loginInfo.token">
            <div class="bal-row">
                <span class="bal-row-icon">
                    <img :src="balance.cjs.img" alt="">
                </span>
                <span class="fw f14 towrap" style='padding:0 5px'>{{balance.cjs.value | currency(4)}}</span>
                <span class="f12">CJS</span>
            </div>
            <div class="bal-row">
                <span class="bal-row-icon">
                    <img :src="balance.cjoy.img" alt="">
                </span>
                <span class="fw f14 towrap" style='padding:0 5px'>{{balance.cjoy.value | currency(4)}}</span>
                <span class="f12">CJOY</span>
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

                <div v-if="!loginInfo.token" class="n-btn center now-login-btn f18" @click="$router.push({name: 'login'})">{{$t('m.loginnow')}}</div>
                <template v-else>
                    <li 
                    v-for="(menu, index) in menus" 
                    :class="{active: menu.active}" 
                    :key="index" 
                    @click="menuHandle(menu.name)">
                        <span :class="`draw-icon icon-${menu.icon}`" ></span> {{$t(`m.${menu.entext}`)}}
                    </li>
                </template>
            </ul>
        </div>
        <ul class="side-ft flex sb vc">
            <li @click="switchLang">{{$t('m.zh')}}</li>
            <li>
                <router-link to="/help">
                    <img  style="width: 22px" src="../../assets/images/help.png" alt="">
                </router-link>
            </li>
            <li>
                <router-link to="/notice" v-if="false">
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
import {mapGetters} from 'vuex';
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
                    name: 'qianyue',
                    text: '已签约',
                    entext:'yiqianyue',
                    active: false,
                    icon: 'kj',
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
    computed: {
        ...mapGetters(['loginInfo','userInfo','vip','balance'])
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
            if(name == 'exit') {
                this.$store.commit('exit');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return
            }
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
        },
        switchLang() {
            const doc =  document.documentElement.classList;
            if(this.$i18n.locale == 'zh') {
                this.$i18n.locale = 'en';
                doc.remove('zh');
                doc.add('en');
            }
            else {
                this.$i18n.locale = 'zh';
                doc.remove('en');
                doc.add('zh');
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

