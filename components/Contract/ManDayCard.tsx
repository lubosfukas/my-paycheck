import { forwardRef } from 'react'

import { IncomeCard } from '../common'
import { RefType } from '../../types'

type Props = {
    annualIncome: number
    manDayRate: number
    manHourRate: number
}

export const ManDayCard = forwardRef<RefType, Props>(
    ({ annualIncome, manDayRate, manHourRate }, ref) => (
        <IncomeCard
            ref={ref}
            content={[
                {
                    label: 'Dňový rate v hrubom',
                    value: manDayRate,
                },
                {
                    label: 'Hodinový rate v hrubom',
                    value: manHourRate,
                },
                {
                    label: 'Suma fakturovaná za rok',
                    value: annualIncome,
                },
            ]}
            title="Cena práce"
        />
    )
)

ManDayCard.displayName = 'ManDayCard'
