<template>
    <component :is="comp"></component>
</template>
<script>
import {mapGetters} from 'vuex';
import MRecord from './mrecord';
import PRecord from './precord';
export default {
    data() {
        return {
            comp: ''
        }
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    created() {
        this.comp = this.isMobile ? MRecord : PRecord;
    }
}
</script>
