<template>
    <div class="container bgc-white w-100">
        <div class="page-header py-4">
            <h1 class="page-title text-primary-d2 text-150 d-none d-sm-block">
                {{ act.actName }}

                <small v-if="settings.contact.groupName" class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    {{settings.contact.groupName}}
                </small>

                <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    <span v-text="operate !== 'create' ? '編輯成員' : '新增成員'"> </span>
                </small>

            </h1>
        </div>

        <div v-show="(!isAuthenticated && this.$route.name !== 'AddMember' && operate === 'create')" class="alert alert-danger mb-4">
            <i class="fas fa-info-circle mr-4 text-danger"></i>
            <span>若您已加入會員，登入後可「快速報名」，且方便您查詢訂單，避免訂單遺漏。</span>
        </div>

        <!-- 快速報名 -->
        <div v-if="isAuthenticated" class="card border-0 mb-3">
            <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                <div class="card-title h5">
                    快速報名
                    <small class="text-uppercase"> fast registration </small>
                </div>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <button type="button" class="btn btn-grey btn-h-primary btn-a-purple px-45 mr-3" v-on:click="importUser('self')">
                        匯入個人資料
                    </button>
                    <button type="button" class="btn btn-outline-danger px-45" v-on:click="clearUser">
                        清空資料
                    </button>
                </div>
                <div class="d-flex flex-column align-items-center justify-content-center mb-3">
                    <hr class="w-100 mb-2 border-none border-t-3 brc-grey-l2 border-double">
                    <div class="mt-n4 bgc-white-tp2 px-3 py-1 text-secondary-d3 text-90"> 或 </div>
                </div>
                <select class="form-control" v-model="selectedTeammate" @change="importUser('teammate')">
                    <option selected value=""> -- 請選擇隊員資料 -- </option>
                    <template v-for="item in teams">
                        <optgroup v-if="item.teammates.length > 0" :label="item.teamName">
                            <option v-for="element in item.teammates" :value="`${item.teamId},${element.userInfoId}`" :label="element.userName"></option>
                        </optgroup>
                    </template>
                </select>
            </div>
        </div>
        <!-- End 快速報名 -->
        <VeeForm v-slot="{ handleSubmit,setFieldValue }" :initial-values="formValues" as="div" ref='form'>
            <form @submit="handleSubmit($event, onSubmit)">
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
                            <ErrorMessage name="user.nationality" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="user.rocid" label="身分證號碼" rules="required|min:6|max:10" placeholder="身分證號碼"  type="text"  class="form-control pr-4 shadow-none"></Field>
                                <i class="far fa-id-card text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">身分證或護照</label>
                            </div>
                            <ErrorMessage name="user.rocid" class="text-danger" as="div" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="user.name" label="姓名" rules="required|max:50" placeholder="姓名" type="text" class="form-control pr-4 shadow-none" maxlength="50">
                                </Field>
                                <i class="fa fa-user text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">姓名</label>
                            </div>
                            <ErrorMessage name="user.name" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">                           
                            <Field name="user.gender" label="法定性別" rules="required" class="form-control text-dark-l5" v-model="formValues.user.gender" as="select">
                                <option hidden value=""> -- 法定性別 -- </option>
                                <option value="男"> 男 </option>
                                <option value="女"> 女 </option>
                            </Field>
                            <ErrorMessage name="user.gender" class="text-danger" as="div" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <DatePicker :lang="datepickerLangs.zh" placeholder="YYYY-MM-DD Ex:1900-01-01" v-model:value="formValues.user.birthdate" value-type="format" input-class="form-control pr-4 shadow-none" format="YYYY-MM-DD" @change="setFieldValue('user.birthdate', formValues.user.birthdate)"></DatePicker>
                            <Field name="user.birthdate" label="出生年月日" rules="required" type="text" hidden></Field>
                            <ErrorMessage name="user.birthdate" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="user.email" label="email" rules="required|max:200|email" placeholder="e-mail" type="email" class="form-control pr-4 shadow-none" maxlength="200"></Field>
                                <i class="fas fa-envelope-open text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">e-mail</label>
                            </div>
                            <ErrorMessage name="user.email" class="text-danger" as="div" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="user.phoneNumber" rules="required|max:10" label="手機" placeholder="手機" type="text" class="form-control pr-4 shadow-none"></Field>
                                <i class="fas fa-mobile-alt text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">手機</label>
                            </div>
                            <ErrorMessage name="user.phoneNumber" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="user.tel" rules="required|max:20" label="市話" placeholder="市話" type="text" class="form-control pr-4 shadow-none"></Field>
                                <i class="fas fa-tty text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">市話</label>
                            </div>
                            <ErrorMessage name="user.tel" class="text-danger" as="div" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="user.emergName" rules="required|max:20" label="緊急聯絡人姓名" placeholder="緊急聯絡人姓名" type="text" class="form-control pr-4 shadow-none"></Field>
                                <i class="fas fa-user-tag text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">緊急聯絡人姓名</label>
                            </div>
                            <ErrorMessage name="user.emergName" class="text-danger" as="div" />
                        </div>
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <div class="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
                                <Field name="user.emergPhone" rules="required|max:20" label="緊急聯絡人手機/市話" placeholder="緊急聯絡人姓名" type="text" class="form-control pr-4 shadow-none"></Field>
                                <i class="fas fa-mobile-alt text-grey-m2 ml-n4"></i>
                                <label class="floating-label text-grey-l1 ml-n3">緊急聯絡人手機/市話</label>
                            </div>
                            <ErrorMessage name="user.emergPhone" class="text-danger" as="div" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- End 個人資料 -->

            <!-- 報名項目 -->
            <div class="card border-0">
                <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                    <div class="card-title h5">
                        報名項目
                        <small class="text-uppercase"> Item </small>
                        <ErrorMessage name="selectedGroup" class="text-danger" as="div" />
                    </div>
                </div>
                <div class="card-body">
                    <div class="row d-flex mx-1 mx-lg-0 btn-group btn-group-toggle" data-toggle="buttons">
                        <div v-for="item in settings.actGroup" class="col-6 col-sm-2 mb-3">
                            <Field v-slot="{ field }" label="報名項目" rules="required" name="selectedGroup" type="radio" :value="item.actGroupId" v-model="formValues.selectedGroup">
                                <label class="d-style btn btn-outline-info py-md-3 px-md-4 py-25 px-3 text-110 mr-3 shadow-sm radius-1 w-100" 
                                     v-bind:class="{'disabled':allowEntry(item) != '','active':item.actGroupId === formValues.selectedGroup}">
                                    <input class="invisible pos-abs" type="radio" name="selectedGroup" v-bind="field" :value="item.actGroupId" />
                                    {{item.name}}
                                    <span class="d-block text-90">
                                        NT$ {{item.unitPrice}}
                                        <div v-show="allowEntry(item) != ''" class="text-center text-danger text-90"> {{allowEntry(item)}} </div>
                                    </span>
                                </label>
                            </Field>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End 報名項目 -->
            <!-- 附贈項目 -->
            <div v-if="getfreebie != null" class="card border-0">
                <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                    <div class="card-title h5">
                        附贈項目
                        <small class="text-uppercase"> Item </small>
                    </div>
                </div>
                <div class="card-body pt-0 mb-4">
                    <template v-for="(element,index) in getfreebie">
                        <div class="py-2">
                            <a v-if="element.images" href="#" class="text-blue mr-1" v-on:click.prevent="showImages(element.productId)">
                                {{ i=index+1 + '、'+ element.name + (element.unitPrice == 0 || element.unitPrice == null ? "" :
                                `／$NT${element.unitPrice}`)}}
                                <i class="far fa-image text-blue w-2"></i>
                            </a>
                            <span v-else> {{ i=index+1 + '、'+ element.name + (element.unitPrice == 0 || element.unitPrice == null ? "" :
                                `／$NT${element.unitPrice}`)}} </span>
                            <span v-show="element.description"> ({{element.description}}) </span>
                        </div>
                        
                        <div v-if="element.spec !== null && element.spec.length > 0" class="mb-3 mt-2">
                            <div v-if="element.spec.length === 1">
                                <select :id="`selectedFreebie[${element.productId}].spec`" class="form-control" title="請選擇規格" required>
                                    <option value="" disabled hidden selected> -- 請選擇 -- </option>
                                    <option v-for="option in element.spec[0].list" v-bind:disabled="option.disabled"
                                        v-bind:value="`${option.title || option.name}`"
                                        v-bind:selected="freebieChecked(element.productId,(option.title || option.name))">
                                        {{ option.name || option.title }} {{ option.disabled ? "已售完" : "" }}
                                    </option>
                                </select> 
                            </div>
                            <div v-else>
                                <select :id="`selectedFreebie[${element.productId}].spec`" class="form-control" title="請選擇規格" required>
                                    <option value="" disabled hidden selected> -- 請選擇 -- </option>
                                    <optgroup v-for="options in element.spec" v-bind:label="options.key == '' ? '' : options.key">
                                        <option v-for="item in options.list" 
                                            v-bind:disabled="item.disabled"
                                            v-bind:value="item.title != '' && item.name != '' ? `${item.title}-${item.name}` : `${element.productId},${item.title}${item.name}`"
                                            v-bind:label="`${item.name || item.title} ${item.disabled ? '已售完' : ''}`"
                                            v-bind:selected="freebieChecked(element.productId,(item.title + '-' + item.name))">
                                        </option>
                                    </optgroup>
                                </select>
                            </div>
                            <ErrorMessage v-bind:name="`selectedFreebie[${element.productId}].spec`" class="text-danger" as="div" />
                        </div>
                    </template>
                </div>
            </div>
            <!-- End 附贈項目 -->

            <!-- 個人加購品 -->
            <div class="card border-0">
                <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                    <div class="card-title h5">
                        加購品
                        <small class="text-uppercase"> Personal Add-ons </small>
                    </div>
                </div>
                <Addons v-bind:addons="getAddons" :selectedAddons="selectedAddons" @changeCart="getAddonsResult"></Addons>
            </div>
            <!-- End 個人加購品 -->
            <!-- Submit -->
            <div v-if="this.$route.name === 'CreatePersonal'" class="mb-5">
                <button class="btn btn-lighter-success shadow-sm text-600 letter-spacing px-4 mb-1 btn-block btn-lg my-3">
                    <div class="pt-2">下一步:選擇付款及寄送方式</div>
                    <div class="py-2">Next Step: Select payment and shipping</div>
                </button>
            </div>
            <div v-else>
                <div class="row">
                    <div class="col-6">
                        <a @click.prevent="this.$router.go(-1)" class="btn btn-lighter-secondary btn-bgc-tp shadow-sm text-600 letter-spacing px-4 mb-1 btn-block btn-lg my-3">
                            <div class="pt-2">不儲存，回上一頁</div>
                            <div class="py-2">No Save，Redirect To Previous Page </div>
                        </a>
                    </div>
                    <div class="col-6">
                        <button v-if="this.$route.name === 'EditPersonal'" class="btn btn-lighter-success btn-bgc-tp shadow-sm text-600 letter-spacing px-4 mb-1 btn-block btn-lg my-3">
                            <div class="pt-2">確定修改資料</div>
                            <div class="py-2">Modify the data</div>
                        </button>
                        <button v-if="this.$route.name === 'AddMember'"  class="btn btn-lighter-success shadow-sm text-600 letter-spacing px-4 mb-1 btn-block btn-lg my-3">
                            <div class="pt-2">加入「 {{settings.contact.groupName}} 」隊伍</div>
                            <div class="py-2">Join in「 {{settings.contact.groupName}} 」</div>
                        </button>
                    </div>
                </div>
            </div>
        </form>
            <!-- End Submit -->
        </VeeForm>
        <!-- Product Modal -->
        <div class="modal modal-lg fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Product Modal -->
    </div>
