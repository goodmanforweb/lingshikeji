<template>
    <div class="scroll">
        <slot></slot>
        <div class="showlaoder" v-if="!disable" :style="`opacity:${showlaoder ? 1 : 0}`"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showlaoder: false,
        }
    },
    props: ['fetch', 'disable', 'trigger','initListener'],
    created() {
        
    },
    mounted() {
        if(!this.disable && this.fetch) {
            this.trigger != undefined && this.goFetch();
        }
        this.last_distance = 0;
        if(!this.disable) {
            (this.initListener || this.initListener == undefined) && window.addEventListener('scroll', this.fetchmore, false)
        }
        
    },
    beforeDestroy() {
        !this.disable && (this.box || window).removeEventListener('scroll', this.fetchmore, false)
    },
    methods: {
        //某个div 内加载 需要手动初始化
        init(container) {
            this.box = container;
            container.addEventListener('scroll', this.fetchmore, false)
        },
        fetchmore(e) {
            e.stopPropagation();
            e.preventDefault();
            if(this.disable)return;
            let html, scrollTop, distance;
            if(this.box) {
                html = this.box;
                scrollTop = this.box.scrollTop;
            }
            else {
                html = document.documentElement;
                scrollTop = html.scrollTop || document.body.scrollTop
            }
            distance = html.scrollHeight - scrollTop - html.clientHeight;
            if(distance - this.last_distance > 0) {
                return this.last_distance = distance
            }
            
            this.last_distance = distance;
            if(distance <= 30 && !this.showlaoder) {
                this.fetch && this.goFetch();
            }
        },
        goFetch() {
            this.showlaoder = true;
            this.fetch().finally(() => {
                this.showlaoder = false;
            });
        }
    }
}
</script>
<style lang="scss">
.showlaoder {
    transition: opacity .3s linear;
    margin: 10px 0;
    height: 40px;
    background: url(../../assets/images/loader.gif) no-repeat center/contain;
}
</style>

