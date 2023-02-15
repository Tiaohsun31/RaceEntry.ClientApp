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