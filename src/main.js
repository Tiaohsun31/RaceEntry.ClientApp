import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import Layout from './components/Layout/Layout.vue'

import $ from 'jquery';
window.$ = $;
import 'bootstrap'
import './ace.js'
import './site.js'

const app = createApp(App);
app.component('Layout', Layout).use(router).mount('#app');
