<template>
    <div class="xxtable-cell">
        <slot v-bind:row="row"></slot>
    </div>
</template>

<script>
export default {
    props:['prop','label','minWidth', 'width'],
    data () {
        return {
            row: {
                state:''
            }
        };
    },
}

</script>
