<template>
    <div class="detail">
        <div class="d-card flex">
            <div class="d-card-info">
                <h4>CJ_20</h4>
                <div>预计收益：400,000.00 SUC</div>
                <div>挖矿时长：275天</div>
                <div>剩余库存：100</div>
            </div>
            <div class="d-card-pic''">
                <img src="" alt="">
            </div>
        </div>
        <div class="h-btn">
            <i class="d-icon"></i>
            <i>1000CJT + 200SUC</i>
        </div>
        <div class="h-btn-hint center">
            <span>SUC余额：19,098.00</span>
            <div>CJT红包余额：19,098.00</div>
        </div>
        <div class="v-b-tt ">
            <span>权益等级差异</span>
        </div>
        <ul class="v-level-cont">
            <li class="flex">
                <span>VIP3</span>
                <span class="v-l-icon vip3"></span>
                <span>800CJT + 200SUC</span>
            </li>
            <li class="flex">
                <span>VIP2</span>
                <span class="v-l-icon vip2"></span>
                <span>1000CJT + 200SUC</span>
            </li>
            <li class="flex active">
                <span>VIP1</span>
                <span class="v-l-icon vip1"></span>
                <span>1000CJT + 200SUC</span>
            </li>
            <li class="flex">
                <span>VIP0</span>
                <span class="v-l-icon vip0"></span>
                <span>不符合该项兑换活动</span>
            </li>
        </ul>

        <Exkj :show.sync = 'dialogshow' :data="data" @cancel="cancel" @confirm="confirm"></Exkj>
    </div>
</template>
<script>
import Exkj from '../widget/dialog/exkj';
export default {
    components: {
        Exkj
    },
    data() {
        return {
            dialogshow: true,
            data: {
                price: '80809',
                machine: 'CJ_20'
            }
        }
    },
    methods: {
        confirm(ctx) {
            ctx.loader = true;
        },
        cancel() {
            
        }
    }
}
</script>
<style lang="scss">
.d-card {
    box-shadow: 3px 1px 9px 0 rgba(168,162,162,0.27);
    width: 100%;
    box-sizing: border-box;
    .d-card-pic {
        min-width: 80px;
    }
}
.d-card-info {
    padding: 10px;
    border-radius: 4px;
    color:#767676;
    font-size: .26rem;
    h4 {
        color:#333;
        font-size: .34rem;
    }
}
.h-btn {
    border-radius: 4px;
    background: #C6AC8C;
    line-height: 2.5;
    text-align: center;
    color:#fff;
    
    i {
        vertical-align: middle;
    }
    .d-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(../../assets/images/ii.png) no-repeat center/contain;
    }
}
.v-level-cont {
    position: relative;
    z-index: 0;
    li {
        line-height: 2.5;
        margin: 6px 0;
    }
    li.active {
        color:#333
    }
}
.v-level-cont:before {
    content:'';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 6px;
    left: 68px;
    width: 1px;
    border-left: 1px solid #D8D8D8;
}
.v-l-icon {
    width: 40px;
    height: 40px;
    background-image: url(../../assets/images/stars.png);
    background-size: 100% auto;
    margin: 0 16px;
}
.vip0 {
    background-position: 0 0;
}
.vip1 {
    background-position: 0 -70px;
}
.vip2 {
    background-position: 0 -130px;
}
.vip3 {
    background-position: 0 -196px;
}
.h-btn-hint, .h-btn,.d-card {
margin: 20px 0;
}
</style>

