<template>
    <div> template </div>
</template>
<script>
import axios from 'axios';
import ActLayout from './ActLayout.vue';

export default {
    name: "ActContent",
    data(){
        return {
            pageContent:''
        }
    },
    computed:{
        code(){
            return this.$route.params.code;
        },
        id(){
            return this.$route.params.id;
        }
    },
    created(){
        axios.get(`/api/content/${this.id}`).then(({data}) => this.pageContent == data);
    },
    methods:{
        
    }
    //components: { ActLayout }
}
</script>