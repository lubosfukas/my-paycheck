import {
    childrenAboveSixTaxBonus,
    childrenBelowSixTaxBonus,
    livingWage176p8Multiply,
    livingWage19p2Multiply,
    livingWage44p2Multiply,
    livingWage92p8Multiply,
    maxAssessmentBasis,
    taxBaseNonTaxablePartPerTaxPayer,
} from './constants'
import {
    employeeDisabilityInsurancePercentage,
    employeeHealthInsurancePercentage,
    employeeRetirementInsurancePercentage,
    employeeSeverelyDisabledHealthInsurancePercentage,
    employeeMedicareInsurancePercentage,
    employeeUnemploymentInsurancePercentage,
} from '../../../utils/constants'
import { to2Decimal, toPercentage } from '../../../utils/helpers'

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
            ? toPercentage(
                  maxAssessmentBasis,
                  employeeMedicareInsurancePercentage
              )
            : toPercentage(grossIncome, employeeMedicareInsurancePercentage)
    )

// Invalidné poistenie
export const calcDisabilityInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(
                  maxAssessmentBasis,
                  employeeDisabilityInsurancePercentage
              )
            : toPercentage(grossIncome, employeeDisabilityInsurancePercentage)
    )

// Poistenie v nezamestnanosti
export const calcUnemploymentInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(
                  maxAssessmentBasis,
                  employeeUnemploymentInsurancePercentage
              )
            : toPercentage(grossIncome, employeeUnemploymentInsurancePercentage)
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

export const calcNetIncome = ({
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
    const healthInsurancePercentage = isSeverelyDisabled
        ? employeeSeverelyDisabledHealthInsurancePercentage
        : employeeHealthInsurancePercentage
    const insurancePercentageSum = to2Decimal(
        healthInsurancePercentage +
            employeeMedicareInsurancePercentage +
            employeeRetirementInsurancePercentage +
            employeeDisabilityInsurancePercentage +
            employeeUnemploymentInsurancePercentage
    )

    if (monthlyGrossIncome < 700)
        return {
            monthlyIncome: 0,
            annualIncome: 0,
            contributions: [
                {
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: healthInsurancePercentage,
                },
                {
                    label: 'Nemocenské poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: employeeMedicareInsurancePercentage,
                },
                {
                    label: 'Starobné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: employeeRetirementInsurancePercentage,
                },
                {
                    label: 'Invalidné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: employeeDisabilityInsurancePercentage,
                },
                {
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: employeeUnemploymentInsurancePercentage,
                },
                {
                    label: 'Daň z príjmu',
                    monthlyContributions: 0,
                    annualContributions: 0,
                },
                {
                    label: 'Spolu',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: insurancePercentageSum,
                    isSum: true,
                    hasTax: true,
                },
            ],
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

    const monthlyContributions = to2Decimal(
        healthInsurance + socialInsurance + incomeTax
    )
    const annualContributions = to2Decimal(monthlyContributions * monthsWorked)

    return {
        monthlyIncome,
        annualIncome,
        contributions: [
            {
                label: 'Zdravotné poistenie',
                monthlyContributions: healthInsurance,
                annualContributions: to2Decimal(healthInsurance * monthsWorked),
                percentage: healthInsurancePercentage,
            },
            {
                label: 'Nemocenské poistenie',
                monthlyContributions: medicareInsurance,
                annualContributions: to2Decimal(
                    medicareInsurance * monthsWorked
                ),
                percentage: employeeMedicareInsurancePercentage,
            },
            {
                label: 'Starobné poistenie',
                monthlyContributions: retirementInsurance,
                annualContributions: to2Decimal(
                    retirementInsurance * monthsWorked
                ),
                percentage: employeeRetirementInsurancePercentage,
            },
            {
                label: 'Invalidné poistenie',
                monthlyContributions: disabilityInsurance,
                annualContributions: to2Decimal(
                    disabilityInsurance * monthsWorked
                ),
                percentage: employeeDisabilityInsurancePercentage,
            },
            {
                label: 'Poistenie v nezamestnanosti',
                monthlyContributions: unemploymentInsurance,
                annualContributions: to2Decimal(
                    unemploymentInsurance * monthsWorked
                ),
                percentage: employeeUnemploymentInsurancePercentage,
            },
            {
                label: 'Daň z príjmu',
                monthlyContributions: incomeTax,
                annualContributions: to2Decimal(incomeTax * monthsWorked),
            },
            {
                label: 'Spolu',
                monthlyContributions,
                annualContributions,
                percentage: insurancePercentageSum,
                isSum: true,
                hasTax: true,
            },
        ],
    }
}
