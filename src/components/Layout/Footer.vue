<template>
    <footer class="footer h-auto mt-0 d-none d-sm-block ">
        <div class="footer-inner pt-45">
            <div class="text-white" style="background-color: #1eb0ac">
                <div class="container container-plus" data-aos="fade">
                    <div class="row pb-4">
                        <div class="col-12 col-lg-5">
                            <img src="/focusline-logo.png" class="w-50" alt="LOGO" />

                            <div class="text-150 mt-4">
                                <a href="https://lin.ee/gT3EWca" target="_blank" data-toggle="tooltip"
                                    title="LINE ID:@focusline">
                                    <i class="bgc-black-tp6 p-25 w-6 radius-round fab fa-line text-white mx-2"></i>
                                </a>
                                <a href="https://www.facebook.com/FocusLine0/" target="_blank" data-toggle="tooltip"
                                    title="FocusLine0">
                                    <i class="bgc-black-tp6 p-25 w-6 radius-round fab fa-facebook-square text-white mx-2"></i>
                                </a>
                            </div>
                        </div>

                        <div class="col-12 col-lg-7 mt-2">
                            <div class="row text-center text-lg-left">
                                <div class="col-12 col-sm-4 mb-3">
                                    <h6 class="text-white-tp3 text-95 text-600 mb-3">PRODUCTS</h6>
                                    <div>
                                        <router-link to="/acts" class="text-white">
                                            活動列表
                                        </router-link>
                                        <br />
                                        <RouterLink :to="{name:'Timing'}" class="text-white"> 
                                            服務項目
                                        </RouterLink>
                                        <br />
                                        <RouterLink :to="{name:'Instruction'}" class="text-white"> 
                                            晶片說明
                                        </RouterLink>
                                        <br />
                                        <a href="#" class="text-white" data-toggle="modal"
                                            data-target="#privacyPolicyModal">隱私權政策
                                        </a>
                                    </div>
                                </div>

                                <div class="col-12 col-sm-8">
                                    <h6 class="text-white-tp3 text-95 text-600 mb-3">CONTACT</h6>
                                    <address class="mb-0">
                                        <div class="text-white">服務專線: 05-6226456</div>
                                        <div class="text-white">
                                            服務時間: 周一至周四 09:00-18:00、周五 09:00-17:00
                                        </div>
                                        <div class="text-white">
                                            寫信給我們:
                                            <a href="mailto:service@focusline.com.tw"
                                                class="text-white">service@focusline.com.tw</a>
                                        </div>
                                        <div class="text-white">
                                            機關地址: 632 雲林縣虎尾鎮文科路 302 號
                                        </div>
                                        <div class="text-white">機關傳真: 05-6220710</div>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-1 pb-1 text-white text-center bgc-primary-d3">
                &copy; {{ (new Date).getFullYear() }} - FocusLine All Rights Reserved
            </div>
        </div>
        <div class="footer-tools">
            <a href="#" class="btn-scroll-up btn btn-dark mb-2 mr-2 scroll-btn-visible">
                <i class="fa fa-angle-double-up mx-2px text-95"></i>
            </a>
        </div>
    </footer>
    <PrivacyPolicy></PrivacyPolicy>
</template>

<script>
import PrivacyPolicy from './PrivacyPolicy.vue';

export default {
    name: "Footer",
    components:{
        PrivacyPolicy
    }
};
</script>

<style>
footer {
    background-color: #1eb0ac;
}
</style>
