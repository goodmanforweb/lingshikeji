<template>
    <div class="weekpicker" ref="wpdom">
        <el-input placeholder="请输入内容" @focus="showdrop"  v-model="date" readonly class="input-with-select">
            <span class="wp-prepend" slot="prepend">{{$t("ms.querydate")}}</span>
            <i :class="{'el-icon-arrow-down': showwp, 'el-icon-arrow-up': !showwp}" slot="append" ></i>
        </el-input>
        <div class="wp-dropdown" v-if="showwp" >
            <div class="wp-dp-hd flex">
                <i @click="reduceMonth" class="w-icon el-icon-arrow-left"></i>
                <i class="wp-dp-text">{{year+'.'+currentMonth}}</i>
                <i @click='addMonth' class="w-icon el-icon-arrow-right"></i>
            </div>
            <ul class="wp-dp-list" @click="chooseWeek">
                <li v-for="(list, index) in lists" :key="index" :class="{active: list.state}"><i>{{$t('ms.weekof', {week:list.week ? list.week : (lists.length - index)})}}</i>{{list.value.join(' - ')}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
let moment = require('moment');
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
export default {
  data() {
    return {
      showwp: false,
      date: "",
      currentMonth: 1,
      lists: [],
      year: "",
      startoftime: ''
    };
  },
  props: ["startOfTime"],
  created() {
   
    this.init();
  },
  beforeDestroy() {
    this.body && this.body.removeEventListener("click", this.handleBlur, false);
  },
  methods: {
    init() {
      if(!this.startoftime) return false;
      const date = new Date();
      this.currentMonth = date.getMonth() + 1;
      this.year = date.getFullYear();
      this.currentWeek = this.getMonthWeek(date);
      const targetIndex = this.currentWeek - 1;
      this.lists = this.getMonthWeekByMoment(this.year, this.currentMonth)
      .map((el, index) => ({
        state: index == targetIndex,
        value: el,
        week: this.calcTotalWeeks(el)
      }))
      .reverse();

      this.dateselected = this.lists[this.lists.length - 1 - targetIndex].value;
      this.setDate();
    },
    setDate() {
      this.date =
        this.$t("ms.weekof", { week: this.calcTotalWeeks(this.dateselected) }) +
        " " +
        this.dateselected.join(" - ");
    },
    showdrop() {
      this.showwp = true;
    },
    reduceMonth() {
      let month = this.currentMonth;
      month--;
      if (month == 0) {
        month = 12;
        this.year -= 1;
      }
      if (this.year == this.limityear) {
        if (month < this.limitmonth) {
          return false;
        }
      }
      this.currentMonth = month;
      this.lists = this.getMonthWeekByMoment(this.year, month)
      .map(el => ({ state: false, value: el , week: this.calcTotalWeeks(el)}))
        .reverse();
    },
    addMonth() {
      let month = this.currentMonth;
      month++;
      if (month >= 13) {
        month = 1;
        this.year += 1;
      }
      let date = new Date();
      if (date.getFullYear() == this.year && date.getMonth() < month - 1) {
        return false;
      }
      this.currentMonth = month;
      this.lists = this.getMonthWeekByMoment(this.year, month)
        .map(el => ({ state: false, value: el ,week: this.calcTotalWeeks(el)}))
        .reverse();
    },
    chooseWeek(e) {
      let target = e.target;
      if (!["LI", "I"].includes(target.tagName)) return false;
      if (target.tagName == "I") target = target.parentNode;
      let targetIndex = null;
      [...target.parentNode.children].forEach((el, index) => {
        if (el == target) {
          targetIndex = index;
        }
      });

      if (targetIndex == null) return false;

      this.lists.forEach((li, idx) => {
        li.state = idx == targetIndex;
      });
      this.dateselected = this.lists[targetIndex].value;
      this.$emit("change", {
        totalweeks: this.calcTotalWeeks(this.dateselected),
        week: targetIndex + 1,
        date: this.lists[targetIndex].value,
        month: this.currentMonth,
        year: this.year
      });
      this.setDate();
      setTimeout(() => {
        this.showwp = false;
      }, 100);
    },
    calcTotalWeeks(dateselected) {
      if(!this.startoftime)return null;
      if(!dateselected[0]) return '';
      let t = dateselected[0].split(/[- : \/\.]/);
      t[1] = t[1] - 1;
      const cha = new Date(...t) - this.startoftime;
      const perday = 1 * 24 * 60 * 60 * 1000;
      const days = Math.ceil(cha / perday);
      return Math.ceil(days / 7) + 1;
    },
    addListener() {
      this.body = document.querySelector("body");
      this.handleBlur = e => {
        const checkdom = this.$refs.wpdom;
        let isClickSelf = false;
        let target = e.target;
        do {
          if (target == checkdom) {
            isClickSelf = true;
            return false;
          }
        } while ((target = target.parentNode));

        !isClickSelf && (this.showwp = false);
      };
      this.body.addEventListener("click", this.handleBlur, false);
    },
    getMonthWeek(a) {
      let date = new Date(a),
        w = date.getDay(),
        d = date.getDate();
      return Math.ceil((d + 6 - w) / 7);
    },
    //周日到周六为 一周
    getMonthWeeks(now_month) {
      let week_array = [];
      let today = new Date(Date.parse(now_month));
      let year = today.getFullYear();
      let month = today.getMonth();
      let i = 0;
      let en = 0;
      let start = new Date(year, month, 1); // 得到当月第一天
      let now = new Date();
      let end = new Date(year, month + 1, 0); // 得到当月最后一天
      let cha = 0;
      if (new Date(year, month + 1, 0) > now) {
        let nowday = now.getDay();
        switch (nowday) {
          case 0:
            cha = 1;
            break;
          case 1:
            cha = 6;
            break;
          case 2:
            cha = 5;
            break;
          case 3:
            cha = 4;
            break;
          case 4:
            cha = 3;
            break;
          case 5:
            cha = 2;
            break;
          case 6:
            cha = 1;
            break;
        }
      }


      let start_day = start.getDay(); // 当月第一天是周几
      switch (start_day) {
        case 0:
          i = 1;
          break;
        case 1:
          i = 0;
          break;
        case 2:
          i = -1;
          break;
        case 3:
          i = -2;
          break;
        case 4:
          i = -3;
          break;
        case 5:
          i = -4;
          break;
        case 6:
          i = -5;
          break;
      }

      let end_day = end.getDay(); // 当月第一天是周几
      switch (end_day) {
        case 0:
          en = 6;
          break;
        case 1:
          en = 5;
          break;
        case 2:
          en = 4;
          break;
        case 3:
          en = 3;
          break;
        case 4:
          en = 2;
          break;
        case 5:
          en = 1;
          break;
        case 6:
          en = 0;
          break;
      }

      // end + cha * 24 * 60 * 60 * 1000
      while (new Date(year, month, i + 6) <= new Date(year, month + 1, en)) {
        week_array.push([
          new Date(year, month, i).format("yyyy.MM.dd"),
          new Date(year, month, i + 6).format("yyyy.MM.dd")
        ]);
        i += 7;
      }

      console.log(week_array);
      return week_array;
    },
    setRange() {
      const date = this.startoftime;
      this.limityear = date.getFullYear();
      this.limitmonth = date.getMonth() + 1;
      this.limitday = date.getDate();
    },
    addWeek() {
      this.lists.forEach(el => {
        el.week = this.calcTotalWeeks(el.value);
      })
    },
    getMonthWeekByMoment(year, month) {
      let cha = new Date() - this.startoftime;
      let weeks = Math.ceil(cha/(24*3600*7*1000));

      let lastdate = moment(this.startoftime);
      let first, end, fmonth, emonth, fyear, eyear;
      let m = {};
      let today = new Date().getDate();
      Array.from({length: weeks}).forEach((el, index) => {
        fyear = lastdate.year();
        fmonth = lastdate.month()+1;
        first = lastdate.format("YYYY.MM.DD");

        lastdate = lastdate.add(6, 'days');
        eyear = lastdate.year();
        emonth = lastdate.month()+1;
        end = lastdate.format("YYYY.MM.DD");
        
        if(!m[fyear]) m[fyear] = {};
        if(!m[fyear][fmonth]) m[fyear][fmonth] = [];

        m[fyear][fmonth].push([first, end]);

        if(fyear == eyear) {
          if(fmonth != emonth) {
            if(!m[fyear][emonth]) m[fyear][emonth] = [];
            m[fyear][emonth].push([first, end]);
          }
        }
        else {
          if(!m[eyear]) m[eyear] = {};
          if(!m[eyear][emonth]) m[eyear][emonth] = [];
          m[eyear][emonth].push([first, end]);
        }
        

        lastdate = lastdate.add(1, 'days');
      });
      return (m[year]&& m[year][month]) || [];
    }
  },
  watch: {
    showwp: function(n) {
      if (n) {
        this.addListener();
      } else {
        this.body.removeEventListener("click", this.handleBlur, false);
      }
    },
    startOfTime: function(n,o) {
        if(n != o && n) {
          //兼容苹果浏览器TMD
          let arr = n.split(/[- : \/]/);
          arr[1] = arr[1] -1;
          this.startoftime = new Date(...arr);

          this.setRange();
          this.init();
          this.setDate();
          this.addWeek();
        }
    }
  }
};
</script>

<style lang='scss'>
.weekpicker {
  position: relative;
  .el-input-group__prepend {
    background-color: transparent;
    border-right: 0;
    border-color: #ccc !important;
    padding: 0 6px;
  }
  .el-input__inner {
    border-right: 0;
    border-left: 0;
    background-color: transparent;
    border-color: #ccc !important;
    cursor: pointer;
  }
  .el-input__inner:focus {
    border-color: #ccc !important;
  }
  .el-input-group__append {
    background-color: transparent;
    border-left: 0;
    padding: 0 6px;
    width: 30px !important;
    text-align: right;
    border-color: #ccc !important;
  }
  .wp-dropdown {
    position: absolute;
    top: 42px;
    left: 0;
    right: 0;
    z-index: 100;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    font-size: 20px;
  }
  .wp-dp-hd {
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin: 0 1rem;
    line-height: 2em;
    i {
      vertical-align: middle;
      font-weight: normal;
    }
    i.w-icon {
      cursor: pointer;
    }
    i.w-icon:hover {
      color: #2fbffb;
    }
  }
  .wp-dp-list {
    padding: 1rem 0;
    text-align: center;
    li {
      line-height: 2em;
      font-size: 1em;
      color: #333;
      cursor: pointer;
      padding: 0 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      box-sizing: border-box;
      i {
        display: inline-block;
        vertical-align: middle;
        padding-right: 2em;
        font-weight: normal;
      }
    }
    li:hover {
      // background-color: #2fbffb;
      color: #2fbffb;
    }
    li.active {
      color: #ff651a;
    }
  }
}
@media screen and (max-width: 700px) {
  .weekpicker .wp-dropdown {
    font-size: 5vw;
  }
}

@media screen and (max-width: 1200px) and (min-width: 701px){
  .weekpicker {
    .wp-dropdown {
      font-size: 16px;
    }
  }
}
</style>


