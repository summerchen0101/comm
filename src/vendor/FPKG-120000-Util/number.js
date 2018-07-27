import numeral from 'numeral'
import Vue from 'vue'

export const toCurrency = (num) => numeral(num).format('0,0');
export const toCurrencyDecimal = (num) => numeral(num).format('0,0.00');
