<template>
    <div class="container bgc-white w-100 vh-100">
        <div class="page-header py-4">
            <h1 class="page-title text-primary-d2 text-150 d-none d-sm-block">
                {{ act.actName }}
                <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    <span> 新增成員 </span>
                </small>

                <!-- <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    123
                </small> -->
            </h1>
        </div>

        <!-- 快速報名 -->
        <div class="card border-0 mb-3">
            <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                <div class="card-title h5">
                    快速報名
                    <small class="text-uppercase"> fast registration </small>
                </div>
            </div>
        </div>
        <!-- End 快速報名 -->
        <Form v-on:submit="onSubmit" v-slot="{ meta }" :initial-values="formValues" :validation-schema="schema">
            <!-- 個人資料 -->
            <div class="card border-0">
                <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                    <div class="card-title h5">
                        個人資料
                        <small class="text-uppercase"> Personal information </small>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <Field name="nation" class="form-control text-dark-l5" as="select">
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
                            <ErrorMessage name="nation" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field placeholder="身分證號碼" type="text" name="rocid" class="form-control pr-4 shadow-none"></Field>
                                <i class="far fa-id-card text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">身分證或護照</label>
                            </div>
                            <ErrorMessage name="rocid" class="text-danger" as="div" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="name" placeholder="姓名" type="text" class="form-control pr-4 shadow-none"
                                    maxlength="50">
                                </Field>
                                <i class="fa fa-user text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">姓名</label>
                            </div>
                            <ErrorMessage name="name" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <Field name="gender" class="form-control text-dark-l5" v-on:change="changeSelectedGroup" as="select">
                                <option hidden value=""> -- 法定性別 -- </option>
                                <option value="男"> 男 </option>
                                <option value="女"> 女 </option>
                            </Field>
                            <ErrorMessage name="gender" class="text-danger" as="div" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="birthdate" placeholder="出生年月日" type="date"
                                    class="form-control text-dark-l5 pr-4 shadow-none" v-on:change="changeSelectedGroup"></Field>
                                <i class="fas fa-calendar-alt text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">出生年月日</label>
                            </div>
                            <ErrorMessage name="birthdate" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="email" placeholder="e-mail" type="email" class="form-control pr-4 shadow-none"
                                    maxlength="200"></Field>
                                <i class="fas fa-envelope-open text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">e-mail</label>
                            </div>
                            <ErrorMessage name="email" class="text-danger" as="div" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="phoneNumber" placeholder="手機" type="text" class="form-control pr-4 shadow-none">
                                </Field>
                                <i class="fas fa-mobile-alt text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">手機</label>
                            </div>
                            <ErrorMessage name="phoneNumber" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="tel" placeholder="市話" type="text" class="form-control pr-4 shadow-none"></Field>
                                <i class="fas fa-tty text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">市話</label>
                            </div>
                            <ErrorMessage name="tel" class="text-danger" as="div" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="emergName" placeholder="緊急聯絡人姓名" type="text" class="form-control pr-4 shadow-none">
                                </Field>
                                <i class="fas fa-user-tag text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">緊急聯絡人姓名</label>
                            </div>
                            <ErrorMessage name="emergName" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="emergPhone" placeholder="緊急聯絡人姓名" type="text" class="form-control pr-4 shadow-none">
                                </Field>
                                <i class="fas fa-mobile-alt text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">緊急聯絡人手機/市話</label>
                            </div>
                            <ErrorMessage name="emergPhone" class="text-danger" as="div" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- End 個人資料 -->

            <!-- 報名項目 -->
            <!-- <div class="card border-0">
                <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                    <div class="card-title h5">
                        報名項目
                        <small class="text-uppercase"> Item </small>
                        <span class="text-danger field-validation-valid" data-valmsg-for="SelectedGroup"
                            data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row d-flex mx-1 mx-lg-0 btn-group btn-group-toggle" data-toggle="buttons">
                        <div v-for="(item,index) in settings.group" class="col-6 col-sm-2 mb-3">
                            <label
                                class="d-style btn btn-outline-info py-md-3 px-md-4 py-25 px-3 text-110 mr-3 shadow-sm radius-1 w-100"
                                v-bind:class="allowEntry(item) != '' ? 'disabled' : ''">
                                <input class="invisible pos-abs" data-val="true" data-val-required="請選擇參賽組別" type="radio"
                                    name="SelectedGroup" v-bind:value="item.ActGroupId" v-model.number="form.group"> {{item.Name}}
                                <span class="d-block text-90">
                                    NT$ {{item.UnitPrice}}
            
                                    <div v-show="allowEntry(item) != ''" class="text-center text-danger text-90">
                                        {{allowEntry(item)}} </div>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- End 報名項目 -->
            
            <button type="submit" class="btn btn-primary" :disabled="!meta.dirty">Sign up</button>
        </Form>
       
    
    </div>
</template>

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage  } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
    nation: yup.string().required("國籍 是必填欄"),
    rocid: yup.string().required("身分證或護照 是必填欄").min(6,`身分證或護照 至少 6 位數`).max(10,`身分證或護照 至多 10 位數`),
    name:yup.string().required("姓名 為必填欄").max(50,"姓名 最多可輸入 50 字"),
    gender:yup.string().required("法定性別 為必填欄位"),
    birthdate:yup.date().required("出生年月日 為必填欄位"),
    email:yup.string().required("Email 為必填欄位").max(200,"Email 最多可輸入 200 字"),
    phoneNumber:yup.string().required("手機 為必填欄位").max(10,"手機號碼 最多可輸入 10 字"),
    tel:yup.string().max(20,"市話 最多可輸入 20 字"),
    emergName:yup.string().max(20,"緊急連絡人 最多可輸入 50 字"),
    emergPhone:yup.string().max(20,"緊急連絡人電話 最多可輸入 50 字")
});

export default {
    name: 'Personal',
    props: ['act','operate'],
    components: {
        Field, Form, ErrorMessage,
    },
    // setup() {
    //     return { 
    //         passwordRules:yup.string().required("").min(8)
    //     };
    // },
    data() {
        return {
            formValues: { 
                nation: '台灣',
            },
        }
    },
    computed: {
        schema() {
            return schema;
        },
    },
    methods: {
        onSubmit(values) {
            console.log(values);
        },
        inputMask:function(event) {
            this.formValues.rocid = event.target.value;
        },
        changeSelectedGroup(){

        }
        // isRequired(value) {
        //     return value ? true : '該欄位為必填';
        // },
        // validateEmail(value) {
        //     // if the field is empty
        //     if (!value) {
        //         return 'This field is required';
        //     }
        //     // if the field is not a valid email
        //     const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        //     if (!regex.test(value)) {
        //         return 'This field must be a valid email';
        //     }
        //     // All is good
        //     return true;
        // },
        // minMax(value) {
        //     if (!value || !value.length) {
        //         return true;
        //     }
        //     const numericValue = Number(value);
        //     if (numericValue < min) {
        //         return `This field must be greater than ${min}`;
        //     }
        //     if (numericValue > max) {
        //         return `This field must be less than ${max}`;
        //     }
        //     return true;
        // }
    },
}
</script>