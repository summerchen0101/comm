import numeral from 'numeral'
import Vue from 'vue'
import _ from 'lodash'

export const toCurrency = (num) => numeral(num).format('0,0');
export const toCurrencyDecimal = (num, decimalCount = 2) => numeral(num).format('0,0.' + _.repeat('0', decimalCount));
export function toCurrencyFloor(num, floorCount = 2) {
  const floorPow = 10 ** floorCount
  let value = Math.floor(num * floorPow) / floorPow
  return numeral(value).format('0,0.' + _.repeat('0', floorCount))
}