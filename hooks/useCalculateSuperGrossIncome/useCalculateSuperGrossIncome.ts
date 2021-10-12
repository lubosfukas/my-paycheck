import { to2Decimal } from '../../utils/helpers'
import {
    calculateEmployerHealthInsurance,
    calculateEmployerSocialInsurance,
} from './utils'

const useCalculateSuperGrossIncome = (
    monthlyGrossIncome: number,
    isSeverelyDisabled: boolean
) => {
    if (monthlyGrossIncome < 700)
        return {
            monthlySuperGrossIncome: 0,
            annualSuperGrossIncome: 0,
            employerContributions: {
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

    const healthInsurance = calculateEmployerHealthInsurance(
        monthlyGrossIncome,
        isSeverelyDisabled
    )
    const socialInsurance = calculateEmployerSocialInsurance(monthlyGrossIncome)
    const monthlySuperGrossIncome = to2Decimal(
        monthlyGrossIncome + healthInsurance + socialInsurance.sum
    )

    return {
        monthlySuperGrossIncome,
        annualSuperGrossIncome: to2Decimal(monthlySuperGrossIncome * 12),
        employerContributions: {
            healthInsurance,
            socialInsurance: socialInsurance.sum,
            medicareInsurance: socialInsurance.medicareInsurance,
            retirementInsurance: socialInsurance.retirementInsurance,
            disabilityInsurance: socialInsurance.disabilityInsurance,
            unemploymentInsurance: socialInsurance.unemploymentInsurance,
            guaranteeFund: socialInsurance.guaranteeFund,
            reserveFund: socialInsurance.reserveFund,
            injuryInsurance: socialInsurance.injuryInsurance,
        },
    }
}

export default useCalculateSuperGrossIncome
