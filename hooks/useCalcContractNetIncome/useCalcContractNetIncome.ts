import { monthsWorkedForLevies } from './constants'
import {
    calcAssessmentBasis,
    calcFlatRateExpenditure,
    calcManDayRate,
    calcManHourRate,
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
import { to2Decimal } from '../../utils/helpers'

type Props = {
    monthlyIncome: number
    childrenAboveSix?: number
    childrenBelowSix?: number
    isSeverelyDisabled?: boolean
    companionIncome?: number
    monthsWorked?: number
}

export const useCalcContractNetIncome = ({
    monthlyIncome,
    companionIncome,
    childrenAboveSix = 0,
    childrenBelowSix = 0,
    isSeverelyDisabled = false,
    monthsWorked = 10.5,
}: Props) => {
    if (monthlyIncome < 700)
        return {
            averageIncome: 0,
            firstYearAverageIncome: 0,
            firstYearIncome: 0,
            income: 0,
            manDayRate: 0,
            manHourRate: 0,
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
        averageIncome: averageNetIncome,
        firstYearAverageIncome: firstYearAverageNetIncome,
        firstYearIncome: firstYearNetIncome,
        income: netIncome,
        manDayRate,
        manHourRate,
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
