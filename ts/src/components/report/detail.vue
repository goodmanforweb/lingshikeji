<template>
      <Page :title="$t('m.report')" borderLine padding routerBack='/report'>
          <div class="publicreport flex flex1"  >
            <div class="re-cont block">
              <div class="card">
                <div class="card-hd tcolor">
                  <h2 v-html="cont.title"></h2>
                  <div class="card-hd-info">
                    <img src="../../assets/images/plogo.png" alt="">
                    <p >Geeker</p>
                    <p>{{cont.createtime | format}}</p>
                  </div>
                </div>

                <div class="card-bd tcolor"   
                v-html="cont.content"></div>
              </div>
            </div>
        </div>
    </Page>
</template>
<script>
export default {
  data() {
    return {
      cont:{}
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      if(!this.$route.query.id) return;
      request.getReportDetail({},{id:this.$route.query.id})
      .then(res => {
        this.cont = res.data;
      })
    }
  }
};
</script>




