import Vue from 'vue';
import Dialog from './inputPass';
import tl from './tl';
import yxkj from './yxkj';
import fire from './fire';


import energy from './energy';
import store from 'store';
import i18n from 'i18n';

console.log(store, i18n);
let IP = Vue.extend(Dialog);
let tlx = Vue.extend(tl);
let yxkjx = Vue.extend(yxkj);
let energyX = Vue.extend(energy);
let firex = Vue.extend(fire);
let counter = 1000;
const cf =  (Vue) => {
    Vue.prototype.$dialog = (data, confirm, close) => {
    counter++;
    let IPInstance = new IP({
        data:{
            data
        }
    });
    // IPInstance.store = store;
    // IPInstance.i18n = i18n;

    IPInstance.closer = close;
    IPInstance.confirmr = confirm;
    let $el = IPInstance.$mount().$el;
    $el.setAttribute('id', counter);
    $el.style.zIndex = counter;
    document.body.appendChild($el);
    return IPInstance;
};
Vue.prototype.$tl = (data, confirm, close) => {
    counter++;
    let IPInstance = new tlx({
        data:{
            data
        }
    });
    // IPInstance.store = store;
    // IPInstance.i18n = i18n;
    IPInstance.closer = close;
    IPInstance.confirmr = confirm;
    let $el = IPInstance.$mount().$el;
    $el.setAttribute('id', counter);
    $el.style.zIndex = counter;
    document.body.appendChild($el);
    return IPInstance;
};
Vue.prototype.$yxkj = (data, confirm, close) => {
    counter++;
    let IPInstance = new yxkjx({
        data:data
    });
    // IPInstance.store = store;
    // IPInstance.i18n = i18n;

    IPInstance.closer = close;
    IPInstance.confirmr = confirm;
    let $el = IPInstance.$mount().$el;
    $el.setAttribute('id', counter);
    $el.style.zIndex = counter;
    document.body.appendChild($el);
    return IPInstance;
};
Vue.prototype.$energy = (data, confirm, close) => {
    counter++;
    let IPInstance = new energyX({
        data:data
    });
    // IPInstance.store = store;
    // IPInstance.i18n = i18n;

    IPInstance.closer = close;
    IPInstance.confirmr = confirm;
    let $el = IPInstance.$mount().$el;
    $el.setAttribute('id', counter);
    $el.style.zIndex = counter;
    document.body.appendChild($el);
    return IPInstance;
};
Vue.prototype.$fire = (data, confirm, close) => {
    counter++;
    let IPInstance = new firex({
        data:data
    });
    // IPInstance.store = store;
    // IPInstance.i18n = i18n;

    IPInstance.closer = close;
    IPInstance.confirmr = confirm;
    let $el = IPInstance.$mount().$el;
    $el.setAttribute('id', counter);
    $el.style.zIndex = counter;
    document.body.appendChild($el);
    return IPInstance;
};

};

export default {
    install: Vue => cf(Vue)
}

