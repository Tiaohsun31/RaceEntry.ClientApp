<template>
    <div class="container my-4">
        <div class="page-header pb-3">
            <h1 class="page-title text-primary-d2 text-150 d-none d-sm-block">
                {{ act.actName }}
                <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    退款
                </small>
            </h1>
        </div>
        <hr>
        <div class="h4 text-dark mt-2"> 訂單資訊 </div>
        <div class="pos-rel">
            <div class="text-90 py-1 px-4 pos-rel text-white d-inline-block text-uppercase" style="background-color: #e95419;z-index: 2;">Order Infomation</div>
            <div class="bar pos-abs w-100" style="background-color: #e95419;z-index: 1;"></div>
        </div>
        <Form @submit="onSubmit">
        
        <div class="row">
            <div class="col-12 col-md-4">
                <div class="acard card-body">
                    <div class="form-group row">
                        <div class="col-md-4"> <strong>訂單編號</strong> </div>
                        <div class="col-md-8"> {{ order.orderId }} </div>
                    </div>
                    <hr class="border-dotted my-3">
                    <div class="form-group row">
                        <div class="col-md-4"> <strong>訂購人</strong> </div>
                        <div class="col-md-8"> {{ order.name }} </div>
                    </div>
                    <hr class="border-dotted my-3">
                    <div class="form-group row">
                        <div class="col-md-4"> <strong>已繳金額</strong> </div>
                        <div class="col-md-8"> NT$ {{ numberFormat(order.paidTotal) }} </div>
                    </div>
                    <hr class="border-dotted my-3">
                    <label class="font-bold form-label"> 申請項目 </label>
                    <div class="dropdown-clickable list-group p-0">
                        <label class="list-group-item px-3 py-2 mb-0 bgc-h-default-l3 border-0">
                            <Field name="category" type="radio" value="全額退費" class="mr-1 align-sub" v-model="category"></Field>
                            全額退費
                        </label>

                        <label class="list-group-item px-3 py-2 mb-0 bgc-h-default-l3 border-0">
                            <Field name="category" type="radio" value="部分退費" class="mr-1 align-sub" v-model="category"></Field>
                            部分退費
                        </label>
                    
                        <label class="list-group-item px-3 py-2 mb-0 bgc-h-default-l3 border-0">
                            <Field name="category" type="radio" value="自訂金額" class="mr-1 align-sub" v-model="category"></Field>
                            自訂金額
                        </label>
                    </div>
                    <div class="mt-3 mb-2">
                        <div class="form-group">
                            <label class="font-bold"> 申請退款金額 </label>
                            <Field name="amount" v-slot="{field,value}" v-model="calc" label="退款金額" rules="min:1|max:99999|required">
                                <input v-bind="field" type="number" class="form-control" :value="value">
                            </Field>
                            <ErrorMessage name="amount" class="text-danger" as="div"></ErrorMessage>
                            <div class=" text-danger text-center mt-2"> 若有行政手續費，將從退款金額扣除 </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="category === '部分退費'" class="col-md-8 col-12 mt-2">
                <div v-for="item in order.members">
                    <label> 成員: {{ item.name }} </label>
                    <table :id="'table'+item.userInfoId" class="table table-sm table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden">
                        <thead class="text-dark-tp3 bgc-grey-l4 border-b-1 brc-transparent">
                            <tr>
                                <th class="text-center pr-0" >
                                    <label class="py-0">
                                        <input type="checkbox" class="align-bottom mb-n1 border-2 text-dark-m3" @click="checkedThead($event,'table'+item.userInfoId,item.options)" />
                                    </label>
                                </th>
                                <th> 類型 </th>
                                <th> 項目 </th>
                                <th> 金額 </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="element in item.options" class="bgc-h-yellow-l4 d-style" @click="checkedRow($event,element)">
                               <template v-if="element.subTotal > 0">
                                    <td class="text-center pr-0 pos-rel">
                                        <div class="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover">
                                            <!-- border shown on hover -->
                                        </div>
                                        <div class="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active">
                                            <!-- border shown when row is selected -->
                                        </div>
                                                
                                        <label>
                                            <input type="checkbox" class="align-middle">
                                        </label>
                                    </td>
                                    <td v-text="element.optionType"></td>
                                    <td v-text="element.productName + element.productSpec"></td>
                                    <td v-text="'$'+element.subTotal"></td>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="card acard mt-5">
            <div class="h4 text-dark mt-2"> 退款資料填寫 </div>
            <div class="pos-rel">
                <div class="text-90 py-1 px-4 pos-rel text-white d-inline-block text-uppercase bgc-secondary" style="z-index: 2;">Refund Infomation</div>
                <div class="bar pos-abs w-100 bgc-secondary" style="z-index: 1;"></div>
            </div>
            <div class="card-body">
                <div class="row">
                    <RefundForm @update="updateInfo"></RefundForm>
                    <div class="col-12 mb-4">
                        <label for="inputAccountName" class=""> 退款原因／Reason </label>
                        <Field name="reason" label="退款原因" rules="max:500" v-slot="{field,value}">
                            <textarea v-bind="field" rows="5" id="inputAccountName" class="form-control">
                                {{ value }}
                            </textarea>
                        </Field>
                        <ErrorMessage name="reason" class="text-danger" as="div"></ErrorMessage>
                    </div>
                    <div class="col-12 mt-2 mb-4">
                        <button type="submit" class="btn btn-primary btn-block btn-lg"> 送出 </button>
                    </div>
                </div>
            </div>
        </div>
        </Form>
    </div>
