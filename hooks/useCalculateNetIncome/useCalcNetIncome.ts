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
import {
    disabilityInsurancePercentage,
    employeeHealthInsurancePercentage,
    employeeRetirementInsurancePercentage,
    employeeSeverelyDisabledHealthInsurancePercentage,
    medicareInsurancePercentage,
    unemploymentInsurancePercentage,
} from '../../utils/constants'
import { Contributions } from '../../types'

type Response = {
    monthlyIncome: number
    annualIncome: number
    contributions: Contributions
}

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
}): Response => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? employeeSeverelyDisabledHealthInsurancePercentage
        : employeeHealthInsurancePercentage
    const insurancePercentageSum = to2Decimal(
        healthInsurancePercentage +
            medicareInsurancePercentage +
            employeeRetirementInsurancePercentage +
            disabilityInsurancePercentage +
            unemploymentInsurancePercentage
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
                    percentage: medicareInsurancePercentage,
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
                    percentage: disabilityInsurancePercentage,
                },
                {
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: unemploymentInsurancePercentage,
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
                percentage: medicareInsurancePercentage,
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
                percentage: disabilityInsurancePercentage,
            },
            {
                label: 'Poistenie v nezamestnanosti',
                monthlyContributions: unemploymentInsurance,
                annualContributions: to2Decimal(
                    unemploymentInsurance * monthsWorked
                ),
                percentage: unemploymentInsurancePercentage,
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
            },
        ],
    }
}
