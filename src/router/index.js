import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../components/Layout/Layout.vue';
import ActLayout from '../views/ActPage/ActLayout.vue';
import ComingSoon from '../views/ActPage/ComingSoon.vue';
import ActContent from '../views/ActPage/ActContent.vue';
import HomePage from '../views/ActPage/HomePage.vue';

import Home from '../views/Home.vue';
import Acts from '../views/Acts.vue';
import NotFound from '../components/Layout/NotFound.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
    { path: '/', component: Home },
    { name: 'Acts', path: '/acts', component: Acts },
    {
        path: '/:code',
        component: ActLayout,
        children: [
            { name:'HomePage', path: '', component:HomePage },
            { name:'ActContent', path: ':id(\\d+)', component:ActContent },
        ]
    },

    //{ name:'HomePage', path: '/Activities/:code', component:HomePage },
    // { name:'Activities', path: '/Activities/:code/:id', component: ActLayout },
    { name:'ComingSoon', path: '/ComingSoon/:code', component:ComingSoon },
    { name:'NotFound', path:'/:pathMatch(.*)*', component:NotFound }
]
  
export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: "exact-active",
    routes,
})