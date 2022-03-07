import {
    averageMonthlyWage,
    basicChildrenTaxBonus,
    livingWage,
} from '../../../utils/constants'
import { to2Decimal } from '../../../utils/helpers'

// Odpracované mesiace pre odvody
export const monthsWorkedForLevies = 12

// Minimálny mesačný vymeriavací základ pre platenie odvodov do Sociálnej a zdravotnej poisťovne v roku 2022 - 566.50€
export const minAssessmentBasisForLevies = to2Decimal(averageMonthlyWage / 2)

// Maximálny mesačný vymeriavací základ pre platenie odvodov do Sociálnej poisťovne (maximálny vymeriavací základ pre platenie odvodov do zdravotnej poisťovne bol od 1.1.2017 zrušený) - 7,931€
export const maxAssessmentBasis = averageMonthlyWage * 7

// 19,2-násobok sumy životného minima - 4124,74€
export const livingWage19p2Multiply = to2Decimal(livingWage * 19.2)

// 21-násobok sumy životného minima - 4511,43€
export const livingWage21Multiply = to2Decimal(livingWage * 21)

// 44,2-násobok sumy životného minima - 9495,486€
export const livingWage44p2Multiply = livingWage * 44.2

// 63,4-násobok sumy životného minima - 13620,22€
export const livingWage63p4Multiply = to2Decimal(livingWage * 63.4)

// 92.8-násobok sumy životného minima - 19936,22€
export const livingWage92p8Multiply = to2Decimal(livingWage * 92.8)

// 176,8-násobok sumy životného minima - 37981,94€
export const livingWage176p8Multiply = to2Decimal(livingWage * 176.8)

// Nezdaniteľná časť základu dane na daňovníka za rok 2021 - 4511,43€
export const taxBaseNonTaxablePartPerTaxPayer = to2Decimal(livingWage * 21)

// Výška daňového bonusu na dieťa nad 15 rokov veku v roku 2022
export const childrenAboveFifteenTaxBonus = basicChildrenTaxBonus

// Výška daňového bonusu na dieťa nad 6 rokov veku v roku 2022
export const childrenAboveSixTaxBonus = to2Decimal(basicChildrenTaxBonus * 1.85)

// Výška daňového bonusu na dieťa pod 6 rokov veku (vrátane) v roku 2022
export const childrenBelowSixTaxBonus = to2Decimal(basicChildrenTaxBonus * 2)
