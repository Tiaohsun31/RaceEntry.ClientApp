<template>
    <Layout>
        <div class="container my-5">
            <Form :initial-values="formValues" @submit="onSubmit">
                <div class="card acard">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="border-b-2 brc-yellow-d1 mb-4 pb-2 h4 text-dark"> 個人資料 </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row pb-5">
                            <UserInfo v-if="formValues.user" :user="formValues.user" @update="updateInfo"></UserInfo>
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
import { Field, Form, ErrorMessage } from 'vee-validate';
import UserInfo from '@/components/Member/UserInfo.vue';
export default {
    name: 'Teammate',
    components: {
        Field, Form, ErrorMessage,
        UserInfo
    },
    data() {
        return {
            formValues: {
                user: {
                    nationality: '台灣',
                },
            },
        }
    },
    methods: {
        updateInfo(val) {
            this.formValues.user = val;
        },
        onSubmit(values) {
            const form = JSON.stringify(values.user, null, 2);
            console.log(form);
            return;
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