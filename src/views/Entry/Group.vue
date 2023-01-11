//TODO 社群分享連結
<template>
    <div class="container py-4">
        <div class="page-header pb-3">
            <h1 class="page-title text-primary-d2 text-150 d-none d-sm-block">
                {{ act.actName }}
                <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    新增團隊
                </small>

                <small class="page-info text-secondary-d2 text-nowrap">
                    <i class="fa fa-angle-double-right text-80"></i>
                    {{ formValues.contact.groupName }}
                </small>
            </h1>
        </div>
        <div class="text-right mb-3">
            <button type="button" data-toggle="modal" data-target="#editContactModal" class="btn px-4 btn-light-warning btn-text-dark mb-1"> 修改團隊資料 </button>
        </div>

        <div class="card border-0">
            <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                <div class="card-title h5">
                    {{ formValues.contact.groupName }} 團員
                    <small class="text-uppercase"> Members </small>
                </div>
            </div>
            <div class="card-body">
                <div v-if="formValues.members.length == 0" class="jumbotron text-center radius-1 d-flex justify-content-center align-items-center mt-4" style="height: 500px;">
                    <div class="container row">
                        <h2 class="col-12">{{ formValues.contact.groupName }} 還沒有參與者，請先新增隊員</h2>
                        <div class="col-4 offset-4">
                            <div v-if="formValues.contact.isShare">
                                <hr class="border-dotted brc-primary-m4 my-4" />
                                <button data-toggle="modal" data-target="#apply-share-modal"
                                        class="btn btn-lightgrey btn-h-info btn-a-outline-info btn-lg mb-1 px-4 mt-4 btn-block">
                                    分享連結報名
                                </button>
                            </div>

                            <div>
                                <hr class="border-dotted brc-primary-m4 my-4" />
                                <RouterLink :to="{name:'AddMember'}" class="btn btn-lightgrey btn-h-info btn-a-outline-info btn-lg mb-1 px-4 mt-4 btn-block">
                                    新增團員
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="my-3 text-right">
                        <button v-if="formValues.contact.isShare" data-toggle="modal" data-target="#apply-share-modal"
                                class="btn btn-lightgrey btn-h-info btn-a-outline-info mb-1 mr-2">
                            分享連結報名
                        </button>
                        <RouterLink :to="{name:'AddMember'}" class="btn btn-lightgrey btn-h-info btn-a-outline-info mb-1 mr-2">
                            新增團員
                        </RouterLink>
                    </div>
                    <!-- 團隊列表 -->
                    <Members v-bind:members="formValues.members" v-bind:isReadOnly="act.isReadOnly"></Members>
                    <!-- End 團隊列表 -->
                </div>
            </div>
            <div v-if="formValues.pendingApproval.length > 0" class="card-body">
                <Uploads :pendingApproval="formValues.pendingApproval"></Uploads>
            </div>
        </div>
        <!-- 團體加購品 -->
        <div class="card border-0 my-5">
            <div class="card-header bgc-secondary-l4 brc-green-m1 border-0 border-l-4 radius-0 text-dark-tp2 mb-1">
                <div class="card-title h5">
                    團體加購品
                    <small class="text-uppercase"> Group Add-ons </small>
                </div>
            </div>
            <Addons :addons="addons" :selectedAddons="formValues.addons" @changeCart="getAddonsResult"></Addons>
        </div>
        <!-- End 團體加購品 -->
        <div class="my-4">

            <div v-if="formValues.members.length == 0" class="alert alert-danger mb-4">
                <i class="fas fa-info-circle mr-4 text-danger"></i>
                <span>至少要有一名團隊成員才能結帳</span>
            </div>

            <button type="button" v-on:click="addAddons()"
                    class="btn btn-lighter-success btn-bgc-tp shadow-sm text-600 letter-spacing px-4 mb-1 btn-block btn-lg my-3"
                    v-bind:disabled="formValues.members.length === 0">
                <div class="pt-2">下一步:選擇付款及寄送方式</div>
                <div class="py-2">Next Step: Select payment and shipping</div>
            </button>
        </div>
        <!-- 編輯團隊資料 -->
        <div class="modal fade" id="editContactModal" tabindex="-1" aria-labelledby="editContactModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editContactModalLabel"> 編輯團隊資料 </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Form @submit="EditBase" :initial-values="formValues">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="contact.groupName" class="mb-2"> 團隊名稱 </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fa fa-users"></i> </div>
                                    </div>
                                    <Field id="contact.groupName" name="contact.groupName" label="團隊名稱" rules="required|max:15" type="text"
                                           class="form-control " placeholder="Group Name">
                                    </Field>
                                </div>
                                <ErrorMessage name="contact.groupName" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <div class="form-group">
                                <label for="contact.name" class="mb-2"> 姓名 </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fas fa-user"></i> </div>
                                    </div>
                                    <Field id="contact.name" name="contact.name" label="姓名" rules="required|max:50" type="text" class="form-control"
                                           placeholder="Leader Name (領隊預設為收件人)" aria-describedby="nameHelp">
                                    </Field>
                                </div>
                                <ErrorMessage name="contact.name" class="text-danger pt-1" as="div"></ErrorMessage>
                            </div>
                            <div class="form-group">
                                <label for="contact.email" class="mb-0"> Email </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fas fa-envelope"></i> </div>
                                    </div>
                                    <Field id="contact.email" name="contact.email" label="Email" rules="required|email" class="form-control"
                                           placeholder="Leader Email">
                                    </Field>
                                </div>
                                <ErrorMessage name="contact.email" class="text-danger pt-1" as="div"></ErrorMessage>
                            </div>
                            <div class="form-group">
                                <label for="contact.phoneNumber" class="mb-0"> 手機號碼 </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"> <i class="fas fa-mobile px-1"></i> </div>
                                    </div>
                                    <Field id="contact.phoneNumber" name="contact.phoneNumber" label="手機號碼" rules="required|max:10"
                                           class="form-control" placeholder="Leader Phone Number">
                                    </Field>
                                </div>
                                <ErrorMessage name="contact.phoneNumber" class="text-danger pt-1" as="div"></ErrorMessage>
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input id="isShare" v-model="formValues.contact.isShare" type="checkbox" class="form-check-input" data-toggle="collapse"
                                           data-target="#multiCollapseRange" aria-expanded="false" aria-controls="multiCollapseRange">
                                    <label class="form-check-label" for="isShare">是否產生分享連結</label>
                                </div>
                            </div>
                            <div id="multiCollapseRange" class="collapse" :class="{'show':formValues.contact.isShare}">
                                <div class="form-group">
                                    <label class="mb-2"> 連結有效時間 </label>
                                    <Datepicker :lang="datepickerLangs.zh" v-model:value="date" range value-type="format" format="YYYY-MM-DD"></Datepicker>
                                    <small class="form-text text-muted">可修改分享連結有效時間，時間過期與確認訂單後，將自動關閉分享連結</small>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">不儲存，關閉</button>
                            <button type="submit" class="btn btn-primary">儲存</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <!-- End 編輯團隊資料 -->
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
        <!-- Share Modal -->
        <div class="modal fade" id="apply-share-modal" tabindex="-1" aria-labelledby="apply-share-modalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="apply-share-modalLabel"> 分享 </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group mt-2 mb-3">
                            <label for="shareLink"> 連結分享 </label>
                            <div class="input-group">
                                <input type="text" v-model="formValues.contact.shareUri" class="form-control" aria-label="Join code" readonly>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" @click="copy">
                                        複製
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="mt-2 mb-3">
                            <label for="socialShareLink"> 社群連結分享 </label>
                            <div class="row mt-2">
                                <div class="col-md-5">
                                    <div class="text-150">
                                        <a href="#"><i class="bgc-green-d2 p-25 w-6 mx-1 radius-round fab fa-line text-white text-center"></i></a>
                                        <a href="#"><i class="bgc-blue-d2 p-25  mx-1 w-6 radius-round fab fa-facebook-square text-white text-center"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Share Modal -->
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import Members from './components/Members.vue';
    import Uploads from './components/uploads.vue';
    import Addons from './components/Addons.vue';
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import Datepicker from 'vue-datepicker-next';
    import 'vue-datepicker-next/index.css';
    import { datepickerLangs } from '@/js/datepickerLang';

    export default {
        name: 'Group',
        props: ['act'],
        components: {
            Field, Form, ErrorMessage, Datepicker,
            Members, Uploads, Addons
        },
        setup(){
            return { datepickerLangs }
        },
        data() {
            return {
                formValues: {
                    contact: {
                        groupName: '',
                        isShare: true,
                    },
                    addons: [],
                    members: [],
                    pendingApproval: []
                },
                addons: [],
                addonIsModify: false,
                date: [],
            }
        },
        created() {
            if (this.act.isReadOnly) {
                Swal.fire({ icon: 'error', title: '報名已截止，資料無法修改' }).then(() => {
                    this.$router.push({ name: 'HomePage' });
                });
            }
            if (this.orderId == '') {
                this.$router.push({ name: 'CreateGroup' });
            };
            this.getOrder();
            axios.get(`/api/groupaddons/${this.code}`).then(({ data }) => {
                this.addons = data;
            }).catch(error => {
                if (error.response.status === 404) {
                    this.$router.push({ name: 'CreateGroup' });
                }
            });
        },
        computed: {
            orderId() {
                return sessionStorage.getItem("orderId");
            },
            code() {
                return this.$route.params.code;
            }
        },
        methods: {
            getAddonsResult(result, modify) {
                this.addonIsModify = modify;
                this.formValues.addons = result;
            },
            getOrder() {
                axios.get(`/api/order/${this.orderId}`)
                    .then(({ data }) => {
                        this.formValues.contact = data;
                        if (this.formValues.contact.addons) {
                            this.formValues.addons = data.addons;
                        };
                        this.formValues.members = data.members;
                        data.members.forEach(x => {
                            if (x.pendingApproval.length > 0) {
                                this.formValues.pendingApproval = [...x.pendingApproval];
                            }
                        });
                        this.date = [data.startTime, data.endTime];
                    }).catch(error => {
                        if (error.response.status === 400) {
                            Swal.fire(error.response.data);
                        };
                        if (error.response.status === 404) {
                            Swal.fire("找不到資料").then(() => {
                                this.$router.push({ name: 'CreateGroup' });
                            });
                        }
                    })
            },
            EditBase(values) {
                values.contact.id = this.orderId;
                values.contact.actCode = this.code;
                values.contact.isShare = this.formValues.contact.isShare;
                values.contact.startTime = this.date[0];
                values.contact.endTime = this.date[1];

                const form = JSON.stringify(values.contact, null, 2);

                axios.patch(`/api/order/${this.orderId}`, form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.status === 204) {
                        this.getOrder();
                        $('#editContactModal').modal('hide');
                    }
                }).catch(error => {
                    if (error.response.status === 400) {
                        Swal.fire(error.response.data);
                    }
                });
            },
            addAddons() {
                if (!this.addonIsModify) {
                    this.$router.push({ name: 'Checkout' });
                    return;
                };
                let addons = {
                    orderId: this.orderId,
                    selectedAddons: this.formValues.addons
                };
                axios.post('/api/groupAddons', JSON.stringify(addons, null, 2), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.$router.push({ name: 'Checkout' });
                }).catch(error => {
                    if (error.response.status === 400 || error.response.status === 404) {
                        Swal.fire("尚未開放報名或報名已截止");
                    }
                });
            },
            copy() {
                navigator.clipboard.writeText(this.formValues.contact.shareUri);
            }
        }
    }
</script>