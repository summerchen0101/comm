

export const Deposit = {
  name: "Deposit",
  title: "存款管理",
  path: "/money/deposit",
  props: { funcKey: 1301 },
  component: () => import('./component/Deposit/Deposit.vue')
}
export const DepositAcc = {
  name: "DepositAcc",
  title: "存款帳戶管理",
  path: "/money/deposit-account",
  props: { funcKey: 1302 },
  component: () => import('./component/DepositAcc/DepositAcc.vue')
}

export const Withdraw = {
  name: "Withdraw",
  title: "提款管理",
  path: "/money/withdraw",
  props: { funcKey: 1303 },
  component: () => import('./component/Withdraw/Withdraw.vue')
}

export const Dispense = {
  name: "Dispense",
  title: "出款管理",
  path: "/money/dispense",
  props: { funcKey: 1304 },
  component: () => import('./component/Dispense/Dispense.vue')
}

export const Money = {
  path: '/money',
  name: 'Money',
  title: "存提管理",
  props: { funcKey: 13 },
  component: () => import('./component/Money.vue'),
  redirect: '/money/deposit',
  children: [
    Deposit,
    DepositAcc,
    Withdraw,
    Dispense,
  ]
}