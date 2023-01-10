<template>
    <Layout>
        <div class="container my-5">
            <RouterLink :to="{name:'MemberIndex'}" class="btn btn-bgc-white btn-outline-default px-35 btn-text-slide-x mb-3">
                <i class="btn-text-2 fa fa-arrow-left text-110 align-text-bottom mr-2"></i>
                回 會員專區
            </RouterLink>
            <div class="border-b-2 brc-yellow-d1 my-3 pb-1 h4"> 退款帳戶設定 </div>
            <Form :initial-values="formValues" @submit="onSubmit">
                <div class="row">
                    <div class="col-12 mb-4">
                        <label for="selectBankName" class="col-form-label text-secondary">
                            <i class="fas fa-star text-danger ml-1"></i> 銀行／Bank Name
                        </label>
                        <Field name="bankName" rules="required" label="銀行名稱" id="selectBankName" class="form-control" as="select">
                            <option hidden="" disabled="" value="" selected> -- 請選擇 -- </option>
                            <option value="004臺灣銀行">004 臺灣銀行</option>
                            <option value="005臺灣土地銀行"> 005 臺灣土地銀行</option>
                            <option value="006合作金庫商業銀行"> 006 合作金庫商業銀行</option>
                            <option value="007第一商業銀行"> 007 第一商業銀行</option>
                            <option value="008華南商業銀行"> 008 華南商業銀行</option>
                            <option value="009彰化商業銀行"> 009 彰化商業銀行</option>
                            <option value="011上海商業儲蓄銀行"> 011 上海商業儲蓄銀行</option>
                            <option value="012台北富邦商業銀行"> 012 台北富邦商業銀行</option>
                            <option value="013國泰世華商業銀行"> 013 國泰世華商業銀行</option>
                            <option value="016高雄銀行"> 016 高雄銀行</option>
                            <option value="017兆豐國際商業銀行"> 017 兆豐國際商業銀行</option>
                            <option value="021花旗銀行"> 021 花旗銀行</option>
                            <option value="050臺灣中小企業銀行"> 050 臺灣中小企業銀行</option>
                            <option value="052渣打國際商業銀行"> 052 渣打國際商業銀行</option>
                            <option value="053台中商業銀行"> 053 台中商業銀行</option>
                            <option value="054京城商業銀行"> 054 京城商業銀行</option>
                            <option value="101瑞興商業銀行"> 101 瑞興商業銀行</option>
                            <option value="102華泰商業銀行"> 102 華泰商業銀行</option>
                            <option value="103臺灣新光商業銀行"> 103 臺灣新光商業銀行</option>
                            <option value="108陽信商業銀行"> 108 陽信商業銀行</option>
                            <option value="114基隆第一信用合作社"> 114 基隆第一信用合作社</option>
                            <option value="115基隆市第二信用合作社"> 115 基隆市第二信用合作社</option>
                            <option value="118板信商業銀行"> 118 板信商業銀行</option>
                            <option value="119淡水第一信用合作社"> 119 淡水第一信用合作社</option>
                            <option value="130新竹第一信用合作社"> 130 新竹第一信用合作社</option>
                            <option value="132新竹第三信用合作社"> 132 新竹第三信用合作社</option>
                            <option value="146台中市第二信用合作社"> 146 台中市第二信用合作社</option>
                            <option value="147三信商業銀行"> 147 三信商業銀行</option>
                            <option value="162彰化第六信用合作社"> 162 彰化第六信用合作社</option>
                            <option value="215花蓮第一信用合作社"> 215 花蓮第一信用合作社</option>
                            <option value="216花蓮第二信用合作社"> 216 花蓮第二信用合作社</option>
                            <option value="600農金資訊股份有限公司"> 600 農金資訊股份有限公司</option>
                            <option value="700中華郵政股份有限公司"> 700 中華郵政股份有限公司</option>
                            <option value="803聯邦商業銀行"> 803 聯邦商業銀行</option>
                            <option value="805遠東國際商業銀行"> 805 遠東國際商業銀行</option>
                            <option value="806元大商業銀行"> 806 元大商業銀行</option>
                            <option value="807永豐商業銀行"> 807 永豐商業銀行</option>
                            <option value="808玉山商業銀行"> 808 玉山商業銀行</option>
                            <option value="809凱基商業銀行"> 809 凱基商業銀行</option>
                            <option value="812台新國際商業銀行"> 812 台新國際商業銀行</option>
                            <option value="815日盛國際商業銀行"> 815 日盛國際商業銀行</option>
                            <option value="816安泰商業銀行"> 816 安泰商業銀行</option>
                            <option value="822中國信託商業銀行"> 822 中國信託商業銀行</option>
                            <option value="952財團法人農漁會南區資訊中心"> 952 財團法人農漁會南區資訊中心</option>
                            <option value="997中華民國信用合作社聯合社南區聯合資訊處理中心"> 997 中華民國信用合作社聯合社南區聯合資訊處理中心</option>
                        </Field>
                        <ErrorMessage name="bankName" class="text-danger" as="div"></ErrorMessage>
                    </div>

                    <div class="col-sm-6 col-12 mb-4">
                        <label for="inputBranchId" class="text-secondary">
                            <i class="fas fa-star text-danger ml-1"></i> 分行代碼／Branch Id
                        </label>
                        <Field name="branchId" rules="required|max:4|min:4" label="分行代碼" class="form-control" id="inputBranchId"></Field>
                        <small class="text-secondary"> 共4碼，郵局分行代碼皆為0021 </small>
                        <ErrorMessage name="branchId" class="text-danger" as="div"></ErrorMessage>
                    </div>

                    <div class="col-sm-6 col-12 mb-4">
                        <label for="inputBranchName" class="text-secondary">
                            <i class="fas fa-star text-danger ml-1"></i> 分行名稱／Branch Name
                        </label>
                        <Field name="branchName" rules="required|max:50" label="分行名稱" id="inputBranchName" class="form-control"></Field>
                        <ErrorMessage name="branchName" class="text-danger" as="div"></ErrorMessage>
                    </div>

                    <div class="col-12 mb-4">
                        <label for="inputBankAccount" class="text-secondary">
                            <i class="fas fa-star text-danger ml-1"></i> 銀行帳號／Bank Account
                        </label>
                        <Field name="bankAccount" rules="required|max:16" label="銀行帳號" id="inputBankAccount" class="form-control"></Field>
                        <small class=" text-secondary "> 帳號長度應為:14碼 </small>
                        <ErrorMessage name="bankAccount" class="text-danger" as="div"></ErrorMessage>
                    </div>

                    <div class="col-12 mb-4">
                        <label for="inputAccountName" class="text-secondary">
                            <i class="fas fa-star text-danger ml-1"></i> 戶名／Account Name
                        </label>
                        <Field name="accountName" rules="required|max:50" label="戶名" id="inputAccountName" class="form-control"></Field>
                        <ErrorMessage name="accountName" class="text-danger" as="div"></ErrorMessage>
                    </div>

                    <div class="col-12 mt-2 mb-4">
                        <button type="submit" class="btn btn-primary btn-block btn-lg"> 送出 </button>
                    </div>
                </div>
            </Form>
        </div>
    </Layout>
</template>

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import Swal from 'sweetalert2';
export default {
    name: 'RefundSetting',
    components:{
        Field, Form, ErrorMessage
    },
    data() {
        return {
            formValues: {}
        }
    },
    created() {
        axios.get('/api/refund').then(({ data }) => this.formValues = data);
    },
    methods: {
        onSubmit(values) {
            const form = JSON.stringify(values, null, 2);
            axios.put('/api/refund', form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => Swal.fire({ icon: 'success', title: '設置成功' }))
            .catch(error => {
                if (error.response.status === 404) {
                    this.$router.push({ name: 'NotFound' });
                }
            });
        }
    }
}
</script>