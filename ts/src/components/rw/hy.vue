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
                全球首个基于工作量证明的分布式营销服务组织
                <br>
                <br>
                1、工作量证明
                <br>
                通过价值通证的分发、认定、确权来激励整个营销生态中的数据积累和流转，推动组织/项目/个人的参与热情和项目价值增值。使得分润机制更公平、提供更多的项目参与机会。
                <br>
                <br>
                2、流量入口优势
                <br>
                将区块链+人脉的概念具象化，用户即为节点，通过个体价值的上链，收益价值的驱动，多维度项目支撑，平台将成流量的入口，以区块链模式带动传统/实体行业的变革，流量提供者也将得到流量变现的红利
            </div>
            <div class="gcolor m16">展开更多</div>
            <div class="n-btn btn-tcolor btn-calcer" @click="panelHandle('Calcer')">
                <img style="width: 18px" src="../../../assets/images/calcericon.png">
                <span>收益计算器</span>
            </div>
            <p class="gcolor"> 让您更了解每一份收获，选择更合适的方案</p>

            <div class="tcolor fw f18">合约任务列表</div>
            <p class="tcolor f14">限制：每人仅限购买一次任务合约</p>
            <ul class="rw-lists">
                <li class="flex sb vc" v-for="(list, index) in lists" :key="index">
                    <div class="flex">
                        <div class="rw-list-icon shadow">
                            <img src="../../../assets/images/group.png" alt="">
                        </div>
                        <div class="f14 rw-list-icon-info">
                            <span class="tcolor">{{list.name}}</span>
                            <div class="gcolor">{{list.price}}</div>
                        </div>
                    </div>
                    <div class="rw-list-btn tcolor f14 shadow" @click="panelHandle('Detail',index)">
                        查看
                    </div>
                </li>
            </ul>
        </div>

        <div class="rw-pic flex v fe">
            <div class="rw-pic-ft">
                <div class="rw-index-cube flex vc">
                    <div>
                        <img src="../../../assets/images/plogo.png" alt="">
                    </div>
                    <div class="rwic-info">
                        <div class="f20 fw link-logo">CryptoJOY</div>
                        <span class='f12 cp link-btn '>
                            <img src="../../../assets/images/link.png" alt="">
                            官网
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <RightPanel :show.sync="panelShow"  :fullScreen="fullScreen" class="rwPanel" >
            <component :is="panel" :panelData='panelData'></component>
        </RightPanel>
    </div>
</Page>
</template>
<script>
import Detail from './detail';
import Calcer from '../../calcer/index'

import {mapGetters} from 'vuex';
export default {
    components: {
        Detail,
        Calcer
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            fullScreen: false,
            panel: '',
            panelData:0,
            popShow: false,
            panelShow: false,
            lists: [
                {
                    name: '一星服务商',
                    price: '10000.00 CJS（最高优惠5%）'
                },
                {
                    name: '二星服务商',
                    price: '50000.00 CJS（最高优惠7%）'
                },
                {
                    name: '三星服务商',
                    price: '100000.00 CJS（最高优惠9%）'
                },
                {
                    name: '四星服务商',
                    price: '200000.00 CJS（最高优惠10%）'
                }
            ]
        }
    },
    methods: {
        panelHandle(type,index) {
            // if(this.isMobile) {
            //     return this.$router.push('/cj');
            // }
            this.fullScreen = type == 'Calcer';
            this.panel = {Detail, Calcer}[type];
            this.panelData = index;
            this.panelShow = true;
        },
        share() {
            
        }
    }
}
</script>

<style lang="scss">

</style>

