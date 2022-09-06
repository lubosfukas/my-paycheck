import { ContributionsTable, IncomeCard } from '.'
import { Contributions } from '../../types'

type Props = {
    annualNetIncome: number
    contributions: Contributions
    monthlyNetIncome: number
    monthsWorked: number
}

export const FirstYearCard = ({
    annualNetIncome,
    contributions,
    monthlyNetIncome,
    monthsWorked,
}: Props) => (
    <IncomeCard
        additional={[
            {
                id: 'first-year-contract-contributions',
                label: 'Odvody a daň',
                content: (
                    <ContributionsTable
                        id="first-year-contract-contributions"
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
        title="Živnosť v prvom roku"
    />
)
