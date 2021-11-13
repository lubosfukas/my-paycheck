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
import {
    contractorDisabilityInsurancePercentage,
    contractorHealthInsurancePercentage,
    contractorMedicareInsurancePercentage,
    contractorReserveFundPercentage,
    contractorRetirementInsurancePercentage,
    contractorSeverelyDisabledHealthInsurancePercentage,
} from '../../utils/constants'
import { to2Decimal } from '../../utils/helpers'
import { Contributions } from '../../types'

type Props = {
    monthlyIncome: number
    childrenAboveSix?: number
    childrenBelowSix?: number
    isSeverelyDisabled?: boolean
    companionIncome?: number
    monthsWorked?: number
}

type Result = {
    averageIncome: number
    firstYearAverageIncome: number
    firstYearIncome: number
    income: number
    manDayRate: number
    manHourRate: number
    contributions: Contributions
    firstYearContributions: Contributions
}

export const useCalcContractNetIncome = ({
    monthlyIncome,
    companionIncome,
    childrenAboveSix = 0,
    childrenBelowSix = 0,
    isSeverelyDisabled = false,
    monthsWorked = 10.5,
}: Props): Result => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? contractorSeverelyDisabledHealthInsurancePercentage
        : contractorHealthInsurancePercentage

    const insurancePercentageSum = to2Decimal(
        healthInsurancePercentage +
            contractorMedicareInsurancePercentage +
            contractorRetirementInsurancePercentage +
            contractorDisabilityInsurancePercentage +
            contractorReserveFundPercentage
    )

    if (monthlyIncome < 700)
        return {
            averageIncome: 0,
            firstYearAverageIncome: 0,
            firstYearIncome: 0,
            income: 0,
            manDayRate: 0,
            manHourRate: 0,
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
                    percentage: contractorMedicareInsurancePercentage,
                },
                {
                    label: 'Starobné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: contractorRetirementInsurancePercentage,
                },
                {
                    label: 'Invalidné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: contractorDisabilityInsurancePercentage,
                },
                {
                    label: 'Rezervný fond',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: contractorReserveFundPercentage,
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
            firstYearContributions: [
                {
                    label: 'Zdravotné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: healthInsurancePercentage,
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
                    percentage: healthInsurancePercentage,
                    isSum: true,
                    hasTax: true,
                },
            ],
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

    const monthlyContributions = to2Decimal(
        monthlyHealthInsurance + monthlySocialInsurance + monthlyTax
    )

    const firstYearMonthlyContributions = to2Decimal(
        monthlyHealthInsurance + monthlyTax
    )

    return {
        averageIncome: averageNetIncome,
        firstYearAverageIncome: firstYearAverageNetIncome,
        firstYearIncome: firstYearNetIncome,
        income: netIncome,
        manDayRate,
        manHourRate,
        contributions: [
            {
                label: 'Zdravotné poistenie',
                monthlyContributions: monthlyHealthInsurance,
                annualContributions: annualHealthInsurance,
                percentage: healthInsurancePercentage,
            },
            {
                label: 'Nemocenské poistenie',
                monthlyContributions: monthlyMedicareInsurance,
                annualContributions: annualMedicareInsurance,
                percentage: contractorMedicareInsurancePercentage,
            },
            {
                label: 'Starobné poistenie',
                monthlyContributions: monthlyRetirementInsurance,
                annualContributions: annualRetirementInsurance,
                percentage: contractorRetirementInsurancePercentage,
            },
            {
                label: 'Invalidné poistenie',
                monthlyContributions: monthlyDisabilityInsurance,
                annualContributions: annualDisabilityInsurance,
                percentage: contractorDisabilityInsurancePercentage,
            },
            {
                label: 'Rezervný fond',
                monthlyContributions: monthlyReserveFund,
                annualContributions: annualReserveFund,
                percentage: contractorReserveFundPercentage,
            },
            {
                label: 'Daň z príjmu',
                monthlyContributions: monthlyTax,
                annualContributions: tax,
            },
            {
                label: 'Spolu',
                monthlyContributions: monthlyContributions,
                annualContributions: to2Decimal(
                    monthlyContributions * monthsWorkedForLevies
                ),
                percentage: insurancePercentageSum,
                isSum: true,
                hasTax: true,
            },
        ],
        firstYearContributions: [
            {
                label: 'Zdravotné poistenie',
                monthlyContributions: monthlyHealthInsurance,
                annualContributions: annualHealthInsurance,
                percentage: healthInsurancePercentage,
            },
            {
                label: 'Daň z príjmu',
                monthlyContributions: monthlyTax,
                annualContributions: tax,
            },
            {
                label: 'Spolu',
                monthlyContributions: firstYearMonthlyContributions,
                annualContributions: to2Decimal(
                    firstYearMonthlyContributions * monthsWorkedForLevies
                ),
                percentage: healthInsurancePercentage,
                isSum: true,
                hasTax: true,
            },
        ],
    }
}
