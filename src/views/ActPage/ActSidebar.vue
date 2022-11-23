<template>
    <div id="sidebar" class="sidebar sidebar-color sidebar-dark2 sidebar-fixed expandable" data-backdrop="true"
        data-swipe="true" data-dismiss="true">
        <div class="sidebar-inner">
            <div id="ace-scroll" class="flex-grow-1"> 
                <ul class="nav has-active-border active-on-right mb-5">
                    <template v-for="item in menubars">
                        <li class="nav-item" v-bind:class="{'active open':item.key === this.route.name}" v-if="item.list.length > 1">
                            <a href="#" class="nav-link dropdown-toggle">
                                <span class="nav-text fadeable">
                                    <span> {{ item.key }}</span>
                                </span>
                                <b class="caret fa fa-angle-left toggle-icon rt-n90"></b>
                            </a>
                            <div class="submenu collapse hideable">
                                <ul class="submenu-inner" v-for="element in item.list">
                                    <li class="nav-item" v-bind:class="{'active':element.name === this.route.subName}">
                                        <a href="#" v-on:click.prevent="setRouterName(item,element)" class="nav-link">
                                            <span class="nav-text">
                                                <span> {{ element.name }}</span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item" v-bind:class="{'active':item.key === this.route.name}" v-else>
                            <a href="#" class="nav-link" v-on:click.prevent="setRouterName(item,null)">
                                <span class="nav-text fadeable">
                                    <span>{{ item.key }}</span>
                                </span>
                            </a>
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
    data(){
        return {
            route:{
                name:'',
                subName:''
            }
        }
    },
    computed:{
        
    },
    mounted(){
        $('#sidebar').aceSidebar();
    },
    methods:{
        setRouterName(item,element){
            if (element != null) {
                this.route.name = element.groupName;
                this.route.subName = element.name;
                if (this.isOutSide(element.urls)) {
                    window.open(element.urls, element.target);
                } else {
                    this.$router.push({path:`${element.urls}`});
                }
            } else {
                this.route.name = item.key;
                this.route.subName = '';
                if (this.isOutSide(item.list[0].urls)) {
                    window.open(item.list[0].urls, item.list[0].target);
                } else {
                    this.$router.push({path:`${item.list[0].urls}`});
                }
            }
        },
        isOutSide(value){
            return /https?:\/\//.test(value);
        }
    }
}
</script>

<style scoped>
    .sidebar-dark2 .nav > .nav-item.active:not(.open) > .nav-link {
        font-weight: normal !important; 
    }
    .sidebar-dark2 .submenu .nav-item.active:not(.open) > .nav-link {
        font-weight: normal !important; 
    }
    .sidebar{
        font-family: "Roboto", "Microsoft JhengHei", sans-serif !important;
    }
</style>