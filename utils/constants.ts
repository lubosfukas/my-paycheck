// Maximálny vymeriavací základ
export const maxAssessmentBasis = 7644

// Suma životného minima pre rok 2021
export const livingWage = 214.83

// Nezdaniteľná časť základu dane na daňovníka za rok 2021 - 4511,43
export const taxBaseNonTaxablePartPerTaxPayer =
    Math.round(21 * livingWage * 100) / 100

// 92.8-násobok sumy životného minima - 19 936,22
export const livingWage92p8Multiply = Math.round(92.8 * livingWage * 100) / 100

// 44,2-násobok sumy životného minima - 9 495,49
export const livingWage44p2Multiply = Math.round(44.2 * livingWage * 100) / 100

// 176,8-násobok sumy životného minima - 37 981,94
export const livingWage176p8Multiply =
    Math.round(176.8 * livingWage * 100) / 100
