<template>
    <Layer @close="close" title="购买体力">
        
        <div class="tl-wrap flex vc sb">
            <div class="tl-chuc">
                <div class="tl-avtar  flex vc hc">
                    <img src="../../../assets/images/bhearts.png" alt="">
                </div>
                <el-input-number :min=1 size="mini" v-model="amount"></el-input-number>
            </div>
            <div>
                <!-- <div class="kjbtn kjbtn-buy" @click="confirm">
                    
                </div> -->
                <el-button class="kjbtn kjbtn-buy" @click="confirm" :loading="false">
                    <i class="l-icon"></i>
                    <i>200 购买</i>
                </el-button>
            </div>
        </div>
    </Layer>
</template>
<script>
import Layer from './layer';
import i18n from 'i18n';
export default {
    data() {
        return {
            amount:1
        }
    },
    i18n,
    components: {
        Layer
    },
    beforeDestroy() {
        this.$el.parentElement.removeChild(this.$el);
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
.tl-wrap {
     padding: 0 0.2rem;
     .kjbtn {
         i {
             vertical-align: middle;
        }
         .l-icon {
             width: 0.16rem;
             height: 0.16rem;
             display: inline-block;
             background: url(../../../assets/images/licons.png) no-repeat 0 0.02rem/154%;
        }
    }
}
.tl-chuc {
    width: 1.4rem;
     
     .tl-avtar {
        height: 1.4rem;
        background-image:linear-gradient(to bottom,  #8d8d96 0%, #C6C5CB 6%, #C6C5CB 100%);
        img {
            max-width: 80%;
            max-height: 80%;
            vertical-align: middle;
        }
    }
}
 
 
</style>


