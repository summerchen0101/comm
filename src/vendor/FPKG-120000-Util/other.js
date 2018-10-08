import * as Enums from '@/vendor/FPKG-10000-Config/enum'
import errCode from '@/vendor/FPKG-10000-Config/errCode'

export function toEnum(enumName, value) {
  let i = Enums[enumName].findIndex(t => t.value == value)
  return i > -1 ? Enums[enumName][i].label : '?'
}

export function toOption(options, id, nameKey = 'name') {
  let i = options.findIndex(t => t.id == id)
  return i > -1 ? options[i][nameKey] : '?'
}

export function onCopyText() {
  let text = this.copyText.reduce((str, t) => {
    str += `${t.title}: ${t.content}\n`
    return str
  }, "")
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  this.$message({
    message: '已複製資訊',
    duration: 2000,
  });
}

export function handleErrCode(code, url) {
  var msg = ""
  if(code !== 200001) {
    if(typeof errCode[code] === 'object') {
      msg =  errCode[code][url]
    }else if(typeof errCode[code] === 'string'){
      msg =  errCode[code]
    }else {
      msg = "未知錯誤碼"
    }
    if(code === 401001){ // 登入失敗
      this.$alert(msg, '錯誤提示').then(res => {
        location.reload()
      })
    }
    else {
      this.$alert(msg, '錯誤提示')
    }

  }
  return
}

export function filterMenu(dM, pM) {
  return dM.filter(dm => {
    if(dm.children && dm.children.length > 0) {
      dm.children = filterMenu(dm.children, pM)
    }
    return pM.findIndex(pm => pm.func_key === dm.funcKey) > -1 || dm.funcKey === 0
  })
}

// 處理會員結果數字顏色顯示
export const handleResultColor =  (result) => (result > 0) ? 'text-success' : ((result == 0) ? '' : 'text-danger')
