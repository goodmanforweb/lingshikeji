<!--  -->
<template>
<page :title="isEdit ? '编辑公告' : '添加公告'" borderLine padding >
  <div class="report-panel">
     <div class="tcolor x-hd fw f24 mb20">{{isEdit ? '编辑公告' : '添加公告'}}</div>
     <div class="gcolor">公告标题</div>
     <div class="block block-padding bbox m16">
         <input class="tcolor" type="text">
     </div>
     <div class="block block-padding bbox">
         <textarea placeholder="公告内容">

         </textarea>
     </div>
     <div class="center m20">
        <span class="n-btn btn-tcolor f20 btn-panel-sure">确 认</span>
    </div>
</div>

</page>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    },
    isEdit() {
      return !!this.$route.query.edit;
    }
  },

  mounted() {},

  methods: {}
}

</script>
<style lang='scss'>
.report-panel {
    input {
        width: 100%;
        border:none;
        outline:none
    }
    textarea {
        width: 100%;
        height: 400px;
        border:none;
        outline:none
    }
}
</style>