<template>
    <Layout>
        <div class="container my-5"> 
            <div v-if="content != ''" v-html="content"></div>
        </div>
    </Layout>
</template>

<script lang="js">
    import axios from 'axios';

    export default {
        name:'Timing',
        data(){
            return {
                content:''
            }
        },
        created(){
            axios.get('/api/webSetting/timing').then(({data}) => this.content = data);
        }
    }
</script>