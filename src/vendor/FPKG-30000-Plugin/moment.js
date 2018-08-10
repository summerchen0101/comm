import Vue from 'vue';
import Moment from 'moment';
Moment.updateLocale('zh-tw', {
  week: {
    dow: 1,
  },
})
Object.defineProperty(Vue.prototype, '$moment', { value: Moment });

export default Moment
