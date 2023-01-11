import axios from 'axios';
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    isAuthenticated: localStorage.getItem('auth') === 'true',
  }),
  actions: {
    setAuthenticate() {
     axios.get('/api/Account').then(response => {
        this.isAuthenticated = response.status === 200 && response.data;
        localStorage.setItem('auth',response.status === 200 && response.data);
      });
    },
  },
  modules: {
  }
});