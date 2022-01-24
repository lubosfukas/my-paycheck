import { IncomeCard } from '../IncomeCard'
import { ContributionsTable } from '../ContributionsTable'
import { Contributions } from '../../types'

type Props = {
    averageNetIncome: number
    contributions: Contributions
    netIncome: number
    monthsWorked?: number
}

export const ContractCard = ({
    averageNetIncome,
    contributions,
    netIncome,
    monthsWorked = 10.5,
}: Props) => {
    const additional = [
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
    ]
    const content = [
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
    ]

    return (
        <IncomeCard
            additional={additional}
            content={content}
            title="Živnosť po prvom roku"
        />
    )
}
