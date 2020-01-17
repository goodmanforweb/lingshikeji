<template>
    <Page :title="$t('m.xxnotice')" borderLine padding routerBack='/tsindex'>
        <div class="notice flex1">
            <div class="block">
                <div class="n-tt tcolor fw">
                    {{$t('m.txx')}}
                </div>
                <div class="n-bd m20">
                    <ul>
                        <li>
                            <div class="f14 tcolor n-tit">{{$t('m.czcg')}}</div>
                            <span class="gcolor f12">2018.11.11 11:11:11</span>
                            <div class="n-bk center shadow tcolor">
                                <span class="fw">
                                    +10098
                                </span>
                                <span class="f12">CJOY</span>
                            </div>
                        </li>
                        <li>
                            <div class="f14 tcolor n-tit">充值成功</div>
                            <span class="gcolor f12">2018.11.11 11:11:11</span>
                            <div class="n-bk center shadow tcolor">
                                <span class="fw">
                                    +10098
                                </span>
                                <span class="f12">CJOY</span>
                            </div>
                        </li>
                        <li>
                            <div class="f14 tcolor n-tit">充值成功</div>
                            <span class="gcolor f12">2018.11.11 11:11:11</span>
                            <div class="n-bk center shadow tcolor">
                                <span class="fw">
                                    +10098
                                </span>
                                <span class="f12">CJOY</span>
                            </div>
                        </li>
                    </ul>
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
.n-bk {
    background: #E8F1F7;
    border-radius: 4px;
    line-height: 40px;
}
.n-bd {
    ul {
        margin-left: 14px;
        padding-left: 20px;
        border-left: 2px solid rgba(0, 89, 130, 0.399);
        li {
            margin: 4px 0 16px;
        }
    }
    .n-tit {
        position: relative;
    }
    .n-tit:before {
        content:'';
        position: absolute;
        top: 0;
        left: -30px;
        width: 18px;
        height: 18px;
        background: #086599;
        border-radius: 50%;
    }
}

</style>

