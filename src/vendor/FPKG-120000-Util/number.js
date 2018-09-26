import numeral from 'numeral'
import Vue from 'vue'
import _ from 'lodash'

export const toCurrency = (num) => numeral(num).format('0,0');
export const toCurrencyDecimal = (num, decimalCount = 2) => numeral(num).format('0,0.' + _.repeat('0', decimalCount));
export const toCurrencyFloor = (num, floorCount = 2) => Math.floor(num * Math.pow(10, floorCount)) / Math.pow(10, floorCount);
