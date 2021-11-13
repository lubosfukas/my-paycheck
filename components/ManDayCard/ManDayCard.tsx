import { IncomeCard } from '../common'

type Props = {
    laborCost: number
    manDayRate: number
    manHourRate: number
}

export const ManDayCard = ({ laborCost, manDayRate, manHourRate }: Props) => {
    const content = [
        {
            label: 'Cena práce na faktúru',
            value: laborCost,
            colored: true,
        },
        {
            label: 'Priemerný dňový rate v hrubom',
            value: manDayRate,
        },
        {
            label: 'Priemerný hodinový rate v hrubom',
            value: manHourRate,
        },
    ]

    return (
        <IncomeCard
            content={content}
            description="Suma, ktorú by ste si mali fakturovať."
            title="Cena práce"
        />
    )
}
