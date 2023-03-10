import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '../store/index'

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

import Tracking from '@/views/Tracking/Tracking.vue';
import ForgotOrder from '@/views/Tracking/ForgotOrder.vue';

import Design from '@/views/Service/Design.vue';
import Timing from '@/views/Service/Timing.vue';
import Instruction from '@/views/Service/Instruction.vue';

import ChangePassword from '../views/Login/ChangePassword.vue';
import BindExternalLogin from '../views/Login/BindExternalLogin.vue';
import Register from '../views/Login/Register.vue';

import Member from '../views/Member/Index.vue';
import History from '../views/History/Index.vue';
import EditMember from '../views/Member/EditMember.vue';
import BindOtherLogin from '../views/Member/BindOtherLogin.vue';
import RefundSetting from '../views/Member/RefundSetting.vue';

import Leader from '../views/Team/Leader.vue';
import TeammateForm from '../views/Team/TeammateForm.vue';
import Teammate from '../views/Team/Teammate.vue';

import NotFound from '../components/Layout/NotFound.vue';

const routes = [
    { name: 'Home', path: '/', component: Home, meta: { requiresAuth: false } },
    { name: 'Acts', path: '/acts', component: Acts, meta: { requiresAuth: false } },
    { name: 'Tracking', path: '/tracking', component: Tracking, meta: { requiresAuth: false } },
    { name: 'ForgotOrder', path: '/tracking/forgotOrder', component: ForgotOrder, meta: { requiresAuth: false } },
    { name: 'Design', path: '/service/design', component: Design, meta: { requiresAuth: false } },
    { name: 'Timing', path: '/service/timing', component: Timing, meta: { requiresAuth: false } },
    { name: 'Instruction', path: '/service/instruction', component: Instruction, meta: { requiresAuth: false } },
    {
        path: '/entry',
        component: ActLayout,
        meta: { requiresAuth: false },
        children: [
            { name: 'CreatePersonal', path: '/:code/personal', component: Personal, props: { operate: 'create' } },
            { name: 'EditPersonal', path: '/:code/personal/:userId', component: Personal, props: { operate: 'edit' } },
            { name: 'CreateGroup', path: '/:code/group/create', component: CreateGroup },
            { name: 'Group', path: '/:code/group', component: Group },
            { name: 'AddMember', path: '/:code/addMember', component: Personal, props: { operate: 'create' } },
            { name: 'UploadFile', path: '/:code/uploadFile', component: UploadFile },
            { name: 'Checkout', path: '/:code/checkout', component: Checkout },
            { name: 'Refund', path: '/:code/refund', component: Refund }
        ]
    },
    { name: 'ChangePassword', path: '/changePassword', component: ChangePassword, meta: { requiresAuth: false } },
    { name: 'BindExternalLogin', path: '/bindExternalLogin', component: BindExternalLogin, meta: { requiresAuth: false } },
    { name: 'Register', path: '/register', component: Register, meta: { requiresAuth: false } },
    {
        name: 'Member',
        path: '/member',
        meta: { requiresAuth: true },
        children: [
            { name: 'MemberIndex', path: '', component: Member },
            { name: 'EditMember', path: 'edit', component: EditMember },
            { name: 'BindOtherLogin', path: 'bindOtherLogin', component: BindOtherLogin },
            { name: 'RefundSetting', path: 'refundSetting', component: RefundSetting }
        ]
    },
    {
        name: 'Team',
        path: '/team',
        meta: { requiresAuth: true },
        children: [
            { name: 'Leader', path: '', component: Leader },
            { name: 'EditTeammate', path: 'editTeammate', component: TeammateForm }
        ]
    },
    { name: 'AddTeammate', path: '/team/addTeammate/:joinCode?', component: TeammateForm, props: { operate: 'addTeammate' } },
    { name: 'Teammate', path: '/team/teammate', component: Teammate },
    { name: 'History', path: '/history', component: History, meta: { requiresAuth: true } },
    {
        path: '/:code',
        component: ActLayout,
        children: [
            { name: 'HomePage', path: '', component: HomePage },
            { name: 'ActContent', path: ':id(\\d+)', component: ActContent },
        ]
    },
    { name: 'ComingSoon', path: '/ComingSoon/:code', component: ComingSoon, },
    { name: 'NotFound', path: '/:pathMatch(.*)*', component: NotFound, }
]

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: "exact-active",
    routes,
});

router.beforeEach((to) => {
    const store = useStore();
    if (to.meta.requiresAuth && !store.isAuthenticated) return '/'
})

export { router };