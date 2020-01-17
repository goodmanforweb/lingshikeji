<template>
    <div class="dlayer flex vc hc">
        <div class="dbox flex">
            <div class="dbox-wrap flex1">
                <div class="dbox-tt center f30 textshadow">{{title}}</div>
                <div class="dbox-cont center" >
                     <slot></slot>
                </div>
            </div>
            <div class="dbox-close-btn audiobtn" @click="close"></div>
       </div>
    </div>
</template>

<script>
export default {
    props:['title'],
    created() {
        console.log(this,'56');
    },
    methods: {
        close() {
            this.$emit('close');
            this.$destroy();
        }
    }
}
</script>

<style lang="scss">
.dlayer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,.8);
}
</style>


