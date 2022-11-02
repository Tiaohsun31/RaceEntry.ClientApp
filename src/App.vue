<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
//import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';

export default {
 data() {
   return {
     post: null,
   };
 },
 created() {
   // fetch the data when the view is created and the data is
   // already being observed
   this.fetchData();
 },
 methods: {
   fetchData() {
    // axios.get('/api/Activity', {
    //       params: {
    //           urlPath: 'focusline'
    //       }
    //   }).then(({ data }) => {
    //       this.post = data;
    //   });
      axios.get('/weatherforecast').then(({data}) => {
        this.post = data;
      })

    // fetch('/weatherforecast')
    //                 .then(r => {
    //                   console.log(r); 
    //                   return r.json();
    //                 })
    //                 .then(json => {
    //                     this.post = json;

    //                     return;
    //                 });
   },
 },
};
</script>

<template>
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
    }

        .logo:hover {
            filter: drop-shadow(0 0 2em #646cffaa);
        }

        .logo.vue:hover {
            filter: drop-shadow(0 0 2em #42b883aa);
        }
</style>