import moment from '@/vendor/FPKG-30000-Plugin/moment'
import _ from 'lodash'
export default moment 
export const toDateTime = (dt) => dt ? moment(dt).format('YYYY-MM-DD HH:mm:ss') : "-"
export const toShortDateTime = (dt) => dt ? moment(dt).format('MM-DD HH:mm:ss') : "-"
export const toDate = (dt) => dt ? moment(dt).format('YYYY-MM-DD') : "-"
export const toShortDate = (dt) => dt ? moment(dt).format('MM-DD') : "-"
export const startAtDay = (t) => moment(t).startOf('day').format('YYYY-MM-DD HH:mm:ss')
export const endAtDay = (t) => moment(t).endOf('day').format('YYYY-MM-DD HH:mm:ss')
export const dateAfter = (ta, tb) => moment(ta) < moment(tb)
export const dateBefore = (ta, tb) => moment(ta) > moment(tb)

export const getWeekRange = (addWeek = 0) => {
  let start = moment().add('week', addWeek).startOf('week')
  let end = moment().add('week', addWeek).endOf('week')
  return {
    year: moment().format('YYYY'),
    weekNum: start.diff(moment().startOf('year'), 'weeks')+1,
    moment: start,
    start: start.format('M/D'),
    end: end.format('M/D'),
  }
}
export const getWeeksOfMonths = (monthCount) => {
  let monthsLater = moment().add(monthCount, 'month')
  let weeksCount = monthsLater.diff(moment().startOf('week'), 'weeks')

  return _.range(1, weeksCount)
            .reduce((arr, week) => {
              arr.push(getWeekRange(week))
              return arr
            }, [])
}
// console.log(`${moment().format('YYYY')}-${moment().startOf('year').diff(moment().startOf('year'), 'weeks')+1}`)

