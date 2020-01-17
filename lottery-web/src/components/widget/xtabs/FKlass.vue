<template>
    <div class="cl-board">
        <div class="cl-last center">
            <div class="cl-last-text">
                Last draw number at 2018.09.26 ( NO.1097)
            </div>
            <ul class="cl-last-num">
                <li class="circle ciclegray">22</li>
                <li class="circle ciclegray">22</li>
                <li class="circle ciclegray">22</li>
                <li class="circle ciclegray">22</li>
                <li class="circle ciclegray">33</li>
                <li class="circle ciclered">33</li>
            </ul>
            <p class="center">
                <router-link to="/fkrecord">
                    Past Result >
                </router-link>
            </p>
        </div>

        <div class="cl-btime flex">
            <div class="cl-btime-text">
                <div>Boarding Time</div>
                <span>Next draw countdown</span>
            </div>
            <div class="cl-btime-time">
                <div class="cl-bt-wrap">
                    <span>
                        <i>02:</i>
                        <i>Days</i>
                    </span>
                    <span>
                        <i>14:</i>
                        <i>Hours</i>
                    </span>
                    <span>
                        <i>02:</i>
                        <i>Min</i>
                    </span>
                    <span>
                        <i>11</i>
                        <i>Sec</i>
                    </span>
                </div>
            </div>
        </div>

        <div class="cl-picker">
            <div class="cl-picker-num flex">
                <div class="clp-tit">
                    <span>
                        Ticket
                    </span>
                    <span>
                        NO.1098
                    </span>
                </div>
                <div class="clp-pick">
                    <span class="clp-num-tit">Pick 5 numbles</span>
                    <div class="clp-nums">
                        <i v-for="(num, index) in normalnumbers" :key="index">{{num}}</i>
                    </div>
                </div>
                <div class="clp-mega">
                    <span class="clp-num-tit">Mega</span>
                    <div class="clp-nums">
                        <i v-for="(num, index) in meganumbers" :key="index">{{num}}</i>
                    </div>
                    <div class="clp-mega-btn">
                        <span class="btn-rec">
                            Quick Pick
                        </span>
                        <span class="btn-rec">
                            <svg width="14px" height="16px" viewBox="0 0 14 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="主页（默认3天）" transform="translate(-621.000000, -743.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                        <g id="删-除" transform="translate(621.000000, 743.000000)">
                                            <path d="M7.10924884,0 C5.57982606,0 4.33852622,1.29486603 4.28570495,2.920508 L0.720269247,2.920508 C0.324124973,2.920508 0,3.26410005 0,3.6897347 C0,4.11281264 0.321730938,4.45897768 0.720284496,4.45897768 L1.51499758,4.45897768 L1.51499758,13.0641029 C1.51499758,14.6794855 2.54020902,16 3.80793474,16 L10.2664938,16 C11.5318255,16 12.559431,14.6871882 12.559431,13.0641029 L12.559431,4.46410738 L13.2797155,4.46410738 C13.675875,4.46410738 14,4.12049905 14,3.6948644 C14,3.27178646 13.6782691,2.9256377 13.2797155,2.9256377 L9.92797416,2.9256377 C9.88235025,1.29488231 8.63865638,1.62847552e-05 7.10924884,1.62847552e-05 L7.10924884,0 Z M5.63505661,2.920508 C5.68787788,2.08718451 6.3241424,1.44103799 7.11164288,1.44103799 C7.89914335,1.44103799 8.53540787,2.08974121 8.58103179,2.920508 L5.63505661,2.920508 Z M3.80552545,14.561535 C3.35654466,14.561535 2.86193995,13.9461504 2.86193995,13.0641029 L2.86193995,4.46410738 L11.2076853,4.46410738 L11.2076853,13.0717893 C11.2076853,13.9512801 10.7130806,14.5692377 10.2640998,14.5692377 L3.80552545,14.5692377 L3.80552545,14.561535 Z" id="形状"></path>
                                            <path d="M5.53034059,13 C5.8209474,13 6.06066771,12.654771 6.06066771,12.2213423 L6.06066771,7.77867372 C6.06066771,7.34524499 5.82307609,7 5.53034059,7 C5.23970683,7 5,7.34524499 5,7.77867372 L5,12.2213423 C5,12.6522423 5.2333477,13 5.53034059,13 Z M7.45015089,13 C7.74077118,13 7.98047801,12.654771 7.98047801,12.2213423 L7.98047801,7.77867372 C7.98047801,7.34524499 7.7428864,7 7.45015089,7 C7.15953061,7 6.9198103,7.34524499 6.9198103,7.77867372 L6.9198103,12.2213423 C6.9198103,12.6522423 7.15953061,13 7.45015089,13 Z M9.46965941,13 C9.76027969,13 10,12.654771 10,12.2213423 L10,7.77867372 C10,7.34524499 9.76240839,7 9.46965941,7 C9.17903912,7 8.93933229,7.34524499 8.93933229,7.77867372 L8.93933229,12.2213423 C8.93933229,12.6522423 9.1705513,13 9.46965941,13 Z" id="形状"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="cl-picker-mount flex">
                <div class="clp-tit">
                    <span>Payment</span>
                </div>
                <div class="clp-rate">
                    <div class="clp-rate-amount">
                        <span>
                            Payment
                        </span>
                        <span>100</span>
                        <span>JLT</span>
                    </div>
                    <div class="clp-rate-b">
                        <span>Rate</span>
                    </div>
                </div>
                <div class="clp-bet center">
                    <div class="btn-round">
                        BET NOW
                    </div>
                    <div class="clp-bet-hint f14">
                        Available:100,100,00 JLT
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            normalnumbers:Array.from({length: 69}).map((num, index) => {
                return String(index+1).length < 2 ? '0' + String(index+1) : index+1;
            }),
            meganumbers:Array.from({length: 26}).map((num, index) => {
                return String(index+1).length < 2 ? '0' + String(index+1) : index+1;
            }),
        }
    }
}
</script>




