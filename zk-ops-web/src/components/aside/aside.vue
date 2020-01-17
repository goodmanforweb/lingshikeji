<template>
    <div class="aside flex v hc">
        <div class="head">
            <el-popover
            class="head-poplayer"
            placement="right"
            width="100"
            trigger="click">
                
                <div class="head-pop">
                     <div class="f12 tcolor center">{{userInfo.username}}</div>
                    <div class="f12 tcolor center">{{userInfo.phone | clip}}</div>
                    <div class="head-btns flex tcolor f12" >
                        <span class="flex1 center" @click="handle">账户退出</span>
                    </div>
                </div>
                <img slot="reference"  class="cp" src="../../assets/images/man.png" alt="">
            </el-popover>
        </div>

        <ul class="a-menus">
            <li class="flex menu-list" 
            v-for="(menu, index) in menus" 
            :class="{active: menu.active}" 
            :key="index" 
            @click="menuHandle(menu)">
                <span class="menu-icon" ><img :src="menu.icon" alt=""></span>
                <ul class="sub-menu" v-show="menu.submenusactive && menu.submenus && menu.submenus.length > 0">
                    <li v-for="(sub, idx) in menu.submenus" 
                    :class="{active: sub.active}" :key="idx" 
                    @click.stop="menuHandle(sub)">
                        <label>{{sub.text}}</label>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
import menus from './menus'
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            menus
        }
    },
    computed: {
        ...mapGetters(['loginInfo','userInfo'])
    },
    mounted() {
        this.setAsideWidth();
    },
    updated() {
        this.setAsideWidth();
    },
    methods: {
        handle() {
            this.$store.commit('exit');
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        },
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
            this.$el.style.width = this.hasChild ? '185px' : '63px';
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
        setMenuActive(name) {
            
            this.setMenuDeactive(this.menus);

            let target = this.findActive(this.menus, name || this.$route.name);
            if(target.target) {
                if(target.parent) {
                    //有 child
                   target.parent.active = true;
                   target.parent.submenusactive = true;
                   target.target.active = true;
                   //加宽
                   this.hasChild = 1;
                }
                else {
                    target.target.active = true;
                    //缩宽
                    this.hasChild = 0;
                }
                
            }
        },
        menuHandle(target) {
            if(target.submenus && target.submenus.length > 0) {
                this.$router.push({name: target.submenus[0].url})
            }
            else {
                this.$router.push({name: target.url});
            }
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler: function() {
                this.setMenuActive();
            }
        }
    }
}
</script>
<style lang="scss">

.head {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.pc {
    .menu-list {
        height: 60px;
        padding: 0 16px;
    }
}
.menu-list.active {
    .menu-icon {
        opacity: 1;
    }
    .sub-menu {
        white-space: nowrap;
        margin-left: 20px;
        li {
            padding: 8px 0 8px 20px;
            border-left: 1px dashed #fff;
            position: relative;
            cursor: pointer;
        }
        li.active {
            color:#fff
        }
    }
    .sub-menu li:first-of-type:after {
        content:'';
        position: absolute;
        top: -9px;
        left: -5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #fff;
    }
    .sub-menu li:last-of-type:before {
        content:'';
        position: absolute;
        bottom: -9px;
        left: -5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #fff;
    }
}
.menu-icon {
    opacity: .5;
    cursor: pointer;
    width: 25px;
    min-width: 25px;
}
.menu-icon:hover {
    opacity: 1;
}
.balance-row {
    line-height: 40px;
    background: #E8F1F7;
    border-radius: 4px;
    margin-bottom: 4px;
}
.head-btns {
    margin-top: 6px;
    margin-bottom: -6px;
    border-top: 1px solid rgba(0, 89, 130, 0.155);
    span {
        margin: 2px;
        padding-top: 6px;
        cursor: pointer;
    }
    
}
.star-lines {
    >div span {
       display: block;
       height: 1px;
       background: #005982;
       opacity: .2;
       position: relative;

    }
    >div.active span {
        opacity: 1;
    }
    >div {
        div {
            margin-top: 6px;
        }
        span:after {
            content:'';
            position: absolute;
            top: -3px;
            right: 0;
            left: 0;
            margin: auto;
            background: #fff;

            width: 6px;
            height: 6px;
            border: 1px solid #005982;
            border-radius: 50%;
        }
    }
}
</style>

