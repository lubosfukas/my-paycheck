export type Contributions = Array<{
    label: string
    monthlyContributions: number
    annualContributions: number
    percentage?: number
    isSum?: boolean
}>

export type EmployerContributions = {
    healthInsurance: number
    socialInsurance: number
    medicareInsurance: number
    retirementInsurance: number
    disabilityInsurance: number
    unemploymentInsurance: number
    guaranteeFund: number
    reserveFund: number
    injuryInsurance: number
}

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
