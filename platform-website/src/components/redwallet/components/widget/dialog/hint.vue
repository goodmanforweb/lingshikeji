<template>
        <Layer @close="$emit('update:show');$emit('cancel')" v-if="show">
            <div class="tosee center">
                <h4 >FOMO模式开启啦 </h4>
                <p>
                    Joy摇摇乐玩法再升级，摇一摇加时赛更紧张更刺激！
                </p>
                <p>
                    每回合中玩家每摇一次，开奖时间就会增加{{saletime.received_add_time || 0}}秒，当轮时间不超过{{Math.ceil((saletime.wait_duration || 0)*60)}}分钟，同时奖池也在持续累积中。
                </p>
                <p>
                    谁会是最后一位赢过时间的大奖幸运得主？赶紧来摇福气，拼运气！
                </p>
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
        ...mapGetters(['saletime'])
    }
}
</script>
