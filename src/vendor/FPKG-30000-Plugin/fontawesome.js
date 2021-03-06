import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faSpinner, 
  faCircleNotch, 
  faPlus, 
  faPlusSquare, 
  faPlusCircle, 
  faFileAlt, 
  faSearch,
  faUser,
  faThLarge,
  faBullhorn,
  faDollarSign,
  faSyncAlt,
  faChartBar,
  faUsers,
  faBars,
  faSignOutAlt,
  faFileImage,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faSpinner, 
  faCircleNotch, 
  faPlus, 
  faPlusSquare, 
  faPlusCircle, 
  faFileAlt, 
  faSearch,
  faUser,
  faThLarge,
  faBullhorn,
  faDollarSign,
  faSyncAlt,
  faChartBar,
  faUsers,
  faBars,
  faSignOutAlt,
  faFileImage,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)