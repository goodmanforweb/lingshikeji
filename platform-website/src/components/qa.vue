<template>
    <div class="qa-wrap">
        <div class="qa card">
          <h3 v-if="isMobile"><span>FAQ</span></h3>
          <article v-loading="loader">
            <template v-for="(el, index) in article" >
              <div :key="index">
                <h3 class="contiem">{{el.belong}}</h3>
                <ul @click="collapse" >
                  <li v-for="(qu, index2) in el.question" :key="index2">
                      <p class="tit1" v-html="qu.title"></p>
                      <div class="cont" v-html="qu.content"></div>
                  </li>
                </ul>
              </div>
            </template>
          </article>
          
      </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      isMobile: window.innerWidth > 700,
      article: [],
      loader: false
    }
  },
  created() {
    this.getArticle(this.$i18n.locale);
  },
  methods: {
    getArticle(lang) {
      this.loader = true;
      import(`../i18n/faq${lang}.js`).then(res => {
        this.article = res.default;
      }).catch(err => {

      }).finally(() => {
        this.loader = false;
      })
    },
    collapse(e) {
      let target = e.target;
      if (target.tagName != "P") return false;
      let $ = target.parentNode.classList;
      $.contains("active") ? $.remove("active") : $.add("active");
    }
  },
  watch: {
    "$i18n.locale": function(n) {
     this.getArticle(n);
    },
  }

};
</script>


<style lang="scss">
.qa-wrap {
  background-color: #F7F7F7;
  padding: 1rem;
  height: 100%;
  box-sizing: border-box;
}
.qa {
  color: #808080;
  h3.contiem {
    color:#000;
  }
  
  .cont {
    display: none;
    border-top: 1px solid #eee;
    padding-top: 8px;
  }
  li {
    cursor: pointer;
    transition: all 0.3s linear;
  }
  .active {
    color: #000;
    .cont {
      display: block;
    }
  }
  h3 span{
    color: #2fbffb;
    position: relative;
  }
  h3 span:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    display: block;
    width: 100%;
    height: 4px;
    background-color: #2fbffb;
  }
}

@media screen and (max-width: 700px){
  .qa-wrap {
    background-color: #fff;
  }
}
</style>