</template>

<script lang="js">
import axios from 'axios';
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate';
import Swal from 'sweetalert2';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import { datepickerLangs } from '@/js/datepickerLang';

import { storeToRefs } from 'pinia';
import { useStore } from '@/store';
import Addons from './components/Addons.vue';
import { axiosResponseStatus } from '@/views/axiosHandlingErrors';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export default {
    name: 'Personal',
    props: ['act','operate'],
    components: {
        Field, VeeForm, ErrorMessage,
        DatePicker,
        Addons
    },
    setup() {
        const store = useStore();

        const { isAuthenticated } = storeToRefs(store);

        return {
            isAuthenticated,
            datepickerLangs
        };
    },
    data() {
        return {
            formValues: {
                user:{
                    nationality: '台灣',
                    gender:'',
                    birthdate:'',
                },
                selectedGroup:'',
                selectedFreebie:[],
            },
            freebieIsExistError:false,
            selectedAddons:[],
            settings:{
                contact:{},
                actGroup:[],
                freebie:[],
                addons:[]
            },
            teams:[],
            selectedTeammate:''
        }
    },
    created() {
        this.checkActStatus();
        if (!this.act.canSignUp && this.$route.name === 'CreatePersonal') {
            Swal.fire({ icon: 'error', title: '該場活動已結束報名' }).then(() => {
                this.$router.push({name:'HomePage'});
            })
        }

        let endpoints = [
            `/api/act/actgroup/${this.code}`,
            `/api/act/freebie/${this.code}`,
            `/api/act/addons/${this.code}`,
        ];
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then(([{ data: actGroup }, { data: freebit }, { data:addons }]) => {
                this.settings.actGroup = actGroup;
                this.settings.freebie = freebit;
                this.settings.addons = addons;
            }).catch(error => axiosResponseStatus(error));

        if (this.$route.name === 'AddMember') {
            let orderId = sessionStorage.getItem("orderId");
            if (orderId === '') {
                this.$router.push({ name: 'CreateGroup' });
            };
            axios.get(`/api/order/${orderId}`).then(({ data }) => {
                this.settings.contact = data;
            }).catch(error => axiosResponseStatus(error))
        };
        if (this.$route.name === 'EditPersonal') {
            axios.get(`/api/personal/${this.userId}`).then(({data})=>{
                this.formValues.user = data;
                this.formValues.selectedGroup = data.actGroupId;
                this.formValues.selectedFreebie = data.freebie;
                this.selectedAddons = data.addons;
            }).catch(error => axiosResponseStatus(error));
        };
        if (this.isAuthenticated) {
            axios.get('/api/team').then(({data}) => this.teams = data);
        }
    },
    computed: {
        code(){
            return this.$route.params.code;
        },
        getfreebie() {
           if (this.settings.freebie == null || this.settings.freebie.length == 0 && this.formValues.selectedGroup == 0) return null;
           return this.settings.freebie.filter(x => x.actGroupId.includes(this.formValues.selectedGroup));
        },
        getAddons() {
            if (this.settings.addons.length == 0) return;
            if (this.formValues.selectedGroup != 0) {
                return this.settings.addons.filter(x => x.actGroupId == "" || x.actGroupId?.includes(this.formValues.selectedGroup));
            }
            return this.settings.addons.filter(x => x.actGroupId == "");
        },
        userId(){
            return this.$route.params.userId;
        },
        canSignUp(){
            return this.act.canSignUp;
        }
    },
    watch:{
        "formValues.user.birthdate":function(){
            if (this.formValues.selectedGroup == 0) return;

            let group = this.settings.actGroup.find(x => x.actGroupId == this.formValues.selectedGroup);
            if (!group) return;
            let birthdate = this.formValues.user.birthdate;

            if (group.minBirthday != "" && birthdate != "" && group.minBirthday >= birthdate) {
                this.formValues.selectedGroup = 0;
            };
            if (group.maxBirthday != "" && birthdate != "" && group.maxBirthday <= birthdate) {
                this.formValues.selectedGroup = 0;
            };
        },
        "formValues.user.gender":function(){
            if (this.formValues.selectedGroup == 0) return;

            let group = this.settings.actGroup.find(x => x.actGroupId == this.formValues.selectedGroup);
            if (!group) return;
            if (group.genderLimit != "不拘" && group.genderLimit != this.formValues.user.gender) {
                this.formValues.selectedGroup = 0;
            }
        }
    },
    methods: {
        checkActStatus(){
            if (!this.act.canSignUp && this.$route.name === 'CreatePersonal') {
                Swal.fire({icon:'error',title:'該活動已結束報名'}).then(() => {
                    this.$router.push({name:'HomePage'})
                })
            }
            if (this.act.isReadOnly && (this.$route.name === 'EditPersonal' || this.$route.name === 'AddMember')) {
                Swal.fire({icon:'error',title:'報名已截止，資料無法修改'}).then(() => {
                    this.$router.push({name:'HomePage'});
                })
            }
        },
        getAddonsResult(result){
           this.selectedAddons = result;
        },
        importUser(source){
            if (!this.isAuthenticated) return;
            if (source === 'self') {
                axios.get('/api/account/user').then(({data}) => this.formValues.user = data).catch(error => axiosResponseStatus(error))
            };
            if (source === 'teammate') {
                let selected = this.selectedTeammate?.split(',');
                if (selected.length !== 2) {
                    this.formValues.user = {};
                    return;
                };
                axios.get('/api/teammate', { 
                    params: {
                        teamId:selected[0],
                        userInfoId:selected[1]
                    }
                }).then(({data}) => this.formValues.user = data)
                .catch(error => axiosResponseStatus(error));
            }
        },
        clearUser(){
            this.formValues.user = {};
        },
        onSubmit(values,actions) {
            this.freebieIsExistError = false;
            values.actCode = this.code;
            values.selectedAddons = this.selectedAddons;
            values.selectedFreebie = this.mapToselectedFreebie(actions);

            if (!this.freebieIsExistError) {
                const page = this.$route.name;
                switch (page) {
                    case 'CreatePersonal':
                        this.createPersonalOrder(values);
                        break;
                    case 'EditPersonal':
                        this.editPersonal(values);
                        break;
                    case 'AddMember':
                        this.addPersonal(values);
                        break;
                    default:
                        Swal.fire({ icon: 'error', title: '系統錯誤，請稍後再進行報名' });
                }
            }
        },
        mapToselectedFreebie(actions) {
            let temp = [];
            this.getfreebie.forEach(element => {
                let addon = {
                    productId: element.productId,
                    name: element.name,
                    spec:''
                };
                if (element.spec !== null && element.spec.length > 0) {
                    let selected = document.getElementById(`selectedFreebie[${element.productId}].spec`);
                    if (selected && selected.value == "") {
                        actions.setFieldError(`selectedFreebie[${element.productId}].spec`,`請先選擇 ${element.name} 規格`);
                        this.freebieIsExistError = true;
                        return;
                    } else {
                        addon.spec = selected.value;
                    }
                };
                temp.push(addon);
            });
            return temp;
        },
        createPersonalOrder(values){
            const form = JSON.stringify(values, null,2);
            console.log(form);
            return;
            axios.post('/api/order/personal', form, config)
                .then(response => {
                    sessionStorage.setItem("orderId", response.data.orderId);
                    this.responsedResult(response, '報名成功', 'Checkout');
                }).catch(error => axiosResponseStatus(error));
        },
        editPersonal(values) {
            values.userInfoId = this.userId;
            const form = JSON.stringify(values, null, 2);
            axios.patch(`/api/personal/${this.userId}`, form, config)
            .then(response => {
                this.responsedResult(response,'修改成功', '');
            }).catch(error => axiosResponseStatus(error));
        },
        addPersonal(values){
            values.orderId = sessionStorage.getItem("orderId");
            const form = JSON.stringify(values, null,2);

            axios.post('/api/personal/Addmember', form, config)
                .then(response => {
                    this.responsedResult(response,'報名成功', 'Group');
                }).catch(error => axiosResponseStatus(error));
        },
        responsedResult(response,title,redirctToName) {
            if (response.data.needUploads) {
                Swal.fire({
                    icon: 'success',
                    title: title,
                    text: '報名組別需上傳相關文件，您是否要現在上傳文件!?',
                    showCancelButton: true,
                    confirmButtonText: '是，我要上傳文件',
                    cancelButtonText: '否'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ name: 'UploadFile' });
                    } else {
                        if (redirctToName == '') this.$router.go(-1);
                        this.$router.push({ name: redirctToName });
                    }
                })
            } else {
                Swal.fire({icon:'success',title:title}).then(()=>{
                    if (redirctToName == '') this.$router.go(-1);
                    this.$router.push({ name: redirctToName });
                });
            }
        },
        allowEntry: function (item) {
            if (!item.canSignUp) return "報名截止";
            if (item.full) return "已額滿";

            let birthdate = this.formValues.user.birthdate;
            if ((item.minBirthday != "" && birthdate != "" && item.minBirthday >= birthdate) ||
                (item.maxBirthday != "" && birthdate != "" && item.maxBirthday <= birthdate)) {
                return "年齡不符";
            };
            if (item.genderLimit != "不拘" && item.genderLimit != this.formValues.user.gender) {
                return "性別不符";
            }
            return "";
        },
        freebieChecked: function (productId, spec) {
            if (productId == '' || spec == '') return false;
            if (this.formValues.selectedFreebie == "") return false;
            return this.formValues.selectedFreebie.find(x => x.productId == productId && x.spec.includes(spec)) != undefined;
        },
        showImages: function (productId) {
            let product = this.settings.freebie.find(x => x.productId == productId) || this.settings.addons.find(x => x.productId == productId);
            
            if (product.images == '') return;
            if (product != '') {
                let modal = $('#productModal');
                modal.modal('show');
                modal.find('.modal-title').text(product.name);
                modal.find('.modal-body').empty();
            
                $.each(product.images?.split(','), function (i, item) {
                    $('#productModal').find('.modal-body').append(
                        $('<img>', { src: item, alt: product.Name, class: "img-fluid" })
                    );
                });
            }
        },
    }
}
</script>