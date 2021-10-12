import {
    disabilityInsurancePercentage,
    medicareInsurancePercentage,
    unemploymentInsurancePercentage,
    maxAssessmentBasis,
} from '../constants'

export const to2Decimal = (num: number) => Math.round(num * 100) / 100

export const toString2Decimal = (num: number) =>
    (Math.round(num * 100) / 100).toFixed(2)

// Nemocenské poistenie
export const calculateMedicareInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? (maxAssessmentBasis / 100) * medicareInsurancePercentage
            : (grossIncome / 100) * medicareInsurancePercentage
    )

// Invalidné poistenie
export const calculateDisabilityInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? (maxAssessmentBasis / 100) * disabilityInsurancePercentage
            : (grossIncome / 100) * disabilityInsurancePercentage
    )

// Poistenie v nezamestnanosti
export const calculateUnemploymentInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? (maxAssessmentBasis / 100) * unemploymentInsurancePercentage
            : (grossIncome / 100) * unemploymentInsurancePercentage
    )
