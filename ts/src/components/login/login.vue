<template>
    <div id="login" class="login">
        <div class="l-row input">
            <label for="" class="gcolor f12">{{$t('m.username')}}</label>
            <div>
                <input type="text" v-model.trim="l.username">
            </div>
        </div>
        <div class="l-row input">
            <label for="" class="gcolor f12">{{$t('m.mima')}}</label>
            <div>
                <input type="password" v-model.trim="l.password" @keyup.enter="loginHandle">
            </div>
        </div>
        <div class="l-row tcolor f12 right" style='margin: 6px 0'>
            <!-- <span>{{$t('m.autologin')}}</span>
            <el-switch
                v-model="l.autologin"
                active-color="#086599"
                inactive-color="#B9D3E2">
            </el-switch> -->
            <router-link to="/lg/fixpass">{{$t('m.wjmma')}}</router-link>
        </div>
        <!-- <div class="l-row  f12 checkbox" >
            <el-checkbox v-model="l.agree"><i class="f12 tcolor">{{$t('m.agreexieyi')}}</i></el-checkbox>
        </div> -->
        <div class="l-row center n-sure-wrap">
            <el-button class="n-sure" :loading="showLoader" @click='loginHandle' >{{$t('m.sure')}}</el-button>
        </div>
        <div class="l-row center tcolor f12">
            {{$t('m.nozhgo')}}<router-link to="/lg/registar"> {{$t('m.registar')}}</router-link>
        </div>
    </div>
</template>
<script>
import mixin from '../../mixins/index';

export default {
    data() {
        return {
            l: {
                autologin: false,
                agree: true,
                username:'',
                password:''
            },
            showLoader: false
        }
    },
    mixins:[mixin],
    methods: {
        checkLogin() {
            if(!this.l.username) {
                this.$message.info(this.$t('m.qtxyhm'));
                return false;
            }
            if(!this.l.password) {
                this.$message.info(this.$t('m.qsrmm'));
                return false;
            }
            if(!this.l.agree) {
                this.$message.info(this.$t('m.wtyxy'));
                return false;
            }
            return true;
        },
        loginHandle() {
            if(!this.checkLogin() || this.hasLogin)return;
            this.showLoader = true;
            this.verifyMan().then(res => {
                if(res.state == 'succ') {
                    this.toLogin(res.data);
                }
                else if(res.state == 'close'){
                     this.showLoader = false
                }
            }).catch(() => {
                this.showLoader = false
            });
        },
        toLogin(jtdata) {
            const l = this.l;
            request.toLogin({data: {
                username:l.username,
                password:l.password,
                is_agree: l.agree,
                
                challenge: jtdata.geetest_challenge,
                validate:jtdata.geetest_validate,
                seccode:jtdata.geetest_seccode,
                flag: this.flag
            }})
            .then(res => {
                this.$message.info(this.$t('m.loginsucc'));
                this.$store.commit('givenLoginInfo', res.data);
                this.hasLogin = true;
                setTimeout(() => {
                    let redirect = this.$route.query.redirect;
                    const hashuri = this.$route.query.hashuri;
                    if(redirect) {
                    //如果是外部链接， 就直接跳转
                    if(redirect.indexOf('https') > -1 || redirect.indexOf('http') > -1) {
                        return window.location.href = redirect + (hashuri ? '#/' + hashuri : '');
                    }
                    let jump = {
                        name: redirect
                    };
                    let obj = JSON.parse(sessionStorage.getItem('tsquery') || '{}');
                    sessionStorage.removeItem('tsquery');
                    if(Object.keys(obj).length > 0) {
                        jump.query = obj;
                    }

                    this.$router.push(jump);
                    }
                    else {
                        this.$router.push({ path: "/index" });
                    }
                }, 2000)
            }).
            finally(() => {
                this.showLoader = false;
            });
        }
    }
}
</script>
<style lang="scss">
</style>

