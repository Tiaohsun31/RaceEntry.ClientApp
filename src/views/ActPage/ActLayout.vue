TODO:設定新Style風格

<template>
    <div class="body-container">
        <nav id="navbar" class="navbar navbar-fixed navbar-expand-lg bgc-white">
            <Navbar></Navbar>
        </nav>
        <div class="main-container bgc-white">

            <!-- Sidebar -->
                <ActSidebar v-bind:menubars="menubars"></ActSidebar>
            <!-- End Sidebar-->

            <div class="main-content">
                <main role="main" class="page-content container-plus m-0 p-0">
                    <div id="content" v-bind:class="style.BannerWidth" v-bind:style="bgStyleObject">
                        <div class="banner">
                            <img v-if="act.banner" v-bind:src="act.banner" class="img-fluid d-none d-sm-block" v-bind:alt="act.title" />
                            <img v-if="act.square" :src="act.square" class="img-fluid d-block d-sm-none" :alt="act.title" />
                        </div>

                        <router-view v-bind:act="act" v-bind:style="style"></router-view>
                    </div>
                </main>
                <footer class="footer h-auto mt-0 d-none d-sm-block ">
                    <div class="footer-inner">
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
            </div>
        </div>
    </div>
    <Aside></Aside>
    <!-- Pop-up Modal -->
    <div class="modal modal-lg fade" id="popupModal" tabindex="-1" aria-labelledby="popupModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="popupModalLabel" v-text="adImg.title"> </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="ad" class="modal-body">
                </div>
            </div>
        </div>
    </div>
    <!-- End Pop-up Modal -->
</template>

<script>
import ActSidebar from './ActSidebar.vue';
import Navbar from '../../components/Layout/Navbar.vue'
import Aside from '../../components/Layout/Aside.vue'
import { useHead  } from "@vueuse/head"
import axios from 'axios';

export default {
    name: 'ActLoyout',
    components: {
        ActSidebar,
        Navbar,
        Aside,
    },
    
    data() {
        return {
            act: {},
            menubars: [],
            adImg: {},
            style:{},
            // style:{
            //     mainColor:'info',
            //     textColor:'',
            //     btnColor:'orange',
            //     subColor:'dark',
            //     bgColor:'light',
            //     bgImage:'',
            //     isContainer:false,
            // }
        }
    },
    computed: {
        code() {
            return this.$route.params.code;
        },
        id() {
            return this.$route.params.id;
        },
        bgStyleObject() {
            return this.style.Bgimg ? {
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundImage: `url(${this.style.Bgimg})`,
            }:''
        }
    },
    mounted() {
        axios.get(`/api/menubar/${this.code}`).then(({ data }) => this.menubars = data);
        axios.get(`/api/configs/act/${this.code}`).then(({ data }) => {
            this.act = data;
            this.style = JSON.parse(data.style);
            this.setSEO(data.seoTitle,data.seoDesc);
            if (Date.now() <= new Date(this.act.regSTime).getTime()) {
                this.$router.push({ name: 'ComingSoon' });
            }
        }).catch(error => {
            if (error.response.status === 404){
                this.$router.push({name:'NotFound'});
            }
        });

        axios.get(`/api/configs/popup/${this.code}`).then(({data}) => {
            this.adImg = data;
            if (this.adImg.show) {
                let lastShown = parseInt(sessionStorage.getItem(this.code));
                let maxTime = 86400000;
                if (!lastShown | lastShown + maxTime < Date.now()) {
                    $('#popupModal').modal('show');
                    $('#popupModal').find('.modal-body').html(this.adImg.content);
                    //store the time to check next time the page is loaded
                    sessionStorage.setItem(this.code, Date.now());
                }
            }
        });
    },
    methods:{
        setSEO(title, desc) {
            useHead({
                title: `${title}`,
                meta: [ 
                    { name: 'description', content: `${desc}`, itemprop: 'description' },
                    { content: `${title}`, itemprop: 'name' },
                    { name:'og:title',content:`${title}` },
                    { name:'og:description',content:`${desc}` },
                 ],
            });
            $('head meta[itemprop=name]').attr('content', title);
            $('head meta[itemprop=description]').attr('content', desc);
        }
    }
}
</script>

<style>
@import '../../styles/ace-themes.css';
@import '../../styles/content.css';
</style>