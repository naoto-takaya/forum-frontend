import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from './config'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
axios.defaults.withCredentials = true


axios.interceptors.response.use(response => {
  return response
}, error => {
  switch (error.response.status) {
    case 401:
      router.push("/login");
      break;
  }
})

Vue.use(VueAxios, axios)

Vue.directive('visible', function(el, binding) {
  el.style.visibility = !!binding.value ? 'visible' : 'hidden';
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  config,
  render: h => h(App)
}).$mount('#app')
