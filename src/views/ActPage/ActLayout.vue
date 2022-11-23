<template>
    <!-- <Layout>
        <div id="content" class="">
            <div class="row">
                <div class="col-md-2">
                    <ActSidebar v-bind:menubars="menubars"></ActSidebar>
                </div>
                <div class="col-md-10 col-12">
                    <slot name="actContent"></slot>
                </div>
            </div>
        </div>
    </Layout> -->
    <div class="body-container">

        <nav id="navbar" class="navbar navbar-fixed navbar-expand-lg bgc-white">
            <Navbar></Navbar>
        </nav>

        <div class="main-container bgc-white">

            <!-- Sidebar -->
                <ActSidebar v-bind:menubars="menubars"></ActSidebar>
            <!-- End Sidebar-->

            <div class="main-content">
                <main id="content" role="main" class="page-content container-plus m-0 p-0">
                    <router-view v-bind:act="act"></router-view>
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

import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'ActLoyout',
    components: {
        ActSidebar,
        Navbar,
        Aside,
    },
    data() {
        return {
            act: '',
            menubars: [],
            adImg: '',
        }
    },
    computed: {
        code() {
            return this.$route.params.code;
        },
        id() {
            return this.$route.params.id;
        }
    },
    mounted() {
        axios.get(`/api/menubar/${this.code}`).then(({ data }) => this.menubars = data);
        axios.get(`/api/configs/act/${this.code}`).then(({ data }) => {
            this.act = data;
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
    created() {

        console.log(this.code);
    }
}
</script>

<style>
@import '../../styles/ace-themes.css';
</style>