import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import Acts from '../views/Acts.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/acts', component: Acts}
]
  
export const router = createRouter({
    history: createWebHistory(),
    routes,
})