import { createStore } from 'vuex'

export const store = createStore({
  state: {
    isAuthenticated: false,
    orderId: ''
  },
  mutations: {
    changeAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
    setOrderId(state, payload) {
      state.orderId = payload.orderId;
    }
  },
  actions: {
  },
  modules: {
  }
});
