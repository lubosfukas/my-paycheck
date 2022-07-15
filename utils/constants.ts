/* https://www.podnikajte.sk/dane/dolezite-cisla-v-podnikani-2022 */

// Suma životného minima platná od 1.7.2021 do 30.6.2022
export const LIVING_WAGE = Number(process.env.NEXT_PUBLIC_LIVING_WAGE)

// Priemerná mesačná mzda v hospodárstve Slovenskej republiky za rok 2020
export const AVERAGE_MONTHLY_WAGE = Number(
    process.env.NEXT_PUBLIC_AVERAGE_MONTLY_WAGE
)

// Maximálna suma uplatniteľných paušálnych výdavkov
export const MAX_FLAT_RATE_EXPENDITURE = 20000

// 60 % z úhrnu (súčtu) príjmov z podnikania, na ktoré je možné aplikovať paušálne výdavky
export const MAX_FLAT_RATE_EXPENDITURE_PERCENTAGE = 60

// Maximálna suma zdaniteľných príjmov, po prekročení ktorej sa zvyšuje sadzba dane z príjmov z 15% na 25%
export const FIFTEEN_PERCENT_TAX_MAX_INCOME = Number(
    process.env.NEXT_PUBLIC_FIFTEEN_PERCENT_TAX_MAX_INCOME
)

// Maximálny obrat za posledných najviac 12 po sebe idúcich kalendárnych mesiacov, pri ktorom vzniká povinnosť platiť DPH
export const EXPENDITURE_MAX_INCOME = FIFTEEN_PERCENT_TAX_MAX_INCOME

// Minimálne mesačné odvody živnostníkov do zdravotnej poisťovne v roku 2022
export const MIN_MONTHLY_HEALTH_INSURANCE = Number(
    process.env.NEXT_PUBLIC_MIN_MONTHLY_HEALTH_INSURANCE
)

// Minimálne mesačné odvody živnostníkov do Sociálnej poisťovne v roku 2022
export const MIN_MONTHLY_SOCIAL_INSURANCE = Number(
    process.env.NEXT_PUBLIC_MIN_MONTHLY_SOCIAL_INSURANCE
)

// Minimálna mesačná mzda pre rok 2022
export const MIN_MONTHLY_WAGE = Number(process.env.NEXT_PUBLIC_MIN_MONTHLY_WAGE)

// Základná suma daňového bonusu na dieťa pre rok 2022
export const BASIC_CHILDREN_TAX_BONUS = Number(
    process.env.NEXT_PUBLIC_BASIC_CHILDREN_TAX_BONUS
)

// Priemerný mesačný pracovný fond najbližších rokov, zaokrúhlený na jedno desatinné miesto
export const AVERAGE_DAYS_WORKED_PER_MONTH = 20.8

/* ZDRAVOTNÁ POISŤOVŇA */

// ZAMESTNANEC - Percentá z hrubej mzdy na zdravotné poistenie
export const EMPLOYEE_HEALTH_INSURANCE_PERCENTAGE = 4
export const EMPLOYEE_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE = 2

// ZAMESTNÁVATEĽ - Percentá zo superhrubej na zdravotné poistenie
export const EMPLOYER_HEALTH_INSURANCE_PERCENTAGE = 10
export const EMPLOYER_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE = 5

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na zdravotné poistenie
export const CONTRACTOR_HEALTH_INSURANCE_PERCENTAGE = 14
export const CONTRACTOR_SEVERELY_DISABLED_HEALTH_INSURANCE_PERCENTAGE = 7

/* SOCIÁLNA POISŤOVŇA */

// ZAMESTNANEC - Percentá z hrubej mzdy na nemocenské poistenie
export const EMPLOYEE_MEDICARE_INSURANCE_PERCENTAGE = 1.4

// ZAMESTNANEC - Percentá z hrubej mzdy na invalidné poistenie
export const EMPLOYEE_DISABILITY_INSURANCE_PERCENTAGE = 3

// ZAMESTNANEC - Percentá z hrubej mzdy na poistenie v nezamestnanosti
export const EMPLOYEE_UNEMPLOYMENT_INSURANCE_PERCENTAGE = 1

// ZAMESTNANEC - Percentá z hrubej mzdy na starobné poistenie
export const EMPLOYEE_RETIREMENT_INSURANCE_PERCENTAGE = 4

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na nemocenské poistenie
export const EMPLOYER_MEDICARE_INSURANCE_PERCENTAGE = 1.4

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na invalidné poistenie
export const EMPLOYER_DISABILITY_INSURANCE_PERCENTAGE = 3

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na poistenie v nezamestnanosti
export const EMPLOYER_UNEMPLOYMENT_INSURANCE_PERCENTAGE = 1

// ZAMESTNÁVATEĽ - Percentá zo superhrubej na starobné poistenie
export const EMPLOYER_RETIREMENT_INSURANCE_PERCENTAGE = 14

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na garančný fond
export const EMPLOYER_GUARANTEE_FUND_PERCENTAGE = 0.25

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na rezervný fond
export const EMPLOYER_RESERVE_FUND_PERCENTAGE = 4.75

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na úrazové poistenie
export const EMPLOYER_INJURY_INSURANCE_PERCENTAGE = 0.8

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na nemocenské poistenie
export const CONTRACTOR_MEDICARE_INSURANCE_PERCENTAGE = 4.4

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na starobné poistenie
export const CONTRACTOR_RETIREMENT_INSURANCE_PERCENTAGE = 18

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na invalidné poistenie
export const CONTRACTOR_DISABILITY_INSURANCE_PERCENTAGE = 6

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na rezerný fond solidarity
export const CONTRACTOR_RESERVE_FUND_PERCENTAGE = 4.75

// Vymeriavací základ - Čiastkový základ dane - Koeficient 1,486
export const ASSESSMENT_BASIS_COEFFICIENT = 1.486
