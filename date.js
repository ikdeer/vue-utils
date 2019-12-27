import moment from 'moment/moment'

function dateFormat(row, column) {
  const date = row[column.property]
  if (date === undefined) {
    return ''
  }
  return moment(date).utc().zone(+6).format('YYYY-MM-DD HH:mm:ss')
}

function addZero(m) { return m < 10 ? '0' + m : m }
// 时间戳转化成时间格式
function timeFormat(timestamp) {
  // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
  const time = new Date(timestamp)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  return year + '-' + addZero(month) + '-' + addZero(date) + ' ' + addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds)
}

function nowDay() {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }

  return year + '-' + month + '-' + day
}

function lastMonth() {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate() - 30
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }

  return year + '-' + month + '-' + day
}

function accMul(arg1, arg2) {
  let m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try { m += s1.split('.')[1].length } catch (e) {}
  try { m += s2.split('.')[1].length } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

function getCurrentDate() {
  var timeStr = '-'
  var curDate = new Date()
  var curYear = curDate.getFullYear() // 获取完整的年份(4位,1970-????)

  var curMonth = curDate.getMonth() + 1 // 获取当前月份(0-11,0代表1月)

  var curDay = curDate.getDate() // 获取当前日(1-31)

  var curWeekDay = curDate.getDay() // 获取当前星期X(0-6,0代表星期天)

  var curHour = curDate.getHours() // 获取当前小时数(0-23)

  var curMinute = curDate.getMinutes() // 获取当前分钟数(0-59)

  var curSec = curDate.getSeconds() // 获取当前秒数(0-59)

  if (curMonth < 10) {
    curMonth = '0' + curMonth
  }
  if (curDay < 10) {
    curDay = '0' + curDay
  }
  if (curHour < 10) {
    curHour = '0' + curHour
  }
  if (curMinute < 10) {
    curMinute = '0' + curMinute
  }
  if (curSec < 10) {
    curSec = '0' + curSec
  }
  var Current = curYear + timeStr + curMonth + timeStr + curDay + ' ' + curHour + ':' + curMinute + ':' + curSec
  return Current
}

export { dateFormat, timeFormat, nowDay, lastMonth, accMul, getCurrentDate }
