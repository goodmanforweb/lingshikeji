
let mixin = {
  methods: {
    setShrink(wrap) {
      // let wrap = this.$refs.wrap;
      const ww = document.body.clientWidth;
      const wh = window.innerHeight;
      const designWidth = 1100;
      const designHeight = wrap.clientHeight;
      if(ww < designWidth) {
        let rate = (ww/designWidth);
        wrap.style.transform = `scale(${rate})`;
        const sizedHeight = ww/designWidth*designHeight;
        const reduceHeight = designHeight - sizedHeight;
        // document.body.style.height = `${sizedHeight}px`;
        if(wh < sizedHeight) {
          document.body.style.height = `${sizedHeight}px`;
        }
        // else {
        //   //居中显示
        // }
      }
    }
  }
};

export default mixin;
