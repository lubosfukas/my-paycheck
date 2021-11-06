import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'

type Props = {
    laborCost: number
    manDayRate: number
    manHourRate: number
}

export const ManDayCard = ({ laborCost, manDayRate, manHourRate }: Props) => {
    const content = [
        {
            label: texts['manDayCard.laborCost'],
            value: laborCost,
            colored: true,
        },
        {
            label: texts['manDayCard.manDay'],
            value: manDayRate,
        },
        {
            label: texts['manDayCard.manHour'],
            value: manHourRate,
        },
    ]

    return (
        <IncomeCard
            content={content}
            description={texts['manDayCard.description']}
            title={texts['manDayCard.title']}
        />
    )
}
