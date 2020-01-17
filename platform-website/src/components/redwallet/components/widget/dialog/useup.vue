<template>
    <Layer @close="$emit('update:show');$emit('cancel')" v-if="show">
        <div class="useup">
            <h4 class="center">本轮机会已用尽 </h4>
            <p class="center">
               
以下是快速获取机会的小秘籍，点击屏幕左上角：

            </p>
            <div class="icon-btn flex vc">
                <span class=" icon-pic share"></span>
                <i class="flex1">
                    分享游戏海报给好友，好友成功注册Cryptojoy后，每参与3次摇一摇您即可获得一次机会
                </i>
            </div>
            <div class="icon-btn flex vc">
                <span class=" icon-pic coin"></span>
                <i class="flex1">
                    塞金币到吉祥树，将祝福传递给Cryptojoy社区，每发送{{balance.min_money}}CJT即可获得1次机会
                </i>
            </div>
            <div class="icon-btn flex vc">
                <span class=" icon-pic rule"></span>
                <i class="flex1">
                    查看游戏攻略获取更多详细玩法
                </i>
            </div>
        </div>
    </Layer>
</template>
<script>
import Layer from './layer';
import {mapGetters} from 'vuex';
export default {
    props: ['show'],
    components: {
        Layer
    },
    computed: {
        ...mapGetters(['balance'])
    },
}
</script>

<style lang="scss">

</style>
