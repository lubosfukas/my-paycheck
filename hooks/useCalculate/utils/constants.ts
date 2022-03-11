import {
    averageMonthlyWage,
    basicChildrenTaxBonus,
    livingWage,
} from '../../../utils/constants'
import { to2Decimal } from '../../../utils/helpers'

// Minimálny mesačný vymeriavací základ pre platenie odvodov do Sociálnej a zdravotnej poisťovne v roku 2022 - 566.50€
export const minAssessmentBasis = to2Decimal(averageMonthlyWage / 2)

// Maximálny mesačný vymeriavací základ pre platenie odvodov do Sociálnej poisťovne (maximálny vymeriavací základ pre platenie odvodov do zdravotnej poisťovne bol od 1.1.2017 zrušený) - 7,931€
export const maxAssessmentBasis = to2Decimal(averageMonthlyWage * 7)

// 19,2-násobok sumy životného minima
export const livingWage19p2Multiply = to2Decimal(livingWage * 19.2)

// 21-násobok sumy životného minima
export const livingWage21Multiply = to2Decimal(livingWage * 21)

// 44,2-násobok sumy životného minima
export const livingWage44p2Multiply = to2Decimal(livingWage * 44.2)

// 63,4-násobok sumy životného minima
export const livingWage63p4Multiply = to2Decimal(livingWage * 63.4)

// 92.8-násobok sumy životného minima
export const livingWage92p8Multiply = to2Decimal(livingWage * 92.8)

// 176,8-násobok sumy životného minima
export const livingWage176p8Multiply = to2Decimal(livingWage * 176.8)

// Nezdaniteľná časť základu dane na daňovníka
export const nonTaxablePartPerTaxPayer = livingWage21Multiply

// Výška daňového bonusu na dieťa nad 15 rokov veku
export const childrenAboveFifteenTaxBonus = basicChildrenTaxBonus

// Výška daňového bonusu na dieťa nad 6 rokov veku
export const childrenAboveSixTaxBonus = to2Decimal(basicChildrenTaxBonus * 1.85)

// Výška daňového bonusu na dieťa pod 6 rokov veku (vrátane)
export const childrenBelowSixTaxBonus = to2Decimal(basicChildrenTaxBonus * 2)
