<template>
    <Layout>
        <img src="/service/computer2.png" alt="眾點-網站版主視覺" class="img-fluid" />

        <div class="container my-5">
            <Form @submit="onSubmit">
                <div class="form-group row">
                    <div class="col-sm-3 col-form-label text-sm-right pr-0">
                        <label for="tracking-act">活動場次</label>
                    </div>
                    <div class="col-sm-5">
                        <Field name="code" label="活動場次" rules="required" v-slot="{field}" id="tracking-act">
                            <SearchFilter v-bind="field" position="Search"></SearchFilter>
                        </Field>
                        <ErrorMessage name="code" class="text-danger"></ErrorMessage>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-3 col-form-label text-sm-right pr-0">
                        <label for="tracking-email">Email</label>
                    </div>
                    <div class="col-sm-5">
                        <Field name="email" label="Email" rules="required|email" class="form-control" id="tracking-email"></Field>
                        <ErrorMessage name="email" class="text-danger" as="div"></ErrorMessage>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-3 col-form-label text-sm-right pr-0">
                        <label for="tracking-phoneNumber">手機號碼</label>
                    </div>
                    <div class="col-sm-5">
                        <Field name="phoneNumber" label="手機號碼" rules="required" class="form-control" id="tracking-phoneNumber"></Field>
                        <ErrorMessage name="phoneNumber" class="text-danger" as="div"></ErrorMessage>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-5">
                        <button type="submit" class="btn btn-primary btn-block px-4 btn-bold mt-2 mb-4">
                            查詢
                        </button>
                    </div>
                </div>
            </Form>
        </div>
        
    </Layout>
</template>

<script lang="js">
    import SearchFilter from '@/components/Layout/SearchFilter.vue';
    import { Field,ErrorMessage,Form } from 'vee-validate';
    import axios from 'axios';
    import Swal from 'sweetalert2';

    export default {
        name:'ForgotOrder',
        components:{
            SearchFilter,
            Field,Form,ErrorMessage
        },
        methods:{
            onSubmit(values){
                const form = JSON.stringify(values,null,2);

                axios.post('/api/order/forgotOrder',form,{
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(({data}) => {
                    if (data) {
                        Swal.fire({icon:'success',title:'已寄送至領隊(訂購人Email)'})
                    } else {
                        Swal.fire({icon:'error',title:'找不到訂單或訊息寄送失敗，如需協助，請聯繫客服人員'})
                    }
                });
            }
        }
    }
</script>