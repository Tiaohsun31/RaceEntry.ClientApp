<template>
    <div class="container bgc-white w-100">
        <div class="page-header py-4">
            <h1 class="page-title text-primary-d2 text-150 d-none d-sm-block">
                {{ act.actName }}
                <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    <span> 新增團隊 </span>
                </small>
            </h1>
        </div>

        <div v-if="!isAuthenticated" class="alert alert-danger mb-4">
            <i class="fas fa-info-circle mr-4 text-danger"></i>
            <span>若您已加入會員，登入後將可選擇已成立隊伍成員資料，且方便您查詢訂單，避免訂單遺漏。</span>
        </div>

        <div class="card border-0">
            <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                <div class="card-title h5">
                    團隊資訊
                    <small class="text-uppercase"> Group information </small>
                </div>
            </div>
            <div class="card-body">
                <Form @submit="onSubmit">
                    <div class="form-group row">
                        <div class="col-sm-3 col-form-label text-sm-right pr-0">
                            <label for="GroupName" class="mb-0"> 團隊名稱 </label>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"> <i class="fas fa-users "></i> </div>
                                </div>
                                <Field id="GroupName" name="groupName" label="團隊名稱" rules="required|max:15" type="text" 
                                    class="form-control col-sm-8 col-md-6" placeholder="Group Name">
                                </Field>
                            </div>
                            <ErrorMessage name="groupName" class="text-danger pt-1" as="div"></ErrorMessage>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-3 col-form-label text-sm-right pr-0">
                            <label for="Name" class="mb-0"> 領隊姓名 </label>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"> <i class="fas fa-user"></i> </div>
                                </div>
                                <Field id="Name" name="name" label="姓名" rules="required|max:50" type="text" 
                                    class="form-control col-sm-8 col-md-6" placeholder="Leader Name (領隊預設為收件人)" aria-describedby="nameHelp">
                                </Field>
                            </div>
                            <ErrorMessage name="name" class="text-danger pt-1" as="div"></ErrorMessage>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-3 col-form-label text-sm-right pr-0">
                            <label for="Email" class="mb-0"> Email </label>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"> <i class="fas fa-envelope"></i> </div>
                                </div>
                                <Field id="Email" name="email" label="Email" rules="required|email"
                                    class="form-control col-sm-8 col-md-6" placeholder="Leader Email">
                                </Field>
                            </div>
                            <ErrorMessage name="email" class="text-danger pt-1" as="div"></ErrorMessage>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-3 col-form-label text-sm-right pr-0">
                            <label for="PhoneNumber" class="mb-0"> 手機號碼 </label>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"> <i class="fas fa-mobile px-1"></i> </div>
                                </div>
                                <Field id="PhoneNumber" name="phoneNumber" label="手機號碼" rules="required|max:10"
                                    class="form-control col-sm-8 col-md-6" placeholder="Leader Phone Number">
                                </Field>
                            </div>
                            <ErrorMessage name="phoneNumber" class="text-danger pt-1" as="div"></ErrorMessage>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-9">
                            <div class="form-check">
                                <input id="isShare" v-model="isShare" type="checkbox" class="form-check-input" data-toggle="collapse" data-target="#multiCollapseRange" aria-expanded="false" aria-controls="multiCollapseRange">
                                <label class="form-check-label" for="isShare">是否產生分享連結</label>
                            </div>
                        </div>
                    </div>

                    <div id="multiCollapseRange" class="collapse">
                        <div class="form-group row">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-9">
                                <label class="mb-3"> 連結有效時間 </label>
                                <div class="row">
                                    <div class="col-sm-8 col-md-7">
                                        <Datepicker v-model:value="date" range value-type="format" format="YYYY-MM-DD"></Datepicker>
                                    </div>
                                </div>

                                <!--<div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> 從 </span>
                                        </div>
                                        <input asp-for="StartTime" type="datetime-local" aria-label="StartDate" class="form-control col-sm-8 col-md-6">
                                    </div>
                                    <div class="input-group mt-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> 到 </span>
                                        </div>
                                        <input asp-for="EndTime" type="datetime-local" aria-label="EndDate" class="form-control col-sm-8 col-md-6">
                                    </div> -->
                                <small class="form-text text-muted">可修改分享連結有效時間，時間過期與確認訂單後，將自動關閉分享連結</small>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-lighter-success shadow-sm text-600 letter-spacing px-4 mb-1 btn-block btn-lg my-5">
                        <div class="pt-2">下一步:新增團員</div>
                        <div class="py-2">Next Step: Add Team Members</div>
                    </button> 
                </Form>
            </div>
        </div>
        
    </div>
</template>

<script lang="js">
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Field,Form,ErrorMessage } from 'vee-validate';
import Datepicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/zh-tw';

export default {
    name:'CreateGroup',
    props:['act'],
    components: { Field, Form, ErrorMessage, Datepicker },
    data(){
        return {
            isShare:false,
            date:[],
        }
    },
    created(){
        if (!this.act.canSignUp) {
            Swal.fire({icon:'error', title:'該活動已結束報名'}).then(() => {
                this.$router.push({name:'HomePage'});
            })
        }
    },
    mounted(){
        const startDate = new Date();
        moment(startDate).format('YYYY-MM-DD')
        const endDate = new Date(new Date().setDate(startDate.getDate() + 3));
        this.date = [startDate, endDate];

        //TODO Test
        sessionStorage.setItem("orderId","4bc8ff05-0450-4451-beb7-08dae3c31310")
    },
    computed:{
        isAuthenticated(){
            return this.$store.state.isAuthenticated;
        },
        code(){
            return this.$route.params.code;
        },
        orderId(){
            return this.$store.state.orderId;
        }
    },
    methods:{
        onSubmit(values){
            values.actCode = this.code;
            values.isShare = this.isShare;
            values.startTime = this.date[0];
            values.endTime = this.date[1];
            axios.post('/api/order',JSON.stringify(values,null,2),{
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200 && response.data != '') {
                    sessionStorage.setItem("orderId", response.data);
                    this.$router.push({ name: 'Group' });
                }
            })
            .catch(error => {
                if (error.response.ststus === 400) {
                    Swal.fire(error.response.data);
                }
            })
        },
    }
}
</script>