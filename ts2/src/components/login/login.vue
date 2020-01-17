<template>
    <div id="login">
        <div class="l-row input">
            <label for="" class="gcolor f12">{{$t('m.username')}}</label>
            <div>
                <input type="text">
            </div>
        </div>
        <div class="l-row input">
            <label for="" class="gcolor f12">{{$t('m.mima')}}</label>
            <div>
                <input type="text">
            </div>
        </div>
        <div class="l-row flex sb tcolor f12" style='margin: 6px 0'>
            <span>{{$t('m.autologin')}}</span>
            <el-switch
                v-model="autologin"
                active-color="#086599"
                inactive-color="#B9D3E2">
            </el-switch>
        </div>
        <div class="l-row  f12 checkbox" >
            <el-checkbox v-model="checked"><i class="f12 tcolor">{{$t('m.agreexieyi')}}</i></el-checkbox>
        </div>
        <div class="l-row center n-sure-wrap">
            <el-button class="n-sure">{{$t('m.sure')}}</el-button>
        </div>
        <div class="l-row center tcolor f12">
            {{$t('m.nozhgo')}}<a href="">{{$t('m.registar')}}</a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            autologin: false,
            checked: false
        }
    }
}
</script>
<style lang="scss">
#login .input {
    margin: 16px 0;
}
#login .input input {
    border:none;
    width: 100%;
    outline: none;
    height: 35px;
    color: #086599;
    border-bottom: 1px solid #DAE6EC;
}
.checkbox .el-checkbox__input.is-checked .el-checkbox__inner, 
.checkbox .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #086599;
    border-color: #086599;
}
.n-sure-wrap {
    margin: 16px 0;
}
#login  .n-sure {
    border-color: #086599;
    background: #086599;
    color:#fff;
    width: 100%
}
</style>

