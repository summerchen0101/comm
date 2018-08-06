import * as Enums from '@/vendor/FPKG-10000-Config/enum'

export function toEnum(enumName, value) {
  let i = Enums[enumName].findIndex(t => t.value === value)
  return i > -1 ? Enums[enumName][i].label : '?'
}