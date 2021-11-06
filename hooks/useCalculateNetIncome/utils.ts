import {
    childrenAboveSixTaxBonus,
    childrenBelowSixTaxBonus,
    disabilityInsurancePercentage,
    employeeHealthInsurancePercentage,
    employeeRetirementInsurancePercentage,
    employeeSeverelyDisabledHealthInsurancePercentage,
    maxAssessmentBasis,
    medicareInsurancePercentage,
    unemploymentInsurancePercentage,
} from '../../utils/constants'
import {
    livingWage176p8Multiply,
    livingWage19p2Multiply,
    livingWage44p2Multiply,
    livingWage92p8Multiply,
    taxBaseNonTaxablePartPerTaxPayer,
} from './constants'
import { to2Decimal, toPercentage } from '../../utils/helpers'

// Zdravotné poistenie
export const calcHealthInsurance = (
    grossIncome: number,
    isSeverelyDisabled: boolean
) =>
    to2Decimal(
        isSeverelyDisabled
            ? toPercentage(
                  grossIncome,
                  employeeSeverelyDisabledHealthInsurancePercentage
              )
            : toPercentage(grossIncome, employeeHealthInsurancePercentage)
    )

// Nemocenské poistenie
export const calcMedicareInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(maxAssessmentBasis, medicareInsurancePercentage)
            : toPercentage(grossIncome, medicareInsurancePercentage)
    )

// Invalidné poistenie
export const calcDisabilityInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(maxAssessmentBasis, disabilityInsurancePercentage)
            : toPercentage(grossIncome, disabilityInsurancePercentage)
    )

// Poistenie v nezamestnanosti
export const calcUnemploymentInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(maxAssessmentBasis, unemploymentInsurancePercentage)
            : toPercentage(grossIncome, unemploymentInsurancePercentage)
    )

// Starobné poistenie
export const calcRetirementInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(
                  maxAssessmentBasis,
                  employeeRetirementInsurancePercentage
              )
            : toPercentage(grossIncome, employeeRetirementInsurancePercentage)
    )

// Základ dane
export const calcTaxBase = (
    grossIncome: number,
    healthInsurance: number,
    socialInsurance: number
) => to2Decimal(grossIncome - healthInsurance - socialInsurance)

// Nezdaniteľná časť základu dane
export const calcNonTaxablePart = (taxBase: number) => {
    if (taxBase <= livingWage92p8Multiply)
        return taxBaseNonTaxablePartPerTaxPayer

    const nonTaxablePart = livingWage44p2Multiply - taxBase / 4
    return to2Decimal(nonTaxablePart)
}

// Nezdaniteľná časť na manželku/manžela
export const calcCompanionNonTaxablePart = (companionIncome?: number) => {
    if (companionIncome === undefined) return

    if (companionIncome === 0) return livingWage19p2Multiply
    else if (companionIncome < livingWage19p2Multiply)
        return to2Decimal(livingWage19p2Multiply - companionIncome)
    else return 0
}

// Nezdaniteľná časť základu dane na mesiac
export const calcMonthlyTaxBaseNonTaxablePart = (
    annualNonTaxablePart: number,
    companionNonTaxablePart?: number
) =>
    companionNonTaxablePart
        ? to2Decimal((annualNonTaxablePart + companionNonTaxablePart) / 12)
        : to2Decimal(annualNonTaxablePart / 12)

// Mesačný základ dane pred zdanením
export const calcMonthlyTaxBaseBeforeTax = (
    taxBase: number,
    monthlyTaxBaseNonTaxablePart: number
) => to2Decimal(taxBase - monthlyTaxBaseNonTaxablePart)

// Daň z príjmu
export const calcIncomeTax = (monthlyTaxBaseBeforeTax: number) => {
    const incomeTax =
        monthlyTaxBaseBeforeTax > livingWage176p8Multiply
            ? toPercentage(
                  monthlyTaxBaseBeforeTax - livingWage176p8Multiply,
                  25
              ) + toPercentage(livingWage176p8Multiply, 19)
            : toPercentage(monthlyTaxBaseBeforeTax, 19)

    return to2Decimal(incomeTax)
}

// Daňový bonus
export const calcTaxBonus = (
    childrenBelowSix: number,
    childrenAboveSix: number
) =>
    childrenBelowSix * childrenBelowSixTaxBonus +
    childrenAboveSix * childrenAboveSixTaxBonus
