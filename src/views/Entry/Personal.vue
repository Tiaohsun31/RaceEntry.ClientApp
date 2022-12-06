<template>
    <div class="container bgc-white w-100">
        <div class="page-header py-4">
            <h1 class="page-title text-primary-d2 text-150 d-none d-sm-block">
                {{ act.actName }}
                <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    <span v-text="operate == 'create' ? '新增成員' : '編輯成員'"> </span>
                </small>

                <!-- <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    123
                </small> -->
            </h1>
        </div>

        <div v-show="(!isAuthenticated && operate === 'create')" class="alert alert-danger mb-4">
            <i class="fas fa-info-circle mr-4 text-danger"></i>
            <span>若您已加入會員，登入後可「快速報名」，且方便您查詢訂單，避免訂單遺漏。</span>
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
        <Form v-on:submit="onSubmit" :initial-values="formValues" >
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
                            <Field name="user.nation" label="國籍" rules="required" class="form-control text-dark-l5" as="select">
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
                            <ErrorMessage name="user.nation" class="text-danger" as="div" />
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
                            <Field name="user.gender" label="法定性別" rules="required" class="form-control text-dark-l5" v-model="formValues.gender" v-on:change="changeSelectedGroup" as="select">
                                <option hidden value=""> -- 法定性別 -- </option>
                                <option value="男"> 男 </option>
                                <option value="女"> 女 </option>
                            </Field>
                            <ErrorMessage name="user.gender" class="text-danger" as="div" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12 col-md-6 mb-lg-4 mb-3">
                            <Field name="user.birthdate" label="出生年月日" :rules="isBirthdateValue" v-slot="{ birthdate,errorMessage }">
                                <Datepicker v-bind:name="birthdate" locale="zh" placeholder="出生年月日" format="yyyy/MM/dd" showNowButton nowButtonLabel="目前日期" textInput
                                    autoApply v-model="formValues.user.birthdate" input-class="form-control text-dark-l5 pr-4 shadow-none"
                                    v-on:change="changeSelectedGroup"
                                    :enableTimePicker="false" utc>
                                </Datepicker>
                                <div class="text-danger">{{ errorMessage }}</div>
                            </Field>
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
                            <label class="d-style btn btn-outline-info py-md-3 px-md-4 py-25 px-3 text-110 mr-3 shadow-sm radius-1 w-100" v-bind:class="{'disabled':allowEntry(item) != ''}">
                                <Field class="invisible pos-abs" label="報名項目" rules="required" type="radio" name="selectedGroup" v-model="formValues.selectedGroup" v-bind:value="item.actGroupId"></Field>
                                {{item.name}}
                                <span class="d-block text-90">
                                    NT$ {{item.unitPrice}}
                                    <div v-show="allowEntry(item) != ''" class="text-center text-danger text-90"> {{allowEntry(item)}} </div>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End 報名項目 -->

            <!-- 附贈項目 -->
            <div v-if="getfreebie != null && getfreebie.length > 0" class="card border-0">
                <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                    <div class="card-title h5">
                        附贈項目
                        <small class="text-uppercase"> Item </small>
                    </div>
                </div>
                <div class="card-body pt-0 mb-4">
                    <template v-for="(element,index) in getfreebie" v-bind:key="element.productId">
                        <div class="py-2">
                            <a v-if="element.images" href="#" class="text-blue mr-1" v-on:click.prevent="showImages(element.productId)">
                                {{ i=index+1 + '、'+ element.name + (element.unitPrice == 0 || element.unitPrice == null ? "" :
                                `／$NT${element.UnitPrice}`)}}
                                <i class="far fa-image text-blue w-2"></i>
                            </a>
                            <span v-else> {{ i=index+1 + '、'+ element.name + (element.unitPrice == 0 || element.unitPrice == null ? "" :
                                `／$NT${element.unitPrice}`)}} </span>
                            <span v-show="element.description"> ({{element.description}}) </span>
                        </div>
                        <Field type="hidden" v-bind:name="`selectedFreebie[${index}].productId`" v-bind:value="element.productId" />
                        <Field type="hidden" v-bind:name="`selectedFreebie[${index}].name`" v-bind:value="element.name" />
                        <div v-if="element.specs.length > 0" class="mb-3 mt-2">
                            <div v-if="element.specs.length == 1">
                                <Field v-bind:name="`selectedFreebie[${index}].spec`" v-bind:label="element.name" class="form-control" title="請選擇規格" rules="required" as="select">
                                    <option value="" disabled hidden selected> -- 請選擇 -- </option>
                                    <option v-for="option in element.specs[0].list" v-bind:disabled="option.disabled"
                                        v-bind:value="`${option.title || option.name}`"
                                        v-bind:selected="freebieChecked(element.productId,(option.title || option.name))">
                                        {{ option.name || option.title }} {{ option.disabled ? "已售完" : "" }}
                                    </option>
                                </Field>
                            </div>
                            <div v-else>
                                <Field v-bind:name="`selectedFreebie[${index}].spec`" v-bind:label="element.name" class="form-control" title="請選擇規格" rules="required" as="select">
                                    <option value="" disabled hidden selected> -- 請選擇 -- </option>
                                    <optgroup v-for="options in element.specs" v-bind:label="options.key == '' ? '' : options.key">
                                        <option v-for="item in options.list" v-bind:disabled="item.disabled"
                                            v-bind:value="item.title != '' && item.name != '' ? `${item.title}-${item.name}` : `${item.title}${item.name}`"
                                            v-bind:selected="freebieChecked(element.productId,(item.title + '-' + item.name))">
                                            {{ item.name || item.title }} {{ item.disabled ? "已售完" : "" }}
                                        </option>
                                    </optgroup>
                                </Field>
                            </div>
                            <ErrorMessage v-bind:name="`selectedFreebie[${index}].spec`" class="text-danger" as="div" />
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
                <div v-if="formValues.selectedAddons.length > 0" class="card-body pt-3">
                    <div class="my-3">
                        <h5 class="text-120 text-grey-d3">
                            <i class="fa fa-star mr-1 text-orange text-90"></i>
                            加購明細
                        </h5>
                        <ul class="list-group">
                            <li v-for="(item,index) in formValues.selectedAddons"
                                class="list-group-item d-flex justify-content-between align-items-center">
                                {{ item.name + (item.spec == "" ? "" : `／${item.spec}`) + ' * ' + item.qty }}
                                <button type="button" class="close" aria-label="Close" v-on:click="removeCart(item)">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                    
                                <input type="hidden" name="selectedAddons.Index" v-bind:value="'A'+index" />
                                <input type="hidden" v-bind:name="'selectedAddons[A' + index + '].productId'" v-bind:value="item.productId">
                                <input type="hidden" v-bind:name="'selectedAddons[A' + index + '].name'" v-bind:value="item.name">
                                <input type="hidden" v-bind:name="'selectedAddons[A' + index + '].spec'" v-bind:value="item.spec">
                                <input type="hidden" v-bind:name="'selectedAddons[A' + index + '].qty'" v-bind:value="item.qty">
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="getAddons != null && getAddons.length > 0" class="card-body pt-3">
                    <div class="row text-600 text-95 text-secondary-d3 bgc-grey-l4 py-25 border-y-2">
                        <div class="d-none d-sm-block col-2"> </div>
                        <div class="col-12 col-sm-4"> 商品名稱與描述 </div>
                        <div class="col-sm-2 d-none d-sm-block"> 單價 </div>
                        <div class="col-sm-2 d-none d-sm-block"> 規格 </div>
                        <div class="col-sm-2 d-none d-sm-block"> 數量 </div>
                    </div>
                    <div class="text-95 text-dark-m3">
                        <div class="row pb-2 mb-sm-0 py-sm-2 border-b-1 brc-secondary-l3 align-items-center" v-for="element in getAddons">
                            <div class="d-none d-sm-block col-2">
                                <img v-show="element.thumbnail" class="radius-1 mb-1 mb-sm-0 mr-3" v-bind:alt="element.name" style="width: 100px; height: 100px;" v-bind:src="element.thumbnail">
                            </div>
                    
                            <div class="col-12 col-sm-4 px-0">
                                <div class="d-block d-sm-none text-center py-25 bgc-blue-l3 border-b-1 brc-secondary-l3">
                                    <span v-if="element.images" v-text="element.name"></span>
                                    <a v-else href="#" class="btn-text-dark btn-h-text-primary"
                                        v-on:click.prevent="showImages(element.productId)">
                                        {{element.name}} <i class="far fa-image w-2"></i>
                                    </a>
                                    <span v-if="element.label" class="badge bgc-pink text-white text-xs ml-1" v-text="element.label"></span>
                                </div>
                                <div class="d-none d-sm-inline-block text-120">
                                    <span v-if="element.images" v-text="element.name"></span>
                                    <a v-else href="#" class="btn-text-dark btn-h-text-primary"
                                        v-on:click.prevent="showImages(element.productId)">
                                        {{element.name}} <i class="far fa-image w-2"></i>
                                    </a>
                                    <span v-if="element.label" class="badge bgc-pink text-white text-xs ml-2" v-text="element.label"></span>
                                </div>
                                <div class="mt-1 d-none d-sm-block" v-text="element.description"></div>
                            </div>
                    
                            <div class="col-sm-2 col-4 mt-2" v-text="'NT$'+element.unitPrice"></div>
                    
                            <div class="col-sm-2 col-4 mt-2">
                                <div v-if="element.specs.length">
                                    <input type="hidden" v-bind:value="element.name">
                                    <template v-if="element.specs.length == 1">
                                        <select v-bind:id="'addonsSpecs'+element.productId" class="form-control" v-on:change="resetQty(element.ProductId)">
                                            <option value="" disabled hidden selected> -- 請選擇 -- </option>
                                            <option v-for="option in element.specs[0].list" v-bind:disabled="option.disabled" v-bind:value="(option.name || option.title)">
                                                {{ option.name || option.title }}
                                                {{ option.disabled ? "已售完" : "" }}
                                            </option>
                                        </select>
                                    </template>
                                    <template v-else>
                                        <select v-bind:id="'addonsSpecs'+element.productId" class="form-control"
                                            v-on:change="resetQty(element.productId)">
                                            <option value="" disabled hidden selected> -- 請選擇 -- </option>
                                            <optgroup v-for="options in element.specs" v-bind:label="options.key == null ? '' : options.key">
                                                <option v-for="item in options.list" v-bind:disabled="item.disabled"
                                                    v-bind:value="item.title != '' && item.name != '' ? `${item.title}-${item.name}` : `${item.title}${item.name}`">
                                                    {{ item.name || item.title }}
                                                    {{ item.disabled ? "已售完" : "" }}
                                                </option>
                                            </optgroup>
                                        </select>
                                    </template>
                                </div>
                            </div>
                            <div class="col-sm-2 col-4 mt-2">
                                <select class="form-control" v-bind:id="'addonsQty'+element.productId" v-on:change="addCart($event.target,element)">
                                    <option value="0">0</option>
                                    <option v-bind:value="n" v-for="n in element.limitQty" v-text="n"></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End 個人加購品 -->
            <!-- Submit -->
            <div>
                <button type="submit" class="btn btn-lighter-success shadow-sm text-600 letter-spacing px-4 mb-1 btn-block btn-lg my-3">
                    <div class="pt-2">下一步:選擇付款及寄送方式</div>
                    <div class="py-2">Next Step: Select payment and shipping</div>
                </button>
            </div>
            <!-- End Submit -->
        </Form>
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

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage  } from 'vee-validate';
// import AllRules from '@vee-validate/rules';
// import { localize, setLocale } from '@vee-validate/i18n';
// import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import Swal from 'sweetalert2';
//import * as yup from 'yup';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Object.keys(AllRules).forEach(rule => {
//   defineRule(rule, AllRules[rule]);
// });

