import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'

type Props = {
    manDayRate: number
    manHourRate: number
}

export const ManDayCard = ({ manDayRate, manHourRate }: Props) => {
    return (
        <IncomeCard
            title={texts['manDayCard.title']}
            description={texts['manDayCard.description']}
            content={[
                {
                    label: texts['manDayCard.manDay'],
                    value: manDayRate,
                    cash: true,
                    colored: true,
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
