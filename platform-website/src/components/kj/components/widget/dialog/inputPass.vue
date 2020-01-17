<template>
    <Layer>
        <div class="inputpass dbox">
            <div class="ip-bd center">
                <img v-if="data.src" :src="data.src" alt="">
                <p>{{$t('ms.surebuy', {kj:data.text})}}</p>
            </div>
            <div class="ip-btns flex">
                <div class="btn-round fma" @click="confirm">{{$t('ms.confirm')}}</div>
                <div class="btn-round fma" @click="close">{{$t('ms.cancel')}}</div>
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
    width: 375px;
    max-width: 450px;
    border-radius: 4px;
    background-color: rgba(38,32,94, .47);
    padding: 32px;
    color:#fff;
    box-shadow: 0 0 10px rgba(0,0,0,8);
    transition: transform .3s ease-in-out;
    will-change: transform;
    animation: slidedown .3s ease-in-out;
    font-family: 'PingFangSC';
}
.ip-bd {
    img {
        width: 60px;
    }
    p {
        font-size: 20px;
    }
}

.ip-btns {
    justify-content: space-around;
    margin-top:40px;
    text-transform: capitalize;
    .btn-round {
        width: 115px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        border-radius: 20px;
        border:1px solid #fff;
    }
    .btn-round:hover {
        background-color: #c120ff;
        border-color:#c120ff
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


@media screen and (max-width: 700px){
    .dbox {
        width: 75%;
        .ip-bd {
            p {
                font-size: 16px;
            }
        }
    }
}
</style>


