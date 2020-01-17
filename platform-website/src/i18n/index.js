import zh from './zh';
import en from './en';
import Vue from 'vue'
import VueI18n from 'vue-i18n';
import store from '../components/vuex';
Vue.use(VueI18n);

//语言

const messages = {
  zh,
  en,
};
const i18n = new VueI18n({
  locale: store.state.lang, // set locale
  messages, // set locale messages
});
export default i18n;