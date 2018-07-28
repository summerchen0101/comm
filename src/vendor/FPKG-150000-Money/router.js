

export const Deposit = {
  name: "Deposit",
  title: "存款管理",
  path: "/money/deposit",
  component: () => import('./component/Deposit.vue')
}

export const Withdraw = {
  name: "Withdraw",
  title: "提款管理",
  path: "/money/withdraw",
  component: () => import('./component/Withdraw.vue')
}

export const Money = {
  path: '/money',
  name: 'Money',
  title: "存提管理",
  component: () => import('./component/Money.vue'),
  redirect: '/money/deposit',
  children: [
    Deposit,
    Withdraw,
  ]
}