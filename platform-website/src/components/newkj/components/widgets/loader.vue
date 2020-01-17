<template>
    <div id="wloader" class="dlayer flex" v-if="show">
        <div class="logo"><img src="../../assets/images/logo.png" alt=""></div>
        <div class="kj-progress-bar">
            <div class="kp-wrap flex">
              <span class="kp-l"></span>
              <span class="kp-m"></span>
              <span class="kp-r"></span>
              <div class="kp-bar-wrap flex sb">
                <span class="kp-barer flex flex1">
                  <i class="p1 pg" :style="`width: ${progressbar}%`"></i>
                </span>
                <!-- <span class="kp-barer-text f23">{{progress}}%</span> -->
            </div>
          </div>
          <p class="center f22 textshadow">{{$t('ms.xts')}}</p>
        </div>  
    </div>
</template>
<script>
const picconfig = [
    'logo',
    'ask', 'bhearts', 'bk.jpg', 'box','buybtn', 'cz', 'darrow', 'bqiu', 'cjt','ddoc', 'dio', 
    'menu','zs','hbtn', 'lqiu', 'bqiu', 'plus', 'star', 'xingqi', 'exchangebk', 'mallbk','mallitemspecbk','paper'
];
export default {
    data() {
        return {
            show: true,
            progress: 12,
            bar: 0
        }
    },
    computed: {
        progressbar() {
            let t = 0;
            if(Math.ceil(this.progress) >= 5) {
                t = Math.ceil(this.progress)
            }
            else if(Math.ceil(this.progress) < 5 && Math.ceil(this.progress) > 0) {
                t = 5;
            }
            else if(this.progress == 0) {
                t = 5;
            }
            return t;
        }
    },
    created() {
        this.createLoader();
    },
    methods: {
        createLoader() {
            picconfig.map(el => {
                let t = el.indexOf('.') > -1 ? el : el+'.png';
                return require(`../../assets/images/${t}`);
            }).forEach(el => {
                let t = new Image();
                t.src = el;
                t.onload = () => {
                        this.bar++;
                        console.log(this.bar)
                    }
            })
        },
        setProgress() {
            const len = picconfig.length;
            this.progress = Math.ceil(this.bar/len*100);
            this.show = this.progress != 100;
        }
    },
    watch: {
        bar(n) {
            this.setProgress();
        }
    }
}
</script>
<style lang="scss">
#wloader {
    flex-direction: column;
    justify-content: space-between;
    // background: url(../../assets/images/bk.jpg) no-repeat center/cover;
    .logo {
        text-align:left;
        padding: 16px;
        img {
            width: 1.5rem;
            min-width: 90px;
        }
    }
.kp-barer {
        .p1 {
          
          background: url(../../assets/images/lbar.png) no-repeat center/100% 100%;
          position: relative;
        }
        .p1:after {
            content:'';
            position: absolute;
            top: 0;
            bottom: 0;
            right: -10px;
            width: 45px;
            height: 140%;
            transform: translateY(-25%);
            background: url(../../assets/images/dio.png) no-repeat center/contain;
        }
    }
}

</style>

