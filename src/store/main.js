import { createStore } from 'vuex'

export const store = createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    changeAuthenticated(state,payload){
        state.isAuthenticated = payload.isAuthenticated;
    }
  },
  actions: {
  },
  modules: {
  }
});
