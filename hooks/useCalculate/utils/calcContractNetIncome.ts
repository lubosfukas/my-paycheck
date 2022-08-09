import {
    CHILDREN_ABOVE_FIFTEEN_TAX_BONUS,
    CHILDREN_ABOVE_SIX_TAX_BONUS,
    CHILDREN_BELOW_SIX_TAX_BONUS,
    LIVING_WAGE_176P8_MULTIPLY,
    LIVING_WAGE_19P2_MULTIPLY,
    LIVING_WAGE_21_MULTIPLY,
    LIVING_WAGE_44P2_MULTIPLY,
    LIVING_WAGE_64P4_MULTIPLY,
    LIVING_WAGE_92P8_MULTIPLY,
    MIN_ASSESSMENT_BASIS,
} from './constants'
import {
    ASSESSMENT_BASIS_COEFFICIENT,
    CONTRACTOR_DISABILITY_INSURANCE_PERCENTAGE,
    CONTRACTOR_HEALTH_INSURANCE_PERCENTAGE,
    CONTRACTOR_MEDICARE_INSURANCE_PERCENTAGE,
    CONTRACTOR_RESERVE_FUND_PERCENTAGE,
    CONTRACTOR_RETIREMENT_INSURANCE_PERCENTAGE,
    CONTRACTOR_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE,
    MAX_FLAT_RATE_EXPENDITURE,
    MAX_FLAT_RATE_EXPENDITURE_PERCENTAGE,
    MIN_MONTHLY_HEALTH_INSURANCE,
    FIFTEEN_PERCENT_TAX_MAX_INCOME,
    EXPENDITURE_MAX_INCOME,
    AVERAGE_DAYS_WORKED_PER_MONTH,
} from '../../../utils/constants'
import { to2Decimal, toPercentage } from '../../../utils/helpers'
import { OtherCriteria } from '../../../types'

const toAnnual = (monthlySum: number) => to2Decimal(monthlySum * 12)

const toMonthly = (annualSum: number) => to2Decimal(annualSum / 12)

// Paušálne výdavky
const calcFlatRateExpenditure = (annualIncome: number) => {
    if (annualIncome > EXPENDITURE_MAX_INCOME) return 0

    const calculatedExpenditure = to2Decimal(
        toPercentage(annualIncome, MAX_FLAT_RATE_EXPENDITURE_PERCENTAGE)
    )

    return calculatedExpenditure < MAX_FLAT_RATE_EXPENDITURE
        ? calculatedExpenditure
        : MAX_FLAT_RATE_EXPENDITURE
}

// Vymeriavací základ za mesiac
const calcAssessmentBasis = (grossTaxBase: number) => {
    const calculatedBasis = to2Decimal(
        grossTaxBase / 12 / ASSESSMENT_BASIS_COEFFICIENT
    )

    return calculatedBasis < MIN_ASSESSMENT_BASIS
        ? MIN_ASSESSMENT_BASIS
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
                  CONTRACTOR_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE
              )
          )
        : to2Decimal(
              toPercentage(
                  assessmentBasis,
                  CONTRACTOR_HEALTH_INSURANCE_PERCENTAGE
              )
          )

    return calculatedHealthInsurance < MIN_MONTHLY_HEALTH_INSURANCE
        ? MIN_MONTHLY_HEALTH_INSURANCE
        : calculatedHealthInsurance
}

// Nemocenské poistenie za mesiac
const calcMonthlyMedicareInsurance = (assessmentBasis: number) => {
    const calculatedMedicareInsurance = to2Decimal(
        toPercentage(assessmentBasis, CONTRACTOR_MEDICARE_INSURANCE_PERCENTAGE)
    )
    const minMedicareInsurance = to2Decimal(
        toPercentage(
            MIN_ASSESSMENT_BASIS,
            CONTRACTOR_MEDICARE_INSURANCE_PERCENTAGE
        )
    )

    return calculatedMedicareInsurance < minMedicareInsurance
        ? minMedicareInsurance
        : calculatedMedicareInsurance
}

// Starobné poistenie za mesiac
const calcMonthlyRetirementInsurance = (assessmentBasis: number) => {
    const calculatedRetirementInsurance = to2Decimal(
        toPercentage(
            assessmentBasis,
            CONTRACTOR_RETIREMENT_INSURANCE_PERCENTAGE
        )
    )
    const minRetirementInsurance = to2Decimal(
        toPercentage(
            MIN_ASSESSMENT_BASIS,
            CONTRACTOR_RETIREMENT_INSURANCE_PERCENTAGE
        )
    )

    return calculatedRetirementInsurance < minRetirementInsurance
        ? minRetirementInsurance
        : calculatedRetirementInsurance
}

// Invalidné poistenie za mesiac
const calcMonthlyDisabilityInsurance = (assessmentBasis: number) => {
    const calculatedDisabilityInsurance = to2Decimal(
        toPercentage(
            assessmentBasis,
            CONTRACTOR_DISABILITY_INSURANCE_PERCENTAGE
        )
    )
    const minDisabilityInsurance = to2Decimal(
        toPercentage(
            MIN_ASSESSMENT_BASIS,
            CONTRACTOR_DISABILITY_INSURANCE_PERCENTAGE
        )
    )

    return calculatedDisabilityInsurance < minDisabilityInsurance
        ? minDisabilityInsurance
        : calculatedDisabilityInsurance
}

