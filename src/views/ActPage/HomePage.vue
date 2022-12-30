<template>
    <div>
        <div v-if="pageContent.isDefault">
            <div class="text-center bgc-transparent">
                <div class=" container py-4">
                    <h1 class="py-4 text-primary font-weight-bold"> {{ act.actName }} </h1>
                    <div class="mx-auto pt-3" style="max-width: 350px;">
                        <h3 class="rounded py-2 px-4 text-orange" style=" border:2px solid #fd7e14"> 報名截止剩餘 </h3>
                    </div>

                    <div class="countdown-items d-flex justify-content-center flex-wrap mx-auto mt-3 mt-lg-5">
                        <div class="countdown-item">
                            <div class="h-100 px-3 pt-4 pb-45 radius-100 shadow border-2 brc-secondary">
                                <h1 class="fa-4x main-color font-bolder timer pt-md-3" data-type="day">22</h1>
                                <div class="text-140 border-t-1 brc-secondary pt-3">
                                    天
                                </div>
                            </div>
                        </div>

                        <div class="countdown-item">
                            <div class="h-100 px-3 pt-4 pb-45 radius-100 shadow border-2 brc-secondary">
                                <h1 class="fa-4x main-color font-bolder timer pt-md-3" data-type="hour">12</h1>
                                <div class="text-140 border-t-1 brc-secondary  pt-3">
                                    時
                                </div>
                            </div>
                        </div>

                        <div class="countdown-item">
                            <div class="h-100 px-3 pt-4 pb-45 radius-100 shadow border-2 brc-secondary">
                                <h1 class="fa-4x main-color font-bolder timer pt-md-3" data-type="minute">39</h1>
                                <div class="text-140 border-t-1 brc-secondary pt-3">
                                    分
                                </div>
                            </div>
                        </div>

                        <div class="countdown-item">
                            <div class=" h-100 px-3 pt-4 pb-45 radius-100 shadow border-2 brc-secondary ">
                                <h1 class="fa-4x main-color font-bolder timer pt-md-3" data-type="second">53</h1>
                                <div class="text-140 border-t-1 brc-secondary pt-3">
                                    秒
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End 時間 -->

                    <div class="h4 text-secondary mt-3 d-none d-sm-block">
                        報名區間: {{ signUpRange() }}
                    </div>
                    <div class="text-secondary mt-3 text-center d-block d-sm-none">
                        <h4> 報名區間 </h4>
                        <h4>{{ signUpRange() }}</h4>
                    </div>
                </div>
            </div>

            <div class=" container">
                <section class="pt-lg-5 pt-3">
                    <div class="row my-5">
                        <div v-for="item in pageContent.actGroup" class="col-md-3 col-12 mb-3">
                            <article class="text-center bgc-white radius-3 overflow-hidden shadow">
                                <header class=" bgc-primary pt-5">
                                    <strong class="d-block text-white mb-4" style="font-size: 50px;line-height: 0.7;">
                                        <span class=" align-bottom text-50"> NT$</span>
                                        {{ item.unitPrice }}
                                        <span class=" align-bottom text-40">/每人</span>
                                    </strong>
                                    <h3 class="text-white pt-2"> {{ item.name }} </h3>
                                    <svg class=" border-bottom-0 border-left-0 border-right-0" version="1.1"
                                        preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="70px"
                                        viewBox="0 0 300 70">
                                        <path
                                            d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729 c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z"
                                            opacity="0.6" fill="#ffffff"></path>
                                        <path
                                            d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729 c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z"
                                            opacity="0.6" fill="#ffffff"></path>
                                        <path
                                            d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716 H42.401L43.415,98.342z"
                                            opacity="0.7" fill="#ffffff"></path>
                                        <path
                                            d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428 c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z"
                                            fill="#ffffff"></path>
                                    </svg>
                                </header>

                                <div class=" p-4" v-if="item.freebies">
                                    <ul class="list-unstyled text-left mx-auto mb-1">

                                        <li class="mb-2" v-for="element in item.freebies">
                                            <i class="fa text-125 mr-1 mt-1"
                                                v-bind:class='element.status ? "fa-check text-success-m2" : "fa-times text-danger-m3 ml-1"'></i>
                                            <span class="text-125 font-bolder">
                                                {{ element.name }}
                                            </span>
                                        </li>

                                    </ul>
                                </div>

                            </article>
                        </div>

                    </div>
                </section>
            </div>
        </div>

        <!-- 首頁內容 -->
        <div v-if="pageContent.content">
            <div class="p-lg-5" v-html="pageContent.content"></div>
        </div>
        <!-- End 首頁內容 -->

        <div id="signup" class="row pt-md-5 pt-3 pb-5">
            <div class="col-md-4 offset-md-2 col-6">
                <RouterLink class="btn btn-block btn-lg btn-primary" v-bind:to="{name:'CreatePersonal'}" :class="{'disabled' : !act.canSignUp || act.isReadOnly}">
                    <i class="fas fa-user-alt mr-1"></i>
                    個人報名
                </RouterLink>
            </div>
            <div class="col-md-4 col-6">
                <RouterLink v-bind:to="{name:'CreateGroup'}" class="btn btn-block btn-lg btn-primary" :class="{'disabled' : !act.canSignUp || act.isReadOnly}">
                    <i class="fas fa-users mr-1"></i>
                    團體報名
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import 'moment/dist/locale/zh-tw';
import countdown from '../ActPage/Countdown.js';

export default {
    name: "HomePage",
    props: ['act','style'],
    data() {
        return {
            pageContent: ''
        }
    },
    computed: {
        code() {
            return this.$route.params.code;
        }
    },
    updated() {
        const diff = moment.duration(new Date(this.act.regETime).getTime() - Date.now());
        countdown(diff);

        var section = this.$router.currentRoute.value.hash.replace("#", "");
        if (section){
            this.$nextTick(() => window.document.getElementById(section).scrollIntoView());
        } 
    },
    mounted() {
        axios.get(`/api/content/homePage/${this.code}`)
            .then(({ data }) => this.pageContent = data)
            .catch(error => {
                if (error.response.status === 404) {
                    this.$router.push({ name: 'NotFound' });
                }
            });
    },
    methods: {
        signUpRange() {
            return `${moment(this.act.regSTime).format('LLdddd')}至${moment(this.act.regETime).format('LLdddd')}`;
        }
    }
}
</script>

<style scoped>
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