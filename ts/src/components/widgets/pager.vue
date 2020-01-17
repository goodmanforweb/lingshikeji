<!--  -->
<template>
<div class="kj-pager flex sb" style="margin: 20px auto 0" v-if="!isMobile">
    <span class="kj-la" :class="{disable: total == 0 || page == 1}" @click="pagerHandle('prev')"></span>
    <span class="kj-ra" :class="{disable: total == 0 || page == total}" @click="pagerHandle('next')"></span>
</div>
</template>
<script>
export default {
    props: {
        total: {
            type:Number,
            default: 1
        },
        trigger:{
            type: Boolean,
            default: true
        },
        value:{
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            page: 1
        }
    },
    computed: {
        isMobile() {
            return this.$store.getters.isMobile
        }
    },
    created() {
        
    },
    mounted() {
        (this.trigger == '' ) && this.$emit('change', 1);
    },
    methods: {
        pagerHandle(type) {
            if(type == 'prev') {
                if(this.page == 1) return
                this.page--;
            }
            else {
                if(this.page >= this.total) return
                this.page++;
            }
            this.$emit('input', this.page);
        },
    },
    watch: {
        'value': {
            immediate: true,
            handler: function(n) {
                this.page = n
            }
        }
    }
}
</script>