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
} from '../../utils/constants'
import { to2Decimal, toPercentage } from '../../utils/helpers'

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
