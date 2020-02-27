import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: null
}

const mutations = {
  setAuth(state, user) {
    state.user = user
  }
}

export default {
  namespaced: true,
  state,
  mutations
}