import { Account, PersonalProfile } from '@/vendor/FPKG-90000-Account/router.js'
import { Branch } from '@/vendor/FPKG-80000-Branch/router.js'
import { Theme } from '@/vendor/FPKG-100000-Theme/router.js'
import { Announce, Marquee } from '@/vendor/FPKG-140000-Announce/router.js'
import { Money, Deposit } from '@/vendor/FPKG-150000-Money/router.js'

export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('./component/Dashboard.vue'),
  children: [
    PersonalProfile,
    Account,
    Branch,
    Theme,
    Announce,
    Money,
    Deposit,
  ]
}