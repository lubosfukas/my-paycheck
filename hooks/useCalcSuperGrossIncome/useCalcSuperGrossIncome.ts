import {
    calcDisabilityInsurance,
    calcGuaranteeFund,
    calcHealthInsurance,
    calcInjuryInsurance,
    calcMedicareInsurance,
    calcReserveFund,
    calcRetirementInsurance,
    calcUnemploymentInsurance,
} from './utils'
import { to2Decimal } from '../../utils/helpers'

export const useCalcSuperGrossIncome = ({
    monthlyGrossIncome,
    isSeverelyDisabled = false,
    monthsWorked = 12,
}: {
    monthlyGrossIncome: number
    isSeverelyDisabled?: boolean
    monthsWorked?: number
}) => {
    if (monthlyGrossIncome < 700)
        return {
            monthlyIncome: 0,
            annualIncome: 0,
            contributions: {
                healthInsurance: 0,
                socialInsurance: 0,
                medicareInsurance: 0,
                retirementInsurance: 0,
                disabilityInsurance: 0,
                unemploymentInsurance: 0,
                guaranteeFund: 0,
                reserveFund: 0,
                injuryInsurance: 0,
            },
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

    return {
        monthlyIncome: monthlySuperGrossIncome,
        annualIncome: annualSuperGrossIncome,
        contributions: {
            healthInsurance,
            socialInsurance,
            medicareInsurance,
            retirementInsurance,
            disabilityInsurance,
            unemploymentInsurance,
            guaranteeFund,
            reserveFund,
            injuryInsurance,
        },
    }
}
