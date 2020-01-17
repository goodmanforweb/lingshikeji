<template>
    <el-dialog
    v-if="show"
    class='bs-dialog'
    :title="$t('m.fxts')"
    :visible.sync="centerDialogVisible"
    :width="isMobile ? '96%' : '40%'"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    center>
    <span class="bs-d-cont">{{$t('m.fxtxtxt')}}</span>
    <span slot="footer" class="dialog-footer">
        <div class="bs-d-cont-ft-btn n-btn btn-tcolor n-btn-hover"  @click="centerDialogVisible = false">{{$t('m.ikhonwfx')}}</div>
    </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            centerDialogVisible: true
        }
    },
    computed: {
        isMobile() {
            return this.$store.getters.isMobile
        },
        isShowDialog() {
            return this.$store.getters.isShowDialog
        }
    },
    created() {
        if(this.isMobile) {
            if(!this.isShowDialog) {
                this.show = true;
                this.$store.commit('givenShowDialog', true);
            }
        }
        else {
            this.show = true;
        }
    }
}
</script>
<style lang="scss">
    .bs-dialog .el-dialog {
        border-radius: 6px;
        .el-dialog__title {
            font-size: 26px;
            font-weight: bold;
            color:#086599
        }
        .el-dialog__body {
            
            color:#086599
        }
        .btn-tcolor {
            margin-bottom: 20px
        }
        .el-dialog__close {
            border-radius: 50%;
            background-color: #A5C6DA;
            color: #fff;
            width: 28px;
            height: 28px;
            line-height: 28px;
        }
    }
    .pc {
        .bs-d-cont {
            font-size: 20px;
        }
        .bs-d-cont-ft-btn {
            font-size: 20px;
        }
    }
    .mobile {
        .bs-d-cont {
            font-size: 13px;
        }
        .bs-d-cont-ft-btn {
            font-size: 16px;
        }
    }
</style>
