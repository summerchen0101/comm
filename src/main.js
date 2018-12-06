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
import '@/vendor/FPKG-30000-Plugin/numeral'

// widget
import Breadcrumb from '@/vendor/FPKG-110000-Widget/component/Breadcrumb.vue'
import Menu from '@/vendor/FPKG-70000-Dashboard/component/Menu.vue';
import MobileMenu from '@/vendor/FPKG-70000-Dashboard/component/MobileMenu.vue';
import PageTitle from '@/vendor/FPKG-110000-Widget/component/PageTitle.vue';
import Paginator from '@/vendor/FPKG-110000-Widget/component/Paginator.vue';
import LoadingCover from '@/vendor/FPKG-110000-Widget/component/LoadingCover.vue'
import SearchBar from '@/vendor/FPKG-110000-Widget/component/SearchBar.vue';
import SubmitBar from '@/vendor/FPKG-110000-Widget/component/SubmitBar.vue';
import HistoryDialog from '@/vendor/FPKG-110000-Widget/component/HistoryDialog.vue';
import CommissionDialog from '@/vendor/FPKG-110000-Widget/component/CommissionDialog.vue';
import PasswdDialog from '@/vendor/FPKG-110000-Widget/component/PasswdDialog.vue';
import Validation from '@/vendor/FPKG-110000-Widget/component/Validation.vue';

Vue.component("Breadcrumb", Breadcrumb)
Vue.component("MenuComponent", Menu)
Vue.component("MobileMenu", MobileMenu)
Vue.component("PageTitle", PageTitle)
Vue.component("Paginator", Paginator)
Vue.component("LoadingCover", LoadingCover)
Vue.component("SearchBar", SearchBar)
Vue.component("SubmitBar", SubmitBar)
Vue.component("PasswdDialog", PasswdDialog)
Vue.component("HistoryDialog", HistoryDialog)
Vue.component("CommissionDialog", CommissionDialog)
Vue.component("Validation", Validation)
Vue.config.productionTip = false

import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool'

new Vue({
  mixins: [commonTool],
  router,
  store,
  render: h => h(App)
}).$mount('#app')

