import {
    livingWage176p8Multiply,
    livingWage19p2Multiply,
    livingWage21Multiply,
    livingWage44p2Multiply,
    livingWage63p4Multiply,
    livingWage92p8Multiply,
    monthsWorkedForLevies,
} from './constants'
import {
    assessmentBasisCoefficient,
    childrenAboveSixTaxBonus,
    childrenBelowSixTaxBonus,
    contractorDisabilityInsurancePercentage,
    contractorHealthInsurancePercentage,
    contractorMedicareInsurancePercentage,
    contractorReserveFundPercentage,
    contractorRetirementInsurancePercentage,
    contractorSeverelyDisabledHealthInsurancePercentage,
    maxFlatRateExpenditure,
    maxFlatRateExpenditurePercentage,
    minAssessmentBasisForInsurance,
    minAssessmentBasisForLevies,
    minMonthlyHealthInsurance,
    minMonthlySocialInsurance,
} from '../../../utils/constants'
import { to2Decimal, toPercentage } from '../../../utils/helpers'

export const toAnnual = (monthlySum: number) =>
    to2Decimal(monthlySum * monthsWorkedForLevies)

export const toMonthly = (annualSum: number) =>
    to2Decimal(annualSum / monthsWorkedForLevies)

// Minimálne vymeriavaci základ za rok
export const minAnnualAssessmentBasis = to2Decimal(
    minAssessmentBasisForLevies * monthsWorkedForLevies
)

// Minimálne zdravotné poistenie za rok
export const minAnnualHealthInsurance = to2Decimal(
    minMonthlyHealthInsurance * monthsWorkedForLevies
)

// Minimálne sociálne poistenie za rok
export const minAnnualSocialInsurance = to2Decimal(
    minMonthlySocialInsurance * monthsWorkedForLevies
)

// Paušálne výdavky
export const calcFlatRateExpenditure = (annualIncome: number) => {
    const calculatedExpenditure = to2Decimal(
        toPercentage(annualIncome, maxFlatRateExpenditurePercentage)
    )

    return calculatedExpenditure < maxFlatRateExpenditure
        ? calculatedExpenditure
        : maxFlatRateExpenditure
}

// Vymeriavací základ za mesiac
export const calcAssessmentBasis = (
    annualIncome: number,
    flatRateExpenditure: number
) => {
    const calculatedBasis = to2Decimal(
        (annualIncome - flatRateExpenditure) /
            monthsWorkedForLevies /
            assessmentBasisCoefficient
    )

    return calculatedBasis < minAssessmentBasisForLevies
        ? minAssessmentBasisForLevies
        : calculatedBasis
}

// Zdravotné poistenie za mesiac
export const calcMonthlyHealthInsurance = (
    assessmentBasis: number,
    isSeverelyDisabled: boolean
) => {
    const calculatedHealthInsurance = isSeverelyDisabled
        ? to2Decimal(
              toPercentage(
                  assessmentBasis,
                  contractorSeverelyDisabledHealthInsurancePercentage
              )
          )
        : to2Decimal(
              toPercentage(assessmentBasis, contractorHealthInsurancePercentage)
          )

    return calculatedHealthInsurance < minMonthlyHealthInsurance
        ? minMonthlyHealthInsurance
        : calculatedHealthInsurance
}

// Nemocenské poistenie za mesiac
export const calcMonthlyMedicareInsurance = (assessmentBasis: number) => {
    const calculatedMedicareInsurance = to2Decimal(
        toPercentage(assessmentBasis, contractorMedicareInsurancePercentage)
    )
    const minMedicareInsurance = to2Decimal(
        toPercentage(
            minAssessmentBasisForInsurance,
            contractorMedicareInsurancePercentage
        )
    )

    return calculatedMedicareInsurance < minMedicareInsurance
        ? minMedicareInsurance
        : calculatedMedicareInsurance
}

// Starobné poistenie za mesiac
export const calcMonthlyRetirementInsurance = (assessmentBasis: number) => {
    const calculatedRetirementInsurance = to2Decimal(
        toPercentage(assessmentBasis, contractorRetirementInsurancePercentage)
    )
    const minRetirementInsurance = to2Decimal(
        toPercentage(
            minAssessmentBasisForInsurance,
            contractorRetirementInsurancePercentage
        )
    )

    return calculatedRetirementInsurance < minRetirementInsurance
        ? minRetirementInsurance
        : calculatedRetirementInsurance
}

// Invalidné poistenie za mesiac
export const calcMonthlyDisabilityInsurance = (assessmentBasis: number) => {
    const calculatedDisabilityInsurance = to2Decimal(
        toPercentage(assessmentBasis, contractorDisabilityInsurancePercentage)
    )
    const minDisabilityInsurance = to2Decimal(
        toPercentage(
            minAssessmentBasisForInsurance,
            contractorDisabilityInsurancePercentage
        )
    )

    return calculatedDisabilityInsurance < minDisabilityInsurance
        ? minDisabilityInsurance
        : calculatedDisabilityInsurance
}

