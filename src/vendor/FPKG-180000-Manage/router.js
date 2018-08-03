export const Users = {
  path: '/manage/users',
  name: 'Users',
  title: "帳號管理",
  funcKey: 1601,
  component: () => import('./component/Users/Users.vue')
}
export const Permission = {
  path: '/manage/permission',
  name: 'Permission',
  title: "權限管理",
  funcKey: 1602,
  component: () => import('./component/Permission/Permission.vue')
}
export const IP = {
  path: '/manage/ip',
  name: 'IP',
  title: "IP管理",
  funcKey: 1603,
  component: () => import('./component/IP/IP.vue')
}
export const OperatingLog = {
  path: '/manage/operating-log',
  name: 'OperatingLog',
  title: "操作日誌",
  funcKey: 1604,
  component: () => import('./component/OperatingLog/OperatingLog.vue')
}
export const LoginLog = {
  path: '/manage/login-log',
  name: 'LoginLog',
  title: "登入日誌",
  funcKey: 1605,
  component: () => import('./component/LoginLog/LoginLog.vue')
}

export const Manage = {
  path: '/manage',
  name: 'Manage',
  title: "後台管理",
  funcKey: 16,
  component: () => import('./component/Manage.vue'),
  redirect: "/manage/users",
  children: [
    Users,
    Permission,
    IP,
    OperatingLog,
    LoginLog,
  ]
}