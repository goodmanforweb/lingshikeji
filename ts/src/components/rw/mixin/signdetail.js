
import {mapActions, mapGetters} from 'vuex';
export default {
    data() {
        return {
            loader: false,
            dd: {
                history_earnings: ['0','00'],
                history_earningsraw:0,
                end_time: new Date(),
                start_time:new Date(),
                gas:0,
                earnings:0,
                yestoday_earnings: ['0','00'],
                last_week_earnings:0,
                key:0,
                description: {
                    power: 0
                },
                standard: {
                    experience:0,
                    sum_user_withdraw:0,
                    sum_key:0,
                    sum_found:0
                },
                qr_img:'',
                total_water: 0
            },
            projectinfo: {
                name:''
            },
            isSign: false,
            isLoad: false
        }
    },
    methods: {
        ...mapActions(['getFWSHYLists']),
        fetchSignDetail(projectid) {
            projectid && (this.id = projectid);
            return this.getClassId()
            .then(classid =>  this.getSignDetail(classid))
            .then(data =>  this.$emit('signData',{signData: data, projectData: this.projectinfo}))
        },
        getClassId() {
            if(!this.id) return Promise.reject();
            if(this.class_id) {
                return Promise.resolve(this.class_id);
            }
            this.loader = true
            return request.getHubDetail({}, {id: this.id})
            .then(res => {
                res.data.metadata = JSON.parse(res.data.metadata);
                this.projectinfo = res.data;
                return this.class_id = res.data.class_id
            })
            .finally(() => {
                this.loader = false;
            })
        },
        getSignDetail(classid) {
            this.loader = true;
            return request.getSignDetail({params: {project: this.id, 'class': classid}})
            .then(res => res.data)
            .finally(() => {
                this.loader = false
            })
        },
    }
}