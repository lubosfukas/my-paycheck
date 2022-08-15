import { ContributionsTable, IncomeCard } from '../common'
import { Contributions } from '../../types'

type Props = {
    annualNetIncome: number
    contributions: Contributions
    monthlyNetIncome: number
    monthsWorked: number
}

export const NextYearCard = ({
    annualNetIncome,
    contributions,
    monthlyNetIncome,
    monthsWorked,
}: Props) => (
    <IncomeCard
        additional={[
            {
                id: 'contract-contributions',
                label: 'Odvody a daň',
                content: (
                    <ContributionsTable
                        id="contract-contributions"
                        contributions={contributions}
                    />
                ),
            },
        ]}
        content={[
            {
                label: 'Priemerný čistý mesačný príjem',
                value: monthlyNetIncome,
                colored: true,
            },
            {
                label: 'Odpracované mesiace',
                value: monthsWorked,
                cash: false,
            },
            {
                label: 'Priemerný čistý ročný príjem',
                value: annualNetIncome,
            },
        ]}
        title="Živnosť po prvom roku"
    />
)
