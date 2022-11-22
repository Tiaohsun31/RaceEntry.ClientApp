<template>
    <div class="body-container pos-rel" style="background-image:url('/body-bg-1.jpg')">
        <div class="position-tl w-100 h-100 bgc-black-tp5"></div>

        <div class="main-container bgc-transparent">

            <div role="main" class="main-content px-0">
                <div class="d-flex flex-grow-1">
                    <div class="row flex-grow-1">
                        <div class="col-12 d-flex">
                            <div class="row flex-grow-1">
                                <div class="col-12 col-lg-12 px-0">
                                    <div class="h-100 pos-rel">
                                        <div class="container h-100 d-flex flex-column justify-content-center">
                                            <div class="text-white p-4 mx-md-5 text-center">

                                                <h1 class="text-160">活動規劃中 ...</h1>
                                                <h2 class="fa-3x d-none d-sm-block">
                                                    <span class="text-info-l2"> {{act.actName}}</span>
                                                    <span class="text-90">即將開報!</span>
                                                </h2>
                                                <div class="d-block d-sm-none">
                                                    <h2 class="text-info-l2 mb-3">{{act.actName}}</h2>
                                                    <h4 class="mb-3">即將開報!</h4>
                                                </div>
                                                
                                                <div class="countdown-items d-flex justify-content-center flex-wrap mx-auto mt-3 mt-lg-5">
                                                    <div class="countdown-item">
                                                        <div
                                                            class="bgc-black-tp9 h-100 px-3 pt-4 pb-45 radius-100 shadow border-2 brc-white-tp7">
                                                            <h1 class="fa-4x text-green-l3 timer" data-type="day">
                                                                &nbsp;
                                                            </h1>
                                                            <div class="text-140 border-t-1 brc-white-tp9 pt-3">
                                                                天
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="countdown-item">
                                                        <div
                                                            class="bgc-black-tp9 h-100 px-3 pt-4 pb-45 radius-100 shadow border-2 brc-white-tp7">
                                                            <h1 class="fa-4x text-green-l3 timer" data-type="hour">
                                                                &nbsp;
                                                            </h1>
                                                            <div class="text-140 border-t-1 brc-white-tp9 pt-3">
                                                                時
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="countdown-item">
                                                        <div class="bgc-black-tp9 h-100 px-3 pt-4 pb-45 radius-100 shadow border-2 brc-white-tp7">
                                                            <h1 class="fa-4x text-green-l3 timer" data-type="minute">
                                                                &nbsp;
                                                            </h1>
                                                            <div class="text-140 border-t-1 brc-white-tp9 pt-3">
                                                                分
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="countdown-item">
                                                        <div class="bgc-black-tp9 h-100 px-3 pt-4 pb-45 radius-100 shadow border-2 brc-white-tp7">
                                                            <h1 class="fa-4x text-yellow-l2 timer" data-type="second">
                                                                &nbsp;
                                                            </h1>
                                                            <div class="text-140 border-t-1 brc-white-tp9 pt-3">
                                                                秒
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="mt-5 mb-2 text-130">
                                                    開報後，我們將透過Email通知您:
                                                </div>

                                                <form v-on:submit.prevent="onSubmit">
                                                    <div class="px-0 mx-auto radius-round bgc-black-tp5 input-group border-2 brc-white-tp4 col-12 col-sm-8 col-md-8 col-lg-6 col-xl-5">
                                                        <input name="email" placeholder="請輸入您的Email" type="email" 
                                                            required
                                                            class="form-control bgc-transparent form-control-lg radius-round shadow-none border-0 text-white"
                                                            v-model="form.email" />
                                                        <button type="submit" class="btn radius-round btn-primary text-600 text-110 px-4 m-3px">
                                                            通知我
                                                        </button>
                                                    </div>
                                                </form>
                                            
                                                <div class="text-130 mt-3">
                                                    分享此訊息

                                                    <a v-bind:href="social.lineUri" target="_blank" class="no-underline text-110" data-toggle="tooltip" data-placement="top" title="Line">
                                                        <i class="bgc-black-tp9 brc-white-tp2 border-1 p-25 w-6 radius-round fab fa-line text-white mx-1"></i>
                                                    </a>

                                                    <a v-bind:href="social.fbUri" target="_blank" class="no-underline text-110" data-toggle="tooltip" data-placement="top" title="Facebook">
                                                        <i class="bgc-black-tp9 brc-white-tp2 border-1 p-25 w-6 radius-round fab fa-facebook-square text-white mx-1"></i>
                                                    </a>
                                                    <!-- <a href="#" class="no-underline text-110">
                                                        <i class="bgc-black-tp9 brc-white-tp2 border-1 p-25 w-6 radius-round fab fa-instagram text-white mx-1"></i>
                                                    </a> -->
                                                </div>

                                                <div class="mt-5">
                                                    <router-link to="/acts" class="btn btn-outline-white radius-round text-600 text-110 px-5 m-3px"> 回活動列表 </router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import countdown from '../ActPage/Countdown.js';
import { Tooltip } from 'bootstrap';

export default {
    name: 'ComingSoon',
    data() {
        return {
            act: '',
            social:{
                lineUri:'',
                fbUri:''
            },
            form:{
                email:''
            }
        }
    },
    computed: {
        code() {
            return this.$route.params.code;
        }
    },
    created() {
        axios.get(`/api/configs/act/${this.code}`).then(({ data }) => {
            this.act = data;
            if (Date.now() >= new Date(this.act.regSTime).getTime()) {
                this.$router.push({name:'Activities'})
            }
            const diff = moment.duration(new Date(this.act.regSTime).getTime() - Date.now());
            countdown(diff);
        }).catch(error => {
            if (error.response.status === 404){
                this.$router.push({name:'NotFound'});
            }
        });

        const host = window.location.protocol + "//" + window.location.host;
        this.social.lineUri = `https://social-plugins.line.me/lineit/share?url=${host}/Activities/${this.code}`;
        this.social.fbUri = `https://www.facebook.com/sharer.php?u=${host}/Activities/${this.code}`;
    },
    mounted() {
        new Tooltip(document.body, {
            selector: "[data-toggle='tooltip']",
        })
    },
    methods:{
        onSubmit() {
            axios.post(`/api/notify/signup`, { code: this.code, email: this.form.email })
                .then(({data}) => { 
                    Swal.fire(data);
                });
        }
    }
}
</script>

<style scoped>
.body-container {
    background-color: #221d2e;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
}

@media (max-width: 700px) {
    .body-container {
        background-size: cover;
    }
}

@media (max-width: 998px) {
    .countdown-items {
        font-size: 0.8em;
    }
}

@media (max-width: 400px) {
    .countdown-items {
        font-size: 0.75em;
    }
}

.countdown-item {
    display: inline-block;
    width: 12.5em;
    height: 12.5em;
    margin: 0.5em;
}
</style>