<template>
    <Layout>
        <div class="container my-5">
            <RouterLink :to="{name:'MemberIndex'}" class="btn btn-bgc-white btn-outline-default px-35 btn-text-slide-x mb-3">
                <i class="btn-text-2 fa fa-arrow-left text-110 align-text-bottom mr-2"></i>
                回 會員專區
            </RouterLink>
            <div v-if="acts.length > 0" class="my-3">
                <div class="card acard" v-for="item in acts">
                    <div class="card-header border-0">
                        <h3 class="text-danger font-bold mb-0">
                            {{ item.key }}
                        </h3>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-striped-warning">
                                <thead>
                                    <tr class="bgc-orange-d2 text-white">
                                        <th>#</th>
                                        <th>活動名稱</th>
                                        <th>類別</th>
                                        <th>活動日期</th>
                                        <th>地點</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bgc-h-info-l4" v-for="(element, index) in item.list">
                                        <td> {{++index}} </td>
                                        <td v-text="element.actName"></td>
                                        <td v-text="element.category"></td>
                                        <td v-text="timeString(element.actDate)"></td>
                                        <td v-text="element.address"></td>
                                        <td class="text-right">
                                            <button @click="LookOrder(element)" class="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-danger btn-a-lighter-danger">
                                                <i class="fas fa-search"></i>
                                                查看訂單
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="jumbotron text-center radius-1 d-flex justify-content-center align-items-center mt-5" style="height: 500px;">
                <div class="container">
                    <h1 class="display-4">未找到活動參加紀錄</h1>
                    <a href="/Acts"
                        class="btn btn-success btn-lg btn-h-outline-success btn-a-outline-success mb-1 px-4 mt-4">
                        立刻找尋喜愛的活動
                    </a>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script lang="js">
import moment from 'moment';
import axios from 'axios';
export default {
    name: 'HistoryIndex',
    data() {
        return {
            acts: []
        }
    },
    created(){
        axios.get('/api/history').then(({ data }) => this.acts = data);
    },
    methods:{
        timeString(value){
            return moment(value).format('YYYY-MM-DD (dd)');
        },
        LookOrder(element) {
            sessionStorage.setItem("orderId",element.orderId);
            this.$router.push({name:'Checkout',params: { code: `${element.actCode}` }});
        }
    }
}
</script>