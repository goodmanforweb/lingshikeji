<template>
     <appIndex   @signData="signHandler"/>
</template>
<script>
import appIndex from './index'

export default {
    components: {
        appIndex
    },
    computed: {
        isFWS() {
            return this.$route.path.indexOf('fws') > -1
        }
    },
    methods: {
        signHandler(alldata) {
            let data = alldata.signData;
            this.projectinfo = alldata.projectData;
            if(!Object.keys(data).length) {
                      
                this.$store.commit('givenSignHYDetail', {
                    isSign: false, 
                    isLoad: true,
                    project_name: this.projectinfo.name,
                    project_name_en: this.projectinfo.metadata.name_en,
                    qr_img: this.projectinfo.metadata.qr_img,
                    xm_img: this.projectinfo.metadata.img,
                    quota: this.projectinfo.metadata.quota,
                    desc: this.projectinfo.metadata.desc,
                    desc_en: this.projectinfo.metadata.desc_en
                });
                  return {};
              }
                let d = Object.values(data)[0];
                d.decimals = d.decimals || 8;
                
                let t = d.history_earnings ? util[this.isFWS ? 'fromHex': 'dropHex'](d.history_earnings, d.decimals, 4) : 0;
                d.earnings = d.earnings ? util[this.isFWS ? 'fromHex': 'dropHex'](d.earnings, d.decimals, 4) : 0;



                let lang = localStorage.getItem('lang') || 'zh';
                d.description = d.description ? JSON.parse(d.description) : {};
                d.name = d.description.name;
                d.name_en = d.description.name_en;
                d.history_earningsraw = t;
                d.history_earnings = t ? (util.fix(t,4)+'').split('.') : [0,'0000'];
                // d.price = d.price ? util.fromHex(d.price, d.decimals) : 0;
                d.initGas = d.initGas ? util.fromHex(d.initGas, d.decimals, 4) : 0;
                d.gas = d.gas ? util.fromHex(d.gas, d.decimals, 4) : 0;
                
                d.yestoday_earnings =  d.yestoday_earnings ? (util.dropHex(d.yestoday_earnings, d.decimals, 4) + '').split('.') : [0,'0000'];
                d.key = d.key ? util.dropHex(d.key, d.decimals, 4) : 0;

                if(d.standard) {
                    d.standard.sum_user_withdraw =  util.dropHex(d.standard.sum_user_withdraw, d.decimals, 4);
                    d.standard.sum_key =  util.dropHex(d.standard.sum_key, d.decimals, 4);
                    d.standard.sum_found =   util.dropHex(d.standard.sum_found, d.decimals,4);
                }
                d.last_week_earnings = d.last_week_earnings ? util.dropHex(d.last_week_earnings, d.decimals, 4) : 0;
                d.isHYValid = (new Date(d.end_time || new Date()).getTime() - new Date().getTime()) > 0;
                d.total_waterraw = d.total_water ? util.fromHex(d.total_water, d.decimals, 4) : 0;
                d.total_water = (util.fix(d.total_waterraw, 4)+'').split('.');
                d.project_name = this.projectinfo.name;
                d.project_name_en = this.projectinfo.metadata.name_en;
                d.qr_img = this.projectinfo.metadata.qr_img;
                d.xm_img = this.projectinfo.metadata.img; 
                d.quota = this.projectinfo.metadata.quota;
                d.desc = this.projectinfo.metadata.desc;
                d.desc_en = this.projectinfo.metadata.desc_en;
                //分类id
                d.class_id = this.class_id;
                d.isSign = true;
                d.isLoad = true;
                this.$store.commit('givenSignHYDetail', d);
                return d;
        },
    }

}
</script>