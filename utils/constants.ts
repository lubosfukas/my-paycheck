/* https://www.podnikajte.sk/dane/dolezite-cisla-v-podnikani-2022 */

// Suma životného minima platná od 1.7.2021 do 30.6.2022
export const livingWage = 218.06

// Priemerná mesačná mzda v hospodárstve Slovenskej republiky za rok 2020
export const averageMonthlyWage = 1133

// Maximálna suma uplatniteľných paušálnych výdavkov
export const maxFlatRateExpenditure = 20000

// 60 % z úhrnu (súčtu) príjmov z podnikania, na ktoré je možné aplikovať paušálne výdavky
export const maxFlatRateExpenditurePercentage = 60

// Maximálna suma zdaniteľných príjmov, po prekročení ktorej sa zvyšuje sadzba dane z príjmov z 15% na 25%
export const fifteenPercentTaxMaxIncome = 49790

// Maximálny obrat za posledných najviac 12 po sebe idúcich kalendárnych mesiacov, pri ktorom vzniká povinnosť platiť DPH
export const expenditureMaxIncome = fifteenPercentTaxMaxIncome

// Minimálne mesačné odvody živnostníkov do zdravotnej poisťovne v roku 2022
export const minMonthlyHealthInsurance = 79.31

// Minimálne mesačné odvody živnostníkov do Sociálnej poisťovne v roku 2022
export const minMonthlySocialInsurance = 187.78

// Minimálna mesačná mzda pre rok 2022
export const minMonthlyWage = 646

// Základná suma daňového bonusu na dieťa pre rok 2022
export const basicChildrenTaxBonus = 23.57

/* ZDRAVOTNÁ POISŤOVŇA */

// ZAMESTNANEC - Percentá z hrubej mzdy na zdravotné poistenie
export const employeeHealthInsurancePercentage = 4
export const employeeSeverelyDisabledHealthInsurancePercentage = 2

// ZAMESTNÁVATEĽ - Percentá zo superhrubej na zdravotné poistenie
export const employerHealthInsurancePercentage = 10
export const employerSeverelyDisabledHealthInsurancePercentage = 5

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na zdravotné poistenie
export const contractorHealthInsurancePercentage = 14
export const contractorSeverelyDisabledHealthInsurancePercentage = 7

/* SOCIÁLNA POISŤOVŇA */

// ZAMESTNANEC - Percentá z hrubej mzdy na nemocenské poistenie
export const employeeMedicareInsurancePercentage = 1.4

// ZAMESTNANEC - Percentá z hrubej mzdy na invalidné poistenie
export const employeeDisabilityInsurancePercentage = 3

// ZAMESTNANEC - Percentá z hrubej mzdy na poistenie v nezamestnanosti
export const employeeUnemploymentInsurancePercentage = 1

// ZAMESTNANEC - Percentá z hrubej mzdy na starobné poistenie
export const employeeRetirementInsurancePercentage = 4

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na nemocenské poistenie
export const employerMedicareInsurancePercentage = 1.4

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na invalidné poistenie
export const employerDisabilityInsurancePercentage = 3

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na poistenie v nezamestnanosti
export const employerUnemploymentInsurancePercentage = 1

// ZAMESTNÁVATEĽ - Percentá zo superhrubej na starobné poistenie
export const employerRetirementInsurancePercentage = 14

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na garančný fond
export const employerGuaranteeFundPercentage = 0.25

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na rezervný fond
export const employerReserveFundPercentage = 4.75

// ZAMESTNÁVATEĽ - Percentá zo superhrubej mzdy na úrazové poistenie
export const employerInjuryInsurancePercentage = 0.8

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na nemocenské poistenie
export const contractorMedicareInsurancePercentage = 4.4

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na starobné poistenie
export const contractorRetirementInsurancePercentage = 18

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na invalidné poistenie
export const contractorDisabilityInsurancePercentage = 6

// ŽIVNOSTNÍK/s.r.o. - Percentá z príjmu na rezerný fond solidarity
export const contractorReserveFundPercentage = 4.75

// Vymeriavací základ - Čiastkový základ dane - Koeficient 1,486
export const assessmentBasisCoefficient = 1.486
