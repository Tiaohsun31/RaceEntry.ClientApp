<template>
    <Layout>
        <div class="container my-5">
            <button @click="hasHistory ? $router.go(-1) : $router.push('/')"
                class="btn btn-bgc-white btn-outline-default px-35 btn-text-slide-x mb-3">
                <i class="btn-text-2 fa fa-arrow-left text-110 align-text-bottom mr-2"></i>
                回 上一頁
            </button>
            <Form :initial-values="formValues" @submit="onSubmit">
                <div v-if="$route.name === 'AddTeammate'">
                    <div class="border-b-2 brc-yellow-d1 mb-3 pb-1 h4">
                        邀請碼
                    </div>
                    <div class="mb-4">
                        <label for="inputJoinCode" class="text-secondary">
                            <i class="fas fa-star text-danger ml-1"></i> 邀請碼／Invitation Code
                        </label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="fas fa-ticket-alt"></i></div>
                            </div>
                            <Field name="joinCode" v-model="formValues.joinCode" :rules="isCorrect" v-slot="{ field, handleChange }">
                                <input @change="handleChange" :value="field.value" id="inputJoinCode" class="form-control" />
                            </Field>
                        </div>
                        <ErrorMessage name="joinCode" class="text-danger" as="div"></ErrorMessage>
                    </div>
                </div>
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
<script lang="js">
import { Field, Form, ErrorMessage } from 'vee-validate';
import UserInfo from '@/components/Member/UserInfo.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

import { storeToRefs } from 'pinia'
import { useStore } from '@/store/index';
import { useTeamStore } from '@/store/team';

export default {
    name: 'TeammateForm',
    props:['operate','user'],
    components: {
        Field, Form, ErrorMessage,
        UserInfo
    },
    setup() {
        const store = useStore();
        const { isAuthenticated } = storeToRefs(store);

        const teamStore = useTeamStore();
        const { teamId, userInfoId } = storeToRefs(teamStore);
        return { isAuthenticated,teamId,userInfoId };
    },
    data() {
        return {
            formValues: {
                user: {
                    nationality: '台灣',
                },
                joinCode:this.$route.params.joinCode,
            },
        }
    },
    created(){
        if (this.$route.name === 'AddTeammate' && this.isAuthenticated) {
            axios.get('/api/account/user').then(({data}) => this.formValues.user = data);
        };
        if (this.$route.name === 'EditTeammate') {
            if (this.teamId == '' || this.userInfoId == '') {
                this.$router.push({name:'AddTeammate'});
            };
            axios.get('/api/teammate', { params:{
                teamId:this.teamId,
                userInfoId:this.userInfoId
            }}).then(({data}) => this.formValues.user = data)
            .catch(error => {
                if (error.response.status === 404) {
                    this.$router.push({name:'AddTeammate'});
                }
            })
        }
    },
    computed:{
        hasHistory () { 
            return window.history.length > 2 
        },
    },
    methods: {
        updateInfo(val) {
            this.formValues.user = val;
        },
        onSubmit(values) {
            
            const form = JSON.stringify(values, null, 2);
            let title = '已申請加入隊伍';
            let config = {
                url:'/api/teammate',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            if (this.$route.name === 'AddTeammate') {
                config.method = 'post';
                config.data = form;
            };
            if (this.$route.name === 'EditTeammate') {
                config.method = 'put';
                let data = {
                    teamId:this.teamId,
                    userInfoId:this.userInfoId,
                    user:values.user,
                };
                config.data = JSON.stringify(data);
                title = '已完成修改';
            }
            axios(config).then(() => {
                Swal.fire({ icon: 'success', title: title, text:'將導回首頁' }).then(() => this.hasHistory ? this.$router.go(-1) : this.$router.push('/'));
            }).catch(error => {
                if (error.response.status === 400) {
                    Swal.fire({ icon: 'error', title: `${error.response.data || error.response.data.title}` });
                }
                if (error.response.status === 404) {
                    this.$router.push({ name: 'NotFound' });
                }
            })
        },
        async isCorrect(value) {
            if (!value || !value.trim()) {
                return "邀請碼為必填";
            };
            
            const response = await axios.get(`/api/team/${value}`);
            if (!response.data) {
                return "找不到該組邀請碼"; 
            }
            return true;
        }
    }
}
</script>