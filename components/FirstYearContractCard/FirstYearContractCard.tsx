import { IncomeCard } from '../common'
import { ContributionsTable } from './ContributionsTable'
import { texts } from '../../utils/texts'
import { FirstYearContractContributions } from '../../types'

type Props = {
    averageNetIncome: number
    contributions: FirstYearContractContributions
    isSeverelyDisabled: boolean
    netIncome: number
    monthsWorked?: number
}

export const FirstYearContractCard = ({
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
            label: texts['firstYearContractCard.netIncome'],
            value: netIncome,
            colored: true,
        },
        {
            label: texts['firstYearContractCard.monthsWorked'],
            value: monthsWorked,
            cash: false,
        },
        {
            label: texts['firstYearContractCard.averageNetIncome'],
            value: averageNetIncome,
        },
    ]

    return (
        <IncomeCard
            additional={additional}
            content={content}
            title={texts['firstYearContractCard.title']}
        />
    )
}
