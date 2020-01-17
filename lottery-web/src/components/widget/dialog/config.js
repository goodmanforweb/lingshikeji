import Vue from 'vue';
import InputPass from './inputPass';
import ReInputPass from './reinputPass';

let IP = Vue.extend(InputPass);
let ReIP = Vue.extend(ReInputPass);
let counter = 1000;
Vue.prototype.$Inputpass = (close, confirm) => {
    counter++;
    let IPInstance = new IP();
    IPInstance.closer = close;
    IPInstance.confirmr = confirm;
    let $el = IPInstance.$mount().$el;
    $el.setAttribute('id', counter);
    $el.style.zIndex = counter;
    document.body.appendChild(IPInstance.$mount().$el);
};

Vue.prototype.$ReInputpass = (close, confirm) => {
    counter++;
    let IPInstance = new ReIP();
    IPInstance.closer = close;
    IPInstance.confirmr = confirm;
    let $el = IPInstance.$mount().$el;
    $el.setAttribute('id', counter);
    $el.style.zIndex = counter;
    document.body.appendChild(IPInstance.$mount().$el);
};
