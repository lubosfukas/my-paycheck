export type CalcResult = {
    monthlyIncome: number
    annualIncome: number
    contributions: Contributions
}

export type Contributions = Array<{
    label: string
    monthlyContributions: number
    annualContributions: number
    percentage?: number
    isSum?: boolean
    hasTax?: boolean
}>

export type ContractContributions = {
    healthInsurance: number
    socialInsurance: number
    medicareInsurance: number
    retirementInsurance: number
    disabilityInsurance: number
    reserveFund: number
    incomeTax: number
}

export type FirstYearContractContributions = {
    healthInsurance: number
    incomeTax: number
}

export type RefType = null | HTMLDivElement
