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
        name: "PointHistory",
        title: "會員點數歷程",
        path: "/member/point-history",
        funcKey: 1104,
      },
      {
        name: "BankAcc",
        title: "銀行帳戶管理",
        path: "/member/bank",
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
      {
        name: "Mail",
        title: "站內訊息管理",
        path: "/announce/mail",
        funcKey: 1202,
      },
      {
        name: "SiteAnnounce",
        title: "平台公告管理",
        path: "/announce/site-announce",
        funcKey: 1203,
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
      {
        name: "CommissionReport",
        title: "佣金報表",
        path: "/report/commission",
        funcKey: 1503,
      },
      {
        name: "AgentReport",
        title: "代理報表",
        path: "/report/agent",
        funcKey: 1504,
      },
      {
        name: "Winlose",
        title: "輸贏分析",
        path: "/report/winlose",
        funcKey: 1505,
      },
    ]
  },
  {
    name: "Platform",
    title: "平台管理",
    path: "/platform",
    icon: "chart-bar",
    funcKey: 17,
    children: [
      {
        name: "PlatformGame",
        title: "遊戲管理",
        path: "/platform/game",
        funcKey: 1701,
      },
      // {
      //   name: "PlatformAd",
      //   title: "廣告管理",
      //   path: "/platform/ad",
      //   funcKey: 1702,
      // },
      {
        name: "PlatformAdult",
        title: "成人管理",
        path: "/platform/adult",
        funcKey: 1702,
      },
    ]
  },
  {
    name: "Manage",
    title: "後台管理",
    path: "/manage",
    icon: "users",
    funcKey: 16,
    children: [
      {
        name: "Users",
        title: "帳號管理",
        path: "/manage/users",
        funcKey: 1601,
      },
      {
        name: "Permission",
        title: "權限管理",
        path: "/manage/permission",
        funcKey: 1602,
      },
      {
        name: "IP",
        title: "IP管理",
        path: "/manage/ip",
        funcKey: 1603,
      },
      {
        name: "OperatingLog",
        title: "操作日誌",
        path: "/manage/operating-log",
        funcKey: 1604,
      },
      {
        name: "LoginLog",
        title: "登入日誌",
        path: "/manage/login-log",
        funcKey: 1605,
      },
    ]
  },
  // {
  //   name: "Logout",
  //   title: "登出",
  //   path: "/login",
  //   icon: "sign-out-alt",
  //   funcKey: 0,
  // },
]