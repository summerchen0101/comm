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

export function handleErrCode(code) {
  if(code !== 200001) {
      let msg =  errCode[code] || '未知錯誤碼'
      this.$alert(msg, '錯誤提示');
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