<template>
    <Layout>
        <!-- marquee -->
        <Transition v-if="marquee.length" name="slide-fade" appear>
            <div id="carouselExampleControls" class="carousel slide bgc-primary text-white py-2" data-ride="false">
                <div class="carousel-inner">
                    <div class="text-center">
                        <template v-for="(item, index) in marquee">
                            <div class="carousel-item" v-bind:class="index == 0 ? ' active' : ''">
                                <a v-bind:href="item.urls" class="text-white text-110 text-nowrap" style="width:21rem" v-text="item.title"></a>
                            </div>
                        </template>
                    </div>
                </div>1
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </Transition>
        <!-- End marquee-->
        <!-- Banner -->
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
            <div class="carousel-inner">
                <template v-for="(item,index) in banners">
                    <div class="carousel-item" v-bind:class="{ active:index == 0 }">
                        <div class="card border-0 mb-3">
                            <div class="row bgc-light">
                                <div class="col-md-4 align-self-center d-none d-md-block">
                                    <div class="card-body text-center text-secondary ">
                                        <h2 class="card-title text-primary font-bolder" v-text="item.actName"> </h2>
                                        <p class="card-text h3 mt-4" v-text="'????????????:' + shortDate(item.actDate)"> </p>
                                        <p class="card-text h3 mt-4" v-text="'????????????:' + shortDate(item.regETime)"> </p>
                                        <p class="card-text h3 mt-4" v-text="item.address"> </p>
                                        <RouterLink v-if="item.canSignUp" :to="`/${item.actCode}#signup`" 
                                            class="btn btn-lg btn-orange rounded-pill mt-5 px-5">
                                            ????????????
                                        </RouterLink>
                                        <router-link v-bind:to="{name:'HomePage',params:{code:item.actCode}}"
                                        class="btn btn-lg btn-info rounded-pill mt-5 px-5">
                                            ????????????
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-md-8 col-12">
                                    <img v-bind:src="item.rectangle" class="img-fluid rounded-start d-none d-sm-block" v-bind:alt="item.actName">
                                    <img v-bind:src="item.square" class="img-fluid rounded-start d-block d-sm-none" v-bind:alt="item.actName">
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <!-- End Banner-->
        <!-- Search and Filter-->
        <div class="container mt-md-4">
            <SearchFilter position="Home"></SearchFilter>
        </div>
        <!-- End Search and Filter -->
        <!-- Act List -->
        <div class="border-t-4 brc-orange mt-5 pb-5 bgc-primary-l3">
            <div class="my-5 container">
                <div class="row">
                    <template v-for="item in recommendActs">
                        <div class="col-md-3 col-12 mb-4">
                            <div class="card pos-rel shadow-sm" v-bind:class="item.displayLabel == '????????????' ? 'border-3 brc-orange' : ''">
                                <span v-show="item.displayLabel == '????????????'"
                                    class="badge bgc-orange-d2 text-white position-tl m-n25 badge-pill text-110 border-3 brc-white-tp6 radius-4"
                                    style="z-index:1">????????????</span>
                                <div class="d-style overflow-hidden">
                                    <img v-bind:src="item.square" class=" img-fluid d-zoom-2" v-bind:alt="item.name"
                                        style="height: 250px;z-index:0">
                                </div>
                                <div class="card-body">
                                    <div class="card-title text-primary h5 text-truncate">
                                        {{ item.actName }}
                                    </div>
                                    <div class="card-text text-secondary mt-2"> ????????????: {{ actDate(item.actDate) }} </div>
                                    <div class="card-text text-secondary mt-2">
                                        ????????????: {{ shortDate(item.shortDate) }}
                                    </div>
                                    <div class="card-text text-secondary mt-2"> {{ item.address }} </div>
                                    <div class="card-text mt-2">
                                        <span class="badge bgc-secondary-l3 text-secondary-d3 text-80 px-2 mr-1"
                                            v-for="tag in item.kmTags?.split(',')">
                                            {{tag}}
                                        </span>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col">
                                            <router-link v-bind:to="{name:'HomePage',params:{code:item.actCode}}"
                                                class="btn btn-block btn-info text-white rounded-pill px-4">
                                                ????????????
                                            </router-link>
                                        </div>
                    
                                        <div v-if="item.canSignUp" class="col">
                                            <router-link v-bind:to="`/${item.actCode}#signup`" class="btn btn-block btn-orange rounded-pill px-4">
                                                ????????????
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    
                </div>
                <div class="text-center mt-5">
                    <router-link to="/acts" class="btn btn-lg btn-orange px-5"> ???????????? </router-link>
                </div>
            </div>
        </div>
        <!-- End Act List -->

    </Layout>
</template>

<script>


import SearchFilter from '../components/Layout/SearchFilter.vue';
import axios from 'axios';
import moment from 'moment';
import 'moment/dist/locale/zh-tw';

export default {
    components:{
        SearchFilter
    },
    data() {
        return {
            marquee: [],
            recommendActs: [],
            banners:[],
        }
    },
    created(){
        let endpoints = [
            `/api/webSetting/marquee`,
            `/api/webSetting/banners`,
            `/api/act?number=12`,
        ];
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then(([{ data: marquee }, { data: banners }, { data:recommendActs }]) => {
                this.marquee = marquee;
                this.banners = banners;
                this.recommendActs = recommendActs;
            });
    },
    methods: {
        actDate: function (value) {
            return moment(value).format('YYYY-MM-DD (dd)');
        },
        shortDate: function (value) {
            return moment(value).format('YYYY-MM-DD');
        },
    }
}
</script>

<style scoped>

.slide-fade-enter-active {
    transition: all 1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>