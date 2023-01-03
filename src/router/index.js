import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../components/Layout/Layout.vue';
import ActLayout from '../views/ActPage/ActLayout.vue';
import ComingSoon from '../views/ActPage/ComingSoon.vue';
import ActContent from '../views/ActPage/ActContent.vue';
import HomePage from '../views/ActPage/HomePage.vue';

import Personal from '../views/Entry/Personal.vue';
import CreateGroup from '../views/Entry/CreateGroup.vue';
import Group from '../views/Entry/Group.vue';
import UploadFile from '../views/Entry/uploadFile.vue';
import Checkout from '../views/Entry/Checkout.vue';
import Refund from '../views/Entry/Refund.vue';

import Home from '../views/Home.vue';
import Acts from '../views/Acts.vue';

import ChangePassword from '../views/Login/ChangePassword.vue';
import BindExternalLogin from '../views/Login/BindExternalLogin.vue';
import Register from '../views/Login/Register.vue';

import NotFound from '../components/Layout/NotFound.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
    { name: 'Home', path: '/', component: Home },
    { name: 'Acts', path: '/acts', component: Acts },
    {
        path: '/entry',
        component: ActLayout,
        children: [
            { name: 'CreatePersonal', path: '/:code/personal', component: Personal, props: { operate: 'create' } },
            { name: 'EditPersonal', path: '/:code/personal/:userId', component: Personal, props: { operate: 'edit' } },
            { name: 'CreateGroup', path: '/:code/group/create', component: CreateGroup },
            { name: 'Group', path: '/:code/group', component: Group },
            { name: 'AddMember', path: '/:code/addMember', component: Personal, props: { operate: 'create' } },
            { name: 'UploadFile', path: '/:code/uploadFile', component: UploadFile },
            { name: 'Checkout', path: '/:code/checkout', component: Checkout },
            { name: 'Refund', path: '/:code/refund', component:Refund}
        ]
    },
    { name: 'ChangePassword', path: '/changePassword', component: ChangePassword },
    { name: 'BindExternalLogin' ,path: '/BindExternalLogin', component: BindExternalLogin },
    { name: 'Register', path: '/Register', component: Register },
    {
        path: '/:code',
        component: ActLayout,
        children: [
            { name: 'HomePage', path: '', component: HomePage },
            { name: 'ActContent', path: ':id(\\d+)', component: ActContent },
        ]
    },

    //{ name:'HomePage', path: '/Activities/:code', component:HomePage },
    // { name:'Activities', path: '/Activities/:code/:id', component: ActLayout },
    { name: 'ComingSoon', path: '/ComingSoon/:code', component: ComingSoon },
    { name: 'NotFound', path: '/:pathMatch(.*)*', component: NotFound }
]

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: "exact-active",
    routes,
})