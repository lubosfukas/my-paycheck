import {
    employerGuaranteeFundPercentage,
    employerHealthInsurancePercentage,
    employerInjuryInsurancePercentage,
    employerReserveFundPercentage,
    employerRetirementInsurancePercentage,
    employerSeverelyDisabledHealthInsurancePercentage,
    maxAssessmentBasis,
} from '../../utils/constants'
import {
    calculateDisabilityInsurance,
    calculateMedicareInsurance,
    calculateUnemploymentInsurance,
    to2Decimal,
} from '../../utils/helpers'

// Zdravotné poistenie
export const calculateEmployerHealthInsurance = (
    grossIncome: number,
    isSeverelyDisabled: boolean
) =>
    to2Decimal(
        isSeverelyDisabled
            ? (grossIncome / 100) *
                  employerSeverelyDisabledHealthInsurancePercentage
            : (grossIncome / 100) * employerHealthInsurancePercentage
    )

// Starobné poistenie
export const calculateEmployerRetirementInsurance = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? (maxAssessmentBasis / 100) * employerRetirementInsurancePercentage
            : (grossIncome / 100) * employerRetirementInsurancePercentage
    )

// Garančný fond
export const calculateEmployerGuaranteeFund = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? (maxAssessmentBasis / 100) * employerGuaranteeFundPercentage
            : (grossIncome / 100) * employerGuaranteeFundPercentage
    )

// Rezervný fond
export const calculateEmployerReserveFund = (grossIncome: number) =>
    to2Decimal(
        grossIncome > maxAssessmentBasis
            ? (maxAssessmentBasis / 100) * employerReserveFundPercentage
            : (grossIncome / 100) * employerReserveFundPercentage
    )

// Úrazové poistenie
export const calculateEmployerInjuryInsurance = (grossIncome: number) =>
    to2Decimal((grossIncome / 100) * employerInjuryInsurancePercentage)

// Sociálne poistenie
export const calculateEmployerSocialInsurance = (grossIncome: number) => {
    const medicareInsurance = calculateMedicareInsurance(grossIncome)
    const retirementInsurance =
        calculateEmployerRetirementInsurance(grossIncome)
    const disabilityInsurance = calculateDisabilityInsurance(grossIncome)
    const unemploymentInsurance = calculateUnemploymentInsurance(grossIncome)
    const guaranteeFund = calculateEmployerGuaranteeFund(grossIncome)
    const reserveFund = calculateEmployerReserveFund(grossIncome)
    const injuryInsurance = calculateEmployerInjuryInsurance(grossIncome)

    return {
        medicareInsurance,
        retirementInsurance,
        disabilityInsurance,
        unemploymentInsurance,
        guaranteeFund,
        reserveFund,
        injuryInsurance,
        sum: to2Decimal(
            medicareInsurance +
                retirementInsurance +
                disabilityInsurance +
                unemploymentInsurance +
                guaranteeFund +
                reserveFund +
                injuryInsurance
        ),
    }
}
