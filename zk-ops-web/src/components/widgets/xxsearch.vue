<!--  -->
<template>
<div class="xx-search flex vc" :class="{'active borderLine': inputShow}">
    <span class="btn-cancel tcolor f12 fw" v-if='isMobile&&inputShow' @click="searchHandle(false)">取消</span>
    <input ref="input" v-show="inputShow" class="flex1" type="text" placeholder="搜索用户/手机号" :value='value' @input="handler">
    <span class="xx-search-btn cp" @click="searchHandle(true)">
        <img src="../../assets/images/searchicon.png" alt="">
    </span>
</div>
</template>

<script>
export default {
    props:['value'],
    data() {
        return {
            inputShow: true
        }
    },
    created() {
        this.inputShow = !this.isMobile;
    },
    methods: {
        handler($event) {
            this.$emit('input', $event.target.value)
        },
        searchHandle(state) {
            if(this.isMobile) {
                this.inputShow = state;
                state && this.$nextTick(() => { this.$refs.input.focus();});
                this.$emit('hideEvent', !state)
            }
        }
    },
    computed: {
        isMobile() {
            return this.$store.getters.isMobile
        }
    },
}

</script>
<style lang='scss'>
.pc {
    .xx-search {
        border-bottom: 1px solid rgba(0, 89, 130, 0.308);
    }
}
.xx-search {
    padding: 0 6px;
    input {
        border:none;
        outline: none;
        height: 40px;
        line-height: 40px;
        background: transparent;
        color: #086599;
    }
    img {
        width: 22px;
        min-width: 22px;
    }
}
.mobile {
    .xx-search {
       
        input {
            order:2;
            height: 30px;
            line-height: 30px;
            margin: 0 10px;
        }
    }
    .xx-search.active {
         width: 100%;
    }
    .xx-search-btn {
        order: 1
    }
    .btn-cancel {
        order: 3
    }
    .xx-search.active {
        input {
            flex:1;
        }
    }
}
</style>