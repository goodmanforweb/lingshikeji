<!--  -->
<template>
<page title="矿池详情" borderLine padding routerBack="/prw">
<Scroll trigger>
    <div class="prw-ft " >
        <XXTable  :data="lists" >
                <XXTable-Column
                prop="kjnum"
                label='矿机编号'
                >
                </XXTable-Column>
                <XXTable-Column
                prop="buydate"
                label="购买时间"
                >
                </XXTable-Column>
                <XXTable-Column
                prop="user"
                label="所属用户"
                >
                </XXTable-Column>
                <XXTable-Column
                prop="restdate"
                label="剩余时间"
                >
                </XXTable-Column>
                <XXTable-Column
                prop="kjprog"
                label="挖矿进度"
                >
                </XXTable-Column>
                <XXTable-Column
                prop="amount"
                label="挖矿数量（CJT）"
                >
                </XXTable-Column>
        </XXTable>
    </div>  
</Scroll>
</page>
</template>

<script>
export default {
  data () {
    return {
        lists: [
            {
                kjnum: '000000000',
                buydate:'2018-90-90',
                user:'uuuu',
                restdate:'4天 11:11:11',
                kjprog:'30%',
                amount:'20000'
            },
            {
                kjnum: '000000000',
                buydate:'2018-90-90',
                user:'uuuu',
                restdate:'4天 11:11:11',
                kjprog:'30%',
                amount:'20000'
            },
            {
                kjnum: '000000000',
                buydate:'2018-90-90',
                user:'uuuu',
                restdate:'4天 11:11:11',
                kjprog:'30%',
                amount:'20000'
            }
        ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss'>

</style>