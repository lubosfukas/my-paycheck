import { IncomeCard } from '../IncomeCard'

type Props = {
    laborCost: number
    manDayRate: number
    monthsWorked?: number
}

export const ManDayCard = ({
    laborCost,
    manDayRate,
    monthsWorked = 10.5,
}: Props) => (
    <IncomeCard
        content={[
            {
                label: 'Cena práce na faktúru',
                value: laborCost,
                colored: true,
            },
            {
                label: 'Odpracované mesiace',
                value: monthsWorked,
                cash: false,
            },
            {
                label: 'Priemerný dňový rate v hrubom',
                value: manDayRate,
            },
        ]}
        description="Suma, ktorú by ste si mali fakturovať."
        title="Cena práce"
    />
)
