<template>
     <router-view v-loading="loader&&tickerloader" class="hy-box"></router-view>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import signDetail from '../mixin/signdetail'
import Hub from '../../../Hub';
export default {
    mixins:[signDetail],
    data() {
        return {
            tickerloader: true
        }
    },
    created() {
        this.id = this.$route.params.id;
        if(this.id) {
            this.fetchSignDetail(this.id);
            this.getFWSHYLists({id:this.id});
            this.freshEvent();
        } 
        else {
            this.$router.replace('index')
        }
    },
    computed:{
        ...mapGetters(['loginInfo'])
    },
    beforeDestroy() {
        this.clearTicker();
        this.$store.commit('givenSignHYDetail', null);
        this.offEvent();
    },
    methods: {
        offEvent() {
            Hub.$off('freshSignData')
        },
        freshEvent() {
            Hub.$on('freshSignData', data => {
                this.fetchSignDetail(this.id);
                this.getFWSHYLists({id:this.id});
            })
        },
        clearTicker() {
            this.tickerloader = true;
            this.ticker && clearInterval(this.ticker)
        },
        createTicker() {
            this.clearTicker();
            this.ticker = setInterval(() => {
                this.tickerloader = false;
                this.fetchSignDetail(this.id);
            }, 10*1000)
        }
    },
    watch: {
        loginInfo: {
            immediate: true,
            deep: true,
            handler: function(n) {
                if(n.token) {
                    this.createTicker();  
                }
                else {
                    this.clearTicker();
                }
            }
        }
    }
}
</script>
