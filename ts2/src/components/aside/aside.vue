<template>
    <div class="aside flex v hc">
        <div class="head">
            <el-popover
            class="head-poplayer"
            placement="right"
            width="200"
            trigger="click">
                
                <div class="head-pop">
                    <div class="flex sb tcolor">
                        <span class="name f14">yoyo</span>
                        <span>
                            <img style="width: 16px" src="../../assets/images/gear.png" alt="">
                        </span>
                    </div>
                    <div class="f12 tcolor">86186***87</div>
                    <div class='m20'>
                        <div class="balance-row tcolor center">
                            <span class="fw">1908080</span>
                            <span>CJS</span>
                        </div>
                        <div class="balance-row tcolor center">
                            <span class="fw">1908080</span>
                            <span>CJOY</span>
                        </div>
                    </div>

                    <div class="flex tcolor f12 vc m16">
                        <div class="star-icons">
                            <span><img style="width: 20px" src="../../assets/images/star.png" alt=""></span>
                            <div>VIP0</div>
                        </div>
                        <div class="flex flex1">
                            <div class="flex1 center active">
                                <span></span>
                            </div>
                            <div class="flex1 center">
                                <span></span>
                                <div>VIP1</div>
                            </div>
                        </div>
                    </div>
                    <div class="head-btns flex tcolor f12" >
                        <span class="flex1 center" @click="$router.push('/my')">{{$t('m.clubcenter')}}</span>
                        <span class="flex1 center">{{$t('m.exit')}}</span>
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
            @click="menuHandle(menu.name)">
                <span class="menu-icon" ><img :src="menu.icon" alt=""></span>
                <ul class="sub-menu" v-show="menu.submenusactive && menu.submenus && menu.submenus.length > 0">
                    <li v-for="(sub, idx) in menu.submenus" 
                    :class="{active: sub.active}" :key="idx" 
                    @click.stop="menuHandle(sub.name, 2, menu.name)">
                        <label>{{$t(`m.${sub.entext}`)}}</label>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    data() {
        return {
            menus: [
                {
                    name: 'kjmenu',
                    text: '矿机',
                    entext:'kj',
                    active: false,
                    icon: require('../../assets/images/kj.png'),
                    submenusactive: false,
                    submenus: [
                        {
                            name: 'pool',
                            text: '我的矿池',
                            entext:'mykjpool',
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
                    icon: require('../../assets/images/wallet.png'),
                    active: false,
                },
                {
                    name:'tool',
                    text:'更多',
                    entext:'more',
                    url:'tool',
                    icon:require('../../assets/images/tool.png'),
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
            let hasChild = ['kj', 'pool'];
            this.$el.style.width = hasChild.includes(this.$route.name) ? '185px' : '63px';
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
                            target.submenus[0].active = true;
                            this.$router.push({name: target.submenus[0].url})
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
                this.setAsideWidth();
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

.menu-list {
    height: 60px;
    padding: 0 16px;
}
.menu-list.active {
    .menu-icon {
        opacity: 1;
    }
    .sub-menu {
        white-space: nowrap;
        padding-left: 20px;
        margin-left: 20px;
        border-left: 1px dashed #fff;
        position: relative;
        li {
            margin-bottom: 16px;
        }
        li.active {
            color:#fff
        }
    }
    .sub-menu:before {
        content:'';
        position: absolute;
        top: -9px;
        left: -5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #fff;
    }
    .sub-menu:after {
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
    margin-bottom: -6px;
    border-top: 1px solid rgba(0, 89, 130, 0.155);
    span {
        margin: 2px;
        padding-top: 6px;
        cursor: pointer;
    }
    span:last-child {
        border-left: 1px solid rgba(0, 89, 130, 0.155);
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