// Rezervný fond solidarity za mesiac
const calcMonthlyReserveFund = (assessmentBasis: number) => {
    const calculatedReserveFund = to2Decimal(
        toPercentage(assessmentBasis, CONTRACTOR_RESERVE_FUND_PERCENTAGE)
    )
    const minReserveFund = to2Decimal(
        toPercentage(MIN_ASSESSMENT_BASIS, CONTRACTOR_RESERVE_FUND_PERCENTAGE)
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
    if (taxBase <= LIVING_WAGE_176P8_MULTIPLY)
        return companionIncome === 0
            ? companionIncome < LIVING_WAGE_19P2_MULTIPLY
                ? to2Decimal(LIVING_WAGE_19P2_MULTIPLY - companionIncome)
                : 0
            : LIVING_WAGE_19P2_MULTIPLY
    else
        return companionIncome === 0
            ? to2Decimal(LIVING_WAGE_64P4_MULTIPLY - to2Decimal(taxBase / 4))
            : to2Decimal(
                  LIVING_WAGE_64P4_MULTIPLY -
                      to2Decimal(to2Decimal(taxBase / 4) - companionIncome)
              )
}

// Nezdaniteľná časť základu dane bez príjmu manžela/manželky
const calcNonTaxablePartWithoutCompanionIncome = (taxBase: number) =>
    taxBase <= LIVING_WAGE_92P8_MULTIPLY
        ? LIVING_WAGE_21_MULTIPLY
        : to2Decimal(LIVING_WAGE_44P2_MULTIPLY - to2Decimal(taxBase / 4))

// Nezdaniteľná časť základu dane
const calcNonTaxablePart = (taxBase: number, companionIncome?: number) => {
    if (companionIncome === undefined)
        return calcNonTaxablePartWithoutCompanionIncome(taxBase)
    else return calcNonTaxablePartWithCompanionIncome(taxBase, companionIncome)
}

// Daňový bonus
const calcTaxBonus = ({
    childrenAboveSix,
    childrenBelowSix,
    childrenAboveFifteen,
}: {
    childrenAboveSix: number
    childrenBelowSix: number
    childrenAboveFifteen: number
}) => {
    const childrenBelowSixBonus = to2Decimal(
        childrenBelowSix * CHILDREN_BELOW_SIX_TAX_BONUS * 12
    )
    const childrenAboveSixBonus = to2Decimal(
        childrenAboveSix * CHILDREN_ABOVE_SIX_TAX_BONUS * 12
    )
    const childrenAboveFifteenBonus = to2Decimal(
        childrenAboveFifteen * CHILDREN_ABOVE_FIFTEEN_TAX_BONUS * 12
    )

    return to2Decimal(
        childrenBelowSixBonus +
            childrenAboveSixBonus +
            childrenAboveFifteenBonus
    )
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
    if (annualIncome < FIFTEEN_PERCENT_TAX_MAX_INCOME)
        return to2Decimal(toPercentage(taxBase, 15))
    else if (taxBase > LIVING_WAGE_176P8_MULTIPLY)
        return to2Decimal(
            to2Decimal(toPercentage(taxBase - LIVING_WAGE_176P8_MULTIPLY, 25)) +
                to2Decimal(toPercentage(LIVING_WAGE_176P8_MULTIPLY, 19))
        )
    else return to2Decimal(toPercentage(taxBase, 19))
}

// Dňový rate
const calcManDayRate = (laborCost: number) =>
    to2Decimal(laborCost / AVERAGE_DAYS_WORKED_PER_MONTH)

// Hodinový rate
const calcManHourRate = (manDayRate: number) => to2Decimal(manDayRate / 8)

export const calcContractNetIncome = ({
    annualIncome,
    childrenAboveSix,
    childrenBelowSix,
    childrenAboveFifteen,
    isSeverelyDisabled,
    monthsWorked,
    companionIncome,
}: OtherCriteria & { annualIncome: number }) => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? CONTRACTOR_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE
        : CONTRACTOR_HEALTH_INSURANCE_PERCENTAGE

    const insurancePercentageSum = to2Decimal(
        healthInsurancePercentage +
            CONTRACTOR_MEDICARE_INSURANCE_PERCENTAGE +
            CONTRACTOR_RETIREMENT_INSURANCE_PERCENTAGE +
            CONTRACTOR_DISABILITY_INSURANCE_PERCENTAGE +
            CONTRACTOR_RESERVE_FUND_PERCENTAGE
    )

    if (annualIncome === 0)
        return {
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
                    percentage: CONTRACTOR_MEDICARE_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Starobné poistenie',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: CONTRACTOR_RETIREMENT_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Invalidné poistenie',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: CONTRACTOR_DISABILITY_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Rezervný fond',
                    annualContributions: 0,
                    monthlyContributions: 0,
                    percentage: CONTRACTOR_RESERVE_FUND_PERCENTAGE,
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

    const monthlyIncome = to2Decimal(annualIncome / 12)
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

    const taxBonus = calcTaxBonus({
        childrenAboveSix,
        childrenBelowSix,
        childrenAboveFifteen,
    })
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
    const firstYearNetIncome = to2Decimal(
        monthlyIncome - monthlyHealthInsurance - monthlyTax
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
        laborCost,
        manDayRate,
        manHourRate,
        firstYearIncome: firstYearNetIncome,
        income: netIncome,
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
                percentage: CONTRACTOR_MEDICARE_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Starobné poistenie',
                annualContributions: annualRetirementInsurance,
                monthlyContributions: monthlyRetirementInsurance,
                percentage: CONTRACTOR_RETIREMENT_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Invalidné poistenie',
                annualContributions: annualDisabilityInsurance,
                monthlyContributions: monthlyDisabilityInsurance,
                percentage: CONTRACTOR_DISABILITY_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Rezervný fond',
                annualContributions: annualReserveFund,
                monthlyContributions: monthlyReserveFund,
                percentage: CONTRACTOR_RESERVE_FUND_PERCENTAGE,
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
