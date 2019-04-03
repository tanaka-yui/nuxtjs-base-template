import moment from 'moment'

import 'moment/locale/ja'

moment.locale('ja')

export enum DateFormat {
  DATE = 'YYYY-MM-DD',
  DATE_TIME = 'YYYY-MM-DD HH:mm:ss',
  DATE_SLASH = 'YYYY/M/D',
  DATE_JA = 'YYYY年M月D日',
  DATE_TIME_JA = 'YYYY年M月D日 HH:mm:ss',
  MONTH_DATE_SLASH = 'M/D',
  MONTH_DATE_TIME_SLASH = 'M/D HH:mm',
  MONTH_DATE_WEAK_SLASH = 'M/D(ddd)',
  HOUR_OF_DAY = 'YYYY-MM-DDTHH',
  TIME = 'HH:mm:ss.SSSZ',
  MINUTES = 'mm:ss.SSSZ',
  YEAR = 'YYYY',
  YEAR_JA = 'YYYY年',
  MONTH = 'MM',
  MONTH_JA = 'M月',
  YEAR_MONTH = 'YYYY-MM',
  YEAR_MONTH_JA = 'YYYY年M月'
}

/**
 * datetimeFormat
 * datetimeが空の場合は現在時刻で返す
 * @param datetime
 * @param format
 * @returns {string}
 */
export const formatDatetime = (datetime: any, format: DateFormat): string => {
  if (!datetime) {
    return moment().format(format)
  }

  return moment(datetime).format(format)
}

/**
 * isNew
 * @param publishedTime
 * @param comparisonTime
 * @returns {boolean}
 */
export const isNew = (
  publishedTime: string,
  comparisonTime: string = moment().format()
): boolean => {
  const comparisonDatetime = new Date(comparisonTime)
  const time = new Date(publishedTime)
  comparisonDatetime.setDate(comparisonDatetime.getDate() - 1)
  return comparisonDatetime.getTime() < time.getTime()
}

export const nowDatetime = () => {
  return moment().toISOString(true)
}
