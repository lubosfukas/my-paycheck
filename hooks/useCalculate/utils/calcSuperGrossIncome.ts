import {
    disabilityInsurancePercentage,
    employerGuaranteeFundPercentage,
    employerHealthInsurancePercentage,
    employerInjuryInsurancePercentage,
    employerReserveFundPercentage,
    employerRetirementInsurancePercentage,
    employerSeverelyDisabledHealthInsurancePercentage,
    maxAssessmentBasis,
    medicareInsurancePercentage,
    unemploymentInsurancePercentage,
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
                  employerSeverelyDisabledHealthInsurancePercentage
              )
            : toPercentage(grossIncome, employerHealthInsurancePercentage)
    )

// Nemocenské poistenie
export const calcMedicareInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(maxAssessmentBasis, medicareInsurancePercentage)
            : toPercentage(grossIncome, medicareInsurancePercentage)
    )

// Invalidné poistenie
export const calcDisabilityInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(maxAssessmentBasis, disabilityInsurancePercentage)
            : toPercentage(grossIncome, disabilityInsurancePercentage)
    )

// Poistenie v nezamestnanosti
export const calcUnemploymentInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(maxAssessmentBasis, unemploymentInsurancePercentage)
            : toPercentage(grossIncome, unemploymentInsurancePercentage)
    )

// Starobné poistenie
export const calcRetirementInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(
                  maxAssessmentBasis,
                  employerRetirementInsurancePercentage
              )
            : toPercentage(grossIncome, employerRetirementInsurancePercentage)
    )

// Garančný fond
export const calcGuaranteeFund = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(maxAssessmentBasis, employerGuaranteeFundPercentage)
            : toPercentage(grossIncome, employerGuaranteeFundPercentage)
    )

// Rezervný fond
export const calcReserveFund = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? toPercentage(maxAssessmentBasis, employerReserveFundPercentage)
            : toPercentage(grossIncome, employerReserveFundPercentage)
    )

// Úrazové poistenie
export const calcInjuryInsurance = (grossIncome: number) =>
    to2Decimal(toPercentage(grossIncome, employerInjuryInsurancePercentage))

export const calcSuperGrossIncome = ({
    isSeverelyDisabled,
    monthlyGrossIncome,
    monthsWorked,
}: {
    isSeverelyDisabled: boolean
    monthlyGrossIncome: number
    monthsWorked: number
}) => {
    const healthInsurancePercentage = isSeverelyDisabled
        ? employerSeverelyDisabledHealthInsurancePercentage
        : employerHealthInsurancePercentage

    const percentageSum = to2Decimal(
        healthInsurancePercentage +
            medicareInsurancePercentage +
            employerRetirementInsurancePercentage +
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
                    percentage: employerRetirementInsurancePercentage,
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
                    label: 'Garančný fond',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: employerGuaranteeFundPercentage,
                },
                {
                    label: 'Rezervný fond',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: employerReserveFundPercentage,
                },
                {
                    label: 'Úrazové poistenie',
                    monthlyContributions: 0,
                    annualContributions: 0,
                    percentage: employerInjuryInsurancePercentage,
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
                percentage: medicareInsurancePercentage,
            },
            {
                label: 'Starobné poistenie',
                monthlyContributions: retirementInsurance,
                annualContributions: to2Decimal(
                    retirementInsurance * monthsWorked
                ),
                percentage: employerRetirementInsurancePercentage,
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
                label: 'Garančný fond',
                monthlyContributions: guaranteeFund,
                annualContributions: to2Decimal(guaranteeFund * monthsWorked),
                percentage: employerGuaranteeFundPercentage,
            },
            {
                label: 'Rezervný fond',
                monthlyContributions: reserveFund,
                annualContributions: to2Decimal(reserveFund * monthsWorked),
                percentage: employerReserveFundPercentage,
            },
            {
                label: 'Úrazové poistenie',
                monthlyContributions: injuryInsurance,
                annualContributions: to2Decimal(injuryInsurance * monthsWorked),
                percentage: unemploymentInsurancePercentage,
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
