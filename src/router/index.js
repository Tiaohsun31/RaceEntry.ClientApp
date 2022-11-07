import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout/Layout.vue'

import HelloWorld from "../components/HelloWorld.vue"

const routes = [
    { path: '/', component: HelloWorld },
]
  
export const router = createRouter({
    history: createWebHistory(),
    routes,
})