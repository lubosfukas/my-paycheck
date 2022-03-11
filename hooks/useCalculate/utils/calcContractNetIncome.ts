import {
    childrenAboveSixTaxBonus,
    childrenBelowSixTaxBonus,
    livingWage176p8Multiply,
    livingWage19p2Multiply,
    livingWage21Multiply,
    livingWage44p2Multiply,
    livingWage63p4Multiply,
    livingWage92p8Multiply,
    minAssessmentBasisForLevies,
    monthsWorkedForLevies,
} from './constants'
import {
    assessmentBasisCoefficient,
    contractorDisabilityInsurancePercentage,
    contractorHealthInsurancePercentage,
    contractorMedicareInsurancePercentage,
    contractorReserveFundPercentage,
    contractorRetirementInsurancePercentage,
    contractorSeverelyDisabledHealthInsurancePercentage,
    maxFlatRateExpenditure,
    maxFlatRateExpenditurePercentage,
    minMonthlyHealthInsurance,
    fifteenPercentTaxMaxIncome,
    expenditureMaxIncome,
    averageDaysWorkedPerMonth,
} from '../../../utils/constants'
import { to2Decimal, toPercentage } from '../../../utils/helpers'

const toAnnual = (monthlySum: number) =>
    to2Decimal(monthlySum * monthsWorkedForLevies)

const toMonthly = (annualSum: number) =>
    to2Decimal(annualSum / monthsWorkedForLevies)

// Paušálne výdavky
const calcFlatRateExpenditure = (annualIncome: number) => {
    if (annualIncome > expenditureMaxIncome) return 0

    const calculatedExpenditure = to2Decimal(
        toPercentage(annualIncome, maxFlatRateExpenditurePercentage)
    )

    return calculatedExpenditure < maxFlatRateExpenditure
        ? calculatedExpenditure
        : maxFlatRateExpenditure
}

// Vymeriavací základ za mesiac
const calcAssessmentBasis = (grossTaxBase: number) => {
    const calculatedBasis = to2Decimal(
        grossTaxBase / monthsWorkedForLevies / assessmentBasisCoefficient
    )

    return calculatedBasis < minAssessmentBasisForLevies
        ? minAssessmentBasisForLevies
        : calculatedBasis
}

