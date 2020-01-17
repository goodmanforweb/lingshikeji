
const resetTickerData = () => ({
    days: 0,
    hours:0,
    min:0,
    sec:0
});
export default {
    data() {
        return {
            cdshow: false,
            cd: resetTickerData(),
            end_time: new Date().getTime()
        }
    },
    beforeDestroy() {
        this.clearTicker();
    },
    methods: {
        createCountDownTicker() {
            this.clearTicker();
            this.calcCountDown();
            this.cdticker = setInterval(() => {
                this.calcCountDown();
            }, 1000);            
        },
        calcCountDown() {
            // if(!this.end_time) return
            let cd = new Date(this.end_time).getTime() - new Date().getTime();
            // let cd = new Date('2019-12-11 15:40:00').getTime() - new Date().getTime();
            // - +
            if(cd <= 0) {
                this.cd = resetTickerData();
                this.clearTicker();
                return
            }

            cd = cd/1000;
            let days, hours, min, sec;
            const t = 24*60*60;
            days = Math.floor(cd/(t));
            hours = Math.floor((cd%(t))/(3600) );
            const k = (cd%(t))%(3600);
            min = Math.floor(k/60);
            sec = Math.floor(k%60);

            this.cd = { days, hours, min, sec };
            this.cdshow = days==0 && hours==0 && min==0 && sec==0;
            if(this.cdshow) {
                this.clearTicker();
                this.$message.info(this.$t('m.hyydq'));
            }

        },
        clearTicker() {
            this.cdticker && clearInterval(this.cdticker);
        },
    }
}