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
    isSeverelyDisabled: boolean
) => {
    if (monthlyGrossIncome < 700)
        return {
            monthlyNetIncome: 0,
            annualNetIncome: 0,
            employeeContributions: {
                healthInsurance: 0,
                socialInsurance: 0,
                medicareInsurance: 0,
                retirementInsurance: 0,
                disabilityInsurance: 0,
                unemploymentInsurance: 0,
                incomeTax: 0,
            },
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

    const monthlyNetIncome = to2Decimal(
        monthlyGrossIncome -
            healthInsurance -
            socialInsurance.sum -
            incomeTax -
            taxBonus
    )

    return {
        monthlyNetIncome,
        annualNetIncome: to2Decimal(monthlyNetIncome * monthsWorked),
        employeeContributions: {
            healthInsurance,
            socialInsurance: socialInsurance.sum,
            medicareInsurance: socialInsurance.medicareInsurance,
            retirementInsurance: socialInsurance.retirementInsurance,
            disabilityInsurance: socialInsurance.disabilityInsurance,
            unemploymentInsurance: socialInsurance.unemploymentInsurance,
            incomeTax,
        },
    }
}

export default useCalculateNetIncome
