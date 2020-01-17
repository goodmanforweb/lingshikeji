<template>
        <div class="kr-pager flex">
        <div class="ke-btn flex" @click="prevPage">
            <i class="el-icon-arrow-left scale"></i>
        </div>
        <span class="ke-pager-number hcolor">{{pager + '/' + totalPage}}</span>
        <div class="ke-btn flex">
            <i class="el-icon-arrow-right scale" @click="nextPage"></i>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            totalPage:0,
            pager:0
        }
    },
    props: ['fetch','count', 'size'],

    methods: {
        setPagerShow() {
          this.totalPage = Math.ceil(this.count/this.size)
      },
        prevPage() {
          let pager = this.pager;
          if(--pager <= 0)return;
          this.pager = pager;
          this.fetch(this.pager);
      },
      nextPage() {
          let pager = this.pager;
          if(++pager > this.totalPage)return;
          this.pager = pager;
           this.fetch(this.pager);
      },

    }
}
</script>
