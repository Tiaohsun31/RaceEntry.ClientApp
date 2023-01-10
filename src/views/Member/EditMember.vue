<template>
    <Layout>
        <div class="container py-5">
            <RouterLink :to="{name:'MemberIndex'}" class="btn btn-bgc-white btn-outline-default px-35 btn-text-slide-x mb-3">
                <i class="btn-text-2 fa fa-arrow-left text-110 align-text-bottom mr-2"></i>
                回 會員專區
            </RouterLink>
            <Form :initial-values="formValues" @submit="onSubmit">
                <div class="border-b-2 brc-yellow-d1 my-3 pb-1 h4"> 個人資料 </div>
                <div class="row">
                    <UserInfo v-if="formValues.user" :user="formValues.user" @update="updateInfo"></UserInfo>
                    <div class="col-12 mt-4 text-right">
                        <button type="submit" class="btn btn-primary btn-block"> 送出 </button>
                    </div>
                </div>
            </Form>
        </div>
    </Layout>
</template>
<script lang="js">

import axios from 'axios';
import Swal from 'sweetalert2';
import { Form } from 'vee-validate';
import UserInfo from '../../components/Member/UserInfo.vue';

export default {
    name: 'EditMember',
    components: {
        Form,
        UserInfo
    },
    data() {
        return {
            formValues: {
                user: {
                    nationality: '台灣',
                    gender: '',
                    zipcode: '',
                    county: '',
                    district: ''
                },
            },
        }
    },
    created() {
        axios.get('/api/account/user').then(({ data }) => this.formValues.user = data);
    },
    methods: {
        updateInfo(val) {
            this.formValues.user = val;
        },
        onSubmit(values) {
            const form = JSON.stringify(values.user, null, 2);

            axios.put('/api/account/edit', form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                Swal.fire({ icon: 'success', title: '已完成修改' });
            }).catch(error => {
                if (error.response.status === 400) {
                    Swal.fire({ icon: 'error', title: `${error.response.data.title}` });
                }
                if (error.response.status === 404) {
                    this.$router.push({ name: 'NotFound' });
                }
            })
        }
    }
}
</script>