import { to2Decimal } from './helpers'

// Maximálny vymeriavací základ pre rok 2021 - 7644€
export const maxAssessmentBasis = 7644

// Suma životného minima pre rok 2021 - 214,83€
export const livingWage = 214.83

// Nezdaniteľná časť základu dane na daňovníka za rok 2021 - 4511,43€
export const taxBaseNonTaxablePartPerTaxPayer =
    Math.round(21 * livingWage * 100) / 100

// 19,2-násobok sumy životného minima - 4124,74€
export const livingWage19p2Multiply = to2Decimal(19.2 * livingWage)

// 44,2-násobok sumy životného minima - 9495,49€
export const livingWage44p2Multiply = to2Decimal(44.2 * livingWage)

// 92.8-násobok sumy životného minima - 19936,22€
export const livingWage92p8Multiply = to2Decimal(92.8 * livingWage)

// 176,8-násobok sumy životného minima - 37981,94€
export const livingWage176p8Multiply = to2Decimal(176.8 * livingWage)

// Daňový bonus na deti pod 6 rokov (vrátane) - 46,44€
export const childrenBelowSixTaxBonus = 46.44

// Daňový bonus na deti nad 6 rokov - 23,22€
export const childrenAboveSixTaxBonus = 23.22

// Percentá z hrubej mzdy na nemocenské poistenie
export const medicareInsurancePercentage = 1.4

// Percentá z hrubej mzdy na invalidné poistenie
export const disabilityInsurancePercentage = 3

// Percentá z hrubej mzdy na poistenie v nezamestnanosti
export const unemploymentInsurancePercentage = 1

// ZAMESTNANEC - Percentá z hrubej mzdy na zdravotné poistenie
export const employeeHealthInsurancePercentage = 4
export const employeeSeverelyDisabledHealthInsurancePercentage = 2

// ZAMESTNANEC - Percentá z hrubej mzdy na starobné poistenie
export const employeeRetirementInsurancePercentage = 4

// ZAMESTNÁVATEĽ - Percentá z hrubej mzdy na zdravotné poistenie
export const employerHealthInsurancePercentage = 10
export const employerSeverelyDisabledHealthInsurancePercentage = 5

// ZAMESTNÁVATEĽ - Percentá z hrubej mzdy na starobné poistenie
export const employerRetirementInsurancePercentage = 14

// ZAMESTNÁVATEĽ - Percentá z hrubej mzdy na garančný fond
export const employerGuaranteeFundPercentage = 0.25

// ZAMESTNÁVATEĽ - Percentá z hrubej mzdy na rezervný fond
export const employerReserveFundPercentage = 4.75

// ZAMESTNÁVATEĽ - Percentá z hrubej mzdy na úrazové poistenie
export const employerInjuryInsurancePercentage = 0.8
