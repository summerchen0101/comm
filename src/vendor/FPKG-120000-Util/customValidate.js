import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time'

/**
 * 點數驗證: 僅可正整數
 */
export const Vpoint = {
  test: (val) => /^\d*$/.test(val),
  msg: "僅可為正整數",
}

/**
 * lineID驗證: 僅可正整數
 */
export const VlineID = {
  test: (val) => /^[0-9a-z_.-]{0,20}$/.test(val),
  msg: "半形小寫英文字母或數字及符號「.」「-」「_」共20位內",
}

/**
 * 佔成驗證: 僅可為數字0~100
 */
export const Vpercent = {
  test: (val) => /^[0-9][0-9]?$|^100$/.test(val),
  msg: "只限輸入0-100數字",
}

/**
 * 管理角色帳號驗證: 8~12位數字或英文字母
 */
export const VuserAccount = {
  test: (val) => /^\w{8,12}$/.test(val),
  msg: "半形8~12位數字或英文字母",
}

export const userAccountValidator = (rules, value, cb) => {
  if(value && !VuserAccount.test(value)) {
    cb(VuserAccount.msg)
  }else {
    cb()
  }
}

/**
 * 會員帳號驗證: 4~12位數字或英文字母
 */
export const VmemberAccount = {
  test: (val) => /^\w{4,12}$/.test(val),
  msg: "半形4~12位數字或英文字母",
}

export const memberAccountValidator = (rules, value, cb) => {
  if(value && !VmemberAccount.test(value)) {
    cb(VmemberAccount.msg)
  }else {
    cb()
  }
}

/**
 * 圖形驗證碼驗證: 4位
 */
export const Vcaptcha = {
  test: (val) => /^[a-zA-Z0-9]{4}$/.test(val),
  msg: "驗證碼為4碼",
}

/**
 * 最大贏額驗證: 僅數字
 */
export const VmaxWin = {
  test: (val) => /^[0-9]*$/.test(val),
  msg: "最大贏額格式有誤",
}

/**
 * 最低下注額驗證: 僅數字
 */
export const VminBet = {
  test: (val) => /^[0-9]*$/.test(val) && val >= 100,
  msg: "最低下注額格式有誤或低於100",
}

/**
 * 代碼驗證: 3~6位大寫英文字母
 */
export const Vcode = {
  test: (val) => /^[A-Z]{3,6}$/.test(val),
  msg: "3~6位大寫英文字母",
}

export const codeValidator = (rules, value, cb) => {
  if(value && !Vcode.test(value)) {
    cb(Vcode.msg)
  }else {
    cb()
  }
}
/**
 * 手機驗證
 */
export const Vphone = {
  test: (val) => /^09\d{8}$/.test(val),
  msg: "09+8位數字",
}

export const phoneValidator = (rules, value, cb) => {
  if(value && !Vphone.test(value)) {
    cb(Vphone.msg)
  }else {
    cb()
  }
}

/**
 * 守格IP欄位驗證: 1~3位數字
 */
export const VfirstIpColumn = {
  test: (val) => /^(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(val),
  msg: "0~255",
}

/**
 * IP欄位驗證: 1~3位數字或*字
 */
export const VipColumn = {
  test: (val) => /(^(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$)|(^\*{1}$)/.test(val),
  msg: "0~255或「*」",
}

export const ipColumnValidator = (rules, value, cb) => {
  if(value && !VipColumn.test(value)) {
    cb(VipColumn.msg)
  }else {
    cb()
  }
}

export const firstIpColumnValidator = (rules, value, cb) => {
  if(value && !VfirstIpColumn.test(value)) {
    cb(VfirstIpColumn.msg)
  }else {
    cb()
  }
}

/**
 * 管理角色密碼驗證: 8~12位數字或英文字母
 */
export const VuserPw = {
  test: (val) => /^\w{8,12}$/.test(val),
  msg: "8~12位數字或英文字母",
}

export const userPwValidator = (rules, value, cb) => {
  if(value && !VuserPw.test(value)) {
    cb(VuserPw.msg)
  }else {
    cb()
  }
}

/**
 * 會員密碼驗證: 6~20位數字或英文字母
 */
export const VmemberPw = {
  test: (val) => /^\w{6,20}$/.test(val),
  msg: "6~20位數字或英文字母",
}

export const memberPwValidator = (rules, value, cb) => {
  if(value && !VmemberPw.test(value)) {
    cb(VmemberPw.msg)
  }else {
    cb()
  }
}

/**
 * 密碼確認驗證
 */
export function pwConfirmValidator(rules, value, cb) {
  if(this.form.pw != value) {
    cb("密碼不同")
  }else {
    cb()
  }
}

/**
 * 開始時間驗證
 */
export function startAtValidator(rules, value, cb) {
  if(value && !this.form.forever && dateAfter(this.form.endAt, value)) {
    cb("開始時間需早於結束時間")
  }else {
    cb()
  }
}

/**
 * 結束時間驗證
 */
export function endAtValidator(rules, value, cb) {
  if(value && !this.form.forever && dateBefore(this.form.startAt, value)) {
    cb("結束時間需晚於開始時間")
  }else {
    cb()
  }
}

/**
 * 權限名稱驗證
 */
export const VpermissionName = {
  test: (val) => /^.{1,20}$/.test(val),
  msg: "1~20個字元(不限英數中)",
}
export function permissionNameValidator(rules, value, cb) {
  if(value && !VpermissionName.test(value)) {
    cb(VpermissionName.msg)
  }else {
    cb()
  }
}

/**
 * 提款手續費驗證
 */
export const Vfee = {
  test: (val) => /^\+?[1-9]?[0-9]*$/.test(val),
  msg: "提款手續費須為正整數",
}
export function feeValidator(rules, value, cb) {
  if(value && !Vfee.test(value)) {
    cb(Vfee.msg)
  }else {
    cb()
  }
}

/**
 * 未達流水手續費驗證
 */
export const VdisallowWithdrawFee = {
  test: (val) => /^\+?[1-9]?[0-9]*$/.test(val),
  msg: "未達流水手續費須為正整數",
}
export function disallowWithdrawFeeValidator(rules, value, cb) {
  if(value && !VdisallowWithdrawFee.test(value)) {
    cb(VdisallowWithdrawFee.msg)
  }else {
    cb()
  }
}

/**
 * 維護後開啟時間驗證
 */
export function openTimeValidator(rules, value, cb) {
  if(!value) {
    cb("開啟時間為必填")
  }
  else if(!dateAfter(this.$moment(), value)) {
    cb("開啟時間不可早於現在時間")
  }else {
    cb()
  }
}
