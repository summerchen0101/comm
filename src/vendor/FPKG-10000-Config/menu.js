export default [
  {
    name: "Member",
    title: "會員管理",
    path: "/member",
    icon: "user",
    funcKey: 11,
    children: [
      {
        name: "MemberManage",
        title: "會員管理",
        path: "/member/manage",
        funcKey: 1101,
      },
      {
        name: "MemberSearch",
        title: "會員搜尋",
        path: "/member/search",
        funcKey: 1102,
      },
      {
        name: "BankAccount",
        title: "銀行帳戶管理",
        path: "/member/bank-accoount",
        funcKey: 1103,
      },
    ]
  },
  {
    name: "Announce",
    title: "公告管理",
    path: "/announce",
    icon: "bullhorn",
    funcKey: 12,
    children: [
      {
        name: "Marquee",
        title: "跑馬燈管理",
        path: "/announce/marquee",
        funcKey: 1201,
      },
    ]
  },
  {
    name: "Money",
    title: "存提管理",
    path: "/money",
    icon: "dollar-sign",
    funcKey: 13,
    children: [
      {
        name: "Deposit",
        title: "存款管理",
        path: "/money/deposit",
        funcKey: 1301,
      },
      {
        name: "DepositAcc",
        title: "存款帳戶管理",
        path: "/money/deposit-account",
        funcKey: 1302,
      },
      {
        name: "Withdraw",
        title: "提款管理",
        path: "/money/withdraw",
        funcKey: 1303,
      },
      {
        name: "Dispense",
        title: "出款管理",
        path: "/money/dispense",
        funcKey: 1304,
      },
      {
        name: "DispenseAcc",
        title: "出款帳戶管理",
        path: "/money/dispense-account",
        funcKey: 1305,
      },
    ]
  },
  {
    name: "BettingInfo",
    title: "注單資訊",
    path: "/betting",
    icon: "file-alt",
    funcKey: 14,
    children: [
      {
        name: "BettingSearch",
        title: "注單查詢",
        path: "/betting/search",
        funcKey: 1401,
      },
    ]
  },
  {
    name: "Report",
    title: "報表查詢",
    path: "/report",
    icon: "chart-bar",
    funcKey: 15,
    children: [
      {
        name: "MemberReport",
        title: "會員報表",
        path: "/report/member",
        funcKey: 1501,
      },
      {
        name: "GameReport",
        title: "遊戲報表",
        path: "/report/game",
        funcKey: 1502,
      },
    ]
  },
  {
    name: "Platform",
    title: "後台管理",
    path: "/platform",
    icon: "users",
    funcKey: 16,
    children: [
      {
        name: "PlatformAccount",
        title: "帳號管理",
        path: "/platform/account",
        funcKey: 1601,
      },
      {
        name: "Permission",
        title: "權限管理",
        path: "/platform/permission",
        funcKey: 1602,
      },
      {
        name: "IP",
        title: "IP管理",
        path: "/platform/ip",
        funcKey: 1603,
      },
      {
        name: "OperatingRecord",
        title: "操作記錄",
        path: "/platform/operating-record",
        funcKey: 1604,
      },
      {
        name: "LoginRecord",
        title: "登入記錄",
        path: "/platform/login-record",
        funcKey: 1605,
      },
    ]
  },
]