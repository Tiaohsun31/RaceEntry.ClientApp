<template>
    <Layout>
        <div class="bg-light">
            <div class="container pt-3">
                <!-- Search and Filter-->
                <SearchFilter position="Acts"></SearchFilter>
                <!-- End Search and Filter -->
                <div class="mt-4 mt-md-5">
                    <div class="row">
                        <!-- Act List -->
                        <div id="acts" class="col-md-8 vh-100">
                            <div class="card card-body border-0">
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="isApply">
                                            <label class="custom-control-label" for="customSwitch1">僅顯示可報名活動</label>
                                        </div>
                                    </div>
                
                                    <div class="col-12 col-md-6 text-sm-right">
                                        <hr class="d-block d-sm-none">
                                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-outline-primary btn-sm" v-bind:class="orderby === 'asc' ? 'active' : ''">
                                                <input type="radio" name="options" autocomplete="off" value="asc" v-model="orderby"> 日期由近到遠
                                            </label>
                                            <label class="btn btn-outline-primary btn-sm" v-bind:class="orderby === 'desc' ? 'active' : ''">
                                                <input type="radio" name="options" autocomplete="off" value="desc" v-model="orderby"> 日期由遠到近
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4" v-for="item,name in sortdata">
                                <h5>
                                    <span class="h3 text-danger"> {{ name.split('-')[1] }} </span>
                                    月，{{ name.split('-')[0] }}
                                </h5>
                                <div v-for="element in item">
                                    <div class="card mb-3" v-if="element.canSignUp || !isApply">
                                        <div class="row">
                                            <div class="col-md-3 col-4 pos-rel pr-0">
                                                <RouterLink v-bind:to="`/${element.actCode}`">
                                                    <img v-bind:src="element.square" class="img-fluid rounded-start" v-bind:alt="element.actName">
                                                </RouterLink>
                                            </div>
                                            <div class="col-md-9 col-8 pl-0">
                                                <span style="border-radius: 0% 0 50% 50%;"
                                                    class="float-right badge d-none d-sm-block px-3 py-2 text-white"
                                                    v-bind:class="labelStyle(element.displayLabel)">
                                                    {{element.displayLabel}}
                                                </span>
                                                <div class="card-body pb-0 py-2">
                                                    <RouterLink v-bind:to="`/${element.actCode}`" class="no-underline">
                                                        <div class="card-title h5 d-none d-sm-block">{{element.actName}}</div>
                                                        <div class="card-title text-truncate d-block d-sm-none">{{element.actName}}</div>
                                                    </RouterLink>
                                                    <div class="row">
                                                        <div class="col-md-8 col-12">
                                                            <div class="card-text mt-2 mt-sm-2">
                                                                <span data-toggle="tooltip" data-placement="top" title="活動日期">
                                                                    <strong> <i class="fas fa-calendar-day"></i> : </strong>
                                                                    {{ actDate(element.actDate) }}
                                                                </span>
                                                            </div>
                                                            <div class="card-text mt-1 d-none d-sm-block">
                                                                <span data-toggle="tooltip" data-bs-placement="top" title="活動地點">
                                                                    <strong> <i class="fas fa-map-marker-alt"></i> : </strong>
                                                                    {{element.address}}
                                                                </span>
                                                            </div>
                                                            <div class="card-text mt-1 d-none d-sm-block">
                                                                <span data-toggle="tooltip" data-bs-placement="top" title="報名時間">
                                                                    <strong> <i class="fas fa-calendar-minus"></i> : </strong>
                                                                    {{ shortDate(element.regSTime)}} -
                                                                    {{ shortDate(element.regETime)}}
                                                                </span>
                                                            </div>
                                                            <div class="card-text mt-1 d-none d-sm-block">
                                                                <span class="badge bgc-secondary-l3 text-secondary-d3 text-80 px-2 mr-1"
                                                                    v-for="tag in element.kmTags?.split(',')">
                                                                    {{tag}}
                                                                </span>
                                                            </div>
                                                            <div class="card-text mt-1 d-none d-sm-block">
                                                                <span class="badge bgc-secondary-l3 text-secondary-d3 text-80 px-2 mr-1"
                                                                    v-for="tag in element.otherTags?.split(',')">
                                                                    {{tag}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 col-12">
                                                            <div v-if="element.canSignUp"
                                                                class="card-text text-right d-none d-sm-block pos-abs position-b position-r mr-2">
                                                                <router-link v-bind:to="`/${element.actCode}#signup`" class="btn btn-info btn-sm px-4">
                                                                    我要報名
                                                                </router-link>
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
                        <!-- End Act List -->
                        <!-- Ad List -->
                        <div class="col-md-4 d-none d-sm-block" style="position: sticky; top: 100px; align-self: flex-start;">
                            <AdSidebar></AdSidebar>
                        </div>
                        <!-- End Ad List -->
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
    
    import SearchFilter from '../components/Layout/SearchFilter.vue';
    import AdSidebar from '../components/AdSidebar.vue';

    import axios from 'axios';
    import moment from 'moment';
    import 'moment/dist/locale/zh-tw';

    import { storeToRefs } from 'pinia';
    import { useFilterStore } from '@/store/actFilter.js'
    import { groupBy } from "lodash"

    export default {
        components: {
            SearchFilter,AdSidebar
        },
        setup(){
            const store = useFilterStore();
            const { filter } = storeToRefs(store);
            return { filter }
        },
        data() {
            return {
                isApply: false,
                orderby: 'desc',
                acts:[],
                month:[]
            }
        },
        created() {
            axios.get('/api/act').then(({data}) => this.acts = data);
        },
        computed: {
            sortdata() {
                this.month = [];
                let data = JSON.parse(JSON.stringify(this.acts));

                if (this.filter.selectedYears.length > 0) {
                    data = data.filter(x => this.filter.selectedYears.includes(x.year));
                };

                if (this.filter.startTime != '') { 
                    data = data.filter(({actDate}) => {
                        return moment(actDate).isSameOrAfter(this.filter.startTime);
                    });
                };
                
                if (this.filter.endTime != '') { 
                    data = data.filter(({actDate}) => {
                        return moment(actDate).isSameOrBefore(this.filter.endTime);
                    });
                };
                if (this.filter.selectedCategories.length > 0) {
                    data = data.filter(({category}) => { return this.filter.selectedCategories.includes(category) })
                };

                if (this.orderby === 'asc') {
                    data.sort((a,b) => new Date(a.actDate) - new Date(b.actDate));
                } else {
                    data.sort((a,b) => new Date(b.actDate) - new Date(a.actDate));
                }

                return groupBy(data,(b) => `${b.year}-${b.month}`);
            }
        },
        methods: {
            labelStyle(value) {
                switch (value) {
                    case '報名當中':
                        return "bg-success";
                    case '報名截止':
                        return "bg-danger";
                    case '即將開報': ;
                        return "sub-bg-color";
                    case '活動規劃中': ;
                        return "bg-warning";
                    case '活動結束':
                        return "bg-secondary";
                    default:
                        return "bg-info";
                }
            },
            actDate(value) {
                return moment(value).format('YYYY-MM-DD (dd)');
            },
            shortDate(value) {
                return moment(value).format('YYYY-MM-DD');
            },
        }
    }
</script>