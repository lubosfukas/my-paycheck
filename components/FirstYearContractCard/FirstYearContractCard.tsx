import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'

type Props = {
    averageNetIncome: number
    netIncome: number
}

export const FirstYearContractCard = ({
    averageNetIncome,
    netIncome,
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
                    label: texts['firstYearContractCard.averageNetIncome'],
                    value: averageNetIncome,
                    cash: true,
                    colored: false,
                },
            ]}
        />
    )
}
