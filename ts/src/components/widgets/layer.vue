<template>
    <transition name="fade">
        <div class="layer flex hc vc" 
        :style="`${!type && ('zIndex:'+z())}`" 
        :class="{float: !type && float,noFloat: !type && !float}"
        >
            <slot />
        </div>
    </transition>
</template>
<script>
import z from './zindex';
export default {
    props: ['float','notransition','type'],
    data() {
        return {
            z
        }
    }
}
</script>
<style lang="scss">
.layer {
    background: #DFEBF1;
    overflow: hidden;
}
.float {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.noFloat {
    width: 100%;
    height: 100vh;
}
</style>