// configure({
//   generateMessage: localize({ zh_TW: zhTW }),
//   validateOnInput: true
// })
// setLocale('zh_TW')

// const schema = yup.object({
//     nation: yup.string().required("國籍 是必填欄"),
//     rocid: yup.string().required("身分證或護照 是必填欄").min(6,`身分證或護照 至少 6 位數`).max(10,`身分證或護照 至多 10 位數`),
//     name:yup.string().required("姓名 為必填欄").max(50,"姓名 最多可輸入 50 字"),
//     gender:yup.string().required("法定性別 為必填欄位"),
//     birthdate:yup.string().required("出生年月日 為必填欄位"),
//     email:yup.string().required("Email 為必填欄位").max(200,"Email 最多可輸入 200 字"),
//     phoneNumber:yup.string().required("手機 為必填欄位").max(10,"手機號碼 最多可輸入 10 字"),
//     tel:yup.string().max(20,"市話 最多可輸入 20 字"),
//     emergName:yup.string().max(20,"緊急連絡人 最多可輸入 50 字"),
//     emergPhone:yup.string().max(20,"緊急連絡人電話 最多可輸入 50 字"),
//     //selectedGroup:yup.number().required("請選擇參賽組別")
// });
const schema = {
    // nation: 'required',
    // rocid:'required|min:6|max:10',
    // name:'required|max:50',
    // gender:'required',
    // birthdate:'required',
    // email:'required|max:200',
    // phoneNumber:'required|max:10',
    // tel:'required|max:20',
    // emergName:'required|max:20',
    // emergPhone:'required|max:20',
    // selectedGroup:'integer|required',
    // selectedFreebie:'required'
};

