export default {
    mounted() {
        this.shakeInit();
    },
    beforeDestroy() {
        window.removeEventListener('devicemotion', this.deviceMotionHandler, false);
    },
    methods: {
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
                        this.shakeTrigger();
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