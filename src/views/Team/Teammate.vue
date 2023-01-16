<template>
    <Layout>
        <div class="container my-5">
            <RouterLink :to="{ name: 'MemberIndex' }"
                class="btn btn-bgc-white btn-outline-default px-35 btn-text-slide-x mb-3">
                <i class="btn-text-2 fa fa-arrow-left text-110 align-text-bottom mr-2"></i>
                回 會員專區
            </RouterLink>
            <div class="alert bgc-red-l4 border-none border-l-4 brc-red-tp1 radius-0 text-dark-tp2">
                <h4 class="text-danger-d1 text-130"> 將自動與您的會員資料比對 </h4>
                若有隊伍新增隊員，與您會員資料相符合，將自動顯示您為該組隊員
            </div>
            <table v-if="teammates.length > 0" class="table table-striped-warning">
                <thead>
                    <tr class="bgc-orange-d2 text-white">
                        <th>隊名</th>
                        <th class="d-none d-sm-table-cell">加入日期</th>
                        <th>更新日期</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bgc-h-info-l4" v-for="item in teammates">
                        <td v-text="item.teamName"> </td>
                        <td class="d-none d-sm-table-cell" v-text="dateFormat(item.joinDate)"> </td>
                        <td v-text="dateFormat(item.updateAt)"> </td>
                        <td>
                            <button @click="editTeammate(item)" title="編輯" type="button"
                                class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-warning btn-a-lighter-warning">
                                <i class="fa fa-pencil-alt mr-md-1"></i>
                                <span class="d-none d-sm-inline">編輯</span>
                            </button>
                            <button type="button" title="退出" 
                                @click="deleteTeammate(item)"
                                class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-danger btn-a-lighter-danger">
                                <i class="fa fa-trash-alt mr-md-1"></i>
                                <span class="d-none d-sm-inline">退出</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="jumbotron text-center radius-1 d-flex justify-content-center align-items-center mt-5" style="height: 500px;">
                <div class="container">
                    <h1 class="display-4">您尚未加入任何隊伍</h1>
                    <RouterLink :to="{name:'AddTeammate'}" class="btn btn-success btn-lg btn-h-outline-success btn-a-outline-success mb-1 px-4 mt-4">
                        我想加入其他隊伍
                    </RouterLink>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script lang="js">
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import { dateFormat } from '@/js/format';
    import { storeToRefs } from 'pinia';
    import { useTeamStore } from '@/store/team';
    export default {
        name:'Teammate',
        setup(){
            const store = useTeamStore();
            let { teamId, userInfoId } = storeToRefs(store);
            return { dateFormat, store, teamId, userInfoId }
        },
        data(){
            return {
                teammates:[]
            }
        },
        created(){
            axios.get('/api/teammates').then(({data}) => this.teammates = data);
        },
        methods:{
            editTeammate(teammate){
                this.store.teamId = teammate.teamId;
                this.store.userInfoId = teammate.userInfoId;
                this.$router.push({name:'EditTeammate'});
            },
            deleteTeammate(teammate) {
                let find = this.teammates.findIndex(x => x == teammate);
                if (find === -1) return;

                Swal.fire({
                    title: `是否退出${teammate.teamName}?`,
                    text: "退出後，該隊伍將無法取得您的資料!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d52727',
                    confirmButtonText: '是,退出!',
                    cancelButtonText: '取消'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete('/api/teammate', {
                            params: { teamId: teammate.teamId, userInfoId: teammate.userInfoId }
                        }).then(() => {
                            Swal.fire({ icon: 'success', title: '已退出' }).then(() => {
                                this.teammates.splice(find, 1);
                            });
                        }).catch(error => {
                            if (error.response.status === 400) {
                                Swal.fire({ icon: 'error', title: `${error.response.data || error.response.data.title}` });
                            }
                            if (error.response.status === 404) {
                                this.$router.push({ name: 'NotFound' });
                            }
                        })
                    }
                })
            }
        }
    }
</script>