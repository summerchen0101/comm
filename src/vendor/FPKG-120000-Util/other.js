import * as Enums from '@/vendor/FPKG-10000-Config/enum'

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