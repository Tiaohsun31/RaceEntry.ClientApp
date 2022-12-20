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
                
                <button v-if="formValues.contact.paidTotal > 0 && contact.canRefund" class="btn btn-light-red btn-h-red btn-a-red border-0 py-2 text-600" @click="refund">
                    退費申請
                </button>
            </div>
        </div>
        <hr>
        <!-- 團隊成員 -->
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
        <!-- End 團隊成員 -->
    </div>
</template>

<script>
import Members from './components/Members.vue';
import axios from 'axios';

export default {
    name: 'Checkout',
    props: ['act'],
    components:{
        Members
    },
    data() {
        return {
            formValues: {
                contact: {
                    paidTotal: 0,
                    canRefund:true,
                },
                members:[]
            }
        }
    },
    created(){
        this.get();
    },
    computed:{
        orderId() {
            return sessionStorage.getItem("orderId");
        }
    },
    methods:{
        get() {
            axios.get(`/api/order/${this.orderId}`)
                .then(({ data }) => {
                    this.formValues.contact = data;
                    this.formValues.members = data.members;
                }).catch(error => {
                    if (error.response.status === 400) {
                        Swal.fire(error.response.data);
                    };
                    if (error.response.status === 404) {
                        Swal.fire("找不到資料").then(() => {
                            this.$router.push({ name: 'HomePage' });
                        });
                    }
                })
        },
        cancel(){
            
        },
        refund(){

        }
    }
}
</script>