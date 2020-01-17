import util from '../../util/util';
import {mapGetters, mapActions} from 'vuex';
export default {
    data() {
        return {
            cd: {
                day:0,
                hour:0,
                minutes:0,
                seconds:0,
                show: true
            }
        }
    },
    computed: {
        ...mapGetters(['hticker']),
    },
    beforeDestroy() {
        this.cdticker && clearInterval(this.cdticker);
    },

    methods: {
        ...mapActions(['getuserinfo', 'getlatestrecord']),
        createCountDownTicker() {
            this.cdticker && clearInterval(this.cdticker);
            this.calcCountDown();
            this.cdticker = setInterval(() => {
                this.calcCountDown();
            }, 1000);            
        },
        calcCountDown() {
            let cd = new Date(this.latestrecord.endtime).getTime() - new Date().getTime();
            // let cd = new Date('2018-12-11 15:40:00').getTime() - new Date().getTime();
            // - +
            if(cd < 0) {
                this.cd = {
                    day:0,
                    hour:0,
                    minutes:0,
                    seconds:0,
                    show: true
                };
            }
            else {
                cd = cd/1000;
                let day, hour, minutes, seconds;
                let t = 24*60*60;
                day = Math.floor(cd/(t));
                hour = Math.floor((cd%(t))/(3600) );
                let k = (cd%(t))%(3600);
                minutes = Math.floor(k/60);
                seconds = Math.floor(k%60);
                this.cd = {
                    day,
                    hour,
                    minutes,
                    seconds,
                    show: day==0 && hour==0 && minutes==0 && seconds==0
                };
            }
           
            if(this.cd.show) {
                this.cdticker && clearInterval(this.cdticker);
                //清除app 中的ticker 
                // this.hticker && clearInterval(this.hticker);
                // this.getuserinfo(this);
                // this.getlatestrecord(this);
            }
        },
    },
    watch: {
        latestrecord: {
            immediate: true,
            deep: true,
            handler: function(n) {
                if(!util.isEmpty(n) && n.endtime) {
                    this.createCountDownTicker();
                }
            }
        }
    }
}