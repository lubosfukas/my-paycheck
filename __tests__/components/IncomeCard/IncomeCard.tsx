import {
    hasDecimal,
    countDecimals,
} from '../../../components/common/IncomeCard/IncomeSection'

describe('hasDecimal', () => {
    test('returns true', () => {
        expect(hasDecimal(10.5)).toBeTruthy()
    })

    test('returns false', () => {
        expect(hasDecimal(10)).toBeFalsy()
    })
})

describe('countDecimals', () => {
    test('returns number of decimals if number is decimal', () => {
        expect(countDecimals(10.5)).toBe(1)
    })

    test('returns zero if number is not decimal', () => {
        expect(countDecimals(10)).toBe(0)
    })
})
