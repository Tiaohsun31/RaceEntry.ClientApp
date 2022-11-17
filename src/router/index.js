import { createRouter, createWebHistory } from 'vue-router'

import ActLayout from '../components/Layout/ActLayout.vue';
import ActContent from '../components/Layout/ActContent.vue';

import Home from '../views/Home.vue';
import Acts from '../views/Acts.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
    { path: '/', component: Home },
    { name: 'Acts', path: '/acts', component: Acts },
    // {
    //     path: '/',
    //     component: ActLayout,
    //     children: [
    //         { 
    //            name:'Activities', path: '/Activities/:code', component: ActContent 
    //         }
    //     ]
    // },
    {
        name:'Activities', path: '/Activities/:code', component: ActLayout 
    }
]
  
export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: "exact-active",
    routes,
})