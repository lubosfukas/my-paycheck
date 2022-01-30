export type Contributions = Array<{
    label: string
    monthlyContributions: number
    annualContributions: number
    percentage?: number
    isSum?: boolean
    hasTax?: boolean
}>

export type RefType = HTMLDivElement | undefined
