<template>
    <div class="mb6 qbk sgtd-wrap">
        <div class="block  sgtd cp" @click="handle" :class="{xdisable: disable}">
            <div class="tcolor f20">{{$t('m.tokensgtd')}}</div>
            <span class="redcolor f14">{{disable ? $t('m.notopen') : $t('m.hasopen')}}</span>
        </div>
        <div class="center f12 tcolor qbk-bar cp" @click.stop="$emit('btnActive', 'SGJL')" >{{$t('m.sgjl')}}</div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    props: ['data'],
    data() {
        return {
            disable: false
        }
    },
    computed: {
      ...mapGetters(['signHYDetail'])
    },
    methods:{
        handle() {
            // this.$emit('btnActive','SGTD')
            if(this.disable) {
                this.$message.info(this.$t('m.notopen'))
            }
            else {
                this.$emit('btnActive','SGTD')
            }
        },
        getLists(n) {
          if(!n.project_contract) return;
          this.loader = true;
          return request.buySGlists({
              params: {
                  order:'created_time',
                  desc: true,
                  contract_id: n.project_contract,
                  pagesize: 12,
                  offset: 0
              }
          })
          .then(res => {
              if(util.isEmpty(res.data.current)) {
                  this.disable = true;
              }
          })
        }
             
    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler:function(n) {
                this.getLists(n);
            }
        }
    }
}
</script>
<style>
.xdisable {
    filter: grayscale(95%)
}
</style>