export default {
    name: 'Personal',
    props: ['act','operate'],
    components: {
        Field, Form, ErrorMessage,
        Datepicker 
    },
    setup(){
        return {
            schema
        }
    },
    data() {
        return {
            formValues: {
                user:{
                    nation: '台灣',
                    gender:'',
                    birthdate:'',
                },
                selectedGroup:'',
                selectedFreebie:[],
                selectedAddons:[]
            },
            settings:{
                actGroup:[],
                freebie:[],
                addons:[]
            }
        }
    },
    created() {
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
            }).catch(error => {
                if (error.response.status === 404) {
                    this.$router.push({ name: 'NotFound' });
                }
            });
    },
    computed: {
        code(){
            return this.$route.params.code;
        },
        getfreebie() {
            if (this.formValues.selectedGroup == 0) return null;
            let temp = this.settings.freebie.filter(x => x.actGroupId.includes(this.formValues.selectedGroup));
            this.formValues.selectedFreebie = temp;
            return temp;
        },
        getAddons() {
            if (this.formValues.selectedGroup != 0) {
                return this.settings.addons.filter(x => x.actGroupId == null || x.actGroupId?.includes(this.formValues.selectedGroup));
            }
            return this.settings.addons.filter(x => x.actGroupId == null);
        },
        isAuthenticated(){
            return this.$store.state.isAuthenticated;
        }
    },
    methods: {
        onSubmit(values) {
            values.selectedAddons = this.formValues.selectedAddons;
            values.actCode = this.code;

            const form = JSON.stringify(values, null,2);
            console.log(vm);

            axios.post(`/api/personal`, form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => { console.log(response) })
            .catch(error => {
                console.log(error);
                if (error.response.status === 404) {
                    this.$router.push({ name: 'NotFound' });
                };
                if (error.response.status === 400) {
                    Swal.fire(error.response.data);
                }
            });
        },
        isBirthdateValue() {
            if (this.formValues.user.birthdate && this.formValues.user.birthdate.trim()) {
                return true;
            }
            return '出生年月日 為必填';
        },
        inputMask:function(event) {
            this.formValues.rocid = event.target.value;
        },
        changeSelectedGroup() {
            let birthdate = this.formValues.birthdate;
            if (this.formValues.selectedGroup == 0) return;
            let group = this.settings.actGroup.find(x => x.actGroupId == this.formValues.selectedGroup);
            if (group.minBirthday != null && birthdate != null && group.minBirthday >= birthdate) {
                this.formValues.selectedGroup = 0;
            };
            if (group.maxBirthday != null && birthdate != null && group.maxBirthday <= birthdate) {
                this.formValues.selectedGroup = 0;
            };
            if (group.genderLimit != "不拘" && group.genderLimit != this.formValues.gender) {
                this.formValues.selectedGroup = 0;
            }
        },
        allowEntry: function (item) {
            if (!item.canSignUp) return "報名截止";
            if (item.full) return "已額滿";

            let birthdate = this.formValues.birthdate;
            if ((item.minBirthday != null && birthdate != null && item.minBirthday >= birthdate) ||
                (item.maxBirthday != null && birthdate != null && item.maxBirthday <= birthdate)) {
                return "年齡不符";
            };
            if (item.genderLimit != "不拘" && item.genderLimit != this.formValues.gender) {
                return "性別不符";
            }
            return "";
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
        freebieChecked: function (productId, spec) {
            if (productId == '' || spec == '') return false;
            if (this.formValues.selectedFreebie > 0) return false;
            return this.formValues.selectedFreebie.find(x => x.productId == productId && x.spec?.includes(spec)) != undefined;
        },
        resetQty(productId) {
            $('#addonsQty' + productId).val(0);
        },
        addCart: function (target, element) {
            let selectedQty = $('#' + target.id + " :selected").val();
            let addons = {
                productId: element.productId,
                name: element.name,
                qty: selectedQty,
                spec: ""
            };

            if (element.specs.length > 0) {
                let selectedSpec = $('#addonsSpecs' + element.productId + " :selected").val();
                if (selectedSpec == "") {
                    $('#' + target.id).val(0);
                    Swal.fire({ icon: 'warning', text: `請先選擇 ${element.name} 規格` });
                    return;
                } else {
                    addons.spec = selectedSpec;
                }
            };

            let findCart = this.findCart(addons.productId, addons.spec);
            if (findCart == -1) {
                if (selectedQty > 0) this.formValues.selectedAddons.push(addons);
            } else {
                if (selectedQty == 0) {
                    this.removeCart(addons);
                } else {
                    this.formValues.selectedAddons[findCart].qty = selectedQty;
                }
            }
        },
        findCart: function (productId, spec) {
            if (spec != "") {
                return this.formValues.selectedAddons.findIndex(x => x.productId == productId && x.spec == spec);
            }
            return this.formValues.selectedAddons.findIndex(x => x.productId == productId);
        },
        removeCart: function (element) {
            let findCart = this.findCart(element.productId, element.spec);
            if (findCart != -1) {
                this.formValues.selectedAddons.splice(findCart, 1);
            };
        },
    }
}
</script>