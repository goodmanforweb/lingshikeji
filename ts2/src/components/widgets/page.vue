<template>
    <div :class="`${isMobile ? 'page re' : ''}`" >
        <template v-if="isMobile">
            <div class="re page-hd  center" 

            :class="{'page-hd-float': float == '', 'page-hd-fixed': float == '' ? false : true,borderLine: borderLine != undefined}"
            >
                <span class="back-icon" :style="`${styleBackIcon ? styleBackIcon : ''}`" @click="back" v-if="hasBackBtn == undefined ? true : hasBackBtn"></span>
                
                <span>
                    
                    <select class="title-select page-title tcolor f20 fw" v-if="Array.isArray(title)" v-model="titleselect">
                        <option :value="index" v-for="(t,index) in title" :key="index">{{t}}</option>
                    </select>
                    <span class="page-title tcolor f20 fw" v-else-if="title">{{title}}</span>
                    <div class="f12 gcolor" v-if='subtitle'>{{subtitle}}</div>
                </span>

                <transition name="fade">
                    <span class="page-right-btn tcolor f14 right" v-if="$slots['layer-right-btn']">
                        <slot name="layer-right-btn"></slot>
                    </span>
                </transition>
            </div>
            <div class="page-bd flex1 flex" :style="`${padding != undefined ? 'padding: 76px 16px 16px;' : ''}`">
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
//title string || []
export default {
    props: ['float','fixed', 'title','titleValue','subtitle','hasBackBtn','styleBackIcon', 'padding', 'borderLine', 'routerBack','rightBtn'],
    data() {
        return {
            titleselect:0,
        }
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    created() {
        console.log(this);
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
    },
    watch: {
        titleselect(n) {
            this.$emit('titleChange', n);
        },
        titleValue: {
            immediate: true,
            handler: function(n) {
                this.titleselect = n;
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
    z-index: 99;
    background: #DFEBF1;
    // box-shadow: 0 2px 2px rgba(0, 0, 0, 0.418);
}
.page-hd {
    min-height: 20px;
    padding: 15px 10px;
    .title-select {
        border: none;
        outline: none;
        background: transparent;
        width: auto;
        padding: 0 1%;
        margin: 0;
        option {
            text-align: center;
        }
    }
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
.page-right-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 10px;
    width: 60px;
    height: 16px;
}
.page-bd>div {
    width: 100%;
}
</style>

