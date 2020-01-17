<!--  -->
<template>
  <div class="xx-table">
    <div class="re-table">
      <div class="re-table-column-hidden" style="display:none">
        <slot/>
      </div>
      <div class="re-table-hd f12 gcolor flex">
        <div
          class="center"
          :class="{flex1: !(head.width || head.minWidth)}"
          :style="{width: head.width, minWidth: head.minWidth}"
          v-for="(head, index) in header"
          :key="index"
        >{{head.label || ''}}</div>
      </div>

      <div class="re-table-bd tcolor f12">
        <NoRecord v-if="tabledata.length==0" :hasicon="true"/>
        <Row
          v-for="(list, index) in tabledata"
          :key="index"
          :row="list"
          :index="index"
          :all="tabledata"
          :header="header"
        ></Row>
      </div>
    </div>
    <XXPager
      v-if="pagerShow == false ? false : true"
      class="re-table-ft"
      @change="val =>$emit('pagerChange', val)"
    />
  </div>
</template>

<script>
import Row from "./row";
export default {
  components: {
    Row
  },
  props: ["lists", "pagerShow", "data"],
  data() {
    return {
      header: [],
      headerprop: [],
      tabledata: []
    };
  },
  beforeCreate() {
    console.log(this);
    this.realSlots = this.$slots.default.filter(slot => slot.tag);
  },
  created() {
    this.setHeader();
  },
  mounted() {
    //   alert('table')
  },
  methods: {
    setHeader() {
      let header = [],
        headerprop = [];
      this.realSlots.forEach(slot => {
        header.push(slot.componentOptions.propsData);
        headerprop.push(slot.componentOptions.propsData.prop);
      });
      this.header = header;
    },
    getTableColumn(slots) {
      let props = [],
        scopeslots = [];
      slots.forEach(slot => {
        let data = slot.data;
        props.push(data.attrs);
        //   scopeslots.push(data.scopedSlots.default);
      });
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler: function(n) {
        this.tabledata = n || [];
      }
    }
  }
};
</script>
<style lang='scss'>
.pc {
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
</style>