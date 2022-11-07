import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import $ from 'jquery';
window.$ = $;
import 'bootstrap'
import './ace.js'
import './site.js'

createApp(App).use(router).mount('#app')
