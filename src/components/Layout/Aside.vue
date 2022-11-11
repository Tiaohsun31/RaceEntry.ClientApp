<template>
    <div class="d-sm-none footer footer-sm footer-fixed mt-0 bgc-primary">
        <div class="footer-inner">
            <div
                class="btn-group d-flex h-100 mx-2 border-x-1 border-t-2 brc-primary-m3 bgc-white-tp1 radius-t-1 shadow">
                <button class="btn btn-outline-primary btn-h-lighter-primary btn-a-lighter-primary border-0 text-125"
                    data-toggle="modal" data-target="#aside">
                    賽事搜尋
                </button>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <div class="modal fade aside-right ace-aside aside-below-nav my-2" id="aside" tabindex="-1"
            aria-labelledby="asideLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content shadow border-0 radius-0">

                    <div class="modal-header p-0 radius-0 border-none border-t-3 brc-primary-m1 shadow-sm">
                        <h5 class="flex-grow-1 text-blue-d1 text-120 py-3 ml-3 mb-0">
                            進階搜尋
                        </h5>

                        <a href="#" class="close m-0 border-l-1 brc-grey-m4" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </a>
                    </div>

                    <div class="modal-body">
                        <div class="ace-scroll-inner">

                            <div class="pos-rel mt-3">
                                <div class="position-tl h-100  brc-secondary-l2 ml-425"></div>
                                <div class="pos-rel mt-n3">

                                    <div class="row justify-content-md-center my-4">
                                        <div class="col-12">
                                            <SelectActs v-bind:acts="acts"></SelectActs>
                                        </div>
                                    </div>
                                    <hr>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label class="col-form-label text-dark-l4 font-bold"> 年份 </label>
                                                <div class="btn-group-toggle " data-toggle="buttons">
                                                    <template v-for="item in options.years">
                                                        <label role="button"
                                                            class=" d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 mb-1 overflow-hidden">
                                                            <input type="checkbox" name="SelectedYears" v-bind:value="item" v-model="filter.selectedYears">
                                                            {{ item }}
                                                        </label>
                                                    </template>
                                                </div>
                                            </div>
                                    
                                            <div class="mb-3">
                                                <label class="col-form-label text-dark-l4 font-bold"> 日期區間 </label>
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"> 從 </span>
                                                    </div>
                                                    <input type="date" aria-label="StartDate" class="form-control" name="StartTime" v-model="filter.startTime">
                                                </div>
                                                <div class="input-group mt-2">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"> 到 </span>
                                                    </div>
                                                    <input type="date" aria-label="EndDate" class="form-control" name="EndTime" v-model="filter.endTime">
                                                </div>
                                            </div>
                                    
                                            <div class="mb-3">
                                                <label class="col-form-label text-dark-l4 font-bold"> 類別 </label>
                                                <div class="btn-group-toggle" data-toggle="buttons">
                                                    <template v-for="item in options.categories">
                                                        <label role="button"
                                                            class="d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 overflow-hidden">
                                                            <input type="checkbox" name="SelectedCategories" 
                                                            v-bind:value="item" v-model="filter.selectedCategories">
                                                            {{item}}
                                                        </label>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-orange px-4 border-2" v-on:click="toAct()">
                        搜尋
                    </button>
                </div>
            </div>
        </div>
    </Teleport>

</template>

<script>
import SelectActs from '../SelectActs.vue';
import axios from 'axios';
import { store } from '../../store/store.js'

export default {
    name: 'Aside',
    components:{
        SelectActs
    },
    data() {
        return {
            acts:[],
            options: {
                years:[],
                categories:[],
            },
            filter:{
                selectedCategories:[],
                selectedYears:[],
                startTime:'',
                endTime:''
            }
        }
    },
    mounted(){
        axios.get('/api/configs/filter').then(({data}) => this.options = data);
        axios.get('/api/configs/acts').then(({data}) => this.acts = data);
    },
    methods:{
        toAct() {
            $('#aside').modal('toggle');
            store.setFilter(JSON.parse(JSON.stringify(this.filter)));
            this.$router.push({name: 'acts'}).catch(()=>{});
        }
    }
}
</script>
