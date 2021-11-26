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

export type RefType = HTMLDivElement | undefined

export type CompanionIncome = { applied: boolean; income: number | undefined }
