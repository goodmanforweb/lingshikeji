<template>
    <div :class="`${isMobile ? 'page' : ''}`" >
        <template v-if="isMobile">
            <div class="page-hd  center re" 

            :class="{'page-hd-float': float != undefined, 'page-hd-fixed': drawerActive,borderLine: borderLine != undefined}"
            >
                <span v-if="leftBtn == undefined || leftBtn == 'back'"  class="back-icon" :style="`${styleBackIcon ? styleBackIcon : ''}`" @click="back" ></span>
                <span v-else-if="leftBtn == 'menu'" class="lines draw-switch" :class="{active: !drawerActive}" @click="$store.commit('givenDrawerActive', !drawerActive)">
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
                
                
                <span>
                    <span class="page-title tcolor f20 fw" v-if="title">{{title}}</span>
                    <div class="f12 gcolor" v-if='subtitle'>{{subtitle}}</div>
                </span>
                <transition name="fade">
                    <span class="page-right-btn tcolor f14 right" v-if="$slots['layer-right-btn']">
                        <slot name="layer-right-btn"></slot>
                    </span>
                </transition>
            </div>
            <div class="page-bd flex1 flex" :style="`${padding != undefined ? 'padding: 16px' : ''}`">
                <slot />
            </div>
        </template>
        <template v-else>
            <slot />
        </template>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
//leftBtn menu back false
export default {
    props: ['float','fixed', 'title','subtitle','leftBtn','styleBackIcon', 'padding', 'borderLine', 'routerBack','rightBtn'],
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters(['isMobile','drawerActive'])
    },
    created() {
        console.log(this,111);
    },
    methods: {
        back() {
            if(window.history.length > 0) {
                this.$router.goBack();
            }
            else {
                this.$router.isBack = true;
                this.routerBack != undefined ? this.$router.push(this.routerBack) : this.$router.push('tsindex');
            }
        }
    }
}
</script>
<style lang="scss">
.page {
    background: #DFEBF1;
    // overflow: hidden;
    width: 100vw;
    min-height: 100vh;
    // overflow-y: auto;
}
.borderLine {
    border-bottom: 1px solid rgba(199, 194, 194, 0.3);
}
div.page-hd-float {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
}
div.page-hd-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: #DFEBF1;
    // box-shadow: 0 2px 2px rgba(0, 0, 0, 0.418);
}
.page-hd {
    min-height: 20px;
    padding: 15px 10px;
}
.back-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 10px;
    width: 30px;
    height: 30px;
    background: url(../../assets/images/backicon.png) no-repeat center/16px;
}
.draw-switch {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 10px;
    width: 30px;
    height: 17px;
}
.page-right-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 10px;
    width: 60px;
    height: 16px;
}
.page-bd {
    margin-top: 60px;
}
.page-bd>div {
    width: 100%;
}
</style>

