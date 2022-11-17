<template>

    <div id="sidebar" class="sidebar sidebar-color sidebar-dark2 sidebar-fixed expandable accordion"
        data-backdrop="true" data-swipe="true" data-dismiss="true">
        <div class="sidebar-inner">
            <div class="ace-scroll flex-grow-1" data-ace-scroll="{}">
                
                <ul class="nav has-active-border active-on-right">
                    <li class="nav-item" v-for="item,index in menubars">
                        <template v-if="item.list.length > 1">
                            <a href="#" class="nav-link collapsed" v-bind:data-target="'#collapse'+index" data-toggle="collapse" aria-expanded="false" v-bind:aria-controls="'#collapse'+index">
                                <span class="nav-text fadeable">
                                    <span> {{ item.key }}</span>
                                </span>
                                <b class="caret fa fa-angle-left toggle-icon rt-n90"></b>
                            </a>
                            <div v-bind:id="'collapse'+index" class="submenu collapse hideable" v-bind:aria-labelledby="'#collapse'+index" data-parent="#sidebar">
                                <ul class="submenu-inner" v-for="element in item.list">
                                    <li class="nav-item">
                                        <a href="html/dashboard-2.html" class="nav-link">
                                            <span class="nav-text">
                                                <span> {{ element.name }}</span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </template>
                        <template v-else>
                            <a v-bind:href="item.list[0].urls" class="nav-link">
                                <span class="nav-text fadeable">
                                    <span>{{ item.key }}</span>
                                </span>
                            </a>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class=" fixed-bottom mb-5 pb-3">
        <button type="button"
            class="d-style d-none d-xl-flex collapse btn-primary btn btn-burger px-2 ml-2 mt-2 mr-2  border-0"
            data-toggle="sidebar" data-target="#sidebar" aria-expanded="true" aria-controls="sidebar">
            <i class="fa fa-angle-double-left text-120  d-n-collapsed"></i>
            <i class="fa fa-angle-double-right text-120 d-collapsed "></i>
        </button>
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
    props: ['menubars']
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