<template>
    <div class="shake flex vc hc">
        <div class="shake-icon" @click="$router.push('reward')">
            <img src="../assets/images/shake.png" alt="">
            <p>摇一摇赢取CJT</p>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.shakeInit();
        // this.initShake2();
    },
    beforeDestroy() {
        window.removeEventListener('devicemotion', this.deviceMotionHandler, false);
    },
    methods: {
        initShake2 () {
            let SHAKE_THRESHOLD = 3000;
            let last_update = 0;
            let x = 0, y = 0, z = 0;
            let last_x = 0,  last_y = 0,  last_z = 0;
            function init() {
                if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', deviceMotionHandler, false);
                } else {
                    alert('not support mobile event');
                }
            }
            function deviceMotionHandler(eventData) {
                var acceleration = eventData.accelerationIncludingGravity;
                var curTime = new Date().getTime();
                if ((curTime - last_update) > 100) {
                    var diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
    
                    if (speed > SHAKE_THRESHOLD) {
                        alert("摇动了");
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            }
            init();
        },
        deviceMotionHandler(eventData) {
                    let x = 0, y = 0, z = 0;
                    let acceleration = eventData.accelerationIncludingGravity;
                    let curTime = new Date().getTime();
                    if ((curTime - this.last_update) <= 100) {
                        return false
                    };
                    let diffTime = curTime - this.last_update;
                    this.last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    let speed = Math.abs(x + y + z - this.last_x - this.last_y - this.last_z) / diffTime * 10000;
                
                    if (speed > this.SHAKE_THRESHOLD) {
                        // alert(34)
                        this.$router.push('/reward');
                    }
                    this.last_x = x;
                    this.last_y = y;
                    this.last_z = z;
            
        },
        shakeInit() {
            
            this.SHAKE_THRESHOLD = 3000;
            this.last_update = 0;
            this.last_x = 0, this.last_y = 0, this.last_z = 0;
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', this.deviceMotionHandler.bind(this), false);
            } else {
                alert('not support mobile event');
            }
        }
    }
}
</script>
<style lang="scss">
.shake {
    color:#fff;
    background: url(../assets/images/shakebg.png) no-repeat center/100% 100%;
}
.shake-icon {
    img {
        width: 120px;
    }
}
</style>

