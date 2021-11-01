import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'

type Props = {
    averageNetIncome: number
    netIncome: number
    monthsWorked?: number
}

export const FirstYearContractCard = ({
    averageNetIncome,
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
        />
    )
}
