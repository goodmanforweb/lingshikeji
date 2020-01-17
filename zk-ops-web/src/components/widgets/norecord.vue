<template>
    <div class="gcolor f12 center" style="padding: 16px 0;">
        <div :style="`width: ${iconwidth}px; margin: 16px auto`" v-if="hasicon">
            <img src="../../assets/images/zweifu.png" alt="">
        </div>
        <span>{{msg}}</span>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            default:''
        },
        hasicon: {
            type: Boolean,
            default: false
        },
        iconwidth: {
            type: String,
            default: '150'
        }
    },
    data() {
        return {
            msg:'暂时没有数据'
        }
    },
    created() {
        this.text && 
        (this.msg = this.text);
    }
}
</script>
