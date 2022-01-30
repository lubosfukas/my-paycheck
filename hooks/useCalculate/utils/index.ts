import { calcContractNetIncome } from './calcContractNetIncome'
import { calcNetIncome } from './calcNetIncome'
import { calcSuperGrossIncome } from './calcSuperGrossIncome'

export const calculate = ({
    childrenAboveSix,
    childrenBelowSix,
    isSeverelyDisabled,
    monthlyGrossIncome,
    monthsWorked,
    companionIncome,
}: {
    childrenAboveSix: number
    childrenBelowSix: number
    isSeverelyDisabled: boolean
    monthlyGrossIncome: number
    monthsWorked: number
    companionIncome?: number
}) => {
    const {
        annualIncome: annualNetIncome,
        contributions: employeeContributions,
        monthlyIncome: monthlyNetIncome,
    } = calcNetIncome({
        childrenAboveSix,
        childrenBelowSix,
        isSeverelyDisabled,
        monthlyGrossIncome,
        monthsWorked,
        companionIncome,
    })

    const {
        annualIncome: annualSuperGrossIncome,
        contributions: employerContributions,
        monthlyIncome: monthlySuperGrossIncome,
    } = calcSuperGrossIncome({
        isSeverelyDisabled,
        monthlyGrossIncome,
        monthsWorked,
    })

    const {
        averageIncome: contractAverageIncome,
        contributions: contractContributions,
        firstYearAverageIncome: firstYearContractAverageIncome,
        firstYearContributions: firstYearContractContributions,
        firstYearIncome: firstYearContractIncome,
        income: contractIncome,
        manDayRate: contractManDayRate,
        manHourRate: contractManHourRate,
    } = calcContractNetIncome({
        childrenAboveSix,
        childrenBelowSix,
        isSeverelyDisabled,
        companionIncome,
        monthsWorked: 10.5,
        monthlyIncome: monthlySuperGrossIncome,
    })

    return {
        annualNetIncome,
        employeeContributions,
        monthlyNetIncome,

        annualSuperGrossIncome,
        employerContributions,
        monthlySuperGrossIncome,

        contractAverageIncome,
        contractContributions,
        contractIncome,
        contractManDayRate,
        contractManHourRate,
        firstYearContractAverageIncome,
        firstYearContractContributions,
        firstYearContractIncome,
    }
}
