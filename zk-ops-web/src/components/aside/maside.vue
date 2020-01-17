<template>
    <div class="aside re flex v sb">
        <div class="side-hd flex vc p16">
            <div class="head">
               <img class="cp" src="../../assets/images/man.png" alt="">
            </div>
            <div class="head-info wc">
                <span class='head-name'>{{userInfo.username}}</span>
            </div>
        </div>
        <div class="side-bd flex1">
            <ul class="menu-block">
                <template>
                    <li 
                    class="menu-list"
                    v-for="(menu, index) in menus" 
                    :class="{active: menu.active}" 
                    :key="index" 
                    @click="menuHandle(menu)">
                        <span class="menu-icon" :style="`backgroundImage:url(${menu.icon})`"></span> <label>{{menu.text}}</label>
                        <ul class="sub-menu" v-if="menu.submenusactive && menu.submenus && menu.submenus.length > 0">
                            <li v-for="(sub, idx) in menu.submenus" 
                            :class="{active: sub.active}" :key="idx" 
                            @click.stop="menuHandle(sub)">
                                <label>{{sub.text}}</label>
                            </li>
                        </ul>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
import menus from './menus'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            menus
        }
    },
    mounted() {
        this.setAsideWidth();
    },
    computed: {
        ...mapGetters(['drawerActive','userInfo'])
    },
    methods: {
        findActive(checkArr, name, parent) {
            let target = {
                target: null,
                parent: null
            };
            for(let i=0,len=checkArr.length;i<len;i++) {
                let el = checkArr[i];
                if(el.name == name) {
                    target = {
                        target: el,
                        parent: parent || null
                    };
                    break;
                }
                else {
                    if(el.submenus) {
                        target = this.findActive(el.submenus, name, el);
                        if(target.target)break;
                    }
                    else {

                    }
                }
            }
            // checkArr.forEach(el => {
                
            // });
            return target;
        },
        setAsideWidth() {
            if(!this.$el)return; 
            this.$el.style.width = window.innerWidth - 90 + 'px';        },
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
        setMenuActive(name) {
            
            this.setMenuDeactive(this.menus);

            let target = this.findActive(this.menus, name || this.$route.name);
            if(!target.target) return;
            if(target.target.submenus && target.target.submenus.length > 0) {
                //有 child
                target.target.active = true;
                target.target.submenusactive = true;
                target.target.active = true;
            }
            else {
                target.target.active = true;
            }
                
            
        },
        menuHandle(target) {
            if(target.submenus && target.submenus.length > 0) {
                // this.$router.push({name: target.submenus[0].url})
                this.setMenuActive(target.name);
            }
            else {
                
                this.$router.push({name: target.url});
                setTimeout(() => {
                    this.$store.commit('givenDrawerActive', true);
                }, 1000)
            }
        }

    },
    watch: {
        $route: {
            immediate: true,
            handler: function() {
                this.setMenuActive();
            }
        },
        drawerActive: function(n) {
            !n && this.setMenuActive()
        }
    }
}
</script>
<style lang="scss">
.mobile {
    .menu-list {
        
        margin: 16px 0;
        padding-left: 6px;
        .menu-icon {
            display: inline-block;
            height: 30px;
            width: 30px;
            background-size: 24px auto;
            background-position: center;
            background-repeat: no-repeat;
            margin-right: 14px;
        }
        .menu-icon, label {
            vertical-align: middle
        }
        .sub-menu {
            margin: 14px;
            li {
                padding: 4px 4px 4px 32px;
            }
        }
    }
}
</style>

