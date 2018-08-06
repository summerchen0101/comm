import { 
  toCurrency, 
  toCurrencyDecimal 
} from '@/vendor/FPKG-120000-Util/number';

import { 
  getDateTime, 
  startAtDay, 
  endAtDay, 
  dateAfter, 
  dateBefore 
} from '@/vendor/FPKG-120000-Util/time';

export default {
  data() {
    return {

    }
  },
  methods: {
    toCurrency,
    toCurrencyDecimal,

    getDateTime,
    startAtDay, 
    endAtDay, 
    dateAfter, 
    dateBefore,

    onCopyText() {
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
    },
  }
}