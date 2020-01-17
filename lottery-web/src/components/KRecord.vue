<template>
    <div class="allWinRecord block" >
        <div class="awr-tit clearfix">
            <div class="awr-tit-choose f18 fl flex">
                <CSelect @change="change" :value="activeroom" :options='options'></CSelect>
                <!-- <CDate></CDate> -->
            </div>
            <div class="awr-tit-past fr f20">
                {{$t('ms.pr')}}
            </div>
        </div>
        <div class="awr-bd"  >
            <ul class="wintickets">
                <li class='winticket' v-for="(list, index) in lists" :key="index">
                    <div class="f14 wt-tit">{{$t('ms.game')}} <i class="fma">{{list.no}}</i></div>
                    <div class="wt-bd-wrap">
                    <div class="wl">
                        <div class="wt-logo  center">
                            <img src="../assets/images/tlogo.png" alt="">
                            <span class="kt">{{$t('ms.joylotto')}}</span>
                        </div>
                        <div class="wt-mount f20  center kt">
                            {{list.draw_fee | currency}}
                        </div>
                        <div class="wt-date f14  fma center">
                            {{list.createtime | format('YY.MM.DD')}}
                        </div>
                         <div class="wt-circles center kt">
                            <i class="circle ciclegray" 
                            v-for="(el, idx) in ['ONE', 'TWO', 'THREE', 'FOUR','FIVE']"
                            :key="idx"
                            >{{list.record[el] || '?' | makeUp}}</i><i class="circle ciclered">{{list.record.MEGA || '?' | makeUp}}</i>
                        </div>
                    </div>
                    <div class="wr">
                        <div class="wt-level fma f14" v-for="(level, k, index) in list.level_info" :key="index">
                            <span class="fl">{{k}}</span>
                            <span class="fr">{{level}}</span>
                        </div>
                        <div class="center nodata" v-if="Object.keys(list.level_info).length == 0">{{$t('ms.norecord')}}</div>
                    </div>

                    </div>
                </li>
               
            </ul>
            <div class="center nodata" v-if="lists.length == 0">{{$t('ms.norecord')}}</div>
        </div>
    </div>
</template>
<script>
const levelConfig = ['superjoy','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth'];
import CSelect from "./widget/select/index";
import CDate from "./widget/select/date";
import {mapGetters, mapActions} from 'vuex';
import util from 'util';
import mixin from './mixins/scroller';
import Big from 'bignumber.js';
export default {
    data() {
        return {
            options: {},
            exchangeLoader: false,
            lists: []
        }
    },
    created() {
        
    },
    mixins:[mixin],
    mounted() {
        this.setHeight();
        this.addScrollListener(this.isMobile ? 'window' : '.awr-bd', this.fetchMore);
    },
  components: {
    CSelect
  },
  computed: {
      ...mapGetters(['roomList', 'activeroom','isMobile']),
  },
  methods: {
      ...mapActions(['getRoomList']),
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
        },
    setHeight() {
        if(this.isMobile) return false;
    },
    change(e) {
        this.room_id = e.id;
        this.initLoader();
        this.findActiveRoom();// active
        this.initLevels();

        this.fetchInit();
        this.fetchMore();
    },
    fetchInit() {
        this.empty = false;
        this.lists = [];
        this.pager = 0;
        this.count = null;
        this.size = 12;
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
        this.exchangeLoader = true
        return util.getIssueList({params: {
            room_id: this.room_id,
            size:  this.size,
            offset: (this.pager-1)*this.size,
            // orderby:'create_time',
            // order:'desc'
        }}, this)
        .then(res => {
            if(res.data.code == 0) {
                this.count = res.data.count;
                if(util.isEmpty(res.data.list)) {
                    this.empty = true;
                }
                else {
                    res.data.list.forEach(el => {
                        el.draw_fee = Big(el.draw_fee).div(100).toNumber();
                        el.record = el.record ? JSON.parse(el.record) : {};

                        let obj = {};
                        //初始值
                        this.levelConfig.forEach(el => {
                            obj[el] = 0;
                        });

                        if(el.level_info) {
                            let n = JSON.parse(el.level_info);
                            for(let key in n) {
                                obj[this.levelConfig[key]] = n[key];
                            }
                            el.level_info = obj;
                        }
                        else {
                            el.level_info = obj;
                        }
                    });
                    this.lists = this.lists.concat(res.data.list);
                }
            }
        })
        .catch(err => {
            this.$message.info(window.errorInfo(err.response));
        })
        .finally(() => {
            this.exchangeLoader = false;
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
                this.fetchMore();
            }
          }
      }
  }
};
</script>
<style lang="scss">
.pc {
    .tf-normal {
        width: 450px;
    }
    .tf-mega {
        width: 350px;
    }
    .wt-mount:before {
        content: "";
        position: absolute;
        top: -5px;
        left: -58px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #e8e8e7;
        box-shadow: inset 1px 1px 5px rgba(118, 118, 118, 0.2);
    }
    .wt-mount:after {
        content: "";
        position: absolute;
        top: -5px;
        right: -58px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #e8e8e7;
        box-shadow: inset 1px 1px 5px rgba(118, 118, 118, 0.2);
    }
    .wt-circles {
        position: relative;
        i {
            margin: 1px;
        }
        }
    .wt-circles:after {
        content:'';
        position: absolute;
        bottom:0;
        right:0;
        left:0;
        height: 2px;
        width: 90%;
        margin: auto;
        border-bottom: 1px dashed #d8d8d8;
    }
    .awr-bd {
        height: 600px;
        overflow-y: auto;
        overflow-x: hidden
    }
    .wintickets {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}
.allWinRecord {
  overflow: hidden;
}
.awr-tit {
  height: 47px;
  line-height: 47px;
  background-color: var(--textcolor);
  padding: 0 32px;
  color: var(--goldcolor);
//   overflow: hidden;
}
.awr-tit-choose {
  height: 47px;
  align-items: center;
  .cdate {
    margin: 0 32px;
  }
}
.awr-bd {
  background-color: #e8e8e7;
  padding: 48px 16px;
}
.winticket {
  box-sizing: border-box;
  display: inline-block;
  margin: 16px 7px;
  width: 240px;
  padding: 0 16px;
  background-color: #fff;
//   box-shadow: 0 5px 9px 0 rgba(118, 118, 118, 0.5);
  overflow: hidden;
}
.wt-logo {
    img {
        width: 25px;
        vertical-align: middle
    }
    span {
        vertical-align: middle
    }
}
.wt-logo,
.wt-date {
  font-weight: 300;
  line-height: 40px;
}
.wt-mount {
  font-weight: 400;
  line-height: 44px;
  border-top: 1px dashed #d8d8d8;
  border-bottom: 1px dashed #d8d8d8;
  position: relative;
  width: 90%;
  margin: 0 auto;
  
}
.wt-tit {
  padding: 0 16px;
  margin: 0 -16px;
  line-height: 20px;
  background-color: var(--textcolor);
  color: rgba(255, 255, 255, 0.54);
}


.wt-circles {
  padding-bottom: 16px;

  i {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
}
.wr {
    max-height: 260px;
    height: 260px;
    overflow: hidden;
}
.mobile {
    .wr {
        max-height: 230px;
        height: 230px;
    }
}
.wt-level {
  color: #848484;
  overflow: hidden;
  line-height: 28px;
}
</style>


