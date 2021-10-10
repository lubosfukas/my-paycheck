// Maximálny vymeriavací základ pre rok 2021
export const maxAssessmentBasis = 7644

// Percentá z hrubej mzdy na zdravotné poistenie
export const employeeHealthInsurancePercentage = 4
export const severelyDisabledEmployeeHealthInsuracePercentage = 2

// Percentá z hrubej mzdy na nemocenské poistenie
export const employeeMedicareInsurancePercentage = 1.4

// Percentá z hrubej mzdy na starobné poistenie
export const employeeRetirementInsurancePercentage = 4

// Percentá z hrubej mzdy na invalidné poistenie
export const employeeDisabilityInsurancePercentage = 3

// Percentá z hrubej mzdy na poistenie v nezamestnanosti
export const employeeUnemploymentInsurancePercentage = 1

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
