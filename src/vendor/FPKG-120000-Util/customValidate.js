/**
 * 代碼驗證: 3~6位大寫英文字母
 */
export const Vcode = {
  test: (val) => /[A-Z]{3,6}/g.test(val),
  msg: "3~6位大寫英文字母",
}

export const codeValidator = (rules, value, cb) => {
  if(!Vcode.test(value)) {
    cb(Vcode.msg)
  }
  cb()
}

/**
 * 密碼驗證: 6~20位數字或英文字母
 */
export const Vpw = {
  test: (val) => /\w{6,20}/g.test(val),
  msg: "6~20位數字或英文字母",
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