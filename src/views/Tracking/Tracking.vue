<template>
    <Layout>
        <img src="/眾點-網站版主視覺.png" alt="眾點-網站版主視覺" class="img-fluid">
        
        <div class="container py-5">
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
                        <label for="tracking-order">訂單編號</label>
                    </div>
                    <div class="col-sm-5">
                        <Field name="orderId" label="訂單編號" rules="required" class="form-control" id="tracking-order"></Field>
                        <ErrorMessage name="orderId" class="text-danger" as="div"></ErrorMessage>
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
                        <RouterLink :to="{name:'ForgotOrder'}"> 忘記訂單號碼 </RouterLink>
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
    import SearchFilter from '../../components/Layout/SearchFilter.vue';
    import { Field,ErrorMessage,Form } from 'vee-validate';
    import axios from 'axios';
    import Swal from 'sweetalert2';

    export default {
        name:'Tracking',
        components:{
            SearchFilter,
            Field,Form,ErrorMessage
        },
        methods:{
            onSubmit(values){
                const form = JSON.stringify(values,null,2);

                axios.post('/api/order/search',form,{
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(({data}) => {
                    sessionStorage.setItem("orderId",data);
                    this.$router.push({name:'Checkout',params: { code: `${values.code}` }});
                }).catch((error) => {
                    if (error.response.status == 404) {
                        Swal.fire({icon:'error',title:'找不到資料'});
                    }
                });
            }
        }
    }
</script>