import Hub from '../../../Hub'
import verifyman from '../../../mixins/index';
export default {
    data() {
        return {
            btnLoader: false,
            listid: null
        }
    },
    mixins:[verifyman],
    computed: {
        isMobile() {
            return this.$store.getters.isMobile;
        }
    },
    methods: {
        toSign(type) {
            this.type = type;
            if(this.restnum == 0 ) {
                return Promise.reject();
            }
            //检测账户余额
            let value = this.$store.getters.useraccount.value;
            if(value <= 0 || this.item.price > value ) {
                this.$message.info(this.$t('m.yuebuzu'));
                return Promise.reject();
            }
            if(this.btnLoader || !this.listid) {
                return Promise.reject();
            }
            return this.verifyMan().then(res => {
                if(res.state == 'succ') {
                    return this.signFWS(this.listid, res.data);
                }
            })
        },
        signFWS(id,jtdata) {
            this.btnLoader = true;
            return request[`sign${this.type == 'BN' ? 'BN' : 'FWS'}`]({data: {
                id:id,
                challenge: jtdata.geetest_challenge,
                validate:jtdata.geetest_validate,
                seccode:jtdata.geetest_seccode,
                flag: this.flag,
            }})
            .then(res => {
                if(util.isEmpty(res.data)) {
                    this.$message.info(this.$t('m.buysuc'))
                    setTimeout(() => {
                        Hub.$emit('freshSignData', true);
                        this.$emit('update:show', false);
                        Hub.$emit('buysucEvent', true);
                        this.isMobile && this.$router.goBack();
                    }, 1000)
                    return true;
                }
            }) 
            .catch(err => {
                setTimeout(() => {
                    this.$message.info(this.$t('m.buyfail'))
                },200)
            })
            .finally(() => {
                this.btnLoader = false
            })
        }
    }
}