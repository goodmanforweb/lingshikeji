

import util from 'util';
import Big from 'bignumber.js';
import Hub from 'hub';
import {mapGetters, mapActions} from 'vuex';


let mixin = {
    data() {
        return {
            gameStateConfig: {
                BETTING:'投注中',
                DRAWING: '等待开奖',
                ACCEPTING: '兑奖中',
                CLAIMING: '已开奖'
            },
            normalnumbers:[],
            meganumbers:[],
            rate:1,
            betLoader: false,
            currentIssue:{},
            prevIssue: {
                record:{},
                createtime: new Date(),
                no:0
            },
            hot: {
                black: [],
                red: []
            },
            cd: {
                day: 0,
                hour:0,
                minutes:0,
                seconds:0,
                show: false
            }
        }
    },
    created() {
        this.issue = [];
        
    },
    computed: {
        ...mapGetters(['isMobile', 'roomList', 'activeroom','issueList', 'wallet']),
        payment() {
            return Big(this.active.per_fee || 0).times(this.rate).toNumber()
        },
        active() {
            return this.activeroom || {};
        },
        gamestatustext() {
            let text;
            text = this.cd.show ? 'DRAWING' : this.currentIssue.status;

            if(this.$i18n.locale == 'zh') {
                text = this.gameStateConfig[text]
            }

            return text;
        }
    },
    mounted() {
        this.$route.name == 'game' && this.handleTip();
    },
    beforeDestroy() {
        this.clearTicker();
        document.body.removeEventListener('click', this.tipHanlder, false);
    },
    methods: {
        ...mapActions(['getIssueList','getWallet']),
        handleTip() {
            if(!this.$refs.tip)return;
            if(localStorage.getItem('isfirsttip')) {
                this.$refs.tip.hide();
            }
            else {
                localStorage.setItem('isfirsttip', 1);
                this.$refs.tip.show();
                document.body.addEventListener('click', this.tipHanlder, false);
            }
        },
        tipHanlder() {
            this.$refs.tip.hide();
        },
        createTicker() {
            this.ticker && clearInterval(this.ticker);
            this.ticker = setInterval(() => {
                this.getIssueLists();
                this.getHotNumber();
            }, 10*1000);
        },
        createCountDownTicker() {
            this.cdticker && clearInterval(this.cdticker);
            this.calcCountDown();
            this.cdticker = setInterval(() => {
                this.calcCountDown();
            }, 1000);            
        },
        calcCountDown() {
            let cd = new Date(this.currentIssue.drawtime).getTime() - new Date().getTime();
            // let cd = new Date('2018-12-11 15:40:00').getTime() - new Date().getTime();
            // - +
            if(cd < 0) {
                this.cd = {
                    day:0,
                    hour:0,
                    minutes:0,
                    seconds:0,
                    show: false
                };
                this.cdticker && clearInterval(this.cdticker);
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
                if(this.cd.show) {
                    this.cdticker && clearInterval(this.cdticker);
                }
            }

        },
        clearTicker() {
            this.ticker && clearInterval(this.ticker);
            this.cdticker && clearInterval(this.cdticker);
        },
        setPickCube() {
            this.normalnumbers = this.setPickCubeNum(this.active.black_max_num);
            this.meganumbers = this.setPickCubeNum(this.active.red_max_num);
        },
        setPickCubeNum(number) {
            return Array.from({length: number}).map((num, index) => {
                return {
                    state: false,
                    rnum: index + 1,
                    num: String(index+1).length < 2 ? '0' + String(index+1) : index+1
                }
            })
        },
        getIssueLists() {
            this.$route.params.id && this.getIssueList({params: {
                    room_id: this.$route.params.id,
                    size: 2,
                }, ctx: this}).then(res => {
                    if(res.length > 0) {
                        this.issue = res;
                        this.currentIssue = res[0];
                        this.prevIssue = res[1];
                    }
                    else {
                        this.issue = [];
                        this.currentIssue = [];
                        this.prevIssue = [];
                    }
                    

                })
        },
        getHotNumber() {
            this.$route.params.id && util.getHotNumberByRoom({params: {
                room_id: this.$route.params.id,
                num: 8
            }}, this)
            .then(res => {
                if(res.data.code == 0) {
                    //数据归一化
                    
                    let {black , red} = res.data;
                    

                    if(black.length > 0) {
                        black = this.hotNumberMap(black.length > 8 ? black.slice(0, 8) : black.slice(0));
                    }
                    if(red.length > 0) {
                        red = this.hotNumberMap(red.length > 8 ? red.slice(0, 8) : red.slice(0));
                    }

                    this.hot = {black, red};
                    
                     
                }
            })
            .catch(err => {
                this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                
            })
        },
        hotNumberMap(data) {
            const em = this.isMobile ? 120 : 60; 
            let bmin = 1, bmax = 1,thesame;
            //排序 从大到小
            data.sort((a, b) => b.Score - a.Score);
            
            let blackArr = data.map(el => el.Score);
            if(blackArr.length == 0) return data; 
            bmin = Math.min.apply(Array, blackArr);
            bmax = Math.max.apply(Array, blackArr);
            if(this.isMobile && bmax <= 120 || !this.isMobile && bmax <= 60) return data;

            if(bmin == bmax) {
                if(this.isMobile) {
                    if(bmax <= 120) {
                        return data;
                    }
                    else {
                        thesame = 120;
                    }
                }
                else {
                    if(bmax <= 60) {
                        return data;
                    }
                    else {
                        thesame = 60;
                    }
                }
            }
            if(thesame != undefined) {
                data.forEach(el => {
                    el.ch = thesame;
                });
            }
            else {
                const sn = (bmin/bmax)*em;
                let t = x => sn + (em - sn)*(x - bmin)/(bmax - bmin);
                data.forEach(el => {
                    el.ch = Math.ceil(t(el.Score));
                });
            }

            return data;
        },
        picker(e, type) {
            let target = e.target;
            if(target.tagName != 'I') return false;
            let index = undefined;
            [...target.parentElement.children].forEach((el, i) => {
                if(el == target) {
                    return index = i;
                }
            });

            if(index == undefined) return false;

            
            let hasPicker = [];
            if(type == 'normal') {
                hasPicker = this.normalnumbers.filter(el => el.state);
                //if picke
                if(!this.normalnumbers[index].state) {
                    if(hasPicker.length >= 5) {
                        this.$message.info(this.$t('ms.canonlyfive'));
                        return false;
                    }
                }
                

                this.normalnumbers.splice(index,1, {
                    ...this.normalnumbers[index],
                    state: !this.normalnumbers[index].state,
                });

            }
            else if(type == 'mega') {
                
                this.meganumbers.forEach((el,idx) => {
                    el.state = idx == index
                });
            }
            
            

        },
        createRandomIndex(howMony, range) {
            let normalIndexs = {}, i;
            
            let func = function() {

                i = Math.ceil(Math.random()*range);

                if(i == 0) {
                    func();
                }
                if(!normalIndexs[i]) {
                    normalIndexs[i] = true
                }
                else {
                    func();
                }
            }
            Array.from({length: howMony}).forEach((el, index) => {
                func();
            });

            return Object.keys(normalIndexs).map(el => Number(el));
        },
        quickPick() {
            this.clear();
            //normalnumbers
            let normalIndexs = this.createRandomIndex(5, this.active.black_max_num);

            let temp = this.normalnumbers.slice(0);
            normalIndexs.forEach((el => {
                let k = el - 1;
                temp.splice(k,1, {
                    ...temp[k],
                    state: !temp[k].state,
                });
            }));
            this.normalnumbers = temp;

            //meganumbers
            const randomIndex = this.createRandomIndex(1, this.active.red_max_num) - 1;
            this.meganumbers.splice(randomIndex,1, {
                ...this.meganumbers[randomIndex],
                state: !this.meganumbers[randomIndex].state,
            });
        },
        clear() {
            this.normalnumbers.forEach(el => el.state =  false);
            this.meganumbers.forEach(el => el.state =  false);
        },
        check() {
            //check status
            //check has picker
            //check balance
            if(this.currentIssue.status != 'BETTING') {
                this.$message.info(this.$t('ms.cannotbuy'));
                return false;
            }
            if(this.normalnumbers.filter(el => el.state).length < 5 || this.meganumbers.filter(el => el.state).length < 1) {
                this.$message.info(this.$t('ms.pleasepicker'));
                return false;
            }
            if(this.wallet == 0 || this.wallet < this.payment) {
                this.$message.info(this.$t('ms.walletnogou'));
                return false;
            }
            if(this.rate > this.active.max_rate) {
                this.$message.info(this.$t('ms.noovermaxrate', {rate: this.active.max_rate}));
                return false;
            }
            return true;
        },
        buy() {
            if(!this.check()) return false;
            let issue_id = this.currentIssue.id;
            if(!issue_id) return false;
            let cf = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];
            let normal = this.normalnumbers.filter(el => el.state).map(el => el.rnum).sort((a, b) => a - b);
            let mega = this.meganumbers.filter(el => el.state).map(el => el.rnum);

            let record = {
                MEGA: mega[0]
            };
            normal.forEach((el,i) => {
                record[cf[i]] = el;
            });
            
            this.buyLottery({
                issue_id,
                data: [
                    {
                        record,
                        num: this.rate
                    }
                ]

            }).then(res => {
                //fresh wallet
                if(this.wallet && this.payment) {
                    let t = Big(this.wallet).minus(this.payment).toNumber();
                    this.$store.commit('givenWallet', t);
                    this.getWallet({ctx: this});
                }
            });
        },
        buyLottery(data) {
            this.betLoader = true
            return util.buyLottery({data}, this)
            .then(res => {
                if(res.data.code == 0) {
                    this.$message.info(this.$t('ms.buysuc'));
                    //更新右边票
                    Hub.$emit('updateTicket', {});
                }
            })
            .catch(err => {
                this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                this.betLoader = false;
            })
        }
    },
    watch: {
        currentIssue: {
            deep: true,
            handler: function(n, o) {
                if(!util.isEmpty(n) && n.drawtime && ((n.status == 'BETTING'))) {
                    this.createCountDownTicker();
                };
            }
        },
        //上一期变化，加是否自己购买， 然后刷新一哈余额账户
        // prevIssue: {
        //     deep: true,
        //     handler: function(n, o) {
        //         if(!util.isEmpty(n)) {
                    
        //         };
        //     }
        // },
        activeroom: {
            deep: true,
            immediate:true,
            handler: function(n) {
                if(!util.isEmpty(this.roomList)) {
                    this.setPickCube();
                }
            }
        },
        $route: {
            immediate: true,
            handler: function() {
                this.clearTicker();
                if(!util.isEmpty(this.$route.params.id)) {
                    this.createTicker();
                    this.getHotNumber();
                    this.getIssueLists();
                }
            }
        }
    }


};


export default mixin;