import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: false
}

const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}