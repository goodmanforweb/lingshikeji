<template>
    <Page :title="$t('m.mancenter')" borderLine padding routerBack='/tsindex'>
        <span slot="layer-right-btn"><img style="width: 16px" src="../../assets/images/gear.png" alt=""></span>
        <div class="flex1 mancenter">
            <div class="head-pop block">
                <div class="tcolor center">
                    <div class='head hcenter'>
                        <img src="../../assets/images/man.png" alt="">
                    </div>
                    <div class="name fw">yoyo</div>
                    <div class="f12">86186***87</div>
                </div>
                
                <div class="star-line flex tcolor f12 vc m16">
                    <div class="star-icons">
                        <span><img style="width: 20px" src="../../assets/images/star.png" alt=""></span>
                        <div>VIP0</div>
                    </div>
                    <div class="star-lines flex flex1">
                        <div class="flex1 center active">
                            <span></span>
                        </div>
                        <div class="flex1 center">
                            <span></span>
                            <div>VIP1</div>
                        </div>
                    </div>
                </div>

                <div class='m20'>
                    <div class="balance-row tcolor center">
                        <span class="fw f26">1908080</span>
                        <span>CJS</span>
                    </div>
                    <div class="balance-row tcolor center">
                        <span class="fw f26">1908080</span>
                        <span>CJOY</span>
                    </div>
                </div>

                <div class="mhead-btns flex tcolor f14" >
                    
                    <div class="flex1 center" @click="$router.push('/my')">
                        <img src="../../assets/images/hyicon.png" alt="">
                        <div>{{$t('m.clubcenter')}}</div>
                    </div>
                    <div class="flex1 center">
                        <img src="../../assets/images/exitmicon.png" alt="" >
                        <div>{{$t('m.exit')}}</div>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.head-pop {
    .name {
        line-height: 2;
    }
}
.balance-row {
    width: 80%;
    line-height: 40px;
    background: #E8F1F7;
    border-radius: 4px;
    margin: 0 auto 4px;
}
.mhead-btns {
    padding-top: 16px;
    border-top: 1px solid rgba(0, 89, 130, 0.1);
    img {
        width: 20px;
        margin-bottom: 6px;
    }
    
}
.star-line {
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(0, 89, 130, 0.1);
}
.star-lines {
    >div span {
       display: block;
       height: 1px;
       background: #005982;
       opacity: .2;
       position: relative;

    }
    >div.active span {
        opacity: 1;
    }
    >div {
        div {
            margin-top: 6px;
        }
        span:after {
            content:'';
            position: absolute;
            top: -3px;
            right: 0;
            left: 0;
            margin: auto;
            background: #fff;

            width: 6px;
            height: 6px;
            border: 1px solid #005982;
            border-radius: 50%;
        }
    }
}
</style>

