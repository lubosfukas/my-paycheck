import {
    livingWage44p2Multiply,
    livingWage92p8Multiply,
    livingWage176p8Multiply,
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

// Nezdaniteľná časť základu dane na mesiac
export const calculateMonthlyTaxBaseNonTaxablePart = (
    monthlyTaxBase: number,
    monthsWorked: number
) => {
    const annualTaxBase = to2Decimal(monthlyTaxBase * monthsWorked)
    const annualNonTaxablePart = calculateNonTaxablePart(annualTaxBase)

    return to2Decimal(annualNonTaxablePart / monthsWorked)
}

// Mesačný základ dane pred zdanením
export const calculateMonthlyTaxBaseBeforeTax = (
    taxBase: number,
    monthsWorked: number
) => {
    const monthlyTaxBaseNonTaxablePart = calculateMonthlyTaxBaseNonTaxablePart(
        taxBase,
        monthsWorked
    )

    return to2Decimal(taxBase - monthlyTaxBaseNonTaxablePart)
}

// Daň z príjmu
export const calculateIncomeTax = (taxBase: number, monthsWorked: number) => {
    const monthlyTaxBaseBeforeTax = calculateMonthlyTaxBaseBeforeTax(
        taxBase,
        monthsWorked
    )

    const incomeTax =
        monthlyTaxBaseBeforeTax > livingWage176p8Multiply
            ? ((monthlyTaxBaseBeforeTax - livingWage176p8Multiply) / 100) * 25 +
              (livingWage176p8Multiply / 100) * 19
            : (monthlyTaxBaseBeforeTax / 100) * 19

    return to2Decimal(incomeTax)
}
