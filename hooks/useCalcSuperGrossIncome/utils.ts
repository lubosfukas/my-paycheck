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
} from '../../utils/constants'
import { to2Decimal, toPercentage } from '../../utils/helpers'

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
