/**
 * 點數驗證: 僅可正整數
 */
export const Vpoint = {
  test: (val) => /^[1-9]+$/.test(val),
  msg: "僅可為正整數",
}

/**
 * 帳號驗證: 8~12位數字或英文字母
 */
export const Vaccount = {
  test: (val) => /^\w{8,12}$/g.test(val),
  msg: "8~12位數字或英文字母",
}

/**
 * 圖形驗證碼驗證: 4位
 */
export const Vcaptcha = {
  test: (val) => /^[a-zA-Z1-9]{4}$/g.test(val),
  msg: "驗證碼為4碼",
}

/**
 * 代碼驗證: 3~6位大寫英文字母
 */
export const Vcode = {
  test: (val) => /^[A-Z]{3,6}$/g.test(val),
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
 * 管理角色密碼驗證: 8~12位數字或英文字母
 */
export const VuserPw = {
  test: (val) => /^\w{8,12}$/g.test(val),
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
  test: (val) => /^\w{6,20}$/g.test(val),
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
