<template>
    <el-popover
        popper-class="popper"
        placement="bottom"
        width="80"
        trigger="hover"
        v-model="popShow">
        <div class="share flex sb" >
            <span @click="$emit('dialogHandle', true)"></span>
            <span></span>
        </div>
        <span class="rw-dots center" slot="reference" @click="popShow = !popShow">
            <i></i>
        </span>
    </el-popover>
</template>
<script>
export default {
    data() {
        return {
            popShow: false
        }
    }
}
</script>
