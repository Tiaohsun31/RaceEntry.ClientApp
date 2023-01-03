<template>
    <Layout>
        <div class="main-content minh-100 justify-content-center">
            <div class="row">
                <div class="col-12 col-xl-6 offset-xl-3 radius-1 overflow-hidden">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title text-125">
                                綁定帳號
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="text-center text-120">
                                請輸入 <span class="text-danger">Email</span> 及 <span class="text-danger">身分證號碼/護照編號 </span>
                                協助資料綁定
                            </div>
                            <Form @submit="onSubmit" autocomplete="off" class="form-row mt-4 px-3">
                                <div class="form-group col-12">
                                    <div class="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                        <Field name="email" type="email" label="Email" rules="required|email|max:200"
                                            class="form-control form-control-lg pr-4 shadow-none" placeholder="Email"></Field>
                                        <i class="fa fa-user text-grey-m2 ml-n4"></i>
                                        <label class="floating-label text-grey-l1 ml-n3"> Email </label>
                                    </div>
                                    <ErrorMessage name="email" class="text-danger" as="div"></ErrorMessage>
                                </div>
                                <div class="form-group col-12">
                                    <div class="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                        <Field name="rocid" type="text" label="身分證號碼/護照編號" placeholder="身分證號碼/護照編號" rules="required|max:10"
                                            class="form-control form-control-lg pr-4 shadow-none"></Field>
                                        <i class="fa fa-key text-grey-m2 ml-n4"></i>
                                        <label class="floating-label text-grey-l1 ml-n3"> 身分證號碼/護照編號 </label>
                                    </div>
                                    <ErrorMessage name="rocid" class="text-danger" as="div"></ErrorMessage>
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
    </Layout>
</template>

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
export default {
    name: 'BindExteranlLogin',
    components: {
        Field, Form, ErrorMessage
    },
    data(){
        return {
            email:'',
            rocid:''
        }
    },
    computed:{
        returnUrl(){
            return decodeURI(this.$route.query.returnUrl);
        }
    },
    methods:{
        onSubmit(values) {
            const form = JSON.stringify(values, null, 2);
            axios.post(`/api/externalLogin/bind`, form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                if (this.returnUrl) {
                    window.location.href = this.returnUrl;
                } else {
                    this.$router.push({ name: 'Home' });
                }
            }).catch(error => {
                if (error.response.status === 404) {
                    this.$router.push({ name: 'Register' });
                }
            })
        }
    }
}

</script>