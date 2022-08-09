export type Contributions = Array<{
    label: string
    monthlyContributions: number
    annualContributions: number
    percentage?: number
    isSum?: boolean
    hasTax?: boolean
}>

export type OtherCriteria = {
    childrenAboveFifteen: number
    childrenAboveSix: number
    childrenBelowSix: number
    isSeverelyDisabled: boolean
    monthsWorked: number
    companionIncome?: number
}

export type EmploymentIncome = OtherCriteria & {
    monthlyGrossIncome: number
}

export type ContractIncome = OtherCriteria & {
    monthlyIncome: number
}

export type RefType = HTMLDivElement | undefined
