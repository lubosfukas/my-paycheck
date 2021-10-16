import { to2Decimal, toString2Decimal } from '../utils/helpers'

describe('helpers tests', () => {
    describe('to2Decimal', () => {
        test('rounds to 2 decimal', () => {
            expect(to2Decimal(1922.3349)).toBe(1922.33)
        })
    })

    describe('toString2Decimal', () => {
        test('displays 2 decimals', () => {
            expect(toString2Decimal(1922)).toBe('1922.00')
        })

        test('rounds to 2 decimal and displays 2 decimals', () => {
            expect(toString2Decimal(1922.3349)).toBe('1922.33')
        })
    })
})
