import { livingWage } from '../../utils/constants'
import { to2Decimal } from '../../utils/helpers'

// 19,2-násobok sumy životného minima - 4124,74€
export const livingWage19p2Multiply = to2Decimal(19.2 * livingWage)

// 44,2-násobok sumy životného minima - 9495,486€
export const livingWage44p2Multiply = 44.2 * livingWage

// 92.8-násobok sumy životného minima - 19936,22€
export const livingWage92p8Multiply = to2Decimal(92.8 * livingWage)

// 176,8-násobok sumy životného minima - 37981,94€
export const livingWage176p8Multiply = to2Decimal(176.8 * livingWage)

// Nezdaniteľná časť základu dane na daňovníka za rok 2021 - 4511,43€
export const taxBaseNonTaxablePartPerTaxPayer = to2Decimal(21 * livingWage)
