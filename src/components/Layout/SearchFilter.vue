<template>
    <template v-if="position === 'Home'">
        <div class="row justify-content-md-center">
            <div class="col col-md-8">
                <select ref="select" name="code" class="form-control" data-live-search="true" title="請選擇活動">
                    <template v-for="item in acts">
                        <optgroup v-bind:label="item.year+'&frasl;'+item.month">
                            <option v-for="element in item.acts"
                                v-bind:class="Date.parse(element.actDate) <= Date.now() ? 'bgc-grey-l1' : ''"
                                v-bind:value="element.actCode"> {{ shortDate(element.actDate) }} &frasl; {{ element.actName }}
                            </option>
                        </optgroup>
                    </template>
                
                    <!-- <option v-for="item in acts" v-bind:class="Date.parse(item.date) <= Date.now() ? 'bgc-grey-l1' : ''" 
                            v-bind:value="item.code"> {{ item.date }} &frasl; {{ item.name }}
                        </option> -->
                </select>
            </div>
        </div>

        <div class="text-center my-md-5 my-3"> -- OR -- </div>

        <div class="row my-md-4">
            <div class="col-md-5 col-12">
                <label class="col-form-label text-dark-l4 font-bold h5"> 年份 </label>
                <div class="btn-group-toggle " data-toggle="buttons">
                    <template v-for="item in options.years">
                        <label role="button"
                            class="d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 mb-1 overflow-hidden">
                            <input type="checkbox" name="SelectedYears" v-bind:value="item" v-model="filter.selectedYears">
                            {{ item }}
                        </label>
                    </template>
                </div>
            </div>
            <div class="col-md-5 col-12">
                <label class="col-form-label text-dark-l4 font-bold h5"> 日期區間 </label>
                <div class="d-none d-sm-block">
                    <div class="input-group ">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> 從 </span>
                        </div>
                        <input type="date" aria-label="StartDate" class="form-control" name="StartTime" v-model="filter.startTime">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> 到 </span>
                        </div>
                        <input type="date" aria-label="EndDate" class="form-control" name="EndTime" v-model="filter.endTime">
                    </div>
                </div>

                <div class="d-block d-sm-none">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> 從 </span>
                        </div>
                        <input type="date" aria-label="StartDate" class="form-control d-block d-sm-none" name="StartTime" v-model="filter.startTime">
                    </div>
                    <div class="input-group mt-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> 到 </span>
                        </div>
                        <input type="date" aria-label="EndDate" class="form-control d-block d-sm-none" name="EndTime" v-model="filter.endTime">
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-12">
                <label class="col-form-label text-white h5"> 搜尋 </label>
                <button type="button" class="btn btn-orange btn-block" v-on:click="toAct()"> 搜尋 </button>
            </div>
        </div>
    </template>
    <template v-else-if="position === 'Aside'">
        <div class="modal-body">
            <div class="ace-scroll-inner">
    
                <div class="pos-rel mt-3">
                    <div class="position-tl h-100  brc-secondary-l2 ml-425"></div>
                    <div class="pos-rel mt-n3">
    
                        <div class="row justify-content-md-center my-4">
                            <div class="col-12">
                                <select ref="select" name="code" class="form-control" data-live-search="true" title="請選擇活動">
                                    <template v-for="item in acts">
                                        <optgroup v-bind:label="item.year+'&frasl;'+item.month">
                                            <option v-for="element in item.acts"
                                                v-bind:class="Date.parse(element.actDate) <= Date.now() ? 'bgc-grey-l1' : ''"
                                                v-bind:value="element.actCode"> {{ shortDate(element.actDate) }} &frasl; {{ element.actName }}
                                            </option>
                                        </optgroup>
                                    </template>
                                </select>
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
                                                <input type="checkbox" name="SelectedYears" v-bind:value="item"
                                                    v-model="filter.selectedYears">
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
                                        <input type="date" aria-label="StartDate" class="form-control" name="StartTime"
                                            v-model="filter.startTime">
                                    </div>
                                    <div class="input-group mt-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> 到 </span>
                                        </div>
                                        <input type="date" aria-label="EndDate" class="form-control" name="EndTime"
                                            v-model="filter.endTime">
                                    </div>
                                </div>
    
                                <div class="mb-3">
                                    <label class="col-form-label text-dark-l4 font-bold"> 類別 </label>
                                    <div class="btn-group-toggle" data-toggle="buttons">
                                        <template v-for="item in options.categories">
                                            <label role="button"
                                                class="d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 overflow-hidden">
                                                <input type="checkbox" name="SelectedCategories" v-bind:value="item"
                                                    v-model="filter.selectedCategories">
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
    </template>
    <template v-else-if="position === 'Acts'">
        <div class="card card-body border-0">
            <div class="row justify-content-md-center">
                <label class="col-form-label col-md-2 d-none d-sm-block"> 活動列表 </label>
                <div class="col-12 col-md-10 mb-3">
                    <select ref="select" name="code" class="form-control" data-live-search="true" title="請選擇活動">
                        <template v-for="item in acts">
                            <optgroup v-bind:label="item.year+'&frasl;'+item.month">
                                <option v-for="element in item.acts"
                                    v-bind:class="Date.parse(element.actDate) <= Date.now() ? 'bgc-grey-l1' : ''"
                                    v-bind:value="element.actCode"> {{ shortDate(element.actDate) }} &frasl; {{ element.actName }}
                                </option>
                            </optgroup>
                        </template>
                    </select>
                </div>
            </div>
    
            <div class="accordion mt-4" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="card-title bgc-green-l3 text-dark-tp4 brc-green-tp1">
                            <a class="btn py-3 btn-lighter-secondary brc-h-green-m1 border-l-6 accordion-toggle radius-0 collapsed"
                                href="#collapseOne" data-toggle="collapse" aria-expanded="false"
                                aria-controls="collapseOne">
                                <i class="fa fa-angle-right toggle-icon mr-1"></i>
                                進階搜尋
                            </a>
                        </h2>
                    </div>
    
                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body border-0">
                            <div class="row mt-md-2">
                                <div class="col-12 mb-4">
                                    <label class="col-form-label text-dark-l4"> 年份 </label>
                                    <div class="btn-group-toggle " data-toggle="buttons">
                                        <template v-for="item in options.years">
                                            <label role="button"
                                                class=" d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 overflow-hidden"
                                                v-bind:class="store.filter.selectedYears.includes(item) ? 'active' : ''">
                                                <input type="checkbox" name="SelectedYears" v-bind:value="item"
                                                    v-model="store.filter.selectedYears">
                                                {{ item }}
                                            </label>
                                        </template>
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <label class="col-form-label text-dark-l4"> 日期區間 </label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> 從 </span>
                                        </div>
                                        <input type="date" aria-label="StartDate" class="form-control" name="StartTime"
                                            v-model="store.filter.startTime">
                                    </div>
                                    <div class="input-group mt-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> 到 </span>
                                        </div>
                                        <input type="date" aria-label="EndDate" class="form-control" name="EndTime"
                                            v-model="store.filter.endTime">
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <label class="col-form-label text-dark-l4"> 類別 </label>
                                    <div class="btn-group-toggle " data-toggle="buttons">
                                        <template v-for="item in options.categories">
                                            <label role="button"
                                                class="d-style btn btn-sm btn-outline-light btn-a-lighter-info text-110 mr-2 overflow-hidden"
                                                v-bind:class="store.filter.selectedCategories.includes(item) ? 'active' : ''">
                                                <input type="checkbox" name="SelectedCategories" v-bind:value="item"
                                                    v-model="store.filter.selectedCategories">
                                                {{ item }}
                                            </label>
                                        </template>
                                    </div>
                                </div>
    
                                <!-- <div class="col-12 mt-2">
                                                <button type="submit" class="btn btn-orange btn-block"> 搜尋 </button>
                                            </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
import axios from 'axios';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select';
import moment from 'moment';
import { store } from '../../store/store.js'

export default {
    name: 'SearchFilter',
    props: ['position'],
    data(){
        return {
            acts:{},
            options:[],
            filter:{
                selectedCategories:[],
                selectedYears:[],
                startTime:'',
                endTime:''
            },
            store
        }
    },
    created(){
        axios.get('/api/configs/recommendActs').then(({data}) => this.acts = data);
        axios.get('/api/configs/filter').then(({data}) => this.options = data);
    },
    updated() {
        $(this.$refs.select).selectpicker('refresh');
    },
    methods: {
        shortDate: function (value) {
            return moment(value).format('YYYY-MM-DD');
        },
        toAct() {
            store.setFilter(JSON.parse(JSON.stringify(this.filter)));
            this.$router.push({name: 'Acts'}).catch(()=>{});
        }
    }
}
</script>