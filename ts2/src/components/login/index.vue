<template>
<Page class="flex v">
    <div class="flex1 flex vc hcs" v-if="isMobile">
        <RLoginHTML />
    </div>
    <Layer notransition v-else >
        <RLoginHTML />
    </Layer>
</Page>
</template>
<script>
import Layer from '../widgets/layer';
import {mapGetters} from 'vuex';
import RLoginHTML from './rindex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
    components: {
        Layer,
        RLoginHTML
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss">
.logo-back {
    opacity: .3;
    font-size: 30px;
    transition: opacity .3s ease-in-out;
    position: absolute;
    bottom: -60px;
    right: 0;
    left: 0;
    width: 40px;
    height: 40px;
    margin: auto;

}
.logo-back:hover {
    opacity: 1;
}
.login {
    width: 460px;
    border-radius: 10px;
    background: #fff;
    padding: 0 30px 16px;
    box-sizing: border-box
}
.mobile {
    .login {
        width: 100%;
        margin: -40px 16px 0;
        border-radius: 16px;
        padding: 0 30px 16px;
    }
}
.l-logo {
    width: 80px;
    margin: -30px auto 0;
}
.l-logo-text {
    margin: 0 auto;
    width: 123px;
}
.lt-hd {
    margin-top: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #00598236
}
.lt-hd a {
    color:#8E9FA9;
    cursor: pointer;
    transition: all .3s linear;
}
.lt-hd a.router-link-active {
    color: #086599
}
</style>

