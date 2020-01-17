<template>
<Page fixed class="flex v" :title="$t('m.hubnews')" 
:subtitle="$t('m.geekerzx')" routerBack="/about">
    <div class="news">
        <div v-if="!isMobile">
            <div class="f24 tcolor">{{$t('m.hubnews')}}</div>
            <span class="f12 gcolor">{{$t('m.geekerzx')}}</span>
        </div>
        <Scroll :fetch='fetch' trigger>
            <ul :class="`news-lists ${isMobile ? '' : 'flex fwrap '}`">
                <li :class="`shadow ${isMobile ? 'flex vc' : ''}`"  v-for='(item, index) in 50' :key='index'>
                    <div class="news-pic">
                        <img src="../../assets/images/bit.png" alt="">
                    </div>
                    <div class="news-text-wrap" :class="{flex1: isMobile}">
                        <div class="news-text f14 tcolor">
                            这里是资讯的标题，这里是资讯的标题这里是
                        </div>
                        <div class="f12 gcolor">11-11</div>
                    </div>
                </li>
            </ul>
        </Scroll>
    </div>
</Page>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
    methods: {
        fetch() {
            return new Promise();
        }
    }
}
</script>

<style lang="scss">

.pc {
    .news {
        width: 490px;
    }
    .news-lists {
        margin-top: 30px;
        li {
            width: 227px;
            border-radius: 4px;
            overflow: hidden;
            background-color: #fff;
            margin: 8px;
            cursor: pointer;

        }
        .news-pic {
            height: 149px;
            overflow: hidden;
        }
        .news-text-wrap {
            padding: 10px;
        }
        .news-text {
            width: 207px;
            height: 40px;
            overflow: hidden;
            margin-bottom: 6px;
        }
    }

}
.mobile {
    .news {
        margin-top: 75px;
        overflow-y: auto;
    }
    .news-lists {
        margin-top: 30px;
        padding: 0 16px;
        li {
            padding: 8px;
            border-radius: 4px;
            overflow: hidden;
            background-color: #fff;
            margin-bottom: 16px;
            cursor: pointer;
        }
        .news-pic {
            flex-shrink: 0;
            width: 80px;
            height: 80px;
            margin-right: 10px;
            overflow: hidden;
        }

        .news-text {
            max-height: 40px;
            overflow: hidden;
            word-break: break-all;
            word-wrap: break-word;
            margin-bottom: 6px;
        }
    }

}
</style>

