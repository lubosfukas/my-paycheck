import {
    calcCompanionNonTaxablePart,
    calcDisabilityInsurance,
    calcHealthInsurance,
    calcIncomeTax,
    calcMedicareInsurance,
    calcMonthlyTaxBaseBeforeTax,
    calcMonthlyTaxBaseNonTaxablePart,
    calcNonTaxablePart,
    calcRetirementInsurance,
    calcTaxBase,
    calcTaxBonus,
    calcUnemploymentInsurance,
} from './utils'
import { to2Decimal } from '../../utils/helpers'

export const useCalcNetIncome = ({
    monthlyGrossIncome,
    companionIncome,
    monthsWorked = 12,
    isSeverelyDisabled = false,
    childrenBelowSix = 0,
    childrenAboveSix = 0,
}: {
    monthlyGrossIncome: number
    monthsWorked?: number
    isSeverelyDisabled?: boolean
    childrenBelowSix?: number
    childrenAboveSix?: number
    companionIncome?: number
}) => {
    if (monthlyGrossIncome < 700)
        return {
            monthlyIncome: 0,
            annualIncome: 0,
            contributions: {
                healthInsurance: 0,
                socialInsurance: 0,
                medicareInsurance: 0,
                retirementInsurance: 0,
                disabilityInsurance: 0,
                unemploymentInsurance: 0,
                incomeTax: 0,
            },
        }

    const healthInsurance = calcHealthInsurance(
        monthlyGrossIncome,
        isSeverelyDisabled
    )

    const medicareInsurance = calcMedicareInsurance(monthlyGrossIncome)
    const retirementInsurance = calcRetirementInsurance(monthlyGrossIncome)
    const disabilityInsurance = calcDisabilityInsurance(monthlyGrossIncome)
    const unemploymentInsurance = calcUnemploymentInsurance(monthlyGrossIncome)
    const socialInsurance = to2Decimal(
        medicareInsurance +
            retirementInsurance +
            disabilityInsurance +
            unemploymentInsurance
    )

    const monthlyTaxBase = calcTaxBase(
        monthlyGrossIncome,
        healthInsurance,
        socialInsurance
    )
    const annualTaxBase = to2Decimal(monthlyTaxBase * 12)
    const annualNonTaxablePart = calcNonTaxablePart(annualTaxBase)
    const companionNonTaxablePart = calcCompanionNonTaxablePart(companionIncome)
    const monthlyNonTaxablePart = calcMonthlyTaxBaseNonTaxablePart(
        annualNonTaxablePart,
        companionNonTaxablePart
    )
    const monthlyTaxBaseBeforeTax = calcMonthlyTaxBaseBeforeTax(
        monthlyTaxBase,
        monthlyNonTaxablePart
    )
    const incomeTax = calcIncomeTax(monthlyTaxBaseBeforeTax)
    const taxBonus = calcTaxBonus(childrenBelowSix, childrenAboveSix)

    const monthlyIncome = to2Decimal(
        monthlyGrossIncome -
            healthInsurance -
            socialInsurance -
            incomeTax +
            taxBonus
    )
    const annualIncome = to2Decimal(monthlyIncome * monthsWorked)

    return {
        monthlyIncome,
        annualIncome,
        contributions: {
            healthInsurance,
            socialInsurance: socialInsurance,
            medicareInsurance: medicareInsurance,
            retirementInsurance: retirementInsurance,
            disabilityInsurance: disabilityInsurance,
            unemploymentInsurance: unemploymentInsurance,
            incomeTax,
        },
    }
}
