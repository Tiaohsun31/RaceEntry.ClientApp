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
        name:'Design',
        data(){
            return {
                content:''
            }
        },
        created(){
            axios.get('/api/webSetting/design').then(({data}) => this.content = data);
        }
    }
</script>