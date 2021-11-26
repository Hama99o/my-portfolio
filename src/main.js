import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import { store } from './store/index'
import router from './router'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

// Make sure to inject the store in the vue instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