// Rezervný fond solidarity za mesiac
export const calcMonthlyReserveFund = (assessmentBasis: number) => {
    const calculatedReserveFund = to2Decimal(
        toPercentage(assessmentBasis, contractorReserveFundPercentage)
    )
    const minReserveFund = to2Decimal(
        toPercentage(
            minAssessmentBasisForInsurance,
            contractorReserveFundPercentage
        )
    )

    return calculatedReserveFund < minReserveFund
        ? minReserveFund
        : calculatedReserveFund
}

// Základ dane pred nezdaniteľnou časťou
export const calcTaxBaseNonBeforeNonTaxablePart = ({
    annualIncome,
    flatRateExpenditure,
    healthInsurance,
    socialInsurance,
}: {
    annualIncome: number
    flatRateExpenditure: number
    healthInsurance: number
    socialInsurance: number
}) => {
    const taxBase = to2Decimal(
        annualIncome - flatRateExpenditure - healthInsurance - socialInsurance
    )

    return taxBase < 0 ? 0 : taxBase
}

// Nezdaniteľná časť základu dane
export const calcNonTaxablePart = (
    taxBase: number,
    companionIncome?: number
) => {
    if (taxBase > livingWage176p8Multiply) {
        if (companionIncome === undefined) return 0
        else {
            if (companionIncome === 0) {
                const nonTaxablePart = to2Decimal(
                    livingWage63p4Multiply - to2Decimal(taxBase / 4)
                )
                return nonTaxablePart <= 0 ? 0 : nonTaxablePart
            } else {
                const nonTaxablePart = to2Decimal(
                    livingWage63p4Multiply -
                        companionIncome -
                        to2Decimal(taxBase / 4)
                )
                return nonTaxablePart <= 0 ? 0 : nonTaxablePart
            }
        }
    } else {
        if (taxBase <= livingWage92p8Multiply) {
            if (companionIncome === undefined) return livingWage21Multiply
            else if (companionIncome === 0)
                return to2Decimal(livingWage21Multiply + livingWage19p2Multiply)
            else if (companionIncome < livingWage19p2Multiply) {
                const companionNonTaxablePart = to2Decimal(
                    livingWage19p2Multiply - companionIncome
                )

                return to2Decimal(
                    livingWage21Multiply + companionNonTaxablePart
                )
            } else return livingWage21Multiply
        } else {
            const nonTaxablePart = to2Decimal(
                livingWage44p2Multiply - to2Decimal(taxBase / 4)
            )
            const resultNonTaxablePart =
                nonTaxablePart <= 0 ? 0 : nonTaxablePart

            if (companionIncome === undefined) return resultNonTaxablePart
            else if (companionIncome === 0)
                return to2Decimal(resultNonTaxablePart + livingWage19p2Multiply)
            else if (companionIncome < livingWage19p2Multiply) {
                const companionNonTaxablePart = to2Decimal(
                    livingWage19p2Multiply - companionIncome
                )

                return to2Decimal(
                    resultNonTaxablePart + companionNonTaxablePart
                )
            } else return resultNonTaxablePart
        }
    }
}

// Daňový bonus
export const calcTaxBonus = (
    childrenBelowSix: number,
    childrenAboveSix: number
) => {
    const childrenBelowSixBonus = to2Decimal(
        childrenBelowSix * childrenBelowSixTaxBonus * monthsWorkedForLevies
    )
    const childrenAboveSixBonus = to2Decimal(
        childrenAboveSix * childrenAboveSixTaxBonus * monthsWorkedForLevies
    )

    return to2Decimal(childrenBelowSixBonus + childrenAboveSixBonus)
}

// Základ dane
export const calcTaxBase = ({
    taxBase,
    nonTaxablePart,
    taxBonus,
}: {
    taxBase: number
    nonTaxablePart: number
    taxBonus: number
}) => {
    const calculatedTaxBase = taxBase - nonTaxablePart - taxBonus

    return calculatedTaxBase < 0 ? 0 : calculatedTaxBase
}

// Daň z príjmu
export const calcTax = (annualIncome: number, taxBase: number) => {
    if (annualIncome < 100000) return to2Decimal(toPercentage(taxBase, 15))
    else if (taxBase > livingWage176p8Multiply)
        return to2Decimal(
            to2Decimal(toPercentage(taxBase - livingWage176p8Multiply, 25)) +
                to2Decimal(toPercentage(livingWage176p8Multiply, 19))
        )
    else return to2Decimal(toPercentage(taxBase, 19))
}

// Dňový rate
export const calcManDayRate = (monthlyIncome: number) =>
    to2Decimal((monthlyIncome / 160) * 8)

// Hodinový rate
export const calcManHourRate = (monthlyIncome: number) =>
    to2Decimal(monthlyIncome / 160)

export const calcContractNetIncome = ({
    childrenAboveSix,
    childrenBelowSix,
    isSeverelyDisabled,
    monthlyIncome,
    monthsWorked,
    companionIncome,
}: {
    childrenAboveSix: number
    childrenBelowSix: number
    isSeverelyDisabled: boolean
    monthlyIncome: number
    monthsWorked: number
    companionIncome?: number
}) => {
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
