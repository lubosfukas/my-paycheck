import {
    AVERAGE_MONTHLY_WAGE,
    BASIC_CHILDREN_TAX_BONUS,
    LIVING_WAGE,
} from '../../../utils/constants'
import { to2Decimal } from '../../../utils/helpers'

// Minimálny mesačný vymeriavací základ pre platenie odvodov do Sociálnej a zdravotnej poisťovne v roku 2022 - 566.50€
export const MIN_ASSESSMENT_BASIS = to2Decimal(AVERAGE_MONTHLY_WAGE / 2)

// Maximálny mesačný vymeriavací základ pre platenie odvodov do Sociálnej poisťovne (maximálny vymeriavací základ pre platenie odvodov do zdravotnej poisťovne bol od 1.1.2017 zrušený) - 7,931€
export const MAX_ASSESSMENT_BASIS = to2Decimal(AVERAGE_MONTHLY_WAGE * 7)

// 19,2-násobok sumy životného minima
export const LIVING_WAGE_19P2_MULTIPLY = to2Decimal(LIVING_WAGE * 19.2)

// 21-násobok sumy životného minima
export const LIVING_WAGE_21_MULTIPLY = to2Decimal(LIVING_WAGE * 21)

// 44,2-násobok sumy životného minima
export const LIVING_WAGE_44P2_MULTIPLY = to2Decimal(LIVING_WAGE * 44.2)

// 63,4-násobok sumy životného minima
export const LIVING_WAGE_64P4_MULTIPLY = to2Decimal(LIVING_WAGE * 63.4)

// 92.8-násobok sumy životného minima
export const LIVING_WAGE_92P8_MULTIPLY = to2Decimal(LIVING_WAGE * 92.8)

// 176,8-násobok sumy životného minima
export const LIVING_WAGE_176P8_MULTIPLY = to2Decimal(LIVING_WAGE * 176.8)

// Nezdaniteľná časť základu dane na daňovníka
export const NON_TAXABLE_PART_PER_TAX_PAYER = LIVING_WAGE_21_MULTIPLY

// Výška daňového bonusu na dieťa nad 15 rokov veku
export const CHILDREN_ABOVE_FIFTEEN_TAX_BONUS = BASIC_CHILDREN_TAX_BONUS

// Výška daňového bonusu na dieťa nad 6 rokov veku
export const CHILDREN_ABOVE_SIX_TAX_BONUS = to2Decimal(
    BASIC_CHILDREN_TAX_BONUS * 1.85
)

// Výška daňového bonusu na dieťa pod 6 rokov veku (vrátane)
export const CHILDREN_BELOW_SIX_TAX_BONUS = to2Decimal(
    BASIC_CHILDREN_TAX_BONUS * 2
)
