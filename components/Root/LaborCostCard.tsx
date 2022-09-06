import { IncomeCard } from '../common'

type Props = {
    annualLaborCost: number
    laborCost: number
    manDayRate: number
}

export const LaborCostCard = ({
    annualLaborCost,
    laborCost,
    manDayRate,
}: Props) => (
    <IncomeCard
        content={[
            {
                label: 'Cena práce na faktúru',
                value: laborCost,
                colored: true,
            },
            {
                label: 'Dňový rate v hrubom',
                value: manDayRate,
            },
            {
                label: 'Suma fakturovaná za rok',
                value: annualLaborCost,
            },
        ]}
        description="Suma, ktorú by ste si mali fakturovať."
        title="Cena práce"
    />
)
LaborCostCard.displayName = 'LaborCostCard'
