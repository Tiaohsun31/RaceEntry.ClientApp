import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import Layout from './components/Layout/Layout.vue'


const app = createApp(App);

app.component('Layout', Layout).use(router).mount('#app');
