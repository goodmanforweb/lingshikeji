<template>
    <transition name="fade">
        <div class="right-panel" :style="`zIndex:${z()}`" v-if="isMobile ? false : show" @click="$emit('update:show', false)">
            <span class="n-btn re-close" v-if="fullScreen" @click="$emit('update:show', false)">关闭</span>
            <div class="rp-aside" @click.stop :class="{fullScreen}">
                <slot />
            </div>
        </div>
    </transition>
</template>

<script>
import z from '../zindex';
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            z
        }
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    props: ['show', 'fullScreen']
}
</script>

<style lang="scss">
.right-panel {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, .47)
}

.rp-aside {
    border-radius: 4px 0 0 4px;
    background:rgba(223,235,241,1); 
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 16px;
    overflow-y: auto;
}
.rp-aside.fullScreen {
    left: 0;
    padding:0;
}
</style>

