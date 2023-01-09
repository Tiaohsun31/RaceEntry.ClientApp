<template>
    <Layout>
        <div class="container">
            <div v-if="isExternal" class="pt-5 mb-3">
                <div class="alert bgc-red-l4 border-none border-l-4 brc-red-tp1 radius-0 text-dark-tp2">
                    <h4 class="text-danger-d1 text-130">您幾乎已完成註冊</h4>
                    請填寫個人資料，協助您快速報名
                </div>
            </div>
            <Form :initial-values="formValues" @submit="onSubmit">
                <div class="card acard">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="border-b-2 brc-yellow-d1 mb-4 pb-2 h4 text-dark"> 個人資料 </div>
                            <div v-if="isExternal" class="text-danger"> 綁定第三方登入有時效性問題，請盡快完成註冊 </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row pb-5">
                            <UserInfo v-if="formValues.user" :user="formValues.user" @update="updateInfo"></UserInfo>
                            <div class="col-12 mb-lg-4 mb-3">
                                <label for="inputPassword" class="col-form-label text-secondary">
                                    密碼／Password
                                    <small class="text-orange"> 可透過Email及密碼登入 </small>
                                </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fas fa-unlock-alt"></i> </div>
                                    </div>
                                    <Field name="user.password" label="密碼" rules="min:6" class="form-control"
                                        id="inputPassword" placeholder="至少6位數"></Field>
                                </div>
                                <ErrorMessage name="user.password" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <div class="col-12 mt-4 text-right">
                                <button type="submit" class="btn btn-primary btn-block"> 送出 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </Layout>

</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { Field, Form, ErrorMessage } from 'vee-validate';
import UserInfo from '../../components/Member/UserInfo.vue';

export default {
    name: 'Register',
    components: {
        Field, Form, ErrorMessage,
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
            isExternal: false,
            isLogined: false
        }
    },
    mounted() {
        axios.get('/api/account/isExternal').then(({ data }) => this.isExternal = data);
    },
    methods: {
        updateInfo(val) {
            this.formValues.user = val;
        },
        onSubmit(values) {
            const form = JSON.stringify(values.user, null, 2);
            axios.post('/api/account/register', form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                Swal.fire({ icon: 'success', title: '已完成註冊' }).then(() => this.$route.push({ name: 'Home' }));
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