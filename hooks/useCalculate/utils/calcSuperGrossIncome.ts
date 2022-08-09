import { MAX_ASSESSMENT_BASIS } from './constants'
import {
    EMPLOYER_DISABILITY_INSURANCE_PERCENTAGE,
    EMPLOYER_GUARANTEE_FUND_PERCENTAGE,
    EMPLOYER_HEALTH_INSURANCE_PERCENTAGE,
    EMPLOYER_INJURY_INSURANCE_PERCENTAGE,
    EMPLOYER_RESERVE_FUND_PERCENTAGE,
    EMPLOYER_RETIREMENT_INSURANCE_PERCENTAGE,
    EMPLOYER_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE,
    EMPLOYER_MEDICARE_INSURANCE_PERCENTAGE,
    EMPLOYER_UNEMPLOYMENT_INSURANCE_PERCENTAGE,
} from '../../../utils/constants'
import { to2Decimal, toPercentage } from '../../../utils/helpers'
import { EmploymentIncome } from '../../../types'

// Zdravotné poistenie
export const calcHealthInsurance = (
    grossIncome: number,
    isSeverelyDisabled: boolean
) =>
    to2Decimal(
        isSeverelyDisabled
            ? toPercentage(
                  grossIncome,
                  EMPLOYER_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE
              )
            : toPercentage(grossIncome, EMPLOYER_HEALTH_INSURANCE_PERCENTAGE)
    )

// Nemocenské poistenie
export const calcMedicareInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYER_MEDICARE_INSURANCE_PERCENTAGE
              )
            : toPercentage(grossIncome, EMPLOYER_MEDICARE_INSURANCE_PERCENTAGE)
    )

// Invalidné poistenie
export const calcDisabilityInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYER_DISABILITY_INSURANCE_PERCENTAGE
              )
            : toPercentage(
                  grossIncome,
                  EMPLOYER_DISABILITY_INSURANCE_PERCENTAGE
              )
    )

// Poistenie v nezamestnanosti
export const calcUnemploymentInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYER_UNEMPLOYMENT_INSURANCE_PERCENTAGE
              )
            : toPercentage(
                  grossIncome,
                  EMPLOYER_UNEMPLOYMENT_INSURANCE_PERCENTAGE
              )
    )

// Starobné poistenie
export const calcRetirementInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYER_RETIREMENT_INSURANCE_PERCENTAGE
              )
            : toPercentage(
                  grossIncome,
                  EMPLOYER_RETIREMENT_INSURANCE_PERCENTAGE
              )
    )

// Garančný fond
export const calcGuaranteeFund = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYER_GUARANTEE_FUND_PERCENTAGE
              )
            : toPercentage(grossIncome, EMPLOYER_GUARANTEE_FUND_PERCENTAGE)
    )

// Rezervný fond
export const calcReserveFund = (grossIncome: number) =>
    to2Decimal(
        grossIncome > MAX_ASSESSMENT_BASIS
            ? toPercentage(
                  MAX_ASSESSMENT_BASIS,
                  EMPLOYER_RESERVE_FUND_PERCENTAGE
              )
            : toPercentage(grossIncome, EMPLOYER_RESERVE_FUND_PERCENTAGE)
    )

// Úrazové poistenie
export const calcInjuryInsurance = (grossIncome: number) =>
    to2Decimal(toPercentage(grossIncome, EMPLOYER_INJURY_INSURANCE_PERCENTAGE))

export const calcSuperGrossIncome = ({
    isSeverelyDisabled,
    monthlyGrossIncome,
    monthsWorked,
}: Pick<
    EmploymentIncome,
    'isSeverelyDisabled' | 'monthlyGrossIncome' | 'monthsWorked'
>) => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? EMPLOYER_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE
        : EMPLOYER_HEALTH_INSURANCE_PERCENTAGE

    const percentageSum = to2Decimal(
        healthInsurancePercentage +
            EMPLOYER_MEDICARE_INSURANCE_PERCENTAGE +
            EMPLOYER_RETIREMENT_INSURANCE_PERCENTAGE +
            EMPLOYER_DISABILITY_INSURANCE_PERCENTAGE +
            EMPLOYER_UNEMPLOYMENT_INSURANCE_PERCENTAGE
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
                    percentage: EMPLOYER_MEDICARE_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Starobné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: EMPLOYER_RETIREMENT_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Invalidné poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: EMPLOYER_DISABILITY_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Poistenie v nezamestnanosti',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: EMPLOYER_UNEMPLOYMENT_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Garančný fond',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: EMPLOYER_GUARANTEE_FUND_PERCENTAGE,
                },
                {
                    label: 'Rezervný fond',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: EMPLOYER_RESERVE_FUND_PERCENTAGE,
                },
                {
                    label: 'Úrazové poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: EMPLOYER_INJURY_INSURANCE_PERCENTAGE,
                },
                {
                    label: 'Spolu',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: percentageSum,
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
    const guaranteeFund = calcGuaranteeFund(monthlyGrossIncome)
    const reserveFund = calcReserveFund(monthlyGrossIncome)
    const injuryInsurance = calcInjuryInsurance(monthlyGrossIncome)
    const socialInsurance = to2Decimal(
        medicareInsurance +
            retirementInsurance +
            disabilityInsurance +
            unemploymentInsurance +
            guaranteeFund +
            reserveFund +
            injuryInsurance
    )

    const monthlySuperGrossIncome = to2Decimal(
        monthlyGrossIncome + healthInsurance + socialInsurance
    )
    const annualSuperGrossIncome = to2Decimal(
        monthlySuperGrossIncome * monthsWorked
    )

    const monthlyContributions = to2Decimal(healthInsurance + socialInsurance)

    return {
        monthlyIncome: monthlySuperGrossIncome,
        annualIncome: annualSuperGrossIncome,
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
                percentage: EMPLOYER_MEDICARE_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Starobné poistenie',
                monthlyContributions: retirementInsurance,
                annualContributions: to2Decimal(
                    retirementInsurance * monthsWorked
                ),
                percentage: EMPLOYER_RETIREMENT_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Invalidné poistenie',
                monthlyContributions: disabilityInsurance,
                annualContributions: to2Decimal(
                    disabilityInsurance * monthsWorked
                ),
                percentage: EMPLOYER_DISABILITY_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Poistenie v nezamestnanosti',
                monthlyContributions: unemploymentInsurance,
                annualContributions: to2Decimal(
                    unemploymentInsurance * monthsWorked
                ),
                percentage: EMPLOYER_UNEMPLOYMENT_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Garančný fond',
                monthlyContributions: guaranteeFund,
                annualContributions: to2Decimal(guaranteeFund * monthsWorked),
                percentage: EMPLOYER_GUARANTEE_FUND_PERCENTAGE,
            },
            {
                label: 'Rezervný fond',
                monthlyContributions: reserveFund,
                annualContributions: to2Decimal(reserveFund * monthsWorked),
                percentage: EMPLOYER_RESERVE_FUND_PERCENTAGE,
            },
            {
                label: 'Úrazové poistenie',
                monthlyContributions: injuryInsurance,
                annualContributions: to2Decimal(injuryInsurance * monthsWorked),
                percentage: EMPLOYER_UNEMPLOYMENT_INSURANCE_PERCENTAGE,
            },
            {
                label: 'Spolu',
                monthlyContributions: monthlyContributions,
                annualContributions: to2Decimal(
                    monthlyContributions * monthsWorked
                ),
                percentage: percentageSum,
                isSum: true,
            },
        ],
    }
}
