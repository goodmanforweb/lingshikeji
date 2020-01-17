

import util from 'util';
import { relativeTimeThreshold } from 'moment';
let mixin = {
    methods: {
        login() {
            return this.getRequestId(id => {
                window.location.href = this.getOauthLink(id);
            });
        },
        getRequestId(cb) {
            return util.getRequestId({}, this)
                    .then(res => {
                        if(res.data.code == 0) {
                            if(res.data && res.data.requestID) {
                                cb && cb(res.data.requestID);
                            }
                            else {
                                this.$message.info(this.$t('ms.notgetrequestid'));
                            }
                        }
                    })
                    .catch(err => {

                    })
                    .finally(() => {

                    })
        },
        getOauthLink(request_id) {
            return `https://testnet.cjoy.games/#/oauth?request_id=${request_id}&redirect_uri=${encodeURI(window.location.origin)}&hashuri=${encodeURI(window.location.hash.replace('#',''))}`;
        },
        getLoginInfo(data) {
            return util.getLoginInfo(data, this)
                    .then(res => {
                        if(res.data.code == 0) {
                            this.$store.commit('givenLoginInfo', res.data);
                            this.$router.replace({name: this.$route.name})
                        }
                    })
                    .catch(err => {

                    })
                    .finally(() => {
                        
                    })
        },
        checkQueryLogin() {
            let user_id = util.getQueryString('user_id')
            let user_name = util.getQueryString('user_name');
            // let {user_id, user_name} = this.$route.query;
            if(user_id && user_name) {
                this.getLoginInfo({data: {user_id, user_name}});
            }
        }
    }
};


export default mixin;