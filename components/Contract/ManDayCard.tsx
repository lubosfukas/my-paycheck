import { forwardRef } from 'react'

import { IncomeCard } from '../common'
import { RefType } from '../../types'

type Props = {
    annualIncome: number
    manDayRate: number
    monthsWorked: number
}

export const ManDayCard = forwardRef<RefType, Props>(
    ({ annualIncome, manDayRate, monthsWorked }, ref) => (
        <IncomeCard
            ref={ref}
            content={[
                {
                    label: 'Priemerný dňový rate v hrubom',
                    value: manDayRate,
                    colored: true,
                },
                {
                    label: 'Odpracované mesiace',
                    value: monthsWorked,
                    cash: false,
                },
                {
                    label: 'Cena práce na faktúru za rok',
                    value: annualIncome,
                },
            ]}
            title="Cena práce"
        />
    )
)

ManDayCard.displayName = 'ManDayCard'