</template>
<script lang="js">
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import { dateFormat,numberFormat,dateTimeFormat } from '@/js/format';
    import RefundForm from '@/components/Member/RefundForm.vue';
    export default {
        name:'Refund',
        components:{
            Field,Form,ErrorMessage,
            RefundForm
        },
        props:['act'],
        data(){
            return {
                order:{},
                category:'全額退費',
                selected:[],
                formValues:{
                    refundSetting:''
                }
            }
        },
        setup(){
            return { dateFormat,numberFormat,dateTimeFormat }
        },
        created(){
            axios.get(`/api/order/${this.orderId}`).then(({data}) => this.order = data);
        },
        computed:{
            orderId(){
                return sessionStorage.getItem("orderId");
            },
            calc() {
                if (this.category == '全額退費') return this.order.paidTotal;
                if (this.category == '部分退費' && this.selected.length != 0) {
                    let amount = this.selected.map(x => x.subTotal).reduce((a, b) => a + b);
                    return this.order.paidTotal <= amount ? this.order.paidTotal : amount;
                }
                return 0;
            },
            code(){
                return this.$route.params.code;
            }
        },
        methods:{
            checkedThead(e,selectedId,options){
                let checked = e.currentTarget.checked;
                let my = this;
                
                $(`#${selectedId} tbody input[type=checkbox]`).each(function() {
                    this.checked = checked;
                    let row = $(this).closest('tr').get(0);
                    my.highlight(row, checked);
                });
                options.forEach(element => {
                    let any = this.selected.findIndex(x => x == element);
                    if (element.subTotal > 0 && any === -1 && checked) {
                        this.selected.push(element);
                    }
                    else if (any !== -1 && !checked) {
                        this.selected.splice(any, 1);
                    }
                })
            },
            checkedRow(e,option){
                var ret = false;
                try {
                    ret = e.target.classList.contains('btn') || e.target.parentNode.classList.contains('btn') || e.target.closest('.dropdown') != null
                } catch (err) {
                }
                if (ret) return;

                var inp = e.currentTarget.querySelector('input');
                if (inp == null) return;

                if (e.target.tagName != "INPUT") {
                    inp.checked = !inp.checked;
                }
                this.highlight(e.currentTarget, inp.checked);

                let any = this.selected.findIndex(x => x.optionId == option.optionId);
                if (inp.checked && any === -1) {
                    this.selected.push(option);
                } else {
                    this.selected.splice(any, 1);
                }
            },
            highlight(row, checked) {
                if (checked) {
                    row.classList.add('active');
                    row.classList.add('bgc-success-l3');
                    row.classList.remove('bgc-h-default-l3');
                } else {
                    row.classList.remove('active');
                    row.classList.remove('bgc-success-l3');
                    row.classList.add('bgc-h-default-l3');
                }
            },
            updateInfo(val) {},
            onSubmit(values){

                const form = JSON.stringify(values,null,2);

                if (values.amount != 0 && this.order.paidTotal != 0 && values.amount <= this.order.paidTotal) {
                    axios.post(`/api/refund/${this.orderId}`,form,{
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        Swal.fire({ icon: 'success', title: '已申請退款' });
                    }).catch(error => {
                        if (error.response.status === 400) {
                            Swal.fire({ icon: 'error', title: `${error.response.data.title | error.response.data}` });
                        }
                        if (error.response.status === 404) {
                            this.$router.push({ name: 'NotFound' });
                        }
                    })
                } else {
                    Swal.fire({ icon: 'error', title: '退款金額為0' });
                }
            }
        }
    }
</script>