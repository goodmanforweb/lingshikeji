<template>
    <Layer @close="close" :title="$t('ms.hint')">
        <p class="lcolor buyifno">{{$t('ms.ifbuy')}} <span style="color:#ED6363">{{data.text}}</span>？</p>
        <div>
            <!-- <div class="kjbtn kjbtn-buy" @click="confirm"></div> -->
            <el-button class="kjbtn ks-btn kjbtn-buy audiobtn" @click="confirm">
                {{$t('ms.confirm')}}
            </el-button>
        </div>
    </Layer>
</template>
<script>
import Layer from './layer';
import i18n from 'i18n';
export default {
    data() {
        return {
            data: {
                src: '',
                text:''
            }
        }
    },
    i18n,
    components: {
        Layer
    },
    beforeDestroy() {
        this.$el.parentElement.removeChild(this.$el);
    },
    created() {
        
    },
    methods: {
        close() {
            this.closer && this.closer();
            this.$destroy();
        },
        confirm() {
            this.confirmr && this.confirmr();
            this.$destroy();
        }
    }
}
</script>

<style lang="scss">
.dbox {
     width: 3.75rem;
     max-width: 4.5rem;
     border-radius: 0.04rem;
     padding: 0.32rem;
     color:#fff;
     box-shadow: 0 0 0.1rem rgba(0,0,0,8);
     transition: transform .3s ease-in-out;
     will-change: transform;
     animation: slidedown .3s ease-in-out;
}
 .dbox {
     position: relative;
     padding: 0.1rem;
     border-radius: 0.1rem;
     background-image: linear-gradient(-180deg, #B9B9B9 0%, #B3B3B3 12%, #ADADAD 24%, #A5A5A5 39%, #9E9E9E 51%, #979797 64%, #929292 73%, #8F8F8F 80%, #8A8A8A 88%, #848484 100%);
}
 .dbox-wrap {
     border-radius: 0.1rem;
     background-image: linear-gradient(-180deg, #D6D6D6 0%, #D0D0D0 14%, #CECECE 21%, #C9C9C9 32%, #C5C5C5 41%, #C0C0C0 53%, #BABABA 69%, #B7B7B7 76%, #ADADAD 100%);
     box-shadow: 0 0.02rem 0.04rem 0 rgba(0,0,0,0.84);
}
 .dbox-close-btn {
     position: absolute;
     top:-0.2rem;
     right:-0.2rem;
     width: 0.6rem;
     height: 0.6rem;
     min-width: 35px;
     min-height: 35px;
     background: url(../../../assets/images/closebtn.png) no-repeat center/contain;
}
 .dbox-tt {
     height: 0.6rem;
    line-height: 0.45rem;
     width: 80%;
     margin: -0.3rem auto 0;
     background: url(../../../assets/images/malltt.png) no-repeat center/contain;
}
 .dbox-cont {
     padding: 0.3rem 0;
     p {
         padding: 0.16rem;
    }
     .kjbtn {
        //  width: 1.1rem;
         display: inline-block;
    }
}
 

@keyframes slidedown {
    0% {
        transform: translateY(-2000px)
    }
    50% {
        transform: translateY(-1000px)
    }
    100% {
        transform: translateY(0)
    }
}


</style>


