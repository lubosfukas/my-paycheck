import { to2Decimal } from './helpers'

describe('helpers tests', () => {
    describe('to2Decimal', () => {
        test('rounds to 2 decimal', () => {
            const num = 1922.3349
            expect(to2Decimal(num)).toBe(1922.33)
        })
    })
})
