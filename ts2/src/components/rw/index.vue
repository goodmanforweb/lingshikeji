<template>
<Page class="rw-page" title="FunnyUp" borderLine padding>
    <template slot="layer-right-btn" >
        <el-popover
            popper-class="popper"
            placement="bottom"
            width="80"
            trigger="hover"
            v-model="popShow">
            <div class="share" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

                <span></span>
                <span></span>
            </div>
            <span class="rw-dots center" slot="reference" @click="popShow = !popShow">
                <i></i>
            </span>
        </el-popover>
    </template>
    <div class="rw" :class="{flex: !isMobile}">
        <div class="rw-text">
            <div class="share" v-if="!isMobile">
                <span>
                </span>
                <span>
                </span>
            </div>
            <div class="rw-text-cont tcolor">
                1、工作量证明
                <br>
                通过价值通证的分发、认定、确权来激励整个营销生态中的数据积累和流转，推动组织/项目/个人的参与热情和项目价值增值。使得分润机制更公平、提供更多的项目参与机会。
                <br>
                <br>
                2、流量入口优势
                <br>
                将区块链+人脉的概念具象化，用户即为节点，通过个体价值的上链，收益价值的驱动，多维度项目支撑，平台将成流量的入口，以区块链模式带动传统/实体行业的变革，流量提供者也将得到流量变现的红利
            </div>
            <div class="tcolor fw">任务矿机</div>
            <ul class="rw-lists">
                <li class="flex sb vc" v-for="(list, index) in lists" :key="index">
                    <div class="flex">
                        <div class="rw-list-icon shadow">
                            <img src="../../assets/images/group.png" alt="">
                        </div>
                        <div class="f14 rw-list-icon-info">
                            <span class="tcolor">{{list.name}}</span>
                            <div class="gcolor">{{list.price}}CJS</div>
                        </div>
                    </div>
                    <div class="rw-list-btn tcolor f14 shadow" @click="check">
                        查看
                    </div>
                </li>
            </ul>
        </div>

        <div class="rw-pic flex v fe">
            <span class="re-close" @click="$emit('update:show', false)">完成</span>
            <div class="rw-pic-ft">
                <div class="rw-index-cube flex vc">
                    <div>
                        <img src="../../assets/images/plogo.png" alt="">
                    </div>
                    <div class="rwic-info">
                        <div class="f20 fw link-logo">CryptoJOY</div>
                        <span class='f12 cp link-btn '>
                            <img src="../../assets/images/link.png" alt="">
                            官网
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <RightPanel :show.sync="panelShow"  class="rwPanel" >
           <CJ  @update:show="panelShow = false"/>
        </RightPanel>
    </div>
</Page>
</template>
<script>
import RightPanel from '../widgets/panel/rightpanel';
import CJ from './cj';
import {mapGetters} from 'vuex';
export default {
    components: {
        RightPanel,
        CJ
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            popShow: false,
            panelShow: false,
            lists: [
                {
                    name: '推广新用户注册',
                    price: 89898989
                },
                {
                    name: '推广新用户注册',
                    price: 89898989
                },
                {
                    name: '推广新用户注册',
                    price: 89898989
                },
                {
                    name: '推广新用户注册',
                    price: 89898989
                },
                {
                    name: '推广新用户注册',
                    price: 89898989
                },

            ]
        }
    },
    methods: {
        check() {
            if(this.isMobile) {
                return this.$router.push('/cj');
            }
            this.panelShow = true;
        },
        share() {
            
        }
    }
}
</script>

<style lang="scss">
</style>

