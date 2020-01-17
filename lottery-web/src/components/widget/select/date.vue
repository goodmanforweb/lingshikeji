<template>
    <div class="cdate cselect" 
     @mouseenter="show"
     @mouseleave="close"
     >
        <span class='cdate-val'>{{date}}</span>
        <i class="cdate-arrow"></i>
        <List ref='list'></List>
    </div>
</template>

<script>
import List from './list';
import Vue from 'vue';
export default {
    data() {
        return {
            listState: false,
            date:11.2018
            
        }
    },
    components: {
        List
    },
    mounted() {
        this.$refs.list.$on('change', data => {
            this.date = `${data.month}.${data.year}`
        })
    },
    methods: {
        getTop() {
            return this.$el.clientHeight;
        },
        // getPosition() {  
        //     this.width = this.$refs.cdate.clientWidth;
        //     this.height = this.$refs.cdate.clientHeight;
        //     let {top, left} = this.$refs.cdate.getBoundingClientRect();
        //     this.top = top;
        //     this.left = left;
        // },
        // createList() {
        //     let list = Vue.extend(List);
        //     this.listInstance = new list({
        //         data: {
        //             top: this.top + this.height,
        //             left: this.left,
        //             width: this.width,
        //         }
        //     });
        // },
        show() {
            this.$refs.list.top = this.getTop();
            this.$refs.list.show = true;
            // if(!this.listInstance) {
            //     this.createList();
            //     document.body.appendChild(this.listInstance.$mount().$el);
            //     this.setCloseListener();
            // }
        },
        close() {
            this.$refs.list.show = false;

        },
        // setCloseListener() {
        //     this.closeEventDebouce =  e => {
        //         if(this.ticker) clearTimeout(this.ticker);
        //         this.ticker = setTimeout(() => {
        //             this.closeEventHanlder(e);
        //         }, 100);
        //     };
        //     document.body.addEventListener('click',this.closeEventDebouce, false)
        // },
        // closeEventHanlder(e) {
        //     let target = e.target;
        //         let isInTarget = false;
        //         do {
        //             if(target == this.$el || target == this.listInstance.$el) {
        //                 isInTarget = true;
        //                 return false;
        //             }
        //         } while(target = target.parentElement)

        //         if(!isInTarget) {
        //             this.close();
        //         }
        // },
        // close() {
        //     this.listInstance.$destroy();
        //     this.listInstance = undefined;
        //     document.body.removeEventListener('click',this.closeEventDebouce, false)

        // }
    }
}
</script>


<style lang="scss">
.cdate {
    position: relative;
    padding: 0 26px;
    cursor: pointer;
}
.cdate-arrow {
    vertical-align: bottom;
    display: inline-block;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: #B8B1A0
}
</style>


