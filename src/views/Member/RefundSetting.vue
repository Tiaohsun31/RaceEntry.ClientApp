<template>
    <Layout>
        <div class="container my-5">
            <RouterLink :to="{name:'MemberIndex'}" class="btn btn-bgc-white btn-outline-default px-35 btn-text-slide-x mb-3">
                <i class="btn-text-2 fa fa-arrow-left text-110 align-text-bottom mr-2"></i>
                回 會員專區
            </RouterLink>
            <div class="border-b-2 brc-yellow-d1 my-3 pb-1 h4"> 退款帳戶設定 </div>
            <Form @submit="onSubmit">
                <div class="row">
                    <RefundForm></RefundForm>
                    <div class="col-12 mt-2 mb-4">
                        <button type="submit" class="btn btn-primary btn-block btn-lg"> 送出 </button>
                    </div>
                </div>
            </Form>
        </div>
    </Layout>
</template>

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import Swal from 'sweetalert2';
import RefundForm from '@/components/Member/RefundForm.vue';
export default {
    name: 'RefundSetting',
    components:{
        Field, Form, ErrorMessage,
        RefundForm
    },
    methods: {
        onSubmit(values) {
            const form = JSON.stringify(values, null, 2);
            axios.patch('/api/refund', form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => Swal.fire({ icon: 'success', title: '設置成功' }))
            .catch(error => {
                if (error.response.status === 404) {
                    this.$router.push({ name: 'NotFound' });
                }
            });
        }
    }
}
</script>