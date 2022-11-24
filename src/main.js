import { createApp } from 'vue'
import { router } from './router'
import { createHead } from "@vueuse/head"
import App from './App.vue'
import Layout from './components/Layout/Layout.vue'

import 'bootstrap'
import './ace'
//const metaManager = createMetaManager();
const app = createApp(App);

app.component('Layout', Layout);
app.use(router).use(createHead());

router.isReady().then(() => app.mount('#app'));
