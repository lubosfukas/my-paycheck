import { IncomeCard } from '../IncomeCard'
import { ContributionsTable } from '../ContributionsTable'
import { Contributions } from '../../types'

type Props = {
    annualLaborCost: number
    averageNetIncome: number
    contributions: Contributions
    monthsWorked?: number
}

export const ContractCard = ({
    annualLaborCost,
    averageNetIncome,
    contributions,
    monthsWorked = 10.5,
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
                value: averageNetIncome,
                colored: true,
            },
            {
                label: 'Odpracované mesiace',
                value: monthsWorked,
                cash: false,
            },
            {
                label: 'Suma fakturovaná za rok',
                value: annualLaborCost,
            },
        ]}
        title="Živnosť po prvom roku"
    />
)
