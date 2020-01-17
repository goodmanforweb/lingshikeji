<template>
    <div class="cl-rule">
        <div class="cl-back">
            <span class="cl-back-btn" @click="$router.back()"></span>
        </div>
        <div class="cl-rule-cont">
            <dl class="cl-rule-row flex">
            <dt class="f20 fw cm">{{$t('ms.ruletext')}}</dt>
            <dd class='f14'  v-html="$t('ms.gamerule', ms.rule)">
                
            </dd>
            </dl>
            <dl class="cl-rule-row flex">
                <dt class="f20 fw cm">{{$t('ms.pricetext')}}</dt>
                <dd class='f14'  v-html="$t('ms.gameprice', ms.price)">
                                
                </dd>
            </dl>
            <dl class="cl-rule-row flex">
                <dt class="f20 fw cm">{{$t('ms.timetext')}}</dt>
                <dd class='f14' v-html="$t('ms.gametime', ms.award)">
                </dd>
            </dl>
            <dl class="cl-rule-row flex">
                <dt class="f20 fw cm">{{$t('ms.accepttext')}}</dt>
                <dd class='f14' v-html="$t('ms.gameaccept', ms.accept)">
            </dd>
            </dl>
           <div class="cl-rule-table-wrap">
                <table class="cl-rule-table">
                    <thead class="center kt">
                        <tr>
                            <td>Match</td>
                            <td>Prize Level</td>
                            <td>Odds(JLT)</td>
                        </tr>
                    </thead>
                    <tbody class="fma center">
                        <tr v-for="(r, index) in tableData" :key="index">
                            <td>
                                <span class="rule-tb-cirle">
                                    <i class="circle ciclegray" v-for="(r, idx) in r.match[0]" :key="idx+'r'"></i><i class="circle ciclered" v-for="(r, idx) in r.match[1]" :key="idx"></i>
                                </span>
                            </td>
                            <td>{{r.levelname}}</td>
                            <td>{{r.award}}</td>
                        </tr>
                    </tbody>
                </table>
           </div>
        </div>
    </div>
</template>
<script>
const levelConfig = ['superjoy','first','second','third','fourth','fifth','sixth','seventh','eighth','Ninth','Tenth','Eleventh','Twelfth','Thirteenth'];
const config = {
    51: [5, 1],
    50: [5, 0],
    41: [4, 1],
    40: [4, 0],
    31: [3, 1],
    30: [3, 0],
    21: [2, 1],
    11: [1, 1],
    1: [0, 1]
};
import {mapGetters, mapActions} from 'vuex';
import util from 'util';
export default {
    data() {
        return {
            ms: {
                rule: {},
                price: {},
                award:{},
                accept: {}
            },
            tableData: [],
        }
    },
    created() {
        
    },
    computed: {
        ...mapGetters(['roomList']),
    },
    methods: {
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
                arr.push({
                    ...levels[key],
                    match: config[key] || [],
                    award: levels[key].award == 0 ? this.$t('ms.grandprize') : levels[key].award,
                    levelname: this.$t(`ms.${levelConfig[levels[key].rank]}`)
                });
            }
            //rank award match
            arr.sort((a,b) => a.rank-b.rank);
            this.tableData = arr;

        },
        setRule() {
            let id, target;
            if(id = this.$route.params.id) {
                target = this.roomList.find(el => el.id == id);
                if(!target) return false;
                let {black_max_num, red_max_num, per_fee, levels, draw_duration,accept_duration} = target;
                let level = levels ? Object.keys(JSON.parse(levels)).length : 8;
                let award = '40,000,000.00',fee = '25%';
                let buymin = draw_duration, acceptmin = accept_duration;
                this.ms = {
                    rule: {black_max_num, red_max_num},
                    price: {per_fee},
                    award:{buymin, acceptmin},
                    accept: {level, award, fee}
                }
            }
            
        }
    },
    watch: {
        roomList: {
            immediate:true,
            deep: true,
            handler: function(n) {
                if(!util.isEmpty(n)) {
                    this.setRule();
                    this.room_id = this.$route.params.id;
                    this.findActiveRoom();
                    this.initLevels();
                }
            }
        },
        $route: function() {
            this.room_id = this.$route.params.id;
            this.findActiveRoom();
            this.setRule();
            this.initLevels();
        }
    }
}
</script>

<style lang="scss">
.pc {
    .cl-back {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #D8D8D8;
        .cl-back-btn {
            cursor: pointer;
            width: 25px;
            height: 25px;
            display: inline-block;
            background: url(../../../assets/images/back.png) center no-repeat;
            background-size: contain;
        }
    }
    .cl-rule-cont {
        max-height: 650px;
        overflow-y: auto;
        overflow-x: hidden;
    }
}
.en {
    .pc {
        .cl-rule-table {
            width: 80%;
            margin-left: 100px;
        }
    }
}
.zh {
    .pc {
        .cl-rule-table {
            width: 80%;
            margin-left: 75px;
        }
    }
}
.rule-tb-cirle {
    i {
        vertical-align: -3px
    }
}
.cl-rule {
    padding: 16px 32px;
}
    .cl-rule-row {
        font-family: arial;
        dt {
            white-space: nowrap;
            text-transform: capitalize;
        }
        dd {
            margin-left: 32px;
        }
    }
    .cl-rule-table-wrap {
        min-width: 320px;
        overflow: auto;
    }
    .cl-rule-table {
        min-width: 340px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 4px;
        border-collapse: collapse;
        td {
            border-bottom: 1px solid #D8D8D8;
            border-right: 1px solid #D8D8D8;
            vertical-align: middle;
            padding: 0 10px;
        }
        thead {
            line-height: 32px;
        }
        tbody {
            line-height: 25px;
            tr:last-child td {
                border-bottom: none
            }
        }
        tr td:last-child {
            border-right:none;
        }
        thead {
            font-size: 14px;
            color:var(--goldcolor);
        }
        tbody { 
            color: #848484;
            font-weight: bold;
            i {
                display: inline-block;
                width: 14px;
                height: 14px;
                line-height: 14px;
                margin: 1px;
            }
        }
    }
</style>


