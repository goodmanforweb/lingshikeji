<template>
<Page title='更多' borderLine padding>
    <div class="tool" :class="{block: isMobile}">
        <div class="tool-hd" :class="{borderLine: isMobile}" :style="`${isMobile&&'paddingBottom:16px'}`">
            <div class="tcolor fw">必备工具</div>
            <span class="f12 gcolor">营销助手</span>
        </div>
        <div :class="`tool-lists ${isMobile ? 'm16' : 'm20'}`">
            <div class="flex vc" @click="isMobile ? $router.push('poster') : panelShow=true" :class="{block: !isMobile}">
                <span><img src="../../assets/images/tooli.png" alt=""></span>

                <div class="tcolor flex1 fw tool-list-text" :class="{center: !isMobile}">
                    专属海报
                </div>
            </div>
        </div>
        <RightPanel :show.sync="panelShow"  class="toolPanel" :fullScreen="true">
           <Poster   @update:show="panelShow = false"/>
        </RightPanel>
    </div>
</Page>
</template>
<script>
import Poster from './poster';
import RightPanel from '../widgets/panel/rightpanel';
import {mapGetters} from 'vuex';
export default {
    components: {
        RightPanel,
        Poster
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            panelShow: false
        }
    }
}
</script>
<style lang="scss">
.mobile {
    .tool {
        .tool-hd {
            margin-bottom : 16px;
        }
    }
    .tool-lists {
        .flex {
            >span {
                width: 60px;
                margin-right: 16px;
            }
        }
    }
}
.pc {
    .tool-lists {
        .block {
            >span {
                width: 60px
            }
            width: 250px;
            height: 100px;
        }
    }
}

</style>

