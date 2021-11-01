import { livingWage } from '../../utils/constants'
import { to2Decimal } from '../../utils/helpers'

// Odpracované mesiace pre odvody
export const monthsWorkedForLevies = 12

// Minimálne zdravotné poistenie za mesiac
export const minMonthlyHealthInsurance = 76.44

// Minimálne sociálne poistenie za mesiac
export const minMonthlySocialInsurance = 180.99

// Minimálny vymeriavaci základ pre platenie odvodov za mesiac
export const minAssessmentBasisForLevies = 546

// Minimálny vymeriavací základ pre platenie poistenie za mesiac
export const minAssessmentBasisForInsurance = 477

// Vymeriavací základ - Čiastkový základ dane - Koeficient 1,486
export const assessmentBasisCoefficient = 1.486

// Paušálne výdavky
export const maxFlatRateExpenditure = 20000

// Paušálne výdavky v %
export const maxFlatRateExpenditurePercentage = 60

// 19,2-násobok sumy životného minima - 4124,74
export const livingWage19p2Multiply = to2Decimal(livingWage * 19.2)

// 21-násobok sumy životného minima - 4511,43€
export const livingWage21Multiply = to2Decimal(livingWage * 21)

// 44,2-násobok sumy životného minima - 9495,486€
export const livingWage44p2Multiply = livingWage * 44.2

// 63,4-násobok sumy životného minima - 13620,22€
export const livingWage63p4Multiply = to2Decimal(livingWage * 63.4)

// 92,8-násobok sumy životného minima - 19936,22€
export const livingWage92p8Multiply = to2Decimal(livingWage * 92.8)

// 176,8-násobok sumy životného minima - 37981,94€
export const livingWage176p8Multiply = to2Decimal(livingWage * 176.8)