// Zdravotné poistenie za mesiac
const calcMonthlyHealthInsurance = (
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
const calcMonthlyMedicareInsurance = (assessmentBasis: number) => {
    const calculatedMedicareInsurance = to2Decimal(
        toPercentage(assessmentBasis, contractorMedicareInsurancePercentage)
    )
    const minMedicareInsurance = to2Decimal(
        toPercentage(
            minAssessmentBasisForLevies,
            contractorMedicareInsurancePercentage
        )
    )

    return calculatedMedicareInsurance < minMedicareInsurance
        ? minMedicareInsurance
        : calculatedMedicareInsurance
}

// Starobné poistenie za mesiac
const calcMonthlyRetirementInsurance = (assessmentBasis: number) => {
    const calculatedRetirementInsurance = to2Decimal(
        toPercentage(assessmentBasis, contractorRetirementInsurancePercentage)
    )
    const minRetirementInsurance = to2Decimal(
        toPercentage(
            minAssessmentBasisForLevies,
            contractorRetirementInsurancePercentage
        )
    )

    return calculatedRetirementInsurance < minRetirementInsurance
        ? minRetirementInsurance
        : calculatedRetirementInsurance
}

// Invalidné poistenie za mesiac
const calcMonthlyDisabilityInsurance = (assessmentBasis: number) => {
    const calculatedDisabilityInsurance = to2Decimal(
        toPercentage(assessmentBasis, contractorDisabilityInsurancePercentage)
    )
    const minDisabilityInsurance = to2Decimal(
        toPercentage(
            minAssessmentBasisForLevies,
            contractorDisabilityInsurancePercentage
        )
    )

    return calculatedDisabilityInsurance < minDisabilityInsurance
        ? minDisabilityInsurance
        : calculatedDisabilityInsurance
}

// Rezervný fond solidarity za mesiac
const calcMonthlyReserveFund = (assessmentBasis: number) => {
    const calculatedReserveFund = to2Decimal(
        toPercentage(assessmentBasis, contractorReserveFundPercentage)
    )
    const minReserveFund = to2Decimal(
        toPercentage(
            minAssessmentBasisForLevies,
            contractorReserveFundPercentage
        )
    )

    return calculatedReserveFund < minReserveFund
        ? minReserveFund
        : calculatedReserveFund
}

// Základ dane pred nezdaniteľnou časťou
const calcTaxBaseNonBeforeNonTaxablePart = ({
    grossTaxBase,
    healthInsurance,
    socialInsurance,
}: {
    grossTaxBase: number
    healthInsurance: number
    socialInsurance: number
}) => {
    const taxBase = to2Decimal(grossTaxBase - healthInsurance - socialInsurance)
    return taxBase < 0 ? 0 : taxBase
}

// Nezdaniteľná časť základu dane s príjmom manžela/manželky
const calcNonTaxablePartWithCompanionIncome = (
    taxBase: number,
    companionIncome: number
) => {
    if (taxBase <= livingWage176p8Multiply)
        return companionIncome === 0
            ? companionIncome < livingWage19p2Multiply
                ? to2Decimal(livingWage19p2Multiply - companionIncome)
                : 0
            : livingWage19p2Multiply
    else
        return companionIncome === 0
            ? to2Decimal(livingWage63p4Multiply - to2Decimal(taxBase / 4))
            : to2Decimal(
                  livingWage63p4Multiply -
                      to2Decimal(to2Decimal(taxBase / 4) - companionIncome)
              )
}

// Nezdaniteľná časť základu dane bez príjmu manžela/manželky
const calcNonTaxablePartWithoutCompanionIncome = (taxBase: number) =>
    taxBase <= livingWage92p8Multiply
        ? livingWage21Multiply
        : to2Decimal(livingWage44p2Multiply - to2Decimal(taxBase / 4))

// Nezdaniteľná časť základu dane
const calcNonTaxablePart = (taxBase: number, companionIncome?: number) => {
    if (companionIncome === undefined)
        return calcNonTaxablePartWithoutCompanionIncome(taxBase)
    else return calcNonTaxablePartWithCompanionIncome(taxBase, companionIncome)
}

// Daňový bonus
const calcTaxBonus = (childrenBelowSix: number, childrenAboveSix: number) => {
    const childrenBelowSixBonus = to2Decimal(
        childrenBelowSix * childrenBelowSixTaxBonus * monthsWorkedForLevies
    )
    const childrenAboveSixBonus = to2Decimal(
        childrenAboveSix * childrenAboveSixTaxBonus * monthsWorkedForLevies
    )

    return to2Decimal(childrenBelowSixBonus + childrenAboveSixBonus)
}

// Základ dane
const calcTaxBase = ({
    taxBase,
    nonTaxablePart,
    taxBonus,
}: {
    taxBase: number
    nonTaxablePart: number
    taxBonus: number
}) => {
    const calculatedTaxBase = to2Decimal(taxBase - nonTaxablePart - taxBonus)
    return calculatedTaxBase < 0 ? 0 : calculatedTaxBase
}

// Daň z príjmu
const calcTax = (annualIncome: number, taxBase: number) => {
    if (annualIncome < fifteenPercentTaxMaxIncome)
        return to2Decimal(toPercentage(taxBase, 15))
    else if (taxBase > livingWage176p8Multiply)
        return to2Decimal(
            to2Decimal(toPercentage(taxBase - livingWage176p8Multiply, 25)) +
                to2Decimal(toPercentage(livingWage176p8Multiply, 19))
        )
    else return to2Decimal(toPercentage(taxBase, 19))
}

// Dňový rate
const calcManDayRate = (laborCost: number) =>
    to2Decimal(laborCost / averageDaysWorkedPerMonth)

// Hodinový rate
const calcManHourRate = (manDayRate: number) => to2Decimal(manDayRate / 8)

export const calcContractNetIncome = ({
    annualIncome,
    childrenAboveSix,
    childrenBelowSix,
    isSeverelyDisabled,
    monthsWorked,
    companionIncome,
}: {
    annualIncome: number
    childrenAboveSix: number
    childrenBelowSix: number
    isSeverelyDisabled: boolean
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

    if (annualIncome === 0)
        return {
            averageIncome: 0,
            firstYearAverageIncome: 0,
            firstYearIncome: 0,
            income: 0,
            laborCost: 0,
            manDayRate: 0,
            manHourRate: 0,
            contributions: [
                {
                    label: 'Zdravotné poistenie',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: healthInsurancePercentage,
                },
                {
                    label: 'Nemocenské poistenie',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: contractorMedicareInsurancePercentage,
                },
                {
                    label: 'Starobné poistenie',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: contractorRetirementInsurancePercentage,
                },
                {
                    label: 'Invalidné poistenie',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: contractorDisabilityInsurancePercentage,
                },
                {
                    label: 'Rezervný fond',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: contractorReserveFundPercentage,
                },
                {
                    label: 'Daň z príjmu',
                    annualContributions: 0,
                    monthlyContributions: 0,
                },
                {
                    label: 'Spolu',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: insurancePercentageSum,
                    isSum: true,
                    hasTax: true,
                },
            ],
            firstYearContributions: [
                {
                    label: 'Zdravotné poistenie',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: healthInsurancePercentage,
                },
                {
                    label: 'Daň z príjmu',
                    annualContributions: 0,
                    monthlyContributions: 0,
                },
                {
                    label: 'Spolu',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: healthInsurancePercentage,
                    isSum: true,
                    hasTax: true,
                },
            ],
        }

    const monthlyIncome = to2Decimal(annualIncome / monthsWorkedForLevies)
    const flatRateExpenditure = calcFlatRateExpenditure(annualIncome)
    const grossTaxBase = to2Decimal(annualIncome - flatRateExpenditure)
    const assessmentBasis = calcAssessmentBasis(grossTaxBase)

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
        grossTaxBase,
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

    const laborCost = to2Decimal(annualIncome / monthsWorked)
    const manDayRate = calcManDayRate(laborCost)
    const manHourRate = calcManHourRate(manDayRate)

    const monthlyContributions = to2Decimal(
        monthlyHealthInsurance + monthlySocialInsurance + monthlyTax
    )
    const annualContributions = toAnnual(monthlyContributions)

    const firstYearMonthlyContributions = to2Decimal(
        monthlyHealthInsurance + monthlyTax
    )
    const firstYearAnnualContributions = toAnnual(firstYearMonthlyContributions)

    return {
        averageIncome: averageNetIncome,
        firstYearAverageIncome: firstYearAverageNetIncome,
        firstYearIncome: firstYearNetIncome,
        income: netIncome,
        laborCost,
        manDayRate,
        manHourRate,
        contributions: [
            {
                label: 'Zdravotné poistenie',
                annualContributions: annualHealthInsurance,
                monthlyContributions: monthlyHealthInsurance,
                percentage: healthInsurancePercentage,
            },
            {
                label: 'Nemocenské poistenie',
                annualContributions: annualMedicareInsurance,
                monthlyContributions: monthlyMedicareInsurance,
                percentage: contractorMedicareInsurancePercentage,
            },
            {
                label: 'Starobné poistenie',
                annualContributions: annualRetirementInsurance,
                monthlyContributions: monthlyRetirementInsurance,
                percentage: contractorRetirementInsurancePercentage,
            },
            {
                label: 'Invalidné poistenie',
                annualContributions: annualDisabilityInsurance,
                monthlyContributions: monthlyDisabilityInsurance,
                percentage: contractorDisabilityInsurancePercentage,
            },
            {
                label: 'Rezervný fond',
                annualContributions: annualReserveFund,
                monthlyContributions: monthlyReserveFund,
                percentage: contractorReserveFundPercentage,
            },
            {
                label: 'Daň z príjmu',
                annualContributions: tax,
                monthlyContributions: monthlyTax,
            },
            {
                label: 'Spolu',
                annualContributions,
                monthlyContributions,
                percentage: insurancePercentageSum,
                isSum: true,
                hasTax: true,
            },
        ],
        firstYearContributions: [
            {
                label: 'Zdravotné poistenie',
                annualContributions: annualHealthInsurance,
                monthlyContributions: monthlyHealthInsurance,
                percentage: healthInsurancePercentage,
            },
            {
                label: 'Daň z príjmu',
                annualContributions: tax,
                monthlyContributions: monthlyTax,
            },
            {
                label: 'Spolu',
                annualContributions: firstYearAnnualContributions,
                monthlyContributions: firstYearMonthlyContributions,
                percentage: healthInsurancePercentage,
                isSum: true,
                hasTax: true,
            },
        ],
    }
}
