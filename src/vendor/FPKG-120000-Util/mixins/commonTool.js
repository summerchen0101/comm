import { 
  toCurrency, 
  toCurrencyDecimal 
} from '@/vendor/FPKG-120000-Util/number';

import { 
  getDateTime, 
  startAtDay, 
  endAtDay, 
  dateAfter, 
  dateBefore,
  getWeekRange,
  getWeeksOfMonths,
} from '@/vendor/FPKG-120000-Util/time';

import { 
  toEnum,
  toOption,
  onCopyText,
} from '@/vendor/FPKG-120000-Util/other';



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
    getWeekRange,
    getWeeksOfMonths,

    toEnum,
    toOption,
    onCopyText,
    
  }
}