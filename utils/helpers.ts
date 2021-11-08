export const to2Decimal = (num: number) => Math.round(num * 100) / 100

export const toString2Decimal = (num: number) =>
    (Math.round(num * 100) / 100).toFixed(2)

export const toPercentage = (num: number, percentage: number) =>
    (num / 100) * percentage

export const hasDecimal = (num: number) => num % 1 !== 0

export const countDecimals = (num: number) => {
    if (!hasDecimal(num)) return 0
    return num.toString().split('.')[1].length || 0
}
