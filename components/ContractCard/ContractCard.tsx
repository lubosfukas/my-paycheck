import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'
import { ContributionsTable } from './ContributionsTable'

type Props = {
    averageNetIncome: number
    contributions: {
        healthInsurance: number
        socialInsurance: number
        medicareInsurance: number
        retirementInsurance: number
        disabilityInsurance: number
        reserveFund: number
        incomeTax: number
    }
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
    return (
        <IncomeCard
            title={texts['contractCard.title']}
            content={[
                {
                    label: texts['contractCard.netIncome'],
                    value: netIncome,
                    cash: true,
                    colored: true,
                },
                {
                    label: texts['contractCard.monthsWorked'],
                    value: monthsWorked,
                    cash: false,
                    colored: false,
                },
                {
                    label: texts['contractCard.averageNetIncome'],
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
