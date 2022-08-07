import {
    CHILDREN_ABOVE_FIFTEEN_TAX_BONUS,
    CHILDREN_ABOVE_SIX_TAX_BONUS,
    CHILDREN_BELOW_SIX_TAX_BONUS,
    LIVING_WAGE_176P8_MULTIPLY,
    LIVING_WAGE_19P2_MULTIPLY,
    LIVING_WAGE_44P2_MULTIPLY,
    LIVING_WAGE_92P8_MULTIPLY,
    MAX_ASSESSMENT_BASIS,
    NON_TAXABLE_PART_PER_TAX_PAYER,
} from './constants'
import {
    EMPLOYEE_DISABILITY_INSURANCE_PERCENTAGE,
    EMPLOYEE_HEALTH_INSURANCE_PERCENTAGE,
    EMPLOYEE_RETIREMENT_INSURANCE_PERCENTAGE,
    EMPLOYEE_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE,
    EMPLOYEE_MEDICARE_INSURANCE_PERCENTAGE,
    EMPLOYEE_UNEMPLOYMENT_INSURANCE_PERCENTAGE,
} from '../../../utils/constants'
import { to2Decimal, toPercentage } from '../../../utils/helpers'
import { Income } from '../../../types'

// Zdravotné poistenie
export const calcHealthInsurance = (
    grossIncome: number,
    isSeverelyDisabled: boolean
) =>
    to2Decimal(
        isSeverelyDisabled
            ? toPercentage(
                  grossIncome,
                  EMPLOYEE_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE
              )
            : toPercentage(grossIncome, EMPLOYEE_HEALTH_INSURANCE_PERCENTAGE)
    )

// Nemocenské poistenie
export const calcMedicareInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYEE_MEDICARE_INSURANCE_PERCENTAGE
              )
            : toPercentage(grossIncome, EMPLOYEE_MEDICARE_INSURANCE_PERCENTAGE)
    )

// Invalidné poistenie
export const calcDisabilityInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYEE_DISABILITY_INSURANCE_PERCENTAGE
              )
            : toPercentage(
                  grossIncome,
                  EMPLOYEE_DISABILITY_INSURANCE_PERCENTAGE
              )
    )

// Poistenie v nezamestnanosti
export const calcUnemploymentInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYEE_UNEMPLOYMENT_INSURANCE_PERCENTAGE
              )
            : toPercentage(
                  grossIncome,
                  EMPLOYEE_UNEMPLOYMENT_INSURANCE_PERCENTAGE
              )
    )

// Starobné poistenie
export const calcRetirementInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYEE_RETIREMENT_INSURANCE_PERCENTAGE
              )
            : toPercentage(
                  grossIncome,
                  EMPLOYEE_RETIREMENT_INSURANCE_PERCENTAGE
              )
    )

// Základ dane
export const calcTaxBase = (
    grossIncome: number,
    healthInsurance: number,
    socialInsurance: number
) => to2Decimal(grossIncome - healthInsurance - socialInsurance)

// Nezdaniteľná časť základu dane
export const calcNonTaxablePart = (taxBase: number) => {
    if (taxBase <= LIVING_WAGE_92P8_MULTIPLY)
        return NON_TAXABLE_PART_PER_TAX_PAYER

    const nonTaxablePart = LIVING_WAGE_44P2_MULTIPLY - taxBase / 4
    return to2Decimal(nonTaxablePart)
}

// Nezdaniteľná časť na manželku/manžela
export const calcCompanionNonTaxablePart = (companionIncome?: number) => {
    if (companionIncome === undefined) return

    if (companionIncome === 0) return LIVING_WAGE_19P2_MULTIPLY
    else if (companionIncome < LIVING_WAGE_19P2_MULTIPLY)
        return to2Decimal(LIVING_WAGE_19P2_MULTIPLY - companionIncome)
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
        monthlyTaxBaseBeforeTax > LIVING_WAGE_176P8_MULTIPLY
            ? toPercentage(
                  monthlyTaxBaseBeforeTax - LIVING_WAGE_176P8_MULTIPLY,
                  25
              ) + toPercentage(LIVING_WAGE_176P8_MULTIPLY, 19)
            : toPercentage(monthlyTaxBaseBeforeTax, 19)

    return to2Decimal(incomeTax)
}

// Daňový bonus
export const calcTaxBonus = ({
    childrenAboveFifteen,
    childrenAboveSix,
    childrenBelowSix,
}: {
    childrenAboveFifteen: number
    childrenAboveSix: number
    childrenBelowSix: number
}) =>
    to2Decimal(
        childrenBelowSix * CHILDREN_BELOW_SIX_TAX_BONUS +
            childrenAboveSix * CHILDREN_ABOVE_SIX_TAX_BONUS +
            childrenAboveFifteen * CHILDREN_ABOVE_FIFTEEN_TAX_BONUS
    )

export const calcNetIncome = ({
    childrenAboveSix,
    childrenBelowSix,
    childrenAboveFifteen,
    isSeverelyDisabled,
    monthlyGrossIncome,
    monthsWorked,
    companionIncome,
}: Income) => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? EMPLOYEE_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE
        : EMPLOYEE_HEALTH_INSURANCE_PERCENTAGE
    const insurancePercentageSum = to2Decimal(
        healthInsurancePercentage +
            EMPLOYEE_MEDICARE_INSURANCE_PERCENTAGE +
            EMPLOYEE_RETIREMENT_INSURANCE_PERCENTAGE +
            EMPLOYEE_DISABILITY_INSURANCE_PERCENTAGE +
            EMPLOYEE_UNEMPLOYMENT_INSURANCE_PERCENTAGE
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
                    percentage: EMPLOYEE_MEDICARE_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Starobné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: EMPLOYEE_RETIREMENT_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Invalidné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: EMPLOYEE_DISABILITY_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: EMPLOYEE_UNEMPLOYMENT_INSURANCE_PERCENTAGE,
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
    const taxBonus = calcTaxBonus({
        childrenBelowSix,
        childrenAboveSix,
        childrenAboveFifteen,
    })

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
                percentage: EMPLOYEE_MEDICARE_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Starobné poistenie',
                monthlyContributions: retirementInsurance,
                annualContributions: to2Decimal(
                    retirementInsurance * monthsWorked
                ),
                percentage: EMPLOYEE_RETIREMENT_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Invalidné poistenie',
                monthlyContributions: disabilityInsurance,
                annualContributions: to2Decimal(
                    disabilityInsurance * monthsWorked
                ),
                percentage: EMPLOYEE_DISABILITY_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Poistenie v nezamestnanosti',
                monthlyContributions: unemploymentInsurance,
                annualContributions: to2Decimal(
                    unemploymentInsurance * monthsWorked
                ),
                percentage: EMPLOYEE_UNEMPLOYMENT_INSURANCE_PERCENTAGE,
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
