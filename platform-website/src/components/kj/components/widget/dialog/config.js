import Vue from 'vue';
import Dialog from './inputPass';

let IP = Vue.extend(Dialog);
let counter = 2000;
Vue.prototype.$dialog = (data, confirm, close) => {
    counter++;
    let IPInstance = new IP({
        data:{
            data
        }
    });
    IPInstance.closer = close;
    IPInstance.confirmr = confirm;
    let $el = IPInstance.$mount().$el;
    $el.setAttribute('id', counter);
    $el.style.zIndex = counter;
    document.body.appendChild(IPInstance.$mount().$el);
    return IPInstance;
};
