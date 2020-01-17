<template>
    <div>
        <div class="share" v-if="!isMobile">
            <span @click="dialogVisible=true"></span>
            <span></span>
        </div>
        <el-dialog
        :modal='false'
        :visible.sync="dialogVisible"
        :width="isMobile ? '80%' : '300px'">
            <span><img  v-if="qr_img" :src="qr_img" alt=""></span>
        </el-dialog>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    props: ['qr_img','dialogShow'],
    data() {
        return {
            popShow: false,
            dialogVisible: false
        }
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    watch: {
        dialogShow: function(n) {
            if(n) {
                this.dialogVisible = n;
            }
        },
        dialogVisible: function(n) {
            if(!n) {
                this.$emit('update:dialogShow', n)
            }
        }
    }
}
</script>
