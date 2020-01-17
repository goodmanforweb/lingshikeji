<template>
  <div class="room-wrap">
    <div class="room-hd center">
      <span>{{$t('ms.saishi')}}</span>
    </div>
    <div class="room-bd flex">
      <router-link v-for="(a,index) in list" :key="index" :to="`/game?room=${a.name}`">
        <img :src="a[`pic${$i18n.locale}`]" alt="">
      </router-link>
    </div>
  </div>
</template>
<script>

const mid = require('../../assets/images/mid.png');
const miden = require('../../assets/images/miden.png');
const chu = require('../../assets/images/chu.png');
const chuen = require('../../assets/images/chuen.png');
const high = require('../../assets/images/high.png');
const highen = require('../../assets/images/highen.png');

export default {
  data() {
    return {
      list: [
        {
          name:'basic',
          piczh: chu,
          picen:chuen
        },
        {
          name:'normal',
          piczh: mid,
          picen:miden
        },
        {
          name:'advance',
          piczh: high,
          picen: highen
        }
      ]
    }
  }
}
</script>
<style lang="scss">
  .room-wrap {
    box-sizing: border-box;
    min-height: 100%;
    background-color: #14181B;
    padding: 1rem 2rem;
    .room-hd {
      color: #8996A0;
      font-size: 3rem;
      position: relative;
      margin: 4rem 0;
      span {
        background-color: #14181B;
        padding: 1rem 2rem;
        position: relative;
        z-index: 99;
      }
    }
    .room-hd:before {
      content:'';
      display: inline-block;
      height: 1px;
      width: 100%;
      position: absolute;
      top:50%;
      left: 0;
      background-color: #20272c;
    }
    .room-bd {
      justify-content: space-around;
      a {
        padding:10px;
      }
      img {
        cursor: pointer;
        width: 100%;
        max-width: 285px;
      }
    }
  }
  @media screen and (max-width: 704px){
    .room-wrap {
      .room-bd {
      flex-direction: column;
      a {
        text-align: center;
        img {
          width: 65%
        }
      }
    }
    }
  }
</style>


