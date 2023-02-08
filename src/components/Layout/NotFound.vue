<template>
    <Layout>
        <div class="row justify-content-center pos-rel">

            <div class="pos-rel col-12 col-sm-7 mt-1 mt-sm-3">
                <div class="py-3 px-1 py-lg-4 px-lg-5">

                    <div class="text-center fa-4x">
                        <span class="text-100 text-dark-m3 d-sm-none">
                            ¯\_(ツ)_/¯
                        </span>
                        <span class="text-110 text-dark-m3 d-none d-sm-inline">
                            ¯\_(ツ)_/¯
                        </span>
                    </div>

                    <div class="text-center fa-4x text-orange-d2 letter-spacing-4">
                        404
                    </div>

                    <div class="text-center">
                        <span class="text-150 text-primary-d2">
                            找不到頁面...
                        </span>
                    </div>

                    <div class="text-dark-m2 text-110 text-center text-md-left mt-45">
                        我們查詢了所有選項，並未發現該項目!
                    </div>

                    <div class="mt-4 text-105 bgc-secondary-l4 py-2 px-3 radius-1">
                        <span class="text-600 text-dark-m3">
                            嘗試以下操作:
                        </span>

                        <ul class="list-unstyled mt-3 mx-sm-3 mb-0 text-dark-m2 ">
                            <li class="my-2">
                                <i class="fa fa-circle text-xs text-blue-d1 align-middle mr-1"></i>
                                檢查網址是否有拼寫錯誤
                            </li>

                            <li class="my-2">
                                <i class="fa fa-circle text-xs text-blue-d1 align-middle mr-1"></i>
                                再次重新操作
                            </li>

                            <li class="my-2">
                                <i class="fa fa-circle text-xs text-blue-d1 align-middle mr-1"></i>
                                聯絡我們，協助處理問題
                            </li>
                        </ul>
                    </div>

                    <div class="text-center mt-4">
                        <router-link :to="{name:'Home'}" class="btn btn-bgc-white btn-outline-primary px-35">
                            <i class="fa fa-home"></i>
                            回到首頁
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
export default {
    name: 'NotFound',
}
</script>