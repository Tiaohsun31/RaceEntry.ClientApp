<template>
    <table v-if="members.length > 0" class="table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden mt-3 text-center">
        <thead class="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
            <tr>
                <th class="d-none d-sm-table-cell text-left"> # </th>
                <th> 姓名 </th>
                <th> 組別 </th>
                <th class="d-none d-sm-table-cell"> 手機 </th>
                <th> 金額 </th>
                <th class="d-none d-sm-table-cell"> 更新日期 </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <template v-for="element, index in members">
                <tr class="bgc-h-yellow-l4 d-style">
                    <td class="d-none d-sm-table-cell text-left"> {{ i = index + 1 }} </td>
                    <td>
                        <a href="#" data-toggle="collapse" :data-target="`#table-detail-${index}`" title="查看明細"
                            class="text-blue-d1 text-600 text-95 collapsed">
                            {{ element.name }}
                            <i class="fa fa-angle-down toggle-icon opacity-1 text-100"></i>
                        </a>
                    </td>
                    <td> {{ element.actGroupName }} </td>
                    <td class="d-none d-sm-table-cell"> {{ element.phoneNumber }} </td>
                    <td class="text-secondary-d3"> NT$ {{ numberFormat(element.total) }} </td>
                    <td class="d-none d-sm-table-cell"> {{ dateFormat(element.updateAt) }} </td>
                    <td>
                        <div class="d-none d-lg-flex float-right">
                            <a href="#" data-toggle="collapse" :data-target="`#table-detail-${index}`"
                                class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-info btn-a-lighter-info">
                                <i class="fas fa-search mr-1"></i>
                                明細
                            </a>
                            <template v-if="!isReadOnly">
                                <RouterLink :to="{ name: 'EditPersonal', params: { userId: `${element.userInfoId}` } }"
                                    class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-warning btn-a-lighter-warning">
                                    <i class="fa fa-pencil-alt mr-1"></i>
                                    編輯
                                </RouterLink>
                                <button v-if="members.length > 1" type="button"
                                    class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-danger btn-a-lighter-danger"
                                    @click="cancel(element.userInfoId)">
                                    <i class="fa fa-trash-alt mr-1"></i>
                                    刪除
                                </button>
                            </template>
                        </div>
                        <!-- show a dropdown in mobile -->
                        <div v-if="!isReadOnly">
                            <div class="dropdown d-inline-block d-lg-none dd-backdrop dd-backdrop-none-lg">
                                <a href="#" class="btn btn-default btn-xs py-15 radius-round dropdown-toggle"
                                    data-toggle="dropdown">
                                    <i class="fa fa-cog"></i>
                                </a>

                                <div class="dropdown-menu dd-slide-up dd-slide-none-lg">
                                    <div class="dropdown-inner">
                                        <div class="dropdown-header text-100 text-secondary-d1 border-b-1 brc-secondary-l2 text-600 mb-2">
                                            {{ element.name }}
                                        </div>
                                        <RouterLink :to="{ name: 'EditPersonal', params: { userId: `${element.userInfoId}` } }" class="dropdown-item">
                                            <i class="fa fa-pencil-alt text-orange mr-1 p-2 w-4"></i>
                                            編輯
                                        </RouterLink>
                                        <a href="#" v-if="members.length > 1" @click="cancel(item.userInfoId)" class="dropdown-item">
                                            <i class="fa fa-trash-alt text-danger-m1 mr-1 p-2 w-4"></i>
                                            刪除
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr class="border-0 detail-row bgc-white">
                    <td colspan="7" class="p-0 border-none brc-secondary-l2">
                        <div class="table-detail collapse" :id="`table-detail-${index}`">
                            <div class="px-md-4 py-md-3 p-2">
                                <div class="row">
                                    <div class="col-md-4 col-12">
                                        <dl class="row text-left">
                                            <dt class="col-sm-4 mb-2">國籍</dt>
                                            <dd class="col-sm-8 mb-2 "> {{ element.nationality }} </dd>
                                            <dt class="col-sm-4 mb-2">身分證或護照</dt>
                                            <dd class="col-sm-8 mb-2 "> {{ element.maskRocid }} </dd>
                                            <dt class="col-sm-4 mb-2">法定性別</dt>
                                            <dd class="col-sm-8 mb-2 "> {{ element.gender }} </dd>
                                            <dt class="col-sm-4 mb-2">出生年月日</dt>
                                            <dd class="col-sm-8 mb-2 "> {{ dateFormat(element.birthdate) }} </dd>
                                            <dt class="col-sm-4 mb-2">Email</dt>
                                            <dd class="col-sm-8 mb-2 "> {{ element.email }} </dd>
                                            <dt class="col-sm-4 mb-2">市話</dt>
                                            <dd class="col-sm-8 mb-2 "> {{ element.tel }} </dd>
                                            <dt class="col-sm-4 mb-2">緊急聯絡人</dt>
                                            <dd class="col-sm-8 mb-2 "> {{ element.emergName }} </dd>
                                            <dt class="col-sm-4 mb-2">緊急聯絡人電話</dt>
                                            <dd class="col-sm-8 mb-2 "> {{ element.emergPhone }} </dd>
                                        </dl>
                                    </div>
                                    <div class="col-md-8 col-12">
                                        <div class="table-responsive-md">
                                            <table class="table table-border-x brc-secondary-l3 mb-0">
                                                <thead>
                                                    <tr class="text-80 text-default-d3 bgc-default-l4 ">
                                                        <th class="pl-2 pl-lg-4 d-none d-sm-table-cell"> # </th>
                                                        <th class="d-none d-sm-table-cell"> 類別 </th>
                                                        <th class="d-none d-sm-table-cell"> 項目 </th>
                                                        <th class="d-none d-sm-table-cell"> 規格 </th>
                                                        <th class="d-none d-sm-table-cell"> 單價 </th>
                                                        <th class="d-none d-sm-table-cell"> 數量 </th>
                                                        <th class="d-none d-sm-table-cell"> 金額 </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <template v-for="item, index in element.options">
                                                        <tr class="bgc-h-secondary-l4">
                                                            <td class="pl-2 pl-lg-4 d-none d-sm-table-cell">
                                                                <span class="text-95 text-primary text-600">
                                                                    {{ j = index + 1 }} 
                                                                </span>
                                                            </td>
                                                            <td class="text-dark-m2 text-85 d-none d-sm-table-cell">
                                                                {{ item.optionType }} </td>
                                                            <td class="text-dark-m2 text-85 d-none d-sm-table-cell">
                                                                <div> 
                                                                    {{ item.productName }} <span> {{ item.productSpec }} </span> 
                                                                </div>
                                                            </td>
                                                            <td class="text-dark-m2 text-85 d-none d-sm-table-cell">
                                                                {{ item.productSpec }} 
                                                            </td>
                                                            <td class="text-secondary-d3 text-95 d-none d-sm-table-cell">
                                                                {{  numberFormat(item.unitPrice) }}
                                                            </td>
                                                            <td class="text-secondary-d3 text-95 d-none d-sm-table-cell">
                                                                {{  numberFormat(item.qty) }}
                                                            </td>
                                                            <td class="text-secondary-d3 text-95 d-none d-sm-table-cell">
                                                                {{  numberFormat(item.subTotal) }}
                                                            </td>
                                                        </tr>
                                                        <tr
                                                            class="text-default-d3 bgc-default-l4 d-table-row d-sm-none">
                                                            <td colspan="7" class="text-dark-m2">
                                                                <div> {{ item.productName }} <span class="text-blue"> {{ item.productSpec }} </span> </div>
                                                            </td>
                                                        </tr>
                                                        <tr class="d-table-row d-sm-none text-secondary-d3">
                                                            <td colspan="2">單價</td>
                                                            <td colspan="2">數量</td>
                                                            <td colspan="3">金額</td>
                                                        </tr>
                                                        <tr class="d-table-row d-sm-none text-secondary-d3">
                                                            <td colspan="2">{{ numberFormat(item.unitPrice) }}</td>
                                                            <td colspan="2">{{ numberFormat(item.qty) }}</td>
                                                            <td colspan="3" title="金額"> {{ numberFormat(item.subTotal) }} </td>
                                                        </tr>
                                                    </template>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
<script>

import Swal from 'sweetalert2';
import axios from 'axios';

import { dateFormat,numberFormat } from '@/js/format';

export default {
    name: 'Members',
    props: ['members','isReadOnly'],
    methods:{
        dateFormat(value){
            return dateFormat(value);
        },
        numberFormat(value){
            return numberFormat(value);
        },
        cancel(id) {
            let user = this.members.findIndex(x => x.userInfoId === id);
            if (user === -1) {
                Swal.fire({icon:'error',title:'資料不存在，無法刪除'});
                return;
            }
            Swal.fire({
                title: '是否取消報名?',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: '否!',
                confirmButtonText: '是!我要取消'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/personal/${id}`)
                    .then(response => {
                        if (response.status === 204) {
                            Swal.fire({ icon: 'success', title: "已取消報名" }).then(() => {
                                this.members.splice(user, 1);
                            })
                        }
                    });
                }
            }).catch(error => {
                if (error.response.status === 404) {
                    Swal.fire({icon:'error',title:'資料不存在，無法刪除'});
                }
            })
        }
    }
}
</script>