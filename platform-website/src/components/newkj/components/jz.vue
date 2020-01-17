<template>
    <div class="kj-jz w1100 ">
        <div class="kj-m-tt center">
            {{$t('ms.hqnljz')}}
        </div>
        <div class="kj-pw-jz flex sb">
            <div class="pw-jz-item flex vc">
                <div class="kjbtn kjbtn-stone">
                    <span class="cz scale"></span>
                </div>
                <div class="kj-jz-text ">
                    <div>{{$t('ms.buykj')}}</div>
                    <span>{{$t('ms.getpowerperday')}}</span>
                </div>
            </div>
            <div class="pw-jz-item flex vc">
                <div class="kjbtn kjbtn-stone">
                    <span class="export  scale"></span>
                </div>
                <div class="kj-jz-text">
                    <div>{{$t('ms.loginperday')}}</div>
                    <span>{{$t('ms.hqmftl')}}</span>
                </div>
            </div>
            <div class="pw-jz-item flex vc">
                <div class="kjbtn kjbtn-stone">
                    <span class="yaoqing  scale"></span>
                </div>
                <div class="kj-jz-text">
                    <div>{{$t('ms.yqhyd')}}</div>
                    <span>{{$t('ms.jskj')}}</span>
                </div>
            </div>
        </div>

         <div class="kj-m-tt center" v-html="$t('ms.gameinstr')">
            
        </div>
        <p class="jz-info" v-html="$t('ms.des1')">
            
        </p>
    </div>
</template>

<script>
import mix from './mixins';
export default {
    mixins:[mix]
}
</script>

<style lang="scss">
</style>

