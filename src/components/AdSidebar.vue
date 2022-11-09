<template>
    <div v-for="item in ads" class="mb-3">
        <a v-bind:href="item.urls">
            <img v-bind:src="item.src" class="img-fluid" alt="item.alt">
        </a>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        name:'AdSidebar',
        data(){
            return {
                ads:[]
            }
        },
        mounted(){
            axios.get('/api/configs/ads').then(({data}) => this.ads = data);
        }
    }
</script>