
export const Vcode = {
  test: (val) => /[A-Z]{3,6}/g.test(val),
  msg: "3~6位大寫英文字母",
}

export const codeValidator = (rules, value, cb) => {
  if(!Vcode.test(value)) {
    console.log("codeValidator")
    cb(Vcode.msg)
  }
}