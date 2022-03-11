import { IncomeCard } from '../IncomeCard'
import { ContributionsTable } from '../ContributionsTable'
import { Contributions } from '../../types'

type Props = {
    averageNetIncome: number
    contributions: Contributions
    netIncome: number
    monthsWorked?: number
}

export const FirstYearContractCard = ({
    averageNetIncome,
    contributions,
    netIncome,
    monthsWorked = 10.5,
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
                label: 'Čistý mesačný príjem',
                value: netIncome,
                colored: true,
            },
            {
                label: 'Odpracované mesiace',
                value: monthsWorked,
                cash: false,
            },
            {
                label: 'Priemerný čistý mesačný príjem',
                value: averageNetIncome,
            },
        ]}
        title="Živnosť v prvom roku"
    />
)
