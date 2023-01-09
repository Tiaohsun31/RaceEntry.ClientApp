<template>
    <Layout>
        <div class="container">
            <div class="pt-5 mb-3">
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
                            <div class="col-12 mb-lg-4 mb-3">
                                <label for="inputName" class="text-secondary">
                                    <i class="fas fa-star text-danger ml-1"></i> 姓名／Name
                                </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-user"></i></div>
                                    </div>
                                    <Field name="user.name" label="姓名" rules="required|max:50" placeholder="姓名" type="text" class="form-control pr-4 shadow-none" maxlength="50">
                                    </Field>
                                </div>
                                <ErrorMessage name="user.name" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <div class="col-12 mb-lg-4 mb-3">
                                <label for="inputEmail" class="text-secondary">
                                    <i class="fas fa-star text-danger ml-1"></i> 電子信箱／Email
                                </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-envelope-open"></i></div>
                                    </div>
                                    <Field name="user.email" label="Email" rules="required|max:200|email" placeholder="e-mail" type="email" class="form-control pr-4 shadow-none" maxlength="200"></Field>
                                </div>
                                <ErrorMessage name="user.email" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <div class="col-12 col-md-6 mb-lg-4 mb-3">
                                <label for="inputIDNumber" class="text-secondary">
                                    <i class="fas fa-star text-danger ml-1"></i> 身分證號碼／ID Number(非本國人請使用護照號碼 Passport Number)
                                </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="far fa-id-card"></i></div>
                                    </div>
                                    <Field name="user.rocid" label="身分證號碼" rules="required|min:6|max:10" placeholder="身分證號碼" type="text" class="form-control pr-4 shadow-none"></Field>
                                </div>
                                <ErrorMessage name="user.rocid" class="text-danger" as="div" />
                            </div>
                            <div class="col-12 col-md-6 mb-lg-4 mb-3">
                                <label for="selectNationality" class="form-label text-secondary"> 國籍／Nationality </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-location-arrow"></i></div>
                                    </div>
                                    <Field name="user.nationality" label="國籍" rules="required" class="form-control text-dark-l5" as="select">
                                        <option value="台灣">台灣</option>
                                        <option value="香港">香港</option>
                                        <option value="日本国">日本国</option>
                                        <option value="中国">中国</option>
                                        <option value="澳門">澳門</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Philippines">Philippines</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Thailand">ประเทศไทย</option>
                                        <option value="SouthKorea">대한민국</option>
                                        <option value="Vietnam">Việt Nam</option>
                                        <option value="USA">United States of America</option>
                                        <option value="Canada">Canada</option>
                                        <option value="France">France</option>
                                        <option value="Guatemala">Guatemala</option>
                                        <option value="India">India</option>
                                        <option value="Netherlands">Netherlands</option>
                                        <option value="New Zealand">New Zealand</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="Spain">Spain</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Virgin Islands(British)">Virgin Islands(British)</option>
                                        <option value="Zimbabwe">Zimbabwe</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                </div>
                                <ErrorMessage name="user.nationality" class="text-danger" as="div" />
                            </div>
                            <div class="col-12 col-md-6 mb-lg-4 mb-3">
                                <label for="inputBirthday" class="text-secondary">
                                    出生年月日／Birth Date
                                </label>
                                <Datepicker :lang="datepickerLangs.zh" placeholder="YYYY-MM-DD Ex:1900-01-01" v-model:value="formValues.user.birthdate" value-type="format" input-class="form-control pr-4 shadow-none" format="YYYY-MM-DD"></Datepicker>
                                <Field name="user.birthdate" label="出生年月日" type="text" hidden></Field>
                                <ErrorMessage name="user.birthdate" class="text-danger" as="div" />
                            </div>
                            <div class="col-12 col-md-6 mb-lg-4 mb-3">
                                <label for="inputGender" class="col-form-label text-secondary">
                                    法定性別／Gender
                                </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-venus-mars"></i></div>
                                    </div>
                                    <Field name="user.gender" label="法定性別" class="form-control text-dark-l5"
                                        v-model="formValues.user.gender" as="select">
                                        <option hidden value=""> -- 法定性別 -- </option>
                                        <option value="男"> 男 </option>
                                        <option value="女"> 女 </option>
                                    </Field>
                                </div>
                                <ErrorMessage name="user.gender" class="text-danger" as="div" />
                            </div>
                            <div class="col-12 col-md-6 mb-lg-4 mb-3">
                                <label for="inputMobile" class="text-secondary">
                                    聯絡電話(手機)／Mobile
                                </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fas fa-mobile-alt"></i> </div>
                                    </div>
                                    <Field name="user.phoneNumber" rules="max:10" label="手機" placeholder="手機" type="text" class="form-control pr-4 shadow-none"></Field>
                                </div>
                                <ErrorMessage name="user.phoneNumber" class="text-danger" as="div" />
                            </div>

                            <div class="col-12 col-md-6 mb-lg-4 mb-3">
                                <label for="inputPhoneNumber" class="text-secondary"> 聯絡電話(市話)／TEL </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fas fa-tty"></i> </div>
                                    </div>
                                    <Field name="user.tel" rules="max:20" label="市話" placeholder="市話" type="text" class="form-control pr-4 shadow-none"></Field>
                                </div>
                                <ErrorMessage name="user.tel" class="text-danger" as="div" />
                            </div>
                            <div class="col-12 mb-lg-4 mb-3">
                                <label class="text-secondary"> 地址／Address </label>
                                <div class="row">
                                    <div class="col-6">
                                        <Field name="user.zipcode" v-model="formValues.user.zipcode" type="hidden"></Field>
                                        <Field name="user.county" label="縣市" class="form-control" as="select" v-model="formValues.user.county">
                                            <option value="" selected> -- 請選擇縣市 -- </option>
                                            <option v-for="item in cities" :value="item" :label="item"></option>
                                        </Field>
                                        <ErrorMessage name="user.county" class="text-danger" as="div"></ErrorMessage>
                                    </div>
                                    <div class="col-6">
                                        <Field name="user.district" label="鄉鎮" class="form-control" as="select" v-model="formValues.user.district" @change="changeZipCode()">
                                            <option value="" selected> -- 請選擇鄉鎮 -- </option>
                                            <option v-for="item in county" :value="item.name" :label="item.name"></option>
                                        </Field>
                                        <ErrorMessage name="user.district" class="text-danger" as="div"></ErrorMessage>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <div class="form-group">
                                            <Field class="form-control" name="user.address" label="收件地址" placeholder="請輸入您的收件地址" rules="max:300"></Field>
                                            <ErrorMessage name="user.address" class="text-danger" as="div"></ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 mb-lg-4 mb-3">
                                <label for="inputEmergName" class="text-secondary">
                                    緊急連絡人／Emergency Contact Person
                                </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fas fa-user-tag"></i> </div>
                                    </div>
                                    <Field name="user.emergName" rules="max:20" label="緊急聯絡人姓名" placeholder="緊急聯絡人姓名" type="text" class="form-control pr-4 shadow-none"></Field>
                                </div>
                                <ErrorMessage name="user.emergName" class="text-danger" as="div" />
                            </div>
                            <div class="col-12 col-md-6 mb-lg-4 mb-3">
                                <label for="inputEmergPhone" class="text-secondary">
                                    緊急連絡人電話／Emergency Mobile
                                </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fas fa-mobile-alt"></i> </div>
                                    </div>
                                    <Field name="user.emergPhone" rules="max:20" label="緊急聯絡人手機/市話" placeholder="緊急聯絡人姓名" type="text" class="form-control pr-4 shadow-none"></Field>
                                </div>
                                <ErrorMessage name="user.emergPhone" class="text-danger" as="div" />
                            </div>
                            <div class="col-12 mb-lg-4 mb-3">
                                <label for="inputPassword" class="col-form-label text-secondary">
                                    密碼／Password
                                    <small class="text-orange"> 可透過Email及密碼登入 </small>
                                </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fas fa-unlock-alt"></i> </div>
                                    </div>
                                    <Field name="user.password" label="密碼" rules="min:6" class="form-control" id="inputPassword" placeholder="至少6位數"></Field>
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
    import { Field,Form,ErrorMessage } from 'vee-validate';
    import Datepicker from 'vue-datepicker-next';
    import 'vue-datepicker-next/index.css';
    import { datepickerLangs } from '../Entry/js/datepickerLang';
    export default {
        name:'Register',
        components:{
            Field,Form,ErrorMessage,
            Datepicker
        },
        setup(){
            return { datepickerLangs }
        },
        data(){
            return {
                formValues:{
                    user: {
                        nationality: '台灣',
                        gender: '',
                        zipcode:'',
                        county:'',
                        district:''
                    },
                },
                allZipCode:[],
                cities:[],
                isExternal:false
            }
        },
        mounted() {
            axios.get('https://demeter.5fpro.com/tw/zipcodes.json').then(({ data }) => {
                this.allZipCode = data;
                this.cities = [...new Set(data.map(s => s.city_name))];
            });
            axios.get('/api/account/isExternal').then(({data}) => {
                this.isExternal = data;
            });
        },
        computed: {
            county() {
                if (this.formValues.user.county == '') return;
                return this.allZipCode.filter(x => x.city_name == this.formValues.user.county);
            },
        },
        methods:{
            changeZipCode() {
                if (this.formValues.user.district === '') {
                    this.formValues.user.zipcode = '';
                    return;
                };
                this.formValues.user.zipcode = this.allZipCode.find(x => x.name === this.formValues.user.district)?.zipcode;
            },
            onSubmit(values) {
                const form = JSON.stringify(values.user,null,2);
                axios.post('/api/account/register',form,{
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    Swal.fire({icon:'success',title:'已完成註冊'});
                }).catch(error => {
                    if (error.response.status === 400) {
                        Swal.fire({icon:'error',title:`${error.response.data.title}`});
                    }
                    if (error.response.status === 404) {
                        this.$router.push({name:'NotFound'});
                    }
                })
            }
        }
    }
</script>