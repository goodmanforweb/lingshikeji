<template>
  <component :is="comp"></component>
</template>
<script>
import MIndex from './mindex'
import PIndex from './pindex'
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      comp: ''
    }
  },
  created() {
    this.comp = this.isMobile ? MIndex : PIndex
  },
  computed: {
        ...mapGetters(['isMobile'])
  },
}
</script>
