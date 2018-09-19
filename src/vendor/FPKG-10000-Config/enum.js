export const payType = [
  {label: '超商付款', value: 1},
  {label: 'ATM', value: 2},
  {label: '信用卡', value: 3},
  {label: '銀行卡', value: 4},
]
export const status = [
  {label: '啟用', value: 1},
  {label: '停用', value: 2},
]
export const loginStatus = [
  {label: '登入成功', value: 1},
  {label: '正常登出', value: 2},
  {label: '強制登出', value: 3},
]
export const ticketStatus = [
  {label: '暫存', value: 0},
  {label: '成功', value: 1},
  {label: '審核處理', value: 2},
  {label: '取消', value: 3},
  {label: '出款中', value: 4},
  {label: '出款取消', value: 5},
]
export const bankAccStatus = [
  {label: '成功', value: 1},
  {label: '審核處理', value: 2},
]
export const memberLevelActive = [
  {label: '啟用', value: 1},
  {label: '停用', value: 2},
]
export const lotteryWagerStatus = [
  {label: '', value: 0},
  {label: '', value: 1},
  {label: '取消', value: 2},
  {label: '取消', value: 3},
]
export const memberLevel = [
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8},
  {label: '9', value: 9},
  {label: '10', value: 10},
]
export const gameType = [
  {
    label: '法老王3D電子遊藝',
    gameCode: 'casino',
    value: 1,
    children: [
      {label: "黃金財神", value: 4},
      {label: "金瓶梅", value: 8},
      {label: "埃及風火輪", value: 9},
      {label: "神雕仙俠", value: 10},
      {label: "龍鳳全席", value: 11},
      {label: "獨霸赤壁", value: 12},
      {label: "聶小倩", value: 13},
      {label: "火焰山", value: 14},
      {label: "白蛇傳", value: 19},
      {label: "世足賽", value: 20},
      {label: "夏日假期", value: 21},
      {label: "萬聖節", value: 22},
      {label: "中秋烤肉趣", value: 24},
      {label: "夜市好好食", value: 25},
      {label: "上古神獸", value: 26},
      {label: "招財錢母", value: 27},
      {label: "萬聖來搗蛋", value: 28},
    ]
  },
  {
    label: '法老王彩球',
    gameCode: 'lottery',
    value: 2,
    children: [
      {label: "六合彩", value: 1},
      {label: "大樂透", value: 2},
      {label: "今彩539", value: 3},
      {label: "38樂合彩", value: 4},
      {label: "大福彩", value: 5},
    ]
  },
  {
    label: '法老王彩票',
    gameCode: 'ifalo_lottery',
    value: 3,
    children: []
  },
  {
    label: '法老王黃金期權',
    gameCode: 'ifalo_golden',
    value: 4,
    children: []
  }
]
