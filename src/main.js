import { createApp } from 'vue'
import { router } from './router'
import { store }  from './store/main.js'
import { createHead } from "@vueuse/head"

import App from './App.vue'
import Layout from './components/Layout/Layout.vue'

// vee-validate
import {  defineRule ,configure  } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW');

import 'bootstrap'
import './ace'

const app = createApp(App);

app.component('Layout', Layout);
app.use(store).use(router).use(createHead());

router.isReady().then(() => app.mount('#app'));
