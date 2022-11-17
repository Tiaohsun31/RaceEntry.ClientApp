<template>
    <Layout>
        <div id="content" class="">

            <div class="row">
                <div class="col-md-2">
                    <ActSidebar v-bind:menubars="menubars"></ActSidebar>
                </div>
                <div class="col-md-10 col-12">
                    <ActContent></ActContent>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import ActSidebar from './ActSidebar.vue';
import ActContent from './ActContent.vue';
import axios from 'axios';
export default {
    name: 'ActLoyout',
    components: {
        ActSidebar, ActContent
    },
    data(){
        return {
            menubars:[]
        }
    },
    computed:{
        code(){
            return this.$route.params.code;
        }
    },
    mounted(){
        axios.get(`/api/menubar/${this.code}`).then(({data}) => this.menubars = data);
    }
}
</script>

<style>
@import '../../styles/ace-themes.css';
</style>