import moment from 'moment'
export const getDateTime = (dt) => dt ? moment(dt).format('YYYY-MM-DD HH:mm:ss') : "-"
export const startAtDay = (t) => moment(t).startOf('day').format('YYYY-MM-DD HH:mm:ss')
export const endAtDay = (t) => moment(t).endOf('day').format('YYYY-MM-DD HH:mm:ss')
export const dateAfter = (ta, tb) => moment(ta) < moment(tb)
export const dateBefore = (ta, tb) => moment(ta) > moment(tb)