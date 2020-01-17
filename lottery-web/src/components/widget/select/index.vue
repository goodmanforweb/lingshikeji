<template>
    <div class="cselect">
        <i class="cs-arrow-prev cs-arrow" @click="prev"></i>
        <span class="cs-cont">{{options[index] && options[index].name}}</span>
        <i class="cs-arrow-next cs-arrow" @click="next"></i>
    </div>
</template>

<script>
import util from 'util';
export default {
    data() {
        return {
            index: 0,
        }
    },
    props: ['value', 'options'],
    methods: {
        prev() {
            let index = this.index;
            if(index == 0) return false;
            index--;
            if(index < 0) {
                index = 0;
            }
            this.index = index;
            this.output();
        },
        next() {
            let index = this.index;
            if(this.options.length == index + 1) return false;
            index++;
            if(index > this.options.length-1) {
                index = this.options.length-1;
            }
            this.index = index;
            this.output();
        },
        output() {
            this.$emit('change', this.options[this.index]);
        },
        setIndex() {
            if(this.options.length > 0 && !util.isEmpty(this.value)) {
                this.options.forEach((option, index) => {
                    if(option.id == this.value.id) {
                        return this.index = index;
                    }
                })
            }
            else {
                this.index = 0;
            }
        }
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.setIndex();
            }
        },
        options: {
            immediate: true,
            handler() {
              this.setIndex();
            }
        }
    }

}
</script>


<style lang="scss">
.cselect {
    line-height: 27px;
    height: 27px;
    border-radius: 4px;
    background-color: #504F4F;
    color:#B8B1A0;
    .cs-arrow {
        display: inline-block;
        border-width: 8px;
        border-color: transparent;
        border-style: solid;
        vertical-align: middle;
        transition: all .3s ease;
        cursor: pointer;
    }
    .cs-arrow-prev {
        border-right-color: #B8B1A0
    }
    .cs-arrow-prev:hover {
        border-right-color: #DDCEAA
    }
    .cs-arrow-next {
        border-left-color: #B8B1A0
    }
    .cs-arrow-next:hover {
        border-left-color: #DDCEAA
    }
    .cs-cont {
        display: inline-block;
        padding: 0 10px;
        vertical-align: middle;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

}
</style>


