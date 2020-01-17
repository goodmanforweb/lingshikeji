<template>
    <div class="dlayer flex">
        <slot></slot>
    </div>
</template>

<script>
export default {
    
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
    background-color: rgba(0,0,0,.5);
    align-items: center;
    justify-content: center;
}
</style>


