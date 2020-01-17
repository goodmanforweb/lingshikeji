<template>
    <div class="cjtcheck-wrap">
        <div class="cw-hd">
            <span class="cjoy">
                <router-link to="/index">
                    <img src="../../assets/images/lemonlogo.png" alt="">
                    <img src="../../assets/images/logotextb.png" alt="">
                </router-link>
            </span>
        </div>
        <div class="ccw">
            
            <div class="cb-tt center">
                <img src="../../assets/images/cjc.png" alt="">
                <p>{{$t('ms.howcjtcheck')}}</p>
            </div>
            <div class="cw-bd">
                <div class="cw-block cwb1 flex">
                    <div class="cwb-phone">
                        <img src="../../assets/images/phone1.png" alt="">
                    </div>
                    <div class="cwb-text">
                        <p>01</p>
                        <div>{{$t("ms.hcc1")}}</div>
                        <span class="cw-line"></span>
                    </div>
                    
                </div>
                <div class="cw-block cwb2 flex">
                    <div class="cwb-text">
                        <p>02</p>
                        <div>{{$t("ms.hcc2")}}</div>
                        <span class="cw-line"></span>
                    </div>
                    <div class="cwb-phone">
                        <img src="../../assets/images/phone2.png" alt="">

                    </div>
                </div>
                <div class="cw-block cwb3 flex" v-loading="">
                    <div class="cwb-phone">
                        <img src="../../assets/images/phone3.png" alt="">
                    </div>
                    <div class="cwb-text">
                        <p>03</p>
                        <div v-html="$t('ms.hcc3', {cjt})" class="cj-token-val"></div>
                        <span class="cw-line"></span>
                    </div>
                    
                </div>
                <div class="cw-block cwb4 flex">
                    <div class="cwb-text">
                        <p>04</p>
                        <div>{{$t("ms.hcc4")}}</div>
                        <span class="cw-line"></span>
                    </div>
                    <div class="cwb-phone">
                        <img src="../../assets/images/phone4.png" alt="">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import util from 'util';
import apiconfig from 'apiconfig';

export default {
    data() {
        return {
            cjt: apiconfig.assetid,
            showInfoLoader: false
        }
    },
    created() {
        // this.getPerInfo();
    },
    methods: {
        getPerInfo() {
      this.showInfoLoader = true;
      util
        .getPerInfo({}, {}, this)
        .then(res => {
          if (res.status == 200) {
            this.cjt = res.data.ctjAddress;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.showInfoLoader = false;
        });
    },
    }
}
</script>


<style lang="scss">
.cjtcheck-wrap {
    background: url(../../assets/images/cjtbk.png) no-repeat center;
    background-size: cover;

}
.cj-token-val {
    word-break: break-word;
    word-wrap: break-word;
}
.cw-hd {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px; 
}
.ccw {
    margin: 0 auto;
    max-width: 900px;
    font-family: 'pingfang';
    box-sizing: border-box;
    overflow: hidden;

}
.cb-tt {
    margin: 5rem 0;
    img {
        width: 45px;
    }
}
.cw-bd {
    margin: 13rem 0 3rem;
    padding: 1rem 2rem 4rem;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, .8)
}
.cwb-phone , .cwb-text{
    width: 50%;
}
.cw-block {
    margin-bottom: 4rem;
    align-items: center;
}
.cw-block:first-of-type {
    // transform: translateY(-20%);
    margin-top: -150px;
}
.cw-block:last-of-type {
    margin-bottom: 0;
}
.cwb-text {
    
    p {
        color:#62bcf2;
        font-size: 2.6rem;
        margin:0;
        opacity: 0.47;
    }
    >div {
        margin: 2rem 0;
        i {
            color:#1b5fa9
        }
    }
    .cw-line {
        display: inline-block;
        width: 30px;
        height: 4px;
        border-radius: 2px;
        background-color: #62bcf2;
        opacity: 0.47;
    }
}
.cwb-phone {
    text-align: center;
    img {
        width: 100%;
        max-width: 300px;
    }
}


@media screen  and (max-width: 700px){
    .cw-bd {
        margin: 14rem 1rem 3rem;
    }
    .cw-block {
        flex-direction: column;
        .cwb-phone {
            order: 1;
        }
        .cwb-text {
            order: 2;
            width: auto;
        }
        .cw-line {
            margin: 0 auto;
            display: block;
        }
    }
    .cw-block:first-of-type {
        margin-top: -80px;
    }
}
</style>


