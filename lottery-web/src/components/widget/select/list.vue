<template>
    <ul class="cdate-select" v-show="show" @click="clickHandler">
        <li class="cdate-year fwb">
            <span class="cy-prev cy-arrow"></span>  {{year}}  <span class="cy-next cy-arrow"></span>
        </li>
        <li class="cdate-month" :class="{active: month==mon}" v-for="(mon, index) in months" :key="index">{{mon}}</li>
    </ul>
</template>
<script>
export default {
    data() {
        return {
            months: Array.from({length: 12}).map((el, index) => index + 1),
            top: 30,
            show: false,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        }
    },

    mounted() {
        // this.setPosition();
    },
    beforeDestroy() {
        // this.$el.parentElement.removeChild(this.$el);
    },
    methods: {
        output() {
            this.$emit('change', {
                year: this.year,
                month: this.month
            })
        },
        clickHandler(e) {
            // if(e.target.tagName != 'LI') return false;
            let target = e.target;
            
            if(target.className == 'cdate-month') {
                this.month = target.innerText;
                this.output();
                this.show = false;
            }
            else if(target.className.indexOf('cy-prev')>-1) {
                this.year--;
            }
            else if(target.className.indexOf('cy-next')>-1) {
                this.year++;
            }
            
        },
        setTop() {
            this.$el.style.top = this.top + 'px';
        }
        // setPosition() {
        //     this.$el.style.top = this.top + 'px';
        //     this.$el.style.left = this.left + 'px';
        //     this.$el.style.width = this.width + 'px';
        // }
    },
    watch: {
        show(n) {
            if(n) {
                this.setTop();
            }
        }
    }
}
</script>
<style lang="scss">
.cdate-select {
        border-radius: 4px;
        position: absolute;
        top:2rem;
        left: 0;
        right:0;
        z-index: 100;
        background-color: #504F4F;
        color:#B8B1A0;
        padding: 8px 0;
        text-align: center;
        font-family: arial;
        li {
            cursor: pointer;
        }
        li.active,li:hover {
            background-color: #040404
        }
        .cdate-year {
            border-bottom: 1px solid rgba(184,177,160,.7)
        }
        .cy-arrow {
            vertical-align: middle;
            display: inline-block;
            width: 0;
            height: 0;
            border: 8px solid transparent;
        }
        .cy-prev {
            border-right-color: #B8B1A0;
            margin-right: 16px
        }
        .cy-next {
            border-left-color: #B8B1A0;
            margin-left: 16px
        }
    } 

</style>
