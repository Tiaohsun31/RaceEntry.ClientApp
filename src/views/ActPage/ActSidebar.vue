<template>

    <div id="sidebar" class="sidebar sidebar-color sidebar-dark2 sidebar-fixed expandable" data-backdrop="true"
        data-swipe="true" data-dismiss="true">
        <div class="sidebar-inner">
            <div id="ace-scorll" class="ace-scroll flex-grow-1" data-ace-scroll="{}"> 
                <ul class="nav has-active-border active-on-right mb-5">
                    <template v-for="item in menubars">
                        <li class="nav-item dropdown" v-if="item.list.length > 1">
                            <a href="#" class="nav-link " data-toggle="dropdown">
                                <span class="nav-text fadeable">
                                    <span> {{ item.key }}</span>
                                </span>
                                <b class="caret fa fa-angle-left toggle-icon rt-n90"></b>
                            </a>
                            <div class="submenu collapse hideable">
                                <ul class="submenu-inner" v-for="element in item.list">
                                    <li class="nav-item">
                                        <!-- <a v-bind:href="element.urls" v-bind:target="element.target" class="nav-link"
                                            v-on:click.prevent="set(item,element)">
                                            <span class="nav-text">
                                                <span> {{ element.name }}</span>
                                            </span>
                                        </a> -->
                                        <a v-if="/https?:\/\//.test(element.urls)" v-bind:href="element.urls" v-bind:target="element.target" class="nav-link">
                                            <span class="nav-text fadeable">
                                                <span>{{ element.name }}</span>
                                            </span>
                                        </a>
                                        <router-link v-else :to="element.urls" class="nav-link" v-bind:target="element.urls">
                                            <span class="nav-text fadeable">
                                                <span>{{ element.name }}</span>
                                            </span>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item" v-else>
                            <a v-if="/https?:\/\//.test(item.list[0].urls)" v-bind:href="item.list[0].urls" class="nav-link" v-bind:target="item.list[0].target">
                                <span class="nav-text fadeable">
                                    <span>{{ item.key }}</span>
                                </span>
                            </a>
                            <router-link v-else :to="item.list[0].urls" class="nav-link" v-bind:target="item.list[0].target">
                                <span class="nav-text fadeable">
                                    <span>{{ item.key }}</span>
                                </span>
                            </router-link>
                            <!-- <a v-bind:href="item.list[0].urls" class="nav-link" v-bind:target="item.list[0].target">
                                <span class="nav-text fadeable">
                                    <span>{{ item.key }}</span>
                                </span>
                            </a> -->
                        </li>
                    </template>
                    
                </ul>
                <div class="sidebar-section">
                    <button type="button"
                        class="d-style d-none d-xl-flex collapse btn-primary btn btn-burger px-2 ml-2 mt-2 mr-2  border-0"
                        data-toggle="sidebar" data-target="#sidebar" aria-expanded="true" aria-controls="sidebar">
                        <i class="fa fa-angle-double-left text-120  d-n-collapsed"></i>
                        <i class="fa fa-angle-double-right text-120 d-collapsed "></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class=" fixed-bottom mb-5 pb-3">
        <button type="button"
            class="d-style d-flex d-xl-none collapse btn-primary btn btn-burger px-2 ml-2 mt-2 mr-2  border-0"
            data-toggle-mobile="sidebar" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false"
            aria-label="Toggle sidebar">
            <i class="fa fa-angle-double-left text-120  d-collapsed"></i>
            <i class="fa fa-angle-double-right text-120 d-n-collapsed "></i>
        </button>
    </div>
</template>
<script>

export default {
    name: 'ActSideBar',
    props: ['menubars'],
    // updated(){
    //     $('#ace-scroll').aceScroll();
    // },
    // data(){
    //     return {
    //         menubars:[]
    //     }
    // },
    // computed:{
    //     code(){
    //         return this.$route.params.code;
    //     }
    // },
    // created(){
    //     axios.get(`/api/menubar/${this.code}`).then(({data}) => this.menubars = data);
    // }
}
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
</style>