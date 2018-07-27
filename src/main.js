import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// style
import './vendor/FPKG-20000-Style/index'


// plugins
import 'normalize.css'
import 'animate.css'
import '@/vendor/FPKG-30000-Plugin/moment'
import '@/vendor/FPKG-30000-Plugin/axios'
import '@/vendor/FPKG-30000-Plugin/bootstrap-vue'
import '@/vendor/FPKG-30000-Plugin/element-ui'
import '@/vendor/FPKG-30000-Plugin/fontawesome'
import '@/vendor/FPKG-30000-Plugin/eventsHub'
import '@/vendor/FPKG-30000-Plugin/lodash'
import '@/vendor/FPKG-30000-Plugin/vulidate'
import '@/vendor/FPKG-30000-Plugin/storage'

// widget
import Breadcrumb from '@/vendor/FPKG-110000-Widget/component/Breadcrumb.vue'

Vue.component("Breadcrumb", Breadcrumb)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

