import Vue from 'vue'
import Vuex from 'vuex'

import user from './auth'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
  },
  plugins: [createPersistedState()],
})

export default store