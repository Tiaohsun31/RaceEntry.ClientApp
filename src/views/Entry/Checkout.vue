<template>
    <div class="container my-4">
        <div class="page-header pb-3">
            <h1 class="page-title text-primary-d2 text-150 d-none d-sm-block">
                {{ act.actName }}
                <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    結帳付款
                </small>
            </h1>
            <div class="page-tools d-inline-flex">
                <button v-if="formValues.contact.paidTotal == 0" type="button" class="btn btn-light-red btn-h-red btn-a-red border-0 py-2 text-600" @click="cancel">
                    整筆訂單取消
                </button>
                
                <button v-if="formValues.contact.paidTotal > 0 && formValues.contact.canRefund" class="btn btn-light-red btn-h-red btn-a-red border-0 py-2 text-600" @click="refund">
                    退費申請
                </button>
            </div>
        </div>
        <hr>
        <!-- 團隊成員 -->
        <section>
            <div class="h4 text-dark mt-2"> 團隊成員 </div>
            <div class="pos-rel">
                <div class="text-90 py-1 px-4 pos-rel text-white d-inline-block text-uppercase" style="background-color: #e95419;z-index: 2;">Member</div>
                <div class="bar pos-abs w-100" style="background-color: #e95419;z-index: 1;"></div>
            </div>
            <div class="text-right">
                <RouterLink :to="{name:'Group'}" class="btn px-4 btn-light-warning btn-text-dark mb-1">
                    團隊管理
                </RouterLink>
                <div class="my-3">
                    <Members v-bind:members="formValues.members" v-bind:isReadOnly="act.isReadOnly"></Members>
                </div>
            </div>
        </section>
        <!-- End 團隊成員 -->
        <!-- 檢核文件 -->
        <section v-if="formValues.pendingApproval.length > 0">
            <div class="h4 text-dark mt-5"> 檢核文件 </div>
            <div class="pos-rel">
                <div class="text-90 py-1 px-4 pos-rel text-white d-inline-block text-uppercase bgc-purple" style="z-index: 2;">
                    document review </div>
                <div class="bar pos-abs w-100 bgc-purple" style="z-index: 1;"></div>
            </div>
            <Uploads :pendingApproval="formValues.pendingApproval"></Uploads>
        </section>
        <!-- End 檢核文件 -->
        <!-- 團體加購品 -->
        <section v-if="formValues.addons.length > 0">
            <div class="h4 text-dark mt-5"> 團體加購品 </div>
            <div class="pos-rel">
                <div class="text-90 py-1 px-4 pos-rel text-white d-inline-block text-uppercase bgc-blue" style="z-index: 2;">Group Add-ons</div>
                <div class="bar pos-abs w-100 bgc-blue" style="background-color: #e95419;z-index: 1;"></div>
            </div>
            <div class="table-responsive-md">
                <table class="table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden mt-3 text-center">
                    <thead class="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
                        <tr class="text-default-d3 bgc-default-l4 ">
                            <th class="pl-2 pl-lg-4 d-none d-sm-table-cell text-left"> # </th>
                            <th class="d-none d-sm-table-cell"> 項目 </th>
                            <th class="d-none d-sm-table-cell"> 規格 </th>
                            <th class="d-none d-sm-table-cell"> 單價 </th>
                            <th class="d-none d-sm-table-cell"> 數量 </th>
                            <th class="d-none d-sm-table-cell"> 金額 </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="element,index in formValues.addons">
                            <tr class="bgc-h-secondary-l4">
                                <td class="pl-2 pl-lg-4 d-none d-sm-table-cell text-left">
                                    <span class="text-primary text-600">
                                        {{ i=index+1 }}
                                    </span>
                                </td>
                                <td class="text-dark-m2 d-none d-sm-table-cell">
                                    <div> {{ element.name }} <span> {{ element.spec }} </span> </div>
                                </td>
                                <td class="text-dark-m2 d-none d-sm-table-cell"> {{ element.spec }} </td>
                                <td class="text-secondary-d3 d-none d-sm-table-cell"> {{ element.spec }} NT$ {{ numberFormat(element.unitPrice) }} </td>
                                <td class="text-secondary-d3 d-none d-sm-table-cell"> {{ numberFormat(element.qty) }}</td>
                                <td class="text-secondary-d3 d-none d-sm-table-cell"> NT$ {{ numberFormat(element.subTotal) }} </td>
                            </tr>
                            <tr class="text-default-d3 bgc-default-l4 d-table-row d-sm-none">
                                <td colspan="7" class="text-dark-m2 ">
                                    <div> {{ element.name }} <span class="text-blue"> {{ element.spec }} </span> </div>
                                </td>
                            </tr>
                            <tr class="d-table-row d-sm-none text-secondary-d3">
                                <td colspan="2">單價</td>
                                <td colspan="2">數量</td>
                                <td colspan="2">金額</td>
                            </tr>
                            <tr class="d-table-row d-sm-none text-secondary-d3">
                                <td colspan="2">NT$ {{ numberFormat(element.unitPrice) }} </td>
                                <td colspan="2"> {{ numberFormat(element.qty) }}</td>
                                <td colspan="2" title="金額"> NT$ {{ numberFormat(element.subTotal) }} </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </section>
        <!-- End 團體加購品 -->
        <!-- 付款明細 -->
        <section v-if="formValues.accounts.length > 0">
            <div class="h4 text-dark mt-5"> 付款明細 </div>
            <div class="pos-rel">
                <div class="text-90 py-1 px-4 pos-rel text-white d-inline-block text-uppercase bgc-brown" style="z-index: 2;"> Payment Details</div>
                <div class="bar pos-abs w-100 bgc-danger" style="background-color: #e95419;z-index: 1;"></div>
            </div>
            <div class="table-responsive-md">
                <table class="table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden mt-3 text-center">
                    <thead class="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
                        <tr class="text-default-d3 bgc-default-l4 ">
                            <th class="pl-2 pl-lg-4 "> # </th>
                            <th> 狀態 </th>
                            <th> 付款方式 </th>
                            <th> 金額 </th>
                            <th class="d-none d-sm-table-cell"> 繳費代碼/網址 </th>
                            <th class="d-none d-sm-table-cell"> 繳費期限 </th>
                            <th class="d-none d-sm-table-cell"> 已繳金額 </th>
                            <th class="d-none d-sm-table-cell"> 繳費日期 </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="element,index in formValues.accounts">
                            <tr class="bgc-h-secondary-l4">
                                <td class="pl-2 pl-lg-4 text-left">
                                    <span class="d-none d-sm-block text-primary text-600">
                                        {{ i = index + 1 }}
                                    </span>
                                    <a href="#" data-toggle="collapse" :data-target="`#table-pay-detail-${index}`" title="查看明細"
                                        class="d-block d-sm-none text-blue-d1 text-600 text-95 collapsed">
                                        {{ i = index + 1}}
                                        <i class="fa fa-angle-down toggle-icon opacity-1 text-100"></i>
                                    </a>
                                </td>
                                <td>
                                    <span class="badge" :class="statusStyle(element.label)">{{ element.label }}</span>
                                </td>
                                <td class="text-dark-m2">
                                    {{ element.paymentType }}
                                </td>
                                <td class="text-secondary-d3">
                                    NT$ {{ numberFormat(element.amount) }}
                                </td>
                                <td class="text-dark-m2 d-none d-sm-table-cell">
                                    <a v-if="element.paymentType == '信用卡繳費' && element.label == '繳費中'" target="_blank" class="btn-h-text-pink no-underline" :href="element.paidAccount"> {{ element.paidAccount }}</a>
                                    <div v-else>
                                        {{ element.paidAccount }}
                                    </div>
                                </td>
                                <td class="text-dark-m2 d-none d-sm-table-cell">
                                    {{ dateTimeFormat(element.expiryDate) }}
                                </td>
                                <td class="text-secondary-d3 d-none d-sm-table-cell">
                                   NT$ {{ numberFormat(element.paidAmount) }}
                                </td>
                                <td class="text-dark-m2 d-none d-sm-table-cell">
                                    {{ dateTimeFormat(element.paidTime) }}
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </section>
        <!-- End 付款明細 -->
        <!-- 訂單表單 -->
        <Form @submit="onSubmit" :initial-values="formValues.contact">
            <section class="row py-md-4 py-3 ">
                <div class="col-md-6 col-12">
                    <div class="card acard">
                        <div class="h4 text-dark"> 訂單資訊 </div>
                        <div class="pos-rel">
                            <div class="text-90 py-1 px-4 pos-rel text-white d-inline-block text-uppercase" style="background-color: #e95419;z-index: 2;">ORDER INFORMATION</div>
                            <div class="bar pos-abs w-100" style="background-color: #e95419;z-index: 1;"></div>
                        </div>
                        <div class="card-body">
                            <div v-if="formValues.members.length != 1" class="form-group">
                                <label for="groupName" class="text-info-d2">團隊名稱</label>
                                <Field id="groupName" name="groupName" label="團隊名稱" class="form-control" rules="required|max:15"></Field>
                                <ErrorMessage name="groupName" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <div class="form-group">
                                <label for="name" class="text-info-d2">收件人姓名</label>
                                <Field id="name" name="name" label="收件人名稱" class="form-control" rules="required|max:50"></Field>
                                <ErrorMessage name="name" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber" class="text-info-d2">收件人電話</label>
                                <Field id="phoneNumber" name="phoneNumber" label="收件人電話" rules="required|max:10" class="form-control"></Field>
                                <ErrorMessage name="phoneNumber" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <div class="form-group">
                                <label for="email" class="text-info-d2">Email</label>
                                <Field id="email" name="email" rules="required|email|max:200" type="email" class="form-control"></Field>
                                <ErrorMessage name="email" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <!-- 發票資訊 -->
                            <section v-if="act.hasInvoice">
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" v-model="needUniform">
                                    <a class="no-underline text-info-d2" href="#needUniformArea" @click.prevent="needUniform = !needUniform">
                                        本活動開立雲端發票，如需統編與公司抬頭 [選填]
                                    </a>
                                </div>
                                <Transition name="fade">
                                    <div id="needUniformArea" v-show="needUniform">
                                        <div class="form-group">
                                            <label class="text-info-d2" for="uniformNumber">統一編號</label>
                                            <Field id="uniformNumber" name="uniformNumber" label="統一編號" :rules="{ required: needUniform, digits: 8 }" class="form-control"></Field>
                                            <ErrorMessage name="uniformNumber" class="text-danger" as="div"></ErrorMessage>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="text-info-d2" for="companyName">公司抬頭</label>
                                            <Field id="companyName" name="companyName" label="公司抬頭" :rules="{ required: needUniform, max: 50 }" class="form-control"></Field>
                                            <ErrorMessage name="companyName" class="text-danger" as="div"></ErrorMessage>
                                        </div>
                                    </div>
                                </Transition>
                            </section>
                            <div class="form-group">
                                <label for="note" class="text-info-d2">備註 [選填]</label>
                                <Field name="note" label="備註" v-slot="{field,value}">
                                    <textarea v-bind="field" rows="4" id="note" class="form-control">
                                        {{ value }}
                                    </textarea>
                                </Field>
                                <ErrorMessage name="note" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <!-- End 發票資訊 -->
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <div class="card acard">
                        <div class="card-title">
                            <div class="h4 text-dark"> 配送與付款 </div>
                            <div class="pos-rel">
                                <div class="text-90 py-1 px-4 pos-rel text-white d-inline-block text-uppercase bgc-primary-d3" style="z-index: 2;">DELIVERY AND PAYMENT</div>
                                <div class="bar pos-abs w-100 bgc-primary-d3" style="z-index: 1;"></div>
                            </div>
                        </div>
                        <div class="card-body">
                            <!-- 配送方式 -->
                            <div v-if="act.sendTypes" class="form-group">
                                <label for="sendType" class="text-info-d2">請選擇配送方式</label>
                                <Field id="sendType" name="sendType" label="配送方式" rules="required" v-model="formValues.contact.sendType" class="form-control" as="select" @change="getShipping()">
                                    <option value="" disabled selected hidden> -- 請選擇 -- </option>
                                    <option v-for="item in act.sendTypes.split(',')" :value="item" :label="item"></option>
                                </Field>
                                <ErrorMessage name="sendType" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <section v-if="formValues.contact.sendType == '7-ElEVEN門市取貨' || formValues.contact.sendType == '全家門市取貨'">
                                <a href="#" v-show="formValues.contact.sendType == '7-ElEVEN門市取貨'" class="btn btn-info my-1" @click.prevent="getEmap('711B2C')"  :disabled='act.isReadOnly'>選擇 7-11 取貨門市</a>
                                <a href="#" v-show="formValues.contact.sendType == '全家門市取貨'" class="btn btn-success my-1" @click.prevent="getEmap('FAMIC2C')" :disabled='act.isReadOnly'>選擇 全家 取貨門市</a>
                                
                                <table class="table table-sm table-bordered mt-2">
                                    <tbody>
                                        <tr>
                                            <th class="bgc-light text-dark-l1 w-25" scope="row">店號</th>
                                            <td class="text-left"> 
                                                {{ formValues.contact.storeNumber }} 
                                                <Field name="storeNumber" label="店號" rules="required" v-model="formValues.contact.storeNumber" type="hidden"></Field>
                                                <ErrorMessage name="storeNumber" class="text-danger" as="div"></ErrorMessage>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="bgc-light text-dark-l1" scope="row">取貨門市</th>
                                            <td class="text-left"> 
                                                {{ formValues.contact.storeName }} 
                                                <Field name="storeName" label="取貨門市" rules="required" v-model="formValues.contact.storeName" type="hidden"></Field>
                                                <ErrorMessage name="storeName" class="text-danger" as="div"></ErrorMessage>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="bgc-light text-dark-l1" scope="row">門市地址</th>
                                            <td class="text-left"> 
                                                {{ formValues.contact.storeAddress }} 
                                                <Field name="storeAddress" label="門市地址" rules="required" v-model="formValues.contact.storeAddress" type="hidden"></Field>
                                                <ErrorMessage name="storeAddress" class="text-danger" as="div"></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                            <section v-if="formValues.contact.sendType == '宅配到府' || formValues.contact.sendType == '郵件寄送'">
                                <div class="row">
                                    <div class="col-6">
                                        <Field name="receivePostalCode" v-model="formValues.contact.receivePostalCode" type="hidden"></Field>
                                        <Field name="receiveCity" label="縣市" class="form-control" rules="required" v-model="formValues.contact.receiveCity" as="select">
                                            <option value="" selected> -- 請選擇縣市 -- </option>
                                            <option v-for="item in cities" :value="item" :label="item"></option>
                                        </Field>
                                        <ErrorMessage name="receiveCity" class="text-danger" as="div"></ErrorMessage>
                                    </div>
                                    <div class="col-6">
                                        <Field name="receiveRegion" label="鄉鎮" class="form-control" rules="required" v-model="formValues.contact.receiveRegion" as="select" @change="changeZipCode()">
                                            <option value="" selected> -- 請選擇鄉鎮 -- </option>
                                            <option v-for="item in county" :value="item.name" :label="item.name"></option>
                                        </Field>
                                        <ErrorMessage name="receiveRegion" class="text-danger" as="div"></ErrorMessage>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <div class="form-group">
                                            <Field class="form-control" name="receiveAddress" label="收件地址" placeholder="請輸入您的收件地址" rules="required"></Field>
                                            <ErrorMessage name="receiveAddress" class="text-danger" as="div"></ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <!-- End 配送方式 -->
                            <!-- 付款方式 -->
                            <div v-if="act.paymentTypes" class="form-group">
                                <label for="payment" class="text-info-d2">請選擇付款方式</label>
                                <Field id="payment" name="paymentType" label="付款方式" rules="required" v-model="formValues.contact.paymentType" class="form-control" as="select">
                                    <option value="" disabled selected hidden> -- 請選擇 -- </option>
                                    <option v-for="item in act.paymentTypes.split(',')" :value="item" :label="item"></option>
                                </Field>
                                <ErrorMessage name="paymentType" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <!-- End 付款方式 -->
                        </div>  
                    </div>
                    <div class="card acard">
                        <div class="card-title">
                            <div class="h4 text-dark pt-3"> 訂單小計 </div>
                            <div class="pos-rel">
                                <div class="text-90 py-1 px-4 pos-rel text-white d-inline-block text-uppercase bgc-warning" style="z-index: 2;">BILLING INFORMATION</div>
                                <div class="bar pos-abs w-100 bgc-warning" style="z-index: 1;"></div>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table table-sm table-bordered mt-2 ">
                                <caption class="pb-0">金額新台幣計算</caption>
                                <tbody>
                                    <tr>
                                        <th class="bgc-light text-dark-l1 w-25" scope="row">訂單總額</th>
                                        <td class="text-110 text-secondary-d3 text-right"> {{ numberFormat(formValues.contact.orderTotal) }} </td>
                                    </tr>
                                    <tr>
                                        <th class="bgc-light text-dark-l1 w-25" scope="row">運費</th>
                                        <td class="text-110 text-secondary-d3 text-right"> {{ numberFormat(shipping) }} </td>
                                    </tr>

                                    <tr v-if="formValues.accounts.length > 0">
                                        <th class="bgc-light text-dark-l1 w-25" scope="row">已繳金額</th>
                                        <td class="text-110 text-danger text-right">{{ numberFormat(formValues.contact.paidTotal*(-1)) }}</td>
                                    </tr>
                                    
                                    <tr>
                                        <th class="bgc-light text-dark-l1 w-25" scope="row">應繳金額</th>
                                        <td class="text-110 text-success text-right">NT$ {{ total }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="card-body mt-0">
                            <div v-if="!act.isReadOnly">
                                <div v-if="formValues.accounts.length > 0" class="row">
                                    <div class="col-12 col-sm-6">
                                        <button type="submit" class="btn btn-info text-600 letter-spacing-1 btn-block btn-lg shadow-sm">
                                            修改訂單 Change Order
                                        </button>
                                    </div>
                                    <div class="col-12 col-sm-6">
                                        <button type="submit" asp-action="Edit" asp-route-repay="true"
                                            class="btn btn-primary text-600 letter-spacing-1 btn-block btn-lg shadow-sm">
                                            重新取單 Pay again
                                        </button>
                                    </div>
                                </div>
                                <div v-else>
                                    <button type="submit" asp-action="Edit" asp-route-repay="true"
                                        class="btn btn-red text-600 letter-spacing-1 btn-block btn-lg shadow-sm">
                                        確認訂單 Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Form>
        <!-- End 訂單表單 -->
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

<script lang="js">
import Members from './components/Members.vue';
import Uploads from './components/Uploads.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Field, Form, ErrorMessage } from 'vee-validate';

import { axiosResponseStatus } from '../axiosHandlingErrors';
import { dateFormat,numberFormat,dateTimeFormat } from '../Entry/format';
import { removeCookie, getCookie } from '../Entry/jscookie';

export default {
    name: 'Checkout',
    props: ['act'],
    components:{
        Field, Form, ErrorMessage,
        Members,Uploads,
    },
    data() {
        return {
            formValues: {
                contact: {
                    sendType:''
                },
                members:[],
                pendingApproval:[],
                addons:[],
                accounts:[],
            },
            paymentTypes:[],
            needUniform:false,
            allZipCode:[],
            cities:[],
            shipping:0
        }
    },
    created(){
        this.get();
    },
    computed:{
        orderId() {
            return sessionStorage.getItem("orderId");
        },
        county(){
            if (this.formValues.contact.receiveCity == '') return;
            this.formValues.contact.receiveRegion = '';
            return this.allZipCode.filter(x => x.city_name == this.formValues.contact.receiveCity);
        },
        total(){
            let result = this.formValues.contact.orderTotal + this.shipping - this.formValues.contact.paidTotal;
            return numberFormat(result);
        }
    },
    mounted() {
        axios.get('https://demeter.5fpro.com/tw/zipcodes.json').then(({ data }) => {
            this.allZipCode = data;
            this.cities = [...new Set(data.map(s => s.city_name))];
        });
    },
    methods:{
        get() {
            axios.get(`/api/order/${this.orderId}`)
                .then(({ data }) => {
                    this.formValues.contact = data;
                    this.formValues.members = data.members;
                    this.formValues.addons = data.addons;
                    this.formValues.accounts = data.accounts;
                    if (data.uniformNumber != "" || data.companyName != "") {
                        this.needUniform = true;
                    }
                    data.members.forEach(x => {
                        if (x.pendingApproval.length > 0) {
                            this.formValues.pendingApproval = [...x.pendingApproval];
                        }
                    });
                }).catch(error => axiosResponseStatus(error))
        },
        cancel(){
            Swal.fire({
                title: '是否取消報名?',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: '否!',
                confirmButtonText: '是!我要取消'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/order/${this.orderId}`).then(() => {
                        Swal.fire({ icon: 'success', title: '已取消報名，按下確認後將幫您導回至首頁' }).then(() => { this.$router.push({ name: 'HomePage' }) });
                    }).catch(error => axiosResponseStatus(error))
                }
            })
        },
        changeZipCode(){
            if(this.formValues.contact.receiveRegion === '') {
                this.formValues.contact.receivePostalCode = '';
                return;
            };
            this.formValues.contact.receivePostalCode = this.allZipCode.find(x => x.name === this.formValues.contact.receiveRegion)?.zipcode;
        },
        refund(){

        },
        onSubmit(values){
            const form = JSON.stringify(values,null,2);
        
            console.log(form);
        },
        getEmap(type){
            removeCookie('emapJson');
           
            let url = this.emapUri(type);

            let popup = window.open(url,'Emap', 'width = 1000 , height = 800');
            let vue = this;

            let popupTick = setInterval(function () {
                let emapJson = getCookie('emapJson');
                if (emapJson && popup.close) {
                    popup.close();
                    clearInterval(popupTick);
                    var jsonFormat = JSON.parse(emapJson);
                    vue.formValues.contact.storeNumber = jsonFormat.storeId;
                    vue.formValues.contact.storeName = jsonFormat.storeName;
                    vue.formValues.contact.storeAddress = jsonFormat.storeAddress;
                }
            }, 1000);
        },
        emapUri(type) {
            let whatSystem = navigator.userAgent;
            let isAndroid = whatSystem.match(/android/i);
            let isiOS = whatSystem.match(/(iphone|ipad|ipod);?/i);
            const requestUrls = encodeURIComponent(`https://localhost:7256/Api/Emap`);
            //const requestUrls = encodeURIComponent(`${window.location.origin}/Api/Emap/Index`);
            let typesInterface = (isiOS || isAndroid) ? "MOBILE" : "WEB";
            let url = "https://ssl.smse.com.tw/api/LogisticsEmap.asp?TypesInterface=" + typesInterface + "&TypesServer=" + type + "&url=" + requestUrls;
            return url;
        },
        getShipping() {
            let number = this.formValues.members.length;
            if (number === 0 || this.formValues.contact.sendType == '') return;
            axios.get(`/api/act/shipping/${this.act.actCode}`, {
                params: {
                    sendType: this.formValues.contact.sendType,
                    number:number
                }
            }).then(({data}) => this.shipping = data);
        },
        statusStyle(value){
            switch (value) {
                case "已逾期": 
                    return 'badge-danger';
                case "已繳費":
                    return 'badge-success';
                case "繳費中":
                    return 'bgc-orange-d2 text-white';
                default:
                    return 'badge-secondary';
            }
        },
        dateFormat(value){
            return dateFormat(value);
        },
        numberFormat(value){
            return numberFormat(value);
        },
        dateTimeFormat(value){
            return dateTimeFormat(value);
        }
    }
}
</script>