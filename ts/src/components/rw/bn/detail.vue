<!--  -->
<template>
<Page :title="$t('m.hydash')" borderLine padding routerBack="rw">
    <!-- <router-link class="tcolor f12" slot="layer-right-btn" to="/guide?type=bn" >{{$t('m.guide')}}</router-link> -->

<div class="dot-detail">
    <div class="flex sb vc" v-if="!isMobile">
        <span class="tcolor fw f24">
            {{$t('m.bnrw')}}
        </span>
        <!-- <a href="#/guide?type=bn" target="_blank" class="n-btn btn-tcolor-border" style="width: auto">
            {{$t('m.checkguide')}}
        </a> -->
    </div>

    <div class="dh-bar block re tcolor m16">
      <!-- {{$t('m.bnhint1')}} -->
      {{$i18n.locale=='zh' ? item.tip : item.tip_en}}
    </div>
    <div class="sb" :class="{flex: !isMobile}">
      <div class="bn-cube center block" :class="{'flex sb vc mb16':isMobile}">
        <div class="gcolor">{{$t('m.bnhint2')}}</div>
        <span class="tcolor f24">{{item.yield_rate}}%</span>
      </div>
      <div class="bn-cube center block" :class="{'flex sb vc':isMobile}">
        <div class="gcolor">{{$t('m.scangzqi')}}</div>
        <span class="tcolor f24">{{item.experience}}{{$t('m.day')}}</span>
      </div>
    </div>
    <div class="f14 tcolor m20" v-html="$i18n.locale=='zh' ? item.desc : item.desc_en">
      <!-- {{$t('m.bnhint3')}} -->
    </div>

    <div class="center">
        <!-- <p class="tcolor f14">{{$t('m.kgmesy')+restnum}}</p> -->
        <el-button :disabled="disabled" :loading="btnLoader" class="n-btn f20 btn-tcolor hcenter db btn-panel-width" @click="toSign('BN')"> {{item.price || 0}}CJS</el-button>
        <p >
          <span class="gcolor f12">{{$t('m.dqye')}}: {{useraccount.value | currency}} CJS</span>
        </p>
    </div>

    
</div>
</Page>
</template>

<script>
import Big from 'bignumber.js'
import mixin from '../mixin/mixin'
import {mapGetters} from 'vuex';
export default {
    props: ['panelData'],
    mixins:[mixin],
    data () {
        return {
            loader: false,
            item: {},
            id:'',
            join_num:0,
            disabled: false
        };
    },
    created() {
        this.id = this.isMobile ? this.$route.query.id : this.panelData.id;
        this.getDetail();
        this.getSignNum();
    },
    components: {},
    computed: {
      ...mapGetters(['signHYDetail','useraccount']),
        isMobile() {
            return this.$store.getters.isMobile
        },
        data() {
          return this.signHYDetail;
        },
        restnum() {
          return 1;
          // return (Number(this.item.open_num) - Number(this.join_num)) || 0;
        }
    },
    mounted() {},
    methods: {
      getSignNum() {
            request.getBNSignNum({params: {contract: this.id}})
            .then(res => {
                this.join_num = res.data.Count || 0;
            })
        },
      getDetail() {
            if(!this.id) return;
            this.listid = this.id;
            this.loader = true;
            request.getHYDetail({}, {id:this.id})
            .then(res => {
                let data = res.data.metadata ? JSON.parse(res.data.metadata) : {};
                this.id = res.data.project;
                const  t = Big(data.lock_limit).times(data.discount_rate || 0).times(1e-2);
                data.price = Big(data.lock_limit).minus(t).toNumber();
                data.join_num = data.join_num ? Number(data.join_num) : 0;
                this.item = data;
            })
            .finally(() => {
                this.loader = false
            })
        }
    },
     watch: {
        signHYDetail: {
            immediate: true,
            deep: true,
            handler: function(n) {
                if(n.quota > 0) {
                  this.disabled = n.isSign;
                }
                
            }
        }
    }
}

</script>
<style lang='scss'>


</style>