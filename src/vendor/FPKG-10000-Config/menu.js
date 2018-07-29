export default [
  {
    name: "Member",
    title: "會員管理",
    path: "/member",
    icon: "user",
    children: [
      {
        name: "MemberManage",
        title: "會員管理",
        path: "/member/manage",
      },
      {
        name: "MemberSearch",
        title: "會員搜尋",
        path: "/member/search",
      },
      {
        name: "BankAccount",
        title: "銀行帳戶管理",
        path: "/member/bank-accoount"
      },
    ]
  },
  {
    name: "Announce",
    title: "公告管理",
    path: "/announce",
    icon: "bullhorn",
    children: [
      {
        name: "Marquee",
        title: "跑馬燈管理",
        path: "/announce/marquee"
      },
    ]
  },
  {
    name: "Money",
    title: "存提管理",
    path: "/money",
    icon: "dollar-sign",
    children: [
      {
        name: "Deposit",
        title: "存款管理",
        path: "/money/deposit"
      },
      {
        name: "DepositAcc",
        title: "存款帳戶管理",
        path: "/money/deposit-account"
      },
      {
        name: "Withdraw",
        title: "提款管理",
        path: "/money/withdraw"
      },
      {
        name: "Payout",
        title: "出款管理",
        path: "/money/payout"
      },
      {
        name: "PayoutAccount",
        title: "存款帳戶管理",
        path: "/money/payout-account"
      },
    ]
  },
  {
    name: "Betting",
    title: "注單查詢",
    path: "/betting",
    icon: "file-alt",
    children: [
      {
        name: "BettingSearch",
        title: "注單查詢",
        path: "/betting/search",
      },
    ]
  },
  {
    name: "Report",
    title: "報表查詢",
    path: "/report",
    icon: "chart-bar",
    children: [
      {
        name: "MemberReport",
        title: "會員報表",
        path: "/report/member",
      },
      {
        name: "GameReport",
        title: "遊戲報表",
        path: "/report/game",
      },
    ]
  },
  {
    name: "Platform",
    title: "後台管理",
    path: "/platform",
    icon: "users",
    children: [
      {
        name: "PlatformAccount",
        title: "帳號管理",
        path: "/platform/account",
      },
      {
        name: "Permission",
        title: "權限管理",
        path: "/platform/permission",
      },
      {
        name: "IP",
        title: "IP管理",
        path: "/platform/ip",
      },
      {
        name: "OperatingRecord",
        title: "操作記錄",
        path: "/platform/operating-record",
      },
      {
        name: "LoginRecord",
        title: "登入記錄",
        path: "/platform/login-record",
      },
    ]
  },
]