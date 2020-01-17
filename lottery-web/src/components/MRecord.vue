<template>
         <div class="myrecord flex" @click="handleClick">
            <div class="mr-l">
                <div class="block mr-card" v-loading="roomAwardLoader">
                    <div class="myc-hd center">
                        <span>{{$t('ms.tb')}}</span>
                        <div class="kt">{{roomAwardData.total | currency}}</div>
                    </div>
                    <div class="myc-bd fma" >
                        <table>
                            <thead>
                                <tr>
                                    <td>{{$t('ms.level')}}</td>
                                    <td>{{$t('ms.times')}}</td>
                                    <td>{{$t('ms.odds')}}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="level-row" v-for="(level, index) in roomAwardData.levels" :key="index" :data-level="level.rname">
                                    <td>{{level.name}}</td>
                                    <td>{{level.time}}</td>
                                    <td>{{level.odds}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="center nodata" v-if="roomAwardData.levels.length == 0">{{$t('ms.norecord')}}</div>
                    </div>
                </div>
                <div class="block mr-card" v-if="!isMobile">
                    <div class="myc-hd center">
                        <span>{{active.name }}</span> <span v-html="$t('ms.qishu', {qishu: issueAwardData.qishu})"></span> <span>{{$t('ms.benifits')}}</span>
                        <div class="kt">{{issueAwardData.total | currency}}</div>
                    </div>
                    <div class="myc-bd fma">
                        <table>
                            <thead>
                                <tr>
                                    <td>{{$t('ms.level')}}</td>
                                    <td>{{$t('ms.times')}}</td>
                                    <td>{{$t('ms.odds')}}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(level, index) in issueAwardData.levels" :key="index">
                                    <td>{{level.name}}</td>
                                    <td>{{level.time}}</td>
                                    <td>{{level.odds}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="center nodata" v-if="issueAwardData.levels.length == 0">{{$t('ms.norecord')}}</div>
                    </div>
                </div>
            </div>
            <div class="mr-r">
                <div class="record block">
                    <div class="record-tit flex">
                        <CSelect @change="change" :value="activeroom || {}" :options='options'></CSelect>
                    </div>
                    <div class="mr-bd" >
                        <div class="mr-bd-wrap flex" ref="cardcontainer">
                            <div class="cl-ticket-wrap cltw" 
                                v-for="(list, index) in lists" 
                                :key="index" 
                                :data-index="index"
                                :data-issue="list.issueid"
                            >
                                <div class="cl-ticket-wrap2">
                                    <div class="cl-ticket" :class="{duiprize: list.isLJ, wzj: list.wzj}">
                                        <div class="clt-tit flex">
                                            <div class="clt-ttt f18 kt">{{$t('ms.joylotto')}}</div>
                                            <div class="clt-tt-info fma flex">
                                            <div>
                                                <span class="cm">{{$t('ms.game')}}</span>
                                                <span class="f20">{{list.qishu}}</span>
                                            </div>
                                            <div>
                                                <span class="cm">{{$t('ms.lines')}}</span>
                                                <span class="f20">{{list.buynum}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="clt-bd">
                                            <table>
                                            <thead>
                                                <tr class="f14">
                                                <td class="fma fwb" colspan="5">{{active.name}}</td>
                                                <td class="fma fwb">{{$t('ms.mega')}}</td>
                                                <td class="fma fwb">{{$t('ms.rate')}}</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(li, i) in list.data" :key="i" >
                                                    <td 
                                                    v-for="(k, ii) in ['ONE','TWO','THREE','FOUR','FIVE','MEGA']" 
                                                    :key="ii" 
                                                    :style="`${li.record_map[k] == list.zjnum[k] && 'color:#C5493E'}`"
                                                    >{{li.record_map[k] || '?' | makeUp}}</td>
                                                    <td>*{{li.num}}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        <footer class="clt-ft fma">
                                            <div class="clt-tt-row flex jsb">
                                            <span class="cm">{{$t('ms.total')}}</span>
                                            <span class="fw">{{list.fee | currency}} {{$t('ms.jlt')}}</span>
                                            </div>
                                            <div class="clt-tt-row flex jsb">
                                            <span class="cm">{{$t('ms.odds')}}</span>
                                            <span class="fw">{{list.odds | currency}} {{$t('ms.jlt')}}</span>
                                            </div>
                                            <div class="f14 center cm">
                                            <span >{{$t('ms.lpur')}}</span>
                                            <div class="fma">{{list.date | format}}</div>
                                            <span>{{$t('ms.buck')}}</span>
                                            </div>
                                        </footer>
                                        <div class="clt-bk-bar">
                                            <div>
                                                <span class="f18">{{$t('ms.playres')}}</span>
                                                <span class="f18">{{$t('ms.playres')}}</span>
                                                <span class="f18">{{$t('ms.playres')}}</span>
                                                <img src="../assets/images/tlogow.png" alt="">
                                            </div>
                                        </div>
                                        <span class="seal"></span>
                                    </div>
                                    <div class="block mr-card" v-if="isMobile">
                                        <div class="myc-hd center">
                                            
                                            <span>{{active.name }}</span> <span v-html="$t('ms.qishu', {qishu: issueAwardData.qishu})"></span> <span>{{$t('ms.benifits')}}</span>
                                            <div class="kt">{{issueAwardData.total | currency}}</div>
                                        </div>
                                        <div class="myc-bd fma">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td>{{$t('ms.level')}}</td>
                                                        <td>{{$t('ms.times')}}</td>
                                                        <td>{{$t('ms.odds')}}</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(level, index) in issueAwardData.levels" :key="index" >
                                                        <td>{{level.name}}</td>
                                                        <td>{{level.time}}</td>
                                                        <td>{{level.odds}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="center nodata" v-if="issueAwardData.levels.length == 0">{{$t('ms.norecord')}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="center fma cl-time" v-if="list.isLJ">{{$t('ms.rewardtime')}}：{{list.ljDate | format}}</div>
                            </div>
                        </div>
                        <div class="center nodata flex1" style="height: 40px" v-if="lists.length == 0">{{$t('ms.norecord')}}</div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
const levelConfig = ['superjoy','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth'];
import CSelect from "./widget/select/index";
import {mapGetters, mapActions} from 'vuex';
import util from 'util';
import mixin from './mixins/scroller';
import Big from 'bignumber.js';
export default {
    data() {
        return {
            lists: [],
            options: [],
            exchangeLoader: false,
            roomAwardLoader: false,
            roomAwardData: {
                total:0,
                levels: []
            },
            issueAwardData: {
                total:0,
                levels: [],
                date: new Date(),
                qishu: 0
            },
            active: {}
        }
    },
    mixins:[mixin],
    components: {
        CSelect
    },
    computed: {
        ...mapGetters(['roomList', 'activeroom','isMobile'])
    },
    created() {
        
    },
    mounted() {
        this.addScrollListener(this.isMobile ? 'window' : '.mr-bd', this.fetchMore);
    },
    methods: {
        initLevels() {
            let levels = JSON.parse(this.active.levels);
            let arr = [];
            for(let key in levels) {
                arr.push(levels[key].rank);
            }
            arr.sort((a,b) => a-b);
            this.levelConfig = arr.map(el => {
                return this.$t(`ms.${levelConfig[el]}`)
            });
            this.roomAwardData = this.setLevelInitData();
            this.issueAwardData = this.setLevelInitData();
        },
        setLevelInitData() {
            return {
                date: new Date(),
                total:0,
                qishu:0,
                levels: this.levelConfig.map((el,index) => {
                    return {
                            rname: index,
                            name:el,
                            time:0,
                            odds:0
                        }
                })
            }
        },
        change(e) {
            this.room_id = e.id;
            this.initLoader();
            this.findActiveRoom();// active
            this.initLevels();
            
            
            this.getTotalRoomAward()
            this.fetchInit();
            this.fetchMore();
        },
        findActiveRoom() {
            if(this.roomList.length > 0 ) {
                this.active = this.roomList.find(el => el.id == this.room_id);
                if(!this.active) {
                    this.$message.info(this.$t('paramwrong'));
                }
            }
            else {

            }
        },
        handleClick(e) {
            let target = e.target;
            
            let targetIndex  = null, jump = false, targetIssue = null, level = null;
            do {
                if(target.className.indexOf('cltw') > -1) {
                    targetIndex = target.getAttribute('data-index');
                    targetIssue = target.getAttribute('data-issue');
                    break;
                }
                else if(this.isMobile && target.className.indexOf('clt-bd') > -1) {
                    jump = true;
                    break;
                }
                else if(target.className == 'level-row' && target.tagName == 'TR') {
                    level = target.getAttribute('data-level');
                    break;
                }
            } while(target = target.parentElement);

            if(jump) return false; 

            if(level != null) {
                this.handleJumpLevel(level);
                return false;
            }
            // if(targetIndex == null) return false;

            [...this.$refs.cardcontainer.children].forEach((el, index) => {
                if(el.className.indexOf('cltw') > -1) {
                    if(targetIndex == null) {
                        el.classList.remove('active');
                    } 
                    else {
                        targetIndex == index ? el.classList.add('active') : el.classList.remove('active');
                    }
                }
            })

            if(targetIssue && targetIndex != null) {
                this.handleShowIssueLevel(targetIssue);
            }            
        },
        handleJumpLevel(level) {
            if(level == null || !this.room_id) return false;
            this.$router.push({
                name: 'srecord', 
                query: {
                    level,
                    roomid: this.room_id
                }
            });
        },
        handleShowIssueLevel(targetIssue) {
            // let issue = this.lists[targetIssue];
            let issue = this.lists.find(el => el.issueid == targetIssue);

            if(!issue) return false;
            let total = issue.odds;
            let levels = issue.data.filter(is => is.level >=0).map(le => le.level);
            let issueAward = {
                total,
                levels: this.setLevelInitData().levels,
                date: issue.date,
                qishu: issue.qishu
            };
            if(levels.length == 0) {
                this.issueAwardData = issueAward;
                return false;
            }
            
            //drop same
            levels = [...new Set(levels)];
            //sort
            levels = levels.sort((a, b) => a - b);
            let temp = {};
            levels.forEach(level => {
                issue.data.forEach(is => {
                    if(is.level == level) {
                        // if(!temp[level]) temp[level] = {name: this.levelConfig[level],time: 0, odds: 0};
                        issueAward.levels[level].time++;
                        issueAward.levels[level].odds += Big(is.award).div(100).toNumber();
                        // temp[level].time++;
                        // temp[level].odds += is.award;
                    }
                })
            });

            // issueAward.levels = Object.values(temp);
            this.issueAwardData = issueAward;
        },
        fetchInit() {
            this.isFirstTimeFetch = true;
            this.lists = [];
            this.pager = 0;
            this.count = null;
            this.size = 12;
            this.empty = false;
        },
        fetchMore(done) {
            // 翻页计数器
            console.log('er');
            if (this.exchangeLoader || this.empty) {
                done && done(true)
                return;
            }
            if (this.count) {
                if (this.pager * this.size >= this.count) {
                    done && done(true);
                    return false;
                }
            }
            this.pager++;
            this.getRecord().finally(() => done && done());
        },
        getRecord() {
            this.exchangeLoader = true;
            return util.getLotteryRecordByRoom({params: {
                level: -1,
                room_id: this.room_id,
                size:  this.size,
                offset: (this.pager-1)*this.size,
            }}, this)
            .then(res => {
                if(res.data.code == 0) {
                    this.count = res.data.count;
                    if(util.isEmpty(res.data.list)) {
                        this.empty = true
                    }
                    else {
                        // res.data.list
                        
                        let temp = res.data.list.map(el => {
                            let ele = el.tickets;
                            return {
                                issueid: ele[0].issue_id,
                                qishu: ele[0].pid,
                                buynum: ele.length,
                                fee: ele.reduce((prev, next) => prev + next.fee, 0),
                                odds: Big(ele.reduce((prev, next) => prev + next.award, 0) || 0).div(100).valueOf(),
                                date: ele[0].createtime,
                                isLJ: ele.some(ell => ell.status == 'SUCCESS'),
                                wzj: ele.every(ell => ell.status == 'LOSING'),
                                ljDate: ele[0].updatetime,
                                data: ele,
                                zjnum: el.issue && el.issue.record && JSON.parse(el.issue.record)
                            }
                        });
                        this.lists = this.lists.concat(temp);

                        this.$nextTick(() => {
                            if(this.lists.length > 0 && this.isFirstTimeFetch && !this.isMobile) {
                                this.$refs.cardcontainer.children[0].click();
                            }
                            this.isFirstTimeFetch = false;
                        });
                        
                    }
                }
            })
            .catch(err => {
                this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                this.exchangeLoader = false;
            })
        },
        getTotalRoomAward() {
            this.roomAwardLoader = true;
            util.getTotalRoomAward({roomid:  this.room_id}, this)
            .then(res => {
                if(res.data.code == 0) {
                    let t = 0;
                    let copyLevels = this.setLevelInitData().levels;
                    if(!res.data.record) {
                        t = 0;
                    }
                    else if(res.data.record && res.data.record.data) {
                        let d = JSON.parse(res.data.record.data);
                        t = Object.values(d).reduce((prev, next) => prev + next.total_fee,0);
                        t = Big(t).div(100).valueOf()
                        let k = Object.keys(d).sort((a, b) => a - b);
                        

                        k.forEach(el => {
                            copyLevels[el].time = d[el].num;
                            copyLevels[el].odds = Big(d[el].total_fee).div(100).valueOf();
                        });
                    }

                    this.roomAwardData = {
                        total: t,
                        levels: copyLevels
                    }
                    
                }
            })
            .catch(err => {
                this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                this.roomAwardLoader = false;
            })
        }
    },
    watch: {
        roomList: {
          immediate: true,
          deep: true,
          handler: function(n) {
            if(!util.isEmpty(n)) {
                this.room_id = this.activeroom.id;
                this.options = this.roomList.map(el => ({name: el.name, id: el.id}));
                
                this.findActiveRoom();
                this.initLevels();
                this.fetchInit();
                // this.triggerLoader();
                this.fetchMore();

                this.getTotalRoomAward();
            }
          }
      }
    }
    
}
</script>

<style lang="scss">
.pc {
    .mr-bd {
        height: calc(100% - 47px);
        overflow-y: auto;
    }
    .mr-r {
        max-height: 793px;
    }
    .cl-ticket-wrap.active {
        .cl-ticket-wrap2 {
             box-shadow: 0 0 18px rgba(118, 118, 118, 0.5);
        }
        
    }
    .cl-ticket-wrap2:hover {
        box-shadow: 0 0 18px rgba(118, 118, 118, 0.5);
    }
}
.level-row {
    cursor: pointer;
}
.myrecord {
    .record-tit {
        align-items: center;
    }
    .myc-bd {
        min-height: 277px;
        max-height: 500px;
        overflow-y: auto;
    }
}
    .mr-l {
        margin-right: 16px;
    }

    .mr-r {
        width: 757px;
        .record {
            height: 100%;
            box-sizing: border-box
        }
    }

    .mr-card {
        width: 312px;
        padding: 16px;
        box-sizing: border-box;
        .myc-hd {
            >span {
            color: #A0A0A0;
            }
            >div {
                font-size: 30px;
                color:var(--textcolor);
                font-weight: 300;
                padding: 8px 0;
            }
        }
        table {
            color:#848484;
            text-align: left;
            width: 100%;
            line-height: 28px;
            thead {
                tr {
                    text-transform: capitalize;
                    td {
                    border-top: 1px dashed #D8D8D8;
                    border-bottom: 1px dashed #D8D8D8

                    }
                }
                tr td:last-child {
                    text-align: right;
                }
            }
            tbody {
                line-height: 23px;
                tr td:last-child {
                    text-align: right;
                }
            }
        }
    }

    .mr-card:first-of-type {
        margin-bottom: 16px;
    }

    .mr-bd {
        box-sizing: border-box;
        padding: 24px 40px;
        .mr-bd-wrap {
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .cl-time {
            margin: 16px 0;
        }
    }

    .cl-ticket-wrap2 {
        transition: all .3s linear;
    }

    
</style>


