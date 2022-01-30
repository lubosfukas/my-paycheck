import { Contributions } from '../../types'

export type CalcResult = {
    averageIncome: number
    firstYearAverageIncome: number
    firstYearIncome: number
    income: number
    manDayRate: number
    manHourRate: number
    contributions: Contributions
    firstYearContributions: Contributions
}
