import {
    childrenAboveSixTaxBonus,
    childrenBelowSixTaxBonus,
    livingWage,
    maxAssessmentBasis,
    taxBaseNonTaxablePartPerTaxPayer,
    employeeHealthInsurancePercentage,
    employeeSeverelyDisabledHealthInsurancePercentage,
    employeeRetirementInsurancePercentage,
} from '../../utils/constants'
import {
    calculateDisabilityInsurance,
    calculateMedicareInsurance,
    calculateUnemploymentInsurance,
    to2Decimal,
} from '../../utils/helpers'

// 19,2-násobok sumy životného minima - 4124,74€
const livingWage19p2Multiply = to2Decimal(19.2 * livingWage)

// 44,2-násobok sumy životného minima - 9495,49€
const livingWage44p2Multiply = to2Decimal(44.2 * livingWage)

// 92.8-násobok sumy životného minima - 19936,22€
const livingWage92p8Multiply = to2Decimal(92.8 * livingWage)

// 176,8-násobok sumy životného minima - 37981,94€
const livingWage176p8Multiply = to2Decimal(176.8 * livingWage)

// Zdravotné poistenie
export const calculateEmployeeHealthInsurance = (
    grossIncome: number,
    isSeverelyDisabled: boolean
) =>
    to2Decimal(
        isSeverelyDisabled
            ? (grossIncome / 100) *
                  employeeSeverelyDisabledHealthInsurancePercentage
            : (grossIncome / 100) * employeeHealthInsurancePercentage
    )

// Starobné poistenie
export const calculateEmployeeRetirementInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? (maxAssessmentBasis / 100) * employeeRetirementInsurancePercentage
            : (grossIncome / 100) * employeeRetirementInsurancePercentage
    )

// Sociálne poistenie
export const calculateEmployeeSocialInsurance = (grossIncome: number) => {
    const medicareInsurance = calculateMedicareInsurance(grossIncome)
    const retirementInsurance =
        calculateEmployeeRetirementInsurance(grossIncome)
    const disabilityInsurance = calculateDisabilityInsurance(grossIncome)
    const unemploymentInsurance = calculateUnemploymentInsurance(grossIncome)

    return {
        medicareInsurance,
        retirementInsurance,
        disabilityInsurance,
        unemploymentInsurance,
        sum: to2Decimal(
            medicareInsurance +
                retirementInsurance +
                disabilityInsurance +
                unemploymentInsurance
        ),
    }
}

// Základ dane
export const calculateTaxBase = (
    grossIncome: number,
    healthInsurance: number,
    socialInsurance: number
) => to2Decimal(grossIncome - healthInsurance - socialInsurance)

// Nezdaniteľná časť základu dane
export const calculateNonTaxablePart = (taxBase: number) => {
    if (taxBase <= livingWage92p8Multiply)
        return taxBaseNonTaxablePartPerTaxPayer

    const nonTaxablePart = livingWage44p2Multiply - taxBase / 4
    return to2Decimal(nonTaxablePart)
}

// Nezdaniteľná časť na manželku/manžela
export const calculateCompanionNonTaxablePart = (companionIncome?: number) => {
    if (companionIncome === undefined) return

    if (companionIncome === 0) return livingWage19p2Multiply
    else if (companionIncome < livingWage19p2Multiply)
        return to2Decimal(livingWage19p2Multiply - companionIncome)
    else return 0
}

// Nezdaniteľná časť základu dane na mesiac
export const calculateMonthlyTaxBaseNonTaxablePart = (
    monthlyTaxBase: number,
    companionIncome?: number
) => {
    const annualTaxBase = to2Decimal(monthlyTaxBase * 12)
    const annualNonTaxablePart = calculateNonTaxablePart(annualTaxBase)
    const companionNonTaxablePart =
        calculateCompanionNonTaxablePart(companionIncome)

    if (companionNonTaxablePart)
        return to2Decimal((annualNonTaxablePart + companionNonTaxablePart) / 12)

    return to2Decimal(annualNonTaxablePart / 12)
}

// Mesačný základ dane pred zdanením
export const calculateMonthlyTaxBaseBeforeTax = (
    taxBase: number,
    companionIncome?: number
) => {
    const monthlyTaxBaseNonTaxablePart = calculateMonthlyTaxBaseNonTaxablePart(
        taxBase,
        companionIncome
    )

    return to2Decimal(taxBase - monthlyTaxBaseNonTaxablePart)
}

// Daň z príjmu
export const calculateIncomeTax = (
    taxBase: number,
    companionIncome?: number
) => {
    const monthlyTaxBaseBeforeTax = calculateMonthlyTaxBaseBeforeTax(
        taxBase,
        companionIncome
    )

    const incomeTax =
        monthlyTaxBaseBeforeTax > livingWage176p8Multiply
            ? ((monthlyTaxBaseBeforeTax - livingWage176p8Multiply) / 100) * 25 +
              (livingWage176p8Multiply / 100) * 19
            : (monthlyTaxBaseBeforeTax / 100) * 19

    return to2Decimal(incomeTax)
}

// Daňový bonus
export const calculateTaxBonus = (
    childrenBelowSix: number,
    childrenAboveSix: number
) =>
    childrenBelowSix * childrenBelowSixTaxBonus +
    childrenAboveSix * childrenAboveSixTaxBonus
