<template>
    <div v-if="pendingApproval.length > 0" class="table-responsive-md">
        <table class="table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden mt-3 text-center">
            <thead class="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
                <tr class="text-default-d3 bgc-default-l4 ">
                    <th class="d-none d-sm-table-cell"> # </th>
                    <th> </th>
                    <th> 姓名 </th>
                    <th> 文件 </th>
                    <th class="d-none d-sm-table-cell"> 描述 </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item,index in pendingApproval" class="bgc-h-secondary-l4">
                    <td class="d-none d-sm-table-cell">
                        <span class="text-primary text-600">
                            {{ ++index }}
                        </span>
                    </td>
                    <td class="align-middle">
                        <span class="badge" :class="statusStyle(item.s.status)"> {{ item.s.statusName }} </span>
                    </td>
                    <td class="text-dark-m2 align-middle">
                        {{ item.userName }}
                    </td>
                    <td class="text-dark-m2 align-middle">
                        {{ item.s.title }}
                        <div class="text-75 text-secondary d-block d-sm-none"> {{ item.s.describe }} </div>
                    </td>
                    <td class="text-dark-m2 d-none d-sm-table-cell">
                        {{ item.s.describe }}
                    </td>
                    <td class="align-middle text-right">
                        <button type="button"
                            data-toggle="modal" 
                            data-target="#uploadFileModal" 
                            class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-purple btn-a-lighter-purple"
                            @click="openFileModal(item.s)">
                            <i class="fa fa-file-alt mr-1" title="上傳檔案"></i>
                            <span class="d-none d-sm-inline">上傳檔案</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- 上傳檔案 -->
    <div class="modal fade" id="uploadFileModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="uploadFileModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="uploadFileModalLabel"> 上傳 </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form>
                    <div class="modal-body">
                        <input type="file" name="file" id="myfile" required />
                        <small id="fileHelp" class="form-text text-muted">檔案限制 4MB 以下</small>
    
                        <div id="file-message" class="text-danger"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">放棄，不上傳檔案</button>
                        <button type="button" @click="upload" class="btn btn-primary">上傳檔案</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "Uploads",
    props: ['pendingApproval'],
    data() {
        return {
            selectedUser:{}
        };
    },
    methods: {
        statusStyle(value){
            switch (value) {
                case 2: 
                    return 'badge-info'; break;
                case 3:
                    return 'badge-success'; break;
                case 4:
                    return 'badge-danger'; break;
                default:
                    return 'badge-secondary';
            }
        },
        openFileModal(item) {
            this.selectedUser = item;
            $("#uploadFileModal").on("show.bs.modal", function (event) {
                var modal = $(this);
                modal.find('.modal-title').text('上傳' + item.title);
                let allowExt = item.format.replaceAll(",", "|").replaceAll(".", "");
                $("#myfile").aceFileInput("updateSettings", {
                    placeholderText: "請選擇檔案",
                    allowExt: `${allowExt}`,
                    btnChooseText: "瀏覽",
                    btnChangeText: "更改",
                    maxSize: 4 * 1024 * 1024
                }).on("invalid.ace.file", function (event) {
                    var errors = event.$_fileErrors;
                    if (errors.invalidCount >= 1) {
                        $("#file-message").html("檔案格式不符，或超過4MB");
                    }
                });
            });
        },
        upload(){
            const selectedFile = document.getElementById('myfile').files[0];
            if (this.validateFile(selectedFile)) {
                let formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("id",this.selectedUser.userUploadId);
                formData.append("userInfoId",this.selectedUser.userInfoId);
                axios.post('/api/fileupload',formData,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }).then(({data}) => {
                    Swal.fire({icon:'success',title:'上傳成功，已提交檢核申請'}).then(() => {
                        let find = this.pendingApproval.find(x => x.s.userUploadId == data.userUploadId);
                        find.s = data;
                        $('#uploadFileModal').modal('hide');
                    });

                }).catch(error => {
                    if (error.response.status === 404) {
                        Swal.fire({icon:'error',title:'檔案不存在，無法上傳'});
                    };
                    if (error.response.status === 404) {
                        Swal.fire({icon:'error',title:error.response.data});
                    };
                })
            };
        },
        validateFile(file) {
            if (file == null) return false;
            if (file.size >= 4 * 1024 * 1024) {
                Swal.fire({icon:'error',title:"圖片太大無法上傳，檔案大小請勿超過4MB"}); return false;
            };
            let allowExt = this.selectedUser.format?.split(',');
            if (allowExt.indexOf(file.name.split('.')[1]) == -1){
                Swal.fire({icon:'error',title:"檔案格式錯誤"}); return false;
            };
            return true;
        },
    },
}
</script>