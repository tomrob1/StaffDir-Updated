import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import VueLazyLoad from 'vue-lazyload'
import Toasted from 'vue-toasted'
import {VueHammer} from 'vue2-hammer'

Vue.config.productionTip = false
Vue.use(VueLazyLoad)
Vue.use(Toasted)
Vue.use(VueHammer)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
