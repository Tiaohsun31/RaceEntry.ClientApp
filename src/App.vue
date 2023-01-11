<template>
  <RouterView></RouterView>
</template>
<script>
import { useStore } from './store/index'
export default {
  name: 'App',
  setup() {
    const store = useStore();
    const { setAuthenticate } = store;
    return {
      setAuthenticate
    };
  },
  created() {
    this.setAuthenticate();
  },
  // provide() {
  //   return {
  //     reload: this.reload
  //   };
  // },
  // data() {
  //   return {
  //     isRouterAlive: true
  //   };
  // },
  // methods: {
  //   reload() {
  //     this.isRouterAlive = false;
  //     this.$nextTick(() => {
  //       this.isRouterAlive = true;
  //     });
  //   }
  // }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'fontawesome-free/css/brands.css';
@import 'fontawesome-free/css/regular.css';
@import 'fontawesome-free/css/solid.css';
@import 'fontawesome-free/css/fontawesome.css';

@import './styles/ace.css';
@import './styles/ace-themes.css';
@import './styles/sizes.css';
@import './styles/site.css';
</style>