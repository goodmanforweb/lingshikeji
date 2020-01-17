<template>
    <Layer @close="close" :title="$t('ms.gxgm')" class="firewrap">
        <div class="fire-box flex hc">
            <div class="fire-ani" v-if="show"></div>
            <div class="fire-box2">
                <div class="f34 fire-num textshadow center">
                    <div style="padding-bottom: 10px">{{$t('ms.zghd')}}</div>
                    {{mined}} SUC
                </div>
                <div class="fire-ani-center">
                <div class="sharetext f18" >{{$t('ms.sharewin')}}</div>
                    <el-button class="kjbtn kjbtn-buy audiobtn" @click="confirm" :loading='btnloader' >
                        {{$t('ms.shareposter')}}
                    </el-button>
                </div>
            </div>
            
            
        </div>
    </Layer>
</template>
<script>
import Layer from './layer';
import i18n from 'i18n';
import store from 'store';
import router from 'xrouter';
import util from 'util';
import {mapGetters} from 'vuex';
import Poster from '../poster/index';
import Hub from 'hub';
export default {
    data() {
        return {
            data: {
                src: '',
                text:''
            },
            posterVisible: false,
            posterText:'',
            btnloader: false,
            mined:0,
            show: false,
        }
    },
    i18n,
    store,
    router,
    components: {
        Layer,
        Poster
    },
    beforeDestroy() {
        this.$el.parentElement.removeChild(this.$el);
    },
    computed: {
        ...mapGetters(['pool'])
    },
    created() {
        this.coin = document.querySelector('#coin');
        setTimeout(() => {
            (util.checkSys() != 'ios') && this.coin.play();
            this.show = true;
            setTimeout(() => {
                this.show = false;
            }, 2000)
        }, 200)
    },
    mounted() {
        
    },
    methods: {
        close() {
            this.closer && this.closer();
            this.$destroy();
        },
        confirm() {
            this.confirmr && this.confirmr();
            this.showPoster();
            // this.$destroy();
        },
        showPoster() {
            this.close();
            this.posterVisible = true;
            this.posterText = 'sdfasfdsafsafdsa';
            Hub.$emit('kjposterChange', {
                state: true,
                data: this.mined
            })
        },
        posterClose() {
            this.posterVisible = false;
        }
    },
    watch: {
        '$route.name': function() {
            this.close();
        }
    }
}
</script>

<style lang="scss">
.firewrap {
    .dbox {
        width: 4rem;
        background: #ce5d5d;
        max-width: none;
    }
    .dbox-wrap {
        background: #fde1cb;
        // height: 3rem;
        position: relative;
    }
    .fire-num {
        margin-top: 0.30rem;
        margin-bottom: .20rem;
    }
    .dbox-tt {
        background-image: url(../../../assets/images/cong.png)
    }
    .dbox-cont {
        width: 100%;
        height: 100%;
        // position: absolute;
        // top: 0;
        // right: 0;
        // bottom: 0;
        // left: 0;
        box-sizing: border-box;
        padding:0;
    }
    .fire-box {
        // height: 100%;
        // flex-direction: column;
        // justify-content: flex-end;
    }
    .fire-ani {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 90;
        background: url(../../../assets/images/fireani.gif) no-repeat center/cover;
    }
    .fire-box2 {
        // position: absolute;
        // top: 0;
        // right: 0;
        // bottom: 0;
        // left: 0;
        // z-index: 80;
        flex-direction: column;
        >span {
            display: inline-block;
            width: 1.1rem;
            height: 1.1rem;
            background: url(../../../assets/images/highlight.png) no-repeat center/cover;
        }
        div {
            // margin-top: -.15rem;
        }

    }
    .fire-ani-center {
        margin-bottom: 20px;
        text-align: center;
        >div {
            margin: 16px 0;
        }
    }
    .sharetext {
        color:#d93c3c;

    }
    .kjbtn {
        position: relative;
        z-index: 3000;
        background: url(../../../assets/images/redbtn.png) no-repeat center/contain!important;
    }
    .kjbtn:hover {
        filter: drop-shadow(0 5px 5px #E33E56)
    }

}
</style>


