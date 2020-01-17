<template>
    <transition name="fade">
        <div class="hloader-wrap hlayer flex vc hc v" v-if="ratio != 1">
            <div class="hloader-center center">
                <span>新春摇一摇，诸事喜运到</span>
                <div class="hloader">
                    <span class="hloader-bar" :style="{width: ratio*100+'%'}"></span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
const config = ['viptt.jpg','wbk.jpg','icon','p1-4','sharepic.jpg','r1-4','gif.gif','rbk','tree','hzs','gf',
'btt','ddlong','bolang','fire',
'firetree','bird','denglong','ddlongd',
'xiala','ltt','w1','w3','rtt','xh','xh2','ii','wdd2','fd','ljtt'];
export default {
    data() {
        return {
            ratio:0
        }
    },
    created() {
        this.hasload = 0;
        this.loader();
    },
    methods: {
        loader() {
            config.forEach(el => {
                let t = new Image();
                t.src = require(`../../assets/images/${el.indexOf('.') > -1 ? el : el + '.png'}`);
                t.onload = () => {
                    this.hasload++;
                    this.ratio = this.hasload/config.length;
                }
            })
        }
    }
}
</script>
<style lang="scss">
.hloader-wrap {
    z-index: 1000;
    .hloader-center {
        width: 90%;
        >span {
        font-size: .34rem;
        color: #FFCF78;
        
        }
        
       
    }
    
}
.hloader {
    margin-top: 20px;
    font-size: 0;
    height: 8px;
    text-align: left;
}
 .hloader-bar {
    transition: width .3s linear;
    height: 100%;
    border-radius: 4px;
    display: inline-block;
    background-image: linear-gradient(-90deg, #F9A80B 0%, #F6E024 100%);
    position: relative;
}
.hloader-bar:after {
    content:'';
    position: absolute;
    width: 30px;
    height: 30px;
    background: url(../../assets/images/yb.png) no-repeat center/contain;
    top: -13px;
    right: -10px;
}
</style>

