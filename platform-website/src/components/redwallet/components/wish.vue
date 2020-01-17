<template>
    <div class='wish-wrap'>
        <div class="close" @click="back"></div>
        <div class="wish">
            <div class="w-tt">
                <img src="../assets/images/w1.png" alt="">
            </div>
            <div class="w-mar">
                <div class="w-form">
                    <div class="w-fs htextshadow2">
                        发送金币数量
                    </div>
                    <input class="w-input din2" type="text" v-model.trim="num">
                    <div class="w-hint">
                        <div class="w-hint-gd htextshadow2" >每发送{{balance.min_money}}CJT可获得1次摇一摇机会</div>
                        <span>可用余额：{{balance.balance |currency }} CJT</span>
                        <div>
                            <a :href="jump" target="_blank">CJT不足？点此去充值</a>
                        </div>
                    </div>
                    <div class="w-fs htextshadow2">您的祝福语</div>
                    <ul class="flex w-yu" @click="chooseText">
                        <li class="l active">
                            阖家团圆，新春快乐
                        </li>
                        <li class="r">
                            牛气冲天，诸事顺利
                        </li>
                        <li class="l">
                            平安喜乐，心想事成
                        </li>
                        <li class="r">
                            身体健康，万事如意
                        </li>
                    </ul>
                </div>
                <div class="w-juhua">
                    <img src="../assets/images/xh2.png" alt="">
                </div>
                <div class="w-tbn center">
                    <el-button class="r-btn" @click="confirm" :loading="loader">
                        塞金币上吉祥树
                    </el-button>
                    <!-- <div class="r-btn" @click="confirm">塞金币上吉祥树</div> -->
                    <div><router-link to="/dash/fc">查看发送记录</router-link></div>
                </div>
                <img class="w3" src="../assets/images/w3.png" alt="">
            </div>
            
        </div>
        <div class="wish-layer flex" v-if="wishshow" :style="{zIndex:z}">
            <div class="wish-pay">
                <div class="w-p-tt flex sb">
                    <span class="h-hcolor">支付确认</span>
                    <span class="w-cancel" @click="cancel">取消</span>
                </div>
                <div class="w-p-bd">
                    <div class="w-p-row h-hcolor">
                        <div class="w-p-hint">请输入密码</div>
                        <input class="wps" type="text">
                    </div>
                     <div class="w-p-row h-hcolor">
                        <span class="w-p-hint">验证码</span>
                        <div class="w-yzm flex">
                            <input class="w-yzm-input flex1" type="text">
                            <span>获取验证码</span>
                        </div>
                    </div>
                    <div class="w-p-btn center">
                        确认
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import util from '../util/util';
import zmaneger from './widget/dialog/zindexmaneger';
import {mapActions, mapGetters} from 'vuex';
export default {
    data() {
        return {
            wishshow: false,
            z:zmaneger(),
            num: '',
            loader: false,
            jump: `${location.origin}/#/dashboard/wallet/cjt/deposit`
        }
    },
    created() {
        this.wishtext = '阖家团圆，新春快乐';
        this.getbalance(this);
    },
    beforeRouteEnter (to, from, next) {
        if(from.path.indexOf('dash') > -1  || !from.name) {

        }
        else {
            sessionStorage.setItem('wishbefore', from.path)
        }
        next();
    },
    computed: {
        ...mapGetters(['balance'])
    },
    methods: {
        ...mapActions(['getbalance', 'getuserinfo']),
        confirm() {
            // this.wishshow = true;
            this.sendhb();
        },
        cancel() {
            this.wishshow = false;
        },
        back() {
            // this.$router.back();
            const wishbefore = sessionStorage.getItem('wishbefore');
            sessionStorage.removeItem('wishbefore');

            this.$router.push({path: util.isEmpty(wishbefore) ? '/index' : wishbefore});
        },
        chooseText(e) {
            let target = e.target;
            if(target.tagName != "LI")return;
            
            [...target.parentElement.children].forEach(el => {
                el == target ? (el.classList.add('active'), this.wishtext = target.innerText) : el.classList.remove('active');
            })
        },
        check() {
            if(!this.num) {
                this.$message.info('请输入金币的数量');
                return false
            }
            if(!/\d+/.test(this.num)) {
                this.$message.info('金币只能为数字');
                return false
            }
            
            if(Number(this.num) < 1) {
                this.$message.info(`金币的数量最小值为1`);
                return false;
            }
            if(Number(this.num) > this.balance.balance) {
                this.$message.info(`不能超过最大值`);
                return false;
            }
            return true;
        },
        sendhb() {
            if(this.loader || !this.check())return;

            this.loader = true;
            util.sendhb({
                data: {
                    num: Number(this.num),
                    tip: this.wishtext.trim()
                }
            }, this)
            .then(res => {
                if(res.data.code == 0) {
                    this.getuserinfo(this);
                    this.$message.info('发送成功');
                }
            })
            .catch(err => {
              this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                this.loader = false;
            });
        }
    }
}
</script>

