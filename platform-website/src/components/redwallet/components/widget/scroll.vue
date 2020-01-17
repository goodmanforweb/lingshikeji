<template>
    <div class="scroll">
        <slot></slot>
        <transition name="fade">
            <div class="showlaoder" v-show="showlaoder"></div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showlaoder: false,
        }
    },
    props: ['fetch', 'disable', 'trigger'],
    created() {
        this.trigger && this.goFetch();
    },
    mounted() {
        this.last_distance = 0;
        window.addEventListener('scroll', this.fetchmore, false)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.fetchmore, false)
    },
    methods: {
        fetchmore(e) {
            e.stopPropagation();
            e.preventDefault();
            if(this.disable)return;
            const html = document.documentElement;
            const scrollTop = html.scrollTop || document.body.scrollTop
            const distance = html.scrollHeight - scrollTop - html.clientHeight;
            // alert(scrollTop);
            // alert(html.scrollHeight);
            // alert(html.clientHeight);

            if(distance - this.last_distance > 0) {
                this.last_distance = distance;
                return;
            }
            
            this.last_distance = distance;
            if(distance <= 100 && !this.showlaoder) {
                this.goFetch();
            }
        },
        goFetch() {
            console.warn('loading','on');
            this.showlaoder = true;
            console.info(this.showlaoder,'post');
            this.fetch().finally(() => {
                this.showlaoder = false;
            });
        }
    }
}
</script>
<style lang="scss">
.showlaoder {
    margin: 10px 0;
    height: 40px;
    background: url(../../assets/images/loader.gif) no-repeat center/contain;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

