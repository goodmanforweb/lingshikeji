<template>
    <transition name="fade">
        <div class="hlayer flex vc hc" :style="{zIndex: z}">
            <div class="hpop">
                <div class="hpop-box"><slot></slot></div>
                <img src="../../../assets/images/bolang.png" alt="">
                <div class="hpop-close" @click="$emit('close', false)"></div>
            </div>
        </div>
    </transition>
</template>
<script>
import zmaneger from './zindexmaneger'
export default {
    data() {
        return {
            z: zmaneger()
        }
    }
}
</script>

<style lang="scss">
.hlayer {
    position: fixed;
    top: 0;right: 0;bottom: 0;
    left: 0;
    max-width: 600px;
    margin: 0 auto;
    background:rgba(0,0,0,.47);
    .hpop {
        position: relative;
        top: -20px;
        width: 80%;
        border-radius: 4px;
        background-color: #FFF8E2;
    }
    .hpop-box {
        padding: 10px 10px 0;
        color:#5E4741;
    }
    .hpop-close {
        width: 40px;
        height: 40px;
        position: absolute;
        bottom: -60px;
        right: 0;
        left: 0;
        margin: auto;
        background: url(../../../assets/images/icon.png) no-repeat 0 -120px/100% auto;
    }
}
</style>

