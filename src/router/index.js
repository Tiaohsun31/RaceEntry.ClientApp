import { createRouter, createWebHistory } from 'vue-router'

import ActLayout from '../components/Layout/ActLayout.vue';

import Home from '../views/Home.vue';
import Acts from '../views/Acts.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/acts', component: Acts},
    {
        path: '/',
        component: ActLayout,
        children: [
            { 
                path: '/helloworld', component: HelloWorld 
            }
        ]
    },
]
  
export const router = createRouter({
    history: createWebHistory(),
    routes,
})