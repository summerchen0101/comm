export const payType = [
  {label: '超商付款', value: 1},
  {label: '銀行轉帳(小額)', value: 2},
  {label: '信用卡', value: 3},
  {label: '銀行轉帳(大額)', value: 4},
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
export const dispenseTicketStatus = [
  {label: '暫存', value: 0},
  {label: '成功', value: 1},
  {label: '審核處理', value: 2},
  {label: '取消', value: 3},
  {label: '出款中', value: 4},
  {label: '出款取消', value: 5},
]
export const gameType = [
  {
    label: '電子遊藝', 
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
      {label: "sicbosingle", value: 22},
      {label: "中秋烤肉趣", value: 24},
      {label: "夜市好好食", value: 25},
      {label: "luckymoney", value: 27},
    ] 
  },
  {
    label: '彩球', 
    value: 2,
    children: [
      {label: "六合彩", value: 1},
      {label: "大樂透", value: 2},
      {label: "今彩539", value: 3},
      {label: "38樂合彩", value: 4},
      {label: "大福彩", value: 5},
    ] 
  },
]
