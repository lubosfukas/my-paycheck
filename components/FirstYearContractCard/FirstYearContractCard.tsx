import { IncomeCard } from '../common'
import { ContributionsTable } from './ContributionsTable'
import { texts } from '../../utils/texts'

type Props = {
    averageNetIncome: number
    contributions: { healthInsurance: number; incomeTax: number }
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
    return (
        <IncomeCard
            title={texts['firstYearContractCard.title']}
            content={[
                {
                    label: texts['firstYearContractCard.netIncome'],
                    value: netIncome,
                    cash: true,
                    colored: true,
                },
                {
                    label: texts['firstYearContractCard.monthsWorked'],
                    value: monthsWorked,
                    cash: false,
                    colored: false,
                },
                {
                    label: texts['firstYearContractCard.averageNetIncome'],
                    value: averageNetIncome,
                    cash: true,
                    colored: false,
                },
            ]}
            additional={[
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
            ]}
        />
    )
}
