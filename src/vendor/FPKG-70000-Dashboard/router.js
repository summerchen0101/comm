import { PersonalProfile } from '@/vendor/FPKG-90000-Account/router.js'
import { Announce } from '@/vendor/FPKG-140000-Announce/router.js'
import { Money } from '@/vendor/FPKG-150000-Money/router.js'
import { BettingInfo } from '@/vendor/FPKG-160000-BettingInfo/router.js'

export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('./component/Dashboard.vue'),
  children: [
    PersonalProfile,
    Announce,
    Money,
    BettingInfo,
  ]
}