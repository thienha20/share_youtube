import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')

export const formatDate = "YYYY-MM-DD"
export const formatDateTime = "YYYY-MM-DD HH:ii"

export function dateTimeFromNow(stringDateTime){
    return moment(stringDateTime).fromNow()
}

export function convertToDate(timestamp, format = null) {
  return moment.unix(timestamp).format("llll");
}

export default moment
