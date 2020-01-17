
export default {
    components: {},
    methods: {
        fetchHYLists(id) {
            const target = this.$store.state.typeTextLists[id];
            if(target) return Promise.resolve(target);
            return request.getHYLists({params: {id}})
            .then(res => {
                this.$store.commit('givenTypeTextLists',{[id]: res.data.list})
                return res.data.list
            })
        },
        //decide bn or fws
        decideXM(id) {
            const target = this.$store.state.typeTextDetail[id];
            if(target) return Promise.resolve(target);
            return request.getHubDetail({},{id})
            .then(res => {
                const t = {
                    'I类合约':'fws',
                    'II类合约':'bs',
                }[res.data.class_name];
                this.$store.commit('givenTypeTextDetail',{[id]:t});
                return t
            })
            .catch(err => {
                return false;
            })
        },
        async textsHandler(lists, key) {
            for(const list of lists) {
                let t = await this.textHandler(list.description);
                console.log(t,89);
                list[key] = t;
            }
        },
        textHandler(str) {
            if(str.indexOf('#') == -1) return Promise.resolve({})
            const arr = str.split('#');
            const hyid = arr[1], cat = arr[2], xmid = arr[0];
            return this.fetchHYLists(xmid)
                    .then(lists => lists.find(list => list.id == hyid))
                    .then(target => {
                        return this.decideXM(xmid)
                        .then(xmtype => this.typeTextHandler({target, xmtype, cat}))
                    })
        },
        typeTextHandler({target, xmtype, cat}) {
            const t = {
                service:  () => {
                    const t = target.metadata;
                    return {
                        zh: t.name,
                        en: t.name_en
                    }
                },
                buy: () => {
                    return {
                        bs: {
                            zh: '购买KEY',
                            en: 'Purchase Key'
                        },
                        // bn: {
                        //     zh: '购买KEY',
                        //     en: 'Purchase Key'
                        // },
                        fws: {
                            zh: '购买能量',
                            en: 'Purchase Power'
                        }
                    }[xmtype]
                },
            }[cat]();

            return t || {}
        }
    }
}