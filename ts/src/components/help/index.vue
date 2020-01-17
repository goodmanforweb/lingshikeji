<template>
<Page :title="$t('m.help')" borderLine padding routerBack="/tsindex">
    <div class="help">
        <el-collapse v-model="activeNames" :accordion="true">
            <el-collapse-item title="CJS、CJOY有什么区别？" name="1">
                <div>CJS为平台的价值货币，可用于矿机的购买、社区环境的治理、投票等确权行为，
                    CJOY为平台的流通货币，可自由的于二级市场买卖，购买服务等，基于Bancor协议，
                    CJS与CJOY之间建立了单向兑换关系，市场价格的波动将直接影响CJS兑换CJOY的比例。</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</Page>
</template>
<script>
export default {
    data() {
        return {
            activeNames: 1
        }
    }
}
</script>

<style lang="scss">
.el-collapse .el-collapse-item__header {
    background: #086599;
    color:#fff;
    border-radius: 4px;
    padding-left:16px; 
}
.el-collapse .el-collapse-item__content {
    color: #086599;
    padding-left: 16px;
    padding-bottom: 0px;
    margin: 20px 0 16px 16px;
    border-left: 2px solid #196593
    
}
.el-collapse .el-collapse-item__wrap {
    background: transparent;
    border-bottom: none;
}
.el-collapse .el-collapse-item__header {
    border-bottom: none;
}
.el-collapse .el-collapse-item {
    margin-bottom: 16px;
}
</style>

