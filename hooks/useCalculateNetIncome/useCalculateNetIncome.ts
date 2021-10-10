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
        return { annualNetIncome: 0, netMonthlyIncome: 0 }

    const healthInsurance = calculateEmployeeHealthInsurance(
        monthlyGrossIncome,
        isSeverelyDisabled
    )
    const socialInsurance = calculateEmployeeSocialInsurance(monthlyGrossIncome)
    const taxBase = calculateTaxBase(
        monthlyGrossIncome,
        healthInsurance,
        socialInsurance
    )
    const incomeTax = calculateIncomeTax(taxBase, monthsWorked)

    const netMonthlyIncome =
        monthlyGrossIncome -
        healthInsurance -
        socialInsurance -
        incomeTax -
        taxBonus

    return {
        netMonthlyIncome,
        annualNetIncome: to2Decimal(netMonthlyIncome * monthsWorked),
    }
}

export default useCalculateNetIncome
