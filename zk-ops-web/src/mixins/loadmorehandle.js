let loadmore = {
    data() {
        return {
            fetchMoreLoader: false
        }
    },
    created() {
        this.siz = Math.ceil(window.innerHeight / 47);
        // this.siz = 4;
        //    this.reset(); 
    },
    methods: {
        reset() {
            this.lists = [];
            this.page = 0;
            this.total = null;
            this.hasTotal = false;
            this.finish = false;
            this.fetchMoreLoader = false;
        },
        toFetch() {
            this.$isMobile ? this.mobileFetch(() => { }) : this.pagerChange('next');
        },
        fetchCheck(next, fetchMoreFunc) {
            if (this.fetchMoreLoader || this.finish || (this.hasTotal && this.page * this.siz >= this.total)) {
                next();
                return Promise.resolve(false);
            }
            this.page++;
            this.fetchMoreLoader = true;
            return fetchMoreFunc().finally(() => {
                this.fetchMoreLoader = false;
                next();
            })
        },
        pcFetchCheck(next, fetchMoreFunc) {
            this.fetchMoreLoader = true;
            return fetchMoreFunc().finally(() => {
                this.fetchMoreLoader = false;
                next();
            })
        },
        pagerChange(type) {
            if(this.fetchMoreLoader)return 
            if(!this.hasTotal) {
                this.page++;
                this.pcFetch()
                return 
            }
            let page = this.page;
            let totalPage = Math.ceil(this.total/this.siz);
            if (type == 'prev') {
                if (--page >= 1) {
                    this.page--;
                    this.pcFetch()
                }
            }
            else if (type == 'next') {
                if (++page <= totalPage) {
                    this.page++;
                    this.pcFetch()
                }
            }
        },
        pcFetch() {
            this.pcFetchCheck(() => { }, this.getLists).then(data => {
                if (data) {
                    this.lists = data;
                }
            })
        },
        mobileFetch(next) {
            this.fetchCheck(next, this.getLists).then(data => {
                if (data) {
                    this.lists = this.lists.concat(data);
                }
            })
        },
        emptyCheck(data, key='list') {
            this.hasTotal = true;
            this.total = data.count ? Number(data.count) : null;
            if (!Array.isArray(data[key]) || util.isEmpty(data)) {
                this.finish = true;
                return false;
            }
            return true;
        },
        freshListsData() {
            this.page--;
            this.toFetch();
        }
    }
}

export default loadmore;