const loader = require('../../assets/images/loader.gif');
let mixin = {
    methods: {
        scrollDebounce(e) {
            this.scrollerTicker && clearTimeout(this.scrollerTicker);
            this.scrollerTicker = setTimeout(() => {
                this.scrollHandlerr();
            }, 500);
        },
        scrollHandlerr(e) {
            if(this.selector == 'window') {
                this.sbClientHeight = window.innerHeight;
                this.sbScrollTop = window.scrollY;
                this.sbBodyHeight = document.body.clientHeight;
            }
            else {
                this.sbClientHeight =this.scrollBody.clientHeight;
                this.sbScrollTop = this.scrollBody.scrollTop;
                this.sbBodyHeight = this.scrollBody.scrollHeight;
            }
            
            if(this.sbClientHeight + this.sbScrollTop >= this.sbBodyHeight - 2 && !this.loaderStatus && !this.neverShow) {
                this.triggerLoader();
            }
        },
        triggerLoader() {
            let done = () => {};
            done = this.showLoader();
            this.scrollListenerhandler && this.scrollListenerhandler(done);
        },
        addScrollListener(selector, handler) {
            this.selector = selector;
            this.scrollBody = selector == 'window' ? window : document.querySelector(selector);
            this.scrollDom  = document.querySelector(selector == 'window' ? 'body' : selector);
            this.scrollListenerhandler = handler;
            this.createLoader();
            this.scrollBody.addEventListener('scroll', this.scrollDebounce, false);
        },
        removeScrollListener() {
            this.scrollBody && this.scrollBody.removeEventListener('scroll', this.scrollDebounce, false);
        },
        initLoader() {
            this.neverShow = false;
        },
        createLoader() {
            let dom = document.querySelector('.pull-loader');
            if(dom) {
                this.loaderDom = dom;
                dom.style.opacity = 0;
            }
            else {
                let div = document.createElement('div');
                div.className = 'pull-loader';
                let img = document.createElement('img')
                img.src = loader;
                div.appendChild(img);
                div.style.opacity = 0;
                this.scrollDom.appendChild(div);
                this.loaderDom = div;
            }
        },
        showLoader() {
            this.loaderStatus = true;
            this.loaderDom.classList.remove('hide');
            this.loaderDom.style.opacity = 1;
            return (neverShow) => {
                this.loaderStatus = false;
                this.neverShow = neverShow;
                setTimeout(() => {
                    this.loaderDom.style.opacity = 0;
                }, 500)
                
            }
            
        },
    },
    beforeDestroy() {
        this.initLoader();
        this.removeScrollListener();
        this.done && this.done();
        this.loaderDom && this.loaderDom.parentElement.removeChild(this.loaderDom);
    }
};

export default mixin;