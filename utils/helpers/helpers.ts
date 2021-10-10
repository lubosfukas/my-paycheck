export const to2Decimal = (num: number) => Math.round(num * 100) / 100

export const toString2Decimal = (num: number) =>
    (Math.round(num * 100) / 100).toFixed(2)