<style lang="scss">
.wish-wrap {
    color:#fff;
    position: relative;
    min-height: 100vh;
    background: url(../assets/images/wbk.jpg) no-repeat center/ 100% 100%;
    .r-btn {
        width: 100%;
        margin:0;
        height: 45px;
    }
}
.w-tt {
    min-height: 170px;
}
.wish {
    padding-bottom: 16px;
}
.w-hint-gd {
    color:#E9CBA5;
    
}
.w-input {
    height: 45px;
    border:none;
    border-radius: 4px;
    background-color: #FFFBE4;
    padding: 2px 8px;
    width: 100%;
    box-sizing: border-box;
}
.w-mar {
    margin: 0 32px;
}
.w-yu {
    flex-wrap: wrap;
    li {
        margin-bottom: 8px;
        border-radius: 6px;
        line-height: 2;
        width: calc(50% - 6px);
        box-sizing: border-box;
        background: url(../assets/images/wbtn.png) no-repeat center/ 100% 100%;
        position: relative;
        color:#383838;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    li.r {
        margin-left: 6px;
    }
    li.r:before {
        content:'';
        position: absolute;
        top: 0;
        bottom: 0;
        right: -16px;
        width: 35px;
        height: 35px;
        margin: auto;
        background: url(../assets/images/xh.png) no-repeat center/contain;
    }
    li.l:before {
        content:'';
        position: absolute;
        top: 0;
        bottom: 0;
        left: -16px;
        width: 35px;
        height: 35px;
        margin: auto;
        background: url(../assets/images/xh.png) no-repeat center/contain;
    }
    li.l {
        margin-right: 6px;
    }
    li.active {
        color:#E9CBA5;
    }
    li.active:before {
        
        animation: rotateh .3s linear;
    }
}
.w-juhua {
    text-align: right;
    margin-right: -32px;
    img {
        width: 100px;
    }
}
.w3 {
    width: 100px;
}
.wish-layer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: flex-end;
    background-color: rgba(0,0,0, .47)
}
.wish-pay {
    background-color: #fff;
    border-radius: 6px 6px 0 0;
}
.w-p-btn {
    background-color: #690606;
    border-radius: 4px;
    line-height: 2.5;
    
    color:#fff;
    margin: 20px 0;
}
.w-cancel {
    color:#4A90E2
}
.w-yzm {
    span{
        color:#AFA06B;
        border-left: 1px solid #AFA06B;
        padding: 0 10px;
    }
}
.w-p-tt {
    border-bottom: 1px solid rgba(235, 229, 229,.47);
    padding: 0 16px;
    line-height: 2.5;
}
.w-fs {
    color:#E9CBA5;
    padding: 10px 0;
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
}
.w-hint {
    margin: 10px 0;
}
.w-p-bd {
    margin: 0 16px;
}
.w-p-row {
    margin: 30px 0;
    .w-p-hint {
        line-height: 2;
    }
    .wps, .w-yzm, .w-yzm-input {
        height: 45px;
        line-height: 45px;
        border:none;
        outline: none;
        background-color: #F5F5F5;
        padding: 3px;
        box-sizing: border-box;
    }
    .wps, .w-yzm, {
        width: 100%
    }
    .w-yzm {
        align-items: center;
        input {
            height: 100%;
        }
        span {
            height: 20px;
            line-height: 1;
        }
    }
}
.w-tbn {
    >div:last-child {
         padding: 16px 0;
    }
}

</style>

