
import XXTable from './xxtable';
import XXTableColumn from './xxtable-column';
import {Table, TableColumn} from 'element-ui';
export default {
    install(Vue, options) {
        if(window.innerWidth <= 700) {
            Vue.component('XXTable', Table);
            Vue.component('XXTable-Column', TableColumn);
        }
        else {
            Vue.component('XXTable', XXTable);
            Vue.component('XXTable-Column', XXTableColumn);
        }
        // Vue.component('XXTable', XXTable);
        // Vue.component('XXTable-Column', XXTableColumn);
    }
}