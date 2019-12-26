import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import loading from './loading'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    loading,
    auth,
  }
})

export default store