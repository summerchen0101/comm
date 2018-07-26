export default [
  {
    name: "Branch",
    title: "站台管理",
    path: "/branch",
    children: [
      {
        name: "BranchSub1",
        title: "站台管理1",
        path: "/branch/sub-1"
      },
      {
        name: "BranchSub2",
        title: "站台管理2",
        path: "/branch/sub-2",
        children: [
          {
            name: "BranchSub2-1",
            title: "站台管理2-1",
            path: "/branch/sub-2-1"
          },
          {
            name: "BranchSub2-2",
            title: "站台管理2-2",
            path: "/branch/sub-2-2",
            children: [
              {
                name: "BranchSub2-2-1",
                title: "站台管理2-2-1",
                path: "/branch/sub-2-2-1"
              },
              {
                name: "BranchSub2-2-2",
                title: "站台管理2-2-2",
                path: "/branch/sub-2-2-2"
              },
            ]
          },
        ]
      },
      {
        name: "BranchSub3",
        title: "站台管理3",
        path: "/branch/sub-3"
      },
    ]
  },
  {
    name: "Account",
    title: "帳號管理",
    path: "/account",
    children: [
      {
        name: "AccountSub1",
        title: "帳號管理1",
        path: "/account/sub-1",
        children: [
          {
            name: "AccountSub1-1",
            title: "帳號管理1-1",
            path: "/account/sub-1-1"
          },
          {
            name: "AccountSub1-2",
            title: "帳號管理1-2",
            path: "/account/sub-1-2",
          },
        ]
      },
      {
        name: "AccountSub2",
        title: "帳號管理2",
        path: "/account/sub-2",
      },
    ]
  },
  {
    name: "Theme",
    title: "版型管理",
    path: "/theme",
    children: [
      {
        name: "ThemeSub1",
        title: "版型管理1",
        path: "/theme/sub-1"
      },
      {
        name: "ThemeSub2",
        title: "版型管理2",
        path: "/theme/sub-2",
      },
      {
        name: "ThemeSub3",
        title: "版型管理3",
        path: "/theme/sub-3"
      },
    ]
  },
]