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
  }
  cb()
}

/**
 * 密碼驗證: 8~12位數字或英文字母
 */
export const Vpw = {
  test: (val) => /^\w{8,12}$/g.test(val),
  msg: "8~12位數字或英文字母",
}

export const pwValidator = (rules, value, cb) => {
  if(!Vpw.test(value)) {
    cb(Vpw.msg)
  }
  cb()
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