<template>
    
    <div v-if="pageContent" class="mt-2" v-bind:class="{'p-lg-5 p-1' : style.bannerWidth === ''}">
        <div v-html="pageContent.content"></div>
    </div>
    <aside class="card text-center pos-fixed d-none d-sm-block aside-time">
        <div class="card-header bgc-dark">
            <div class="card-title text-white">距離活動報名結束還有</div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <div class="timer h4" data-type="day"></div>
                    <div class=" text-black-50">天</div>
                </div>
                <div class="col">
                    <div class="timer h4" data-type="hour"></div>
                    <div class=" text-black-50">時</div>
                </div>
                <div class="col">
                    <div class="timer h4" data-type="minute"></div>
                    <div class=" text-black-50">分</div>
                </div>
                <div class="col">
                    <div class="timer h4" data-type="second"></div>
                    <div class=" text-black-50">秒</div>
                </div>
            </div>
            <div class="mt-3">
                <RouterLink v-bind:to="`/${this.code}#signup`" class="btn btn-block btn-outline-primary" :class="{'disabled' : !act.canSignUp || act.isReadOnly}">
                    立即報名
                </RouterLink>
            </div>
        </div>
    </aside>
</template>

<script lang="js">
import axios from 'axios';
import moment from 'moment';
import 'moment/dist/locale/zh-tw';
import countdown from '../ActPage/Countdown.js';

export default {
    name: "ActContent",
    props:['act','style'],
    data() {
        return {
            pageContent: {}
        }
    },
    computed:{
        code(){
            return this.$route.params.code;
        },
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => { this.getData() },
            { immediate: true }
        )
    },
    updated(){
        const diff = moment.duration(new Date(this.act.regETime).getTime() - Date.now());
        countdown(diff);
    },
    methods: {
        getData(){
            if (this.$route.params.id !== undefined){
                axios.get(`/api/content/${this.$route.params.id}`)
                .then(({ data }) => this.pageContent = data)
                .catch(error => {
                    if (error.response.status === 404) {
                        this.$router.push({ name: 'NotFound' });
                    }
                });
            }
        }
    }
}
</script>

<style scoped>
    .aside-time {
        width: 17rem;transform: translateY(-50%)!important;top: 50%!important;right: 0!important;
    }
</style>