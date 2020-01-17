<template>
<Page :title="$t('m.mykj')"  borderLine padding>
    <div class="kj">
        <div class="flex sb" :class="{v:isMobile}">
            <div class="kj-cubes flex fwrap">
                <div class="block" v-for="(list, index) in lists" :key="index">
                    <div class="b-tt flex sb">
                        <div class="b-tt-text">
                            <span class="b-tt-icon">
                                <img src="../../assets/images/plogo.png" alt="">
                            </span>
                            <span class="tcolor fw">{{$t('m.pyqjzrw')}}</span>
                        </div>
                        <div class="b-tt-setting">
                            <span class="b-rotate" @click="list.rotate = !list.rotate">
                                <img src="../../assets/images/rotate.png" alt="">
                            </span>
                            <el-popover
                                popper-class="popper"
                                placement="bottom"
                                width="80"
                                trigger="hover"
                                v-model="list.pop">
                                <ul >
                                    <li class="cp" @click="showPanel('record')">{{$t('m.wkjl')}}</li>
                                    <li class="cp" @click="showPanel('hub')">{{$t('m.hubcenter')}}</li>
                                    <li class="cp" @click="showPanel('rw')">{{$t('m.rwsm')}}</li>
                                </ul>
                                <span class="b-san" slot="reference" @click="list.pop = !list.pop">
                                    <img src="../../assets/images/dots.png" alt="">
                                </span>
                            </el-popover>
                        </div>
                    </div>
                    <span class="f12 tqc" style="paddingLeft: 25px">NO.hsjkdfhkjsahfjkshjkf</span>

                    <div class="b-bd" v-if="!list.rotate">
                        <div class="center">
                            <span class="f12 gcolor">{{$t('m.ljwq')}}</span>
                            <div class="tcolor m20">
                                <span>CJOY</span>
                                <span class="f50">7879979</span>
                                <span>.98</span>
                            </div>
                            <span class="b-go-btn f12">
                                <router-link to="/rw">
                                {{$t('m.jrrwy')}}</router-link>
                            </span>
                        </div>
                        <div class="b-ticker">
                            <Ticker></Ticker>
                        </div>
                    </div>

                    <div class="b-bd-rotate" v-else>
                        <div class="m20">
                            <div class="b-row flex sb">
                                <span class="gcolor">{{$t('m.kjzl')}}</span>
                                <span class="tcolor">10000CJOY</span>
                            </div>
                            <div class="b-row flex sb">
                                <span class="gcolor">{{$t('m.kjjg')}}</span>
                                <span class="tcolor">10000CJS</span>
                            </div>
                            <div class="b-row flex sb">
                                <span class="gcolor">{{$t('m.buytime')}}</span>
                                <span class="tcolor">2018/11/11 11:11；12</span>
                            </div>
                        </div>

                        <div class="b-progress">
                            <Progress ></Progress>
                        </div>
                    </div>
                </div>
            </div>
            <div class="kj-aside  flex v sb">
                <div class="kj-state">
                    <ul :class="`${isMobile ? 'flex sb f12 kj-state-dot' : ''} re`">
                        <li @click="radioHandle(index, radio)" :class="{active: radio.active}" v-for="(radio, index) in radios" :key="index">{{$t(`m.${radio.text}`)}}</li>
                    </ul>
                </div>
                <div class="kj-pager flex sb" v-if="!isMobile">
                    <span class="kj-la"></span>
                    <span class="kj-ra"></span>
                </div>
            </div>
            <RightPanel :show.sync="panelShow" :fullScreen='fullScreen'>
                <component :is="panel" @update:show='val => panelShow = val'></component>
            </RightPanel>
        </div>
    </div>
</Page>
</template>
<script>
import RightPanel from '../widgets/panel/rightpanel';
import Record from './poolrecord';
import Hub from './prohub';
import RW from '../rw/index';
import Ticker from './ticker.vue';
import Progress from './progress';
import {mapGetters} from 'vuex';
export default {

    computed: {
        ...mapGetters(['isMobile'])
    },
    components: {
        RightPanel,
        Ticker,
        Progress
    },
    data() {
        return {
            visible: false,
            panel: Hub,
            panelShow: false,
            fullScreen: false,
            lists: [
                {
                    rotate: false,
                    pop: false
                },
                {
                    rotate: true,
                    pop: false
                },
                {
                    rotate: true,
                    pop: false
                },
                {
                    rotate: true,
                    pop: false
                }
            ],
            radios: [
                {
                    text: 'all',
                    active: true
                },
                {
                    text: 'running',
                    active: false
                },
                {
                    text: 'over',
                    active: false
                }
            ],
        }
    },
    methods: {
        showPanel(type) {
            let config = null;
            if(this.isMobile) {
                config = {
                    record: 'poolrecord',
                    hub: 'prohub',
                    rw: 'rw'
                }[type];
                this.$router.push(config);
                return;
            }
            config = {
                record: Record,
                hub: Hub,
                rw: RW
            }[type];
            this.fullScreen = type == 'rw';
            this.panelShow = true;
            this.panel = config;
            this.$nextTick(() => {
                this.visible = false;
            })
        },
        radioHandle(idx, value) {
            this.radios.forEach((el, index) => {
                el.active = index == idx
            })


            //value
        }
    }
}
</script>
<style lang="scss">
.popper {
    min-width: 80px!important;
    width: 80px;
    box-shadow:0px -8px 20px 0px rgba(25,101,147,0.1);
    ul > li {
        line-height: 30px;
    }
}
.b-go-btn {
    height:23px;
    background:#DAE9F0;
    border-radius:12px;
    color: #748D9C;
    padding: 2px 10px;
}
.b-tt-icon {
    img {
        width: 20px;
    }
}
.b-tt-setting {
    >span {
        cursor: pointer;
        display: inline-block;
        width: 24px;
        text-align: center;
    }
    .b-rotate img {
        width: 22px;
    }
    .b-san img {
        width: 4px;
        margin: 0 10px;
    }
}
.kj-cubes .block {

    box-sizing: border-box;

}
.pc {
    .kj-cubes .block {
        margin: 8px;
        max-height: 300px;
        max-width: 324px;
        width: 324px;
    }
    .kj-aside {
        width: 110px;
        min-width: 110px;
        padding: 8px 0;
    }

}
.mobile {
    .kj-cubes .block {
        margin-bottom: 16px;
        max-height: 300px;
        width: 100%
    }
    .kj {
        .kj-cubes {
            order: 1
        }
        .kj-aside {
            order: 0
        }
    }
}


</style>

