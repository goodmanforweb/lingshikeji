<!--  -->
<template>
<page title="每日销售报表" borderLine padding routerBack="/pdash">
    <div class="ppdd-dash-report">
      <div class="tcolor fw f20 x-hd">每日销售报表</div>
      <Scroll trigger>
        <XXTable  style="width: 100%" :data="lists">
                <XXTable-Column
                prop="date"
                label='日期'
                >
                </XXTable-Column>
                <XXTable-Column
                prop="amount"
                label="销售额"
                >
                </XXTable-Column>
        </XXTable>
      </Scroll>
    </div>  
</page>
</template>

<script>
export default {
  data () {
    return {
        lists: [
        {
          date: '2019:88:88',
          amount: 9900000
        },
        {
          date: '2019:88:88',
          amount: 9900000
        },
        {
          date: '2019:88:88',
          amount: 9900000
        },

      ]
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss'>

</style>