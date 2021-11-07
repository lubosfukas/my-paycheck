import { to2Decimal, toPercentage, toString2Decimal } from '../utils/helpers'

describe('helpers tests', () => {
    describe('to2Decimal', () => {
        test('should round to 2 decimal', () => {
            expect(to2Decimal(1922.3349)).toBe(1922.33)
        })
    })

    describe('toString2Decimal', () => {
        test('should display 2 decimals', () => {
            expect(toString2Decimal(1922)).toBe('1922.00')
        })

        test('should round to 2 decimal', () => {
            expect(toString2Decimal(1922.3349)).toBe('1922.33')
        })
    })

    describe('toPercentage', () => {
        test('should calculate percentage', () => {
            expect(toPercentage(100, 22)).toBe(22)
        })

        test('should calculate percentage', () => {
            expect(toPercentage(4534.22, 20)).toBe(906.844)
        })
    })
})
