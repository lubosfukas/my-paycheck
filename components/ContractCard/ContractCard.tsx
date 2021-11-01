import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'

type Props = {
    averageNetIncome: number
    netIncome: number
    monthsWorked?: number
}

export const ContractCard = ({
    averageNetIncome,
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
        />
    )
}
