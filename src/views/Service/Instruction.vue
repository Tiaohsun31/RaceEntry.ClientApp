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
        name:'Instruction',
        data(){
            return {
                content:''
            }
        },
        created(){
            axios.get('/api/webSetting/instruction').then(({data}) => this.content = data);
        }
    }
</script>