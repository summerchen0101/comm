import { PersonalProfile } from '@/vendor/FPKG-90000-Account/router.js'

import { Member } from '@/vendor/FPKG-130000-Member/router.js'
import { Announce } from '@/vendor/FPKG-140000-Announce/router.js'
import { Money } from '@/vendor/FPKG-150000-Money/router.js'
import { BettingInfo } from '@/vendor/FPKG-160000-BettingInfo/router.js'
import { Report } from '@/vendor/FPKG-170000-Report/router.js'
import { Manage } from '@/vendor/FPKG-180000-Manage/router.js'
import { Home } from '@/vendor/FPKG-190000-Home/router.js'
import { Platform } from '@/vendor/FPKG-200000-Platform/router.js'

export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('./component/Dashboard.vue'),
  children: [
    PersonalProfile,
    Announce,
    Money,
    BettingInfo,
    Report,
    Manage,
    Member,
    Home,
    Platform,
  ]
}