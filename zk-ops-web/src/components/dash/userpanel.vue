<!--  -->
<template>
<page title="用户量报表" borderLine padding routerBack="/dash">
    <div class="userpanel">
        <div class="tcolor f26 m16" v-if="!isMobile">用户量报表</div>
        <XXTable  :data="lists">
                <XXTable-Column
                prop="time"
                label='日期'
                >
                </XXTable-Column>
                <XXTable-Column
                prop="amount"
                label='新增数量'
                >
                </XXTable-Column>
                <XXTable-Column
                prop="user"
                label="累计用户"
                >
                </XXTable-Column>
            </XXTable>
    </div>
</page>
</template>
<script>
export default {
    props:['panelData'],
    computed: {
        isMobile() {
            return this.$store.getters.isMobile
        }
  },
  data () {
    return {
        lists: [
            {
                time: '2016.11.11 12:12:1222016.11.11 12:12:122016.11.11 12:12:122016.11.11 12:12:12',
                amount: '10,000',
                user: 2000
            },
            {
                time: '2016.11.11 12:12:12',
                amount: '10,000',
                user: 2000
            },
            {
                time: '2016.11.11 12:12:12',
                amount: '10,000',
                user: 2000
            },
        ]
    };
  },

  components: {},
  mounted() {
      console.log(this,99);
  },

  methods: {
      tableFetch(type) {
          console.log(type);
      }
  }
}

</script>
<style lang='scss'>
.pc {
    .userpanel {
        width: 860px;
        margin: 60px auto;
    }
    .re-table-hd-row {
        padding: 16px 0;
        border-radius: 4px;
        margin: 10px 0;
        cursor: pointer;
    }
    .re-table-ft {
        width: 120px;
        margin: 20px auto;
    }
}

.mobile {
    .el-table {
        border-radius: 6px;
        tbody {
            .cell {
                color: #086599
            }
        }
    }
}
</style>