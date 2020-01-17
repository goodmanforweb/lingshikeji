
<script>
export default {
    props: {
        header: {
            type: Array,
            default: []
        },
        row: {
            type: Object,
            default: {}
        },
        index:'',
        all: ''

    },
    created() {
        // let tt = this.$parent.$slots.default.filter(slot => slot.tag);
    },
    computed: {
        rslots: {
            get: function() {
                let rslots = this.$parent.$slots.default.filter(slot => slot.tag);

                return rslots.map((slot, index) => {
                    let scopeslot = null;
                    scopeslot = slot.data.scopedSlots ? slot.data.scopedSlots.default : null;
                    if(scopeslot) {
                        return () => scopeslot({cell: this.row[this.header[index].prop], row: this.row, all: this.all});
                    }
                    else {
                        return () => this.row[this.header[index].prop];
                    }
                })
            },
            set: function() {

            }
        },
        table() {
            return this.$parent;
        }
    },
    render(h) {
        return h(
            'div',
            {
                'class': "re-table-hd-row flex block vc",
            },
            this.header.map((head,index) => {
                return h(
                        'div',
                        {
                            'class': {
                                center: 1,
                                flex1: !(head.width || head.minWidth),
                                // towrap: (head.width || head.minWidth)
                                towrap: 1
                            },
                            style: {
                                width: head.width, 
                                minWidth: head.minWidth
                            }
                        },
                        [this.rslots[index]()]
                    )
            })
        )
    } 
}
</script>
