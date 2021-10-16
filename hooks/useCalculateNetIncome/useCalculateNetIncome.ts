import {
    calculateEmployeeHealthInsurance,
    calculateEmployeeSocialInsurance,
    calculateIncomeTax,
    calculateTaxBase,
    calculateTaxBonus,
} from './utils'
import { to2Decimal } from '../../utils/helpers'

const useCalculateNetIncome = ({
    monthlyGrossIncome,
    monthsWorked = 12,
    isSeverelyDisabled = false,
    childrenBelowSix = 0,
    childrenAboveSix = 0,
}: {
    monthlyGrossIncome: number
    monthsWorked?: number
    isSeverelyDisabled?: boolean
    childrenBelowSix?: number
    childrenAboveSix?: number
}) => {
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
    const taxBonus = calculateTaxBonus(childrenBelowSix, childrenAboveSix)

    const monthlyNetIncome = to2Decimal(
        monthlyGrossIncome -
            healthInsurance -
            socialInsurance.sum -
            incomeTax +
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
