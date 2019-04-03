import { parse } from 'qs'

/**
 * タブの除去
 *
 * @param str
 * @returns {*}
 */
export const removeTab = (str: string) => {
  if (!str) {
    return ''
  }
  return str.replace(/\t/g, '')
}

/**
 * スペースを除去
 *
 * @param str
 * @returns {string}
 */
export const removeWhitespace = (str: string) => {
  if (!str) {
    return ''
  }
  return str.replace(/&nbsp;|\u0020|\u3000|\u00A0/g, '')
}

/**
 * 改行コードを指定の文字列に変換
 *
 * @param str
 * @param val
 * @returns {*}
 */
export const nl2String = (str: string, val: string) => {
  if (!str) {
    return ''
  }
  return str.replace(/\r?\n/g, val)
}

/**
 * 改行コードの除去
 *
 * @param str
 * @returns {*}
 */
export const removeLine = (str: string) => {
  return nl2String(str, '')
}

/**
 * 数字をカンマ区切りにする
 *
 * @param val
 * @returns {string}
 */
export const formattedNumber = (val: string) => {
  if (!val) {
    return '0'
  }
  return String(val).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/**
 * クエリをパースしてJSONを返す
 * ?a=1&b=2 のようなパラメータのみパースする場合
 *
 * @param val
 * @returns {*}
 */
export const parseQuery = (val: string) => {
  if (!val) {
    return ''
  }
  return parse(val.replace(/\?/, ''))
}
