/**
 * limitに指定された件数ごとに配列を分割します
 *
 * 例：
 * const list = [1, 2, 3, 4, 5, 6];
 *
 * splitArray(list, 3);
 * [
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ]
 *
 * @param arrays
 * @param limit
 * @returns {*}
 */
export const splitArray = (arrays: any, limit: number) => {
  return arrays.reduce(
    (accumulator, currentValue) => {
      const lastList = accumulator[accumulator.length - 1]
      if (lastList.length === limit) {
        accumulator.push([currentValue])
        return accumulator
      }
      lastList.push(currentValue)
      return accumulator
    },
    [[]]
  )
}
