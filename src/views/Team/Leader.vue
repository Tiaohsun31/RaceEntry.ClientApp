<template>
    <Layout>
        <div class="container my-5">
            <RouterLink :to="{ name: 'MemberIndex' }"
                class="btn btn-bgc-white btn-outline-default px-35 btn-text-slide-x mb-3">
                <i class="btn-text-2 fa fa-arrow-left text-110 align-text-bottom mr-2"></i>
                回 會員專區
            </RouterLink>
            <div v-if="teams.length > 0" class="text-right my-3">
                <button @click="createModal" type="button"
                    class="btn btn-blue px-3 text-95 radius-round border-2 brc-black-tp10">
                    <i class="fa fa-plus mr-1"></i>
                    新增隊伍
                </button>
                <table class="table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden mt-3">
                    <thead class="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
                        <tr>
                            <th> 隊伍名稱 </th>
                            <th class="d-none d-sm-table-cell"> 成立日期 </th>
                            <th class="d-none d-sm-table-cell"> 邀請碼 </th>
                            <th class="text-center"> 狀態 </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in teams">
                            <tr class="bgc-h-yellow-l4 d-style bgc-h-default-l3">
                                <td class="pr-0 pos-rel">
                                    <div class="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                                    <a href="#" data-toggle="collapse" 
                                        :data-target="'#table-detail-'+index"
                                        :title="`顯示${item.itemName}隊員`"
                                        class="text-blue-d1 text-600 text-95 collapsed">
                                        {{item.teamName}}
                                        <i class="fa fa-angle-down toggle-icon opacity-1 text-100"></i>
                                    </a>
                                </td>
                                <td class="d-none d-sm-table-cell" v-text="dateFormat(item.createAt)"></td>
                                <td class="d-none d-sm-table-cell"> 
                                    <a href="#" class="mr-1" 
                                        :id="'C'+item.joinCode"
                                        v-text="item.joinCode" @click.prevent="copy(item.joinCode, $event)" 
                                        data-placement="top"
                                        data-original-title="已複製"> 
                                    </a>
                                </td>
                                <td class="text-center">
                                    <div v-if="item.status === 0">
                                        <span class="badge badge-sm bgc-red-d1 text-white pb-1 px-25">關閉中</span>
                                    </div>
                                    <div v-else>
                                        <span class="badge badge-sm bgc-green-d1 text-white pb-1 px-25">開放中</span>
                                        <small class="d-none d-sm-inline ml-1 text-secondary-d1"
                                            v-text="statusRangeDate(item.startTime,item.endTime)">
                                        </small>
                                    </div>
                                </td>
                                <td class="text-right">
                                    <div class="d-none d-lg-inline">
                                        <!-- <a v-bind:href="'/team/player/create?joincode='+item.joinCode+'&status=true'"
                                            v-bind:class="item.status == 0 ? 'disabled' : ''"
                                            class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-green btn-a-lighter-green">
                                            <i class="fa fa-plus mr-1"></i> 新增隊員
                                        </a> -->
                                        <!-- <button type="button" @click="shownShare(item.teamId)"
                                            class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-info btn-a-lighter-info"
                                            v-bind:class="item.status === 0 ? 'disabled' : ''">
                                            <i class="fas fa-share-alt mr-1"></i>
                                            分享
                                        </button> -->
                                        <button type="button" v-on:click="editModal(item.teamId)"
                                            class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-warning btn-a-lighter-warning">
                                            <i class="fa fa-pencil-alt mr-1"></i>
                                            編輯
                                        </button>
                                        <button type="button" @click="deleteTeam(item.teamId,item.teamName)"
                                            class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-danger btn-a-lighter-danger">
                                            <i class="fa fa-trash-alt mr-1"></i>
                                            刪除
                                        </button>
                                    </div>
                                    <!-- show a dropdown in mobile -->
                                    <div class="dropdown d-inline-block d-lg-none dd-backdrop dd-backdrop-none-lg">
                                        <a href="#" class="btn btn-default btn-xs py-15 radius-round dropdown-toggle" data-toggle="dropdown">
                                            <i class="fa fa-cog"></i>
                                        </a>
                        
                                        <div class="dropdown-menu dd-slide-up dd-slide-none-lg">
                                            <div class="dropdown-inner">
                                                <div class="dropdown-header text-100 text-secondary-d1 border-b-1 brc-secondary-l2 text-600 mb-2"
                                                    v-text="item.teamName">
                                                </div>
                                                <!-- <a v-bind:href="'/team/player/create?joincode='+item.joinCode+'&status=true'"
                                                    class="dropdown-item" v-bind:class="item.status == 0 ? 'disabled' : ''">
                                                    <i class="fa fa-plus text-success mr-1 p-2 w-4"></i> 新增隊員
                                                </a>
                                                <a href="#" v-on:click.prevent="shownShare(item.teamId)" class="dropdown-item"
                                                    v-bind:class="item.status == 0 ? 'disabled' : ''">
                                                    <i class="far fa-flag text-info-d1 mr-1 p-2 w-4"></i>
                                                    分享
                                                </a> -->
                                                <a href="#" @click.prevent="editModal(item.teamId)" class="dropdown-item">
                                                    <i class="fa fa-pencil-alt text-orange mr-1 p-2 w-4"></i>
                                                    編輯
                                                </a>
                                                <a href="#" @click.prevent="deleteTeam(item.teamId)" class="dropdown-item">
                                                    <i class="fa fa-trash-alt text-danger-m1 mr-1 p-2 w-4"></i>
                                                    刪除
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-0 detail-row bgc-white">
                                <td colspan="8" class="p-0 border-none brc-secondary-l2">
                                    <div class="table-detail collapse" v-bind:id="'table-detail-'+index">
                                        <div class="py-md-3 px-md-5 p-2">
                                            <table v-if="item.teamPlayers.length > 0" class="table table-striped-secondary">
                                                <thead class="border-0">
                                                    <tr class="border-0 bgc-orange-d1 text-white">
                                                        <th class="border-0 pl-md-4"> 姓名 </th>
                                                        <th class="border-0"> 電話 </th>
                                                        <th class="border-0 d-none d-sm-table-cell"> 加入日期 </th>
                                                        <th class="border-0 d-none d-sm-table-cell"> 緊急連絡人 </th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                            
                                                <tbody class="text-dark-tp3 opacity-1 text-95 text-600">
                                                    <template v-for="element in item.teamPlayers">
                                                        <tr class="bgc-h-warning-l4">
                                                            <td class="pl-md-4" v-text="element.userName"></td>
                                                            <td v-text="element.userPhoneNumber"></td>
                                                            <td class="d-none d-sm-table-cell" v-text="shortDate(element.joinDate)"></td>
                                                            <td class="d-none d-sm-table-cell"
                                                                v-text="element.emergency != '' ? '緊急聯絡人:'+element.emergency : ''"></td>
                                                            <td>
                                                                <form action="/team/player/edit" method="post" class="d-inline-block">
                                                                    <input type="hidden" name="userInfoId" v-bind:value="element.userInfoId" />
                                                                    <input type="hidden" name="teamId" v-bind:value="item.teamId" />
                                                                    <button type="submit" title="編輯"
                                                                        class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-warning btn-a-lighter-warning">
                                                                        <i class="fa fa-pencil-alt mr-md-1"></i>
                                                                        <span class="d-none d-sm-inline">編輯</span>
                                                                    </button>
                                                                </form>
                                                                <button type="button" title="刪除"
                                                                    v-on:click="deletePlayer(item.teamId,element.userInfoId,element.userName)"
                                                                    class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-danger btn-a-lighter-danger">
                                                                    <i class="fa fa-trash-alt mr-md-1"></i>
                                                                    <span class="d-none d-sm-inline">刪除</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </tbody>
                                            </table>
                                            <div v-else class="text-left text-warning">
                                                <div class="alert bgc-primary-l4 brc-primary-m4 d-flex align-items-center text-dark-tp2" role="alert">
                                                    <i class="fas fa-info-circle mr-3 fa-2x text-blue"></i>
                                                    暫無成員
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div v-else class="jumbotron text-center radius-1 d-flex justify-content-center align-items-center mt-5" style="height: 500px;">
                <div class="container">
                    <h1 class="display-4">您尚未擁有任何隊伍</h1>
                    <button @click="createModal" type="button"
                        class="btn btn-success btn-lg btn-h-outline-success btn-a-outline-success mb-1 px-4 mt-4">
                        <i class="fa fa-plus mr-1"></i>
                        新增隊伍
                    </button>
                </div>
            </div>
           
        </div>
        <!-- 隊伍 Modal -->
        <div class="modal fade" id="apply-modal" tabindex="-1" aria-labelledby="apply-modalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content ">
                    <div class="modal-header">
                        <h5 class="modal-title" id="apply-modalLabel"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Form ref="form" @submit="onSubmit" autocomplete="off"> 
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="inputTeamName">
                                    <i class="fas fa-star text-danger mr-1"></i>隊伍名稱
                                </label>
                                <Field name="teamName" v-model="formValues.teamName" rules="required|max:12" label="隊伍名稱" id="inputTeamName" class="form-control"></Field>
                                <ErrorMessage name="teamName" class="text-danger" as="div"></ErrorMessage>
                            </div>

                            <div class="form-group">
                                <label for="summary">隊伍簡介</label>
                                <Field name="summary" label="隊伍簡介" rules="max:300" v-model="formValues.summary" v-slot="{field,value}">
                                    <textarea v-bind="field" rows="5" id="summary" class="form-control">
                                        {{ value }}
                                    </textarea>
                                </Field>
                                <ErrorMessage name="summary" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            
                            <div class="form-group">
                                <label for="status"> <i class="fas fa-star text-danger mr-1"></i>開放申請? </label>
                                <Field name="status" rules="required" label="狀態" class="form-check mb-2" v-model="formValues.status" :value="formValues.status" v-slot="{field,value,errorMessage}" as="div" >
                                    <div class="form-check mb-2">
                                        <input v-bind="field" type="radio" class="form-check-input mr-2" id="radio-close" :checked="value === 0" :value="0">
                                        <label class="form-check-label" for="radio-close">
                                            關閉
                                        </label>
                                    </div>
                                    <div class="form-check mb-2">
                                        <input v-bind="field" type="radio" class="form-check-input mr-2" id="radio-open" :checked="value === 1" :value="1">
                                        <label class="form-check-label" for="radio-open">
                                            開放
                                        </label>
                                    </div>
                                    <div class="text-danger"> {{ errorMessage }} </div>
                                </Field> 
                                <ErrorMessage name="status" class="text-danger" as="div"></ErrorMessage>
                            </div>
                            <div class="form-gruop">
                                <label for="inputApplyTime"> 設置可申請入隊時間 </label>
                                <Datepicker :lang="datepickerLangs.zh" v-model:value="date" range value-type="format" format="YYYY-MM-DD"></Datepicker>
                                <small class="form-text text-muted">未設置區間，則代表無申請期限</small>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">儲存</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <!-- End 隊伍 Modal -->
        <!-- Share Modal -->
        <div class="modal fade" id="apply-share-modal" tabindex="-1" aria-labelledby="apply-share-modalLabel" aria-hidden="true">
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
                            <label for="joinCode"> 邀請碼 </label>
                            <form method="post">
                                <div class="input-group">
                                    <input type="text" class="form-control" aria-label="Join code" v-bind:value="shareModal.joinCode" readonly>
                                    <input name="key" type="hidden" v-bind:value="shareModal.key">
                                    <div class="input-group-append">
                                        <button asp-action="UpdateJoinCode" class="btn btn-outline-secondary" type="submit">更新</button>
                                        <button class="btn btn-outline-secondary" type="button" v-on:click="copy(shareModal.joinCode,$event)" v-bind:id="'FC'+shareModal.joinCode" data-placement="top" data-original-title="已複製">複製</button>
                                    </div>
                                </div>
                            </form>
                            <small class="form-text text-muted">可透過分享「邀請碼」，邀請他人加入隊伍</small>
                        </div>
                        <hr>
                        <div class="form-group mt-2 mb-3">
                            <label for="shareLink"> 連結分享 </label>
                            <div class="input-group">
                                <input type="text" class="form-control" aria-label="Join code" v-bind:value="shareModal.joinShareUri" readonly>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" v-bind:id="'FU'+shareModal.joinCode" v-on:click="copy(shareModal.joinShareUri,$event)" type="button" data-placement="top" data-original-title="已複製">複製</button>
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
    </Layout>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Field, Form, ErrorMessage } from 'vee-validate';

import Datepicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import { datepickerLangs } from '@/js/datepickerLang';

import { dateFormat } from '@/js/format';

export default {
    name: 'Leader',
    components:{
        Field, Form, ErrorMessage,
        Datepicker
    },
    setup(){
        return { datepickerLangs,dateFormat }
    },
    data() {
        return {
            teams: [],
            operate:'create',
            formValues: {
                teamName: '123',
                summary: '',
                status: 1,
            },
            date: [],
            lastTooltip: '',
            shareModal: {
                key: '',
                joinCode: '',
                joinShareUri: '',
            },
        }
    },
    created(){
        this.gets();
    },
    methods: {
        gets(){
            axios.get('/api/Team').then(({data}) => this.teams = data);
        },
        createModal() {
            let teamModal = $('#apply-modal');
            teamModal.modal('show');
            teamModal.find('.modal-title').text('新增隊伍');
            this.formValues.teamName = '';
            this.formValues.summary = '';
            this.formValues.status = 1;
            this.date = [];
            this.operate = 'create';
        },
        editModal(id) {
            let team = this.teams.find(x => x.teamId == id);
            if (team == null) return false;

            this.formValues = Object.assign({}, team);
            this.date = [team.startTime,team.endTime];
            this.operate = 'edit';

            let teamModal = $('#apply-modal');
            teamModal.modal('show');
            teamModal.find('.modal-title').text('修改隊伍');
        },
        deleteTeam(id) {

            let team = this.teams.find(x => x.teamId == id);
            if (team == null) return false;

            Swal.fire({
                title: `是否刪除，隊伍:${team.teamName}?`,
                text: "刪除隊伍後，將無法取得該組隊員!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d52727',
                confirmButtonText: '是,刪除!',
                cancelButtonText: '取消'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/team/${team.teamId}`)
                        .then(() => {
                            Swal.fire({ icon: 'success', title: '已完成刪除' }).then(() => {
                                this.teams.splice(team, 1)
                            })
                        }).catch(error => {
                            Swal.fire({ icon: 'error', title: error.response.data });
                        });
                }
            })
        },
        shownShare: function (id) {
            let team = this.teams.find(x => x.teamId == id);
            if (team == null) return false;

            this.shareModal.key = team.teamId;
            this.shareModal.joinCode = team.joinCode;
            this.shareModal.joinShareUri = `https://localhost:44365/team/player/create?joincode=${team.joinCode}`;

            this.disposeCopy();

            let teamModal = $('#apply-share-modal');
            teamModal.modal('show');
        },
        onSubmit(values) {
            values.startTime = this.date[0];
            values.endTime = this.date[1];
            let title = '新增成功';
            if (this.operate === 'edit') {
                values.teamId = this.formValues.teamId;
                title = '修改成功';
            }
            let config = {
                method: this.operate === 'edit' ? 'put' : 'post',
                url: '/api/team',
                data: JSON.stringify(values,null,2),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios(config).then(() => {
                Swal.fire({ icon: 'success', title: title }).then(() => {
                    $('#apply-modal').modal('hide');
                    this.gets();
                });
            }).catch(({ response }) => {
                if (response.status === 404) this.$router.push({ name: 'NotFound' });
            })
        },
        axiosConfig(formData){
            if (this.operate === 'create') {
                const form = JSON.stringify(formData, null, 2);
                return {
                    method: 'post',
                    url: '/api/team',
                    data: form,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            };
            if (this.operate === 'edit') {
                values.teamId = this.formValues.teamId;
                const form = JSON.stringify(values, null, 2);
                return {
                    method: 'put',
                    url: '/api/team',
                    data: form,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        },
        copy(value,event) {
            navigator.clipboard.writeText(value);
            this.disposeCopy();
            this.lastTooltip = `#${event.target.id}`;
            $(`#${event.target.id}`).tooltip('show');
        },
        disposeCopy() {
            if (this.lastTooltip != '') {
                let id = this.lastTooltip;
                $(id).tooltip('dispose');
            }
        },
        statusRangeDate(start, end) {
            if (start === '' && end === '') return "";

            let startformat = start != null && start != "" ? `${moment(start).format('YYYY-MM-DD HH:mm')}起` : "";
            let endformat = end != null && end != "" ? `至${moment(end).format('YYYY-MM-DD HH:mm')}` : "";
            return `(${startformat}${endformat})`;
        },

    }
}
</script>