<template>
   <Page float styleBackIcon='filter: brightness(50);' routerBack="/index" class="flex" style="width: 100%">
    <div class="about flex flex1 hc vc" :class="{v: isMobile}">
        <div class="about-bd">
            <div class="center f250">{{$t('m.about')}}</div>
            <div class="center bigtext">
                <img  src="../../assets/images/tt.png" alt="">
            </div>
            <div class="f14 bigtextinfo f250" >
                {{$t('m.aboutdesc')}}
            </div>
            <ul class="about-lists hc f350" :class="{flex: !isMobile}">
                <li class="block flex tcolor vc">
                    <span>
                        <img style="width:47px" src="../../assets/images/wb.png" alt="">
                    </span>
                    <span class="flex1 center">
                        {{$t('m.whitepaper')}}
                    </span>
                </li>
                <li class="block flex tcolor vc" >
                    <span>
                        <img style="width:47px" src="../../assets/images/video.png" alt="">
                    </span>
                    <span class="flex1 center">
                        {{$t('m.video')}}
                    </span>
                </li>
                <li class="block flex tcolor vc" @click="itemHandle">
                    <span>
                        <img style="width:47px" src="../../assets/images/news.png" alt="">
                    </span>
                    <span class="flex1 center">
                        {{$t('m.news')}}
                    </span>
                </li>
            </ul>
        </div>

        <footer class="center" style="margin: 20px 0;">
           <span class="gcolor f12">
                 {{$t('m.go')}}
           </span>
            <span class="f12">
                <img style="width: 20px" src="http://cjoy.oss-cn-hongkong.aliyuncs.com/new/17701555310383_.pic.jpg" alt="">
                <i class="fw">
                    cjoy.games
                </i>
            </span>
            <span class="gcolor f12">{{$t('m.learnmore')}}</span>
        </footer>

        <RightPanel :show.sync="panelShow"  class="newsPanel" >
           <News  @update:show="panelShow = false"/>
        </RightPanel>
    </div>
</Page>
</template>
<script>
import RightPanel from '../widgets/panel/rightpanel';
import News from './news';
import {mapGetters} from 'vuex';
export default {
    components: {
        RightPanel,
        News
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            panelShow: false
        }
    },
    methods: {
        itemHandle() {
            // if(this.isMobile) {
            //     this.$router.push('/news');
            // }
            // else {
            //     this.panelShow=true
            // }
        }
    }
}

</script>
<style lang="scss">
.about {
    padding-top: 20px;
    color:#fff;
    position: relative;
    background: url(../../assets/images/clod.jpg) no-repeat center/cover;
}
.about-lists {
    margin: 20px 0;
    li {
        width: 215px;
        cursor: pointer;
        background: rgba(255,255,255,.7)
    }
    li:nth-child(2) {
        margin: 0 20px;
    }
}
.pc {
    .about {
        footer {
            position: absolute;
            bottom: 16px;
            left: 0;
            right: 0;
        }
    }
    .about-bd {
        width: 808px;
        margin: -40px auto 0;
    }
    .bigtext {
        margin: 20px auto;
        img {
            width: 500px;
        }
    }
    .bigtextinfo {
        margin: 40px 0;
    }
}
.mobile {
    .about-lists li {
        margin:16px auto;
    }
    .bigtext {
        width: 90%;
        margin: 20px auto;
    }
    .bigtextinfo {
        margin: 40px auto;
        width: 85%;
    }
}
</style>

