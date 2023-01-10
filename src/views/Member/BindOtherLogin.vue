<template>
    <Layout>
        <div class="container my-5">
            <RouterLink :to="{name:'MemberIndex'}" class="btn btn-bgc-white btn-outline-default px-35 btn-text-slide-x mb-3">
                <i class="btn-text-2 fa fa-arrow-left text-110 align-text-bottom mr-2"></i>
                回 會員專區
            </RouterLink>
            
            <div class="alert bgc-red-l4 border-none border-l-4 brc-red-tp1 radius-0 text-dark-tp2">
                <h5 class="text-danger-d1 text-130">綁定第三方登入</h5>
                <ol>
                    <li>點選綁定按鈕後，將使原帳號登出</li>
                    <li>重新輸入註冊時，Email及身分證/護照號碼，進行驗證</li>
                </ol>
            </div>
            
            <div class="row">
                <div class="col-6">
                    <div class=" acard card-body float-right">
                        <a :href="`/api/externalLogin?provider=Facebook&returnUrl=${this.returnUrl}`">
                            <div class="text-center">
                                <i class="fab fa-facebook-square fa-10x text-blue"></i>
                                <div>綁定 Facebook 登入</div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6">
                    <div class=" acard card-body float-left">
                        <a :href="`/api/externalLogin?provider=LINE&returnUrl=${this.returnUrl}`">
                            <div class="text-center">
                                <i class="fab fa-line fa-10x text-green"></i>
                                <div>綁定 LINE 登入</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
export default {
    name: 'BindOtherLogin',
    computed:{
        returnUrl(){
            return encodeURI(window.location.pathname);
        }
    },
}
</script>