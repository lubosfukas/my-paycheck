export type Contributions = Array<{
    label: string
    monthlyContributions: number
    annualContributions: number
    percentage?: number
    isSum?: boolean
    hasTax?: boolean
}>

export type Income = {
    childrenAboveSix: number
    childrenBelowSix: number
    childrenAboveFifteen: number
    isSeverelyDisabled: boolean
    monthlyGrossIncome: number
    monthsWorked: number
    companionIncome?: number
}

export type RefType = HTMLDivElement | undefined
