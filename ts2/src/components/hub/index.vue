<template>
<Page :title="$t('m.hubcenter')" borderLine padding>
    <div class="hub">
        <div class="hub-ad">广告</div>
        <div class="hub-bd flex" :class="{v:isMobile}">
            <div class="hub-cube-lists flex1 flex fwrap" :class="{sb:isMobile}">
                <div class="block center re" :class="{qybackcolor: list.icon}" v-for="(list, index) in lists" :key="index" @click="itemhandle(list)">
                    <span v-if="list.icon" :class="`icon-state ${list.icon}-icon`"></span>
                    <span class="f12 " >{{list.state}}</span>
                    <div class="tcolor f20">{{list.name}}</div>
                    <div class="hub-icon"></div>
                    <div class="f12 tcolor">{{$t('m.wkang')}}</div>
                    <div class="f12 tcolor">{{list.price}}CJOY{{$t('m.qi')}}</div>
                    <div class="gcolor f12 last-line">{{list.cat}}{{$t('m.lkjyx')}}</div>
                </div>
            </div>
            <div class="hub-aside flex v sb">
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
        </div>
        <RightPanel :show.sync="panelShow"  :fullScreen="true" class="hubPanel">
            <component :is="panel"></component>
        </RightPanel>
    </div>
</Page>
</template>

<script>
import DOT from '../rw/dot/index';
import BN from '../rw/bn/index';

import {mapGetters} from 'vuex';
export default {
    components: {
        DOT,
        BN
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            panel:'',
            panelShow: false,
            radios: [
                {
                    text: 'allpro',
                    active: true
                },
                {
                    text: 'proisbuying',
                    active: false
                },
                {
                    text: 'proexe',
                    active: false
                },
                {
                    text: 'over',
                    active: false
                }
            ],
            lists: [
                {
                    state: '执行中',
                    name: 'FunnyUp',
                    icon: '',
                    price: 300,
                    cat: 3,
                    icon: 'yqy'
                },
                {
                    state: '执行中',
                    name: 'FunnyUp',
                    icon: '',
                    price: 300,
                    cat: 3,
                    icon: 'qysx'
                },
                {
                    state: '执行中',
                    name: 'FunnyUp',
                    icon: '',
                    price: 300,
                    cat: 3,
                    icon: 'tyrz'
                },
                {
                    state: '执行中',
                    name: 'FunnyUp',
                    icon: '',
                    price: 300,
                    cat: 3
                },
                {
                    state: '执行中',
                    name: 'FunnyUp',
                    icon: '',
                    price: 300,
                    cat: 3
                },
                {
                    state: '执行中',
                    name: '币诺',
                    icon: '',
                    price: 300,
                    cat: 3
                },

            ]
        }
    },
     methods: {
        radioHandle(idx, value) {
            this.radios.forEach((el, index) => {
                el.active = index == idx
            })


            //value
        },
        itemhandle(item) {
            if(this.isMobile) {
                return this.$router.push(`${{'FunnyUp': 'dot', '币诺': 'bn'}[item.name]}rw`)
            }

            this.panel = {'FunnyUp': DOT, '币诺': BN}[item.name];
            this.panelShow = true
        }
    }
}
</script>

<style lang="scss">
.qybackcolor {
    background-color: #EAF4FF;
}
.icon-state {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 46px;
    height: 46px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 35px auto;
}
.mobile {
    .icon-state {
        width: 35px;
        height: 35px;
        background-size: 25px auto;
    }
}
.yqy-icon {
    background-image: url(../../assets/images/yqyicon.png)
}
.qysx-icon {
    background-image: url(../../assets/images/qysxicon.png)
}
.tyrz-icon {
    background-image: url(../../assets/images/tyrzicon.png)
}

.hub-ad {
    height: 100px;
}
.hub-aside {
    width: 120px;
    padding: 8px;
}
.hub-cube-lists>.block {
    width: 233px;
    // height: 266px;
    cursor: pointer;
    line-height: 2;
    margin: 8px;
    box-sizing: border-box;
    transition: all .3s linear;
    border: 1px solid transparent;
}
.hub-cube-lists>.block:hover, 
.hub-cube-lists>.block.active {
    border: 1px solid #086599;
}
.hub-icon {
    width: 46px;
    height: 46px;
    display: inline-block;
    border-radius: 50%;
    background: url(../../assets/images/jj.png) no-repeat center/30px;
    background-color: #196593;
    margin: 16px 0;
}
.last-line {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid rgba(8, 100, 153, 0.1);
    // line-height: 30px;
}
.hubPanel {
    >.rp-aside {
        display: flex;
    }
    >.rp-aside .rw {
        flex: 1
    }

}
.kj-state {
    ul {
        padding-right: 20px;
    }
    ul:after {
        content:'';
        position: absolute;
        top:16px;
        z-index: 0;
        bottom: 16px;
        right: 8px;
        width: 1px;
        border-right: 1px solid #CADDE8;
    }
    li {
        cursor: pointer;
        line-height: 40px;
        text-align: right;
        color:#8E9FA9;
        position: relative;
        transition: all .3s linear;
    }
    li.active {
        color:  #086599;
    }
    li.active:after {
        background: #fff;
        border: 2px solid #086599;
        width: 6px;
        height: 6px;
    }
    li:after {
        content:'';
        position: absolute;
        top:0;
        bottom: 0;
        margin: auto;
        right: -16px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #CADDE8;
        
    }
}
.mobile {
    .kj-state-dot {
        border-top: 1px solid #CADDE8;
        width: 100%;
        padding-top: 6px;
        padding-right:0;
    }
    .hub-aside {
        order: 0;
        width: 100%;
        padding: 0;
    }
    .hub-cube-lists {
        order: 1
    }
    .kj-state {
        li:after {
            top:-52px;
            right: 0;
            left: 0;
            width: 10px;
            height: 10px;
        }
        li:first-child:after {
            left: 0;
            right:auto;
        }
        li:last-child:after {
            left: auto;
            right:0;
        }
    }
    .hub-cube-lists>.block {
        width: 48%;
        margin: 8px 0;
        line-height: 1.8;
    }
    .hub-icon {
        margin: 10px 0;
    }
    .last-line {
        margin-top: 12px;
        padding-top: 10px;
    }
    


}
</style>

