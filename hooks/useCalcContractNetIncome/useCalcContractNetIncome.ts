import {
    calcManDayRate,
    calcManHourRate,
    calcAssessmentBasis,
    calcFlatRateExpenditure,
    calcMonthlyDisabilityInsurance,
    calcMonthlyHealthInsurance,
    calcMonthlyMedicareInsurance,
    calcMonthlyReserveFund,
    calcMonthlyRetirementInsurance,
    calcNonTaxablePart,
    calcTax,
    calcTaxBase,
    calcTaxBaseNonBeforeNonTaxablePart,
    calcTaxBonus,
    toAnnual,
    toMonthly,
} from './utils'
import { monthsWorkedForLevies } from './constants'
import { to2Decimal } from '../../utils/helpers'

export const useCalcContractNetIncome = ({
    monthlyIncome,
    isSeverelyDisabled,
    childrenBelowSix,
    childrenAboveSix,
    companionIncome,
    monthsWorked = 10.5,
}: {
    monthlyIncome: number
    childrenAboveSix: number
    childrenBelowSix: number
    isSeverelyDisabled: boolean
    monthsWorked?: number
    companionIncome?: number
}) => {
    if (monthlyIncome < 700)
        return {
            averageNetIncome: 0,
            firstYearAverageNetIncome: 0,
            firstYearNetIncome: 0,
            manDayRate: 0,
            manHourRate: 0,
            netIncome: 0,
            contributions: {
                healthInsurance: 0,
                socialInsurance: 0,
                medicareInsurance: 0,
                retirementInsurance: 0,
                disabilityInsurance: 0,
                reserveFund: 0,
                incomeTax: 0,
            },
        }
    const annualIncome = to2Decimal(monthlyIncome * monthsWorked)
    const flatRateExpenditure = calcFlatRateExpenditure(annualIncome)
    const assessmentBasis = calcAssessmentBasis(
        annualIncome,
        flatRateExpenditure
    )

    const monthlyHealthInsurance = calcMonthlyHealthInsurance(
        assessmentBasis,
        isSeverelyDisabled
    )
    const monthlyMedicareInsurance =
        calcMonthlyMedicareInsurance(assessmentBasis)
    const monthlyRetirementInsurance =
        calcMonthlyRetirementInsurance(assessmentBasis)
    const monthlyDisabilityInsurance =
        calcMonthlyDisabilityInsurance(assessmentBasis)
    const monthlyReserveFund = calcMonthlyReserveFund(assessmentBasis)
    const monthlySocialInsurance = to2Decimal(
        monthlyMedicareInsurance +
            monthlyRetirementInsurance +
            monthlyDisabilityInsurance +
            monthlyReserveFund
    )

    const annualHealthInsurance = toAnnual(monthlyHealthInsurance)
    const annualMedicareInsurance = toAnnual(monthlyMedicareInsurance)
    const annualRetirementInsurance = toAnnual(monthlyRetirementInsurance)
    const annualDisabilityInsurance = toAnnual(monthlyDisabilityInsurance)
    const annualReserveFund = toAnnual(monthlyReserveFund)
    const annualSocialInsurance = to2Decimal(
        annualMedicareInsurance +
            annualRetirementInsurance +
            annualDisabilityInsurance +
            annualReserveFund
    )

    const taxBaseBeforeNonTaxablePart = calcTaxBaseNonBeforeNonTaxablePart({
        annualIncome,
        flatRateExpenditure,
        healthInsurance: annualHealthInsurance,
        socialInsurance: annualSocialInsurance,
    })
    const nonTaxablePart = calcNonTaxablePart(
        taxBaseBeforeNonTaxablePart,
        companionIncome
    )
    const taxBonus = calcTaxBonus(childrenBelowSix, childrenAboveSix)
    const taxBase = calcTaxBase({
        taxBase: taxBaseBeforeNonTaxablePart,
        nonTaxablePart,
        taxBonus,
    })

    const tax = calcTax(annualIncome, taxBase)
    const monthlyTax = toMonthly(tax)

    const monthlyCosts = to2Decimal(
        monthlyHealthInsurance + monthlySocialInsurance + monthlyTax
    )
    const netIncome = to2Decimal(monthlyIncome - monthlyCosts)
    const averageNetIncome = to2Decimal(
        (netIncome * monthsWorked) / monthsWorkedForLevies
    )
    const firstYearNetIncome = to2Decimal(
        monthlyIncome - monthlyHealthInsurance - monthlyTax
    )
    const firstYearAverageNetIncome = to2Decimal(
        (firstYearNetIncome * monthsWorked) / monthsWorkedForLevies
    )

    const manDayRate = calcManDayRate(monthlyIncome)
    const manHourRate = calcManHourRate(monthlyIncome)

    return {
        averageNetIncome,
        firstYearAverageNetIncome,
        firstYearNetIncome,
        manDayRate,
        manHourRate,
        netIncome,
        contributions: {
            healthInsurance: monthlyHealthInsurance,
            socialInsurance: monthlySocialInsurance,
            medicareInsurance: monthlyMedicareInsurance,
            retirementInsurance: monthlyRetirementInsurance,
            disabilityInsurance: monthlyDisabilityInsurance,
            reserveFund: monthlyReserveFund,
            incomeTax: monthlyTax,
        },
    }
}
