export default {
    install: (Vue, mobileWidth = 700) => {
        let timer;
        Vue.util.defineReactive(Vue.prototype, '$isMobile', window.innerWidth < mobileWidth);
        window.addEventListener('resize', () => {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                if(window.innerWidth < mobileWidth) {
                    if(!Vue.prototype.$isMobile) {
                        Vue.prototype.$isMobile = true;
                    }
                }
                else {
                    if(Vue.prototype.$isMobile) {
                        Vue.prototype.$isMobile = false;
                    }
                }
            }, 100);
        }, false)
    }
}