import { IncomeCard } from '../common'
import { ContributionsTable } from './ContributionsTable'
import { texts } from '../../utils/texts'
import { ContractContributions } from '../../types'

type Props = {
    averageNetIncome: number
    contributions: ContractContributions
    isSeverelyDisabled: boolean
    netIncome: number
    monthsWorked?: number
}

export const ContractCard = ({
    averageNetIncome,
    contributions,
    isSeverelyDisabled,
    netIncome,
    monthsWorked = 10.5,
}: Props) => {
    const additional = [
        {
            id: 'contract-contributions',
            label: texts['contractCard.contributions'],
            content: (
                <ContributionsTable
                    isSeverelyDisabled={isSeverelyDisabled}
                    {...contributions}
                />
            ),
        },
    ]
    const content = [
        {
            label: texts['contractCard.netIncome'],
            value: netIncome,
            colored: true,
        },
        {
            label: texts['contractCard.monthsWorked'],
            value: monthsWorked,
            cash: false,
        },
        {
            label: texts['contractCard.averageNetIncome'],
            value: averageNetIncome,
        },
    ]

    return (
        <IncomeCard
            additional={additional}
            content={content}
            title={texts['contractCard.title']}
        />
    )
}
