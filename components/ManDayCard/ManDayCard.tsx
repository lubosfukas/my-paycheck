import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'

type Props = {
    laborCost: number
    manDayRate: number
    manHourRate: number
}

export const ManDayCard = ({ laborCost, manDayRate, manHourRate }: Props) => {
    return (
        <IncomeCard
            title={texts['manDayCard.title']}
            description={texts['manDayCard.description']}
            content={[
                {
                    label: texts['manDayCard.laborCost'],
                    value: laborCost,
                    cash: true,
                    colored: true,
                },
                {
                    label: texts['manDayCard.manDay'],
                    value: manDayRate,
                    cash: true,
                    colored: false,
                },
                {
                    label: texts['manDayCard.manHour'],
                    value: manHourRate,
                    cash: true,
                    colored: false,
                },
            ]}
        />
    )
}
