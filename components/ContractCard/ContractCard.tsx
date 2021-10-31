import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'

type Props = {
    averageNetIncome: number
    netIncome: number
}

export const ContractCard = ({ averageNetIncome, netIncome }: Props) => {
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
                    label: texts['contractCard.averageNetIncome'],
                    value: averageNetIncome,
                    cash: true,
                    colored: false,
                },
            ]}
        />
    )
}
