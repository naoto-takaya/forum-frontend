import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  auth: false
}

const mutations = {
  setAuth(state, payload) {
    state.auth = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}