<template>
    <Layer>
        <div class="inputpass dbox">
            <div class="ip-tt f20 center">{{$t('ms.sdym')}}</div>
            <div class="ip-info f14">{{$t('ms.sdym2')}}</div>
            <div class="ip-input">
                <input type="text">
            </div>
            <ul class="ip-hint f14">
                <li>
                    <i class="cha"></i> <span>{{$t('ms.char')}}</span>
                </li>
                <li>
                    <i class="cha"></i> <span>{{$t('ms.mustnumber')}}</span>
                </li>
                <li>
                    <i class="gou">
                        
                    </i>
                    <span>{{$t('ms.mustchar')}}</span>
                </li>
            </ul>
            <div class="ip-btns flex">
                <div class="btn-round fma" @click="close">{{$t('ms.cancel')}}</div>
                <div class="btn-round fma" @click="confirm">{{$t('ms.confirm')}}</div>
            </div>
        </div>
    </Layer>
</template>
<script>
import Layer from './layer';
import i18n from '../../../i18n/index';
export default {
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
        }
    }
}
</script>

<style lang="scss">
.dbox {
    width: 375px;
    border-radius: 4px;
    background-color: #fff;
    padding: 32px;
    box-shadow: 0 0 10px rgba(0,0,0,8);
    transition: transform .3s ease-in-out;
    will-change: transform;
    animation: slidedown .3s ease-in-out;
    font-family: 'PingFangSC';
}
.ip-info {
    margin: 10px 0;
}
.ip-input {
    margin: 10px 0;
    input {
        width: 100%;
        height: 35px;
        line-height: 35px;
        border-radius: 4px;background-color: #ECECEC;
        border:none;
        outline: none;
        padding: 0 10px;
        box-sizing: border-box
    }
}
.ip-hint {
    i.cha {
        background-image: url(../../../assets/images/cha.png);
    }
    i.gou {
      background-image: url(../../../assets/images/gou.png);

    }
    i {
        display: inline-block;
        width: 14px;
        height: 14px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle
    }
    
    span {
        vertical-align: middle
    }
}

.ip-btns {
    justify-content: space-around;
    margin-top:10px;
    .btn-round {
        width: 115px;
        height: 35px;
        line-height: 35px;
        text-align: center;
    }
    .btn-cancel {
        border:1px solid var(--textcolor);
        background-color: #fff;
        color:var(--textcolor);
    }
    .btn-confirm {
        color:#fff;
        border:1px solid var(--textcolor);

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


