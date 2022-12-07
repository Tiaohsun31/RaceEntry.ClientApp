<template>
    <Layout>
        <div class="py-5 container bgc-white">
            <div class="main-content minh-100 justify-content-center">
                <div class="p-2 p-md-4">
                    <div class="row" id="row-1">
                        <div class="col-12 col-xl-10 offset-xl-1 bgc-white radius-1 overflow-hidden">

                            <div v-if="email" class="alert bgc-red-l4 border-none border-l-4 brc-red-tp1 radius-0 text-dark-tp2 mb-md-5 mb-3">
                                臨時密碼已寄送至註冊信箱
                            </div>

                            <div class="card">
                                <div class="card-header">
                                    <div class="card-title text-125"> 變更密碼 </div>
                                </div>
                                <div class="card-body">
                                    <Form @submit="onSubmit" autocomplete="off" class="form-row mt-4 px-3">
                                        <div class="form-group col-12">
                                            <div class="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                                <Field name="email" label="Email" rules="required|email" v-model="email"
                                                    placeholder="Email" type="email" class="form-control form-control-lg pr-4 shadow-none">
                                                </Field>
                                                <i class="fa fa-user text-grey-m2 ml-n4"></i>
                                                <label class="floating-label text-grey-l1 ml-n3"> Email </label>
                                            </div>
                                            <ErrorMessage name="email" class="text-danger pt-1" as="div"></ErrorMessage>
                                        </div>
                                    
                                        <div class="form-group col-12">
                                            <div class="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                                <Field name="oldPassword" label="原密碼/臨時密碼" rules="required" placeholder="原密碼"
                                                    type="text" class="form-control form-control-lg pr-4 shadow-none">
                                                </Field>
                                                <i class="fa fa-key text-grey-m2 ml-n4"></i>
                                                <label class="floating-label text-grey-l1 ml-n3"> 原密碼/臨時密碼 </label>
                                            </div>
                                            <ErrorMessage name="oldPassword" class="text-danger pt-1" as="div"></ErrorMessage>
                                        </div>
                                    
                                        <div class="form-group col-12">
                                            <div class="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                                <Field name="password" label="新密碼" rules="required|min:6" type="password"
                                                    placeholder="新密碼" class="form-control form-control-lg pr-4 shadow-none">
                                                </Field>
                                                <i class="fa fa-key text-grey-m2 ml-n4"></i>
                                                <label class="floating-label text-grey-l1 ml-n3"> 新密碼 </label>
                                            </div>
                                            <ErrorMessage name="password" class="text-danger pt-1" as="div"></ErrorMessage>
                                        </div>
                                        <div class="form-group col-12">
                                            <div class="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                                <Field name="confirmPassword" label="確認密碼" rules="confirmed:@password" placeholder="確認密碼" type="password"
                                                    class="form-control form-control-lg pr-4 shadow-none">
                                                </Field>
                                                <i class="fa fa-key text-grey-m2 ml-n4"></i>
                                                <label class="floating-label text-grey-l1 ml-n3"> 確認密碼 </label>
                                            </div>
                                            <ErrorMessage name="confirmPassword" class="text-danger pt-1" as="div"></ErrorMessage>
                                        </div>
                                    
                                        <div class="form-group col-12">
                                            <button type="submit" class="btn btn-primary btn-block px-4 btn-bold mt-2 mb-2">
                                                送出
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </Layout>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
    name: 'ChangePassword',
    components:{
        Form,Field,ErrorMessage
    },
    computed:{
        email(){
            let email = this.$route.query.email;
            return email ? decodeURIComponent(email) : '';
        }
    },
    methods:{
        onSubmit(values,{ resetForm }){
            axios.post('/api/account/changePassword', JSON.stringify(values, null, 2), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(({ status }) => {
                if (status === 200) {
                    Swal.fire({ icon: 'success', title: '密碼已修改，請利用新密碼登入' }).then(() => {
                        resetForm();
                    });
                }
            }).catch(error => {
                if (error.response.status === 404) {
                    Swal.fire({ icon: 'error', title: '找不到會員' });
                }
            });
        }
    }
}
</script>