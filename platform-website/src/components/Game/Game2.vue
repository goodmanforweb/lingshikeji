<template>
  <div class="game-wrap flex"  v-loading="assetLoader">
    <div class="game-left">
      <div class="game-chart">
        <canvas ref="chart"></canvas>
        <img  class="chart-bg" src="../../assets/images/bg.png" alt="">
      </div>
      <div class="game-record" v-if="isMobile" >
        <p>{{$t("ms.mygamerecord")}}</p>
        <el-table
          :data="historyResult"
          max-height="203"
          v-loadmore="loadMore"
          v-loading="betHistoryLoader"
          :cell-class-name="addCellClass">
          <el-table-column
            prop="round"
            :label="$t('ms.gamenumber')">
          </el-table-column>
          <el-table-column
            prop="room"
            :label="$t('ms.gameroom')">
          </el-table-column>
          <el-table-column
            prop="rate"
            :label="$t('ms.crashat')">
          </el-table-column>
          <el-table-column
            prop="bet"
            :label="$t('ms.betnumber')">
          </el-table-column>
          <el-table-column
            prop="profit"
            :label="$t('ms.gameresult')">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="game-right flex" :class="{borderRadius: isBigScreen}">
      <div class="game-control" >
         <el-tabs  @tab-click="swithTab">
          <el-tab-pane :disabled="man.disable" :label="$t('ms.manmode')" name="0" class="man-handle">
            <div v-if="isMobile">{{$t("ms.joingame")}}</div>
            <div class="input-wrap bet-input">
              <label for="" v-if="!isMobile">{{$t("ms.vote")}} ( {{$t("ms.currentMoney")}}：{{balance.balance | currency}} {{$t("ms.upc")}} ) </label>
              <el-input v-model.trim="man.bet" class="flex1" :placeholder="$t('ms.consume')" :disabled="man.btn.btnDisable">
                <i class="" slot="append">{{$t('ms.upc')}}</i>
              </el-input>
              
            </div>
            <div class="input-wrap slider-input">
              <el-slider :min="Number(betfloor)" :max="Number(bettop)" :step="1" v-model="man.slider" :disabled="man.btn.btnDisable"></el-slider>
              <div class="fm-slider-hinter clearfix">
                <span class="fl">{{betfloor | currency}}{{$t("ms.upc")}}</span>
                <span class="fr">{{bettop | currency}}{{$t("ms.upc")}}</span>
              </div>
              <p class="rest" v-if="isMobile">{{$t("ms.currentMoney")}}：{{balance.balance | currency}} {{$t("ms.upc")}}</p>
            </div>
            <div class="input-wrap rate-input">
              <label for="">{{$t("ms.rate")}}</label>
              <el-input v-model.trim="man.crash" class="flex1" :placeholder="$t('ms.inputbet')" :disabled="man.btn.btnDisable">
                <span class="" slot="append" @click="handleTimes">
                  <i class="rate-add" type="add" :class="{'el-icon-plus': !isMobile, 'el-icon-circle-plus': isMobile }"></i>
                  <i class="rate-delete " type="reduce" :class="{'el-icon-minus': !isMobile, 'el-icon-remove': isMobile}"></i>
                </span>
              </el-input>
            </div>
            <el-button 
            class="join-btn" 
            type="primary" 
            @click="handleMan"
            :style="`backgroundColor:${man.btn.bgcolor};color: ${man.btn.color}`"
            :loading="man.btn.showLoader"
             :icon="man.btn.icon"
            >
              {{man.btn.txt}}
            </el-button>
          </el-tab-pane>

          <el-tab-pane :label="$t('ms.automode')" name="1">
            <div class="auto-hd" v-if="isMobile">{{$t("ms.joingame")}}</div>

            <p><span>{{$t('ms.gameAmount')}}：</span> <span class="ycolor">{{$t("ms.restMoney")}}（{{auto.cubeValue}}）</span></p>
            <ul class="auto-cube flex" @click="chooseCube">
              <li v-for="(cb,idx) in auto.cube" :key="idx" :datakey="idx" :class="{active: cb[1]}">{{cb[0]}}</li>
            </ul>
            <p class="rest">{{$t("ms.currentMoney")}}：{{balance.balance | currency}} {{$t("ms.upc")}}</p>

            <!-- <div class="auto-fter">
              <span>{{$t("ms.endBet")}}：</span>
              <span class="ycolor autorate">{{auto.rate}}</span>
              <span class="fresh" :class="{'fresh-active': auto.freshActive}" @click="fresh"></span>
            </div> -->
            <div class="input-wrap rate-input">
              <label for="">{{$t("ms.endBet")}}</label>
              <el-input v-model.trim="auto.rate" class="flex1" :placeholder="$t('ms.inputbet')" :disabled="auto.btn.btnDisable">
                <span class="" slot="append" @click="handleTimesAuto">
                  <i class="rate-add" type="add" :class="{'el-icon-plus': !isMobile, 'el-icon-circle-plus': isMobile }"></i>
                  <i class="rate-delete " type="reduce" :class="{'el-icon-minus': !isMobile, 'el-icon-remove': isMobile}"></i>
                </span>
              </el-input>
            </div>
            <el-button 
            class="join-btn"
            :style="`backgroundColor:${auto.btn.bgcolor};color: ${auto.btn.color}`"
            type="primary"
            :disabled="auto.btn.btnDisable"
             @click="handleAuto"
            >{{auto.btn.txt}}</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="game-result flex1" v-if="isMobile">
        <div class="result-hd center">
          {{$t("ms.roundresult", {round: this.round})}}
        </div>
       <div class="current-table" ref="currentResultTableDom">
          <el-table
          :data="currentResult"
          style="width: 100%"
          :row-class-name="addRowClass"
          :height="currentResultTableHeight"
          >
          <el-table-column
            width="50px"
            prop="avtar">
            <template slot-scope="scope">
              <img class="table-cell-avtar" :src="scope.row.nickname | usernameToHead">
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            :label="$t('ms.user')">
          </el-table-column>
          <el-table-column
            prop="bet"
            :label="$t('ms.bet')">
          </el-table-column>
          <el-table-column
            prop="rate"
            :label="$t('ms.rate')">
          </el-table-column>
        </el-table>
       </div>
        <div class="progress clearfix ">
          <span class="progress-indicator fl" :style="`width:${indicator.wwidth};backgroundColor:${indicator.wcolor}`"></span>
          <span class="progress-indicator fr" :style="`width:${indicator.lwidth};backgroundColor:${indicator.lcolor}`"></span>
      </div>
      </div>
    </div>
    <div class="game-mobile" v-if="!isMobile">
      <div class="progress clearfix ">
        <span class="progress-indicator fl" :style="`width:${indicator.wwidth};backgroundColor:${indicator.wcolor}`"></span>
        <span class="progress-indicator fr" :style="`width:${indicator.lwidth};backgroundColor:${indicator.lcolor}`"></span>
      </div>
      <el-tabs >
        <el-tab-pane :label="$t('ms.currentGame')" name="0">
          <el-table
          :data="currentResult"
          :row-class-name="addRowClass"
          max-height="300"
          >
          <el-table-column
            width="50px"
            prop="avtar">
            <template slot-scope="scope">
              <img class="table-cell-avtar" :src="scope.row.nickname | usernameToHead">
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            :label="$t('ms.user')">
          </el-table-column>
          <el-table-column
            prop="bet"
            :label="$t('ms.bet')">
          </el-table-column>
          <el-table-column
            prop="rate"
            :label="$t('ms.rate')">
          </el-table-column>

        </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('ms.gamehistoryrecord')" name="1">
          <el-table
          :data="historyResult"
          max-height="300"
          v-loadmore="loadMore"
          v-loading="betHistoryLoader"
          style="width: 100%"
          :cell-class-name="addCellClass">
          <el-table-column
            prop="round"
            :label="$t('ms.gamenumber')">
          </el-table-column>
          <el-table-column
            prop="room"
            :label="$t('ms.gameroom')">
          </el-table-column>
          <el-table-column
            prop="rate"
            :label="$t('ms.crashat')">
          </el-table-column>
          <el-table-column
            prop="bet"
            :label="$t('ms.betnumber')">
          </el-table-column>
          <el-table-column
            prop="profit"
            :label="$t('ms.gameresult')">
          </el-table-column>
        </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <ExchangePanel :firstMessageHasCome="firstMessageHasCome"></ExchangePanel>
  </div>
</template>

<script src="./game.js"></script>
<style src="./game.scss"></style>


