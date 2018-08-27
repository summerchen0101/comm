/**
 * 點數驗證: 僅可正整數
 */
export const Vpoint = {
  test: (val) => /^\d*$/.test(val),
  msg: "僅可為正整數",
}

/**
 * 帳號驗證: 8~12位數字或英文字母
 */
export const Vaccount = {
  test: (val) => /^\w{8,12}$/.test(val),
  msg: "8~12位數字或英文字母",
}

/**
 * 圖形驗證碼驗證: 4位
 */
export const Vcaptcha = {
  test: (val) => /^[a-zA-Z0-9]{4}$/.test(val),
  msg: "驗證碼為4碼",
}

/**
 * 代碼驗證: 3~6位大寫英文字母
 */
export const Vcode = {
  test: (val) => /^[A-Z]{3,6}$/.test(val),
  msg: "3~6位大寫英文字母",
}

export const codeValidator = (rules, value, cb) => {
  if(!Vcode.test(value)) {
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
  msg: "手機格式有誤",
}

export const phoneValidator = (rules, value, cb) => {
  if(!Vphone.test(value)) {
    cb(Vphone.msg)
  }else {
    cb()
  }
}

/**
 * IP欄位驗證: 1~3位數字或*字
 */
export const VipColumn = {
  test: (val) => /(^[0-9]{1,3}$)|(^\*{1}$)/.test(val),
  msg: "1~3位數字或*字",
}

export const ipColumnValidator = (rules, value, cb) => {
  if(!VipColumn.test(value)) {
    cb(VipColumn.msg)
  }else {
    cb()
  }
}

/**
 * 守格IP欄位驗證: 1~3位數字
 */
export const VfirstIpColumn = {
  test: (val) => /^[0-9]{1,3}$/.test(val),
  msg: "1~3位數字",
}

export const firstIpColumnValidator = (rules, value, cb) => {
  if(!VfirstIpColumn.test(value)) {
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
  if(!VuserPw.test(value)) {
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
  if(!VmemberPw.test(value)) {
    cb(VmemberPw.msg)
  }else {
    cb()
  }
}

/**
 * 密碼確認驗證
 */
export const pwConfirmValidator = (pwValue) => {
  return ((rules, value, cb) => {
    if(pwValue != value) {
      cb("密碼不同")
    }else {
      cb()
    }
  })
}

