import {
    calculateEmployeeHealthInsurance,
    calculateEmployeeSocialInsurance,
    calculateIncomeTax,
    calculateTaxBase,
} from './utils'
import { taxBonus } from '../../utils/defaults'
import { to2Decimal } from '../../utils/helpers'

const useCalculateNetIncome = (
    monthlyGrossIncome: number,
    monthsWorked: number,
    isSeverelyDisabled: false
) => {
    if (monthlyGrossIncome < 700)
        return {
            annualNetIncome: 0,
            netMonthlyIncome: 0,
            healthInsurance: 0,
            socialInsurance: 0,
            medicareInsurance: 0,
            retirementInsurance: 0,
            disabilityInsurance: 0,
            unemploymentInsurance: 0,
            incomeTax: 0,
        }

    const healthInsurance = calculateEmployeeHealthInsurance(
        monthlyGrossIncome,
        isSeverelyDisabled
    )

    const socialInsurance = calculateEmployeeSocialInsurance(monthlyGrossIncome)
    const taxBase = calculateTaxBase(
        monthlyGrossIncome,
        healthInsurance,
        socialInsurance.sum
    )
    const incomeTax = calculateIncomeTax(taxBase, monthsWorked)

    const netMonthlyIncome =
        monthlyGrossIncome -
        healthInsurance -
        socialInsurance.sum -
        incomeTax -
        taxBonus

    return {
        netMonthlyIncome,
        healthInsurance,
        socialInsurance: socialInsurance.sum,
        incomeTax,
        medicareInsurance: socialInsurance.medicareInsurance,
        retirementInsurance: socialInsurance.retirementInsurance,
        disabilityInsurance: socialInsurance.disabilityInsurance,
        unemploymentInsurance: socialInsurance.unemploymentInsurance,
        annualNetIncome: to2Decimal(netMonthlyIncome * monthsWorked),
    }
}

export default useCalculateNetIncome
